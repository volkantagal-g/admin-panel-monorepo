import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, PageHeader, Row } from 'antd';

import permKey from '@shared/shared/permKey.json';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/Email/New/formHelpers';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import { SENDER_NAME_STATE_KEY, SENDER_MAIL_STATE_KEY } from '@app/pages/Email/constants';
import { ContentInformationForm, GeneralInformationForm } from '@app/pages/Email/New/components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from '@app/pages/Email/New/styles';

const EmailNew = () => {
  usePageViewAnalytics({ name: ROUTE.EMAIL_NEW.name, squad: ROUTE.EMAIL_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    // TODO: Include all configs into one reducer // getEmailConfigRequest
    dispatch(Creators.getSenderInfoFromConfigRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.EMAIL_SERVICE_SENDER_EMAIL,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
      stateKey: SENDER_MAIL_STATE_KEY,
    }));
    dispatch(Creators.getSenderInfoFromConfigRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.EMAIL_SERVICE_SENDER_NAME,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
      stateKey: SENDER_NAME_STATE_KEY,
    }));

    dispatch(Creators.getEmailConfigRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.MARKETING_EMAIL_CONFIG,
        type: MARKET_CONFIG_QUERY_TYPES.OBJECT,
      },
    }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Can permKey={permKey.PAGE_EMAIL_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_EMAIL')}
      />
      <Form
        scrollToFirstError
        form={form}
        initialValues={getInitialValues()}
        layout="horizontal"
        preserve={false}
        name="createEmailForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.emailSaveRequest({ body: manipulateValuesBeforeSubmit(values) }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralInformationForm form={form} />
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

const reduxKey = REDUX_KEY.EMAIL.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(EmailNew);
