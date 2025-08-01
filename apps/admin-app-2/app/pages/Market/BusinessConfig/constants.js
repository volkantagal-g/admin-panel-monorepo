import permKey from '@shared/shared/permKey.json';

export const marketBusinessConfigFields = {
  MESSAGES: 'MESSAGES',
  BATCH_QUEUE_TIME_ESTIMATION: 'BATCH_QUEUE_TIME_ESTIMATION',
  MANUAL_WAREHOUSE_AGGRESSION_LEVELS: 'MANUAL_WAREHOUSE_AGGRESSION_LEVELS',
};

export const marketBusinessConfigDomains = {
  GETIR10: 'GETIR10',
  MARKET: 'MARKET',
  WATER: 'WATER',
};

export const marketBusinessConfigComponentPermissions = {
  [marketBusinessConfigFields.MESSAGES]: {
    BASE: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MESSAGES,
    DOMAINS: {
      [marketBusinessConfigDomains.GETIR10]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MESSAGES_FOR_GETIR10,
      [marketBusinessConfigDomains.MARKET]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MESSAGES_FOR_MARKET,
      [marketBusinessConfigDomains.WATER]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MESSAGES_FOR_WATER,
    },
  },
  [marketBusinessConfigFields.BATCH_QUEUE_TIME_ESTIMATION]: {
    BASE: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_BATCH_QUEUE_TIME_ESTIMATION,
    DOMAINS: {
      [marketBusinessConfigDomains.GETIR10]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_BATCH_QUEUE_TIME_ESTIMATION_FOR_GETIR10,
      [marketBusinessConfigDomains.MARKET]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_BATCH_QUEUE_TIME_ESTIMATION_FOR_MARKET,
      [marketBusinessConfigDomains.WATER]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_BATCH_QUEUE_TIME_ESTIMATION_FOR_WATER,
    },
  },
  [marketBusinessConfigFields.MANUAL_WAREHOUSE_AGGRESSION_LEVELS]: {
    BASE: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MANUAL_WAREHOUSE_AGGRESSION_LEVELS,
    DOMAINS: {
      [marketBusinessConfigDomains.GETIR10]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MANUAL_WAREHOUSE_AGGRESSION_LEVELS_FOR_GETIR10,
      [marketBusinessConfigDomains.MARKET]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MANUAL_WAREHOUSE_AGGRESSION_LEVELS_FOR_MARKET,
      [marketBusinessConfigDomains.WATER]: permKey.PAGE_MARKET_BUSINESS_CONFIG_EDIT_MANUAL_WAREHOUSE_AGGRESSION_LEVELS_FOR_WATER,
    },
  },
};

