import moment from 'moment-timezone';

const createValidTimes = data => {
  const resultArray = [
    {
      startDate: undefined,
      endDate: undefined,
    },
  ];
  Object.entries(data).forEach(key => {
    // key holds field like ["startDate_0", "Moment"];
    if (key[0].split('_').length > 1) {
      // i found only fields that includes "_" char
      const fieldName = key[0].split('_')[0]; // i parsed startDate_0 field to handle fieldName as startDate
      const index = key[0].split('_')[1]; // i parsed startDate_0 field to be able to add into same index
      const fieldValue = key[1]; // get moment value
      const timeObject = { [fieldName]: fieldValue ? moment(fieldValue).format() : undefined };
      if (fieldValue) {
        resultArray[index] = { ...resultArray[index], ...timeObject };
      }
    }
  });
  return resultArray;
};

export default createValidTimes;
