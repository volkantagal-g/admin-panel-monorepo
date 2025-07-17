export const mockedGetSupplyLogisticInfo = [
  {
    productId: 15240,
    level1: {
      // same id with master category v2 service
      _id: 123,
      categoryLevelName: 'Category1',
    },
    level2: {
      _id: 123,
      categoryLevelName: 'Category2',
    },
    level3: {
      _id: 123,
      categoryLevelName: 'Category3',
    },
    level4: {
      _id: 123,
      categoryLevelName: 'Category4',
    },
    barcodes: [
      '8692813004201',
      '8692813003365',
    ],
    brand: { $oid: '5bbdbad525fab4003521f554' },
    // transfer info
    transferLimitType: 0,
    segments: [
      11,
    ],
    segments2: [
      1,
    ],
    mainStoreSpecs: {
      transferColiCount: 16,
      shipmentType: 1,
    },
    transferAllowedCities: [], // transferGroups?
    transferAllowedWarehouses: [], // transferGroups?
    isInFrozenLocation: true,
    isAllowedForSelfTransfer: false,
    isAllowedForSelfPurchaseOrder: false,
    isPickedToZero: false,
    // packaging info
    packagingInfo: {
      1: {
        inboxQuantity: 1,
        grossWeight: 2114,
        netWeight: 2000,
        volume: 2835,
        barcodes: [
          '8692813004201',
          '8692813003365',
        ],
        dimension: {
          height: 18,
          width: 15,
          depth: 10.5,
        },
      },
      2: {
        inboxQuantity: 1,
        grossWeight: 1,
        netWeight: 1,
        volume: 1,
        barcodes: [],
        dimension: {
          height: 1,
          width: 1,
          depth: 1,
        },
      },
      3: {
        inboxQuantity: 4,
        grossWeight: 8700,
        netWeight: 8700,
        volume: 12096,
        barcodes: [
          '8692813004263',
        ],
        dimension: {
          height: 32,
          width: 21,
          depth: 18,
        },
      },
      4: {
        inboxQuantity: 1,
        grossWeight: 1,
        netWeight: 1,
        volume: 1,
        barcodes: [],
        dimension: {
          height: 1,
          width: 1,
          depth: 1,
        },
      },
      pickingType: 1,
    },
    // demand & storage info
    demandType: 'convenience',
    storageType: 'ambient',
    refrigeratorTemperature: '-18-15C',
    // general info
    criticalStockStore: 5,
    maxStock: 10,
    maxStockDay: 10,
    minStock: 4,
    minStockDay: 10,
    isCriticalStockWarningEnabled: false,
    isIncludedToGeneralInventoryCheck: false,
    inventoryCheckPeriod: 34,
    isConsumable: false,
    // expiry date info
    expActive: false,
    expDays: {
      lifetime: null,
      allowed: null,
      warning: null,
      dead: null,
    },
  },
];

