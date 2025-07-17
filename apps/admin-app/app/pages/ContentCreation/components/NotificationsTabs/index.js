import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Space, Tabs } from '@shared/components/GUI';
import { getContentCreationTransactionDetailsSelector } from '@app/pages/ContentCreation/redux/selectors';
import NotificationContent from '../NotificationContent/index';

const NotificationTabs = () => {
  const { t } = useTranslation('contentCreation');
  const notifications = useSelector(getContentCreationTransactionDetailsSelector.getData);

  const items = notifications?.map((notif, key) => {
    const option = `Option ${key + 1}/${notifications?.length}`;
    return {
      label: option,
      key: option,
      children: <NotificationContent notif={notif} />,
    };
  });

  if (!notifications?.length) return null;

  return (
    <Space
      title={t('GENERATED_NOTIFICATION')}
    >
      <Tabs
        items={items}
      />
    </Space>
  );
};

export default NotificationTabs;
