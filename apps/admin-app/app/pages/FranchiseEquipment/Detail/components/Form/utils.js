export const updateFranchiseEquipmentObject = data => {
  const reqObj = [];
  const keys = Object.keys(data);
  keys.forEach(key => {
    if (typeof data[key] === 'object' && key !== 'openDate') {
      // eslint-disable-next-line no-param-reassign
      delete data[key].count;
      const innerFieldKeys = Object.keys(data[key]);
      innerFieldKeys.forEach(innerFieldKey => {
        // eslint-disable-next-line no-param-reassign
        delete data[key][innerFieldKey].name;
        reqObj.push(data[key][innerFieldKey]);
      });
    }
  });
  return reqObj;
};

export const getUpdateEquipmentRequestParams = (data, equipmentData, id) => {
  if (equipmentData?.openDate === null) {
    return { data, id };
  }
  return { data, openDate: equipmentData.openDate, id };
};
