import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Form, Typography, Modal, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { GeneralForm } from '@app/pages/CommunicationServiceCredentials/New/components';
import useStyles from '@app/pages/CommunicationServiceCredentials/New/styles';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/CommunicationServiceCredentials/New/formHelpers';
import { communicationServiceCredentialsSaveSelector } from '@app/pages/CommunicationServiceCredentials/New/redux/selectors';
import { getRelativeRouteWithSlug } from '@shared/utils/common';

const CommunicationServiceCredentialsNew = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_NEW.name, squad: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationServiceCredentialsPage');
  const { Can } = usePermission();
  const [form] = Form.useForm();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');
  const navigate = useNavigate();

  if (backTop) {
    backTop.style.right = '55px';
  }

  const [serviceType, setServiceType] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const accessToken = useSelector(communicationServiceCredentialsSaveSelector.getAccessToken)?.accessToken;
  const credentialId = useSelector(communicationServiceCredentialsSaveSelector.getAccessToken)?.id;

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      setVisibility(true);
    }
  }, [accessToken]);

  return (
    <Can permKey={permKey.PAGE_COMMUNICATION_SERVICE_CREDENTIALS_NEW}>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title={t('CREATE_COMMUNICATION_SERVICE_CREDENTIALS')}
      />
      <Form
        scrollToFirstError
        form={form}
        initialValues={getInitialValues()}
        layout="horizontal"
        preserve={false}
        name="communicationServiceCredentialsForm"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        onFinish={values => {
          dispatch(Creators.communicationServiceCredentialsSaveRequest({ body: manipulateValuesBeforeSubmit(values, serviceType), serviceType }));
        }}
        className={classes.antDefaultForm}
      >
        <Row justify="center" className="mt-4">
          <Col xxl={16} xl={20} lg={20} xs={24}>
            <GeneralForm form={form} disabled={!!accessToken} serviceType={serviceType} setServiceType={setServiceType} />
            { serviceType && (
              <Row>
                <Col xs={24} lg={24} className="text-right pb-3">
                  <Button htmlType="Submit" type="primary">
                    {t('button:SAVE')}
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form>

      <Modal
        centered
        visible={visibility}
        onCancel={() => {
          setVisibility(false);
          navigate(getRelativeRouteWithSlug(ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_DETAIL.path, { id: credentialId, serviceType }));
        }}
        footer={null}
      >
        <Row gutter={24}>
          <Col md={24} xs={24}>
            <Typography.Title level={5}>{t('ACCESS_TOKEN_WARNING')}</Typography.Title>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={24} xs={24} className="mt-3">
            <Typography.Text>{accessToken}</Typography.Text>
          </Col>
        </Row>
      </Modal>
    </Can>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_SERVICE_CREDENTIALS.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CommunicationServiceCredentialsNew);
