import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  AppLocationSettingForm,
  ContentInformationForm,
  GeneralInformationForm,
  SendingInformationForm,
  OptionalControlForm,
} from '@app/pages/NotificationCenter/New/components';
import useStyles from '@app/pages/NotificationCenter/New/styles';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const NotificationCenterNew = () => {
  usePageViewAnalytics({
    name: ROUTE.NOTIFICATION_CENTER_NEW.name,
    squad: ROUTE.NOTIFICATION_CENTER_NEW.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    canAccess(permKey.PAGE_NOTIFICATION_CENTER_NEW) ? (
      <>
        <PageHeader
          ghost={false}
          className="site-page-header"
          title={t('CREATE_ANNOUNCEMENT')}
        />
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(PAGE_TYPES.NOTIFICATION_NEW)}
          layout="horizontal"
          preserve={false}
          name="createNotificationCenterForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.announcementCreateRequest({ body: normalizeFormValues(values, PAGE_TYPES.NOTIFICATION_NEW) }));
          }}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralInformationForm form={form} />
              <AppLocationSettingForm form={form} />
              <OptionalControlForm form={form} />
              <SendingInformationForm form={form} />
              <ContentInformationForm form={form} />
            </Col>
          </Row>
        </Form>
      </>
    ) : null
  );
};

const reduxKey = REDUX_KEY.NOTIFICATION_CENTER.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(NotificationCenterNew);
