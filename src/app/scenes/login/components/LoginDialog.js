import React, { Component } from "react";
import { Button, Modal, Form, Message } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: "",
  }
  render() {
    const { login, actions } = this.props;
    return (
      <Modal
        data-role="login-prompt"
        open={login.required}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Please sign in</Modal.Header>
        <Modal.Content>
          {
            typeof login.failed === "object"
            &&
            <Message negative>
              {
                login.failed.badCredentials
                  ? "Bad username or password"
                  : login.failed.message
              }
            </Message>
          }
          <Form>
            <Form.Input
              type="text"
              label="Username"
              name="username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <Form.Input
              type="password"
              label="Password"
              name="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            name="login"
            onClick={() => actions.enterCredentials(
              this.state.username,
              this.state.password,
            )}
            positive
            labelPosition="right"
            icon="checkmark"
            content="Login"
            disabled={!login.acceptLoginData}
            loading={!login.acceptLoginData}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Login;
