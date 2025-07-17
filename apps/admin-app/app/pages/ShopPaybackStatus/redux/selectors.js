import { t } from '@shared/i18n';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_SHOP_PAYBACK_STATUS;

export const getShopCurrentPaybackStatus = {
  getData: state => ({
    ...state?.[reducerKey]?.getShopCurrentPaybackStatus.data,
    status: state?.[reducerKey]?.getShopCurrentPaybackStatus.data?.isPaused ? t('shopPaybackStatus:PAUSED') : t('shopPaybackStatus:ACTIVE'),
    buttonLabel: state?.[reducerKey]?.getShopCurrentPaybackStatus.data?.isPaused ? t('shopPaybackStatus:RESUME') : t('shopPaybackStatus:PAUSE'),
  }),
  getIsPending: state => state?.[reducerKey]?.getShopCurrentPaybackStatus.isPending,
};

export const updateShopPaybackStatus = { getIsPending: state => state?.[reducerKey]?.updateShopPaybackStatus.isPending };

export const updateAllShopsPaybackStatus = { getIsPending: state => state?.[reducerKey]?.updateAllShopsPaybackStatus.isPending };

export const updatePartialShopsPaybackStatus = { getIsPending: state => state?.[reducerKey]?.updatePartialShopsPaybackStatus.isPending };

export const validatePartialShopsPaybackStatus = { getIsPending: state => state?.[reducerKey]?.validatePartialShopsPaybackStatus.isPending };
