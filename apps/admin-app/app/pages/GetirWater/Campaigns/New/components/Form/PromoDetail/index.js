import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';

import { promoTypes } from '../../../../utils/promoTypes';
import { Discount, PayXGetY } from './components';

const PromoDetail = ({ promoType }) => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  return (
    <AntCard bordered={false} title={t('FORM.PROMO_DETAIL.TITLE')}>
      {promoType === promoTypes.DISCOUNT && <Discount />}
      {promoType === promoTypes.PAY_X_GET_Y && <PayXGetY />}
    </AntCard>
  );
};

export default PromoDetail;
