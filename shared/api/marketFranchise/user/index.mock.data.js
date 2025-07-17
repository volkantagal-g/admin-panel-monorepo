export const franchiseUserDetailMock = {
  _id: '5de969573aed804787ca0b43',
  username: 'test',
  name: 'Ergon Test',
  email: 'sicadij539@shirulo.co',
  gsm: 'Test ( burada numara dışında karakterler girilebilmekte )',
  roles: [
    {
      permissions: [
        'read',
      ],
      role: {
        _id: '5e788c0ebe8774466bdeb1a2',
        key: 'stock',
        descriptions: {
          tr: 'Sayfalar: Mevcut Stok, Stok Hareketleri',
          en: 'Pages: Current Stocks, Stock Movements',
        },
        permissions: [
          {
            key: 'read',
            description: {
              tr: 'Yetkisiyle ilişkili sayfaları ve bölümleri görüntüleyebilir',
              en: 'Can view pages and components related to its authority',
            },
            id: '4e62e38b-dba4-43bc-bad2-36987e65f604',
          },
          {
            key: 'second',
            description: {
              tr: 'asdf',
              en: 'asd',
            },
            id: '3ec02578-9e1f-474f-bc61-ba5b37d36e5e',
          },
        ],
      },
    },
  ],
  roleGroups: [
    {
      _id: '5fae5ea9f474fb499ebaa0fd',
      isActive: true,
      name: {
        tr: 'elif',
        en: 'elif2',
      },
      description: {
        tr: 'elif 12',
        en: 'weas',
      },
      roles: [
        {
          permissions: [
            'read',
          ],
          role: '5e788c0ebe8774466bdeb19f',
        },
      ],
      createdAt: '2020-11-13T10:23:37.939Z',
    },
  ],
  franchise: {
    _id: '5807715d23e5b3ed4f36377e',
    name: 'Yusuf Ural',
    franchiseType: 2,
    isActivated: true,
    updatedAtL: '2018-05-24T17:59:40.098Z',
    updatedAt: '2018-05-24T14:59:40.098Z',
    createdAt: '2016-10-19T13:13:01.000Z',
    isMigrated: true,
    taxOffice: 'KOZYATAĞI VERGİ DAİRESİ',
    taxNumber: '8930167863',
    countryCode: 'TR',
    countryId: '55999ad00000010000000000',
    warehouses: [
      {
        _id: '5f2c20a6b5656f4224358c58',
        location: {
          type: 'Point',
          coordinates: [
            41.68261083254563,
            41.56430376448647,
          ],
          acc: -1,
          time: '2020-08-06T15:24:22.299Z',
        },
        state: 300,
        status: 300,
        aggressionLevel: 4,
        name: 'Byz Depo',
        address: 'batum',
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
        warehouseType: 2,
        createdAt: '2020-08-06T15:24:22.301Z',
        updatedAt: '2022-07-01T13:26:20.888Z',
        mainStore: '5c38f601ca872900018db2d9',
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
        domainTypes: [
          1,
          3,
          2,
        ],
      },
    ],
    owners: [
      {
        _id: '5a96c00a23159f00041ed02c',
        active: false,
        isOwner: true,
        name: 'Nihat',
        username: 'nihat.ozsoy',
        gsm: '5342026008',
        email: 'nihat.ozsoy@getir.com',
        franchise: '5807715d23e5b3ed4f36377e',
        groupType: 1,
        roles: [],
        updatedAt: '2019-02-01T08:32:23.352Z',
        isGetirEmployee: true,
      },
    ],
  },
  groupType: 2,
  active: true,
  isOwner: false,
  reports: [
    '60d2f7d4e3c1c80b199cc518',
  ],
  isGetirEmployee: true,
};

export const rolesMock = [
  {
    _id: '5e788c0ebe8774466bdeb1a2',
    key: 'stock',
    descriptions: {
      tr: 'Sayfalar: Mevcut Stok, Stok Hareketleri',
      en: 'Pages: Current Stocks, Stock Movements',
    },
    permissions: [
      {
        key: 'read',
        description: {
          tr: 'Yetkisiyle ilişkili sayfaları ve bölümleri görüntüleyebilir',
          en: 'Can view pages and components related to its authority',
        },
        id: '4e62e38b-dba4-43bc-bad2-36987e65f604',
      },
      {
        key: 'second',
        description: {
          tr: 'asdf',
          en: 'asd',
        },
        id: '3ec02578-9e1f-474f-bc61-ba5b37d36e5e',
      },
    ],
  },
];

