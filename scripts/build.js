/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const bfj = require("bfj");
const webpack = require("webpack");

const paths = require("../config/paths");
const webpackConfig = require("../config/webpack.config");

const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf("--stats") !== -1;

const friendlySyntaxErrorLabel = "Syntax error:";

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// Cleans up webpack error messages.
function formatMessage(message) {
  let lines = [];

  if (typeof message === "string") {
    lines = message.split("\n");
  } else if ("message" in message) {
    lines = message["message"].split("\n");
  } else if (Array.isArray(message)) {
    message.forEach(message => {
      if ("message" in message) {
        lines = message["message"].split("\n");
      }
    });
  }

  // Strip webpack-added headers off errors/warnings
  // https://github.com/webpack/webpack/blob/master/lib/ModuleError.js
  lines = lines.filter(line => !/Module [A-z ]+\(from/.test(line));

  // Transform parsing error into syntax error
  // TODO: move this to our ESLint formatter?
  lines = lines.map(line => {
    const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
      line,
    );
    if (!parsingError) {
      return line;
    }
    const [, errorLine, errorColumn, errorMessage] = parsingError;
    return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
  });

  message = lines.join("\n");
  // Smoosh syntax errors (commonly found in CSS)
  message = message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
  );
  // Clean up export errors
  message = message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    "Attempted import error: '$1' is not exported from '$2'.",
  );
  message = message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    "Attempted import error: '$2' does not contain a default export (imported as '$1').",
  );
  message = message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    "Attempted import error: '$1' is not exported from '$3' (imported as '$2').",
  );
  lines = message.split("\n");

  // Remove leading newline
  if (lines.length > 2 && lines[1].trim() === "") {
    lines.splice(1, 1);
  }
  // Clean up file name
  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, "$1");

  // Cleans up verbose "module not found" messages for files and packages.
  if (lines[1] && lines[1].indexOf("Module not found: ") === 0) {
    lines = [
      lines[0],
      lines[1]
        .replace("Error: ", "")
        .replace("Module not found: Cannot find file:", "Cannot find file:"),
    ];
  }

  // Add helpful message for users trying to use Sass for the first time
  if (lines[1] && lines[1].match(/Cannot find module.+sass/)) {
    lines[1] = "To import Sass files, you first need to install sass.\n";
    lines[1]
      += "Run `npm install sass` or `yarn add sass` inside your workspace.";
  }

  message = lines.join("\n");
  // Internal stacks are generally useless so we strip them... with the
  // exception of stacks containing `webpack:` because they're normally
  // from user code generated by webpack. For more information see
  // https://github.com/facebook/create-react-app/pull/1050
  message = message.replace(
    /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
    "",
  ); // at ... ...:x:y
  message = message.replace(/^\s*at\s<anonymous>(\n|$)/gm, ""); // at <anonymous>
  lines = message.split("\n");

  // Remove duplicated newlines
  lines = lines.filter(
    (line, index, arr) =>
      index === 0
      || line.trim() !== ""
      || line.trim() !== arr[index - 1].trim(),
  );

  // Reassemble the message
  message = lines.join("\n");
  return message.trim();
}

function formatWebpackMessages(json) {
  const formattedErrors = json.errors.map(formatMessage);
  const formattedWarnings = json.warnings.map(formatMessage);
  const result = {errors: formattedErrors, warnings: formattedWarnings};
  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }
  return result;
}

// Create the production build and print the deployment instructions.
function build() {
  console.log("Creating an optimized production build...");

  const compiler = webpack(
    webpackConfig({
      isProduction: true,
      isCockpitContext:
        process.env.REACT_APP_PCS_WEB_UI_ENVIRONMENT === "cockpit",
      // webpack needs to know it to put the right <script> hrefs into HTML even
      // in single-page apps that may serve index.html for nested URLs like
      // /todos/42. We can't use a relative path in HTML because we don't want
      // to load something like /todos/42/static/js/bundle.7289d.js. We have to
      // know the root.
      publicPath: "./",
      enableProfiling: process.argv.includes("--profile"),
    }),
  );
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
          errMessage
            += "\nCompileError: Begins at CSS selector "
            + err["postcssNode"].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({all: false, warnings: true, errors: true}),
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }

      const resolveArgs = {warnings: messages.warnings};

      if (writeStatsJson) {
        return bfj
          .write(paths.appBuild + "/bundle-stats.json", stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch(error => reject(new Error(error)));
      }

      return resolve(resolveArgs);
    });
  });
}

build()
  .then(
    ({warnings}) => {
      if (warnings.length) {
        console.log(`Compiled with warnings.\n\n${warnings.join("\n\n")}`);
      } else {
        console.log("Compiled successfully.\n");
      }
    },
    err => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
      if (tscCompileOnError) {
        console.log("Compiled with the following type errors:\n");
        console.log(err);
      } else {
        console.log("Failed to compile.\n");
        console.log(err);
        process.exit(1);
      }
    },
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
