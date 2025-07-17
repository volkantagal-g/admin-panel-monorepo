import { memo, useEffect, useMemo, useState, Fragment } from 'react';
import { Form, Row, Col, Collapse, Space, Button, Divider, Typography, Modal, Switch } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';

import { NOTIFICATION_GLOBAL_STATUS } from '@app/pages/PushNotification/constants';
import { FILTER_FORM, getTimezoneOptions } from '@app/pages/PushNotification/List/components/GlobalRuleset/filterFormConstants';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { operationalCountriesSelector as countriesSelector, getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { PushNotificationRootSelector, globalRulesetSelector } from '@app/pages/PushNotification/List/redux/selectors';

import '@app/pages/PushNotification/List/components/GlobalRuleset/styles.css';
import { transformValuesForApi } from '@app/pages/PushNotification/List/components/GlobalRuleset/filterUtils';
import ColumnFieldWrapper from '@app/pages/PushNotification/List/components/GlobalRuleset/ColumnFieldWrapper';
import { getLangKey } from '@shared/i18n';

const { Panel } = Collapse;
const { Text } = Typography;

const PushNotificationList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');

  const cities = useSelector(PushNotificationRootSelector.getCities);
  const globalRuleset = useSelector(globalRulesetSelector.getFilters);
  const countries = useSelector(countriesSelector.getData || []);
  const selectedCountry = useSelector(getSelectedCountry);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGlobalStatusModalVisible, setIsGlobalStatusModalVisible] = useState(false);
  const [isGlobalStatusInProgress, setIsGlobalStatusInProgress] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState();
  const [initialValues, setInitialValues] = useState();
  const [serviceDefaults, setServiceDefaults] = useState({});
  const [enableFormEdit, setEnableFormEdit] = useState(true);

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);

  const formik = useFormik({
    initialValues: {},

    onSubmit: values => {
      const queryParams = transformValuesForApi(values);
      dispatch(Creators.createGlobalRulesetRequest({ data: queryParams }));
      setEnableFormEdit(false);
    },
  });

  const { setValues, handleSubmit, values = {}, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return selectedItem => {
      setFieldValue(fieldName, selectedItem);
    };
  };

  const handleSelectService = () => {
    return selectedItem => {
      setSelectedService(selectedItem);
    };
  };

  const handleSelectServiceOk = () => {
    return () => {
      setIsModalVisible(false);
      if (services.find(s => s === selectedService)) return;
      setFieldValue(`domainTypes['service-${selectedService}'][maxNotifSendPerMinutes]`, 1000);
      setServices([...services, selectedService]);
    };
  };

  const removeServiceSettings = service => {
    return () => {
      setServices(services.filter(s => s !== service));
      setFieldValue(`domainTypes['service-${service}']`, null);
    };
  };

  const handleInputChange = fieldName => {
    return e => {
      setFieldValue(fieldName, e.target.value);
    };
  };

  const handleSetEnableFormEdit = value => {
    return () => setEnableFormEdit(value);
  };

  const langKey = getLangKey();

  const tzOptions = useMemo(() => getTimezoneOptions(selectedCountry.timezones) || [], [selectedCountry]);

  const {
    COUNTRY,
    DELIVERY_TIME,
    PUSH_CAPS_PER_MINUTE,
    DAILY_CAP,
    DAILY_HARD_CAP,
    DAILY_SERVICE_CAP,
    SERVICE_CAP,
    FREQUENCY_CAP,
    SERVICE_SELECTOR,
    SERVICE_DELIVERY_TIME,
    SERVICE_PUSH_CAPS_PER_MINUTE,
  } = useMemo(
    () => FILTER_FORM({
      t,
      langKey,
      cities,
      countries,
      tzOptions,
      data: globalRuleset?.data,
      disabled: !enableFormEdit,
      activeDomainsFromConfig,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, langKey, countries, tzOptions, globalRuleset?.data, enableFormEdit, activeDomainsFromConfig],
  );

  const showServiceRuleModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedService(null);
    setIsModalVisible(false);
  };

  const showGlobalStatusModal = () => {
    setIsGlobalStatusModalVisible(true);
  };

  const handleGlobalStatusCancel = () => {
    setIsGlobalStatusModalVisible(false);
  };

  const handleGlobalStatusConfirm = () => {
    setIsGlobalStatusInProgress(true);
  };

  useEffect(() => {
    if (isGlobalStatusInProgress && isGlobalStatusModalVisible) {
      if (globalRuleset?.data.status === NOTIFICATION_GLOBAL_STATUS.ACTIVE) {
        dispatch(Creators.pauseAllNotificationsRequest());
      }
      else {
        dispatch(Creators.resumeAllNotificationsRequest());
      }

      setTimeout(async () => {
        setIsGlobalStatusModalVisible(false);
        setIsGlobalStatusInProgress(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGlobalStatusInProgress, isGlobalStatusModalVisible]);

  useEffect(() => {
    dispatch(Creators.getGlobalRulesetRequest({ data: {} }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry?._id]);

  useEffect(() => {
    if (!isEmpty(globalRuleset?.data) && enableFormEdit) setEnableFormEdit(false);

    const initValues = {
      [COUNTRY.name]: selectedCountry?._id,
      [DAILY_CAP.name]: DAILY_CAP.defaultValue,
      [DAILY_HARD_CAP.name]: DAILY_HARD_CAP.defaultValue,
      [DAILY_SERVICE_CAP.name]: DAILY_SERVICE_CAP.defaultValue,
      [SERVICE_CAP.name]: SERVICE_CAP.defaultValue,
      [FREQUENCY_CAP.name]: FREQUENCY_CAP.defaultValue,
      [SERVICE_SELECTOR.name]: SERVICE_SELECTOR.defaultValue,
      [PUSH_CAPS_PER_MINUTE.name]: PUSH_CAPS_PER_MINUTE.defaultValue,
      domainTypes: {},
    };
    setValues(initValues);
    setInitialValues(initValues);

    if (globalRuleset?.data?.rule?.services) {
      const defaults = {};
      // eslint-disable-next-line no-shadow
      const services = globalRuleset?.data?.rule?.services.map(serviceData => {
        const { startTime, endTime, maxNotifSendPerMinutes } = serviceData;
        defaults[serviceData.domainType] = {
          deliveryTime: { startTime, endTime },
          maxNotifSendPerMinutes,
        };
        setFieldValue(`domainTypes['service-${serviceData?.domainType}'][maxNotifSendPerMinutes]`, maxNotifSendPerMinutes);

        return serviceData.domainType;
      });
      setServiceDefaults(defaults);
      setServices(services);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalRuleset?.data]);

  if (!selectedCountry?._id || !initialValues?.[COUNTRY.name]) return 'loading...';

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Collapse>
          <Panel header={t('GLOBAL_RULESETS')} key="1">
            <Space direction="vertical" className="w-100">
              <Form
                form={form}
                initialValues={initialValues}
                className="ant-advanced-search-form push-notifications global-ruleset filter-form"
              >
                <Row gutter={24}>
                  <Col span={4}>
                    <Form.Item name={COUNTRY.name} label={t('global:COUNTRY')}>
                      {selectedCountry?.name?.[langKey]}
                    </Form.Item>
                  </Col>

                  <Col span={8} offset={4} className="service-rule-modal-switch-wrapper">
                    <span className="form-item-span-wrapper">{t('GLOBAL_NOTIFICATION_SENDING')}</span>
                    <Switch
                      checked={globalRuleset?.data?.status === NOTIFICATION_GLOBAL_STATUS.ACTIVE}
                      disabled={!enableFormEdit}
                      onClick={(_checked, event) => {
                        event.stopPropagation();
                        showGlobalStatusModal();
                      }}
                    />
                    <Modal
                      title={t('GLOBAL_NOTIFICATION_SENDING')}
                      visible={isGlobalStatusModalVisible}
                      okText={t('global:OK')}
                      cancelText={t('global:CANCEL')}
                      onOk={handleGlobalStatusConfirm}
                      onCancel={handleGlobalStatusCancel}
                      confirmLoading={isGlobalStatusInProgress}
                    >
                      {globalRuleset?.data?.status === NOTIFICATION_GLOBAL_STATUS.ACTIVE ? (
                        <p>{t('GLOBAL_NOTIFICATION_PAUSE_CONFIRM', { country: selectedCountry?.name?.[langKey] })}</p>
                      ) : (
                        <p>{t('GLOBAL_NOTIFICATION_RESUME_CONFIRM', { country: selectedCountry?.name?.[langKey] })}</p>
                      )}
                    </Modal>
                  </Col>
                </Row>
                <Divider />
                <Text className="form-label-text">{t('ALL_SERVICE_DEFAULT_RULES')}</Text>
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <table>
                        <tr>
                          <td>{t('DELIVERY_TIME')}</td>
                          <td>
                            <ColumnFieldWrapper
                              className="half-field"
                              onChange={handleSelectChange(DELIVERY_TIME.name)}
                              setFieldValue={setFieldValue}
                              fieldValues={values[DELIVERY_TIME.name]}
                              {...DELIVERY_TIME}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t('PUSH_CAPS_PER_MINUTE')}</td>
                          <td>
                            <ColumnFieldWrapper onChange={handleInputChange(PUSH_CAPS_PER_MINUTE.name)} {...PUSH_CAPS_PER_MINUTE} />
                          </td>
                        </tr>
                      </table>
                    </Row>
                  </Col>
                  <Col span={12} className="service-rule-modal-btn-wrapper">
                    <Button disabled={!enableFormEdit} onClick={showServiceRuleModal} type="secondary">
                      {t('ADD_SERVICE_RULE')}
                    </Button>
                    <Modal footer={null} visible={isModalVisible} onCancel={handleCancel} okText="Save">
                      <p>{t('SERVICE_SELECT_MODAL_MESSAGE')}</p>
                      <ColumnFieldWrapper onChange={handleSelectService()} className="service-selector-input" {...SERVICE_SELECTOR} />
                      <Row justify="end">
                        <Button type="primary" disabled={!selectedService} onClick={handleSelectServiceOk()}>
                          {t('button:SAVE')}
                        </Button>
                      </Row>
                    </Modal>
                  </Col>
                </Row>

                {services.map(service => {
                  const deliveryDefault = serviceDefaults[service]?.deliveryTime;
                  const pushCapDefault = serviceDefaults[service]?.maxNotifSendPerMinutes;
                  const serviceDeliveryData = SERVICE_DELIVERY_TIME(service, deliveryDefault);
                  const servicePushCap = SERVICE_PUSH_CAPS_PER_MINUTE(service, pushCapDefault);
                  return (
                    <Fragment key={service}>
                      <Divider />
                      <Text className="form-label-text">
                        {t(`global:GETIR_MARKET_DOMAIN_TYPES:${service}`)} {t('SPECIAL_RULES')}
                      </Text>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Row gutter={24}>
                            <table>
                              <tr>
                                <td>{t('DELIVERY_TIME')}</td>
                                <td>
                                  <ColumnFieldWrapper
                                    className="half-field"
                                    fieldValues={values?.domainTypes?.[`service-${service}`]}
                                    onChange={handleSelectChange(serviceDeliveryData.name)}
                                    setFieldValue={setFieldValue}
                                    {...serviceDeliveryData}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>{t('PUSH_CAPS_PER_MINUTE')}</td>
                                <td>
                                  <ColumnFieldWrapper onChange={handleInputChange(servicePushCap.name)} {...servicePushCap} />
                                </td>
                              </tr>
                            </table>
                          </Row>
                        </Col>
                        <Col span={12} className="service-rule-modal-btn-wrapper">
                          <Button
                            danger
                            icon={<CloseCircleOutlined />}
                            disabled={!enableFormEdit}
                            onClick={removeServiceSettings(service)}
                            type="secondary"
                          >
                            {t('REMOVE_SERVICE_RULE')}
                          </Button>
                        </Col>
                      </Row>
                    </Fragment>
                  );
                })}
                <Divider />
                <Text className="form-label-text">{t('GENERAL_RULES')}</Text>
                <Row gutter={24}>
                  <Col span={24}>
                    <Row gutter={24}>
                      <table>
                        <tr>
                          <td>{t('DAILY_CAP.LABEL')}</td>
                          <td className="flex-cell">
                            <ColumnFieldWrapper
                              value={values[DAILY_CAP.name]}
                              onChange={handleInputChange(DAILY_CAP.name)}
                              {...DAILY_CAP}
                            />
                            <Text>{t('DAILY_CAP.DESCRIPTION')}</Text>
                          </td>
                        </tr>
                        <tr>
                          <td>{t('DAILY_HARD_CAP.LABEL')}</td>
                          <td className="flex-cell">
                            <ColumnFieldWrapper
                              value={values[DAILY_HARD_CAP.name]}
                              onChange={handleInputChange(DAILY_HARD_CAP.name)}
                              {...DAILY_HARD_CAP}
                            />
                            <Text>{t('DAILY_HARD_CAP.DESCRIPTION')}</Text>
                          </td>
                        </tr>
                        <tr>
                          <td>{t('DAILY_SERVICE_CAP.LABEL')}</td>
                          <td className="flex-cell">
                            <ColumnFieldWrapper
                              value={values[DAILY_SERVICE_CAP.name]}
                              onChange={handleInputChange(DAILY_SERVICE_CAP.name)}
                              {...DAILY_SERVICE_CAP}
                            />
                            <Text>{t('DAILY_SERVICE_CAP.DESCRIPTION')}</Text>
                          </td>
                        </tr>
                        <tr>
                          <td>{t('SERVICE_CAP.LABEL')}</td>
                          <td className="flex-cell">
                            <ColumnFieldWrapper
                              value={values[SERVICE_CAP.name]}
                              onChange={handleInputChange(SERVICE_CAP.name)}
                              {...SERVICE_CAP}
                            />
                            <Text>{t('SERVICE_CAP.DESCRIPTION')}</Text>
                          </td>
                        </tr>
                        <tr>
                          <td>{t('FREQUENCY_CAP.LABEL')}</td>
                          <td className="flex-cell">
                            <ColumnFieldWrapper
                              value={values[FREQUENCY_CAP.name]}
                              onChange={handleInputChange(FREQUENCY_CAP.name)}
                              {...FREQUENCY_CAP}
                            />
                            <Text>{t('FREQUENCY_CAP.DESCRIPTION')}</Text>
                          </td>
                        </tr>
                      </table>
                    </Row>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={24} />
                <Row>
                  <Col span={24}>
                    {!enableFormEdit && (
                      <Button type="secondary" onClick={handleSetEnableFormEdit(true)}>
                        {t('button:EDIT')}
                      </Button>
                    )}
                    {enableFormEdit && (
                      <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        {t('global:APPLY')}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default memo(PushNotificationList);
