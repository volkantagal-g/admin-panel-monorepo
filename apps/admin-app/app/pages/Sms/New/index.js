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
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { ContentInformationForm, GeneralInformationForm } from '@app/pages/Sms/New/components';
import useStyles from '@app/pages/Sms/New/styles';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/Sms/New/formHelpers';

const SmsNew = () => {
  usePageViewAnalytics({ name: ROUTE.SMS_NEW.name, squad: ROUTE.SMS_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Can permKey={permKey.PAGE_SMS_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_SMS')}
      />
      <Form
        scrollToFirstError
        form={form}
        initialValues={getInitialValues()}
        layout="horizontal"
        preserve={false}
        name="createSmsForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.smsSaveRequest({ body: manipulateValuesBeforeSubmit(values) }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralInformationForm form={form} />
            <ContentInformationForm form={form} />
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
    </Can>
  );
};

const reduxKey = REDUX_KEY.SMS.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SmsNew);
