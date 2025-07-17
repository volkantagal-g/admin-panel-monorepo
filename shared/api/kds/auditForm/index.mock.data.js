export const warehouseListMock = {
  warehouses: [
    {
      _id: '5e6b409a3d1164130dacd931',
      location: {
        type: 'Point',
        coordinates: [
          27.1350557,
          38.324913,
        ],
        acc: -1,
        time: '2020-03-25T08:33:37.282Z',
      },
      domainTypes: [
        1,
        3,
        6,
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
      pickers: [
        '61caed7e7bc5ab7707c24d72',
      ],
      couriers: [],
      state: 200,
      status: 100,
      aggressionLevel: 1,
      name: 'Gaziemir',
      shortName: 'Gaziemir',
      warehouseType: 1,
      mainStore: '5db699e840168d40b7f4da15',
      updatedAt: '2022-07-26T14:48:25.454Z',
      postCode: '32266',
      businessDecision: {
        foodOrder: {
          distanceLimit: 1,
          durationLimit: 1,
        },
      },
      fixture: { ovenCount: 11 },
      surfaceArea: {
        basement: 1,
        entrance: 11,
        entranceStorage: 1,
        entresol: 0,
        frontPark: 0,
        total: 0,
      },
      budgetItem: {
        indexValue: 0,
        manHourFeeGroup: 4,
        rentAmount: 0,
        stoppage: 0,
        dues: 100,
        carPark: 0,
        rentStartDate: '2021-04-24T10:18:28.376Z',
      },
      vehicleTypeWorkingHours: [],
      warehouseGLN: 1000000000070,
      baseWorkingHourType: 4,
      countryCode: 'TR',
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
        _id: '55999ad00000010001000004',
        country: '55999ad00000010000000000',
        city: '55999ad00000010001000000',
        name: {
          tr: 'Göktürk',
          en: 'Gokturk',
        },
        oldCode: 1900,
      },
      fieldManagers: [
        '5aaf9f0459fb2100048cf34a',
      ],
      franchise: '6177b124bb35873a721e91f4',
      mainWarehouses: [
        '5db699e840168d40b7f4da15',
      ],
      customAggressionLevel: 0,
      basePeakHourType: 1,
      id: '5e6b409a3d1164130dacd931',
    },
  ],
};

export const franchiseListMock = {
  franchises: [
    {
      _id: '6177b124bb35873a721e91f4',
      commission: {
        settings: {
          1: [],
          2: [],
          3: [],
          4: [],
        },
        createdAt: '2021-10-26T07:41:24.569Z',
      },
      franchiseType: 2,
      isActivated: true,
      isDeleted: false,
      name: 'Merve Ayçiçek ',
      countryId: '55999ad00000010000000000',
      countryCode: 'TR',
      taxOffice: 'Istanbul ',
      taxNumber: '123456',
      updatedAt: '2021-10-26T07:46:26.559Z',
      createdAt: '2021-10-26T07:41:24.569Z',
      __v: 0,
      authorizedPerson: {
        name: 'Merve Ayçiçek ',
        gsm: '05435467788',
        email: 'test@gmail.com',
      },
      warehouses: [
        {
          _id: '5e6b409a3d1164130dacd931',
          name: 'Gaziemir',
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
            _id: '55999ad00000010001000004',
            name: {
              tr: 'Göktürk',
              en: 'Gokturk',
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
            6,
          ],
          franchise: '6177b124bb35873a721e91f4',
        },
        {
          _id: '621f820893e480af2a18a304',
          name: 'Stock Equipment',
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
          franchise: '6177b124bb35873a721e91f4',
        },
      ],
      owners: [
        {
          _id: '6177cc46bb358757561e93af',
          name: 'abc',
          gsm: '5432123344',
        },
      ],
    },
  ],
};

export const qualityDepartmentMock = {
  employees: [
    {
      _id: '59bb92b9b4ff44c3e6841c87',
      fullName: 'Real Cenk Batman',
    },
  ],
};

