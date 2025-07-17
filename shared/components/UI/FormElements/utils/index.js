import { get } from 'lodash';

export const mapOptionsData = ({
  optionsData,
  optionLabelProp,
  optionValueProp,
}) => {
  if (!(Array.isArray(optionsData))) {
    return [];
  }
  return optionsData?.map(optionData => {
    const optionLabel = get(optionData, optionLabelProp);
    const optionValue = get(optionData, optionValueProp);
    return {
      label: optionLabel,
      value: optionValue,
    };
  });
};
