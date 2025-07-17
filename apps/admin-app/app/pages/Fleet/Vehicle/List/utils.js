export const getVehicleTypeOptions = options => {
  const dropdownOptions = [];
  options?.forEach(option => {
    dropdownOptions.push({ value: option._id, label: option.name });
  });
  return dropdownOptions;
};

export const parseBoolean = str => {
  return str.toLowerCase() === 'true';
};
