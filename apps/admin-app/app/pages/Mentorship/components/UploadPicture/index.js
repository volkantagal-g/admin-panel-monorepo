import classNames from 'classnames';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import Image from '@shared/components/UI/Image';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getUploadPictureSelector } from './redux/selector';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import useStyles from './styles';

const reduxKey = REDUX_KEY.MENTORSHIP.UPLOAD_PICTURE;

const UploadPicture = ({ value, src, onChange, disabled, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const imageUrl = useSelector(getUploadPictureSelector.getUrl);
  const loading = useSelector(getUploadPictureSelector.getIsPending);

  const uploadButton = loading ? <LoadingOutlined /> : <CameraOutlined className={classes.uploadIcon} />;

  const handleUploadPicture = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;
      dispatch(Creators.getUploadPictureURLRequest({
        file: {
          base64: dataBase64,
          name: file.nameWithoutExtension,
          contentType: file.type,
        },
        callback: url => {
          if (typeof onChange === 'function') onChange(url);
        },
      }));
    };

    reader.onerror = () => {
      const message = 'UPLOAD_ERROR';
      dispatch(ToastCreators.error({ message }));
    };

    reader.readAsDataURL(file);
    return false;
  };

  const beforeUpload = file => {
    const tempFile = file;
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const [nameWithoutExtension] = file.name.split(extensionRegExp);
    tempFile.nameWithoutExtension = nameWithoutExtension;
    handleUploadPicture(tempFile);
    return tempFile;
  };

  return (
    <ImgCrop rotate>
      <Upload
        className={classNames(className, classes.root)}
        action={false}
        listType="picture-card"
        accept="image/png, image/jpg, image/jpeg"
        maxCount={1}
        showUploadList={false}
        beforeUpload={beforeUpload}
        {...rest}
        disabled={loading || disabled}
        data-testid="upload-picture"
      >
        {(value || imageUrl) && !loading ? (
          <>
            <Image src={value || imageUrl} alt="image" width="auto" height="auto" />
            <CameraOutlined className={classes.icon} />
          </>
        ) : uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default UploadPicture;
