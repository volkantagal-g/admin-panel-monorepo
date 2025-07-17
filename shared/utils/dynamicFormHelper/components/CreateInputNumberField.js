import { Form } from 'antd';
import { InputNumber } from 'formik-antd';

import { customComponents } from '../customComponents';
import useStyles from './DynamicForm/styles';
import { getTranslatedText } from '../helpers';

const FormItem = Form.Item;

export const AntInputNumberField = ({ form, field, hasFeedback, label, placeholder, componentName, componentProps, disabled, t }) => {
  const classes = useStyles();
  const CustomComponent = customComponents[componentName];

  const touched = form.touched[field.name];
  const hasError = form.errors[field.name];
  const touchedError = hasError && touched;

  const onBlur = () => form.setFieldTouched(field.name, true);

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
          {...field}
          {...componentProps}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={`fc-${field.name}`}
          onChange={value => form.setFieldValue(field.name, value)}
        />
      ) : (
        <InputNumber
          {...field}
          {...componentProps}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={`fc-${field.name}`}
          className={classes.inputNumber}
          onChange={value => form.setFieldValue(field.name, +value)}
          addonAfter={componentProps?.addonAfter ? getTranslatedText(t, componentProps.addonAfter) : undefined}
        />
      )}
    </FormItem>
  );
};
