import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/PushNotification/New/styles';
import {
  GeneralInformationForm,
  ListInformationForm,
  ContentInformationForm,
  SendingInformationForm,
  RulesForm,
  ClientAppActionForm,
  ControllerForm,
} from '@app/pages/PushNotification/New/components';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const PushNotificationNew = () => {
  usePageViewAnalytics({ name: ROUTE.PUSH_NOTIFICATION_NEW.name, squad: ROUTE.PUSH_NOTIFICATION_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { canAccess } = usePermission();
  const classes = useStyles();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAnnouncementRequest());
    dispatch(Creators.getMarketProductCategoriesRequest({ isSubCategory: false }));
    dispatch(CommonCreators.getMarketProductsRequest({ isActive: true, fields: ['name'], populate: [] }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    canAccess(permKey.PAGE_PUSH_NOTIFICATION_NEW) && (
      <>
        <PageHeader
          ghost={false}
          className="site-page-header"
          title={t('CREATE_PUSH_NOTIFICATION')}
        />
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(PAGE_TYPES.PUSH_NOTIFICATION_NEW)}
          layout="horizontal"
          preserve={false}
          name="createPushNotificationForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.notificationSaveRequest({ body: normalizeFormValues(values, PAGE_TYPES.PUSH_NOTIFICATION_NEW) }));
          }}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralInformationForm form={form} />
              <ControllerForm form={form} />
              <ListInformationForm form={form} />
              <ContentInformationForm form={form} />
              <SendingInformationForm form={form} />
              <RulesForm form={form} />
              <ClientAppActionForm form={form} />
              <Row>
                <Col xs={24} lg={24} className="text-right pb-3">
                  <Button htmlType="Submit" type="primary">
                    {t('button:SAVE')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </>
    )
  );
};

const reduxKey = REDUX_KEY.PUSH_NOTIFICATION.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PushNotificationNew);
