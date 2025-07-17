import { message } from 'antd';
import { useDispatch } from 'react-redux';

import { getBase64 } from '@shared/utils/common';
import { t } from '@shared/i18n';

const useImageProps = Creators => {
  const dispatch = useDispatch();

  const defaultImageProps = {
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(t('success:SUCCESS'));
      }
      else if (info.file.status === 'error') {
        message.error(t('error:UNKNOWN_ERROR'));
      }
    },
    customRequest(options) {
      const { onSuccess, onError, file } = options;
      try {
        getBase64(file, _loadedImageUrl => {
          dispatch(Creators.campaignImageUrlRequest({ loadedImage: _loadedImageUrl, onSuccess }));
        });
      }
      catch (err) {
        onError(err);
      }
    },
  };

  return { defaultImageProps };
};

export default useImageProps;
