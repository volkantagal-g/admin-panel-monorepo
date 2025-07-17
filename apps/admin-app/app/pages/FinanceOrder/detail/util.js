import moment from 'moment';

import blueCircle from '@shared/assets/markers/finance_order_bluebadge.png';
import darkBlueCircle from '@shared/assets/markers/finance_order_darkbluebadge.png';
import darkGreenCircle from '@shared/assets/markers/finance_order_darkgreenbadge.png';
import greenCircle from '@shared/assets/markers/finance_order_greenbadge.png';
import lightBlueCircle from '@shared/assets/markers/finance_order_lightbluebadge.png';
import orangeCircle from '@shared/assets/markers/finance_order_orangebadge.png';
import pinkCircle from '@shared/assets/markers/finance_order_pinkbadge.png';
import purpleCircle from '@shared/assets/markers/finance_order_purplebadge.png';
import redCircle from '@shared/assets/markers/finance_order_redbadge.png';
import yellowCircle from '@shared/assets/markers/finance_order_yellowbadge.png';
import { ENVIRONMENT } from '@shared/config';
import { getirFinanceOrderNotActiveList } from '@shared/shared/constantValues';
import {
  LOCALS_ORDER_STATUS,
  LOCALS_ORDER_STATUS_COLOR_MAP,
  LOCALS_RETURN_STATUS,
} from '@shared/shared/constants';
import Excel from '@shared/utils/excel';

export const imgArray = [
  purpleCircle,
  redCircle,
  greenCircle,
  orangeCircle,
  yellowCircle,
  blueCircle,
  darkGreenCircle,
  pinkCircle,
  lightBlueCircle,
  darkBlueCircle,
];

export const iconColors = [
  '#5D3EBC',
  '#E23737',
  '#01CC78',
  '#F8AA1C',
  '#FFD300',
  '#0090FF',
  '#007B48',
  '#FF00A8',
  '#1BA5D0',
  '#001FC1',
];

export const batchedIconMarginLeft = '24px';
export const batchedIconOpacity = 0.5;
export const batchedIconPosition = 'relative';
export const batchIndexStyle = {
  backgroundColor: 'black',
  color: 'white',
};

export const exportFinancialInfoToExcel = (data = {}) => {
  return new Excel({
    name: 'financialInfo',
    fields: data.fields,
    data: data.content,
  }).export();
};

export const getOrderStatusColor = status => {
  if (status <= LOCALS_ORDER_STATUS.BROWSING) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
  }

  if (
    status > LOCALS_ORDER_STATUS.BROWSING &&
    status <= LOCALS_ORDER_STATUS.RATED
  ) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.SUCCESS;
  }

  if (status >= LOCALS_ORDER_STATUS.RATED) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DANGER;
  }

  return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
};

export const getReturnStatusColor = status => {
  if (status <= LOCALS_RETURN_STATUS.COURIER_ON_WAY) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
  }

  if (
    status > LOCALS_RETURN_STATUS.COURIER_ON_WAY &&
    status <= LOCALS_RETURN_STATUS.APPROVED_BY_SHOP_PARTIALLY
  ) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.SUCCESS;
  }

  if (status >= LOCALS_RETURN_STATUS.APPROVED_BY_SHOP_PARTIALLY) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DANGER;
  }

  return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
};

export const calculateDiffTime = (start, end) => {
  const duration =
    start && end
      ? (
        (new Date(end).getTime() - new Date(start).getTime()) /
          (1000 * 60)
      ).toFixed(1)
      : '';
  return duration;
};

export const getIndex = (task, batchedReturns) => {
  const index = batchedReturns.findIndex(item => item.id === task.returnId);
  return index;
};

export const getBackgroundColor = (prevState, task, batchedReturns) => {
  let color = '';
  if (prevState.find(item => item.id === task.returnId)) {
    color = prevState.find(item => item.id === task.returnId).style
      .backgroundColor;
  }
  else {
    color =
      iconColors[batchedReturns.findIndex(item => item.id === task.returnId)];
  }
  return color;
};

export const IS_PROD_ENV = ENVIRONMENT.ENV === 'production';

export const priceFormatter = price => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(price)) {
    return price;
  }

  return Number.parseFloat(price).toFixed(2);
};

export const calcUpdatedBasketAmount = productUpdateHistory => productUpdateHistory?.reduce((acc, product) => acc + product.price.new, 0);

export const secondsToMinutes = seconds => moment.utc(1000 * seconds).format('mm');

export const getIsOrderActive = status => !getirFinanceOrderNotActiveList.includes(Number(status));
