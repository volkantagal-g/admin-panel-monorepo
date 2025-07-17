import { useTranslation } from 'react-i18next';
import { Form, Select, Tag } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

const SelectWarehouses = ({
  value,
  onChangeCallback,
  disabled,
}) => {
  const { t } = useTranslation('courierGamificationPage');
  const warehousesForSelect = useSelector(getFilteredWarehousesSelector.getData);

  const warehouseOptions = useMemo(
    () => warehousesForSelect.map(tag => ({ value: tag._id, label: tag.name })),
    [warehousesForSelect],
  );

  const renderTag = ({ value: tagValue, onClose }) => (
    tagValue?.length ? (
      <Tag onClose={onClose} closable={!disabled}>
        {warehouseOptions?.find(c => c?.value === tagValue)?.label}
      </Tag>
    ) : null
  );

  return (
    <Form.Item
      label={t('CREATE.WAREHOUSE_CHOOSE')}
      valuePropName="values"
    >
      <Select
        value={value}
        defaultValue={value}
        disabled={disabled}
        placeholder={t('CREATE.WAREHOUSE_CHOOSE')}
        mode="multiple"
        options={warehouseOptions}
        onChange={onChangeCallback}
        autoComplete="off"
        showSearch
        filterOption={getSelectFilterOption}
        tagRender={renderTag}
      />
    </Form.Item>
  );
};

export default SelectWarehouses;
