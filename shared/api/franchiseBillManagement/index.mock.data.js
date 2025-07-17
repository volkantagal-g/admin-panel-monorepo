export const franchiseListMock = {
  franchises: [
    {
      _id: '5e0d8a1df0f1d572ab399aaa',
      franchiseType: 1,
      isActivated: true,
      isDeleted: false,
      name: 'Getir',
      taxOffice: '12314125',
      taxNumber: '190319033435',
      updatedAt: '2022-10-10T05:44:03.916Z',
      createdAt: '2020-01-02T06:13:49.123Z',
      __v: 0,
      commission: {
        createdAt: '2020-12-10T07:03:00.847Z',
        settings: {
          1: [
            {
              min: 1,
              max: 1000,
              commissionRate: 16,
            },
            {
              min: 1001,
              max: 2000,
              commissionRate: 11,
            },
            {
              min: 2001,
              max: -1,
              commissionRate: 9,
            },
          ],
          2: [
            {
              min: 1,
              max: 1000,
              commissionRate: 16,
            },
            {
              min: 1001,
              max: -1,
              commissionRate: 0,
            },
          ],
          3: [
            {
              min: 1,
              max: 300,
              commissionRate: 11,
            },
            {
              min: 301,
              max: 700,
              commissionRate: 3,
            },
            {
              min: 701,
              max: -1,
              commissionRate: 0,
            },
          ],
          4: [
            {
              min: 1,
              max: 400,
              commissionRate: 22,
            },
            {
              min: 401,
              max: 1000,
              commissionRate: 14,
            },
            {
              min: 1001,
              max: -1,
              commissionRate: 0,
            },
          ],
        },
      },
      countryCode: 'TR',
      countryId: '55999ad00000010000000000',
      authorizedPerson: {
        name: 'BURAK ERGÜL//FRANCHISE TEAM IS OWNER OF GETIR FRANCHISE',
        gsm: '05324444445',
        email: 'burak.ergul@getir.com',
      },
      warehouses: [
        {
          _id: '5db9759777a0c71180d7694c',
          name: 'ZincirlikuyuBüyük (DOKUNMA)',
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
          },
          region: {
            _id: '55999ad00000010001000001',
            name: {
              tr: 'Levent',
              en: 'Levent',
            },
          },
          city: {
            _id: '55999ad00000010001000000',
            name: {
              en: 'Istanbul',
              tr: 'İstanbul',
            },
          },
          domainTypes: [
            3,
          ],
          franchise: '5e0d8a1df0f1d572ab399aaa',
        },
      ],
      owners: [
        {
          _id: '5e0f37fdeaba0d35efe52d43',
          name: 'Ahmet',
          gsm: '1234555',
        },
      ],
    },
  ],
  totalCount: 1,
};

export const warehouseListMock = {
  warehouses: [
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
      updatedAt: '2022-10-17T07:47:01.969Z',
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
        '63357fa1cb77d3af3bdf4fc0',
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
          about: 'Nisi aliquip consectetur proiden.\r\n',
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
      deliveryFeeSegmentId: '5db9759777a0c71180d7694c',
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
  ],
};

