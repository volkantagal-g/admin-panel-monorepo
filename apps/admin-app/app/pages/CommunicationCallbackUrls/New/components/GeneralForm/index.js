import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Row, Select } from 'antd';

import { EmailInformations } from '@app/pages/CommunicationCallbackUrls/New/components/EmailForm';

import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { serviceTypes } from '@app/pages/CommunicationCallbackUrls/constantValues';
import { SERVICE_TYPES } from '@app/pages/CommunicationCallbackUrls/constants';
import { NotificationInformations } from '@app/pages/CommunicationCallbackUrls/New/components/NotificationForm';
import { SmsInformations } from '@app/pages/CommunicationCallbackUrls/New/components/SmsForm';
import LiveClock from '@shared/components/UI/LiveClock';

const GeneralForm = ({ disabled, serviceType, setServiceType }) => {
  const { t } = useTranslation('communicationCallbackUrlsPage');

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title=" ">

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label={t('SERVICE_TYPE')} hasFeedback name="serviceType">
              <Select
                options={convertConstantValuesToSelectOptions(serviceTypes)}
                onChange={setServiceType}
                defaultValue={serviceType}
                disabled={disabled}
                placeholder={t('SELECT_SERVICE_TYPE')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item noStyle dependencies={['serviceType']}>
          {() => {
            return (
              <>
                {serviceType === SERVICE_TYPES.NOTIF && (
                  <NotificationInformations disabled={disabled} />
                )}
                {serviceType === SERVICE_TYPES.EMAIL && (
                  <EmailInformations disabled={disabled} />
                )}
                {serviceType === SERVICE_TYPES.SMS && (
                  <SmsInformations disabled={disabled} />
                )}
              </>
            );
          }}
        </Form.Item>
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

export default memo(GeneralForm);
