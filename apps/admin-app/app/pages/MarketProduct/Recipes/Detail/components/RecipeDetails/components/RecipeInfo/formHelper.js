import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { MultiInputValidation } from '@app/pages/MarketProduct/Recipes/components/common/MultiInput';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      panelName: Yup.string().required(),
      name: MultiInputValidation({ isRequired: true, languages: ['en', 'tr'] }),
      domainTypes: Yup.array().of(Yup.number()).min(1).required(),
    })
  );
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = recipe => {
  return {
    panelName: recipe.panelName || '',
    name: { tr: recipe.name?.tr || '', en: recipe.name?.en || '' },
    domainTypes: recipe.domainTypes || [],
  };
};