export const billListMock = {
  data: [
    {
      _id: '637b55cd84188715de154e44',
      billDetails: {
        lastReadDate: '2022-11-30T10:41:02.438Z',
        firstReadDate: '2022-11-02T10:41:00.850Z',
        totalConsumption: '1',
        day: '1',
        peak: '1',
        night: '1',
        agreementPower: '1',
        demand: '1',
        reactive: '1',
        energyCost: '1',
        taxFund: '1',
        penaltyCost: '1',
        amountPaid: '1',
      },
      billFile: '92ahq79efb8qvfo6c4ig238p6zhqte.png',
      warehouse: 'ZincirlikuyuBüyük (DOKUNMA)',
      franchise: 'GetirTest',
      subscriptionDetails: {
        provider: {
          _id: '634fd977c1908987133f7c23',
          name: 'Enerjisa Toroslar Elektrik Perakende Satiş Anonim Şirketi',
          countryCode: 'TR',
        },
        description: {
          _id: '634fabf4c1908987133f7a78',
          name: 'Çift Terimli Üç Zamanlı Ticarethane OG (Orta Gerilim)',
          countryCode: 'TR',
        },
        model: {
          _id: '634faea9c1908987133f7a92',
          name: 'İkili Anlaşma',
          countryCode: 'TR',
        },
        power: '15',
        startDate: '2022-11-01T10:19:01.414Z',
        endDate: '2022-12-14T11:47:39.262Z',
      },
      createdAt: '2022-11-21T10:41:17.389Z',
      updatedAt: '2022-11-21T10:41:17.389Z',
    },
    {
      _id: '637b55d584188715de154e4a',
      billDetails: {
        lastReadDate: '2022-11-30T10:41:02.438Z',
        firstReadDate: '2022-11-02T10:41:00.850Z',
        totalConsumption: '1',
        day: '1',
        peak: '1',
        night: '1',
        agreementPower: '1',
        demand: '1',
        reactive: '1',
        energyCost: '1',
        taxFund: '1',
        penaltyCost: '1',
        amountPaid: '1',
      },
      billFile: 'ihojpgi5ioefirsn4xe7gqgj5ts69c.png',
      warehouse: 'ZincirlikuyuBüyük (DOKUNMA)',
      franchise: 'GetirTest',
      subscriptionDetails: {
        provider: {
          _id: '634fd977c1908987133f7c23',
          name: 'Enerjisa Toroslar Elektrik Perakende Satiş Anonim Şirketi',
          countryCode: 'TR',
        },
        description: {
          _id: '634fabf4c1908987133f7a78',
          name: 'Çift Terimli Üç Zamanlı Ticarethane OG (Orta Gerilim)',
          countryCode: 'TR',
        },
        model: {
          _id: '634faea9c1908987133f7a92',
          name: 'İkili Anlaşma',
          countryCode: 'TR',
        },
        power: '15',
        startDate: '2022-11-01T10:19:01.414Z',
        endDate: '2022-12-14T11:47:39.262Z',
      },
      createdAt: '2022-11-21T10:41:25.584Z',
      updatedAt: '2022-11-21T10:41:25.584Z',
    },
    {
      _id: '637b55dc84188715de154e50',
      billDetails: {
        lastReadDate: '2022-11-30T10:41:02.438Z',
        firstReadDate: '2022-11-02T10:41:00.850Z',
        totalConsumption: '1',
        day: '1',
        peak: '1',
        night: '1',
        agreementPower: '1',
        demand: '1',
        reactive: '1',
        energyCost: '1',
        taxFund: '1',
        penaltyCost: '1',
        amountPaid: '1',
      },
      billFile: 'dbfl4vsth61zsyyupharj425076syi.png',
      warehouse: 'ZincirlikuyuBüyük (DOKUNMA)',
      franchise: 'GetirTest',
      subscriptionDetails: {
        provider: {
          _id: '634fd977c1908987133f7c23',
          name: 'Enerjisa Toroslar Elektrik Perakende Satiş Anonim Şirketi',
          countryCode: 'TR',
        },
        description: {
          _id: '634fabf4c1908987133f7a78',
          name: 'Çift Terimli Üç Zamanlı Ticarethane OG (Orta Gerilim)',
          countryCode: 'TR',
        },
        model: {
          _id: '634faea9c1908987133f7a92',
          name: 'İkili Anlaşma',
          countryCode: 'TR',
        },
        power: '15',
        startDate: '2022-11-01T10:19:01.414Z',
        endDate: '2022-12-14T11:47:39.262Z',
      },
      createdAt: '2022-11-21T10:41:32.386Z',
      updatedAt: '2022-11-21T10:41:32.386Z',
    },
  ],
  count: 3,
};

export const exportFranchiseUsersMock = { url: 'https://getir.com' };

