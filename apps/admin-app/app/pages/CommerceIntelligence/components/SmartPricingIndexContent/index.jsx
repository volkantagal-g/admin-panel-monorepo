import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SMART_PRICING_TABS, TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import useStyles from '@app/pages/CommerceIntelligence/SmartPricing/Index/styles';

const SmartPricingIndexContent = ({ wrapperClass, tabType }) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();

  const getTabContent = () => {
    switch (tabType) {
      case SMART_PRICING_TABS.GETIR:
        return t('SMART_PRICING.GETIR');
      case SMART_PRICING_TABS.GETIR_MORE:
        return t('SMART_PRICING.GETIR_MORE');
      default:
        return t('SMART_PRICING.GETIR');
    }
  };

  return (
    <div className={wrapperClass}>
      <div className={classes.contentPadding}>
        {getTabContent()}
      </div>
    </div>
  );
};

export default memo(SmartPricingIndexContent);
