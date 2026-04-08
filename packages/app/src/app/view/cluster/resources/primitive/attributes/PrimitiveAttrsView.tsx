import React from "react";
import {useSelector} from "react-redux";
import {StackItem} from "@patternfly/react-core";

import {selectors} from "app/store";
import {testMarks} from "app/view/dataTest";
import type {Primitive} from "app/view/cluster/types";
import {
  AttributeValueSecret,
  AttributeValueSecretRevealed,
  PcmkAgentAttrName,
  PcmkAgentAttrsToolbar,
  isCibSecret,
  useLoadedCluster,
} from "app/view/cluster/share";
import {
  AttributeGroup,
  AttributeList,
  AttributeValue,
} from "app/view/share/attributes";
import {LoadedPcmkAgent, useDispatch} from "app/view/share";

import {CibSecretsToggle} from "./CibSecretsToggle";
import {PrimitiveAttrsForm} from "./PrimitiveAttrsForm";

const {attributes} = testMarks.cluster.resources.currentPrimitive;
const {pair} = attributes;

export const PrimitiveAttrsView = ({primitive}: {primitive: Primitive}) => {
  const {clusterName} = useLoadedCluster();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  const cibSecretsState = useSelector(
    selectors.getCibSecrets(clusterName, primitive.id),
  );

  const hasCibSecrets = Object.values(primitive.instanceAttributes).some(attr =>
    isCibSecret(attr.value),
  );

  const secretsToggle = hasCibSecrets ? (
    <CibSecretsToggle
      id={`secrets-toggle-${primitive.id}`}
      cibSecretsState={cibSecretsState}
      onChange={checked =>
        dispatch(
          checked
            ? {
                type: "RESOURCE.CIB_SECRETS.LOAD",
                key: {clusterName},
                payload: {
                  resourceId: primitive.id,
                  attributeNames: Object.entries(primitive.instanceAttributes)
                    .filter(([, attr]) => isCibSecret(attr.value))
                    .map(([name]) => name),
                },
              }
            : {
                type: "RESOURCE.CIB_SECRETS.CLEAR",
                key: {clusterName},
                payload: {resourceId: primitive.id},
              },
        )
      }
    />
  ) : undefined;

  return (
    <LoadedPcmkAgent clusterName={clusterName} agentName={primitive.agentName}>
      {agent => {
        if (isEditing) {
          return (
            <span {...attributes.mark}>
              <StackItem>
                <PcmkAgentAttrsToolbar filterState={filterState} />
              </StackItem>
              <StackItem>
                <PrimitiveAttrsForm
                  primitive={primitive}
                  resourceAgentParams={agent.parameters}
                  displayNames={filterParameters(agent.parameters).map(
                    p => p.name,
                  )}
                  close={() => setIsEditing(false)}
                />
              </StackItem>
            </span>
          );
        }

        return (
          <span {...attributes.mark}>
            <StackItem>
              <PcmkAgentAttrsToolbar
                buttonsItems={[
                  {
                    name: "edit-attributes",
                    run: () => setIsEditing(true),
                  },
                ]}
                filterState={filterState}
                additionalItems={secretsToggle}
              />
            </StackItem>
            <StackItem>
              <AttributeList attributes={filterParameters(agent.parameters)}>
                {parameter => (
                  <AttributeGroup key={parameter.name} {...pair.mark}>
                    <PcmkAgentAttrName
                      parameter={parameter}
                      {...pair.name.mark}
                    />
                    {isCibSecret(
                      primitive.instanceAttributes[parameter.name]?.value,
                    ) ? (
                      cibSecretsState?.loadStatus === "LOADED" &&
                      cibSecretsState.secrets[parameter.name] ? (
                        <AttributeValueSecretRevealed
                          value={cibSecretsState.secrets[parameter.name]}
                          {...pair.secretRevealed.mark}
                        />
                      ) : (
                        <AttributeValueSecret
                          {...pair.secret.mark}
                          isLoading={cibSecretsState?.loadStatus === "LOADING"}
                        />
                      )
                    ) : (
                      <AttributeValue
                        value={
                          primitive.instanceAttributes[parameter.name]?.value
                        }
                        defaultValue={parameter.default}
                        {...pair.value.mark}
                      />
                    )}
                  </AttributeGroup>
                )}
              </AttributeList>
            </StackItem>
          </span>
        );
      }}
    </LoadedPcmkAgent>
  );
};
