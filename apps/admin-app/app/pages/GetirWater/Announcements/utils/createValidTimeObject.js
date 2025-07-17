import moment from 'moment-timezone';

const createValidTimeObject = validTimeList => {
  const resultObject = {};
  validTimeList.forEach((times, index) => {
    Object.entries(times).forEach(key => {
      const fieldName = `${key[0]}_${index}`;
      const fieldValue = key[1];
      resultObject[fieldName] = moment(fieldValue);
    });
  });

  return resultObject;
};

export default createValidTimeObject;
