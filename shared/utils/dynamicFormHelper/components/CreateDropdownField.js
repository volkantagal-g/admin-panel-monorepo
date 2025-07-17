import { useMemo } from 'react';
import { Form, Select } from 'antd';

import { convertSelectOptions } from '@shared/utils/common';
import { customComponents } from '../customComponents';

const FormItem = Form.Item;

const AntDropdownField = ({ form, field, options, label, placeholder, hasFeedback, componentName, componentProps, disabled }) => {
  const CustomComponent = customComponents[componentName];

  const touched = form.touched[field.name];
  const hasError = form.errors[field.name];
  const touchedError = hasError && touched;
  const onBlur = () => form.setFieldTouched(field.name, true);

  const convertedOptions = useMemo(() => options && convertSelectOptions(options, { valueKey: 'value', labelKey: 'label', isTranslation: true }), [options]);

  const handleOnChange = option => {
    let ctrlValue = option.value;
    if (componentProps.mode === 'multiple' && Array.isArray(ctrlValue)) {
      ctrlValue = option.value.map(e => (typeof e === 'object' ? e.value : e));
    }
    else {
      ctrlValue = (typeof option.value === 'object' ? option.value : option);
    }
    form.setFieldValue(field.name, ctrlValue);
  };

  return (
    <FormItem
      label={label}
      hasFeedback={hasFeedback && touched}
      help={touchedError ? hasError : false}
      validateStatus={touchedError ? 'error' : 'success'}
      onBlur={onBlur}
    >
      {componentName ? (
        <CustomComponent
          data-testid={`fc-${field.name}`}
          placeholder={placeholder}
          isDisabled={disabled}
          value={field.value}
          {...componentProps}
          onChange={handleOnChange}
        />
      ) : (
        <Select
          data-testid={`fc-${field.name}`}
          options={convertedOptions}
          placeholder={placeholder}
          {...field}
          {...componentProps}
          disabled={disabled}
          onChange={handleOnChange}
        />
      )}
    </FormItem>
  );
};

export { AntDropdownField };
