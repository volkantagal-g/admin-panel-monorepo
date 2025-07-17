import * as Yup from 'yup';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { createMap, getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const validationSchema = () => {
  return (Yup.object()
    .shape({ description: YupMultiLanguage.string({ min: null, max: null }) })
  );
};

const getModifiedInitialValues = (values, _tags) => {
  const tagsMap = createMap(_tags);
  const tags = values.tags.map(tagId => {
    return {
      value: tagId,
      label: get(tagsMap, [tagId, 'name', getLangKey()]),
    };
  });

  const newValues = { ...values, tags };
  return newValues;
};

const createPayloadBody = values => {
  const tags = values.tags.map(tag => {
    return tag.value;
  });
  const newValues = { ...values, tags };
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const initialValuesPayload = createPayloadBody(initialValues);
  const valuesPayload = createPayloadBody(values);
  const { newValues: changedValues } = getDiffObj(initialValuesPayload, valuesPayload);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = (marketProduct, tags) => {
  const initialValues = {
    description: getLangDataOfItem(marketProduct, ['description'], ''),
    tags: get(marketProduct, 'tags', []),
    alcoholByVolume: get(marketProduct, 'alcoholByVolume', 0),
  };

  return getModifiedInitialValues(initialValues, tags);
};
