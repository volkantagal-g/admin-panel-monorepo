import { Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';

import { campaignDetailSelector, promoUsageDetailSelector } from '../../redux/selectors';

const PromoUsageInfo = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  const data = useSelector(campaignDetailSelector.getData);
  const promoUsageData = useSelector(promoUsageDetailSelector.getData);

  return (
    <AntCard title={t('FORM.USAGE_INFO.TITLE')}>
      <Descriptions>
        <Descriptions.Item label={t('FORM.USAGE_INFO.USED_COUNT')}>{promoUsageData.totalUsageCount}</Descriptions.Item>
        <Descriptions.Item label={t('FORM.USAGE_INFO.UNIQUE_CLIENT_COUNT')}>{promoUsageData.totalUniqueUsageCount}</Descriptions.Item>
        <Descriptions.Item label={t('FORM.USAGE_INFO.TOTAL_DISCOUNT_AMOUNT')}>{data.discountTotalAmount}</Descriptions.Item>
      </Descriptions>
    </AntCard>
  );
};

export default PromoUsageInfo;
