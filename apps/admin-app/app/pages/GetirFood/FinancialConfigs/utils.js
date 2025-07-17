import { CONFIG_VALUE_TYPE } from './constants';

export const generateChangedItems = (currentValues, changedValues) => currentValues.reduce((changedItems, currentValue) => {
  const { name, value: previousValue, key } = currentValue;
  const changedValue = changedValues.find(item => item.key === key);

  if (changedValue) {
    const { value: newValue } = changedValue;
    if (previousValue !== newValue) {
      changedItems.push({ name, previousValue, newValue });
    }
  }

  return changedItems;
}, []);

export const getUpdateConfigValuesPayload = (formValues, vertical, domain) => {
  const keyValue = formValues?.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return [
    {
      vertical,
      domain,
      keyValue,
    },
  ];
};

export const convertConfigValues = data => {
  return data.map(item => {
    switch (item.configValueType) {
      case CONFIG_VALUE_TYPE.STRING:
        return { ...item, value: item.value };
      case CONFIG_VALUE_TYPE.INTEGER:
        return { ...item, value: Number(item.value) };
      case CONFIG_VALUE_TYPE.DOUBLE:
        return { ...item, value: Number(item.value) };
      case CONFIG_VALUE_TYPE.BOOLEAN:
        return {
          ...item,
          value: String(item.value).toLowerCase() === 'true',
        };
      default:
        return item;
    }
  });
};