export const mockedUpdateSupplyLogisticInfo = [
  {
    productId: 15240,
    level1: {
      // same id with master category v2 service
      _id: 123,
      categoryLevelName: 'Category1',
    },
    level2: {
      _id: 123,
      categoryLevelName: 'Category2',
    },
    level3: {
      _id: 123,
      categoryLevelName: 'Category3',
    },
    level4: {
      _id: 123,
      categoryLevelName: 'Category4',
    },
    barcodes: [
      '8692813004201',
      '8692813003365',
    ],
    brand: { $oid: '5bbdbad525fab4003521f554' },
    // transfer info
    transferLimitType: 0,
    segments: [
      11,
    ],
    segments2: [
      1,
    ],
    mainStoreSpecs: {
      transferColiCount: 16,
      shipmentType: 1,
    },
    transferAllowedCities: [], // transferGroups?
    transferAllowedWarehouses: [], // transferGroups?
    isInFrozenLocation: true,
    isAllowedForSelfTransfer: false,
    isAllowedForSelfPurchaseOrder: true,
    isPickedToZero: true,
    // packaging info
    packagingInfo: {
      1: {
        inboxQuantity: 1,
        grossWeight: 2114,
        netWeight: 2000,
        volume: 2835,
        barcodes: [
          '8692813004201',
          '8692813003365',
        ],
        dimension: {
          height: 18,
          width: 15,
          depth: 10.5,
        },
      },
      2: {
        inboxQuantity: 1,
        grossWeight: 1,
        netWeight: 1,
        volume: 1,
        barcodes: [],
        dimension: {
          height: 1,
          width: 1,
          depth: 1,
        },
      },
      3: {
        inboxQuantity: 4,
        grossWeight: 8700,
        netWeight: 8700,
        volume: 12096,
        barcodes: [
          '8692813004263',
        ],
        dimension: {
          height: 32,
          width: 21,
          depth: 18,
        },
      },
      4: {
        inboxQuantity: 1,
        grossWeight: 1,
        netWeight: 1,
        volume: 1,
        barcodes: [],
        dimension: {
          height: 1,
          width: 1,
          depth: 1,
        },
      },
      pickingType: 1,
    },
    // demand & storage info
    demandType: 'convenience',
    storageType: 'ambient',
    refrigeratorTemperature: '-18-15C',
    // general info
    criticalStockStore: 5,
    maxStock: 10,
    maxStockDay: 10,
    minStock: 4,
    minStockDay: 10,
    isCriticalStockWarningEnabled: false,
    isIncludedToGeneralInventoryCheck: false,
    inventoryCheckPeriod: 34,
    isConsumable: false,
    // expiry date info
    expActive: false,
    expDays: {
      lifetime: null,
      allowed: null,
      warning: null,
      dead: null,
    },
  }];

export const mockedCreateSupplyLogisticInfo = [
  {
    productId: 15240,
    barcodes: [
      '8692813004201',
      '8692813003365',
    ],
    // packaging info
    // demand & storage info
    demandType: 'convenience',
    storageType: 'ambient',
    refrigeratorTemperature: '-18-15C',
  }];

export const mockedMasterCategoryV2 = [{
  _id: '6156af869883dce26caa1f95',
  name: {
    tr: 'SADE PROBIYOTIK YOĞURT',
    en: 'SADE PROBIYOTIK YOĞURT',
  },
  countryCode: 'TR',
  country: '55999ad00000010000000000',
  parent: {
    _id: '6156af7f9883dce26caa1edd',
    name: {
      tr: 'PROBIYOTIK YOĞURT',
      en: 'PROBIYOTIK YOĞURT',
    },
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    status: 1,
    level: 30,
    parent: {
      _id: '6156af7c9883dce26caa1ec1',
      name: {
        tr: 'SÜT & KAHVALTI',
        en: 'SÜT & KAHVALTI',
      },
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      status: 1,
      level: 20,
      parent: {
        _id: '6156af7a9883dce26caa1ebd',
        name: {
          tr: 'KAHVALTILIK',
          en: 'KAHVALTILIK',
        },
        country: '55999ad00000010000000000',
        countryCode: 'TR',
        status: 0,
        level: 10,
        createdAt: '2021-10-01T00:00:00.000Z',
        updatedAt: '2023-04-09T16:09:56.227Z',
        description: 'string',
        pickingOrder: 5,
      },
      createdAt: '2021-10-01T00:00:00.000Z',
      updatedAt: '2021-10-01T00:00:00.000Z',
    },
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    pickingOrder: 169,
  },
  status: 1,
  level: 40,
}];

export const mockedSupplyBrands = [{
  _id: '643988b14510c59f64562989',
  name: 'Marka 1',
  isActive: false,
  updatedBy: '60b3eb099a6ee71f03c5f8a2',
  updatedAt: '2023-04-14T17:09:05.893Z',
  createdAt: '2023-04-14T17:09:05.893Z',
}];
