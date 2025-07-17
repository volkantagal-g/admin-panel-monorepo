import * as Yup from 'yup';
import _ from 'lodash';
import moment from 'moment';

import { getirDomainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const selectedCountry = getSelectedCountry();

export const defaultValues = {
  domainTypes: [],
  code: '',
  validFrom: moment(),
  validUntil: moment(),
  isDefaultSegment: false,
  countryCode: _.get(selectedCountry, ['code', 'alpha2']),
  defaultSegment: 0,
  status: 1,
};

export const validationSchema = () => {
  return Yup.object().shape({
    domainTypes: Yup.array().min(1).required(),
    code: Yup.string().trim().required(),
    defaultSegment: Yup.number(),
  });
};

export const manipulateValuesBeforeSubmit = values => {
  const validFrom = values.validFrom.valueOf();
  const validUntil = values.validUntil.valueOf();
  const domainTypes = values.domainTypes.map(({ value }) => value);
  delete values.isDefaultSegment; // eslint-disable-line no-param-reassign
  const newValues = {
    ...values,
    validFrom,
    validUntil,
    domainTypes,
  };
  return newValues;
};

export const getModifiedInitialValues = values => {
  const domainTypes = values.domainTypes.map(type => {
    return {
      value: _.toString(type),
      key: _.toString(type),
      label: _.get(getirDomainTypes, [type, getLangKey()]),
    };
  });
  const newValues = {
    ...values,
    domainTypes,
  };
  return newValues;
};

export const getInitialValues = lottery => {
  const { lottery: lotteryData } = lottery;
  if (!_.get(lotteryData, '_id')) return defaultValues;
  const initialValues = {
    domainTypes: lotteryData?.domainTypes,
    code: lotteryData?.code,
    validFrom: moment(lotteryData?.validFrom),
    validUntil: moment(lotteryData?.validUntil),
    defaultSegment: lotteryData?.defaultSegment,
    isDefaultSegment: lotteryData?.defaultSegment,
    status: lotteryData?.status,
  };
  return getModifiedInitialValues(initialValues);
};
