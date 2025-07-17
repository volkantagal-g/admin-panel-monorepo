import { Upload } from 'antd';
import { useTranslation } from 'react-i18next';

const CustomUpload = ({ formik, isDisabled }) => {
  const { t } = useTranslation('fieldAnnouncementPage');

  const { values, setFieldValue } = formik;

  const handleChange = event => {
    if (event.fileList.length > 0) {
      setFieldValue('files', event.fileList);
    }
    else {
      setFieldValue('files', []);
    }
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    else {
      window.open(src);
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={values.files}
      beforeUpload={() => false}
      onChange={event => handleChange(event)}
      onPreview={onPreview}
      disabled={isDisabled}
      accept="image/*, .pdf, .xlsx, .xls, .csv"
    >
      {t('SELECT_FILE')}
    </Upload>
  );
};

export default CustomUpload;
