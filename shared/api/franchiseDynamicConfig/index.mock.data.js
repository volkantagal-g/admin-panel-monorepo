export const mockedConfigEarningsRecords = {
  data: [
    {
      value: '0.2',
      country_id: '55999ad00000020000000000',
      warehouse_domain: 'market',
      variable_name: 'g10_record_day_idle_surplus_allowed_ratio',
      value_type: 'float',
      is_business_change: true,
      end_date: '2003-01-01T00:00:00.000Z',
      start_date: '1903-08-26T00:00:00.000Z',
    },
  ],
  total: 20,
};

export const mockedConfigTypeList = {
  data: [
    {
      _id: '63ad3ee7a677e051e083b011',
      name: 'earnings',
      description: {
        tr: 'bu bir aciklama',
        en: 'this is desc',
      },
      fields: [
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'objectId',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'country_id',
          label: {
            tr: 'Country ID',
            en: 'Country ID',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: false,
          isSortable: false,
          isSelectable: true,
          type: 'string',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'order_domain',
          label: {
            tr: 'Order Domain',
            en: 'Order Domain',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: false,
          isSelectable: true,
          type: 'warehouseDomain',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'warehouse_domain',
          label: {
            tr: 'Warehouse Domain',
            en: 'Warehouse Domain',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'date',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [
            'date',
          ],
          name: 'start_date',
          label: {
            tr: 'Start Date',
            en: 'Start Date',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'date',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [
            'date',
          ],
          name: 'end_date',
          label: {
            tr: 'End Date',
            en: 'End Date',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'boolean',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'boolean',
          ],
          name: 'is_business_change',
          label: {
            tr: 'Can Business Team Edit',
            en: 'Can Business Team Edit',
          },
          isHiddenFromListing: false,
        },
      ],
      createdAt: '2022-12-29T07:16:55.497Z',
      updatedAt: '2022-12-29T07:16:55.497Z',
      __v: 0,
    },
    {
      _id: '63added64e6dda2c6875f0bf',
      name: 'sts',
      description: {
        tr: 'deneme tr',
        en: 'test en',
      },
      fields: [
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'country',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'country_id',
          label: {
            tr: 'Country ID',
            en: 'Country ID',
          },
          isHiddenFromListing: true,
        },
        {
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'boolean',
          ],
          name: 'is_sc',
          label: {
            tr: 'Is SC',
            en: 'Is SC',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'domain',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'int',
          ],
          name: 'domain_type',
          label: {
            tr: 'Domain Type',
            en: 'Domain Type',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'config_name',
          label: {
            tr: 'Config Name',
            en: 'Config Name',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [
            'int',
          ],
          name: 'value',
          label: {
            tr: 'Value',
            en: 'Value',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            'string',
          ],
          name: 'value_type',
          label: {
            tr: 'Value Type',
            en: 'Value Type',
          },
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [
            'date',
          ],
          name: 'start_date',
          label: {
            tr: 'Start Date',
            en: 'Start Date',
          },
          isHiddenFromListing: false,
        },
        {
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          type: 'config',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [
            'date',
          ],
          name: 'end_date',
          label: {
            tr: 'End Date',
            en: 'End Date',
          },
          isHiddenFromListing: false,
        },
      ],
      createdAt: '2022-12-29T18:39:18.457Z',
      updatedAt: '2022-12-29T18:39:18.457Z',
      __v: 0,
    },
    {
      _id: '645bd238d8e5815f2ee429cd',
      name: 'properConfigType',
      description: {
        tr: 'Hiçbir anlam ifade etmeyen ama test amacı için oluşturulmuş düzgün konfigürasyon türü',
        en: 'Proper config type that makes no sense but is built for testing purpose',
        _id: '645bd238d8e5815f2ee429ce',
      },
      fields: [
        {
          name: 'objectId',
          label: {
            tr: 'Bu konfigürasyon için eşsiz id',
            en: 'Unique id for this config',
            _id: '645bd238d8e5815f2ee429d0',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: true,
          isHiddenFromListing: true,
          type: 'objectId',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
          ],
        },
        {
          name: 'databaseUrl',
          label: {
            tr: "Veritabanı URL'si",
            en: 'Database URL',
            _id: '645bd238d8e5815f2ee429d2',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'string',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
            { type: 'required' },
          ],
        },
        {
          name: 'maxRetryAttempts',
          label: {
            tr: 'Hata sonrası maksimum tekrar sayısı',
            en: 'Max attempt count after a failure',
            _id: '645bd238d8e5815f2ee429d4',
          },
          isRequired: false,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'integer',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [],
          validations: [
            {
              type: 'max',
              params: [
                10, 'Max 10 retries allowed',
              ],
            },
          ],
        },
        {
          name: 'cacheExpirationTime',
          label: {
            tr: 'Önbellek temizlenme tarihi',
            en: 'Cache Expiration Time',
            _id: '645bd238d8e5815f2ee429d6',
          },
          isRequired: false,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'date',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
          ],
        },
        {
          name: 'enableCaching',
          label: {
            tr: 'Önbelleği aktif et',
            en: 'Enable Caching',
            _id: '645bd238d8e5815f2ee429d8',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'boolean',
          permissions: [
            'DATA_PERM_KEY',
          ],
          valueEnums: [
          ],
        },
        {
          name: 'emailAddress',
          label: {
            tr: 'E-posta adresi',
            en: 'E-mail address',
            _id: '645bd238d8e5815f2ee429da',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'string',
          permissions: [
            'BIZ_PERM_KEY',
            'DATA_PERM_KEY',
          ],
          valueEnums: [
          ],
        },
        {
          name: 'emailSubject',
          label: {
            tr: 'E-posta konusu',
            en: 'E-mail kubject',
            _id: '645bd238d8e5815f2ee429dc',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'translation',
          permissions: [
            'BIZ_PERM_KEY',
            'DATA_PERM_KEY',
          ],
          valueEnums: [
          ],
        },
        {
          name: 'emailContent',
          label: {
            tr: 'E-posta içeriği',
            en: 'E-mail content',
            _id: '645bd238d8e5815f2ee429de',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'translation',
          permissions: [
            'BIZ_PERM_KEY',
            'DATA_PERM_KEY',
          ],
          valueEnums: [

          ],
        },
        {
          name: 'warehosueDomain',
          label: {
            tr: 'Bayi Türü',
            en: 'Warehouse Domain',
            _id: '645bd238d8e5815f2ee429e0',
          },
          isRequired: true,
          isSortable: false,
          isSelectable: true,
          isHiddenFromListing: false,
          type: 'warehouseDomain',
          permissions: [
            'BIZ_PERM_KEY',
            'DATA_PERM_KEY',
          ],
          valueEnums: [

          ],
        },
        {
          name: 'start_date',
          label: {
            tr: 'Start Date TR',
            en: 'Start Date',
            _id: '645bd238d8e5815f2ee429e2',
          },
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          isHiddenFromListing: false,
          type: 'date',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [

          ],
        },
        {
          name: 'end_date',
          label: {
            tr: 'End Date TR',
            en: 'End Date',
            _id: '645bd238d8e5815f2ee429e4',
          },
          isRequired: true,
          isSortable: true,
          isSelectable: true,
          isHiddenFromListing: false,
          type: 'date',
          permissions: [
            'DATA_PERM_KEY',
            'BIZ_PERM_KEY',
          ],
          valueEnums: [

          ],
        },
        {
          name: 'unknownType',
          label: {
            tr: 'Bilinmeyen Tür',
            en: 'Unknown Type',
          },
          isRequired: false,
          isSortable: false,
          isSelectable: false,
          isHiddenFromListing: false,
          type: 'unknownType',
          permissions: [],
          valueEnums: [],
        },
      ],
      createdAt: '2023-05-10T17:19:52.362Z',
      updatedAt: '2023-05-10T17:19:52.362Z',
      __v: 0,
    },
  ],
  total: 3,
};

export const mockedConfigTypeDetail = {
  _id: '645261788bd4d63f9306d40e',
  name: 'Azizol Berk',
  description: {
    tr: 'desc tr',
    en: 'desc en',
  },
  fields: [
    {
      name: 'first field',
      label: {
        tr: 'label tr',
        en: 'label en',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'boolean',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'start_date',
      label: {
        tr: 'Start Date TR',
        en: 'Start Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'end_date',
      label: {
        tr: 'End Date TR',
        en: 'End Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
  ],
  createdAt: '2023-05-03T13:28:24.408Z',
};

export const mockedConfigTypeDetailUpdated = {
  _id: '645261788bd4d63f9306d40e',
  name: 'Azizol Berk',
  description: {
    tr: 'desc tr',
    en: 'desc en',
  },
  fields: [
    {
      name: 'new field name',
      label: {
        tr: 'label tr',
        en: 'label en',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'boolean',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'start_date',
      label: {
        tr: 'Start Date TR',
        en: 'Start Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'end_date',
      label: {
        tr: 'End Date TR',
        en: 'End Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
  ],
  createdAt: '2023-05-03T13:28:24.408Z',
};

export const mockedConfigDetail = {
  _id: '64638d27f0bc7e8908f58e64',
  configType: '645bd238d8e5815f2ee429cd',
  start_date: '2023-01-01T00:00:00.000Z',
  end_date: '2099-12-31T00:00:00.000Z',
  databaseUrl: 'www.berktest.com',
  emailAddress: 'berk.ozturk@getir.com',
  emailSubject: {
    tr: 'email subject',
    en: 'email subject',
  },
  emailContent: {
    tr: 'email content',
    en: 'email content',
  },
  objetcId: '64638bbe5201b89686ab7f39',
  maxRetryAttempts: 1,
  cacheExpirationTime: '2023-05-16T14:02:46.460Z',
  enableCaching: true,
  warehosueDomain: 'market',
  createdAt: '2023-05-16T14:03:19.668Z',
  updatedAt: '2023-05-16T14:03:19.668Z',
  __v: 0,
};

export const mockedConfigTypeDetail2 = {
  _id: '645bd238d8e5815f2ee429cd',
  name: 'properConfigType',
  description: {
    tr: 'Hiçbir anlam ifade etmeyen ama test amacı için oluşturulmuş düzgün konfigürasyon türü',
    en: 'Proper config type that makes no sense but is built for testing purpose',
  },
  fields: [
    {
      name: 'objetcId',
      label: {
        tr: 'Bu konfigürasyon için eşsiz id',
        en: 'Unique id for this config',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: true,
      isHiddenFromListing: true,
      type: 'objectId',
      permissions: [
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'databaseUrl',
      label: {
        tr: "Veritabanı URL'si",
        en: 'Database URL',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'string',
      permissions: [
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'maxRetryAttempts',
      label: {
        tr: 'Hata sonrası maksimum tekrar sayısı',
        en: 'Max attempt count after a failure',
      },
      isRequired: false,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'integer',
      permissions: [
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'cacheExpirationTime',
      label: {
        tr: 'Önbellek temizlenme tarihi',
        en: 'Cache Expiration Time',
      },
      isRequired: false,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'enableCaching',
      label: {
        tr: 'Önbelleği aktif et',
        en: 'Enable Caching',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'boolean',
      permissions: [
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'emailAddress',
      label: {
        tr: 'E-posta adresi',
        en: 'E-mail address',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'string',
      permissions: [
        'BIZ_PERM_KEY',
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'emailSubject',
      label: {
        tr: 'E-posta konusu',
        en: 'E-mail kubject',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'translation',
      permissions: [
        'BIZ_PERM_KEY',
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'emailContent',
      label: {
        tr: 'E-posta içeriği',
        en: 'E-mail content',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: false,
      isHiddenFromListing: false,
      type: 'translation',
      permissions: [
        'BIZ_PERM_KEY',
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'warehosueDomain',
      label: {
        tr: 'Bayi Türü',
        en: 'Warehouse Domain',
      },
      isRequired: true,
      isSortable: false,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'warehouseDomain',
      permissions: [
        'BIZ_PERM_KEY',
        'DATA_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'start_date',
      label: {
        tr: 'Start Date TR',
        en: 'Start Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
    {
      name: 'end_date',
      label: {
        tr: 'End Date TR',
        en: 'End Date',
      },
      isRequired: true,
      isSortable: true,
      isSelectable: true,
      isHiddenFromListing: false,
      type: 'date',
      permissions: [
        'DATA_PERM_KEY',
        'BIZ_PERM_KEY',
      ],
      valueEnums: [],
    },
  ],
  createdAt: '2023-05-10T17:19:52.362Z',
};
