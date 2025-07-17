import {
  MARKET_ORDER_STATUS,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { mockedMarketOrderDetail } from '../marketOrder/index.mock.data';

export const mockedMarketOrders = [mockedMarketOrderDetail];

export const getActiveOrdersForOperationMock = {
  orders: [
    {
      id: '646e2b5169e395e664a05d99',
      _id: '646e2b5169e395e664a05d99',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '62a32cd9f820ce1c03e14212',
          name: 'Nadir A.',
          sucOrderCounts: [
            {
              domainType: 1,
              count: 1,
            },
            { count: 1 },
            {
              domainType: 7,
              count: 235,
            },
          ],
        },
        deviceType: 'iPhone',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [],
        },
        address: { addressType: 1 },
      },
      deliver: {},
      basket: {
        products: [
          {
            key: '5eb07797474acd0166ea91a1:595b8847683fc200042c9ef1',
            fullName: {
              tr: 'Sek Çikolatalı Pastörize Yarım Yağlı Süt (200 ml)',
              en: 'Sek Pasteurized Semi-Skimmed Chocolate Milk (200 ml)',
            },
            count: 30,
            price: 4.35,
          },
        ],
        bundleProducts: [
          {
            key: '5eb07797474acd0166ea91a1',
            fullName: {
              tr: 'Sek Çikolatalı Pastörize Süt (6 x 200 ml)',
              en: 'Sek Pasteurized Chocolate Milk (6 x 200 ml)',
            },
            count: 5,
          },
        ],
        calculation: {
          totalAmount: 130.5,
          totalChargedAmount: 74.25,
          deliveryFee: 9,
          totalWeight: 6450,
          totalVolume: 9075,
        },
        paymentInfo: {
          method: 1,
          cardId: '1E0C18AC0D5B7C0180B9FC502088998DE736368E0FF7CBD92FBDB2CF92918A16',
        },
      },
      promo: {
        applied: [
          {
            id: '64662c5a2579160a6de858e3',
            bgColor: null,
            textColor: null,
            promoCode: '%NEW-update1',
          },
        ],
      },
      checkout: { date: '2023-05-24T15:23:05.901Z' },
      payment: { method: 1 },
      picking: {},
      prepare: {},
      courier: {},
      mh: { problems: [] },
      status: 375,
      domainType: 1,
      warehouse: {
        warehouse: {
          id: '60954f652410f32b55d6a664',
          _id: '60954f652410f32b55d6a664',
          city: '5ee149d00000010006000000',
          name: 'EsraDepo',
          aggressionLevel: 3,
        },
        franchise: '5f3f71fb777c3b35bdb7b3ea',
      },
      verify: [],
      checkoutDateL: '2023-05-24T18:23:05.900Z',
      city: { _id: '5ee149d00000010006000000' },
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      currency: {
        symbol: '₺',
        codeAlpha: 'TRY',
        codeNumeric: 949,
        isSymbolFirst: true,
        isCommaSeparator: true,
      },
      hasKuzeydenProducts: false,
    },
    {
      id: '6372b4fef63570449b22d6fe',
      _id: '6372b4fef63570449b22d6fe',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '60b3d37ed378444345ca1622',
          name: 'Gokhan C.',
          sucOrderCounts: [
            {
              domainType: GETIR_10_DOMAIN_TYPE,
              count: 6,
            },
            {
              domainType: GETIR_MARKET_DOMAIN_TYPE,
              count: 8,
            },
          ],
        },
        deviceType: 'Android',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [

          ],
        },
        address: { addressType: 2 },
      },
      basket: {
        calculation: {
          totalVolume: 2910,
          totalWeight: 1923,
        },
      },
      checkout: { date: '2022-11-14T21:44:37.539Z' },
      picking: {},
      courier: { courier: { fleetVehicleType: 400 } },
      mh: {
        problems: [

        ],
      },
      status: 375,
      domainType: GETIR_MARKET_DOMAIN_TYPE,
      warehouse: {
        warehouse: {
          id: '5fa536176f8ab748d0a0bb02',
          _id: '5fa536176f8ab748d0a0bb02',
          city: '5f9f21d00000010001600000',
          name: 'MithatpaşaBüyük',
          aggressionLevel: 2,
        },
        franchise: '5fe9acb436da47606ee65551',
      },
      promo: { applied: [] },
    },
  ],
  count: 669,
};

