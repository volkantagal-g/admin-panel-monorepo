import { memo } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { Creators } from '@app/pages/PushNotification/New/redux/actions';
import ClientAppActions from '@shared/containers/Marketing/ClientAppActions';

import { INACTIVE_ACTIONS } from '@app/pages/PushNotification/constants';

const ClientAppActionForm = ({ form }) => {
  const { t } = useTranslation('marketing');

  return (
    <AntCard footer={false} bordered={false} title={t('APP_ACTIONS')}>
      <Form.Item dependencies={['domainType']}>
        {({ getFieldValue }) => {
          return (
            <ClientAppActions
              form={form}
              dataObjName="actionDetail"
              targetServiceId={getFieldValue('domainType')}
              ownerServiceId={getFieldValue('domainType')}
              targetServiceFieldName="domainType"
              inactiveActions={INACTIVE_ACTIONS}
              parentObjLevels={['action']}
              Creators={Creators}
            />

          );
        }}
      </Form.Item>
    </AntCard>
  );
};

export default memo(ClientAppActionForm);
