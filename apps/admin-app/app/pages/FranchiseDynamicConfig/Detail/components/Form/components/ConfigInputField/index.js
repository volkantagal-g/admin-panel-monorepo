import { Alert, DatePicker, Input, InputNumber, Select } from 'antd';

import { get } from 'lodash';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import moment from 'moment';

import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { getLangKey } from '@shared/i18n';
import { mandatoryDateFields, warehouseDomainTypes } from '@app/pages/FranchiseDynamicConfig/constants';
import useStyles from './styles';
import { usePermission } from '@shared/hooks';
import { checkPermission } from '@app/pages/FranchiseDynamicConfig/utils';

const { Option } = Select;

const ConfigInputField = ({ field, formik, isEditable, isPending, data }) => {
  const { type, name, permissions } = field;
  const { canAccess } = usePermission();

  const label = get(field.label, getLangKey());

  const className = 'w-100';

  const commonProps = { className, field, label, name, formik, isEditable, isPending, data, permissions, canAccess };

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

const BooleanInput = ({ className, name, label, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  const options = [
    { label: <><CheckOutlined /> True</>, value: true },
    { label: <><CloseOutlined /> False</>, value: false },
  ];

  return (
    <Select
      className={className}
      onChange={option => setFieldValue(name, option)}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      optionLabelProp="label"
      value={values[name]}
      name={name}
      placeholder={label}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value} label={option.label}>{option.label}</Option>
      ))}
    </Select>
  );
};

const DateInput = ({ className, name, label, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  return (
    <DatePicker
      className={className}
      onChange={option => setFieldValue(name, option ? moment(option).format('YYYY-MM-DD') : null)}
      disabled={Object.values(mandatoryDateFields).includes(name) || !isEditable || isPending || !checkPermission(permissions, canAccess)}
      name={name}
      placeholder={label}
      value={moment(values[name])}
    />
  );
};

const IntegerInput = ({ className, name, label, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  return (
    <InputNumber
      className={className}
      onChange={option => setFieldValue(name, option)}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      name={name}
      value={values[name]}
      placeholder={label}
    />
  );
};

const StringInput = ({ className, name, label, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  return (
    <Input
      className={className}
      onChange={e => setFieldValue(name, e.target.value)}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      name={name}
      value={values[name]}
      defaultValue={values[name]}
      placeholder={label}
    />
  );
};

const ObjectIdInput = ({ className, name, label, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  return (
    <Input
      className={className}
      maxLength={24}
      onChange={e => setFieldValue(name, e.target.value)}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      name={name}
      value={values[name]}
      placeholder={label}
    />
  );
};

const TranslationInput = ({ className, name, formik, isEditable, isPending, permissions, canAccess }) => {
  const classes = useStyles();

  return (
    <MultiLanguageInput
      className={`${className}`}
      formik={formik}
      name={name}
      fieldPath={[name]}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      colProps={{ className: classes.translationInputCol }}
    />
  );
};

const WarehouseDomainInput = ({ className, label, name, formik, isEditable, isPending, permissions, canAccess }) => {
  const { setFieldValue, values } = formik;

  return (
    <Select
      className={className}
      onChange={option => setFieldValue(name, option)}
      options={warehouseDomainTypes}
      disabled={!isEditable || isPending || !checkPermission(permissions, canAccess)}
      name={name}
      value={values[name]}
      placeholder={label}
    />
  );
};

export default ConfigInputField;
