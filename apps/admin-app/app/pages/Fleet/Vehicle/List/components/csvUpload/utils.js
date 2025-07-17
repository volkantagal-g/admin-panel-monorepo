export const removeEmptyFields = vehicles => {
  return vehicles.map(vehicle => {
    const newVehicleList = {};
    Object.keys(vehicle).forEach(key => {
      const value = vehicle[key];
      if (value && !Array.isArray(value) && value !== '' && value !== null && value !== undefined) {
        newVehicleList[key] = value;
      }
    });
    return newVehicleList;
  });
};