export const storeAuditListMock = {
  data: [
    {
      id: '632ab6045db74f66c410a118',
      auditDate: '2022-09-20T21:00:00.832Z',
      auditFormType: [
        {
          _id: '63287df65f3b9a35942c98f6',
          name: {
            tr: 'berktest1dd',
            en: 'berktest1',
          },
        },
      ],
      status: 200,
      warehouse: {
        name: 'Karabağlar',
        id: '5dc32e61734a192200caddfe',
        warehouseType: 10,
      },
      franchise: {
        name: 'bahadir test 4',
        id: '5dee5217744b2e30d47cb701',
      },
      auditor: {
        id: '5acb6d135eb4cdf436a913a1',
        name: 'Yasin Altan',
      },
      completionDate: '2022-09-21T06:58:47.034Z',
      sentToFranchiseDate: '2022-09-21T06:59:10.927Z',
    },
  ],
  total: 30,
};

export const storeAuditDetailMock = {
  _id: '63342e487086141a315782ab',
  letterGrade: 'F',
  status: 400,
  auditor: {
    id: '59bb92b9b4ff44c3e6841c87',
    name: 'Real Cenk Batman',
  },
  franchiseId: '6177b124bb35873a721e91f4',
  warehouseId: '5e6b409a3d1164130dacd931',
  auditFormTypeId: '61dd61de3a11b0791f27fd97',
  auditDate: '2022-09-30T21:00:00.296Z',
  country: '55999ad00000010000000000',
  questionGroups: [
    {
      auditFormType: [
        '61dd61e63a11b0791f27fd98',
        '61dd61de3a11b0791f27fd97',
      ],
      _id: '621e34cf6b172f48ab432967',
      name: {
        tr: '01March Question Group_ShortAudit +Long Audit',
        en: '01March Question Group_ShortAudit +Long Audit',
      },
      status: 'ACTIVE',
      country: '55999ad00000010000000000',
      position: 1,
      questions: [
        {
          isPhotoForced: false,
          scoreMappingIds: [
            '621e28c26b172f3663432849',
            '621e28c26b172f670f43284a',
            '621df92c5509e4e145ec194d',
          ],
          domainType: [
            'GETIR10',
            'MARKET',
            'WATER',
          ],
          auditFormType: [
            '61dd61de3a11b0791f27fd97',
            '61dd61e63a11b0791f27fd98',
          ],
          answerOptions: [
            {
              tr: 'Option1',
              en: 'Option1',
            },
            {
              tr: 'Denetlenemedi',
              en: 'Not Applicable',
            },
          ],
          scoreMappings: [
            {
              _id: '621df92c5509e4e145ec194d',
              name: {
                tr: 'multiple_choice_prod',
                en: 'multiple_choice_prod',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'WATER',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T10:45:00.468Z',
              updatedAt: '2022-03-01T12:53:41.981Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e28c26b172f3663432849',
              name: {
                tr: '0-30p',
                en: '0-30p',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'GETIR10',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T14:08:02.582Z',
              updatedAt: '2022-03-01T14:08:02.582Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e28c26b172f670f43284a',
              name: {
                tr: '0-30p',
                en: '0-30p',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'MARKET',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T14:08:02.582Z',
              updatedAt: '2022-03-01T14:08:02.582Z',
              country: '55999ad00000010000000000',
            },
          ],
          files: [],
          _id: '622f3ad732c2eeb223a0fca3',
          questionGroupId: '621e34cf6b172f48ab432967',
          name: {
            tr: 'Tooltip is empty_MultipleChoice',
            en: 'Tooltip is empty_MultipleChoice',
          },
          tooltip: {
            tr: '',
            en: '',
          },
          status: 'ACTIVE',
          askForStoreConversion: false,
          questionType: 'MULTIPLE_CHOICE',
          notApplicableOptionAvailable: true,
          createdAt: '2022-03-14T12:53:43.969Z',
          updatedAt: '2022-09-29T11:56:08.352Z',
          position: 3,
          country: '55999ad00000010000000000',
          askForMainWarehouse: false,
          answer: {},
        },
        {
          isPhotoForced: false,
          scoreMappingIds: [
            '621e28c26b172f3663432849',
            '621e28c26b172f670f43284a',
            '621df92c5509e4e145ec194d',
          ],
          domainType: [
            'GETIR10',
            'MARKET',
            'WATER',
          ],
          auditFormType: [
            '61dd61de3a11b0791f27fd97',
            '61dd61e63a11b0791f27fd98',
          ],
          answerOptions: [
            {
              tr: 'Option1',
              en: 'Option2',
            },
          ],
          scoreMappings: [
            {
              _id: '621df92c5509e4e145ec194d',
              name: {
                tr: 'multiple_choice_prod',
                en: 'multiple_choice_prod',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'WATER',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T10:45:00.468Z',
              updatedAt: '2022-03-01T12:53:41.981Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e28c26b172f3663432849',
              name: {
                tr: '0-30p',
                en: '0-30p',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'GETIR10',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T14:08:02.582Z',
              updatedAt: '2022-03-01T14:08:02.582Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e28c26b172f670f43284a',
              name: {
                tr: '0-30p',
                en: '0-30p',
              },
              questionType: 'MULTIPLE_CHOICE',
              warehouseType: 'MARKET',
              value: {
                min: 0,
                max: 30,
              },
              createdAt: '2022-03-01T14:08:02.582Z',
              updatedAt: '2022-03-01T14:08:02.582Z',
              country: '55999ad00000010000000000',
            },
          ],
          files: [],
          _id: '622f3f88f1e6be25ffcb4db9',
          questionGroupId: '621e34cf6b172f48ab432967',
          name: {
            tr: 'Tooltip is empty_multiChoice',
            en: 'Tooltip is empty_multiChoice',
          },
          tooltip: {
            tr: '',
            en: '',
          },
          status: 'ACTIVE',
          askForStoreConversion: false,
          questionType: 'MULTIPLE_CHOICE',
          notApplicableOptionAvailable: false,
          createdAt: '2022-03-14T13:13:44.253Z',
          updatedAt: '2022-09-29T11:56:08.394Z',
          position: 4,
          country: '55999ad00000010000000000',
          askForMainWarehouse: false,
          answer: {},
        },
        {
          isPhotoForced: false,
          scoreMappingIds: [
            '621e2ebb6b172f10704328eb',
            '621e2ebb6b172f7b8b4328ed',
            '621e2ebb6b172f74d24328ef',
          ],
          domainType: [
            'WATER',
            'GETIR10',
            'MARKET',
          ],
          auditFormType: [
            '61dd61de3a11b0791f27fd97',
            '61dd61e63a11b0791f27fd98',
          ],
          answerOptions: [
            '1',
          ],
          scoreMappings: [
            {
              _id: '621e2ebb6b172f10704328eb',
              name: {
                tr: '30p',
                en: '30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'GETIR10',
              value: -5,
              createdAt: '2022-03-01T14:33:31.272Z',
              updatedAt: '2022-03-18T08:06:02.747Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e2ebb6b172f74d24328ef',
              name: {
                tr: '30p',
                en: '30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'WATER',
              value: 30,
              createdAt: '2022-03-01T14:33:31.273Z',
              updatedAt: '2022-03-01T14:33:31.273Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e2ebb6b172f7b8b4328ed',
              name: {
                tr: '30p',
                en: '30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'MARKET',
              value: 30,
              createdAt: '2022-03-01T14:33:31.273Z',
              updatedAt: '2022-03-01T14:33:31.273Z',
              country: '55999ad00000010000000000',
            },
          ],
          files: [],
          _id: '622f3ffdf1e6be780ccb4dd4',
          questionGroupId: '621e34cf6b172f48ab432967',
          name: {
            tr: 'Tooltip is empty_numberInput',
            en: 'Tooltip is empty_numberInput',
          },
          tooltip: {
            tr: '',
            en: '',
          },
          status: 'ACTIVE',
          askForStoreConversion: false,
          questionType: 'NUMBER_INPUT',
          createdAt: '2022-03-14T13:15:41.018Z',
          updatedAt: '2022-09-29T11:56:08.443Z',
          position: 5,
          country: '55999ad00000010000000000',
          askForMainWarehouse: false,
          answer: {},
        },
      ],
    },
    {
      auditFormType: [
        '61dd61de3a11b0791f27fd97',
      ],
      _id: '621e34e06b172fd10943296c',
      name: {
        tr: '01March Question Group_LongAudit',
        en: '01March Question Group_LongAudit',
      },
      status: 'ACTIVE',
      position: 2,
      country: '55999ad00000010000000000',
      questions: [
        {
          isPhotoForced: false,
          scoreMappingIds: [
            '621e2ebb6b172f70004328ee',
          ],
          domainType: [
            'MARKET',
          ],
          auditFormType: [
            '61dd61de3a11b0791f27fd97',
          ],
          answerOptions: [
            '1',
          ],
          scoreMappings: [
            {
              _id: '621e2ebb6b172f70004328ee',
              name: {
                tr: '-30p',
                en: '-30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'MARKET',
              value: -30,
              createdAt: '2022-03-01T14:33:31.273Z',
              updatedAt: '2022-03-01T14:33:31.273Z',
              country: '55999ad00000010000000000',
            },
          ],
          files: [],
          _id: '62206e016b172f3f31433145',
          questionGroupId: '621e34e06b172fd10943296c',
          name: {
            tr: 'Q11_GetirMore(-30p)_NumberInput_LongAudit',
            en: 'Q11_GetirMore(-30p)_NumberInput_LongAudit',
          },
          tooltip: {
            tr: 'test',
            en: 'test',
          },
          status: 'ACTIVE',
          askForStoreConversion: false,
          questionType: 'NUMBER_INPUT',
          createdAt: '2022-03-03T07:28:01.356Z',
          updatedAt: '2022-09-29T11:56:08.487Z',
          position: 2,
          country: '55999ad00000010000000000',
          askForMainWarehouse: false,
          answer: {},
        },
        {
          isPhotoForced: false,
          scoreMappingIds: [
            '621e2ebb6b172f10704328eb',
            '621e2ebb6b172f7b8b4328ed',
          ],
          domainType: [
            'GETIR10',
            'MARKET',
          ],
          auditFormType: [
            '61dd61de3a11b0791f27fd97',
          ],
          answerOptions: [
            '1',
          ],
          scoreMappings: [
            {
              _id: '621e2ebb6b172f10704328eb',
              name: {
                tr: '30p',
                en: '30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'GETIR10',
              value: -5,
              createdAt: '2022-03-01T14:33:31.272Z',
              updatedAt: '2022-03-18T08:06:02.747Z',
              country: '55999ad00000010000000000',
            },
            {
              _id: '621e2ebb6b172f7b8b4328ed',
              name: {
                tr: '30p',
                en: '30p',
              },
              questionType: 'NUMBER_INPUT',
              warehouseType: 'MARKET',
              value: 30,
              createdAt: '2022-03-01T14:33:31.273Z',
              updatedAt: '2022-03-01T14:33:31.273Z',
              country: '55999ad00000010000000000',
            },
          ],
          files: [],
          _id: '62206fad6b172f3e11433189',
          questionGroupId: '621e34e06b172fd10943296c',
          name: {
            tr: 'Q12_Getir10+More(30p)_NumberInput_LongAudit',
            en: 'Q12_Getir10+More(30p)_NumberInput_LongAudit',
          },
          tooltip: {
            tr: 'test',
            en: 'test',
          },
          status: 'ACTIVE',
          askForStoreConversion: false,
          questionType: 'NUMBER_INPUT',
          createdAt: '2022-03-03T07:35:09.813Z',
          updatedAt: '2022-09-29T11:56:08.545Z',
          position: 3,
          country: '55999ad00000010000000000',
          askForMainWarehouse: false,
          answer: {},
        },
      ],
    },
  ],
  warehouse: {
    domainTypes: [
      1,
      3,
      6,
    ],
    warehouseType: 10,
    name: 'Gaziemir',
    _id: '5e6b409a3d1164130dacd931',
  },
  createdAt: '2022-09-28T11:21:44.610Z',
  updatedAt: '2022-09-29T11:56:08.545Z',
  __v: 0,
};
