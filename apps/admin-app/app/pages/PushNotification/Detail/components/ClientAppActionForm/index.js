import { memo } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';
import { INACTIVE_ACTIONS } from '@app/pages/PushNotification/constants';

const ClientAppActionForm = ({ form, formFooter, isFormEditable }) => {
  const { t } = useTranslation('marketing');

  return (
    <AntCard footer={formFooter} bordered={false} title={t('APP_ACTIONS')}>
      <Form.Item dependencies={['domainType']}>
        {({ getFieldValue }) => {
          const targetDomainType = getFieldValue('domainType');
          return (
            <ClientAppActions
              form={form}
              disabled={!isFormEditable}
              isActionTypeRequired={false}
              targetServiceId={targetDomainType}
              ownerServiceId={targetDomainType}
              targetServiceFieldName="domainType"
              inactiveActions={INACTIVE_ACTIONS}
              parentObjLevels={['action']}
              Creators={Creators}
              dataObjName="actionDetail"
            />
          );
        }}
      </Form.Item>
    </AntCard>
  );
};

export default memo(ClientAppActionForm);
