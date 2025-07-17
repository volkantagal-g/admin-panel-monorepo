import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { Form, Row, Col, Select, Space, DatePicker, Input, Tooltip, Button, Modal, Typography } from 'antd';
import moment from 'moment';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '@app/pages/CommunicationHistory/redux/actions';
import { communicationChannelTypes } from '@app/pages/CommunicationHistory/constantValues';
import {
  getInitialValues,
  manipulateValuesBeforeExport,
  manipulateValuesBeforeSubmit,
} from '@app/pages/CommunicationHistory/components/CommunicationHistoryFilter/utils';
import { COMMUNICATION_CHANNEL_TYPES, SENDING_MINIMUM_DATE_DIFF, DATE_FORMAT } from '@app/pages/CommunicationHistory/constants';
import { EMAIL_FILTER_FORM, NOTIF_FILTER_FORM, SMS_FILTER_FORM } from '@app/pages/CommunicationHistory/components/CommunicationHistoryFilter/config';
import { convertConstantValuesToSelectOptions, isObjectIdValid } from '@shared/utils/common';
import { notificationReportConfigsSelector } from '@app/pages/CommunicationHistory/redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';

const DashboardFilter = ({ communicationType, setCommunicationType }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationHistoryPage');
  const [checkStartDate, setCheckStartDate] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email } = getUser();

  const notificationReportConfigs = useSelector(notificationReportConfigsSelector.getConfigs);
  const notificationTypes = notificationReportConfigs?.notificationTypes;
  const mailRegex = "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@" +
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])";

  const fields = useMemo(() => {
    if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
      return NOTIF_FILTER_FORM({ t, notificationTypes });
    }
    if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
      return EMAIL_FILTER_FORM({ t });
    }
    if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
      return SMS_FILTER_FORM({ t });
    }
    return {};
  }, [communicationType, notificationTypes, t]);

  const showModal = () => {
    const [startDate, endDate] = form.getFieldsValue().dateRange;
    const { notificationType } = form.getFieldsValue();
    form.setFieldsValue({
      startDateModal: startDate?.toISOString(),
      endDateModal: endDate?.toISOString(),
      notificationTypeModal: notificationTypes?.[notificationType],
    });
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(getInitialValues(communicationType));
  }, [form, communicationType]);

  useEffect(() => {
    dispatch(Creators.resetTableFilters());
    form.validateFields();

    const [startDate, endDate] = form.getFieldsValue().dateRange;
    if (endDate.diff(startDate, 'days') <= SENDING_MINIMUM_DATE_DIFF) {
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL &&
        form.getFieldsValue()?.email && form.getFieldsValue()?.email.toLowerCase().match(mailRegex)) {
        dispatch(Creators.setTableFilters({
          filters: {
            ...manipulateValuesBeforeSubmit(
              form.getFieldsValue(),
              communicationType,
            ),
            sort: 'createdAt,desc',
          },
          communicationType,
        }));
      }
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS && form.getFieldsValue().phoneNumber) {
        dispatch(Creators.setTableFilters({
          filters: { ...manipulateValuesBeforeSubmit(form.getFieldsValue(), communicationType), sort: 'sendingDate,desc' },
          communicationType,
        }));
      }
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF && form.getFieldsValue().clientId && isObjectIdValid(form.getFieldsValue().clientId)) {
        dispatch(Creators.setTableFilters({
          filters: { ...manipulateValuesBeforeSubmit(form.getFieldsValue(), communicationType), sort: 'createdAt,desc' },
          communicationType,
        }));
      }
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
        dispatch(Creators.getNotificationReportConfigsRequest());
      }
    }
  }, [dispatch, form, communicationType, mailRegex]);

  const setFilters = useMemo(
    () => debounce(() => {
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL || communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
        dispatch(Creators.setTableFilters({
          filters: { ...manipulateValuesBeforeSubmit(form.getFieldsValue(), communicationType), sort: 'createdAt,desc' },
          communicationType,
        }));
      }
      if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
        dispatch(Creators.setTableFilters({
          filters: { ...manipulateValuesBeforeSubmit(form.getFieldsValue(), communicationType), sort: 'sendingDate,desc' },
          communicationType,
        }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch, form, communicationType],
  );

  const exportHistory = () => {
    if (checkStartDate && !checkStartDate.isBefore(moment().subtract(6, 'months'))) {
      setFilters();
    }
    dispatch(Creators.getExportHistoryRequest({
      filters: { ...manipulateValuesBeforeExport(form.getFieldsValue()) },
      communicationType,
    }));
    setIsModalOpen(false);
  };
  return (
    <Form
      initialValues={getInitialValues((communicationType))}
      form={form}
      className="mt-3 mb-2"
      layout="inline"
    >
      <Space direction="vertical" className="w-100">
        <Row gutter={4} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Form.Item hasFeedback>
              <Select
                options={convertConstantValuesToSelectOptions(communicationChannelTypes)}
                onChange={setCommunicationType}
                defaultValue={communicationType}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={4} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Tooltip title={t('DATE_RANGE_TOOLTIP')}>
              <Form.Item
                name="dateRange"
                rules={[
                  () => ({
                    validator(_, dateRange) {
                      if (!dateRange) {
                        return Promise.reject(t('error:REQUIRED'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker.RangePicker
                  showTime
                  format={DATE_FORMAT}
                  className="w-100"
                  allowClear={false}
                  ranges={{
                    Today: [moment()
                      .startOf('day'), moment()
                      .endOf('day')],
                    Month: [moment()
                      .startOf('month'), moment()
                      .endOf('month')],
                    Year: [moment()
                      .startOf('year'), moment()
                      .endOf('year')],
                  }}
                  onChange={dates => setCheckStartDate(dates[0])}
                />
              </Form.Item>
            </Tooltip>
          </Col>
        </Row>

        <Form.Item noStyle dependencies={['communicationChannel']}>
          {() => {
            return (
              <Row gutter={[16, 8]} className="w-100">
                {communicationType === COMMUNICATION_CHANNEL_TYPES.SMS && (
                  <Col md={6} xs={12}>
                    <Tooltip title={t('PHONE_NUMBER_WARNING')}>
                      <Form.Item
                        name="phoneNumber"
                        className="d-inline"
                        rules={[
                          () => ({
                            validator(_, value) {
                              if (!value) {
                                return Promise.reject(t('error:REQUIRED'));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder={`${t('NUMBER')}`} allowClear />
                      </Form.Item>
                    </Tooltip>
                  </Col>
                )}

                {communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL && (
                  <Col md={6} xs={12}>
                    <Form.Item
                      name="email"
                      className="d-inline"
                      rules={[
                        { type: 'email' },
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              return Promise.reject(t('error:REQUIRED'));
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input placeholder={`${t('RECIPIENT')}`} allowClear />
                    </Form.Item>
                  </Col>
                )}

                {communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF && (
                  <>
                    <Col md={6} xs={12}>
                      <Form.Item
                        name="clientId"
                        className="d-inline"
                        rules={[
                          () => ({
                            validator(rule, value) {
                              if (!isObjectIdValid(value) && value) {
                                return Promise.reject(t('CLIENT_ID_OBJECT_VALIDATION'));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder={`${t('CLIENT_ID')}`} allowClear />
                      </Form.Item>
                    </Col>
                    <Col md={6} xs={12}>
                      <Form.Item
                        name="notificationId"
                        className="d-inline"
                        rules={[
                          () => ({
                            validator(rule, value) {
                              if (!isObjectIdValid(value) && value) {
                                return Promise.reject(t('NOTIFICATION_ID_OBJECT_VALIDATION'));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder={`${t('NOTIFICATION_ID')}`} allowClear />
                      </Form.Item>
                    </Col>
                    <Col md={4} xs={12}>
                      <Form.Item
                        name="templateId"
                        className="d-inline"
                        rules={[
                          () => ({
                            validator(rule, value) {
                              if (!isObjectIdValid(value) && value) {
                                return Promise.reject(t('TEMPLATE_ID_OBJECT_VALIDATION'));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder={`${t('TEMPLATE_ID')}`} allowClear />
                      </Form.Item>
                    </Col>
                  </>
                )}

                {/* Map fields from filter form obj */}
                {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
                <Tooltip
                  title={
                    checkStartDate && checkStartDate.isBefore(moment().subtract(6, 'months'))
                      ? t('BRING_BUTTON_TOOLTIP')
                      : null
                  }
                >
                  <span>
                    <Button
                      size="medium"
                      variant="contained"
                      type="primary"
                      onClick={setFilters}
                      disabled={checkStartDate && checkStartDate.isBefore(moment().subtract(6, 'months'))}
                    >
                      {t('BRING')}
                    </Button>
                  </span>
                </Tooltip>
                <Button
                  className="ml-2"
                  size="medium"
                  variant="contained"
                  type="secondary"
                  onClick={showModal}
                > {t('EXPORT')}
                </Button>
                <Modal
                  title={<Trans>{`${t('CONFIRMATION')} <strong>${email}</strong>`}</Trans>}
                  footer={[
                    <Typography.Title level={4} className="w-100 text-center">{t('CONFIRMATION_FOOTER')}</Typography.Title>,
                    <Row gutter={24}>
                      <Col md={12} xs={24}>
                        <Button className="w-100" type="primary" onClick={exportHistory}>{t('YES')}</Button>
                      </Col>
                      <Col md={12} xs={24}>
                        <Button className="w-100" onClick={handleCancel}>{t('NO')}</Button>
                      </Col>
                    </Row>,
                  ]}
                  className="text-center"
                  visible={isModalOpen}
                >
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('NOTIFICATION_TYPE')} name="notificationTypeModal">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('CLIENT_ID')} name="clientId">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('NOTIFICATION_ID')} name="notificationId">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('TEMPLATE_ID')} name="templateId">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('START_DATE')} name="startDateModal">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col md={24} xs={24}>
                      <Form.Item label={t('END_DATE')} name="endDateModal">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </Modal>
              </Row>
            );
          }}
        </Form.Item>
      </Space>
    </Form>
  );
};

const FieldWrapper = ({ field }) => {
  const { component: Component, props, wrapperProps } = field;
  return (
    <Col {...wrapperProps}>
      <Form.Item name={props.name} className="w-100">
        <Component {...props} />
      </Form.Item>
    </Col>
  );
};

export default memo(DashboardFilter);
