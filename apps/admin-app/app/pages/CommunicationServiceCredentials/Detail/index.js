import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, PageHeader, Result, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { GeneralForm } from '@app/pages/CommunicationServiceCredentials/Detail/components';
import { HTTP_STATUS_CODE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/CommunicationServiceCredentials/Detail/styles';
import { Creators } from '@app/pages/CommunicationServiceCredentials/Detail/redux/actions';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/CommunicationServiceCredentials/Detail/formHelpers';

import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';
import { communicationServiceCredentialsUpdateSelector } from '@app/pages/CommunicationServiceCredentials/Detail/redux/selectors';
import { requestErrorReasonOptions } from '@app/pages/CommunicationServiceCredentials/constantValues';
import { getLangKey } from '@shared/i18n';
import { REQUEST_ERROR_REASON } from '@app/pages/CommunicationServiceCredentials/constants';
import { getDetailPageTitle } from '@app/pages/CommunicationServiceCredentials/utils';

const CommunicationServiceCredentialsDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_DETAIL.name,
    squad: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_DETAIL.squad,
  });

  const [form] = Form.useForm();
  const { id: communicationServiceCredentialsId } = useParams();
  const serviceType = parseInt(useParams().serviceType, 10);
  const title = getDetailPageTitle(serviceType);
  const { t } = useTranslation('communicationServiceCredentialsPage');

  const dispatch = useDispatch();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }
  const [isFormEditable, setIsFormEditable] = useState(false);

  const credentialsDetail = useSelector(communicationServiceCredentialsUpdateSelector.getData);
  const credentialsError = useSelector(communicationServiceCredentialsUpdateSelector.getError);
  const credentialsPending = useSelector(communicationServiceCredentialsUpdateSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.communicationServiceCredentialsGetRequest({ communicationServiceCredentialsId, serviceType }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, communicationServiceCredentialsId, serviceType]);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(credentialsDetail, serviceType));
  }, [credentialsDetail, isFormEditable, form, serviceType]);

  return (
    credentialsError ? <ErrorResult error={credentialsError} t={t} dispatch={dispatch} /> :
      (
        <>
          <PageHeader
            ghost={false}
            title={t(title)}
            subTitle={communicationServiceCredentialsId}
          />
          <Skeleton loading={credentialsPending} active className="p-5 bg-white">
            <Form
              scrollToFirstError
              form={form}
              initialValues={getInitialValues(credentialsDetail, serviceType)}
              layout="horizontal"
              name="detailCredentialsForm"
              labelCol={{ flex: '150px' }}
              labelAlign="left"
              onFinish={values => {
                dispatch(Creators.communicationServiceCredentialsUpdateRequest({
                  id: communicationServiceCredentialsId,
                  body: manipulateValuesBeforeSubmit(values, serviceType),
                  serviceType,
                }));
                setIsFormEditable(false);
              }}
              className={classes.antDefaultForm}
            >
              <Row justify="center" className="mt-4">
                <Col xxl={16} xl={20} lg={20} xs={24}>
                  <GeneralForm
                    form={form}
                    isFormEditable={isFormEditable}
                    serviceType={serviceType}
                    formFooter={(
                      <FormFooter
                        {...{ isFormEditable, setIsFormEditable, dispatch, t, credentialsDetail, communicationServiceCredentialsId, serviceType }}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form>
          </Skeleton>
        </>
      )
  );
};

const ErrorResult = ({ error, t, dispatch }) => {
  const data = error.response?.data;
  return (
    <Result
      status={data?.errorReason ? HTTP_STATUS_CODE.NOT_FOUND : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR}
      title={get(requestErrorReasonOptions[data?.errorReason], getLangKey(), '')}
      extra={data?.errorReason === REQUEST_ERROR_REASON.WRONG_COUNTRY_SELECTION && (
        <Button onClick={() => dispatch(CountrySelectionModalCreators.setVisibility({ data: true }))}>
          {t('CHANGE_COUNTRY')}
        </Button>
      )}
    />
  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, communicationServiceCredentialsId, serviceType }) => {
  return (
    <Row justify="end" gutter={24}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mt-3">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.communicationServiceCredentialsGetRequest({ communicationServiceCredentialsId, serviceType }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mt-3">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-3">
            <Button
              size="small"
              onClick={() => {
                setIsFormEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_SERVICE_CREDENTIALS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CommunicationServiceCredentialsDetail);