export const franchisesMock = {
  franchises: [
    {
      _id: '5807715d23e5b3ed4f36377e',
      name: 'Yusuf Ural',
      franchiseType: 2,
      isActivated: true,
      updatedAtL: '2018-05-24T17:59:40.098Z',
      updatedAt: '2018-05-24T14:59:40.098Z',
      createdAt: '2016-10-19T13:13:01.000Z',
      isMigrated: true,
      taxOffice: 'KOZYATAĞI VERGİ DAİRESİ',
      taxNumber: '8930167863',
      countryCode: 'TR',
      countryId: '55999ad00000010000000000',
      warehouses: [
        {
          _id: '5f2c20a6b5656f4224358c58',
          name: 'Byz Depo',
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
            1,
            3,
            2,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
        {
          _id: '60d2e1811b68615fcfaf4a8d',
          name: 'Sacide Yalçın TR',
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
            _id: '5fd0e0300000010002600001',
            name: {
              tr: 'Aydın',
              en: 'Aydin',
            },
          },
          city: {
            _id: '5fd0e0300000010002600000',
            name: {
              tr: 'Aydın',
              en: 'Aydın',
            },
          },
          domainTypes: [
            1,
            3,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
        {
          _id: '61f11e25587d48175e733c78',
          name: 'Demo Eğitim Mutabakatsızlık',
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
            _id: '55999ad00000010001000003',
            name: {
              tr: 'Kadıköy',
              en: 'Kadikoy',
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
            1,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
        {
          _id: '61f124eb587d480be6736232',
          name: 'Demo eğitim merkez depo',
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
            _id: '55999ad00000010001000003',
            name: {
              tr: 'Kadıköy',
              en: 'Kadikoy',
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
            1,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
        {
          _id: '62284fd4174c9dca8fd93111',
          name: 'Demo Eğitim Cep Depo',
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
            _id: '5ef5f2b00000010007000001',
            name: {
              tr: 'Antalya',
              en: 'Antalya',
            },
          },
          city: {
            _id: '5ef5f2b00000010007000000',
            name: {
              tr: 'Antalya',
              en: 'Antalya',
            },
          },
          domainTypes: [
            1,
            3,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
        {
          _id: '62287f10174c9d9e5fdaffa4',
          name: 'sap create g10 cepdepo 09.03',
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
            1,
          ],
          franchise: '5807715d23e5b3ed4f36377e',
        },
      ],
      owners: [
        {
          _id: '5a96c00a23159f00041ed02c',
          name: 'Nihat',
          gsm: '5342026008',
        },
      ],
    },
  ],
  totalCount: 1,
};

export const roleGroupsMock = {
  records: [
    {
      _id: '5fae5ea9f474fb499ebaa0fd',
      isActive: true,
      name: {
        tr: 'elif',
        en: 'elif2',
      },
      description: {
        tr: 'elif 12',
        en: 'weas',
      },
      roles: [
        {
          permissions: [
            'read',
          ],
          role: '5e788c0ebe8774466bdeb19f',
        },
      ],
      createdAt: '2020-11-13T10:23:37.939Z',
      __v: 0,
    },
  ],
  totalCount: 1,
};

export const reportsMock = [
  {
    name: {
      tr: 'Kurye Durum Değişim Raporu',
      en: 'Courier Status Change Report',
    },
    isActive: true,
    _id: '60d2f7d4e3c1c80b199cc518',
    createdAt: '2021-06-23T12:12:02.692Z',
    updatedAt: '2021-06-23T12:12:02.692Z',
    reportKey: 'courier_status.py',
    parameters: [
      {
        label: {
          tr: 'Depo Seçiniz',
          en: 'Select Warehouse',
        },
        options: [],
        propertyName: 'warehouse_ids',
        componentProps: {
          isMulti: true,
          defaultSelectAllSelections: true,
          isFirstOptionSelected: false,
          useCustomContainer: true,
          hideSelectedOptions: false,
          sortSelectedOptions: true,
        },
        type: 8,
      },
      {
        label: {
          tr: 'Tarih Aralığı',
          en: 'Date Range',
        },
        options: [],
        propertyName: 'start_date|end_date',
        validations: { required: true },
        componentProps: {
          dateRangeLimitInDays: 7,
          allowedMinDate: [
            30,
            'days',
          ],
          allowedMaxDate: [
            1,
            'days',
          ],
        },
        type: 5,
      },
    ],
    reportGroup: {
      name: {
        tr: 'Bayi Raporları',
        en: 'Franchise Reports',
      },
      _id: '60d0495633371f61a4e1b218',
      key: 'franchise',
    },
    ownerType: 'franchise',
  },
];

export const exportFranchiseUsersMock = { url: 'https://getir-franchise-development.s3.eu-west-1.amazonaws.com/franchise-service/franchise-user-export.xlsx?AWSAccessKeyId=ASIAWCUTMFAICGDMKMPU&Expires=1659453039&Signature=QFa7DzQYxg5ULkg3dHmSmg1Jhwk%3D&x-amz-security-token=FwoGZXIvYXdzEDAaDOUIOy0%2FKkA8bNGrxiKqBCxF6z4YuS22lFOY2xqZQ8xopcVus60%2Fs3tfRIfG9SufAJpE7fNSMPfUITN8f%2BpNDN7tXswGdBKTVVcRUtKWhiLO2cZxu6haZIZpNuxNlyEUa3uIOpyhUfgPourVj9paD9amN%2Fk08G8BmYvQLvVwUuMd54qonRmiRHG%2FjJZ0RJ3vQK5pkFtoAFrjHCyax%2Bu7%2B%2Flw0oYKN7pBDe2OoPfv0KSj4zO0zCs%2FXWzbvjLyGvNbL3fXZgZe6gCGzTGFYM5dx2SO8a%2BctxTuBxahqLhbGdn0hzEVkPwYbIRGC8rQSxhEiQcn9%2Fmcn7WHuu0M6FhjcX%2FarGaULXACG9cfIUDPSkCHt%2BBLfE7I0uJG3s3bEuf0U7kBQXYXs6OzdrLsA7GNm7goh8xcl0eBEKCBQKrffsi0Q2mASUUA4qAd051zlryIGDWG3fRUqxGuqAT9WV4HOdXf65v0x16iUafw1ZGwMh0nalxNxBxfpV0jP4VI3cz6ITGo5WEC5yEYy2XcImOoQ9ct9lRYS3SnTF7Fdz0%2FTAutEJJdv%2BEf6d0IarGR7aKdMerTa8eYmlJeHYfIPjFHRkHY6Myk%2FeVeP6eVZAepua4GPNr2LN19G02pfoQt0sgUuZ2CU79dTMpWoJO4IKji7R2AMFKScwnRwpq1eHMcirQQg3HizFlh%2FxBNaDFVg46tZrg5JFsQZk5GjVaPYmkzU4HKNQe%2FyqMNURaQkIcHitMcCeNlkQ4%2B%2BVn1KND0pJcGMitvSW9zJ7HEX%2BBRTbO1LnZdTGqyXZ8gnqoAzYzq14wRl3Hl%2BYdO7aBHaJwT' };

export const getRoleGroupDetailMock = {
  _id: '5fa46fa6d1a7e71016482c32',
  isActive: true,
  name: {
    tr: 'elif test',
    en: 'eliff test',
  },
  description: {
    tr: 'bayi',
    en: 'franchise',
  },
  roles: [
    {
      permissions: [
        'read',
      ],
      role: '5e788c0ebe8774466bdeb1a1',
    },
    {
      permissions: [
        'read',
      ],
      role: '5e788c0ebe8774466bdeb1a3',
    },
    {
      permissions: [
        'read',
      ],
      role: '615aa5beec423ffced9920c6',
    },
    {
      permissions: [
        'changeWarehouse',
        'deactivatePerson',
      ],
      role: '5e788c0ebe8774466bdeb19f',
    },
    {
      permissions: [
        'dsfsdfsdf',
      ],
      role: '5e788c0ebe8774466bdeb19e',
    },
  ],
  reports: [
    '60d2f790e3c1c80b199cc516',
  ],
};
