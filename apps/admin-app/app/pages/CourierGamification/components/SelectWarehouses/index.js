import { useTranslation } from 'react-i18next';
import { Form, Select, Tag } from 'antd';
import _ from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

const SelectWarehouses = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  errors = {},
  touched = {},
  selectKey,
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
      help={_.get(touched, fieldName) && _.get(errors, fieldName)}
      validateStatus={_.get(touched, fieldName) && _.get(errors, fieldName) ? 'error' : 'success'}
      name={fieldName}
      label={t('CREATE.WAREHOUSE_CHOOSE')}
      valuePropName="values"
    >
      <Select
        key={selectKey}
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
