import { Alert, DatePicker, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { get } from 'lodash';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { warehouseDomainTypes } from '@app/pages/FranchiseDynamicConfig/constants';

const { Option } = Select;

const ConfigInputField = ({ field, isPending, onChange }) => {
  const { type, name } = field;

  const label = get(field.label, getLangKey());

  const className = 'w-100';

  const commonProps = { className, field, label, name, isPending, onChange };

  switch (type) {
    case 'boolean':
      return <BooleanInput {...commonProps} />;
    case 'date':
      return <DateInput {...commonProps} />;
    case 'integer':
      return <IntegerInput {...commonProps} />;
    case 'objectId':
      return <ObjectIdInput {...commonProps} />;
    case 'string':
      return <StringInput {...commonProps} />;
    case 'translation':
      return <TranslationInput {...commonProps} />;
    case 'warehouseDomain':
      return <WarehouseDomainInput {...commonProps} />;
    default:
      return <Alert message={`Unknown type: ${type}`} type="error" />;
  }
};

const BooleanInput = ({ className, name, label, isPending, onChange }) => {
  const options = [
    { label: <><CheckOutlined /> True</>, value: true },
    { label: <><CloseOutlined /> False</>, value: false },
  ];

  const handleOnChange = option => {
    onChange(name, option);
  };

  return (
    <Select
      className={className}
      onChange={handleOnChange}
      disabled={isPending}
      optionLabelProp="label"
      name={name}
      placeholder={label}
      allowClear
    >
      {options.map(option => (
        <Option key={option.value} value={option.value} label={option.label}>{option.label}</Option>
      ))}
    </Select>
  );
};

const DateInput = ({ className, name, label, isPending, onChange }) => {
  const handleOnChange = option => {
    onChange(name, option ? moment(option).format('YYYY-MM-DD') : undefined);
  };

  return (
    <DatePicker
      className={className}
      onChange={handleOnChange}
      disabled={isPending}
      name={name}
      placeholder={label}
    />
  );
};

const IntegerInput = ({ className, name, label, isPending, onChange }) => {
  const handleOnChange = option => {
    onChange(name, option);
  };

  return (
    <InputNumber
      className={className}
      onChange={handleOnChange}
      disabled={isPending}
      name={name}
      placeholder={label}
    />
  );
};

const StringInput = ({ className, name, label, isPending, onChange }) => {
  const handleOnChange = e => {
    onChange(name, e.target.value !== '' ? e.target.value : undefined);
  };

  return (
    <Input
      className={className}
      onChange={handleOnChange}
      disabled={isPending}
      name={name}
      placeholder={label}
    />
  );
};

const ObjectIdInput = ({ className, name, label, isPending, onChange }) => {
  const handleOnChange = e => {
    onChange(name, e.target.value !== '' ? e.target.value : undefined);
  };

  return (
    <Input
      className={className}
      maxLength={24}
      onChange={handleOnChange}
      disabled={isPending}
      name={name}
      placeholder={label}
    />
  );
};

const TranslationInput = ({ className, name, label, isPending, onChange }) => {
  const handleOnChange = e => {
    onChange(name, e.target.value !== '' ? e.target.value : undefined);
  };

  return (
    <Input
      className={className}
      maxLength={24}
      onChange={handleOnChange}
      disabled={isPending}
      name={name}
      placeholder={label}
    />
  );
};

const WarehouseDomainInput = ({ className, label, name, isPending, onChange }) => {
  const handleOnChange = option => {
    onChange(name, option);
  };

  return (
    <Select
      className={className}
      onChange={handleOnChange}
      options={warehouseDomainTypes}
      disabled={isPending}
      name={name}
      placeholder={label}
      allowClear
    />
  );
};

export default ConfigInputField;
