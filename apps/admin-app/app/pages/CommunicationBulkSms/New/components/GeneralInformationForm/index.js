import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Col, Form, Input, Row, Select, DatePicker, Tooltip } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { QuestionCircleOutlined } from '@ant-design/icons';

import { rules } from '@app/pages/CommunicationBulkSms/New/formHelpers';
import { convertConstantValuesToSelectOptions, convertSelectOptions } from '@shared/utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import AntCard from '@shared/components/UI/AntCard';
import { Creators } from '@app/pages/CommunicationBulkSms/New/redux/actions';
import { configSelector, getCsvFilesSelector } from '@app/pages/CommunicationBulkSms/New/redux/selectors';
import { disabledTime, disabledDate } from '@app/pages/CommunicationBulkSms/utils';
import FileUploader from '@shared/components/UI/FileUploader';
import { MIME_TYPE } from '@shared/shared/constants';
import { getS3CsvUploadUrl } from '@shared/api/communicationBulkSms';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const GeneralInformationForm = ({ form }) => {
  const { t } = useTranslation('communicationBulkSmsPage');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
  }, [dispatch]);

  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);
  const csvData = useSelector(getCsvFilesSelector.getData);

  useEffect(() => {
    if (csvData && Object.keys(csvData).length > 0) {
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

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <TargetDomainSelect
              fieldName="senderDomain"
              label={t('SENDER_DOMAIN')}
              placeholder={t('SENDER_DOMAIN')}
              rules={rules.onlyRequired}
              onChange={() => {
                form.setFieldsValue({ senderOrganizationId: undefined });
              }}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item rules={rules.onlyRequired} hasFeedback name="description" className="d-inline">
              <Input placeholder={`${t('CUSTOM_LABEL')}*`} />
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
                      disabled={isConfigPending || !targetDomain}
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
                disabled={isConfigPending}
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
                disabled={isConfigPending}
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
              <Button data-test="upload-csv-btn">
                <FileUploader
                  okText={t('UPLOAD_CSV')}
                  supportedFileTypes={[MIME_TYPE.CSV]}
                  modalTitle={t('UPLOAD_CSV')}
                  buttonText={t('UPLOAD_CSV')}
                  onOkayClick={handleConfirmSubmit}
                />
              </Button>
              {csvData && Object.keys(csvData).length > 0 && (
                <Row gutter={24}>
                  <Col md={12} xs={24}>
                    <Button
                      onClick={async () => {
                        const { signedUrl } = await getS3CsvUploadUrl({ fileName: csvData.name, presignedMethodType: 'GET' });
                        await handleDownload({ signedUrl });
                      }}
                    >
                      {csvData.originalFileName}
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              name="deliveryTime"
              label={t('DELIVERY_TIME')}
              rules={rules.onlyRequired}
            >
              <DatePicker
                onOpenChange={open => setFifteenMinutesLater(open)}
                showTime
                showNow={false}
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
