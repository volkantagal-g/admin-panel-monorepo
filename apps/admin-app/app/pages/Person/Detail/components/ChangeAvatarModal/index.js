import { useEffect, useCallback, useState } from 'react';
import { Modal, Button, Image, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';

import { useImageProps } from '../../utils';
import { AVATAR_IMAGE_SIZE, UPLOADABLE_AVATAR_FORMATS } from '../../constants';
import useStyles from './styles';

const ChangeAvatarModal = ({ isPending, isSuccessPersonUpdate, handleChangeAvatar }) => {
  const { t } = useTranslation(['personPage', 'button']);
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = useCallback(
    () => {
      if (!isPending) {
        setIsVisible(false);
        setData(null);
      }
    },
    [isPending],
  );

  const openModal = () => setIsVisible(true);

  const handleFileChange = fileValues => {
    setData(fileValues);
  };

  const handleOk = () => {
    handleChangeAvatar({ data });
  };
  const handleRemove = () => {
    setData(null);
  };

  const defaultImageProps = useImageProps({ handleFileChange, t });

  useEffect(() => {
    if (isSuccessPersonUpdate) {
      closeModal();
    }
  }, [isSuccessPersonUpdate, closeModal]);

  return (
    <>
      <Button disabled={isPending} onClick={openModal}>
        {t('PROFILE.CHANGE_AVATAR_TITLE')}
      </Button>
      <Modal
        title={t('PROFILE.CHANGE_AVATAR_TITLE')}
        visible={isVisible}
        destroyOnClose
        onCancel={closeModal}
        footer={[
          <Button
            key="back"
            loading={isPending}
            onClick={closeModal}
          >
            {t('button:CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!data}
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <ImgCrop rotate>
          <Upload
            className={classes.uploadItem}
            accept={UPLOADABLE_AVATAR_FORMATS}
            {...defaultImageProps}
            disabled={isPending}
            onRemove={handleRemove}
            fileList={[]}
          >
            {data ? (
              <Image
                preview={false}
                src={data}
                alt="avatar"
                width="auto"
                height={AVATAR_IMAGE_SIZE}
              />
            )
              :
              <Button>{t('button:UPLOAD')}</Button>}
          </Upload>
        </ImgCrop>
      </Modal>
    </>
  );
};

export default ChangeAvatarModal;
