import GeneralInfo from '@app/pages/MarketProduct/DetailV2/components/GeneralInfo';
import GalleryInfo from '@app/pages/MarketProduct/DetailV2/components/GalleryInfo';
import ProductInfo from '@app/pages/MarketProduct/DetailV2/components/ProductInfo';
import PricingInfo from '@app/pages/MarketProduct/DetailV2/components/PricingInfo';
import SupplyAndLogiscticInfo from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo';
import { PRODUCT_DETAIL_TAB_ID } from '@app/pages/MarketProduct/constants';
import { filterValidationErrors } from '@app/pages/MarketProduct/utils';
import { ErrorBadge } from '@shared/components/GUI/ErrorBadge';
import permKey from '@shared/shared/permKey.json';

export const TabLabel = ({ t, label, validationErrors, tabId }) => {
  const filteredErrors = filterValidationErrors({ validationErrors, tabId });

  return (
    <>
      {label}
      <ErrorBadge
        title={t('PRODUCT_ACTIVATION_ERRORS')}
        errors={filteredErrors}
      />
    </>
  );
};

export const getTabItems = ({ t, validationErrors = [], canAccess }) => {
  const canViewPricing = canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_VIEW_PRICING_INFO);
  const tabItems = [
    {
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.GENERAL_INFO}
          label={t('GENERAL_INFO')}
          validationErrors={validationErrors}
        />
      ),
      children: <GeneralInfo />,
      key: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
    },
    {
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.GALLERY_INFO}
          label={t('GALLERY.TITLE')}
          validationErrors={validationErrors}
        />
      ),
      children: <GalleryInfo />,
      key: PRODUCT_DETAIL_TAB_ID.GALLERY_INFO,
    },
    {
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO}
          label={t('PRODUCT_INFO')}
          validationErrors={validationErrors}
        />
      ),
      children: <ProductInfo />,
      key: PRODUCT_DETAIL_TAB_ID.PRODUCT_INFO,
    },
    ...(canViewPricing ? [{
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.PRICING_INFO}
          label={t('PRICING_INFO')}
          validationErrors={validationErrors}
        />
      ),
      children: <PricingInfo />,
      key: PRODUCT_DETAIL_TAB_ID.PRICING_INFO,
    }] : []),
    {
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO}
          label={t('SUPPLY_LOGISTIC_INFO')}
          validationErrors={validationErrors}
        />
      ),
      children: <SupplyAndLogiscticInfo />,
      key: PRODUCT_DETAIL_TAB_ID.SUPPLY_LOGISTIC_INFO,
    },
  ];

  return tabItems;
};