export const getActiveOrdersForGrowthMock = {
  count: 42,
  totalKuzeydenCarboyCount: 3,
  orders: [
    {
      id: '646e2b5169e395e664a05d99',
      _id: '646e2b5169e395e664a05d99',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '62a32cd9f820ce1c03e14212',
          name: 'Nadir A.',
          sucOrderCounts: [
            {
              domainType: 1,
              count: 1,
            },
            {
              domainType: 2,
              count: 1,
            },
            {
              domainType: 7,
              count: 235,
            },
          ],
        },
        deviceType: 'iPhone',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [],
        },
        address: { addressType: 1 },
      },
      deliver: {},
      basket: {
        products: [
          {
            key: '5eb07797474acd0166ea91a1:595b8847683fc200042c9ef1',
            fullName: {
              tr: 'Sek Çikolatalı Pastörize Yarım Yağlı Süt (200 ml)',
              en: 'Sek Pasteurized Semi-Skimmed Chocolate Milk (200 ml)',
            },
            count: 30,
            price: 4.35,
          },
        ],
        bundleProducts: [
          {
            key: '5eb07797474acd0166ea91a1',
            fullName: {
              tr: 'Sek Çikolatalı Pastörize Süt (6 x 200 ml)',
              en: 'Sek Pasteurized Chocolate Milk (6 x 200 ml)',
            },
            count: 5,
          },
        ],
        calculation: {
          totalAmount: 130.5,
          totalChargedAmount: 74.25,
          deliveryFee: 9,
          totalWeight: 6450,
          totalVolume: 9075,
        },
        paymentInfo: {
          method: 1,
          cardId: '1E0C18AC0D5B7C0180B9FC502088998DE736368E0FF7CBD92FBDB2CF92918A16',
        },
      },
      promo: {
        applied: [
          {
            id: '64662c5a2579160a6de858e3',
            bgColor: null,
            textColor: null,
            promoCode: '%NEW-update1',
          },
        ],
      },
      checkout: { date: '2023-05-24T15:23:05.901Z' },
      payment: { method: 1 },
      picking: {},
      prepare: {},
      courier: {},
      mh: { problems: [] },
      status: 375,
      domainType: 1,
      warehouse: {
        warehouse: {
          id: '60954f652410f32b55d6a664',
          _id: '60954f652410f32b55d6a664',
          city: '5ee149d00000010006000000',
          name: 'EsraDepo',
          aggressionLevel: 3,
        },
        franchise: '5f3f71fb777c3b35bdb7b3ea',
      },
      verify: [],
      checkoutDateL: '2023-05-24T18:23:05.900Z',
      city: { _id: '5ee149d00000010006000000' },
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      currency: {
        symbol: '₺',
        codeAlpha: 'TRY',
        codeNumeric: 949,
        isSymbolFirst: true,
        isCommaSeparator: true,
      },
      hasKuzeydenProducts: false,
    },
    {
      id: '6372b4fef63570449b22d6fe',
      _id: '6372b4fef63570449b22d6fe',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '60b3d37ed378444345ca1622',
          name: 'Gokhan C.',
          sucOrderCounts: [
            {
              domainType: GETIR_10_DOMAIN_TYPE,
              count: 6,
            },
            {
              domainType: GETIR_MARKET_DOMAIN_TYPE,
              count: 8,
            },
          ],
        },
        deviceType: 'Android',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [

          ],
        },
        address: { addressType: 2 },
      },
      basket: {
        calculation: {
          totalVolume: 2910,
          totalWeight: 1923,
          deliveryFee: 9,
        },
      },
      checkout: { date: '2022-11-14T21:44:37.539Z' },
      picking: {},
      courier: { courier: { fleetVehicleType: 400 } },
      mh: {
        problems: [

        ],
      },
      status: 375,
      domainType: GETIR_MARKET_DOMAIN_TYPE,
      warehouse: {
        warehouse: {
          id: '5fa536176f8ab748d0a0bb02',
          _id: '5fa536176f8ab748d0a0bb02',
          city: '5f9f21d00000010001600000',
          name: 'MithatpaşaBüyük',
          aggressionLevel: 2,
        },
        franchise: '5fe9acb436da47606ee65551',
      },
      promo: { applied: [] },
    },
  ],
};

export const getActiveOrdersForGrowthEmptyMock = {
  count: 0,
  totalKuzeydenCarboyCount: 0,
  orders: [],
};

