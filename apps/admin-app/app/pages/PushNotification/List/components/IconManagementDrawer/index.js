import { memo, useState, useEffect } from 'react';
import { Drawer, Button, Row, Col, Form, Input, Upload, Skeleton, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, DeleteOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons';

import { getBase64 } from '@shared/utils/common';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { notificationIconSelector } from '@app/pages/PushNotification/List/redux/selectors';
import { getImageDimensions } from '@shared/components/UI/ImageUploader';
import useStyles from '@app/pages/PushNotification/List/components/IconManagementDrawer/styles';
import { supportedIconFormat } from '@app/pages/PushNotification/List/components/IconManagementDrawer/constantValues';
import { validateImage } from '@shared/components/UI/ImageUploader/utils';
import DrawerHeader from '@app/pages/PushNotification/List/components/IconManagementDrawer/DrawerHeader';
import NotificationCategorySelect from '@shared/containers/Marketing/Select/NotificationCategorySelect';

const IconManagementDrawer = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const isIconListPending = useSelector(notificationIconSelector.getIsIconListPending);
  const iconList = useSelector(notificationIconSelector.getIconList);

  useEffect(() => {
    dispatch(Creators.getIconsRequest());
    dispatch(Creators.getDefaultIconUrlRequest());
  }, [dispatch]);

  return (
    <Drawer
      title={<DrawerHeader />}
      placement="right"
      zIndex={1001}
      destroyOnClose
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >

      <IconFormWrapper />

      <hr className="mt-0" />

      <Skeleton active={isIconListPending} loading={isIconListPending}>
        {iconList?.map(icon => <IconFormWrapper iconId={icon?.id} key={icon?.id} initialValues={icon} />)}
      </Skeleton>

    </Drawer>
  );
};

const IconFormWrapper = ({ iconId = null, initialValues = {} }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      preserve={false}
      onFinish={values => {
        const actionPayload = { ...values };

        if (!iconId) {
          dispatch(Creators.createIconRequest({
            formValues: actionPayload,
            onSuccess: () => {
              form.resetFields();
            },
          }));
          return true;
        }

        // Remove type and id key from actionPayload
        const { id, type, ...formValues } = actionPayload;
        dispatch(Creators.updateIconRequest({ formValues, iconId }));
        return true;
      }}
    >
      <IconFormInstance iconId={iconId} form={form} />
    </Form>
  );
};

const IconFormInstance = ({ iconId, form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageErrBag, setImageErrBag] = useState([]);

  const iconManagementPending = useSelector(notificationIconSelector.getIconManagementPending);

  const uploadButton = (<div>{imageLoading ? <LoadingOutlined /> : <PictureOutlined />}</div>);

  return (
    <Row gutter={12}>
      <Col lg={3} className={classes.uploadWrapper}>
        <Upload
          accept=".png"
          disabled={iconId}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader w-100 h-100"
          showUploadList={false}
          customRequest={({ onSuccess }) => {
            onSuccess('ok');
          }}
          onChange={({ file }) => {
            if (file.status === 'done') {
              setImageLoading(false);
              getBase64(file.originFileObj, base64 => {
                dispatch(Creators.uploadIconImageToS3Request({
                  file: { ...file, base64 },
                  cb: ({ cdnUrl }) => {
                    form.setFieldsValue({ url: cdnUrl });
                  },
                }));
              });
            }
          }}
          beforeUpload={async file => {
            setImageLoading(true);
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
            setImageLoading(false);
            return !errBag.length;
          }}
        >
          <Form.Item dependencies={['url']} noStyle>
            {({ getFieldValue }) => {
              const imageUrl = getFieldValue('url');
              return (
                imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: '100%' }}
                  />
                ) : (
                  uploadButton
                )
              );
            }}
          </Form.Item>
        </Upload>
        <Form.Item name="url" className="d-none">
          <Input />
        </Form.Item>
      </Col>

      <Col lg={18}>
        <NotificationCategorySelect
          fieldName="notificationCategory"
          disabled={iconId || iconManagementPending}
          inline
          onChange={(value, iconList) => {
            if (!iconId) {
              const selectedCategoryType = iconList.find(x => x.id === value)?.type;
              form.setFieldsValue({ type: selectedCategoryType });
            }
          }}
          form={form}
          rules={[{ required: true, message: t('error:REQUIRED') }]}
        />
        {!iconId && (
          <Form.Item name="type" className="d-none">
            <Input />
          </Form.Item>
        )}
      </Col>

      {!iconId && (
        <Col lg={3} className="text-right">
          <Form.Item dependencies={['url']}>
            {({ getFieldValue }) => {
              return (
                <Button
                  disabled={!getFieldValue('url') || iconManagementPending}
                  htmlType="submit"
                  icon={<PlusOutlined />}
                />
              );
            }}
          </Form.Item>
        </Col>
      )}

      {iconId && (
        <Col lg={3}>
          <Popconfirm
            placement="left"
            title={t('ARE_YOU_SURE_TO_DELETE_RECORD')}
            onConfirm={() => {
              // Icon type reffers to icon id

              dispatch(Creators.deleteIconRequest({ iconId }));
            }}
            okText={t('YES')}
            cancelText={t('CANCEL')}
          >
            <Button
              disabled={iconManagementPending}
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>

        </Col>
      )}

      <Col lg={24}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {imageErrBag?.map((err, index) => (<p key={index} className="text-danger mt-2 mb-0">{err}</p>))}
      </Col>
    </Row>
  );
};

export default memo(IconManagementDrawer);
