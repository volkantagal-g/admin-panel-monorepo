import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form, Select, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';

import { City, SelectCitiesProps } from '@app/pages/WarehouseProposal/interfaces';

const SelectCities: React.FC<SelectCitiesProps> = ({
  value,
  onChangeCallback,
  disabled,
  errors = {},
  touched = {},
}) => {
  const { t } = useTranslation('warehouseProposalPage');

  const cities = useSelector(getCitiesSelector.getData) as City[];
  const isPending = useSelector(getCitiesSelector.getIsPending);

  const cityOptions = useMemo(
    () => cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  return (
    <Form.Item
      help={touched?.city && errors?.city}
      validateStatus={touched?.city && errors?.city ? 'error' : 'success'}
      label={t('global:CITY')}
    >
      <Select
        value={typeof value === 'string' ? value : value.name}
        defaultValue={typeof value === 'string' ? value : value.name}
        options={cityOptions}
        onChange={onChangeCallback}
        disabled={disabled || isPending}
        placeholder={t('global:CITY')}
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

export default SelectCities;