export const getActiveOrdersForGrowthSlottedMock = {
  orders: [
    {
      _id: '65ca1059c9be8cf2ff7acb4a',
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      domainType: 1,
      status: 350,
      statusUpdatedAt: '2024-02-19T16:19:25.555Z',
      basket: {
        paymentInfo: {
          method: 1,
          cardId: 'AAB0CF6AC435D6AB4C73EDB9FB1EA667526DBF81583E544C589A6BBF9B389497',
        },
        calculation: {
          totalAmount: 36.45,
          totalChargedAmount: 36.7,
          deliveryFee: 5,
          totalWeight: 800,
          totalVolume: 3619,
        },
      },
      checkout: { date: '2024-02-12T12:34:52.488Z' },
      picking: {},
      verify: [],
      prepare: {},
      handover: {},
      onway: {},
      reach: {},
      deliver: {},
      payment: { method: 1 },
      delivery: {
        isSlottedDelivery: true,
        slottedDeliveryInfo: {
          start: '2024-02-21T07:00:00.000Z',
          end: '2024-02-21T09:00:00.000Z',
        },
        address: { addressType: 1 },
        queue: { status: 100 },
      },
      client: {
        client: {
          _id: '610a3b5176aa1c047ada0cb2',
          name: 'Cansu Ç.',
          sucOrderCounts: [
            {
              domainType: 1,
              count: 2252,
            },
            {
              domainType: 2,
              count: 1,
            },
            {
              domainType: 3,
              count: 184,
            },
            {
              domainType: 4,
              count: 19,
            },
            { count: 2252 },
            {
              domainType: 6,
              count: 4,
            },
          ],
        },
        deviceType: 'iPhone',
      },
      courier: {},
      promo: {
        applied: [
          {
            id: '64662c5a2579160a6de858e3',
            bgColor: null,
            textColor: null,
            promoCode: '%NEW-update1',
          },
        ],
      },
      warehouse: {
        warehouse: {
          id: '609532bc2410f33ad4d6a663',
          _id: '609532bc2410f33ad4d6a663',
          city: '5f9f21d00000010001600000',
          name: 'Tugce Ulutas Depo',
          aggressionLevel: 5,
        },
      },
    },
    {
      _id: '65d732120870331b99c9ca0a',
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      domainType: 1,
      status: 350,
      statusUpdatedAt: '2024-02-22T11:41:47.016Z',
      basket: {
        paymentInfo: {
          method: 1,
          cardId: '2561707E899C9AC39616432EA524BE35D85DA93301E07B94910185C417FCD226',
        },
        calculation: {
          totalAmount: 199,
          totalChargedAmount: 207.24,
          deliveryFee: 5,
          totalWeight: 40,
          totalVolume: 78,
        },
      },
      checkout: { date: '2024-02-22T11:41:47.015Z' },
      picking: {},
      verify: [],
      prepare: {},
      handover: {},
      onway: {},
      reach: {},
      deliver: {},
      payment: { method: 1 },
      delivery: {
        isSlottedDelivery: true,
        slottedDeliveryInfo: {
          start: '2024-03-14T20:00:00.000Z',
          end: '2024-03-14T21:00:00.000Z',
          timezone: 'Europe/Istanbul',
        },
        address: { addressType: 1 },
        queue: { status: 100 },
      },
      client: {
        client: {
          _id: '65d32f290ac28cc46825a831',
          name: 'Mahesh C.',
          sucOrderCounts: [
            {
              domainType: 1,
              count: 19,
            },
            {
              domainType: 3,
              count: 3,
            },
            { count: 19 },
          ],
        },
        deviceType: 'iPhone',
      },
      courier: {},
      promo: {
        applied: [
          {
            id: '64662c5a2579160a6de858e3',
            bgColor: null,
            textColor: null,
            promoCode: '%NEW-update1',
          },
        ],
      },
      warehouse: {
        warehouse: {
          id: '647861048c96305afb5a6ba9',
          _id: '647861048c96305afb5a6ba9',
          city: '5fd0e0100000010002400000',
          name: 'Funda Depo',
          aggressionLevel: 3,
        },
      },
    },
  ],
  count: 2,
  totalKuzeydenCarboyCount: 0,
};

