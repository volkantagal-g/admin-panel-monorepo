import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { notificationSelector } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/selectors';
import useStyles from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/styles';
import { convertChannelOptions } from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/utils';
import SegmentInformation from '@app/pages/CourierCommunication/NotificationList/Detail/components/SegmentInformation';
import GeneralInformation from '@app/pages/CourierCommunication/NotificationList/Detail/components/GeneralInformation';
import NotificationDate from '@app/pages/CourierCommunication/NotificationList/Detail/components/NotificationDate';
import ContentInformation from '@app/pages/CourierCommunication/NotificationList/Detail/components/ContentInformation';
import FormActions from '@app/pages/CourierCommunication/NotificationList/Detail/components/FormActions';
import { NOTIFICATION_STATUS } from '@app/pages/CourierCommunication/NotificationList/List/constants';

const NotificationEditForm = ({ handleFormSubmission }) => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const notification = useSelector(notificationSelector.getData);
  const isNotificationPending = useSelector(notificationSelector.getIsPending);

  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    courierIds: notification?.courierIds ?? [],
    name: notification?.name ?? '',
    channel: convertChannelOptions(notification) ?? ['app'],
    priority: notification?.priority ?? 0,
    category: notification?.category ?? '',
    scheduledAt: notification?.scheduledAt ?? '',
    notification: notification?.notification ?? { title: {}, message: {} },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      setIsEditing(false);
      handleFormSubmission(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleFormReset = () => {
    resetForm();
    setIsEditing(false);
  };

  return (
    <Form
      scrollToFirstError
      form={form}
      name="editNotificationForm"
      onReset={handleFormReset}
      onFinish={handleSubmit}
      layout="horizontal"
      labelCol={{ flex: '150px' }}
      labelAlign="left"
      initialValues={initialValues}
    >
      <Row justify="center">
        <Col xs={20} className={classes.column}>
          <SegmentInformation
            value={values.courierIds}
            handleOnChange={setFieldValue}
            isDisabled={isNotificationPending || !isEditing}
          />
          <GeneralInformation
            values={{ name: values.name, channel: values.channel, priority: values.priority, category: values.category }}
            handleOnChange={setFieldValue}
            isDisabled={isNotificationPending || !isEditing}
          />
          <NotificationDate
            value={values.scheduledAt}
            handleOnChange={setFieldValue}
            isDisabled={isNotificationPending || !isEditing}
          />
          <ContentInformation
            handleOnChange={setFieldValue}
            value={values.notification}
            isDisabled={isNotificationPending || !isEditing}
          />
          {notification.status === NOTIFICATION_STATUS.PENDING_NOTIFICATION && <FormActions isEditing={isEditing} setIsEditing={setIsEditing} />}
        </Col>
      </Row>
    </Form>
  );
};

export default NotificationEditForm;
