import * as Yup from 'yup';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const defaultValues = {
  name: '',
  description: '',
  position: '',
  domainTypes: [],
  isActive: false,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().trim().required(),
      description: Yup.string().trim().required(),
      position: Yup.string().trim().required(),
      domainTypes: Yup.array().min(1).required(),
      isActive: Yup.boolean().required(),
    });
};

export const getModifiedInitialValues = values => {
  const domainTypes = values.domainTypes.map(type => {
    return {
      value: _.toString(type),
      label: _.get(getirMarketDomainTypes, [type, getLangKey()]),
    };
  });
  const newValues = {
    ...values,
    domainTypes,
  };
  return newValues;
};

export const getModifiedValues = values => {
  const domainTypes = values.domainTypes.map(domainType => {
    return domainType.value;
  });
  const newValues = {
    ...values,
    domainTypes,
  };
  return newValues;
};

export const getInitialValues = badge => {
  if (!_.get(badge, '_id')) return defaultValues;
  const initialValues = {
    name: _.get(badge, 'name', ''),
    description: _.get(badge, 'description', ''),
    position: _.get(badge, 'position', ''),
    domainTypes: _.get(badge, 'domainTypes', []),
    isActive: _.get(badge, 'isActive', false),
  };
  return getModifiedInitialValues(initialValues);
};