export const getActiveOrdersForCustomerServicesMock = {
  // count shouldn't be reduced
  count: 42,
  orders: [
    {
      id: '636cd25f163d7d446c208804',
      _id: '636cd25f163d7d446c208804',
      client: {
        client: {
          _id: '61586bc6e3a4ce453fe846e3',
          name: 'Test Client 1',
        },
      },
      courier: {
        courier: {
          _id: '587c9e24a1a56d0004072e82',
          id: '587c9e24a1a56d0004072e82',
          name: 'Test Courier 1',
        },
      },
      status: MARKET_ORDER_STATUS.WAITING_FOR_PICKER,
      domainType: GETIR_10_DOMAIN_TYPE,
      warehouse: {
        warehouse: {
          id: '5e09bd1a64743b86d02ad0ac',
          _id: '5e09bd1a64743b86d02ad0ac',
          name: 'Secret Name 1',
        },
      },
    },
    {
      id: '636cd25f163d7d446c208805',
      _id: '636cd25f163d7d446c208805',
      client: {
        client: {
          _id: '61586bc6e3a4ce453fe846e3',
          name: 'Test Client 2',
        },
      },
      courier: {
        courier: {
          _id: '587c9e24a1a56d0004072e82',
          id: '587c9e24a1a56d0004072e82',
          name: 'Test Courier 1',
        },
      },
      status: MARKET_ORDER_STATUS.ONWAY,
      domainType: GETIR_10_DOMAIN_TYPE,
      warehouse: {
        warehouse: {
          id: '5e09bd1a64743b86d02ad0ac',
          _id: '5e09bd1a64743b86d02ad0ac',
          name: 'Secret Name 1',
        },
      },
    },
    {
      id: '636cd25f163d7d446c208806',
      _id: '636cd25f163d7d446c208806',
      client: {
        client: {
          _id: '61586bc6e3a4ce453fe846e3',
          name: 'Super Secret Client Name',
        },
      },
      status: MARKET_ORDER_STATUS.PREPARING,
      domainType: GETIR_10_DOMAIN_TYPE,
      warehouse: {
        warehouse: {
          id: '5e09bd1a64743b86d02ad0ac',
          _id: '5e09bd1a64743b86d02ad0ac',
          name: 'Secret Name 1',
        },
      },
    },
  ],
};

