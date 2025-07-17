import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { ContentInformationForm, GeneralInformationForm, OptionalControlForm, SendingInformationForm } from '@app/pages/Announcement/New/components';
import useStyles from '@app/pages/Announcement/New/styles';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { normalizeFormValues, getInitialValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const AnnouncementNew = () => {
  usePageViewAnalytics({
    name: ROUTE.ANNOUNCEMENT_NEW.name,
    squad: ROUTE.ANNOUNCEMENT_NEW.squad,
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
    canAccess(permKey.PAGE_ANNOUNCEMENT_NEW) ? (
      <>
        <PageHeader
          ghost={false}
          className="site-page-header"
          title={t('CREATE_ANNOUNCEMENT')}
        />
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(PAGE_TYPES.ANNOUNCEMENT_NEW)}
          layout="horizontal"
          preserve={false}
          name="createAnnouncementForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.announcementSaveRequest({ body: normalizeFormValues(values, PAGE_TYPES.ANNOUNCEMENT_NEW) }));
          }}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralInformationForm form={form} />
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

const reduxKey = REDUX_KEY.ANNOUNCEMENT.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AnnouncementNew);
