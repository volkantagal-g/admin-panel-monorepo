import { useState } from 'react';
import { Row, Col, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { getBase64 } from '@shared/utils/common';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { notificationIconSelector } from '@app/pages/PushNotification/List/redux/selectors';

import { getImageDimensions } from '@shared/components/UI/ImageUploader';
import useStyles from '@app/pages/PushNotification/List/components/IconManagementDrawer/styles';
import { supportedIconFormat } from '@app/pages/PushNotification/List/components/IconManagementDrawer/constantValues';
import { validateImage } from '@shared/components/UI/ImageUploader/utils';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DrawerHeader = () => {
  const { t } = useTranslation('marketing');
  const [imageErrBag, setImageErrBag] = useState([]);
  const isIconManagementPending = useSelector(notificationIconSelector.getIsIconManagementPending);
  const defaultIconUrl = useSelector(notificationIconSelector.getDefaultIconUrl);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Row>
      <Col lg={18} className="mt-1">
        <span>
          {t('ICON_MANAGEMENT')}
        </span>
      </Col>
      {canAccess(permKey.PAGE_NOTIFICATION_CENTER_LIST_COMPONENT_ICON_MANAGEMENT_EDIT_DEFAULT_ICON) && (
        <>
          <Col lg={6} className={classes.uploadWrapper}>
            <Upload
              accept=".png"
              disabled={isIconManagementPending}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader w-100 h-100"
              showUploadList={false}
              customRequest={({ onSuccess }) => {
                onSuccess('ok');
              }}
              onChange={({ file }) => {
                if (file.status === 'done') {
                  getBase64(file.originFileObj, base64 => {
                    dispatch(Creators.uploadIconImageToS3Request({
                      file: { ...file, base64 },
                      isDefault: true,
                    }));
                  });
                }
              }}
              beforeUpload={async file => {
                const { width, height } = await getImageDimensions(file);
                const { maxWidth, maxHeight, validImageRatios, types, maxImageSizeInMB } = supportedIconFormat;
                const errBag = validateImage({
                  file,
                  dimensions: { width, height },
                  validImageRatios,
                  supportedFileTypes: types,
                  maxWidth,
                  maxHeight,
                  maxImageSizeInMB,
                });
                setImageErrBag(errBag);
                return !errBag.length;
              }}
            >
              <img src={defaultIconUrl} alt="" style={{ width: '100%' }} />
            </Upload>
          </Col>
          <Col lg={24}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {imageErrBag?.map((err, index) => (<p key={index} className="text-danger mt-2 mb-0">{err}</p>))}
          </Col>
        </>
      )}

    </Row>
  );
};

export default DrawerHeader;
