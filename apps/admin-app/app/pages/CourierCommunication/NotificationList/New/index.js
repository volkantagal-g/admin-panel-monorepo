import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Row, Col, PageHeader, Button, Form } from 'antd';

import useStyles from './style';

import ContentInformationForm from './components/contentInformation';
import GeneralInformation from '@app/pages/CourierCommunication/NotificationList/New/components/generalInformation';
import SegmentInformation from '@app/pages/CourierCommunication/NotificationList/New/components/segmentInformation';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import NotificationDate from './components/notificationDate';
import { ROUTE } from '@app/routes';
import reducer from '@app/pages/CourierCommunication/NotificationList/New/redux/reducer';
import saga from '@app/pages/CourierCommunication/NotificationList/New/redux/saga';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { getInitialValues } from '@app/pages/Sms/New/formHelpers';

import { Creators } from '@app/pages/CourierCommunication/NotificationList/New/redux/action';
import { ContentInformationParams } from './utils';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.CREATE;

const CreateNotification = () => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  usePageViewAnalytics({ name: ROUTE.COURIER_COMMUNICATION_CREATE_NOTIFICATION.name, squad: ROUTE.COURIER_COMMUNICATION_CREATE_NOTIFICATION.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [contentInformationData, setContentInformationData] = useState();
  const [notificationName, setNotificationName] = useState();
  const [checkedList, setCheckedList] = useState({
    application: true,
    push: false,
  });
  const [priority, setPriority] = useState();
  const [category, setCategory] = useState();
  const [notificationDateData, setNotificationDateData] = useState();
  const [segmentationInformationData, setSegmentationInformationData] = useState();

  const handleSegmentInformation = data => {
    setSegmentationInformationData(data);
  };

  const handleContentInformation = data => {
    const notificationData = ContentInformationParams(data);
    const value = { notification: notificationData };
    setContentInformationData(value);
  };

  const handleCheckedList = data => {
    let pushNotification = false;
    data.forEach(list => {
      if (list === 'push') {
        pushNotification = true;
      }
    });
    setCheckedList({
      application: true,
      push: pushNotification,
    });
  };

  const handleNotificationName = value => {
    setNotificationName(value);
  };

  const handlePriority = value => {
    setPriority(value);
  };

  const handleCategory = value => {
    setCategory(value);
  };

  const handleNotificationDate = data => {
    setNotificationDateData(data);
  };

  const handleCreateNotification = () => {
    const parameters = {
      courierIds: segmentationInformationData,
      priority,
      category,
      notificationName,
      channel: checkedList,
      ...contentInformationData,
      notificationDateTime: notificationDateData,
    };
    dispatch(Creators.createNotification(parameters));
  };
  return (
    <>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.COURIER_COMMUNICATION.CREATE')} />
      </Col>
      <Form
        scrollToFirstError
        form={form}
        initialValues={getInitialValues()}
        layout="horizontal"
        preserve={false}
        name="createNotificationForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={handleCreateNotification}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <SegmentInformation
              handleData={handleSegmentInformation}
            />
            <GeneralInformation
              handleName={handleNotificationName}
              handleCheckedList={handleCheckedList}
              handlePriority={handlePriority}
              handleCategory={handleCategory}
            />
            <NotificationDate
              handleDateData={handleNotificationDate}
            />
            <ContentInformationForm
              handleData={handleContentInformation}
            />
            <Row>
              <Col xs={24} lg={24} className="text-right pb-3">
                <Button disabled={!(priority > 0) || !(notificationName?.length > 0)} htmlType="Submit" type="primary">
                  {t('button:SAVE')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateNotification;
