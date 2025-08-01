import * as Yup from 'yup';
import { sortBy, cloneDeep, set, uniqueId } from 'lodash';
import { memo } from 'react';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import trash from '@shared/assets/GUI/Icons/Solid/Trash.svg';
import { TextInput } from '@shared/components/GUI';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

export const ADDITIONAL_PROPERTY_TABLE_PRE_ROW_ID = 'APT_row_';

export const validationSchema = () => {
  return Yup.object().shape({
    subtitleIndex: Yup.number().required(),
    title: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
    sections: Yup.array().of(
      Yup.object().shape({
        title: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
        items: Yup.array().of(
          Yup.object().shape({
            name: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
            value: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
            unit: YupMultiLanguage.string({ isRequired: true, min: null, max: null }),
          }),
        ),
      }),
    ),
  });
};
export const getTableWithRefreshedIndexes = table => {
  return table.sections.map(section => section.items.map((item, index) => ({ ...item, index })));
};

export const getInitialValues = (table = {}) => {
  const defaultTable = {
    sections: [],
    title: {},
    index: 0,
  };

  const initialValues = { ...defaultTable, ...table };

  table.sections?.forEach(section => {
    const sortedItems = sortBy(section.items, ['index'])
      .map((item, index) => ({ ...item, index, rowId: uniqueId(ADDITIONAL_PROPERTY_TABLE_PRE_ROW_ID) }));
    set(section, 'items', sortedItems);
  });

  return cloneDeep(initialValues);
};

const TextInputCell = memo(({ onValueChange, ...props }) => (
  <TextInput
    {...props}
    onChange={e => onValueChange(e.target.value)}
  />
));

export const getColumns = ({ selectedLanguage, translate, onCellChange, onRowDelete, subtitleIndex }) => {
  const columns = [
    { key: 'sort', align: 'center', width: 20 },
  ];

  const nameColumns = getSelectedCountryLanguages().map(lang => ({
    title: `${translate('global:NAME')} ${lang.toUpperCase()}`,
    render: ({ name, errors, index }) => (
      <TextInputCell
        name={`sections[${subtitleIndex}].items[${index}].name.${lang}`}
        errors={errors}
        value={name[lang]}
        onValueChange={value => onCellChange({ value, fieldPath: `name.${lang}`, index })}
      />
    ),
  }));

  columns.push(
    ...nameColumns,
    {
      title: translate('ADDITIONAL_PROPERTY_INFO.VALUE'),
      render: ({ value, errors, index }) => (
        <TextInputCell
          name={`sections[${subtitleIndex}].items[${index}].value.${selectedLanguage}`}
          errors={errors}
          value={value[selectedLanguage]}
          onValueChange={newValue => onCellChange({ value: newValue, fieldPath: `value.${selectedLanguage}`, index })}
        />
      ),
    },
    {
      title: translate('ADDITIONAL_PROPERTY_INFO.UNIT'),
      render: ({ unit, errors, index }) => (
        <TextInputCell
          name={`sections[${subtitleIndex}].items[${index}].unit.${selectedLanguage}`}
          errors={errors}
          value={unit[selectedLanguage]}
          onValueChange={newValue => onCellChange({ value: newValue, fieldPath: `unit.${selectedLanguage}`, index })}
        />
      ),
    },
    {
      render: ({ index }) => (
        <img
          role="presentation"
          src={trash}
          alt="trash-icon"
          onClick={() => onRowDelete(index)}
        />
      ),
    },
  );

  return columns;
};

export const hasAnySectionWithEmptyItemsList = table => {
  return table.sections.some(section => !section.items.length);
};
