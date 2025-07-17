/* eslint-disable max-len */
export const overallStats = {
  city: {
    active_order: {
      gg: 9999,
      ig: 5,
    },
    order_detail: {
      gg: {
        batch: 0,
        queue: 0,
        error: 0,
      },
      ig: { error: 0 },
    },
    order_revenue: {
      gg: {
        today: 198.87375423728818,
        yesterday: 0,
        'last week': 0,
      },
      ig: {
        today: 41.07520000000001,
        yesterday: 0,
        'last week': 0,
      },
    },
    order_count: {
      gg: {
        today: 19,
        yesterday: 0,
        'last week': 0,
      },
      ig: {
        today: 11,
        yesterday: 0,
        'last week': 0,
      },
    },
    order_domain_count: {
      gç: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      gy: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      g10: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      gb: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
    },
  },
  country: {
    active_order: {
      gg: 2,
      ig: 5,
    },
    order_detail: {
      gg: {
        batch: 0,
        queue: 0,
        error: 0,
      },
      ig: { error: 0 },
    },
    order_revenue: {
      gg: {
        today: 198.87375423728818,
        yesterday: 0,
        'last week': 0,
      },
      ig: {
        today: -30.28479999999999,
        yesterday: 0,
        'last week': 0,
      },
    },
    order_count: {
      gg: {
        today: 19,
        yesterday: 0,
        'last week': 0,
      },
      ig: {
        today: 12,
        yesterday: 0,
        'last week': 0,
      },
    },
    order_domain_count: {
      gç: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      gy: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      g10: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
      gb: {
        today: 0,
        yesterday: 0,
        'last week': 0,
      },
    },
  },
};

