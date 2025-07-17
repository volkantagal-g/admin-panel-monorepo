import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Row, Select } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { serviceTypes } from '@app/pages/CommunicationServiceCredentials/constantValues';
import { SERVICE_TYPES } from '@app/pages/CommunicationServiceCredentials/constants';
import { NotificationInformations, TitleInformation } from '@app/pages/CommunicationServiceCredentials/New/components/NotificationForm';
import { EmailInformations } from '@app/pages/CommunicationServiceCredentials/New/components/EmailForm';
import { SmsInformations } from '@app/pages/CommunicationServiceCredentials/New/components/SmsForm';
import LiveClock from '@shared/components/UI/LiveClock';

const GeneralForm = ({ form, disabled, serviceType, setServiceType }) => {
  const { t } = useTranslation('communicationServiceCredentialsPage');

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
                  <>
                    <NotificationInformations serviceType={serviceType} disabled={disabled} />
                    <TitleInformation disabled={disabled} />
                  </>
                )}
                {serviceType === SERVICE_TYPES.EMAIL && (
                  <EmailInformations serviceType={serviceType} disabled={disabled} />
                )}
                {serviceType === SERVICE_TYPES.SMS && (
                  <SmsInformations form={form} serviceType={serviceType} disabled={disabled} />
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
