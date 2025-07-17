import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Upload } from 'antd';
import { differenceBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { FILE_LIMIT_COUNT, FILE_TYPES } from './constant';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const ImageUpload = ({ questionGroupId, question, disabled }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('storeAuditPage');

  const [fileList, setFileList] = useState([]);
  const [fileListError, setFileListError] = useState('');

  const handlePreviewImage = async file => {
    window.open(file?.url);
  };

  const handleImageChange = event => {
    if (event.fileList.length <= FILE_LIMIT_COUNT) {
      setFileList(event.fileList);
      setFileListError('');
    }
    else {
      setFileListError(t('FILE_UPLOAD_ERROR_TEXT'));
    }
  };

  const handleUploadImage = () => {
    if ((fileList.length !== question.files.length)) {
      dispatch(Creators.uploadImagesToS3Request({ fileList, question, questionGroupId }));
    }
    else {
      const diff = differenceBy(question.files, fileList, 'name');
      if (diff.length) {
        dispatch(Creators.uploadImagesToS3Request({ fileList, question, questionGroupId }));
      }
    }
  };

  useEffect(() => {
    if (question?.files) {
      const images = question.files.map(img => {
        return {
          ...img,
          uid: img.name,
        };
      });
      setFileList(images);
    }
  }, [question]);

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={() => false}
        onPreview={handlePreviewImage}
        onChange={event => handleImageChange(event)}
        disabled={disabled}
        accept={FILE_TYPES}
        multiple
      >
        {t('SELECT_FILE')}
      </Upload>
      <p className={classes.errorText}>{fileListError}</p>
      <Button disabled={disabled} onClick={handleUploadImage}>{t('UPLOAD')}</Button>
    </div>
  );
};

export default ImageUpload;
