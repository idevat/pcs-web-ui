import {Alert, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormSwitch, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {sbd} = testMarks.task.nodeAdd;
export const Sbd = () => {
  const {
    updateState,
    state: {
      isSbdEnabled,
      sbdWatchdog,
      sbdDevices,
      sbdNoWatchdogValidation,
      libCall: {reports},
    },
  } = useTask();
  const changeWatchdog = (value: string) => updateState({sbdWatchdog: value});
  const changeDevice = (index: number, value: string) =>
    updateState({
      sbdDevices: sbdDevices.map((device, i) =>
        i === index ? value : device,
      ) as typeof sbdDevices,
    });
  return (
    <TaskLibStep title="Configure sbd" reports={reports} {...sbd.mark}>
      {!isSbdEnabled && (
        <Alert
          variant="info"
          isInline
          title="Sbd has not been detected on the cluster."
        />
      )}
      {isSbdEnabled && (
        <Form isHorizontal>
          <FormText
            id="sbd-watchdog"
            label="Watchdog"
            onChange={changeWatchdog}
            value={sbdWatchdog}
            placeholder="/dev/watchdog"
            {...sbd.watchdog.mark}
          />

          <FormSwitch
            id="sbd-no-watchdog-validation"
            label="Do not validate watchdog"
            popover={{
              header: "Do not validate watchdog",
              body: (
                <>
                  By default, it is tested whether the specified watchdog is
                  supported. This may cause a restart of the system when a
                  watchdog with no-way-out-feature enabled is present. Use this
                  field to skip watchdog validation.
                </>
              ),
            }}
            isChecked={sbdNoWatchdogValidation}
            onChange={c => updateState({sbdNoWatchdogValidation: c})}
            {...sbd.validation.mark}
          />
          <Alert
            variant="info"
            isInline
            title={
              "Please specify the number of devices that is compatible with" +
              " this cluster"
            }
          />
          {sbdDevices.map((device, i) => (
            <FormText
              key={i}
              id={`sbd-device-${i}`}
              label={`Device ${i + 1}`}
              value={device}
              onChange={(value: string) => changeDevice(i, value)}
              {...sbd.device.mark}
            />
          ))}
        </Form>
      )}
    </TaskLibStep>
  );
};
