import { useEffect, useState, useCallback } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Result, Row, Skeleton, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ADMIN_PANEL_CONFIGS, HTTP_STATUS_CODE, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/Email/Detail/styles';
import { Creators } from '@app/pages/Email/Detail/redux/actions';
import permKey from '@shared/shared/permKey.json';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/Email/Detail/formHelpers';
import {
  ContentInformationForm,
  GeneralInformationForm,
  ConfirmationModal,
  PageHeader,
} from '@app/pages/Email/Detail/components';
import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';
import { EMAIL_PROCESS_STATUS, EMAIL_STATUS, SENDER_MAIL_STATE_KEY, SENDER_NAME_STATE_KEY } from '@app/pages/Email/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { emailDetailSelector, previewImageSelector } from '@app/pages/Email/Detail/redux/selectors';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const EmailDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.EMAIL_DETAIL.name,
    squad: ROUTE.EMAIL_DETAIL.squad,
  });
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const { id: emailId } = useParams();
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isConfirmationModalVisible, seConfirmationModalVisible] = useState(false);

  const emailDetail = useSelector(emailDetailSelector.getData);
  const emailError = useSelector(emailDetailSelector.getError);
  const isEmailDetailPending = useSelector(emailDetailSelector.getIsPending);

  const previewImageSubject = useSelector(previewImageSelector.getData)?.subject;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getEmailRequest({ emailId }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
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
  }, [dispatch, emailId]);

  const countryId = getSelectedCountry()?._id;
  const isCountryEmail = emailDetail.countryId ? countryId === emailDetail.countryId : true;

  useEffect(() => {
    form.setFieldsValue(getInitialValues(emailDetail));
  }, [form, emailDetail, isFormEditable, emailId]);

  const updateEmail = (id, formValues) => {
    dispatch(Creators.updateEmailRequest({ id, body: manipulateValuesBeforeSubmit(formValues) }));
    setIsFormEditable(false);
  };

  const getAudienceStatistics = useCallback(() => {
    let clientListType;
    let clientList;

    const clientImportTemplate = form.getFieldValue('clientImportTemplate');

    if (clientImportTemplate?.type === DRAFT_TYPES.CSV) {
      clientList = clientImportTemplate?.csv?.csvName;
      clientListType = DRAFT_TYPES.CSV;
    }

    if (clientImportTemplate?.type === DRAFT_TYPES.DRAFT) {
      clientList = clientImportTemplate?.draft.id;
      clientListType = DRAFT_TYPES.DRAFT;
    }

    dispatch(Creators.getTargetAudienceStatisticsRequest({ clientListName: clientList, clientListType, campaignId: emailId }));
  }, [dispatch, emailId, form]);

  return (
    !emailError && canAccess(permKey.PAGE_EMAIL_DETAIL) ? (
      <>
        <PageHeader
          emailDetail={emailDetail}
          isEmailDetailPending={isEmailDetailPending}
          isFormEditable={isFormEditable}
          form={form}
          getAudienceStatistics={getAudienceStatistics}
        />
        <Row justify="center" className="mt-4">
          <Col lg={20}>
            <Skeleton loading={isEmailDetailPending} active className="p-5 bg-white">
              {
                isCountryEmail ? (
                  <>
                    <Form
                      scrollToFirstError
                      form={form}
                      initialValues={getInitialValues(emailDetail)}
                      layout="horizontal"
                      name="createEmailForm"
                      labelCol={{ flex: '150px' }}
                      labelAlign="left"
                      onFinish={values => {
                        if (!previewImageSubject) {
                          dispatch(ToastCreators.error({ message: t('THE_EMAIL_TEMPLATE_SUBJECT_IS_EMPTY_PLEASE_CHECK_IT_BEFORE_SAVE') }));
                          return false;
                        }

                        if (form.getFieldValue('status') === EMAIL_STATUS.ACTIVE) {
                          if (!canAccess(permKey.PAGE_EMAIL_CAN_ACTIVATE_CAMPAIGN)) {
                            dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
                            return false;
                          }

                          seConfirmationModalVisible(true);
                          getAudienceStatistics();
                          return false;
                        }
                        dispatch(Creators.updateEmailRequest({ id: emailId, body: manipulateValuesBeforeSubmit(values) }));
                        setIsFormEditable(false);
                        return true;
                      }}
                      className={classes.antDefaultForm}
                    >
                      <GeneralInformationForm
                        isFormEditable={isFormEditable}
                        form={form}
                      />
                      <ContentInformationForm
                        form={form}
                        isFormEditable={isFormEditable}
                        emailId={emailId}
                        formFooter={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, emailDetail, emailId }} />}
                      />
                    </Form>

                    <ConfirmationModal
                      isModalVisible={isConfirmationModalVisible}
                      form={form}
                      onOk={() => {
                        updateEmail(emailId, form.getFieldsValue());
                        seConfirmationModalVisible(false);
                      }}
                      onCancel={() => {
                        seConfirmationModalVisible(false);
                      }}
                    />
                  </>
                ) : (
                  <CountrySelectionAlert
                    itemCountryId={emailDetail?.countryId}
                    translationKey="marketing:ALERT_COUNTRY_EMAIL_TITLE"
                  />
                )
              }
            </Skeleton>
          </Col>
        </Row>
      </>
    ) : <ErrorResult error={emailError} t={t} dispatch={dispatch} canAccess={canAccess} isCountryEmail={isCountryEmail} />
  );
};

const ErrorResult = ({ error, t, dispatch, canAccess, isCountryEmail }) => {
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
      status={status}
      title={status.toString()}
      subTitle={t(`global:HTTP_STATUS_MESSAGE.${status}`)}
      extra={!isCountryEmail && (
        <Button onClick={() => dispatch(CountrySelectionModalCreators.setVisibility({ data: true }))}>
          {t('CHANGE_COUNTRY')}
        </Button>
      )}
    />
  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, emailDetail, emailId }) => {
  const previewImageIsPending = useSelector(previewImageSelector.getIsPending);
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
                  dispatch(Creators.getEmailRequest({ emailId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn" disabled={previewImageIsPending}>
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-0">
            {emailDetail?.processStatus === EMAIL_PROCESS_STATUS.CREATED ? (
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
                <Tooltip title={t('EMAIL_UPDATE_INFO')}>
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

const reduxKey = REDUX_KEY.EMAIL.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(EmailDetail);
