import { Alert, DatePicker, Input, InputNumber, Select } from 'antd';

import { get } from 'lodash';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import moment from 'moment';

import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { getLangKey } from '@shared/i18n';
import { mandatoryDateFields, warehouseDomainTypes } from '@app/pages/FranchiseDynamicConfig/constants';
import useStyles from './styles';

const { Option } = Select;

const ConfigInputField = ({ field, formik, isEditable, isPending }) => {
  const { type, name } = field;

  const label = get(field.label, getLangKey());

  const className = 'w-100';

  const commonProps = { className, field, label, name, formik, isEditable, isPending };

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

const BooleanInput = ({ className, name, label, formik, isEditable, isPending }) => {
  const { setFieldValue } = formik;

  const options = [
    { label: <><CheckOutlined /> True</>, value: true },
    { label: <><CloseOutlined /> False</>, value: false },
  ];

  return (
    <Select
      className={className}
      onChange={option => setFieldValue(name, option)}
      disabled={!isEditable || isPending}
      optionLabelProp="label"
      name={name}
      placeholder={label}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value} label={option.label}>{option.label}</Option>
      ))}
    </Select>
  );
};

const DateInput = ({ className, name, label, formik, isEditable, isPending }) => {
  const isMandatoryDate = name === mandatoryDateFields.startDate || name === mandatoryDateFields.endDate;

  const { setFieldValue } = formik;

  // If it's start_date or end_date, we disable the dates before tomorrow
  const disabledDate = current => {
    if (isMandatoryDate) {
      return current && moment(current).isBefore(moment().endOf('day'));
    }
    return false;
  };

  const returnDateValue = option => {
    if (option) {
      if (isMandatoryDate) {
        return option.toISOString();
      }
      return moment(option).format('YYYY-MM-DD');
    }
    return null;
  };

  return (
    <DatePicker
      className={className}
      onChange={option => setFieldValue(name, returnDateValue(option))}
      disabled={!isEditable || isPending}
      name={name}
      placeholder={label}
      disabledDate={disabledDate}
      showToday={!isMandatoryDate}
    />
  );
};

const IntegerInput = ({ className, name, label, formik, isEditable, isPending }) => {
  const { setFieldValue } = formik;

  return (
    <InputNumber
      className={className}
      onChange={option => setFieldValue(name, option)}
      disabled={!isEditable || isPending}
      name={name}
      placeholder={label}
    />
  );
};

const StringInput = ({ className, name, label, formik, isEditable, isPending }) => {
  const { setFieldValue } = formik;

  return (
    <Input
      className={className}
      onChange={e => setFieldValue(name, e.target.value.trim())}
      disabled={!isEditable || isPending}
      name={name}
      placeholder={label}
    />
  );
};

const ObjectIdInput = ({ className, name, label, formik, isEditable, isPending }) => {
  const { setFieldValue } = formik;

  return (
    <Input
      className={className}
      maxLength={24}
      onChange={e => setFieldValue(name, e.target.value)}
      disabled={!isEditable || isPending}
      name={name}
      placeholder={label}
    />
  );
};

const TranslationInput = ({ className, name, formik, isEditable, isPending }) => {
  const classes = useStyles();

  return (
    <MultiLanguageInput
      className={`${className}`}
      formik={formik}
      name={name}
      fieldPath={[name]}
      disabled={!isEditable || isPending}
      colProps={{ className: classes.translationInputCol }}
    />
  );
};

const WarehouseDomainInput = ({ className, label, name, formik, isEditable, isPending }) => {
  const { setFieldValue } = formik;

  return (
    <Select
      className={className}
      onChange={option => setFieldValue(name, option)}
      options={warehouseDomainTypes}
      disabled={!isEditable || isPending}
      name={name}
      placeholder={label}
    />
  );
};

export default ConfigInputField;
