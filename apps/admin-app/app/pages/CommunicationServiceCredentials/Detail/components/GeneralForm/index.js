import { memo } from 'react';
import { Badge } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

import { SERVICE_TYPES } from '@app/pages/CommunicationServiceCredentials/constants';
import { NotificationInformations, TitleInformation } from '@app/pages/CommunicationServiceCredentials/Detail/components/NotificationForm';
import { EmailInformations } from '@app/pages/CommunicationServiceCredentials/Detail/components/EmailForm';
import { SmsInformations } from '@app/pages/CommunicationServiceCredentials/Detail/components/SmsForm';
import LiveClock from '@shared/components/UI/LiveClock';

const GeneralForm = ({ form, formFooter, isFormEditable, serviceType }) => {
  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard bordered={false} title=" " footer={formFooter}>
        {serviceType === SERVICE_TYPES.NOTIF && (
          <>
            <NotificationInformations serviceType={serviceType} isFormEditable={isFormEditable} />
            <TitleInformation isFormEditable={isFormEditable} />
          </>
        )}
        {serviceType === SERVICE_TYPES.EMAIL && (
          <EmailInformations isFormEditable={isFormEditable} serviceType={serviceType} />
        )}
        {serviceType === SERVICE_TYPES.SMS && (
          <SmsInformations form={form} isFormEditable={isFormEditable} serviceType={serviceType} />
        )}
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
