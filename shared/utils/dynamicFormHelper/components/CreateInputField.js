import { Form } from 'antd';
import { Input } from 'formik-antd';

import { customComponents } from '../customComponents';

const FormItem = Form.Item;

const AntInputField = ({ form, field, hasFeedback, label, placeholder, componentName, componentProps, disabled }) => {
  const CustomComponent = customComponents[componentName];

  const touched = form.touched[field.name];
  const hasError = form.errors[field.name];
  const touchedError = hasError && touched;

  const onBlur = () => form.setFieldTouched(field.name, true);

  return (
    <FormItem
      label={label}
      hasFeedback={(hasFeedback && touched)}
      help={touchedError ? hasError : false}
      validateStatus={touchedError ? 'error' : 'success'}
      onBlur={onBlur}
    >
      {
        componentName ? (
          <CustomComponent
            {...field}
            {...componentProps}
            placeholder={placeholder}
            disabled={disabled}
            data-testid={`fc-${field.name}`}
            onChange={value => form.setFieldValue(field.name, value)}
          />
        )
          : (
            <Input
              {...field}
              placeholder={placeholder}
              data-testid={`fc-${field.name}`}
              disabled={disabled}
            />
          )
      }

    </FormItem>
  );
};

export { AntInputField };
