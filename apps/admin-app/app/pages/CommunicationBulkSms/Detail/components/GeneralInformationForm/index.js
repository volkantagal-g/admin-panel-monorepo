import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Col, Form, Input, Row, Select, DatePicker, Tooltip } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { QuestionCircleOutlined } from '@ant-design/icons';

import { rules } from '@app/pages/CommunicationBulkSms/Detail/formHelpers';
import { convertConstantValuesToSelectOptions, convertSelectOptions } from '@shared/utils/common';
import { getSelectedCountry, getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import AntCard from '@shared/components/UI/AntCard';
import { Creators } from '@app/pages/CommunicationBulkSms/Detail/redux/actions';
import { communicationBulkSmsUpdateSelector, configSelector, getCsvFilesSelector } from '@app/pages/CommunicationBulkSms/Detail/redux/selectors';
import { disabledTime, disabledDate } from '@app/pages/CommunicationBulkSms/utils';
import { activenessStatus } from '@app/pages/CommunicationBulkSms/constantValues';
import FileUploader from '@shared/components/UI/FileUploader';
import { MIME_TYPE } from '@shared/shared/constants';
import { getS3CsvUploadUrl } from '@shared/api/communicationBulkSms';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const GeneralInformationForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('communicationBulkSmsPage');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
  }, [dispatch]);

  const data = useSelector(communicationBulkSmsUpdateSelector.getData);
  const isDataPending = useSelector(communicationBulkSmsUpdateSelector.getIsPending);
  const { deliveryTime } = data;
  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);
  const csvData = useSelector(getCsvFilesSelector.getData);
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;

  useEffect(() => {
    if (csvData) {
      const { originalFileName, name } = csvData;
      form.setFieldsValue({
        csvDetails: {
          originalFileName,
          name,
        },
      });
    }
  }, [csvData, form]);

  const handleConfirmSubmit = (base64File, file) => {
    dispatch(Creators.getS3CsvUploadUrlRequest({ base64File, file }));
  };

  const setFifteenMinutesLater = open => {
    if (open) {
      const fifteenMinutesLater = moment().add(15, 'minutes');
      form.setFieldsValue({ deliveryTime: fifteenMinutesLater });
    }
  };

  const handleDownload = ({ signedUrl }) => {
    const a = document.createElement('a');
    a.href = signedUrl;
    a.download = csvData.originalFileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>

        <Row gutter={24} hidden>
          <Col md={12} xs={24}>
            <Form.Item label={t('VERSION')} rules={rules.onlyRequired} hasFeedback name="version">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} hidden>
          <Col md={12} xs={24}>
            <Form.Item label={t('CAMPAIGN_STATUS')} rules={rules.onlyRequired} hasFeedback name="campaignStatus">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="activenessStatus"
              label={t('ACTIVENESS_STATUS')}
              rules={rules.onlyRequired}
            >
              <Select
                loading={isConfigPending}
                disabled={!isFormEditable || isConfigPending}
                options={convertConstantValuesToSelectOptions(activenessStatus, false)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <TargetDomainSelect
              fieldName="senderDomain"
              label={t('SENDER_DOMAIN')}
              placeholder={t('SENDER_DOMAIN')}
              rules={rules.onlyRequired}
              disabled={!isFormEditable}
              onChange={() => {
                form.setFieldsValue({ senderOrganizationId: undefined });
              }}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item rules={rules.onlyRequired} hasFeedback name="description" className="d-inline">
              <Input placeholder={`${t('CUSTOM_LABEL')}*`} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.Item noStyle dependencies={['senderDomain']}>
            {({ getFieldValue }) => {
              const targetDomain = getFieldValue('senderDomain');
              return (
                <Col md={12} xs={24}>
                  <Form.Item
                    name="senderOrganizationId"
                    label={t('SENDER_ORGANIZATION')}
                    rules={rules.onlyRequired}
                  >
                    <Select
                      loading={isConfigPending}
                      disabled={!isFormEditable || isConfigPending || !targetDomain}
                      options={convertSelectOptions(
                        configData?.senderOrganizations?.[targetDomain],
                        {
                          valueKey: 'id',
                          labelKey: 'organizationName',
                          hasTranslationKey: true,
                        },
                      )}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              );
            }}
          </Form.Item>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="smsType"
              label={(
                <Tooltip title={t('SMS_TYPE_TOOLTIP')}>
                  {t('SMS_TYPE')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              <Select
                loading={isConfigPending}
                disabled={!isFormEditable || isConfigPending}
                options={convertConstantValuesToSelectOptions(configData?.smsTypes, false)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="clientType"
              label={t('CLIENT_TYPE')}
              rules={rules.onlyRequired}
            >
              <Select
                loading={isConfigPending}
                disabled={!isFormEditable || isConfigPending}
                options={convertConstantValuesToSelectOptions(configData?.clientTypes, false)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              name="csvDetails"
              label={(
                <Tooltip title={t('CLIENT_LIST_TOOLTIP')}>
                  {t('CLIENT_LIST')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              <Button disabled={!isFormEditable}>
                <FileUploader
                  okText={t('UPLOAD_CSV')}
                  supportedFileTypes={[MIME_TYPE.CSV]}
                  modalTitle={t('UPLOAD_CSV')}
                  buttonText={t('UPLOAD_CSV')}
                  onOkayClick={handleConfirmSubmit}
                />
              </Button>
              {csvData && (
                <Button
                  disabled={!isFormEditable}
                  onClick={async () => {
                    const { signedUrl } = await getS3CsvUploadUrl({ name: csvData.name, presignedMethodType: 'GET' });
                    await handleDownload({ signedUrl });
                  }}
                >
                  {csvData.originalFileName}
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              name="deliveryTime"
              label={t('DELIVERY_TIME')}
              rules={rules.checkDeliveryTime}
              valuePropName="date"
            >
              <DatePicker
                onOpenChange={open => setFifteenMinutesLater(open)}
                defaultValue={moment.utc(deliveryTime).tz(selectedCountryPrimaryTimeZone)}
                showTime
                showNow={false}
                loading={isDataPending}
                disabled={!isFormEditable || isDataPending}
                disabledTime={disabledTime}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

export default memo(GeneralInformationForm);
