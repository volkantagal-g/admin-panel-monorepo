import { Field } from 'formik';
import { Checkbox, DatePicker, Radio, FormItem } from 'formik-antd';

import { AntDropdownField } from './components/CreateDropdownField';
import { AntFileUploadField } from './components/CreateFileUploadField';
import { AntInputField } from './components/CreateInputField';
import { AntInputNumberField } from './components/CreateInputNumberField';
import { getTranslatedText } from './helpers';

const renderFields = ({ formItem, isDisabled, t }) => {
  const disabled = !formItem.editable || isDisabled;
  const label = getTranslatedText(t, formItem.label);
  const placeholder = getTranslatedText(t, formItem.placeholder);

  const getTranslatedOptions = () => {
    if (Array.isArray(formItem.options)) {
      return formItem.options.map(option => ({
        label: t(option.label),
        value: option.value,
      }));
    }

    return formItem.options;
  };

  switch (formItem.componentType) {
    case 'input': {
      return (
        <Field
          t={t}
          key={formItem.name}
          name={formItem.name}
          label={label}
          placeholder={placeholder}
          component={AntInputField}
          componentName={formItem.componentName || null}
          disabled={disabled}
        />
      );
    }
    case 'inputNumber': {
      return (
        <Field
          t={t}
          key={formItem.name}
          name={formItem.name}
          label={label}
          placeholder={placeholder}
          component={AntInputNumberField}
          componentProps={formItem.componentProps}
          componentName={formItem.componentName || null}
          disabled={disabled}
        />
      );
    }
    case 'checkbox': {
      return (
        <FormItem
          t={t}
          key={formItem.name}
          name={formItem.name}
          label={formItem.options ? label : ''}
        >
          {formItem.options ? (
            <Checkbox.Group
              data-testid={`fc-${formItem.name}`}
              name={formItem.name}
              options={getTranslatedOptions()}
              disabled={disabled}
            />
          ) : (
            <Checkbox
              data-testid={`fc-${formItem.name}`}
              name={formItem.name}
              disabled={disabled}
            >
              {label}
            </Checkbox>
          )}
        </FormItem>
      );
    }
    case 'radio': {
      return (
        <FormItem key={formItem.name} name={formItem.name} label={label}>
          <Radio.Group name={formItem.name} options={getTranslatedOptions()} disabled={disabled} />
        </FormItem>
      );
    }
    case 'date': {
      return (
        <FormItem key={formItem.name} name={formItem.name} label={label}>
          <DatePicker name={formItem.name} placeholder={placeholder} disabled={disabled} />
        </FormItem>
      );
    }
    case 'dropdown': {
      return (
        <Field
          t={t}
          key={formItem.name}
          name={formItem.name}
          label={label}
          placeholder={placeholder}
          component={AntDropdownField}
          componentName={formItem.componentName || null}
          componentProps={formItem.componentProps || {}}
          disabled={disabled}
          options={formItem.options || null}
        />
      );
    }
    case 'file': {
      return (
        <Field
          t={t}
          key={formItem.name}
          name={formItem.name}
          label={label}
          placeholder={placeholder}
          component={AntFileUploadField}
          componentProps={formItem.componentProps || {}}
          disabled={disabled}
        />
      );
    }
    default:
      return null;
  }
};

export { renderFields };
