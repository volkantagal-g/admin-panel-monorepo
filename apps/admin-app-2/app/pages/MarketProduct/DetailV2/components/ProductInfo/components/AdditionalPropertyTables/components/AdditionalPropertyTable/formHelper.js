import * as Yup from 'yup';
import { get, cloneDeep, sortBy, set } from 'lodash';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

export const validationSchema = () => {
  return (Yup.array().of(
    Yup.object().shape({
      title: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
      index: Yup.number().required(),
      sections: Yup.array().of(
        Yup.object().shape({
          title: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
          index: Yup.number().required(),
          items: Yup.array().of(
            Yup.object().shape({
              name: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
              value: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
              unit: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
              index: Yup.number().required(),
            }),
          ),
        }),
      ),
    }),
  ));
};

export const getModifiedValues = values => {
  const newValues = cloneDeep(values);

  newValues.additionalPropertyTables.forEach(table => {
    table.sections.forEach(section => {
      const sortedItems = sortBy(section.items, ['index']);
      set(section, 'items', sortedItems);
    });
  });

  return newValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = { additionalPropertyTables: get(marketProduct, 'additionalPropertyTables', []) };
  return { ...initialValues };
};

export const getSubtitleOptions = (sections, language) => {
  return sections.map(({ index, title }) => {
    return {
      value: index,
      label: title?.[language],
    };
  });
};

export const getColumns = (t, selectedLanguage) => {
  const columns = getSelectedCountryLanguages().map(lang => ({
    title: `${t('global:NAME')} ${lang.toUpperCase()}`,
    render: ({ name }) => name?.[lang],
  }));

  columns.push(
    {
      title: t('ADDITIONAL_PROPERTY_INFO.VALUE'),
      render: ({ value }) => value?.[selectedLanguage],
    },
  );

  columns.push(
    {
      title: t('ADDITIONAL_PROPERTY_INFO.UNIT'),
      render: ({ unit }) => unit?.[selectedLanguage],
    },
  );

  return columns;
};
