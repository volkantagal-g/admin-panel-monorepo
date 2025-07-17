import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { ContentInformationForm, GeneralInformationForm } from '@app/pages/CommunicationBulkSms/New/components';
import { communicationBulkSmsSaveSelector } from '@app/pages/CommunicationBulkSms/New/redux/selectors';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/CommunicationBulkSms/New/styles';

import history from '@shared/utils/history';
import { getRelativeRouteWithSlug } from '@shared/utils/common';
import { manipulateValuesBeforeSubmit } from '@app/pages/CommunicationBulkSms/New/formHelpers';

const BulkSmsNew = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_BULK_SMS_NEW.name, squad: ROUTE.COMMUNICATION_BULK_SMS_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationBulkSmsPage');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }

  const urlId = useSelector(communicationBulkSmsSaveSelector.getAccessToken)?.id;

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (urlId) history.push(getRelativeRouteWithSlug(ROUTE.COMMUNICATION_BULK_SMS_DETAIL.path, { id: urlId }));
  }, [urlId]);

  return (
    <Can permKey={permKey.PAGE_COMMUNICATION_BULK_SMS_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_COMMUNICATION_BULK_SMS')}
      />
      <Form
        scrollToFirstError
        form={form}
        layout="horizontal"
        preserve={false}
        name="communicationBulkSmsForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.communicationBulkSmsSaveRequest({ body: manipulateValuesBeforeSubmit(values) }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralInformationForm form={form} />
            <ContentInformationForm />
            <Row>
              <Col xs={24} lg={24} className="text-right pb-3">
                <Button data-test="save-btn" htmlType="Submit" type="primary">
                  {t('button:SAVE')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Can>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_BULK_SMS.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BulkSmsNew);