export const getActiveOrdersForManagementMock = {
  count: 46,
  orders: [
    {
      id: '6412e899c4dd73f4e91289f1',
      _id: '6412e899c4dd73f4e91289f1',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '61d6d295716a878188722580',
          name: 'Usagi Tsukino',
          sucOrderCounts: [
            {
              domainType: GETIR_10_DOMAIN_TYPE,
              count: 438,
            },
            {
              domainType: GETIR_FOOD_DOMAIN_TYPE,
              count: 18,
            },
            {
              domainType: GETIR_MARKET_DOMAIN_TYPE,
              count: 33,
            },
            {
              domainType: GETIR_VOYAGER_DOMAIN_TYPE,
              count: 2,
            },
            {
              domainType: GETIR_LOCALS_DOMAIN_TYPE,
              count: 11,
            },
          ],
        },
        deviceType: 'iPhone',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [],
        },
        address: { addressType: 1 },
      },
      basket: {
        products: [
          {
            key: '5ceae03a9d3ea8000196e155',
            fullName: {
              tr: 'Namet Kangal Sucuk (225 g)',
              en: 'Namet Turkish Sausage (225 g)',
            },
            count: 1,
            price: 39,
          },
          {
            key: '5ce65821fd9b330001c4a95e',
            fullName: {
              tr: 'Namet Çemeni Sıyrılmış Pastırma (130 g)',
              en: 'Namet Fenugreek Skimmed Beef Pastrami (130 g)',
            },
            count: 1,
            price: 68,
          },
        ],
        bundleProducts: [],
        calculation: {
          totalAmount: 107,
          totalChargedAmount: 108,
          deliveryFee: 0,
        },
        paymentInfo: { method: 2 },
      },
      promo: { applied: [] },
      checkout: { date: '2023-03-16T10:00:13.436Z' },
      payment: { method: 2 },
      picking: {
        date: '2023-04-06T15:28:35.114Z',
        picker: {
          _id: '633e633eae533de123c45678',
          name: 'Picker1 Bisiyci',
        },
      },
      prepare: {},
      courier: {
        courier: {
          _id: '633e633eae533de123c45678',
          id: '633e633eae533de123c45678',
          name: 'Courier1 Bisiyci',
          person: '633e633eae533de123c45678',
        },
      },
      mh: { problems: [] },
      status: MARKET_ORDER_STATUS.ONWAY,
      domainType: 3,
      onway: { date: '2023-04-06T15:33:01.105Z' },
      warehouse: {
        warehouse: { name: 'Hasan Can Depo' },
        franchise: '5e15d3f481fae0854c754b9c',
      },
      verify: [],
      checkoutDateL: '2023-03-16T13:00:13.434Z',
      city: { _id: '5fd0e0200000010002500000' },
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      currency: {
        symbol: '₺',
        codeAlpha: 'TRY',
        codeNumeric: 949,
        isSymbolFirst: true,
        isCommaSeparator: true,
      },
      hasKuzeydenProducts: false,
    },
    {
      id: '6412e899c4dd73f4e91289f2',
      _id: '6412e899c4dd73f4e91289f2',
      client: {
        doNotKnock: false,
        dropOffAtDoor: false,
        client: {
          _id: '61d6d295716a878188722522',
          name: 'Sailor Moon',
          sucOrderCounts: [
            {
              domainType: GETIR_10_DOMAIN_TYPE,
              count: 12,
            },
            {
              domainType: GETIR_FOOD_DOMAIN_TYPE,
              count: 184,
            },
            {
              domainType: GETIR_MARKET_DOMAIN_TYPE,
              count: 1042,
            },
            {
              domainType: GETIR_VOYAGER_DOMAIN_TYPE,
              count: 42,
            },
            {
              domainType: GETIR_LOCALS_DOMAIN_TYPE,
              count: 84,
            },
          ],
        },
        deviceType: 'Android',
      },
      delivery: {
        batch: { isBatched: false },
        queue: {
          status: 100,
          queueInfo: [],
        },
        address: { addressType: 1 },
      },
      basket: {
        products: [
          {
            key: '5ceae03a9d3ea8000196e155',
            fullName: {
              tr: 'Namet Kangal Sucuk (225 g)',
              en: 'Namet Turkish Sausage (225 g)',
            },
            count: 1,
            price: 39,
          },
          {
            key: '5ce65821fd9b330001c4a95e',
            fullName: {
              tr: 'Namet Çemeni Sıyrılmış Pastırma (130 g)',
              en: 'Namet Fenugreek Skimmed Beef Pastrami (130 g)',
            },
            count: 1,
            price: 68,
          },
        ],
        bundleProducts: [],
        calculation: {
          totalAmount: 107,
          totalChargedAmount: 108,
          deliveryFee: 0,
        },
        paymentInfo: { method: 1 },
      },
      promo: {
        applied: [
          {
            bgColor: '#fb0442',
            textColor: '#ffffff',
            promoCode: 'SUPER_TEST_PROMO_CODE',
          },
        ],
      },
      checkout: { date: '2023-03-16T10:00:13.436Z' },
      payment: { method: 1 },
      picking: {
        date: '2023-04-06T15:28:35.114Z',
        picker: {
          _id: '633e633eae533de123c45672',
          name: 'Picker2 Bisiyci2',
        },
      },
      prepare: {},
      courier: {
        courier: {
          _id: '633e633eae533de123c45672',
          id: '633e633eae533de123c45672',
          name: 'Courier2 Bisiyci2',
          person: '633e633eae533de123c45672',
        },
      },
      mh: { problems: [] },
      status: MARKET_ORDER_STATUS.ONWAY,
      domainType: 3,
      onway: { date: '2023-04-06T15:33:01.105Z' },
      warehouse: {
        warehouse: { name: 'Mehmet Aga Depo' },
        franchise: '5e15d3f481fae0854c754b92',
      },
      verify: [],
      checkoutDateL: '2023-03-16T13:00:13.434Z',
      city: { _id: '5fd0e0200000010002500000' },
      country: '55999ad00000010000000000',
      countryCode: 'TR',
      currency: {
        symbol: '₺',
        codeAlpha: 'TRY',
        codeNumeric: 949,
        isSymbolFirst: true,
        isCommaSeparator: true,
      },
      hasKuzeydenProducts: false,
    },
  ],
  totalKuzeydenCarboyCount: 0,
};

export const getActiveOrdersExecutiveStatsMock = {
  financialStats: [
    {
      _id: null,
      minBasketAmount: 2.1,
      minChargedAmount: 0.25,
      maxBasketAmount: 2350,
      maxChargedAmount: 2350,
      avgBasketAmount: 155.7127855042017,
      avgChargedAmount: 146.8824199579832,
      totalBasketAmount: 592954.2872,
      totalChargedAmount: 559328.2552,
      totalOrderCount: 46,
    },
  ],
  promoOrderFinancialStats: [
    {
      _id: null,
      minBasketAmount: 2.1,
      minDiscountAmount: 0,
      minChargedAmount: 0.25,
      maxBasketAmount: 1018.8301,
      maxDiscountAmount: 100.0032,
      maxChargedAmount: 969.329,
      avgBasketAmount: 149.54011958158995,
      avgDiscountAmount: 36.72118359832636,
      avgChargedAmount: 127.36244882845189,
      totalBasketAmount: 357400.8858,
      totalDiscountAmount: 87763.6288,
      totalChargedAmount: 304396.2527,
      totalOrderCount: 40,
    },
  ],
};

