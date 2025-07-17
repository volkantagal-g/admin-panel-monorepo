import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { ContentInformationForm, GeneralInformationForm } from '@app/pages/TransactionalSms/New/components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from '@app/pages/TransactionalSms/New/styles';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/TransactionalSms/New/formHelpers';
import { getLangKey } from '@shared/i18n';

const TransactionalSmsNew = () => {
  usePageViewAnalytics({ name: ROUTE.TRANSACTIONAL_SMS_NEW.name, squad: ROUTE.TRANSACTIONAL_SMS_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('transactionalSmsPage');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Can permKey={permKey.PAGE_TRANSACTIONAL_SMS_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_TRANSACTIONAL_SMS')}
      />
      <Form
        scrollToFirstError
        form={form}
        initialValues={getInitialValues()}
        layout="horizontal"
        preserve={false}
        name="createTransactionalSmsForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.transactionalSmsSaveRequest({ body: manipulateValuesBeforeSubmit(values), clientLanguage: getLangKey() }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralInformationForm />
            <ContentInformationForm />
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

const reduxKey = REDUX_KEY.TRANSACTIONAL_SMS.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransactionalSmsNew);
