import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import {
  orderDetailSelector,
  changeDeliveryTimeSlotSelector,
  getSlottedDeliveryOptionsSelector,
} from '../../redux/selectors';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import {
  deliveryThirdPartyProviders,
  clientStatuses,
  domainTypes,
  marketOrderPaymentStatuses,
  marketOrderStatuses,
  marketQueueStatuses,
  paymentMethods,
} from '@shared/shared/constantValues';
import {
  FOOD_ORDER_PAYMENT_STATUS,
  MARKET_ORDER_STATUS,
  ORDER_PAYMENT_STATUS_PENDING_REFUND,
  PAYMENT_METHOD,
} from '@shared/shared/constants';
import { Tag } from '@shared/components/GUI';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { marketOrderColorCodes } from '../../constants';
import { formatDate } from '@shared/utils/dateHelper';

const TagStatuses = () => {
  const { canAccess } = usePermission();
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { t } = useTranslation('marketOrderPage');
  const classes = useStyles();

  const {
    client,
    status: orderStatus,
    delivery,
    payment,
    domainType,
    country,
    city,
    promo,
    integrations,
    basket,
    provision,
  } = orderDetail ?? {};

  const { isSlottedDelivery, slottedDeliveryInfo = {} } =
    delivery ?? {};

  const isFresh = !!provision;

  const updatedSlotId = useSelector(
    changeDeliveryTimeSlotSelector.getUpdatedSlot,
  );

  const clientStatus = clientStatuses[client?.client?.status]?.[getLangKey()];
  const countryName = country?.name?.[getLangKey()];
  const cityName = city?.name?.[getLangKey()];
  const domainName = domainTypes[domainType]?.[getLangKey()];
  const status = marketOrderStatuses[orderStatus]?.[getLangKey()];
  let paymentStatus =
    marketOrderPaymentStatuses[payment?.status]?.[getLangKey()];
  const paymentMethod = paymentMethods[payment?.method]?.[getLangKey()];
  const is3DPayment = paymentMethods[payment?.is3DPayment]?.[getLangKey()];
  const queueStatus =
    marketQueueStatuses[delivery?.queue?.status]?.[getLangKey()];
  const appliedPromos = promo?.applied || [];
  const dropOffAtDoor = client?.dropOffAtDoor || false;
  const [integrationType] = integrations?.types || [];
  const { method, isApplied } = basket?.getirFinanceInfo || {};
  const { isSubscriber } = basket?.subscriptionBenefitInfo || {};
  const { type: thirdPartyProviderType } = delivery?.thirdPartyProvider || {};
  const thirdPartyProvider =
    deliveryThirdPartyProviders?.[thirdPartyProviderType]?.[getLangKey()];

  const isCancelledOrder =
    orderDetail?.status >= MARKET_ORDER_STATUS.CANCELED_COURIER;

  const isDebit =
    payment?.method === PAYMENT_METHOD.MASTER_PASS &&
    payment?.parameters &&
    payment?.parameters.cardStatus &&
    payment?.parameters.cardStatus.charAt(6) === '1';
  if (
    status >= MARKET_ORDER_STATUS.CANCELED_COURIER &&
    paymentStatus === FOOD_ORDER_PAYMENT_STATUS.PAID
  ) {
    paymentStatus =
      marketOrderPaymentStatuses[ORDER_PAYMENT_STATUS_PENDING_REFUND];
  }
  let paymentStatusInfo = `${paymentStatus} (${paymentMethod})`;
  if (isApplied) {
    if (payment?.amount === 0) {
      paymentStatusInfo = `${paymentStatus} (${
        paymentMethods[method]?.[getLangKey()]
      })`;
    }
    else {
      paymentStatusInfo = `${paymentStatusInfo} + ${t('GETIR_MONEY_TEXT')}`;
    }
  }
  const deliveryOptions = useSelector(
    getSlottedDeliveryOptionsSelector.getData,
  );
  const { slots } = deliveryOptions ?? {};

  const { deliveryEndTime, deliveryStartTime } = useMemo(() => {
    let dStartTime;
    let dEndTime;
    const { times: [startTime, endTime] = [] } =
      slots?.find(slot => slot?.slotId === updatedSlotId) ?? {};

    if (isSlottedDelivery) {
      dStartTime =
        startTime ?? formatDate(slottedDeliveryInfo?.start, 'HH:mm');
      dEndTime = endTime ?? formatDate(slottedDeliveryInfo?.end, 'HH:mm');
    }

    return {
      deliveryEndTime: dEndTime,
      deliveryStartTime: dStartTime,
    };
  }, [isSlottedDelivery, slottedDeliveryInfo, updatedSlotId, slots]);

  return (
    <div className={classes.tagComponent} data-testid="statuses">
      <Tag size="small" color="primary">
        {`${countryName ?? ''} - ${cityName ?? ''} - ${domainName ?? ''}`}
      </Tag>
      {status && (
        <Tag
          data-testid="status"
          size="small"
          color={
            isCancelledOrder
              ? marketOrderColorCodes.danger
              : marketOrderColorCodes.success
          }
        >
          {status}
        </Tag>
      )}
      {clientStatus && (
        <Tag size="small" color={marketOrderColorCodes.success}>
          {clientStatus}
        </Tag>
      )}
      {paymentStatus && (
        <Tag size="small" color={marketOrderColorCodes.warning}>
          {paymentStatusInfo}
        </Tag>
      )}
      {queueStatus && (
        <Tag size="small" color={marketOrderColorCodes.success}>
          {queueStatus}
        </Tag>
      )}
      {isDebit && (
        <Tag size="small" color={marketOrderColorCodes.warning}>
          Debit
        </Tag>
      )}
      {dropOffAtDoor && (
        <Tag size="small" color={marketOrderColorCodes.success}>
          {t('DROP_OFF_AT_DOOR')}
        </Tag>
      )}
      {is3DPayment && (
        <Tag size="small" color={marketOrderColorCodes.warning}>
          3D
        </Tag>
      )}
      {!isEmpty(integrationType) && (
        <Tag>{t(`INTEGRATION.${integrationType?.toUpperCase()}`)} </Tag>
      )}
      {appliedPromos.map(appliedPromo => (appliedPromo?.promo?.promoCode ? (
        <Tag
          size="small"
          key={appliedPromo?.promo?._id}
          color={marketOrderColorCodes.success}
        >
          {appliedPromo?.promo?.promoCode}
        </Tag>
      ) : null))}
      {isSubscriber &&
        canAccess(
          permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_SUBSCRIPTION_BENEFIT_INFO,
        ) && (
          <Tag color={marketOrderColorCodes.success}>
            {t('SUBSCRIPTION_BENEFIT_INFO.STATUS')}
          </Tag>
      )}
      {isSlottedDelivery && <Tag size="small">{t('SLOTTED_ORDER_TAG')}</Tag>}
      {isFresh && <Tag size="small">{t('FRESH_ORDER_TAG')}</Tag>}
      {isSlottedDelivery && (
        <Tag size="small">
          {`${t('SLOTTED_TIME_TAG')}: ${deliveryStartTime} - ${deliveryEndTime}`}
        </Tag>
      )}
      {thirdPartyProvider && (
        <Tag size="small" color="info">
          {thirdPartyProvider}
        </Tag>
      )}
    </div>
  );
};

export default TagStatuses;
