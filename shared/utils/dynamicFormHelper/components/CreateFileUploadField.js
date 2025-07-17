import { Form, Upload } from 'antd';

import { getTranslatedText } from '../helpers';

const FormItem = Form.Item;

const AntFileUploadField = ({ form, field, label, hasFeedback, disabled, componentProps, t }) => {
  const touched = form.touched[field.name];
  const hasError = form.errors[field.name];
  const touchedError = hasError && touched;
  const onBlur = () => form.setFieldTouched(field.name, true);

  const handleChange = event => {
    if (event.fileList.length > 0) {
      form.setFieldValue(field.name, event.fileList);
    }
    else {
      form.setFieldValue(field.name, '');
    }
  };

  const handlePreview = async file => {
    window.open(file?.thumbUrl);
  };

  return (
    <FormItem
      label={label}
      hasFeedback={(hasFeedback && touched)}
      help={touchedError ? hasError : false}
      validateStatus={touchedError ? 'error' : 'success'}
      onBlur={onBlur}
    >
      <Upload
        {...componentProps}
        listType="picture-card"
        fileList={field.value}
        beforeUpload={() => false}
        onPreview={handlePreview}
        onChange={event => handleChange(event)}
        disabled={disabled}
      >
        {getTranslatedText(t, 'personCandidatePage:PERSON_FORM.SELECT_FILE')}
      </Upload>
    </FormItem>
  );
};

export { AntFileUploadField };
