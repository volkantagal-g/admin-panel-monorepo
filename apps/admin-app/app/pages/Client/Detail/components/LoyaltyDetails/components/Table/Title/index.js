import { Divider, Space } from 'antd';

import { useTranslation } from 'react-i18next';

import { Tag } from '@shared/components/GUI';

const Title = ({ cycleStatus }) => {
  const { t } = useTranslation('clientDetail');

  const { isGiftPromotionDefined, isGiftPromotionUsed } = cycleStatus;

  const tKey = value => t(value ? 'YES' : 'NO', { ns: 'global' });

  return (
    <Space split={<Divider type="vertical" />}>
      <Space>
        {t('LOYALTY.IS_GIFT_PROMOTION_DEFINED')}
        <Tag size="small" color={isGiftPromotionDefined ? 'active' : 'danger'}>
          {tKey(isGiftPromotionDefined)}
        </Tag>
      </Space>
      <Space>
        {t('LOYALTY.IS_GIFT_PROMOTION_USED')}
        <Tag size="small" color={isGiftPromotionUsed ? 'active' : 'danger'}>
          {tKey(isGiftPromotionUsed)}
        </Tag>
      </Space>
    </Space>
  );
};

export default Title;
