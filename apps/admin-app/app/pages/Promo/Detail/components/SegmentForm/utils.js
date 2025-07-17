export const checkIfSegmentsArray = obj => {
  if (!Array.isArray(obj.included)) {
    const tempArr = obj.included.split('\n').map(Number);
    // eslint-disable-next-line no-param-reassign
    obj.included = tempArr;
  }
  if (!Array.isArray(obj.excluded)) {
    const tempArr = obj.excluded.split('\n').map(Number);
    // eslint-disable-next-line no-param-reassign
    obj.excluded = tempArr;
  }
  return obj;
};
