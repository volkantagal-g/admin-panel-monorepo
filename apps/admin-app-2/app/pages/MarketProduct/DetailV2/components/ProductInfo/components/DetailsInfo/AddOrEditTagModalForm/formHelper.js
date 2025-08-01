import * as Yup from 'yup';
import { get } from 'lodash';

import { createMap } from '@shared/utils/common';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: YupMultiLanguage.string({ isRequired: true }),
      imageObject: Yup.mixed(),
    });
};

const getModifiedInitialValues = (values, currentTagId, tags) => {
  let newValues = { ...values };
  if (currentTagId) {
    const tagsMap = createMap(tags);
    newValues = {
      name: getLangDataOfItem(tagsMap, [currentTagId, 'name'], ''),
      imageObject: { loadedImage: get(tagsMap, [currentTagId, 'image'], '') },
    };
  }
  return newValues;
};

const createPayloadBody = values => {
  const newValues = { ...values };
  delete newValues.imageObject;
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  // TODO: BE development is needed.
  // const _initialValues = getModifiedValues(initialValues);
  const valuesPayload = createPayloadBody(values);
  // TODO: BE development is needed.
  // const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  // setNullToEmptyStringDeep(changedValues);
  // return changedValues;
  return valuesPayload;
};

export const getInitialValues = (currentTagId, tags) => {
  const initialValues = {
    name: getLangDataOfItem(undefined, undefined, ''),
    imageObject: {},
  };
  return getModifiedInitialValues(initialValues, currentTagId, tags);
};
