import { memo } from 'react';
import { Form, Checkbox } from 'antd';

import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { PUSH_NOTIFICATION_RULES } from '@app/pages/PushNotification/constants';

const RulesForm = () => {
  const { t } = useTranslation('marketing');

  const checkboxOptions = [
    { value: PUSH_NOTIFICATION_RULES.WITHOUT_DAILY_LIMIT, label: t('WITHOUT_DAILY_LIMIT') },
    { value: PUSH_NOTIFICATION_RULES.WITHOUT_FREQUENCY_LIMIT, label: t('WITHOUT_FREQUENCY_LIMIT') },
    { value: PUSH_NOTIFICATION_RULES.WITHOUT_SERVICE_LIMIT, label: t('WITHOUT_SERVICE_LIMIT') },
  ];

  return (
    <AntCard footer={false} bordered={false} title={t('NOTIFICATION_RULES')}>
      <Form.Item noStyle name="rules">
        <Checkbox.Group className="w-100 py-2 py-md-3" options={checkboxOptions} />
      </Form.Item>
    </AntCard>
  );
};
export default memo(RulesForm);
