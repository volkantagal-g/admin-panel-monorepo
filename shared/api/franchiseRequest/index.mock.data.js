export const franchiseRequestListMock = {
  requests: [
    {
      _id: '6411d0e0be023bbd081f308a',
      references: [

      ],
      countryCode: 'TR',
      applicant: {
        name: 'TestApplication_Safari',
        lastName: 'TestApplication_Safari',
        birthDate: {
          value: 2019,
          label: 2019,
        },
        educationLevel: {
          value: 100,
          label: 'İlkokul',
        },
        phoneNumber: '905739304324',
        email: 'handenur.uzun@getir.com',
        cityOfResidence: {
          _id: '61a9c46e32284c8e3877ed0b',
          name: 'Adana',
          countryCode: 'TR',
          createdAt: '2021-12-03T07:17:02.914Z',
          __v: 0,
          country: '55999ad00000010000000000',
        },
        regionOfResidence: {
          _id: '61a9c47632284c8e3877ee9e',
          name: 'Pozantı',
          cityId: '61a9c46e32284c8e3877ed0b',
          createdAt: '2021-12-03T07:17:10.097Z',
          __v: 0,
        },
        addressOfResidence: 'TestApplication_Safari',
        experiences: [
          {
            companyName: 'TestApplication_Safari',
            jobTitle: 'TestApplication_Safari',
            startDate: {
              value: 2023,
              label: 2023,
            },
            endDate: {
              value: 2023,
              label: 2023,
            },
          },
        ],
        isHaveAnotherJob: {
          value: false,
          label: 'Hayır',
        },
        currentMonthlyIncome: {
          min: 0,
          max: 10000,
          key: '0₺ - 10.000₺',
          currency: '₺',
        },
        isRelativeAppliedForFranchise: false,
        isRelativeFranchiseExists: false,
        hasGetirReferral: false,
      },
      application: {
        cityRegion: [
          {
            city: {
              _id: '61a9c46e32284c8e3877ed0b',
              name: 'Adana',
              countryCode: 'TR',
              createdAt: '2021-12-03T07:17:02.914Z',
              __v: 0,
              country: '55999ad00000010000000000',
            },
            region: {
              _id: '61a9c47632284c8e3877ee9e',
              name: 'Pozantı',
              cityId: '61a9c46e32284c8e3877ed0b',
              createdAt: '2021-12-03T07:17:10.097Z',
              __v: 0,
            },
          },
        ],
        amountOfInvesment: {
          min: 750000,
          max: 1000000,
          key: '750.000₺-1.000.000₺',
          currency: '₺',
        },
        creditUsage: {
          value: false,
          label: 'Hayır',
        },
        expectedMonthlyIncome: {
          min: 0,
          max: 10000,
          key: '0₺ - 10.000₺',
          currency: '₺',
        },
        whoWillInvesment: {
          value: 100,
          label: 'Ben Yapacağım',
        },
        management: {
          value: 100,
          label: 'Yöneticiyi Kendim Bulacağım',
        },
        haveFranchiseExperience: {
          value: false,
          label: 'Hayır',
        },
        haveManagedWarehouseOrCourier: {
          value: false,
          label: 'Hayır',
        },
        reasonToHaveFranchise: 'TestApplication_Safari',
        interestedDomainTypes: [
          {
            domain: {
              value: 1,
              label: 'Getir',
            },
          },
          {
            domain: {
              value: 3,
              label: 'GetirBüyük',
            },
          },
          {
            domain: {
              value: 4,
              label: 'GetirSu',
            },
          },
        ],
        clarificationText: true,
      },
      createdAt: '2023-03-15T14:06:24.349Z',
      updatedAt: '2023-03-15T14:06:24.349Z',
      __v: 0,
    },
  ],
  totalCount: 1,
};

