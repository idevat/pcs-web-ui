import {Form} from "@patternfly/react-core";

import type {clusterSetup} from "app/backend";
import {testMarks} from "app/view/dataTest";
import {FormRadios, FormText, TaskLibStep} from "app/view/share";
import * as helpAll from "app/view/share/help";

import {useTask} from "./useTask";

const {totem} = testMarks.task.clusterSetup.advancedOptions;
const help = helpAll.corosync.totem;

type SetupParams = Parameters<typeof clusterSetup>[0];
type TotemOptions = NonNullable<SetupParams["setupData"]["totem_options"]>;

const TotemFormText = ({
  optionName,
  label = undefined,
}: {
  optionName: keyof TotemOptions;
  label?: string;
}) => {
  const {
    updateTotemOptions,
    state: {totemOptions},
  } = useTask();
  return (
    <FormText
      label={label !== undefined ? label : help[optionName].header}
      id={`cluster-setup-totem-${optionName}`}
      popover={help[optionName]}
      value={totemOptions[optionName] || ""}
      onChange={value => updateTotemOptions({[optionName]: value})}
      {...totem[optionName].mark}
    />
  );
};

export const Totem = () => {
  const {
    allReports,
    updateTotemOptions,
    state: {totemOptions},
  } = useTask();
  return (
    <TaskLibStep title="Totem" reports={allReports}>
      <Form {...totem.mark}>
        <FormRadios
          id="cluster-setup-totem-block-unlisted-ips"
          label="Block unlisted ips"
          popover={help.block_unlisted_ips}
          options={["yes", "no", "default"]}
          selected={totemOptions.block_unlisted_ips}
          onChange={value => updateTotemOptions({block_unlisted_ips: value})}
          {...totem.block_unlisted_ips.mark}
        />

        <TotemFormText optionName="consensus" />
        <TotemFormText optionName="downcheck" />
        <TotemFormText optionName="fail_recv_const" />
        <TotemFormText optionName="heartbeat_failures_allowed" />
        <TotemFormText optionName="hold" />
        <TotemFormText optionName="join" />
        <TotemFormText optionName="max_messages" />
        <TotemFormText optionName="max_network_delay" />
        <TotemFormText optionName="merge" />
        <TotemFormText optionName="miss_count_const" />
        <TotemFormText optionName="send_join" />
        <TotemFormText optionName="seqno_unchanged_const" />
        <TotemFormText optionName="token" />
        <TotemFormText optionName="token_coefficient" />
        <TotemFormText optionName="token_retransmit" />
        <TotemFormText optionName="token_retransmits_before_loss_const" />
        <TotemFormText optionName="window_size" />
      </Form>
    </TaskLibStep>
  );
};
