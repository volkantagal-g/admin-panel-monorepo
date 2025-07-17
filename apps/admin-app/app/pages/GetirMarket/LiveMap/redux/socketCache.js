import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { FAILED_ORDER_CODES } from '../constants';

const {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
} = require('@shared/shared/constants');

const INITIAL_COUNT = {
  [GETIR_10_DOMAIN_TYPE]: 0,
  [GETIR_FOOD_DOMAIN_TYPE]: 0,
  [GETIR_MARKET_DOMAIN_TYPE]: 0,
  [GETIR_VOYAGER_DOMAIN_TYPE]: 0,
  [GETIR_LOCALS_DOMAIN_TYPE]: 0,
};

class SocketCache {
  constructor() {
    this.failedOrderMarkers = [];
    this.cleanFailOrderIntervalInMs = 30_000; // 30 secs
    this.resetData();
  }

  updateCourier(courier) {
    const id = courier._id || courier.id;
    if (this.couriers[id]) {
      this.couriers[id] = { ...this.couriers[id], ...courier };
    }
    else {
      this.couriers[id] = courier;
    }
  }

  addFailedOrder(order) {
    const id = order._id || order.id;
    this.failedOrders[id] = { order, failedAt: Date.now() };
  }

  cleanOldData() {
    // remove logged out couriers
    Object.entries(this.couriers).forEach(([id, courier]) => {
      if (!courier.isLoggedIn) delete this.couriers[id];
    });

    const nowMs = Date.now();

    // remove failed orders after some time
    Object.entries(this.failedOrders).forEach(([id, orderData]) => {
      if (nowMs - orderData.failedAt > this.cleanFailOrderIntervalInMs) delete this.failedOrders[id];
    });

    // also reset fail counts
    this.resetFailOrderCounts();
    this.failedOrderMarkers = [];
  }

  countFailedOrders(selectedCity, selectedCountry) {
    Object.values(this.failedOrders).forEach(orderData => {
      const { order } = orderData;

      if (GETIR_MARKET_DOMAIN_TYPES.includes(order.domainType)) {
        if ('returnCode' in order && FAILED_ORDER_CODES.includes(order.returnCode)) {
          if (selectedCity === order.city) {
            this.failOrderCounts.selectedCity[order.domainType] += 1;
          }

          if (selectedCountry === order.country) {
            this.failOrderCounts.selectedCountry[order.domainType] += 1;
          }
        }
      }
      else if (order.domainType === GETIR_FOOD_DOMAIN_TYPE) {
        if (selectedCity === order.city) {
          this.failOrderCounts.selectedCity[order.domainType] += 1;
        }
        if (selectedCountry === order.country) {
          this.failOrderCounts.selectedCountry[order.domainType] += 1;
        }
      }
      else if (order.domainType === GETIR_LOCALS_DOMAIN_TYPE) {
        if (selectedCity === order.city) {
          this.failOrderCounts.selectedCity[order.domainType] += 1;
        }
        if (selectedCountry === order.country) {
          this.failOrderCounts.selectedCountry[order.domainType] += 1;
        }
      }
    });
  }

  fillFailedOrdersMarkerData(selectedCity, selectedCountry) {
    Object.values(this.failedOrders).forEach(orderData => {
      const { order, failedAt } = orderData;
      const { city, country } = order;

      if (
        (city === selectedCity)
        && (country === selectedCountry)
        && ('returnCode' in order)
        && (FAILED_ORDER_CODES.includes(order.returnCode))
      ) {
        this.failedOrderMarkers.push({ ...order, failedAt });
      }
    });
  }

  getData(selectedCity, selectedCountry) {
    this.cleanOldData();
    this.countFailedOrders(selectedCity, selectedCountry);
    this.fillFailedOrdersMarkerData(selectedCity, selectedCountry);

    const { failOrderCounts, couriers, failedOrderMarkers } = this;

    return { couriers, failOrderCounts, failedOrderMarkers };
  }

  resetData(initialCouriers) {
    this.failedOrders = {};
    this.resetCouriers(initialCouriers);
    this.resetFailOrderCounts();
  }

  resetCouriers(initialCouriers) {
    this.couriers = initialCouriers || {};
  }

  resetFailOrderCounts() {
    this.failOrderCounts = {
      selectedCity: { ...INITIAL_COUNT },
      selectedCountry: { ...INITIAL_COUNT },
    };
  }

  getCourierData(id) {
    return this.couriers[id];
  }
}

const socketCache = new SocketCache();

export default socketCache;