export const selectedCouriersVehicleType = [200, 400];
export const selectedMarkerId = '61d41c5688e570230fb75aeb';
export const courierId = '6183c33380f30130936a62ce';
export const activeOrder = [{
  _id: '62ecd3224826881e09d0c0fe',
  isScheduled: false,
  dropOffAtDoor: false,
  courierServiceDomainTypes: [
    6,
  ],
  totalPrice: 119,
  isQueued: false,
  isInQueue: false,
  client: {
    _id: '609176567b7f354c853f285b',
    sucOrderCount: 0,
    promoOrderCount: 0,
    organicOrderCount: 0,
    sucOrderCounts: [
      {
        count: 1,
        domainType: 4,
      },
    ],
    name: 'Harun Diril',
    sucArtisanOrderCount: 33,
  },
  status: 400,
  deliveryFee: 8.99,
  deliveryAddress: {
    location: {
      coordinates: [
        28.903121575713158,
        41.07312456798496,
      ],
    },
  },
  totalChargedAmount: 127.99,
  deliveryType: 1,
  paymentInfo: {
    paymentMethod: 2,
    cardGroup: 2,
    is3DPayment: null,
    paymentParameters: {
      consumerId: '2f80a059-9a8c-4322-91ac-7df69a862f98',
      bkmResultCode: 0,
      bkmResultMessage: '{"orderId":"62ecd3224826881e09d0c0fe","groupId":"62ecd3224826881e09d0c0fe","response":"Approved","authCode":"903930","hostRefNum":"221712508040","procReturnCode":"00","transId":"22217MSnF19012203","errMsg":"","extra":{"settleId":"1270","trxDate":"20220805 12:18:39","errorCode":"","hostDate":null,"numCode":"00"}}',
      bkmResponseObject: {
        result: {
          resultCode: '0',
          subResultCode: '0',
          resultMsg: 'Success',
        },
        t: '4883d053-4218-441b-bec1-063820775cce',
        ts: '20220805-12:18:40',
        s: 'BR5vELSH4SHTy9ViBg7IwQjMzXUExQOr1gyOLht3bK+CCOdgG4e4ud+9BQEAOkXgeGuUB59Ff5G+PAv82eqDCLvx4RUCfDK3+0lyGk88OsDYMkPMk2HKW8pRfmHZVKjBcqSWy832Qq9YOWiynEsZ/Mw3msYrMkZ/Qo1frTNDn0D4T2iUhRjMuPLqoUwSYqSjUVZPuXaEjkwy3pA4xhi7w5yQ3zZWg0dXPGffDcopkw0sgF5XQakbGmzh1IU2QApSCwly9buZuCgt5zugOgqKlPlfwEJBzp+qAR4s4WrpBN/WhU5bm8ToIBCZ6IhJkD0nPEd5pNb28qwFhjsSs3IAvg==',
        posResult: {
          orderId: '62ecd3224826881e09d0c0fe',
          authCode: '903930',
          posResponse: 'APPROVED',
          posResultCode: '00',
          posResultMessage: '{"orderId":"62ecd3224826881e09d0c0fe","groupId":"62ecd3224826881e09d0c0fe","response":"Approved","authCode":"903930","hostRefNum":"221712508040","procReturnCode":"00","transId":"22217MSnF19012203","errMsg":"","extra":{"settleId":"1270","trxDate":"20220805 12:18:39","errorCode":"","hostDate":null,"numCode":"00"}}',
          referansNumber: '221712508040',
          posTransactionId: '22217MSnF19012203',
          groupId: '62ecd3224826881e09d0c0fe',
          cardBin: '535177',
          cardBank: '0111',
          noflnst: '1',
          posBank: '0010',
        },
      },
      cardNo: '535177********45',
      posBank: 6,
      cardType: 0,
      cardBank: 3,
      cardGroup: 2,
    },
    paymentParameters3D: null,
    createdAt: '2022-08-05T09:18:40.309Z',
  },
  courier: {
    id: '62c7deb0773897e5c956a682',
    name: 'Mehmet Azim Özdağ',
    courierType: 9,
    picURL: 'https://cdn.getiryemek.com/misc/default-courier-v2.png',
    plannedDelivery: false,
    queuePlannedDelivery: false,
  },
  checkoutDate: '2022-08-05T09:18:40.399Z',
  promo: null,
  deviceInfo: {
    deviceType: 'Android',
    manufacturer: 'OPPO',
    model: 'CPH1893',
    sdk: '28',
    buildNumber: 289,
    deviceId: 'bae195b1-1a34-4a9f-85e2-c22851fcd4de',
  },
  cityId: '55999ad00000010001000000',
  shop: {
    _id: '626a88e6732b375190ffc486',
    name: 'İstanbul Çiçekleri (Gaziosmanpaşa)',
    slug: 'istanbul-cicekleri-gaziosmanpasa-merkez-istanbul',
    district: {
      id: '5f5a398f31556648b72c70fa',
      name: 'Merkez',
      town: '5f5a3188f497464c205c3799',
      city: '55999ad00000010001000000',
    },
    cuisines: [],
    phone: '5494945336',
    status: 100,
    rating: 4.488095238095238,
    operationManager: '60e8717e57b0043ceab34847',
  },
  shopTotalArtisanOrderCount: 267,
}];
export const warehousesMap = {
  '5db9759777a0c71180d7694c': {
    _id: '5db9759777a0c71180d7694c',
    location: {
      type: 'Point',
      coordinates: [
        28.913269042968754,
        41.009957022453015,
      ],
      acc: -1,
      time: '2019-10-30T11:35:51.361Z',
    },
    state: 300,
    status: 100,
    aggressionLevel: 2,
    name: 'ZincirlikuyuBüyük (DOKUNMA)',
    address: 'Gülbahar Mahallesi Zincirlidere Caddesi No : 30 / B - Şişli / İSTANBUL',
    warehouseType: 10,
    createdAt: '2020-01-22T09:38:54.705Z',
    updatedAt: '2022-08-30T08:05:52.903Z',
    domainTypes: [
      3,
    ],
    city: {
      _id: '55999ad00000010001000000',
      country: '55999ad00000010000000000',
      name: {
        en: 'Istanbul',
        tr: 'İstanbul',
      },
      center: {
        type: 'Point',
        coordinates: [
          29,
          41,
        ],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
        zoomRatio: 11,
      },
      timezone: 'Europe/Istanbul',
      plate: '34',
    },
    country: {
      _id: '55999ad00000010000000000',
      name: {
        de: 'Türkei',
        en: 'Turkey',
        fr: 'Turquie',
        nl: 'Turkije',
        tr: 'Türkiye',
        es: 'Turquía',
        it: 'Turchia',
        pt: 'Turquia',
        'en-US': 'Turkey',
      },
      center: {
        type: 'Point',
        coordinates: [
          35,
          39,
        ],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
      },
      code: {
        alpha2: 'TR',
        alpha3: 'TUR',
        numeric: 792,
      },
      currency: {
        code: {
          alpha: 'TRY',
          numeric: 949,
        },
        symbol: '₺',
        isSymbolFirst: true,
      },
      dialingCode: 90,
      timezones: [
        { timezone: 'Europe/Istanbul' },
      ],
      flag: '🇹🇷',
      defaultLanguageCode: 'tr',
      languageSortOrder: [
        'tr',
        'en',
      ],
      languages: {
        tr: { name: 'Türkçe' },
        en: { name: 'English' },
      },
    },
    region: {
      _id: '55999ad00000010001000001',
      country: '55999ad00000010000000000',
      city: '55999ad00000010001000000',
      name: {
        tr: 'Levent',
        en: 'Levent',
      },
      oldCode: 1000,
    },
    couriers: [
      '5ff1ef71bb94cd0fc592a610',
      '61e9548db42ebf64c944f1a4',
      '6203938b5cd24dc4a6e26a0a',
      '62a08e91157df2208e51e64c',
      '62a21165be32c058c69cff2d',
      '61e959b0d45b2f28cc1e41e5',
      '6001b55415e0c7bbcbfdec1b',
    ],
    pickers: [
      '5fe1a5912b49de16441c5a5d',
      '61a77a8b403987baf2739909',
      '61e565db2e0eea20bb69a3bd',
      '61e56a0808fe1802849b78a9',
      '61c97cbfe2e3c7371d8b1a28',
      '61efeda61732dbf961e70328',
    ],
    vehicleTypeWorkingHours: [
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 0,
        endMin: 120,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 420,
        endMin: 1440,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 1440,
        endMin: 1560,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 1860,
        endMin: 2880,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 2880,
        endMin: 3000,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 3300,
        endMin: 4320,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 4320,
        endMin: 4440,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 4740,
        endMin: 5760,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 5760,
        endMin: 5880,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 6180,
        endMin: 7200,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 7200,
        endMin: 7320,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 7620,
        endMin: 8640,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 8640,
        endMin: 8760,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 9060,
        endMin: 10080,
      },
      {
        vehicleTypes: [
          400,
          500,
          600,
          700,
        ],
        startMin: 0,
        endMin: 10080,
      },
    ],
    warehouseGLN: 1000000000032,
    baseWorkingHourType: 4,
    countryCode: 'TR',
    franchise: '5e0d8a1df0f1d572ab399aaa',
    postCode: '34096',
    fieldManagers: [
      '5afed406a674be0cc1d85e96',
      '5afea83f264e49fa4681edc6',
    ],
    shortName: 'HİÇ BİR DEĞERİNE DOKUNMAYIN !!!!!!!!!!',
    fixture: { ovenCount: 1 },
    budgetItem: {
      carPark: 1,
      dues: 1,
      indexValue: 1,
      manHourFeeGroup: 13,
      rentAmount: 111,
      rentStartDate: '2021-04-15T11:26:44.150Z',
      stoppage: 1,
    },
    mainStore: '5db69a4440168df573f4da1a',
    businessDecision: {
      foodOrder: {
        distanceLimit: 1,
        durationLimit: 1,
      },
    },
    assignment: {
      algorithmConfig: {
        _id: '6128c88f3863ccf19c85863c',
        index: 0,
        guid: 'cb8e92fa-3e26-496d-a567-ad30c186bb16',
        isActive: false,
        balance: '$3,532.65',
        picture: 'http://placehold.it/32x32',
        age: 38,
        eyeColor: 'blue',
        name: 'Amy Nielsen',
        gender: 'female',
        company: 'ZYPLE',
        email: 'amynielsen@zyple.com',
        phone: '+1 (877) 519-2122',
        address: '906 Forrest Street, Grazierville, Alabama, 2305',
        about: 'Nisi aliquip consectetur proident est exercitation aute qui id eiusmod. Esse consectetur cupidatat aute amet minim tempor velit id eiusmod. Elit sunt fugiat duis voluptate minim cupidatat laboris labore cillum ipsum occaecat non. Ad consectetur nostrud commodo anim consectetur enim ipsum. Exercitation ea elit ullamco officia ea laboris fugiat et fugiat ea ullamco consequat. Lorem incididunt cupidatat ipsum est.\r\n',
        registered: '2014-02-23T10:45:50 -02:00',
        latitude: 3.810257,
        longitude: 95.523388,
        tags: [
          'aliqua',
          'eu',
          'aliqua',
          'voluptate',
          'est',
          'quis',
          'anim',
        ],
        friends: [
          {
            id: 0,
            name: 'Benita Martin',
          },
          {
            id: 1,
            name: 'Eileen Lowery',
          },
          {
            id: 2,
            name: 'Lawanda Flores',
          },
        ],
        greeting: 'Hello, Amy Nielsen! You have 8 unread messages.',
        favoriteFruit: 'apple',
        serviceDurations: {
          1: {
            200: 144.87,
            400: 136.34,
          },
          3: {
            200: 173.88,
            400: 155.83,
          },
        },
      },
    },
    productPricingSegmentId: '6227470e174c9d68a5cf79e4',
    deliveryFeeSegmentId: '614b057b846d3348fc7e70e2',
    surfaceArea: {
      basement: 333,
      entrance: 333,
      entranceStorage: 333,
      entresol: 333,
      frontPark: 333,
      total: 333,
    },
    config: {
      3: {
        ORDER_DELIVERY_FEE: {
          LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 1,
              fee: 3,
            },
          ],
          AMOUNT: 1,
          STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: 1,
          DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X: 2,
          DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT: 3,
        },
        ORDER_LIMITS: {
          MINIMUM_DISCOUNTED_AMOUNT: 2,
          MAXIMUM_DISCOUNTED_AMOUNT: 3,
        },
        ORDER_SERVICE_FEE: {
          SURGE_FEE_LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 2,
              fee: 5,
            },
          ],
          LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 3,
              fee: 3,
            },
          ],
        },
      },
    },
    mainWarehouses: [
      '5db69a4440168df573f4da1a',
      '5e4fd2794703acf2ae1a784f',
      '5db6994c40168d05b4f4da13',
      '5a65dd5d44353a0e203c505d',
    ],
    customAggressionLevel: 0,
    basePeakHourType: 4,
    id: '5db9759777a0c71180d7694c',
  },
};
export const couriersMap = {
  '600536bf8e7df62793d78fa6': {
    location: {
      type: 'Point',
      coordinates: [
        27.0218959,
        38.3911722,
      ],
      acc: 16.397,
      time: '2022-08-17T09:47:17.684Z',
    },
    status: 100,
    domainTypes: [
      6,
      3,
    ],
    _id: '600536bf8e7df62793d78fa6',
    name: 'Rabia Aslanoğlu',
    courierType: 9,
    updatedAt: '2022-08-17T09:47:17.685Z',
    statusLastChangedAt: '2022-08-16T19:05:08.410Z',
    gsm: '5350117216',
    warehouse: '602fa06d94f5a2adb186b98f',
    fleetVehicleType: 200,
  },
};
export const couriers = [
  {
    location: {
      type: 'Point',
      coordinates: [
        27.0218959,
        38.3911722,
      ],
      acc: 16.397,
      time: '2022-08-17T09:47:17.684Z',
    },
    status: 100,
    domainTypes: [
      6,
      3,
    ],
    _id: '600536bf8e7df62793d78fa6',
    name: 'Rabia Aslanoğlu',
    courierType: 9,
    updatedAt: '2022-08-17T09:47:17.685Z',
    statusLastChangedAt: '2022-08-16T19:05:08.410Z',
    gsm: '5350117216',
    warehouse: '602fa06d94f5a2adb186b98f',
    fleetVehicleType: 200,
  },
];
export const selectedCityWarehouses = [
  {
    _id: '5db9759777a0c71180d7694c',
    location: {
      type: 'Point',
      coordinates: [
        28.913269042968754,
        41.009957022453015,
      ],
      acc: -1,
      time: '2019-10-30T11:35:51.361Z',
    },
    state: 300,
    status: 100,
    aggressionLevel: 2,
    name: 'ZincirlikuyuBüyük (DOKUNMA)',
    address: 'Gülbahar Mahallesi Zincirlidere Caddesi No : 30 / B - Şişli / İSTANBUL',
    warehouseType: 10,
    createdAt: '2020-01-22T09:38:54.705Z',
    updatedAt: '2022-08-30T08:05:52.903Z',
    domainTypes: [
      3,
    ],
    city: {
      _id: '55999ad00000010001000000',
      country: '55999ad00000010000000000',
      name: {
        en: 'Istanbul',
        tr: 'İstanbul',
      },
      center: {
        type: 'Point',
        coordinates: [
          29,
          41,
        ],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
        zoomRatio: 11,
      },
      timezone: 'Europe/Istanbul',
      plate: '34',
    },
    country: {
      _id: '55999ad00000010000000000',
      name: {
        de: 'Türkei',
        en: 'Turkey',
        fr: 'Turquie',
        nl: 'Turkije',
        tr: 'Türkiye',
        es: 'Turquía',
        it: 'Turchia',
        pt: 'Turquia',
        'en-US': 'Turkey',
      },
      center: {
        type: 'Point',
        coordinates: [
          35,
          39,
        ],
        acc: -1,
        time: '2019-12-13T21:00:00.000Z',
      },
      code: {
        alpha2: 'TR',
        alpha3: 'TUR',
        numeric: 792,
      },
      currency: {
        code: {
          alpha: 'TRY',
          numeric: 949,
        },
        symbol: '₺',
        isSymbolFirst: true,
      },
      dialingCode: 90,
      timezones: [
        { timezone: 'Europe/Istanbul' },
      ],
      flag: '🇹🇷',
      defaultLanguageCode: 'tr',
      languageSortOrder: [
        'tr',
        'en',
      ],
      languages: {
        tr: { name: 'Türkçe' },
        en: { name: 'English' },
      },
    },
    region: {
      _id: '55999ad00000010001000001',
      country: '55999ad00000010000000000',
      city: '55999ad00000010001000000',
      name: {
        tr: 'Levent',
        en: 'Levent',
      },
      oldCode: 1000,
    },
    couriers: [
      '5ff1ef71bb94cd0fc592a610',
      '61e9548db42ebf64c944f1a4',
      '6203938b5cd24dc4a6e26a0a',
      '62a08e91157df2208e51e64c',
      '62a21165be32c058c69cff2d',
      '61e959b0d45b2f28cc1e41e5',
      '6001b55415e0c7bbcbfdec1b',
    ],
    pickers: [
      '5fe1a5912b49de16441c5a5d',
      '61a77a8b403987baf2739909',
      '61e565db2e0eea20bb69a3bd',
      '61e56a0808fe1802849b78a9',
      '61c97cbfe2e3c7371d8b1a28',
      '61efeda61732dbf961e70328',
    ],
    vehicleTypeWorkingHours: [
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 0,
        endMin: 120,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 420,
        endMin: 1440,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 1440,
        endMin: 1560,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 1860,
        endMin: 2880,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 2880,
        endMin: 3000,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 3300,
        endMin: 4320,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 4320,
        endMin: 4440,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 4740,
        endMin: 5760,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 5760,
        endMin: 5880,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 6180,
        endMin: 7200,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 7200,
        endMin: 7320,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 7620,
        endMin: 8640,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 8640,
        endMin: 8760,
      },
      {
        vehicleTypes: [
          100,
          200,
          300,
        ],
        startMin: 9060,
        endMin: 10080,
      },
      {
        vehicleTypes: [
          400,
          500,
          600,
          700,
        ],
        startMin: 0,
        endMin: 10080,
      },
    ],
    warehouseGLN: 1000000000032,
    baseWorkingHourType: 4,
    countryCode: 'TR',
    franchise: '5e0d8a1df0f1d572ab399aaa',
    postCode: '34096',
    fieldManagers: [
      '5afed406a674be0cc1d85e96',
      '5afea83f264e49fa4681edc6',
    ],
    shortName: 'HİÇ BİR DEĞERİNE DOKUNMAYIN !!!!!!!!!!',
    fixture: { ovenCount: 1 },
    budgetItem: {
      carPark: 1,
      dues: 1,
      indexValue: 1,
      manHourFeeGroup: 13,
      rentAmount: 111,
      rentStartDate: '2021-04-15T11:26:44.150Z',
      stoppage: 1,
    },
    mainStore: '5db69a4440168df573f4da1a',
    businessDecision: {
      foodOrder: {
        distanceLimit: 1,
        durationLimit: 1,
      },
    },
    assignment: {
      algorithmConfig: {
        _id: '6128c88f3863ccf19c85863c',
        index: 0,
        guid: 'cb8e92fa-3e26-496d-a567-ad30c186bb16',
        isActive: false,
        balance: '$3,532.65',
        picture: 'http://placehold.it/32x32',
        age: 38,
        eyeColor: 'blue',
        name: 'Amy Nielsen',
        gender: 'female',
        company: 'ZYPLE',
        email: 'amynielsen@zyple.com',
        phone: '+1 (877) 519-2122',
        address: '906 Forrest Street, Grazierville, Alabama, 2305',
        about: 'Nisi aliquip consectetur proident est exercitation aute qui id eiusmod. Esse consectetur cupidatat aute amet minim tempor velit id eiusmod. Elit sunt fugiat duis voluptate minim cupidatat laboris labore cillum ipsum occaecat non. Ad consectetur nostrud commodo anim consectetur enim ipsum. Exercitation ea elit ullamco officia ea laboris fugiat et fugiat ea ullamco consequat. Lorem incididunt cupidatat ipsum est.\r\n',
        registered: '2014-02-23T10:45:50 -02:00',
        latitude: 3.810257,
        longitude: 95.523388,
        tags: [
          'aliqua',
          'eu',
          'aliqua',
          'voluptate',
          'est',
          'quis',
          'anim',
        ],
        friends: [
          {
            id: 0,
            name: 'Benita Martin',
          },
          {
            id: 1,
            name: 'Eileen Lowery',
          },
          {
            id: 2,
            name: 'Lawanda Flores',
          },
        ],
        greeting: 'Hello, Amy Nielsen! You have 8 unread messages.',
        favoriteFruit: 'apple',
        serviceDurations: {
          1: {
            200: 144.87,
            400: 136.34,
          },
          3: {
            200: 173.88,
            400: 155.83,
          },
        },
      },
    },
    productPricingSegmentId: '6227470e174c9d68a5cf79e4',
    deliveryFeeSegmentId: '614b057b846d3348fc7e70e2',
    surfaceArea: {
      basement: 333,
      entrance: 333,
      entranceStorage: 333,
      entresol: 333,
      frontPark: 333,
      total: 333,
    },
    config: {
      3: {
        ORDER_DELIVERY_FEE: {
          LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 1,
              fee: 3,
            },
          ],
          AMOUNT: 1,
          STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: 1,
          DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X: 2,
          DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT: 3,
        },
        ORDER_LIMITS: {
          MINIMUM_DISCOUNTED_AMOUNT: 2,
          MAXIMUM_DISCOUNTED_AMOUNT: 3,
        },
        ORDER_SERVICE_FEE: {
          SURGE_FEE_LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 2,
              fee: 5,
            },
          ],
          LAYERS: [
            {
              min: 0,
              fee: 2,
            },
            {
              min: 3,
              fee: 3,
            },
          ],
        },
      },
    },
    mainWarehouses: [
      '5db69a4440168df573f4da1a',
      '5e4fd2794703acf2ae1a784f',
      '5db6994c40168d05b4f4da13',
      '5a65dd5d44353a0e203c505d',
    ],
    customAggressionLevel: 0,
    basePeakHourType: 4,
    id: '5db9759777a0c71180d7694c',
  },
];
export const warehouses = [{
  _id: '5db9759777a0c71180d7694c',
  location: {
    type: 'Point',
    coordinates: [
      28.913269042968754,
      41.009957022453015,
    ],
    acc: -1,
    time: '2019-10-30T11:35:51.361Z',
  },
  state: 300,
  status: 100,
  aggressionLevel: 2,
  name: 'ZincirlikuyuBüyük (DOKUNMA)',
  address: 'Gülbahar Mahallesi Zincirlidere Caddesi No : 30 / B - Şişli / İSTANBUL',
  warehouseType: 10,
  createdAt: '2020-01-22T09:38:54.705Z',
  updatedAt: '2022-08-30T08:05:52.903Z',
  domainTypes: [
    3,
  ],
  city: {
    _id: '55999ad00000010001000000',
    country: '55999ad00000010000000000',
    name: {
      en: 'Istanbul',
      tr: 'İstanbul',
    },
    center: {
      type: 'Point',
      coordinates: [
        29,
        41,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
      zoomRatio: 11,
    },
    timezone: 'Europe/Istanbul',
    plate: '34',
  },
  country: {
    _id: '55999ad00000010000000000',
    name: {
      de: 'Türkei',
      en: 'Turkey',
      fr: 'Turquie',
      nl: 'Turkije',
      tr: 'Türkiye',
      es: 'Turquía',
      it: 'Turchia',
      pt: 'Turquia',
      'en-US': 'Turkey',
    },
    center: {
      type: 'Point',
      coordinates: [
        35,
        39,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
    },
    code: {
      alpha2: 'TR',
      alpha3: 'TUR',
      numeric: 792,
    },
    currency: {
      code: {
        alpha: 'TRY',
        numeric: 949,
      },
      symbol: '₺',
      isSymbolFirst: true,
    },
    dialingCode: 90,
    timezones: [
      { timezone: 'Europe/Istanbul' },
    ],
    flag: '🇹🇷',
    defaultLanguageCode: 'tr',
    languageSortOrder: [
      'tr',
      'en',
    ],
    languages: {
      tr: { name: 'Türkçe' },
      en: { name: 'English' },
    },
  },
  region: {
    _id: '55999ad00000010001000001',
    country: '55999ad00000010000000000',
    city: '55999ad00000010001000000',
    name: {
      tr: 'Levent',
      en: 'Levent',
    },
    oldCode: 1000,
  },
  couriers: [
    '5ff1ef71bb94cd0fc592a610',
    '61e9548db42ebf64c944f1a4',
    '6203938b5cd24dc4a6e26a0a',
    '62a08e91157df2208e51e64c',
    '62a21165be32c058c69cff2d',
    '61e959b0d45b2f28cc1e41e5',
    '6001b55415e0c7bbcbfdec1b',
  ],
  pickers: [
    '5fe1a5912b49de16441c5a5d',
    '61a77a8b403987baf2739909',
    '61e565db2e0eea20bb69a3bd',
    '61e56a0808fe1802849b78a9',
    '61c97cbfe2e3c7371d8b1a28',
    '61efeda61732dbf961e70328',
  ],
  vehicleTypeWorkingHours: [
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 0,
      endMin: 120,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 420,
      endMin: 1440,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 1440,
      endMin: 1560,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 1860,
      endMin: 2880,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 2880,
      endMin: 3000,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 3300,
      endMin: 4320,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 4320,
      endMin: 4440,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 4740,
      endMin: 5760,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 5760,
      endMin: 5880,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 6180,
      endMin: 7200,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 7200,
      endMin: 7320,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 7620,
      endMin: 8640,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 8640,
      endMin: 8760,
    },
    {
      vehicleTypes: [
        100,
        200,
        300,
      ],
      startMin: 9060,
      endMin: 10080,
    },
    {
      vehicleTypes: [
        400,
        500,
        600,
        700,
      ],
      startMin: 0,
      endMin: 10080,
    },
  ],
  warehouseGLN: 1000000000032,
  baseWorkingHourType: 4,
  countryCode: 'TR',
  franchise: '5e0d8a1df0f1d572ab399aaa',
  postCode: '34096',
  fieldManagers: [
    '5afed406a674be0cc1d85e96',
    '5afea83f264e49fa4681edc6',
  ],
  shortName: 'HİÇ BİR DEĞERİNE DOKUNMAYIN !!!!!!!!!!',
  fixture: { ovenCount: 1 },
  budgetItem: {
    carPark: 1,
    dues: 1,
    indexValue: 1,
    manHourFeeGroup: 13,
    rentAmount: 111,
    rentStartDate: '2021-04-15T11:26:44.150Z',
    stoppage: 1,
  },
  mainStore: '5db69a4440168df573f4da1a',
  businessDecision: {
    foodOrder: {
      distanceLimit: 1,
      durationLimit: 1,
    },
  },
  assignment: {
    algorithmConfig: {
      _id: '6128c88f3863ccf19c85863c',
      index: 0,
      guid: 'cb8e92fa-3e26-496d-a567-ad30c186bb16',
      isActive: false,
      balance: '$3,532.65',
      picture: 'http://placehold.it/32x32',
      age: 38,
      eyeColor: 'blue',
      name: 'Amy Nielsen',
      gender: 'female',
      company: 'ZYPLE',
      email: 'amynielsen@zyple.com',
      phone: '+1 (877) 519-2122',
      address: '906 Forrest Street, Grazierville, Alabama, 2305',
      about: 'Nisi aliquip consectetur proident est exercitation aute qui id eiusmod. Esse consectetur cupidatat aute amet minim tempor velit id eiusmod. Elit sunt fugiat duis voluptate minim cupidatat laboris labore cillum ipsum occaecat non. Ad consectetur nostrud commodo anim consectetur enim ipsum. Exercitation ea elit ullamco officia ea laboris fugiat et fugiat ea ullamco consequat. Lorem incididunt cupidatat ipsum est.\r\n',
      registered: '2014-02-23T10:45:50 -02:00',
      latitude: 3.810257,
      longitude: 95.523388,
      tags: [
        'aliqua',
        'eu',
        'aliqua',
        'voluptate',
        'est',
        'quis',
        'anim',
      ],
      friends: [
        {
          id: 0,
          name: 'Benita Martin',
        },
        {
          id: 1,
          name: 'Eileen Lowery',
        },
        {
          id: 2,
          name: 'Lawanda Flores',
        },
      ],
      greeting: 'Hello, Amy Nielsen! You have 8 unread messages.',
      favoriteFruit: 'apple',
      serviceDurations: {
        1: {
          200: 144.87,
          400: 136.34,
        },
        3: {
          200: 173.88,
          400: 155.83,
        },
      },
    },
  },
  productPricingSegmentId: '6227470e174c9d68a5cf79e4',
  deliveryFeeSegmentId: '614b057b846d3348fc7e70e2',
  surfaceArea: {
    basement: 333,
    entrance: 333,
    entranceStorage: 333,
    entresol: 333,
    frontPark: 333,
    total: 333,
  },
  config: {
    3: {
      ORDER_DELIVERY_FEE: {
        LAYERS: [
          {
            min: 0,
            fee: 2,
          },
          {
            min: 1,
            fee: 3,
          },
        ],
        AMOUNT: 1,
        STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: 1,
        DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X: 2,
        DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT: 3,
      },
      ORDER_LIMITS: {
        MINIMUM_DISCOUNTED_AMOUNT: 2,
        MAXIMUM_DISCOUNTED_AMOUNT: 3,
      },
      ORDER_SERVICE_FEE: {
        SURGE_FEE_LAYERS: [
          {
            min: 0,
            fee: 2,
          },
          {
            min: 2,
            fee: 5,
          },
        ],
        LAYERS: [
          {
            min: 0,
            fee: 2,
          },
          {
            min: 3,
            fee: 3,
          },
        ],
      },
    },
  },
  mainWarehouses: [
    '5db69a4440168df573f4da1a',
    '5e4fd2794703acf2ae1a784f',
    '5db6994c40168d05b4f4da13',
    '5a65dd5d44353a0e203c505d',
  ],
  customAggressionLevel: 0,
  basePeakHourType: 4,
  id: '5db9759777a0c71180d7694c',
},
];
export const selectedCity = '55999ad00000010001000000';
export const selectedCountry = '55999ad00000010000000000';
export const redBasket = { id: '61d41c5688e570230fb75aeb' };