export const billDetailMock = {
  url: {
    _id: '638ded110ea66309863c364a',
    billDetails: {
      firstReadDate: '2022-12-01T13:07:03.400Z',
      lastReadDate: '2022-12-23T13:07:05.771Z',
      totalConsumption: '3',
      day: '3',
      peak: '3',
      night: '3',
      agreementPower: '3',
      demand: '3',
      reactive: '3',
      numberOfDays: '23',
      energyCost: '3',
      taxFund: '3',
      penaltyCost: '3',
      amountPaid: '3',
    },
    billFile: 'https://getir-franchise-development.s3.eu-west-1.amazonaws.com/bill-management/dicyxigkijongnm0megdd1nfg5kbt4.png?AWSAccessKeyId=ASIAWCUTMFAIDI75ZQUV&Expires=1670250763&Signature=zwJuztEiliO87CRMvhpoP0Ocmew%3D&x-amz-security-token=FwoGZXIvYXdzEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDMtv3Wr8LRQrOuJKWCKqBD9UjvoUg81HF%2FBPxUZWei%2FB%2BYh87qdF4q7EXO0qF%2Bl4fJopPKxXh47A1QMdPTdzI00t6noHak4CLaVXztnnif%2BvvzMC9KPMdO%2FogqA192%2BZAqRSm7DComzBonQp%2Fs1Xuo1fT%2BHWJnFL3CiAvrpq2Ltiic1IXIQiWPuhD8LFnXojbTvVHkhCMruzhAhB0jIPz8eRvra0jZmx6vYz50lvs9lGvdOSRlH1AgKUwP9yajdRdfNhNQutuIg7%2BE2YZc6F8I8SljDJX5SJPSnPHGS3I6BG%2FAtPHbFFqyCqc58QDxkmgKBQp6E6iS6BM9OG7N2EOGz35Btw%2BHGjtyaO%2FnGAdjFrYR6MNbzKMXbnrJtXa4RPU8u%2FqOBhq2mAVMsftW28JJy6Ka8nJ0j9OfkDA0BXABsNvXS9xo8ZIMQHP7mnXaDNT%2BgOn7He53wXcO1JjA4ohVZhUIWuAr%2FaarhgUr9TSAek41u3G6Eari88UdH29Bmg8EdOGvKIrYNG4KN5y5kTfOazjnV2LoxYO%2B0Zz3mgHlp%2BYVJmnuMoQUUQlzT7wtG9MS%2FeUMoDYaEKib7WxtSaWTQg6EtEFfBmo0btTj61XKPZlkp97xqoPdkI6adkFBDiAQz6LFAUWqVIJpkac9HFncKRfdmL%2FJpv4gwLj6dP%2BcCSmOu2oefWxeJlZlzIabg%2FDkmCyK%2Bkd7ee6JTL3W2s4wXNzopRm98Ndhf1c1fh5E9daAt%2BNnmM4yecKMzvt5wGMitDO56zfFJJ5jTXSOXSvQHnudcgavTkH%2FrVYdjRAByWCUMvmIoio31VNcw3',
    warehouse: '5db9759777a0c71180d7694c',
    franchise: '5e0d8a1df0f1d572ab399aaa',
    subscriptionDetails: {
      provider: {
        _id: '634fd977c1908987133f7c23',
        name: 'Enerjisa Toroslar Elektrik Perakende Satiş Anonim Şirketi',
        countryCode: 'TR',
      },
      description: {
        _id: '634fabf4c1908987133f7a78',
        name: 'Çift Terimli Üç Zamanlı Ticarethane OG (Orta Gerilim)',
        countryCode: 'TR',
      },
      model: {
        _id: '634faea9c1908987133f7a92',
        name: 'İkili Anlaşma',
        countryCode: 'TR',
      },
      power: '15',
      startDate: '2022-11-01T10:19:01.414Z',
      endDate: '2022-12-14T11:47:39.262Z',
    },
    createdAt: '2022-12-05T13:07:29.517Z',
    updatedAt: '2022-12-05T13:07:29.517Z',
  },
};
