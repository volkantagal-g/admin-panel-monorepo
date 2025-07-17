import { get } from 'lodash';
import moment from 'moment';

import { GETIR_10_DOMAIN_TYPE, MARKET_ACTIVE_ORDER_STATUS } from '@shared/shared/constants';

export const calculateLastActivity = ({ marketOrder }) => {
  const now = moment();

  const hasStatusUpdatedAtField = get(marketOrder, 'statusUpdatedAt', false);
  let lastActivityDiff = now.diff(marketOrder.statusUpdatedAt);
  if (hasStatusUpdatedAtField) {
    lastActivityDiff = now.diff(marketOrder.statusUpdatedAt);
  }
  // in dev env, statusUpdatedAt field is not available for some orders
  // to prevent misunderstanding, I did not delete this code block
  // delete this code block after statusUpdatedAt field is available for all orders
  else {
    if (get(marketOrder, 'checkout.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.WAITING_FOR_PICKER) {
      lastActivityDiff = now.diff(marketOrder.checkout.date);
    }
    if (get(marketOrder, 'picking.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.VERIFYING) {
      lastActivityDiff = now.diff(marketOrder.picking.date);
    }
    if (get(marketOrder, 'verify[0].date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.PREPARING) {
      lastActivityDiff = now.diff(marketOrder.verify[0].date);
    }
    if (get(marketOrder, 'prepare.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.PREPARED) {
      lastActivityDiff = now.diff(marketOrder.prepare.date);
    }
    if (get(marketOrder, 'handover.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.HANDOVER) {
      lastActivityDiff = now.diff(marketOrder.handover.date);
    }
    if (get(marketOrder, 'onway.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.ONWAY) {
      lastActivityDiff = now.diff(marketOrder.onway.date);
    }
    if (get(marketOrder, 'reach.date') && marketOrder.status === MARKET_ACTIVE_ORDER_STATUS.REACHED) {
      lastActivityDiff = now.diff(marketOrder.reach.date);
    }
  }

  const lastActivityDiffStr = parseInt(moment.duration(lastActivityDiff).asMinutes(), 10);
  return lastActivityDiffStr;
};

export function getDefaultDomainTypeForCountry({
  staticDefaultDomainType,
  availableDomainTypesForSelectedCountry,
  isNullAllowed = false,
}) {
  if (isNullAllowed && staticDefaultDomainType == null) {
    return null;
  }

  if (availableDomainTypesForSelectedCountry.includes(staticDefaultDomainType)) {
    return staticDefaultDomainType;
  }

  if (availableDomainTypesForSelectedCountry.includes(GETIR_10_DOMAIN_TYPE)) {
    return GETIR_10_DOMAIN_TYPE;
  }

  return availableDomainTypesForSelectedCountry[0];
}
