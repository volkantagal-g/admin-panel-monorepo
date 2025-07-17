export const SOCKET_EVENT = {
  JOIN_LIVE_MAP_ROOM: 'join-live-map-room',
  LEAVE_LIVE_MAP_ROOM: 'leave-live-map-room',
  MARKET_CHECKOUT_NEW: 'market-checkout:new',
  FOOD_ORDER_FAIL: 'food-order-checkout-failed',
  COURIER_LOCATION: 'courier:location',
  COURIER_STATUS: 'courier:status',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ARTISAN_ORDER_CHECKOUT_FAILED_EVENT: 'artisan-order-checkout-failed',

  JOIN_MARKET_ORDER_DETAIL_ROOM: 'join-market-order-detail-room',
  LEAVE_MARKET_ORDER_DETAIL_ROOM: 'leave-market-order-detail-room',
  MARKET_ORDER_STATUS_CHANGED: 'market-order-status-changed',

  JOIN_COURIER_DETAIL_ROOM: 'join-courier-detail-room',
  LEAVE_COURIER_DETAIL_ROOM: 'leave-courier-detail-room',
  COURIER_DETAIL_UPDATED: 'courier:updated',
  MARKET_ORDER_COURIER_CHANGED: 'market-order-courier-changed',
  COURIER_LOCATION_CHANGED: 'courier-new-location',
  NEW_DYNAMIC_DELIVERY_LEVEL: 'new-dynamic-delivery-level',
  NEW_DYNAMIC_SERVICE_LEVEL: 'new-dynamic-service-level',
  JOIN_WAREHOUSE_DYNAMIC_LEVEL_ROOM: 'join-warehouse-dynamic-level',
  LEAVE_WAREHOUSE_DYNAMIC_LEVEL_ROOM: 'leave-warehouse-dynamic-level',
};

export const SOCKET_ROOM = {
  // we don't need to join / leave default room
  defaultRoom: {
    name: 'defaultRoom',
    availableEvents: [],
  },
  liveMap: {
    name: 'liveMap',
    joinEventName: SOCKET_EVENT.JOIN_LIVE_MAP_ROOM,
    leaveEventName: SOCKET_EVENT.LEAVE_LIVE_MAP_ROOM,
    // add more events when used
    availableEvents: [
      SOCKET_EVENT.ARTISAN_ORDER_CHECKOUT_FAILED_EVENT,
      SOCKET_EVENT.MARKET_CHECKOUT_NEW,
      SOCKET_EVENT.COURIER_LOCATION,
      SOCKET_EVENT.COURIER_STATUS,
    ],
  },
  marketOrderDetail: {
    name: 'marketOrderDetail',
    joinEventName: SOCKET_EVENT.JOIN_MARKET_ORDER_DETAIL_ROOM,
    leaveEventName: SOCKET_EVENT.LEAVE_MARKET_ORDER_DETAIL_ROOM,
    availableEvents: [
      SOCKET_EVENT.MARKET_ORDER_STATUS_CHANGED,
      SOCKET_EVENT.MARKET_ORDER_COURIER_CHANGED,
    ],
  },

  courierDetail: {
    name: 'courierDetail',
    joinEventName: SOCKET_EVENT.JOIN_COURIER_DETAIL_ROOM,
    leaveEventName: SOCKET_EVENT.LEAVE_COURIER_DETAIL_ROOM,
    availableEvents: [
      // Add more events
      SOCKET_EVENT.COURIER_DETAIL_UPDATED,
      SOCKET_EVENT.COURIER_LOCATION_CHANGED,
    ],
  },
  warehouseDynamicLevel: {
    name: 'warehouseDynamicLevel',
    joinEventName: SOCKET_EVENT.JOIN_WAREHOUSE_DYNAMIC_LEVEL_ROOM,
    leaveEventName: SOCKET_EVENT.LEAVE_WAREHOUSE_DYNAMIC_LEVEL_ROOM,
    availableEvents: [
      SOCKET_EVENT.NEW_DYNAMIC_DELIVERY_LEVEL,
      SOCKET_EVENT.NEW_DYNAMIC_SERVICE_LEVEL,
    ],
  },
  // Add more rooms here when needed
};

export function getRoomOfAnEvent(eventName) {
  const selectedRoom = Object.values(SOCKET_ROOM).find(room => room.availableEvents.includes(eventName));
  if (!selectedRoom) {
    return SOCKET_ROOM.defaultRoom;
  }
  return selectedRoom;
}

export function getRoomFromRoomName(roomName) {
  return Object.values(SOCKET_ROOM).find(room => room.name === roomName);
}
