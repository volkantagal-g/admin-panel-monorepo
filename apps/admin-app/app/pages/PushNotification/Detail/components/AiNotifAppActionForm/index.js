import { memo } from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { aiNotificationActionType } from '@app/pages/PushNotification/constantValues';
import { rules } from '@shared/utils/marketing/formUtils';

const ClientAppActionForm = ({ formFooter, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const { onlyRequired } = rules;
  return (
    <AntCard footer={formFooter} bordered={false} title={t('AI_APP_ACTIONS')}>
      <Form.Item
        hasFeedback
        name="aiNotificationActionType"
        label={t('AI_NOTIF_ACTION_TYPE')}
        rules={onlyRequired}
      >
        <Select disabled={!isFormEditable} options={convertConstantValuesToSelectOptions(aiNotificationActionType)} allowClear />
      </Form.Item>
    </AntCard>
  );
};

export default memo(ClientAppActionForm);
