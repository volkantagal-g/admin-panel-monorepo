import { Form, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

const FormItem = Form.Item;

const AntFileUploadField = ({
  formik,
  name,
  label = '',
  value,
  hasFeedback,
  disabled,
  componentProps,
}) => {
  const { t } = useTranslation('personCandidatePage');

  const touched = formik.touched[name];
  const hasError = formik.errors[name];
  const touchedError = hasError && touched;
  const onBlur = () => formik.setFieldTouched(name, true);

  const handleChange = e => {
    formik.setFieldValue(name, e.fileList);
  };

  const handlePreview = async file => {
    if (file?.thumbUrl.indexOf('data:') === 0) {
      const win = window.open();
      win.document.write(`<img src="${file?.thumbUrl}"/>`);
    }
    else {
      window.open(file?.thumbUrl);
    }
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
        fileList={value}
        beforeUpload={() => false}
        onPreview={handlePreview}
        onChange={event => handleChange(event)}
        disabled={disabled}
      >
        {t('PERSON_FORM.SELECT_FILE')}
      </Upload>
    </FormItem>
  );
};

export { AntFileUploadField };
