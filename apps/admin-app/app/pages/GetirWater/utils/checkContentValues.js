import _ from 'lodash';

const BODY_PATTERN = /<main.*?>([\s\S]*)<\/main>/;

export const checkContentValues = (values, fieldName) => {
  if (_.isNull(BODY_PATTERN.exec(values[`${fieldName}`]))) {
    return _.get(values, fieldName, '');
  }
  return BODY_PATTERN.exec(values[`${fieldName}`])[1];
};
