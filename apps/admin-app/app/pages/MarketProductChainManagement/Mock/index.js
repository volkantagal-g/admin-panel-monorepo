import {
  DARKSTORE_TABS,
  DEMOGRAPHY,
  DOMAIN_TYPE,
  SEGMENT,
  SIZE,
  STORAGE_TYPE,
  WAREHOUSE_TYPE,
} from '@app/pages/MarketProductChainManagement/constants';

const mockData = tab => {
  const data = {
    PRODUCT: {
      id: '1',
      name: {
        tr: 'ÜLKER ÇİKOLATALI GOFRET',
        en: 'ÜLKER CHOCOLATE WAFER',
      },
      domainTypes: [DOMAIN_TYPE.GETIR10, DOMAIN_TYPE.GETIR_MORE],
      masterCategoryId: 'SNACKS',
      masterCategoryName: 'Snacks',
      segment: SEGMENT.REGULAR,
      storageType: STORAGE_TYPE.AMBIENT,
      demography: [DEMOGRAPHY.PREMIUM, DEMOGRAPHY.METROPOL],
      size: [SIZE.MINI, SIZE.MIDI],
      isLocal: false,
      warehouseType: WAREHOUSE_TYPE.REGULAR_WAREHOUSE,
      warehouses: ['Warehouse 1', 'Warehouse 2'],
    },
    WAREHOUSE: {
      id: '1',
      name: {
        tr: 'CW 1 tr',
        en: 'CW 1 en',
      },
      domainTypes: [DOMAIN_TYPE.GETIR10],
      region: 'Marmara',
      city: 'Istanbul',
      darkStores: 5,
      warehouseType: WAREHOUSE_TYPE.MAIN_WAREHOUSE,
    },
  };
  return data[tab];
};

export default mockData;

export const mockDarkStoreData = {
  warehouseId: '1',
  name: {
    tr: 'Zincirlikuyu Cep Depo',
    en: 'Zincirlikuyu Dark Store',
  },
  domainTypes: [DOMAIN_TYPE.GETIR10, DOMAIN_TYPE.GETIR_MORE],
  region: 'Marmara',
  city: 'Istanbul',
  type: WAREHOUSE_TYPE.REGULAR_WAREHOUSE,
  warehouseType: WAREHOUSE_TYPE.REGULAR_WAREHOUSE,
  demography: [DEMOGRAPHY.PREMIUM, DEMOGRAPHY.METROPOL],
  size: [SIZE.MINI, SIZE.MIDI, SIZE.MAXI],
  products: '340',
  cws: '14',
  suppliers: '7',
  [DARKSTORE_TABS.PRODUCTS]: {
    count: 3,
    data: [
      {
        id: '1',
        name: 'Product 1',
        domain: DOMAIN_TYPE.GETIR10,
        demography: DEMOGRAPHY.PREMIUM,
        size: SIZE.MINI,
        category: 'Food',
        segment: SEGMENT.TEST,
        local: true,
      },
      {
        id: '2',
        name: 'Product 2',
        domain: DOMAIN_TYPE.GETIR_MORE,
        demography: DEMOGRAPHY.METROPOL,
        size: SIZE.MIDI,
        category: 'Personal Care',
        segment: SEGMENT.TEST,
        local: false,
      },
      {
        id: '3',
        name: 'Product 3',
        domain: DOMAIN_TYPE.GETIR10,
        demography: DEMOGRAPHY.PREMIUM,
        size: SIZE.MAXI,
        category: 'Home Care',
        segment: SEGMENT.TEST,
        local: true,
      },
      {
        id: '4',
        name: 'Product 4',
        domain: DOMAIN_TYPE.GETIR10,
        demography: DEMOGRAPHY.METROPOL,
        size: SIZE.MAXI,
        category: 'Home',
        segment: SEGMENT.TEST,
        local: false,
      },
    ],
  },
  [DARKSTORE_TABS.CENTRAL_WAREHOUSE]: {
    count: 2,
    data: [
      {
        id: '1',
        name: 'CW 1',
        domain: DOMAIN_TYPE.GETIR10,
        city: 'Istanbul',
        region: 'Marmara',
        darkStores: 5,
        products: 150,
        suppliers: 10,
        category: 'Food & Beverage',
      },
      {
        id: '2',
        name: 'CW 2',
        domain: DOMAIN_TYPE.GETIR10,
        city: 'Ankara',
        region: 'Central Anatolia',
        darkStores: 3,
        products: 120,
        suppliers: 8,
        category: 'Personal Care',
      },
    ],
  },
  [DARKSTORE_TABS.SUPPLIERS]: {
    count: 2,
    data: [
      {
        id: '1',
        name: 'Supplier 1',
        type: WAREHOUSE_TYPE.REGULAR_WAREHOUSE,
        category: 'Food & Beverage',
        products: 50,
        cws: 3,
      },
      {
        id: '2',
        name: 'Supplier 2',
        type: WAREHOUSE_TYPE.MAIN_WAREHOUSE,
        category: 'Personal Care',
        products: 75,
        cws: 4,
      },
    ],
  },
};
