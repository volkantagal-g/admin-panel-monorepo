import { get } from 'lodash';

import { t } from '@shared/i18n';
import { FOOD_DELIVERY } from '@shared/shared/constants';
import { foodOrderRequestSource } from '@shared/shared/constantValues';

export const CANCEL_FOOD_ORDER_FIELDS = {
  REQUEST_SOURCE: 'requestSource',
  CANCEL_REASON_ID: 'cancelReasonId',
  IS_APPROVED_BY_OPERATION_SQUAD: 'isApprovedByOperationSquad',
  IS_RESTAURANT_REACHED: 'isRestaurantReached',
  IS_FOOD_ORDER_READY: 'isFoodOrderReady',
  CANCEL_NOTE: 'cancelNote',
};

const swappedKeysAndValuesOfRequestSources = Object.fromEntries(Object.entries(foodOrderRequestSource).map(([key, value]) => [value, key]));

export const convertRequestSourceOptions = (deliveryType, orderStatus, cancelOptions) => Object.values(foodOrderRequestSource)
  .filter(source => cancelOptions.some(option => get(
    option,
    [
      'validStatusByRequest',
      source,
      deliveryType === FOOD_DELIVERY.GETIR
        ? 'getirDelivery'
        : 'restaurantDelivery',
    ],
    [],
  ).includes(orderStatus)))
  .map(source => ({
    label: t(`foodOrderPage:MODAL.CANCEL_FOOD_ORDER.${swappedKeysAndValuesOfRequestSources[source]}`),
    value: source,
  }));

export const WRAP_BY_RADIO_LABEL_LENGTH = 32;

export const yesOrNoOptions = [
  { label: t('foodOrderPage:MODAL.CANCEL_FOOD_ORDER.YES'), value: true },
  { label: t('foodOrderPage:MODAL.CANCEL_FOOD_ORDER.NO'), value: false },
];

export const fieldRequired = [{ required: true, message: t('error:REQUIRED') }];
