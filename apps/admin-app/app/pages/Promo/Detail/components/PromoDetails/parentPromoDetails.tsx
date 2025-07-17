import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Descriptions } from 'antd';

import { memo } from 'react';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { Hint } from '@app/pages/Promo/Detail/components/Hint';

export const ParentPromoDetails = memo(function ParentPromoDetails() {
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const { t } = useTranslation('promoPage');

  return (
    // <Descriptions bordered column={{ xs: 1, sm: ¬1, md: 2 }} size="small" title={t('PARENT_PROMO_DETAILS.TITLE')}>
    <Descriptions bordered column={1} size="small" title={t('PARENT_PROMO_DETAILS.TITLE')}>
      <Descriptions.Item label={(
        <Hint translationKey="promoPage:PARENT_PROMO_DETAILS.ACTIVE_PROMO_COUNT_HINT" placement="bottom">
          {t('PARENT_PROMO_DETAILS.ADDED_CHILD_PROMO')}
        </Hint>
      )}
      >
        {promo.parentPromoDetails.addedChildrenCount}
      </Descriptions.Item>
      <Descriptions.Item label={(
        <Hint translationKey="promoPage:PARENT_PROMO_DETAILS.TOTAL_CHILD_PROMO_COUNT_HINT" placement="bottom">
          {t('PARENT_PROMO_DETAILS.TOTAL_CHILD_PROMO_COUNT')}
        </Hint>
      )}
      >
        {promo.parentPromoDetails.totalChildrenCount}
      </Descriptions.Item>
      <Descriptions.Item label={(
        <Hint translationKey="promoPage:PARENT_PROMO_DETAILS.CREATED_CHILD_PROMO_HINT" placement="bottom">
          {t('PARENT_PROMO_DETAILS.CREATED_CHILD_PROMO')}
        </Hint>
      )}
      >
        {promo.parentPromoDetails.createdChildrenCount}
      </Descriptions.Item>
      <Descriptions.Item label={(
        <Hint translationKey="promoPage:PARENT_PROMO_DETAILS.ACTIVE_PROMO_COUNT_HINT" placement="bottom">
          {t('PARENT_PROMO_DETAILS.ACTIVE_PROMO_COUNT')}
        </Hint>
      )}
      >
        {promo.parentPromoDetails.activePromoCount}
      </Descriptions.Item>
    </Descriptions>
  );
});
