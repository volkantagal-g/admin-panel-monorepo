import Excel from '@shared/utils/excel';
import { ENVIRONMENT } from '@shared/config';
import {
  GETIR_LOCALS_DOMAIN_TYPE,
  LOCALS_ORDER_STATUS,
  LOCALS_ORDER_STATUS_COLOR_MAP,
  LOCALS_RETURN_STATUS,
} from '@shared/shared/constants';
import purpleCircle from '@shared/assets/markers/artisan_order_purplebadge.png';
import redCircle from '@shared/assets/markers/artisan_order_redbadge.png';
import greenCircle from '@shared/assets/markers/artisan_order_greenbadge.png';
import orangeCircle from '@shared/assets/markers/artisan_order_orangebadge.png';
import yellowCircle from '@shared/assets/markers/artisan_order_yellowbadge.png';
import darkBlueCircle from '@shared/assets/markers/artisan_order_darkbluebadge.png';
import blueCircle from '@shared/assets/markers/artisan_order_bluebadge.png';
import lightBlueCircle from '@shared/assets/markers/artisan_order_lightbluebadge.png';
import darkGreenCircle from '@shared/assets/markers/artisan_order_darkgreenbadge.png';
import pinkCircle from '@shared/assets/markers/artisan_order_pinkbadge.png';
import brownCircle from '@shared/assets/markers/artisan_order_brownbadge.png';
import darkOrangeCircle from '@shared/assets/markers/artisan_order_darkorangebadge.png';
import darkYellowCircle from '@shared/assets/markers/artisan_order_darkyellowbadge.png';
import lightGreenCircle from '@shared/assets/markers/artisan_order_lightgreenbadge.png';
import lightPinkCircle from '@shared/assets/markers/artisan_order_lightpinkbadge.png';
import tealCircle from '@shared/assets/markers/artisan_order_tealbadge.png';
import limeCircle from '@shared/assets/markers/artisan_order_limebadge.png';
import veryLightOrangeCircle from '@shared/assets/markers/artisan_order_verylightorangebadge.png';
import blueGrayCircle from '@shared/assets/markers/artisan_order_bluegraybadge.png';
import grayCircle from '@shared/assets/markers/artisan_order_graybadge.png';

export const imgArray = [
  purpleCircle, redCircle, greenCircle, orangeCircle, yellowCircle,
  blueCircle, darkGreenCircle, pinkCircle, lightBlueCircle, darkBlueCircle,
  lightPinkCircle, darkYellowCircle, darkOrangeCircle, lightGreenCircle, brownCircle,
  tealCircle, limeCircle, veryLightOrangeCircle, blueGrayCircle, grayCircle,
];

export const iconColors = [
  '#5D3EBC', '#E23737', '#01CC78', '#F8AA1C', '#FFD300',
  '#0090FF', '#007B48', '#FF00A8', '#1BA5D0', '#001FC1',
  '#EF82FF', '#C8A729', '#FB6E45', '#45fB9D', '#854726',
  '#009688', '#cddc39', '#f9bd93', '#607d8b', '#9e9e9e',
];

export const batchedIconMarginLeft = '24px';
export const batchedIconOpacity = 0.5;
export const batchedIconPosition = 'relative';
export const batchIndexStyle = {
  backgroundColor: 'black',
  color: 'white',
};

export const defaultLocation = [41, 29];
export const activeIconImageSize = [58, 58];
export const inactiveIconImageSize = [45, 45];
export const activeIconImageOffset = [-29, -58];
export const inactiveIconImageOffset = [-39, -68];
export const activeBalloonContentOffset = [-8, -48];
export const inactiveBalloonContentOffset = [-18, -58];
export const activeReturnIconImageOffset = [-21, -50];

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
  const duration = (start && end) ?
    (((new Date(end)).getTime() - (new Date(start)).getTime()) / (1000 * 60)).toFixed(1) : '';
  return duration;
};

export const getIndex = (task, courierReturnTasks) => {
  return [...new Map(courierReturnTasks.map(courierTask => [courierTask.orderId, courierTask])).values()].findIndex(uniqueCourierTask => {
    return uniqueCourierTask.orderId === task.orderId;
  });
};

export const getBackgroundColor = (prevState, task, courierReturnTasks) => {
  let color = '';
  if (prevState.find(item => item.id === task.orderId)) {
    color = prevState.find(item => item.id === task.orderId).style.backgroundColor;
  }
  else {
    const colorIndex = [...new Map(courierReturnTasks.map(courierTask => [courierTask.orderId, courierTask])).values()].findIndex(uniqueCourierTask => {
      return uniqueCourierTask.orderId === task.orderId;
    });
    color = iconColors[colorIndex];
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

export const PICKUP = 'Pickup';
export const DELIVERY = 'Delivery';

export const getTasksBetweenPickupAndDelivery = (
  courierTasks,
  orderDetailId,
) => {
  if (!courierTasks?.length > 0) return [];

  const pickupSequence = courierTasks.find(task => {
    return task.orderId === orderDetailId && task.type === PICKUP;
  })?.sequence || 0;

  const deliverySequence = courierTasks.find(task => {
    return task.orderId === orderDetailId && task.type === DELIVERY;
  })?.sequence || 0;

  const filteredTasks = courierTasks.filter(task => {
    return task.sequence >= pickupSequence && task.sequence <= deliverySequence;
  });

  return filteredTasks;
};

export const getOrderIdsFromCourierTasks = (courierTasks, orderDetailId) => {
  const orders = [];
  courierTasks.forEach(({ orderId, domainType }) => {
    orders.push({
      orderId,
      isActive: orderDetailId === orderId,
      domainType: domainType || GETIR_LOCALS_DOMAIN_TYPE,
    });
  });
  const uniqueOrders = [...new Map(orders.map(order => [order.orderId, order])).values()];
  return uniqueOrders;
};
