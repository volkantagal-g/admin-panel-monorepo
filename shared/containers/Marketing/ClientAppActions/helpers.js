import { t } from '@shared/i18n';
import { isObjectIdValid } from '@shared/utils/common';

export const rules = {
  actionType: [{ required: true, message: t('error:REQUIRED') }],
  url: [{ required: true, message: t('error:REQUIRED') }],
  openPromo: [{ required: true, message: t('error:REQUIRED') }],
  inAppPages: [{ required: true, message: t('error:REQUIRED') }],
  announcements: [{ required: true, message: t('error:REQUIRED') }],
  product: [{ required: true, message: t('error:REQUIRED') }],
  category: [{ required: true, message: t('error:REQUIRED') }],
  restaurant: [{ required: true, message: t('error:REQUIRED') }],
  search: [{ required: true, message: t('error:REQUIRED') }],
  restaurantPromoList: [{ required: true, message: t('error:REQUIRED') }],
  shop: [{ required: true, message: t('error:REQUIRED') }],
  filterShopsList: [{ required: true, message: t('error:REQUIRED') }],
  productAction: [{ required: true, message: t('error:REQUIRED') }],
  merchantType: [{ required: true, message: t('error:REQUIRED') }],
  chains: [{ required: true, message: t('error:REQUIRED') }],
  promoRule: [{ required: true, message: t('error:REQUIRED') }],
  foodDeepLinkId: [{ required: true, message: t('error:REQUIRED') }, {
    message: t('marketing:INVALID_DEEPLINK_ID'),
    validator: (_, value) => {
      if (isObjectIdValid(value)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error());
    },
  },
  ],
};
