import { useEffect, useState, useCallback } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Result, Row, Skeleton, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { ADMIN_PANEL_CONFIGS, HTTP_STATUS_CODE, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/Sms/Detail/styles';
import { Creators } from '@app/pages/Sms/Detail/redux/actions';
import permKey from '@shared/shared/permKey.json';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/Sms/Detail/formHelpers';
import { ContentInformationForm, GeneralInformationForm, ConfirmationModal } from '@app/pages/Sms/Detail/components';
import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';
import { PROCESS_STATUS, SMS_STATUS } from '@app/pages/Sms/constants';
import { smsDetailSelector } from '@app/pages/Sms/Detail/redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import PageHeader from '@app/pages/Sms/Detail/components/PageHeader';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const SmsDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.SMS_DETAIL.name,
    squad: ROUTE.SMS_DETAIL.squad,
  });
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const { id: smsId } = useParams();
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const smsDetail = useSelector(smsDetailSelector.getData);
  const smsError = useSelector(smsDetailSelector.getError);

  const isSmsDetailPending = useSelector(smsDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSmsRequest({ smsId }));

    dispatch(Creators.getSmsConfigRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.MARKETING_SMS_CONFIG,
        type: MARKET_CONFIG_QUERY_TYPES.OBJECT,
      },
    }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, smsId]);

  const countryId = get(getSelectedCountry(), '_id');
  const isCountrySms = smsDetail.countryId ? countryId === smsDetail.countryId : true;

  useEffect(() => {
    form.setFieldsValue(getInitialValues(smsDetail));
  }, [smsDetail, isFormEditable, form]);

  useEffect(() => {
    dispatch(Creators.getStatisticsRequest({ smsId }));
  }, [dispatch, smsId]);

  const updateSms = (id, formValues) => {
    dispatch(Creators.updateSmsRequest({ id, body: manipulateValuesBeforeSubmit(formValues) }));
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

    dispatch(Creators.getTargetAudienceStatisticsRequest({ clientListName: clientList, clientListType, campaignId: smsId }));
  }, [dispatch, form, smsId]);

  return (
    !smsError && canAccess(permKey.PAGE_SMS_DETAIL) ? (
      <>
        <PageHeader
          smsDetail={smsDetail}
          isSmsDetailPending={isSmsDetailPending}
          isFormEditable={isFormEditable}
          form={form}
          getAudienceStatistics={getAudienceStatistics}
        />
        <Row justify="center" className="mt-4">
          <Col lg={20}>
            <Skeleton loading={isSmsDetailPending} active className="p-5 bg-white">
              {
                isCountrySms ? (
                  <>
                    <Form
                      scrollToFirstError
                      form={form}
                      initialValues={getInitialValues(smsDetail)}
                      layout="horizontal"
                      name="createSmsForm"
                      labelCol={{ flex: '150px' }}
                      labelAlign="left"
                      onFinish={values => {
                        if (form.getFieldValue('status') === SMS_STATUS.ACTIVE) {
                          if (!canAccess(permKey.PAGE_SMS_CAN_ACTIVATE_CAMPAIGN)) {
                            dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
                            return false;
                          }

                          setConfirmationModalVisible(true);

                          // Validate sms content , depends on language
                          const contents = form.getFieldValue('contents');
                          Object.entries(contents).forEach(([lang, content]) => {
                            dispatch(Creators.validateContentRequest({ message: content?.message, lang }));
                          });

                          getAudienceStatistics();
                          return false;
                        }
                        updateSms(smsId, values);
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
                        formFooter={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, smsDetail, smsId }} />}
                      />
                    </Form>
                    <ConfirmationModal
                      isModalVisible={isConfirmationModalVisible}
                      form={form}
                      onOk={() => {
                        updateSms(smsId, form.getFieldsValue());
                        setConfirmationModalVisible(false);
                      }}
                      onCancel={() => {
                        setConfirmationModalVisible(false);
                      }}
                    />
                  </>
                ) : (
                  <CountrySelectionAlert
                    itemCountryId={smsDetail.countryId}
                    translationKey="marketing:ALERT_COUNTRY_NOTIFICATION_TITLE"
                  />
                )
              }
            </Skeleton>
          </Col>
        </Row>
      </>
    ) : <ErrorResult error={smsError} t={t} dispatch={dispatch} isCountrySms={isCountrySms} canAccess={canAccess} />
  );
};

const ErrorResult = ({ t, dispatch, isCountrySms }) => {
  return (
    <Result
      status={HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR}
      extra={!isCountrySms && (
        <Button onClick={() => dispatch(CountrySelectionModalCreators.setVisibility({ data: true }))}>
          {t('CHANGE_COUNTRY')}
        </Button>
      )}
    />
  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, smsDetail, smsId }) => {
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
                  dispatch(Creators.getSmsRequest({ smsId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-0">
            {smsDetail?.processStatus === PROCESS_STATUS.CREATED ? (
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
                <Tooltip title={t('SMS_UPDATE_INFO')}>
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

const reduxKey = REDUX_KEY.SMS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SmsDetail);
