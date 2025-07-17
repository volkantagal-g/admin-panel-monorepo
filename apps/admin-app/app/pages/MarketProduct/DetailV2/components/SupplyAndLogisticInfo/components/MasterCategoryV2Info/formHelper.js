import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

const formatLabelText = (data, name) => {
  const itemName = data?.name?.[getLangKey()];
  const labelText = name ? `${itemName} / ${name}` : itemName;

  if (data?.parent) {
    return formatLabelText(data?.parent, labelText);
  }
  return labelText;
};

const formatExistingLabelText = ({
  level1,
  level2, level3, level4,
}) => `${level1?.name?.[getLangKey()]} / ${level2?.name?.[getLangKey()]} / ${level3?.name?.[getLangKey()]} / ${level4?.name?.[getLangKey()]}`;

export const getInitialValues = ({ level4Id, ...values }) => ({
  level4Id: values?.level4?._id,
  isCreated: !!values?.productId,
  categoryRole: values?.level2?.categoryRole,
});
export const validationSchema = () => Yup.object().shape({ level4Id: Yup.string() });

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};

export const getMasterCategoriesV2Options = (data = [], supplyLogisticInfo) => {
  const getMasterCategoriesV2DataOptions = data?.map(item => ({ value: item?._id, label: formatLabelText(item) }));

  if (supplyLogisticInfo?.level4) {
    const isMasterCategoryAvailable = getMasterCategoriesV2DataOptions?.find(({ value }) => value === supplyLogisticInfo?.level4?._id);
    if (!isMasterCategoryAvailable) {
      getMasterCategoriesV2DataOptions?.push({ value: supplyLogisticInfo?.level4?._id, label: formatExistingLabelText(supplyLogisticInfo) });
    }
  }

  return getMasterCategoriesV2DataOptions;
};
