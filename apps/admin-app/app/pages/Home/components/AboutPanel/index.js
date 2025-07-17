import { Card, List } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getAboutList } from './constants';

export default function AboutPanel() {
  const { t } = useTranslation('homePage');
  return (
    <Card title={t('QUICK_INFO')}>
      <List
        dataSource={getAboutList(t)}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={item.title[getLangKey()]}
              description={item.description[getLangKey()]}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