export const marketBusinessConfig = {
  [marketBusinessConfigFields.MESSAGES]: {
    permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.MESSAGES].BASE,
    configKeys: {
      [marketBusinessConfigDomains.GETIR10]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.MESSAGES].DOMAINS[marketBusinessConfigDomains.GETIR10],
        configKeys: {
          'co:getir10:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:getir10:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AVAILABILITY_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:getir10:ERROR_MESSAGES_MARKET_OFFLINE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:getir10:ERROR_MESSAGES_WAREHOUSE_NOT_AVAILABLE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
        },
      },
      [marketBusinessConfigDomains.MARKET]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.MESSAGES].DOMAINS[marketBusinessConfigDomains.MARKET],
        configKeys: {
          'co:market:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:market:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AVAILABILITY_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:market:ERROR_MESSAGES_MARKET_OFFLINE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:market:ERROR_MESSAGES_WAREHOUSE_NOT_AVAILABLE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
        },
      },
      [marketBusinessConfigDomains.WATER]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.MESSAGES].DOMAINS[marketBusinessConfigDomains.WATER],
        configKeys: {
          'co:water:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:water:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AVAILABILITY_AREA_WITH_POLYGONS': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:water:ERROR_MESSAGES_MARKET_OFFLINE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
          'co:water:ERROR_MESSAGES_WAREHOUSE_NOT_AVAILABLE': {
            configType: 'Object',
            description: {
              en: '',
              tr: '',
            },
          },
        },
      },
    },
  },
  [marketBusinessConfigFields.BATCH_QUEUE_TIME_ESTIMATION]: {
    permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.BATCH_QUEUE_TIME_ESTIMATION].BASE,
    configKeys: {
      [marketBusinessConfigDomains.GETIR10]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .BATCH_QUEUE_TIME_ESTIMATION].DOMAINS[marketBusinessConfigDomains.GETIR10],
        configKeys: {
          'co:getir10:DELIVERY_BATCH_BUFFERS.CHECKOUT': {
            configType: 'Number',
            description: {
              en: 'Holding time after checkout (sec)',
              tr: 'Checkout sonrası bekletme süresi (sn)',
            },
          },
          'co:getir10:DELIVERY_BATCH_BUFFERS.PREPARED': {
            configType: 'Number',
            description: {
              en: 'Holding time after preparation (sec)',
              tr: 'Hazırlanma sonrası bekletme süresi (sn)',
            },
          },
          'co:getir10:DELIVERY_BATCH_LIMITS.DURATION': {
            configType: 'Number',
            description: {
              en: 'MAX NON QUEUED BATCHING DURATION (min)',
              tr: 'MAKS SIRASIZ BİRLEŞTİRME  SÜRESİ (dk)',
            },
          },
          'co:getir10:DELIVERY_BATCH_LIMITS.TASK_LIMIT': {
            configType: 'Number',
            description: {
              en: 'MAX ORDER COUNT IN NON  QUEUED BATCHING',
              tr: 'SIRASIZ BİRLEŞTİRMEDE MAKS SİPARİŞ SAYISI',
            },
          },
          'co:getir10:DELIVERY_BATCH_QUEUE_LIMITS.TASK_LIMIT': {
            configType: 'Number',
            description: {
              en: 'MAX ORDER COUNT IN  QUEUED BATCHING',
              tr: 'SIRALI BİRLEŞTİRMEDE MAKS SİPARİŞ SAYISI',
            },
          },
          'co:getir10:DELIVERY_BATCH_QUEUE_LIMITS.DURATION': {
            configType: 'Number',
            description: {
              en: 'MAX QUEUED BATCHING DURATION(min)',
              tr: 'MAKS SIRALI BİRLEŞTİRME  SÜRESİ (dk)',
            },
          },
          'co:getir10:DELIVERY_BATCH_QUEUE_ELIGIBLE_DURATION_FOR_PLANNING_ORDER': {
            configType: 'Number',
            description: {
              en: 'Sequence planning time (sec)',
              tr: 'Sıra planlama süresi (sn)',
            },
          },
          'co:getir10:COURIER_ELIGIBLE_DURATION_FOR_RETURNING_COURIER': {
            configType: 'Number',
            description: {
              en: 'The distance of the courier to the warehouse to see the order (sec)',
              tr: 'Kuryenin siparişi görmek için depoya uzaklık süresi (sn)',
            },
          },
          'co:getir10:COURIER_ELIGIBLE_DURATION_FOR_PLANNING_ORDER': {
            configType: 'Number',
            description: {
              en: 'Distance from the warehouse to the courier for order planning (sec)',
              tr: 'Kuryeye sipariş planlanması için depoya uzaklık süresi (sn)',
            },
          },
        },
      },
      [marketBusinessConfigDomains.MARKET]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .BATCH_QUEUE_TIME_ESTIMATION].DOMAINS[marketBusinessConfigDomains.MARKET],
        configKeys: {
          'co:market:DELIVERY_BATCH_BUFFERS.CHECKOUT': {
            configType: 'Number',
            description: {
              en: 'Holding time after checkout (sec)',
              tr: 'Checkout sonrası bekletme süresi (sn)',
            },
          },
          'co:market:DELIVERY_BATCH_BUFFERS.PREPARED': {
            configType: 'Number',
            description: {
              en: 'Holding time after preparation (sec)',
              tr: 'Hazırlanma sonrası bekletme süresi (sn)',
            },
          },
          'co:market:DELIVERY_BATCH_LIMITS.DURATION': {
            configType: 'Number',
            description: {
              en: 'MAX NON QUEUED BATCHING DURATION (min)',
              tr: 'MAKS SIRASIZ BİRLEŞTİRME SÜRESİ (dk)',
            },
          },
          'co:market:DELIVERY_BATCH_LIMITS.TASK_LIMIT': {
            configType: 'Number',
            description: {
              en: 'MAX ORDER COUNT IN NON QUEUED BATCHING',
              tr: 'SIRASIZ BİRLEŞTİRMEDE MAKS SİPARİŞ SAYISI',
            },
          },
          'co:market:DELIVERY_BATCH_QUEUE_LIMITS.TASK_LIMIT': {
            configType: 'Number',
            description: {
              en: 'MAX ORDER COUNT IN  QUEUED BATCHING',
              tr: 'SIRALI BİRLEŞTİRMEDE MAKS SİPARİŞ SAYISI',
            },
          },
          'co:market:DELIVERY_BATCH_QUEUE_LIMITS.DURATION': {
            configType: 'Number',
            description: {
              en: 'MAX QUEUED BATCHING DURATION(min)',
              tr: 'MAKS SIRALI BİRLEŞTİRME  SÜRESİ (dk)',
            },
          },
          'co:market:DELIVERY_BATCH_QUEUE_ELIGIBLE_DURATION_FOR_PLANNING_ORDER': {
            configType: 'Number',
            description: {
              en: 'Sequence planning time (sec)',
              tr: 'Sıra planlama süresi (sn)',
            },
          },
          'co:market:COURIER_ELIGIBLE_DURATION_FOR_RETURNING_COURIER': {
            configType: 'Number',
            description: {
              en: 'The distance of the courier to the warehouse to see the order (sec)',
              tr: 'Kuryenin siparişi görmek için depoya uzaklık süresi (sn)',
            },
          },
          'co:market:COURIER_ELIGIBLE_DURATION_FOR_PLANNING_ORDER': {
            configType: 'Number',
            description: {
              en: 'Distance from the warehouse to the courier for order planning (sec)',
              tr: 'Kuryeye sipariş planlanması için depoya uzaklık süresi (sn)',
            },
          },
        },
      },
      [marketBusinessConfigDomains.WATER]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .BATCH_QUEUE_TIME_ESTIMATION].DOMAINS[marketBusinessConfigDomains.WATER],
        configKeys: { },
      },
    },
  },
  [marketBusinessConfigFields.MANUAL_WAREHOUSE_AGGRESSION_LEVELS]: {
    permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields.MANUAL_WAREHOUSE_AGGRESSION_LEVELS].BASE,
    configKeys: {
      [marketBusinessConfigDomains.GETIR10]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .MANUAL_WAREHOUSE_AGGRESSION_LEVELS].DOMAINS[marketBusinessConfigDomains.GETIR10],
        configKeys: {
          'co:getir10:MANUAL_WAREHOUSE_AGGRESSION_LEVEL': {
            configType: 'Object',
            description: {
              en: 'You can set the warehouse aggression level from here. This key provides the aggressiveness information of the relevant domain.',
              tr: 'Depo agresiflik seviyesi ayalarını burdan yapabilirsiniz.Bu key ilgili domainin agresiflik bilgisini verir.',
            },
          },
        },
      },
      [marketBusinessConfigDomains.MARKET]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .MANUAL_WAREHOUSE_AGGRESSION_LEVELS].DOMAINS[marketBusinessConfigDomains.MARKET],
        configKeys: {
          'co:market:MANUAL_WAREHOUSE_AGGRESSION_LEVEL': {
            configType: 'Object',
            description: {
              en: 'You can set the warehouse aggression level from here. This key provides the aggressiveness information of the relevant domain.',
              tr: 'Depo agresiflik seviyesi ayalarını burdan yapabilirsiniz.Bu key ilgili domainin agresiflik bilgisini verir.',
            },
          },
        },
      },
      [marketBusinessConfigDomains.WATER]: {
        permissionKey: marketBusinessConfigComponentPermissions[marketBusinessConfigFields
          .MANUAL_WAREHOUSE_AGGRESSION_LEVELS].DOMAINS[marketBusinessConfigDomains.WATER],
        configKeys: {
          'co:water:MANUAL_WAREHOUSE_AGGRESSION_LEVEL': {
            configType: 'Object',
            description: {
              en: 'You can set the warehouse aggression level from here. This key provides the aggressiveness information of the relevant domain.',
              tr: 'Depo agresiflik seviyesi ayalarını burdan yapabilirsiniz.Bu key ilgili domainin agresiflik bilgisini verir.',
            },
          },
        },
      },
    },
  },
};

export const manualWarehouseAgressionLevels = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

export const callerNames = {
  UNKNOWN: 'UNKNOWN',
  CLIENT: 'CLIENT',
  COURIER: 'COURIER',
  STORE: 'STORE',
  ADMIN: 'ADMIN',
  SYSTEM: 'SYSTEM',
  TEST_DRIVE_COURIER: 'TEST_DRIVE_COURIER',
  RESTAURANT: 'RESTAURANT',
};

export const callerTypes = {
  [callerNames.UNKNOWN]: -1,
  [callerNames.CLIENT]: 0,
  [callerNames.COURIER]: 1,
  [callerNames.STORE]: 2,
  [callerNames.ADMIN]: 3,
  [callerNames.SYSTEM]: 4,
  [callerNames.TEST_DRIVE_COURIER]: 4,
  [callerNames.RESTAURANT]: 6,
};

export const businessConfigUpdateTypes = {
  GLOBAL: 'GLOBAL',
  COUNTRY_BASED: 'COUNTRY_BASED',
};
