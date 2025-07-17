import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { alphabeticallySortByParam, getSelectFilterOption } from '@shared/utils/common';
import { getAllDomainOptions } from '../../constant';

const SelectDomains = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  errors = {},
  touched = {},
  label = '',
}) => {
  const { t } = useTranslation('courierGamificationPage');

  return (
    <Form.Item
      help={_.get(touched, fieldName) && _.get(errors, fieldName)}
      validateStatus={_.get(touched, fieldName) && _.get(errors, fieldName) ? 'error' : 'success'}
      name={fieldName}
      label={label}
      valuePropName="values"
    >
      <Select
        value={value}
        defaultValue={value}
        disabled={disabled}
        placeholder={t('DOMAIN')}
        mode="multiple"
        options={alphabeticallySortByParam(getAllDomainOptions(t))}
        onChange={onChangeCallback}
        autoComplete="off"
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

export default SelectDomains;
