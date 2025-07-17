import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Alert, Button, Col, Form, Result, Row, Skeleton, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';

import { HTTP_STATUS_CODE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/PushNotification/Detail/styles';
import {
  GeneralInformationForm,
  ListInformationForm,
  ContentInformationForm,
  SendingInformationForm,
  RulesForm,
  ClientAppActionForm,
  TestNotificationModal,
  SendingUserInformationModal,
  StatisticModal,
  ControllerForm,
  NotificationPageHeader,
  AiNotifAppActionForm,
} from '@app/pages/PushNotification/Detail/components';
import { notificationDetailSelector, testPushNotificationSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import {
  NOTIFICATION_OPTION_TYPES,
  NOTIFICATION_PROCESS_STATUS,
  NOTIFICATION_STATUS,
} from '@app/pages/PushNotification/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { isUserInfoModalAvailable } from '@app/pages/PushNotification/utils';
import permKey from '@shared/shared/permKey.json';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const PushNotificationDetail = () => {
  usePageViewAnalytics({ name: ROUTE.PUSH_NOTIFICATION_DETAIL.name, squad: ROUTE.PUSH_NOTIFICATION_DETAIL.squad });
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const { id: notificationId } = useParams();
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation('marketing');
  const [isFormEditable, setIsFormEditable] = useState(false);

  // Modal states
  const [isTestNotificationModalVisible, setIsTestNotificationModalVisible] = useState(false);
  const [isSendingUserInformationModalVisible, setIsSendingUserInformationModalVisible] = useState(false);
  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);

  const notificationDetail = useSelector(notificationDetailSelector.getData);
  const notificationDetailError = useSelector(notificationDetailSelector.getError);
  const isNotificationPending = useSelector(notificationDetailSelector.getIsPending);

  // Additional Selectors
  const testPushNotification = useSelector(testPushNotificationSelector.getData);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(PAGE_TYPES.PUSH_NOTIFICATION_DETAIL, notificationDetail));
  }, [notificationDetail, isFormEditable, form]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getNotificationRequest({ notificationId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, form, notificationId]);

  const countryId = get(getSelectedCountry(), '_id');
  const isCountryNotification = notificationDetail.targetCountry ? countryId === notificationDetail.targetCountry : true;
  const isDailyFinished = notificationDetail.processStatus === NOTIFICATION_PROCESS_STATUS.DAILY_FINISHED;

  return (
    (!notificationDetailError && canAccess(permKey.PAGE_PUSH_NOTIFICATION_DETAIL)) ? (
      <>
        <NotificationPageHeader
          t={t}
          notificationDetail={notificationDetail}
          notificationId={notificationId}
          isNotificationPending={isNotificationPending}
          isCountryNotification={isCountryNotification}
          {...{ setIsTestNotificationModalVisible, setIsSendingUserInformationModalVisible, setIsStatisticsModalVisible }}
        />
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <Skeleton loading={isNotificationPending} active className="p-5 bg-white">
              {isCountryNotification ? (
                <>
                  {/* Primary form */}
                  <Form
                    scrollToFirstError
                    form={form}
                    initialValues={getInitialValues(PAGE_TYPES.PUSH_NOTIFICATION_DETAIL, notificationDetail)}
                    layout="horizontal"
                    preserve={false}
                    name="createPushNotificationForm"
                    labelCol={{ flex: '150px' }}
                    labelAlign="left"
                    onFinish={values => {
                      const status = form.getFieldValue('status');
                      if (status === NOTIFICATION_STATUS.ACTIVE && !canAccess(permKey.PAGE_PUSH_NOTIFICATION_CAN_ACTIVATE_CAMPAIGN)) {
                        dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
                        return false;
                      }
                      dispatch(Creators.updateNotificationRequest({
                        id: notificationId,
                        body: normalizeFormValues(values, PAGE_TYPES.PUSH_NOTIFICATION_DETAIL),
                      }));
                      setIsFormEditable(false);
                      return true;
                    }}
                    className={classes.antDefaultForm}
                  >
                    <GeneralInformationForm form={form} isFormEditable={isFormEditable && !isDailyFinished} notificationId={notificationId} />
                    <ControllerForm form={form} isFormEditable={isFormEditable && !isDailyFinished} />
                    <ListInformationForm form={form} isFormEditable={isFormEditable && !isDailyFinished} />
                    {/* Only Content Area can editable on daily finished status */}
                    <ContentInformationForm form={form} isFormEditable={isFormEditable} />
                    <SendingInformationForm form={form} isFormEditable={isFormEditable && !isDailyFinished} />
                    <RulesForm form={form} isFormEditable={isFormEditable && !isDailyFinished} />

                    {/* Hide action on ai notifs */}
                    <Form.Item noStyle dependencies={['notificationType']}>
                      {({ getFieldsValue }) => {
                        const { notificationType } = getFieldsValue(['domainType', 'notificationType']);
                        console.log(notificationType);
                        return notificationType !== NOTIFICATION_OPTION_TYPES.AI ? (
                          <ClientAppActionForm
                            form={form}
                            formFooter={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, notificationDetail, notificationId }} />}
                            isFormEditable={isFormEditable && !isDailyFinished}
                          />
                        ) : (
                          <AiNotifAppActionForm
                            form={form}
                            formFooter={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, notificationDetail, notificationId }} />}
                            isFormEditable={isFormEditable && !isDailyFinished}
                          />
                        );
                      }}
                    </Form.Item>
                  </Form>

                  {/* Modals && Other components */}
                  {canAccess(permKey.PAGE_PUSH_NOTIFICATION_CAN_TEST_CAMPAIGN) && (
                    <TestNotificationModal
                      isModalVisible={isTestNotificationModalVisible}
                      notificationId={notificationId}
                      onCancel={() => {
                        setIsTestNotificationModalVisible(false);
                      }}
                    />
                  )}

                  {isUserInfoModalAvailable(notificationDetail) && (
                    <SendingUserInformationModal
                      isModalVisible={isSendingUserInformationModalVisible}
                      notificationId={notificationId}
                      onCancel={() => {
                        setIsSendingUserInformationModalVisible(false);
                      }}
                    />
                  )}

                  <StatisticModal
                    isModalVisible={isStatisticsModalVisible}
                    notificationId={notificationId}
                    onCancel={() => {
                      setIsStatisticsModalVisible(false);
                    }}
                  />

                  {!testPushNotification && (
                    <div className="fixed-bottom start-0 w-100 toast-z-index ">
                      <Alert
                        message={t('TEST_PUSH_WARNING_MESSAGE')}
                        type="warning"
                        className="w-100 text-center"
                      />
                    </div>
                  )}
                </>
              )
                : (
                  <CountrySelectionAlert
                    itemCountryId={notificationDetail.targetCountry}
                    translationKey="marketing:ALERT_COUNTRY_NOTIFICATION_TITLE"
                  />
                )}
            </Skeleton>
          </Col>
        </Row>
      </>
    ) : <ErrorResult t={t} dispatch={dispatch} error={notificationDetailError} canAccess={canAccess} />

  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, notificationDetail, notificationId }) => {
  return (
    <Row justify="end" gutter={24} className="mb-5 pb-4 pb-md-0 mt-2">
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.getNotificationRequest({ notificationId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-0">
            {notificationDetail.processStatus === NOTIFICATION_PROCESS_STATUS.CREATED ||
              notificationDetail.processStatus === NOTIFICATION_PROCESS_STATUS.DAILY_FINISHED ?
              (
                <Button
                  size="small"
                  onClick={() => {
                    setIsFormEditable(true);
                  }}
                >
                  {t('button:EDIT')}
                </Button>
              )
              : (
                <Tooltip title={t('NOTIFICATION_UPDATE_INFO')}>
                  <Button disabled size="small">
                    {t('button:EDIT')}
                  </Button>
                </Tooltip>
              )}
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const ErrorResult = ({ error, t, canAccess }) => {
  let status;
  if (!canAccess) {
    status = HTTP_STATUS_CODE.NOT_FOUND.FORBIDDEN;
  }
  else {
    if (error?.response?.status === HTTP_STATUS_CODE.NOT_FOUND) {
      status = HTTP_STATUS_CODE.NOT_FOUND;
    }
    status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
  return (
    <Result
      status={status.toString()}
      title={status.toString()}
      subTitle={t(`global:HTTP_STATUS_MESSAGE.${status}`)}
    />
  );
};

const reduxKey = REDUX_KEY.PUSH_NOTIFICATION.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PushNotificationDetail);
