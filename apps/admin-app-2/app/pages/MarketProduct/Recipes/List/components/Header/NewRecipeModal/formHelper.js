import * as Yup from 'yup';

import { MultiInputValidation } from '@app/pages/MarketProduct/Recipes/components/common/MultiInput';

export const defaultValues = {
  panelName: null,
  name: {},
  domainTypes: [],
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      panelName: Yup.string().required(),
      name: MultiInputValidation({ isRequired: true, languages: ['en', 'tr'] }),
      domainTypes: Yup.array().of(Yup.number()).min(1).required(),
    });
};
