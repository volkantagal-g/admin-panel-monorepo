import {
  priceFormatter,
  calcUpdatedBasketAmount,
  getOrderIdsFromCourierTasks,
  getOrderStatusColor,
  getReturnStatusColor,
  calculateDiffTime,
  getTasksBetweenPickupAndDelivery,
} from './util';

const MOCKED_PARTIAL_PRODUCT_UPDATE_HISTORY = [
  {
    price: {
      old: 45.9,
      new: 45.9,
    },
  },
  {
    price: {
      old: 55,
      new: 55,
    },
  },
];

const MOCKED_COURIER_TASKS = [
  { orderId: '1' },
  { orderId: '2' },
];

const MOCKED_COURIER_PICKUP_AND_DELIVERY_TASKS = [
  {
    orderId: '1',
    type: 'Pickup',
    sequence: 0,
    location: {
      lat: 1,
      lon: 1,
    },
  },
  {
    orderId: '2',
    type: 'Pickup',
    sequence: 1,
    location: {
      lat: 1,
      lon: 1,
    },
  },
  {
    orderId: '1',
    type: 'Delivery',
    sequence: 2,
    location: {
      lat: 1,
      lon: 1,
    },
  },
  {
    orderId: '2',
    type: 'Delivery',
    sequence: 3,
    location: {
      lat: 1,
      lon: 1,
    },
  },
];

describe('ArtisanOrder Detail utils', () => {
  describe('#priceFormatter', () => {
    it('should return formatted price (with number parameter)', () => {
      expect(priceFormatter(10)).toEqual('10.00');
    });
    it('should return formatted price (with numeric string parameter)', () => {
      expect(priceFormatter('12')).toEqual('12.00');
    });
    it('should return value if input is isNaN', () => {
      expect(priceFormatter('12.99 tl')).toEqual('12.99 tl');
    });
  });

  describe('#calcUpdatedBasketAmount', () => {
    it('should return updated total basket amount', () => {
      expect(calcUpdatedBasketAmount(MOCKED_PARTIAL_PRODUCT_UPDATE_HISTORY)).toEqual(100.9);
    });
    it('should return undefined with undefined input', () => {
      expect(calcUpdatedBasketAmount(undefined)).toEqual(undefined);
    });
  });

  describe('#getOrderIdsFromCourierTasks', () => {
    it('should return orderIds', () => {
      expect(getOrderIdsFromCourierTasks(MOCKED_COURIER_TASKS, '1')).toEqual([
        { orderId: '1', isActive: true, domainType: 6 },
        { orderId: '2', isActive: false, domainType: 6 },
      ]);
    });
  });

  describe('#getOrderStatusColor', () => {
    it('should return default color', () => {
      expect(getOrderStatusColor(200)).toEqual('default');
    });
    it('should return success color', () => {
      expect(getOrderStatusColor(700)).toEqual('#5cb85c');
    });
    it('should return danger color', () => {
      expect(getOrderStatusColor(1500)).toEqual('#d9534f');
    });
  });

  describe('#getReturnStatusColor', () => {
    it('should return default color', () => {
      expect(getReturnStatusColor(200)).toEqual('default');
    });
    it('should return success color', () => {
      expect(getReturnStatusColor(710)).toEqual('#5cb85c');
    });
    it('should return danger color', () => {
      expect(getReturnStatusColor(900)).toEqual('#d9534f');
    });
  });

  describe('#calculateDiffTime', () => {
    it('should return empty string', () => {
      expect(calculateDiffTime('', '')).toEqual('');
    });
  });

  describe('#getTasksBetweenPickupAndDelivery', () => {
    it('should return pickup and delivery tasks 1-2-1', () => {
      expect(getTasksBetweenPickupAndDelivery(MOCKED_COURIER_PICKUP_AND_DELIVERY_TASKS, '1')).toEqual([{
        orderId: '1',
        type: 'Pickup',
        sequence: 0,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      {
        orderId: '2',
        type: 'Pickup',
        sequence: 1,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      {
        orderId: '1',
        type: 'Delivery',
        sequence: 2,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      ]);
    });
    it('should return pickup and delivery tasks 2-1-2', () => {
      expect(getTasksBetweenPickupAndDelivery(MOCKED_COURIER_PICKUP_AND_DELIVERY_TASKS, '2')).toEqual([{
        orderId: '2',
        type: 'Pickup',
        sequence: 1,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      {
        orderId: '1',
        type: 'Delivery',
        sequence: 2,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      {
        orderId: '2',
        type: 'Delivery',
        sequence: 3,
        location: {
          lat: 1,
          lon: 1,
        },
      },
      ]);
    });
    it('should return empty array', () => {
      expect(getTasksBetweenPickupAndDelivery([], '3')).toEqual([]);
    });
  });
});
