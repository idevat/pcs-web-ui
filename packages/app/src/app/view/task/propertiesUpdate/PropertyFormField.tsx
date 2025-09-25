import {testMarks} from "app/view/dataTest";
import {FormRadios, FormSelectSimple, FormText} from "app/view/share";

import {type ClusterProperties, useTask} from "./useTask";

const {property: propertyMark} = testMarks.cluster.properties;

export const PropertyFormField = ({
  property,
}: {
  property: ClusterProperties[number];
}) => {
  const {userPropertyMap, modifyProperty} = useTask();

  const userProperty = userPropertyMap[property.name];

  const popover = {
    header: property.shortdesc,
    body: property.longdesc,
    defaultValue: property.default,
  };

  const label = (
    <span {...propertyMark.name.mark}>{property.readable_name}</span>
  );

  const id = `cluster-property-${property.name}`;
  if ("enum" in property) {
    const value = userProperty ?? "DEFAULT";
    if (property.enum.length < 4) {
      return (
        <FormRadios
          id={id}
          label={label}
          options={["DEFAULT", ...property.enum]}
          selected={value}
          onChange={value => modifyProperty(property.name, value)}
          popover={popover}
          {...propertyMark.value.mark}
        />
      );
    }
    return (
      <FormSelectSimple
        id={id}
        label={label}
        onSelect={value => modifyProperty(property.name, value)}
        selected={value}
        offeredOptions={["DEFAULT", ...property.enum]}
        popover={popover}
        {...propertyMark.value.mark}
      />
    );
  }

  if (property.type === "boolean") {
    const value = userProperty ?? "DEFAULT";
    return (
      <FormRadios
        id={id}
        label={label}
        options={["DEFAULT", "true", "false"]}
        selected={value}
        onChange={value => modifyProperty(property.name, value)}
        popover={popover}
        {...propertyMark.value.mark}
      />
    );
  }

  return (
    <FormText
      id={id}
      label={label}
      popover={popover}
      onChange={value => modifyProperty(property.name, value)}
      value={userProperty ?? ""}
      placeholder={property.default as string}
      {...propertyMark.value.mark}
    />
  );
};
