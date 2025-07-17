import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form, Select, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';

const SelectCities = ({
  value,
  onChangeCallback,
  disabled,
}) => {
  const { t } = useTranslation('courierGamificationPage');

  const cities = useSelector(getCitiesSelector.getData);
  const isPending = useSelector(getCitiesSelector.getIsPending);

  const cityOptions = useMemo(
    () => cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  const renderTag = ({ value: tagValue, onClose }) => (
    tagValue?.length
      ? (
        <Tag onClose={onClose} closable={!disabled}>
          {cityOptions?.find(c => c?.value === tagValue)?.label}
        </Tag>
      )
      : null
  );

  return (
    <Form.Item
      label={t('CITY')}
      valuePropName="values"
    >
      <Select
        value={value}
        defaultValue={value}
        options={cityOptions}
        onChange={onChangeCallback}
        mode="multiple"
        disabled={disabled || isPending}
        placeholder={t('CITY')}
        showSearch
        filterOption={getSelectFilterOption}
        autoComplete="off"
        tagRender={renderTag}
      />
    </Form.Item>
  );
};

export default SelectCities;