export const dynamicColumnsMock = [
  {
    name: 'createdAt',
    type: 'date',
    excelTranslationKey: 'CREATED_AT',
    translationKey: 'franchiseRequestPage:LIST.TABLE.CREATED_AT',
    priority: 100,
  },
  {
    name: 'application.cityRegion',
    type: 'array',
    backendValidationType: 'arrayOfObject',
    translationKey: 'franchiseRequestPage:LIST.TABLE.CITY_REGION',
    excelTranslationKey: 'CITY_REGION',
    priority: 95,
    childs: [
      {
        isUi: true,
        isExcel: true,
        priority: 75,
        componentType: 'dropdown',
        componentName: 'SelectTRCity',
        name: 'city',
        label: 'FORM.FIELD.CITY',
        placeholder: 'FORM.FIELD.CITY',
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'FORM.VALIDATION.REQUIRED',
          },
        ],
        validationType: 'object',
        backendValidationType: 'object',
        excelTranslationKey: 'CITY',
        translationKey: 'franchiseRequestPage:LIST.TABLE.CITY',
        listValue: 'name',
      },
      {
        isUi: true,
        isExcel: true,
        priority: 75,
        componentType: 'dropdown',
        componentName: 'SelectTRRegion',
        name: 'region',
        label: 'FORM.FIELD.REGION',
        placeholder: 'FORM.FIELD.REGION',
        editable: true,
        validations: [
          {
            type: 'required',
            params: 'FORM.VALIDATION.REQUIRED',
          },
        ],
        validationType: 'object',
        backendValidationType: 'object',
        excelTranslationKey: 'REGION',
        translationKey: 'franchiseRequestPage:LIST.TABLE.REGION',
        listValue: 'name',
      },
    ],
  },
  {
    name: 'applicant.email',
    type: 'string',
    backendValidationType: 'string',
    translationKey: 'franchiseRequestPage:LIST.TABLE.EMAIL',
    excelTranslationKey: 'EMAIL',
    priority: 75,
  },
  {
    name: 'application.amountOfInvesment',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'key',
    translationKey: 'franchiseRequestPage:LIST.TABLE.INVESMENT_POWER',
    excelTranslationKey: 'INVESMENT_POWER',
    priority: 60,
  },
  {
    name: 'application.whoWillInvesment',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'label',
    translationKey: 'franchiseRequestPage:LIST.TABLE.WHO_WILL_INVESMENT',
    excelTranslationKey: 'WHO_WILL_INVESMENT',
    priority: 40,
  },
  {
    name: 'application.management',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'label',
    translationKey: 'franchiseRequestPage:LIST.TABLE.MANAGEMENT',
    excelTranslationKey: 'MANAGEMENT',
    priority: 35,
  },
  {
    name: 'application.haveManagedWarehouseOrCourier',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'label',
    translationKey: 'franchiseRequestPage:LIST.TABLE.HAVE_MANAGED_WAREHOUSE_OR_COURIER',
    excelTranslationKey: 'HAVE_MANAGED_WAREHOUSE_OR_COURIER',
    priority: 30,
  },
  {
    name: 'applicant.cityOfResidence',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'name',
    translationKey: 'franchiseRequestPage:LIST.TABLE.CITY_OF_RESIDENCE',
    excelTranslationKey: 'CITY_OF_RESIDENCE',
    priority: 7,
  },
  {
    name: 'applicant.regionOfResidence',
    type: 'object',
    backendValidationType: 'object',
    listValue: 'name',
    translationKey: 'franchiseRequestPage:LIST.TABLE.REGION_OF_RESIDENCE',
    excelTranslationKey: 'REGION_OF_RESIDENCE',
    priority: 6,
  },
  {
    name: 'applicant.name',
    type: 'string',
    backendValidationType: 'string',
    translationKey: 'franchiseRequestPage:LIST.TABLE.NAME',
    excelTranslationKey: 'NAME',
  },
  {
    name: 'applicant.lastName',
    type: 'string',
    backendValidationType: 'string',
    translationKey: 'franchiseRequestPage:LIST.TABLE.LASTNAME',
    excelTranslationKey: 'LASTNAME',
  },
];