export const getActiveOrdersProductsCountMock = [
  {
    count: 42,
    product: {
      _id: '61dca29381823cbdd2f16677',
      fullName: {
        tr: 'Ürün 1 - TR',
        en: 'Product 1 - EN',
      },
    },
  },
  {
    count: 44,
    product: {
      _id: '51dca29381823cbdd2f16688',
      fullName: {
        tr: 'Ürün 2 - TR',
        en: 'Product 2 - EN',
      },
    },
  },
];

export const getClientsWhoHasActiveOrderMock = {
  clients: [
    {
      _id: '611a31142386582763d75d5e',
      name: 'Test Otomasyon',
      gsmWithoutCountryCode: '5999001908',
      email: 'automation908@getir.com',
      currentOrders: [],
      sucOrderCounts: [],
      language: 'en',
    },
  ],
};

export const getActiveOrderStatsByFilters = {
  courierAssignedOrderCount: 25,
  courierUnassignedOrderCount: 20,
  averageVolume: 48106.56052631579,
  averageWeight: 33639.21052631579,
};

export const getActiveOrdersExecutiveStatsManagementMock = {
  financialStats: [
    {
      _id: null,
      minBasketAmount: 2.1,
      minChargedAmount: 0.25,
      maxBasketAmount: 2350,
      maxChargedAmount: 2350,
      avgBasketAmount: 155.7127855042017,
      avgChargedAmount: 146.8824199579832,
      totalBasketAmount: 592954.2872,
      totalChargedAmount: 559328.2552,
      totalOrderCount: 46,
    },
  ],
  promoOrderFinancialStats: [
    {
      _id: null,
      minBasketAmount: 2.1,
      minDiscountAmount: 0,
      minChargedAmount: 0.25,
      maxBasketAmount: 1018.8301,
      maxDiscountAmount: 100.0032,
      maxChargedAmount: 969.329,
      avgBasketAmount: 149.54011958158995,
      avgDiscountAmount: 36.72118359832636,
      avgChargedAmount: 127.36244882845189,
      totalBasketAmount: 357400.8858,
      totalDiscountAmount: 87763.6288,
      totalChargedAmount: 304396.2527,
      totalOrderCount: 40,
    },
  ],
};

export const getActiveOrdersPromoStatsMock = [
  {
    useCount: 1,
    minBasketAmount: 130.5,
    minDiscountAmount: 65.25,
    minChargedAmount: 74.25,
    maxBasketAmount: 130.5,
    maxDiscountAmount: 65.25,
    maxChargedAmount: 74.25,
    avgBasketAmount: 130.5,
    avgDiscountAmount: 65.25,
    avgChargedAmount: 74.25,
    totalBasketAmount: 130.5,
    totalDiscountAmount: 65.25,
    totalChargedAmount: 74.25,
    lastCheckoutAt: '2023-05-24T15:23:05.901Z',
    promo: {
      _id: '64662c5a2579160a6de858e3',
      promoCode: 'G10_HML_UPSELL_200_275',
      promoClassification: { objective: 1 },
      thirdPartySupportRate: 0,
      supplierSupportRate: 0,
      isFreeProduct: false,
    },
  },
  {
    useCount: 2,
    minBasketAmount: 1130.5,
    minDiscountAmount: 615.25,
    minChargedAmount: 174.25,
    maxBasketAmount: 1130.5,
    maxDiscountAmount: 165.25,
    maxChargedAmount: 174.25,
    avgBasketAmount: 1130.5,
    avgDiscountAmount: 165.25,
    avgChargedAmount: 174.25,
    totalBasketAmount: 1130.5,
    totalDiscountAmount: 165.25,
    totalChargedAmount: 174.25,
    lastCheckoutAt: '2023-05-24T14:23:05.901Z',
    promo: {
      _id: '64662c5a2579160a6de851f1',
      promoCode: 'ALL_MSTR_2CISI_YUZDE50_1404_V2_4',
      promoClassification: { objective: 1 },
      thirdPartySupportRate: 0,
      supplierSupportRate: 0,
      isFreeProduct: false,
    },
  },
];
