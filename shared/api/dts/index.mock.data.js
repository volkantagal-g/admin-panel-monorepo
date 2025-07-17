export const mockedDysCategorySetting = {
  _id: '5bc48e961f56680e17932098',
  isActive: false,
  description: {
    en: 'desc 1',
    tr: 'açıklama 1',
  },
  title: {
    en: 'category 1',
    tr: 'kategori 1',
  },
};
export const mockedDysFeedbackSetting = {
  _id: '5bc48e961f56680e17932098',
  isActive: false,
  description: {
    en: 'desc 1',
    tr: 'açıklama 1',
  },
  title: {
    en: 'category 1',
    tr: 'kategori 1',
  },
};

export const mockedDysCategorySettings = {
  dtsRuleCategories: [
    mockedDysCategorySetting,
  ],
};

export const mockedDysCategorySettingDetail = {
  dtsRuleCategory: [
    mockedDysCategorySetting,
  ],
};

export const mockedDysFeedbackSettings = {
  dtsFeedbackSources: [
    {
      _id: '5bc48e961f56680e17932098',
      isActive: false,
      description: {
        en: 'desc 1',
        tr: 'açıklama 1',
      },
      title: {
        en: 'category 1',
        tr: 'kategori 1',
      },
    },
    {
      _id: '62c2bdc8d53a5956af1aa00e',
      isActive: true,
      title: {
        tr: 'angmar 126',
        en: 'angmar 126',
      },
      description: {
        tr: 'angmar',
        en: 'angmar',
      },
    },
  ],
};

export const mockedDysFeedbackSettingDetail = {
  dtsFeedbackSource: [
    mockedDysFeedbackSetting,
  ],
};

export const mockedDysPrioritySetting = {
  _id: '5f7ac6e64912884c71929dab',
  acceptancePoint: 17,
  warningPoint: 12,
  rejectionPoint: 1,
  isActive: false,
  title: {
    en: 'title ddd',
    tr: 'sample123',
  },
  description: {
    en: 'description ccc',
    tr: 'description dwdw',
  },
};

export const mockedDysPrioritySettings = {
  dtsRulePriorities: [
    mockedDysPrioritySetting,
  ],
};

export const mockedDysPrioritySettingDetail = {
  dtsRulePriority: [
    mockedDysPrioritySetting,
  ],
};

export const mockedDtsRuleDetail = {
  dtsRule: {
    _id: '634425eeb00208a86a82a3a0',
    isActive: false,
    category: {
      _id: '5f8d7f80fd5fe1ad8ae993b9',
      isActive: true,
      title: {
        tr: 'deneme 1',
        en: 'deneme 1',
      },
      description: {
        tr: 'test',
        en: 'test',
      },
    },
    closeAs: null,
    closeMessage: null,
    defaultNote: 'tetsetstesttt',
    description: {
      tr: 'test999999',
      en: 'test999999',
    },
    priority: {
      _id: '5f75fdac324ec127e86b66a6',
      acceptancePoint: 12,
      warningPoint: 11,
      rejectionPoint: 10,
      isActive: false,
      title: {
        en: 'category 1112',
        tr: 'kategori 1112',
      },
      description: {
        en: 'desc 1112',
        tr: 'açıklama 1112',
      },
    },
    ruleNumber: 7898755,
    title: {
      tr: 'test',
      en: 'test',
    },
  },
};

export const mockedDtsRuleList = {
  records: [
    {
      _id: '5f7d66341bfa5729173ee731',
      isActive: true,
      category: {
        _id: '5bc48e961f56680e17932098',
        isActive: true,
        description: {
          en: 'desc 1',
          tr: 'açıklama 1',
        },
        title: {
          en: 'category 1',
          tr: 'kategori 1',
        },
      },
      priority: {
        _id: '5bc5a821a4950b24d5a51c32',
        isActive: true,
        rejectionPoint: 13,
        warningPoint: 15,
        acceptancePoint: 17,
        description: {
          en: 'description 1112***',
          tr: 'description 1112****',
        },
        title: {
          en: 'title 1112**',
          tr: 'title 1112***',
        },
      },
      description: {
        tr: 'eyw',
        en: 'eyw',
      },
      ruleNumber: 500,
      title: {
        tr: 'hadi inş',
        en: 'hadi inş',
      },
      closeAs: 2,
      closeMessage: 'uyarı',
    },
  ],
  totalCount: 50,
};

export const mockedDtsViolationList = {
  records: [
    {
      _id: '63451b3fb00208a86a82a424',
      status: 1000,
      isActive: false,
      description: 'test',
      feedbackSource: '5bc4aa23d1fedc1393e8e268',
      files: [],
      franchise: '5e0d8a1df0f1d572ab399aaa',
      person: '59b3e62da7f3156056f8034a',
      realized: '2022-10-11T07:28:05.188Z',
      reporter: { email: 'berk.ozturk@getir.com' },
      rule: {
        _id: '634425eeb00208a86a82a3a0',
        isActive: true,
        category: '5f8d7f80fd5fe1ad8ae993b9',
        closeAs: null,
        closeMessage: null,
        defaultNote: 'tetsetstesttt',
        description: {
          tr: 'test999999',
          en: 'test999999',
        },
        priority: '5f75fdac324ec127e86b66a6',
        ruleNumber: 7898755,
        title: {
          tr: 'test',
          en: 'test',
        },
      },
      warehouse: '5db9759777a0c71180d7694c',
      createdAt: '2022-10-11T07:29:03.131Z',
      updatedAt: '2022-10-11T07:52:40.690Z',
      apology: {
        description: 'boyle bi sey olamaz',
        franchiseUser: '6214837989e85233ac6cf422',
        createdAt: '2022-10-11T07:31:52.832Z',
      },
      decision: {
        status: 1,
        point: 12,
        note: 'degisti simdi not',
        adminEmail: 'berk.ozturk@getir.com',
        createdAt: '2022-10-11T07:52:40.683Z',
      },
      warehouseName: 'Berk Wh',
    },
  ],
  totalCount: 50,
};

export const mockedReporterList = {
  employees: [
    {
      _id: '5ff40ddba6a6183fac50a8a4',
      departmentId: '5ac88c357d2f1bb0a8ae7049',
      jobFamilyId: '10343',
      jobFamilyName: 'Technology',
      fullName: 'Berk Ozturk',
      jobStatus: 100,
      jobTitle: 'a',
      workEmail: 'berk.ozturk@getir.com',
    },
  ],
};

export const mockedPersonList = [{
  _id: '60b623b72cf40b80e30acd9d',
  isActivated: true,
  name: 'Real Dev',
}];

export const mockedApologyDtsDetail = {
  dtsViolation: {
    _id: '63455498b00208a86a82a692',
    status: 100,
    isActive: true,
    description: 'eeesasdasdd',
    feedbackSource: {
      _id: '62c2bc98b6d8e05687640be7',
      isActive: true,
      title: {
        tr: 'angmar',
        en: 'angmar',
      },
      description: {
        tr: 'angmar',
        en: 'angmar',
      },
    },
    files: [],
    franchise: null,
    person: '625fe5e45ffc3190991fb2e1',
    realized: '2022-10-11T11:33:23.078Z',
    reporter: { email: 'berk.ozturk@getir.com' },
    rule: {
      _id: '629ddfe46da56b72e5673ee2',
      isActive: true,
      category: {
        _id: '5f8fd75050f6554f8b91025a',
        isActive: true,
        title: {
          tr: 'vallabudaçalışıyomus',
          en: 'vallabudaçalışıyomus',
        },
        description: {
          tr: 'vallabudaçalışıyomus',
          en: 'vallabudaçalışıyomus',
        },
      },
      priority: {
        _id: '5f8ed9f11d5eb308bf1f6a76',
        warningPoint: 11,
        rejectionPoint: 6,
        isActive: true,
        title: {
          tr: 'son',
          en: 'son',
        },
        description: {
          tr: 'son',
          en: 'son',
        },
      },
      description: {
        tr: 'asdadad',
        en: 'asdasdas',
      },
      ruleNumber: 34435543534543,
      title: {
        tr: 'sadasda',
        en: 'dadsada',
      },
      closeAs: 2,
      closeMessage: 'dasdasd',
      defaultNote: '',
    },
    warehouse: '5dfa4a2e17b571cea40dff89',
    createdAt: '2022-10-11T11:33:44.411Z',
    updatedAt: '2022-10-13T12:53:58.311Z',
    warehouseName: "Stock Kürşat'ın Deposu",
  },
};

export const mockedDecisionDtsDetail = {
  dtsViolation: {
    _id: '62d7eb5bc5f63c12499b25be',
    status: 200,
    isActive: true,
    description: 'Test check find in old panel - Azizol2',
    feedbackSource: {
      _id: '5f7c357a5c751d4f264a8870',
      isActive: true,
      title: {
        en: 'category 1112',
        tr: 'kategori 1112',
      },
      description: {
        en: 'desc 1112',
        tr: 'açıklama 1112',
      },
    },
    files: [],
    franchise: '5e0d8a1df0f1d572ab399aaa',
    person: '599bf3b76baae90b0632dfcb',
    realized: '2022-07-18T22:00:00.000Z',
    reporter: {
      email: 'muhammad.aminuddin@getir.com',
      user: { name: 'Muhammad Aminuddin' },
    },
    rule: {
      _id: '5bd0825022de3e232c6d2606',
      ruleNumber: 112,
      category: {
        _id: '5bc48e961f56680e17932098',
        isActive: true,
        description: {
          en: 'desc 1',
          tr: 'açıklama 1',
        },
        title: {
          en: 'category 1',
          tr: 'kategori 1',
        },
      },
      priority: {
        _id: '5bc5a821a4950b24d5a51c32',
        isActive: true,
        rejectionPoint: 13,
        warningPoint: 15,
        acceptancePoint: 17,
        description: {
          en: 'description 1112***',
          tr: 'description 1112****',
        },
        title: {
          en: 'title 1112**',
          tr: 'title 1112***',
        },
      },
      isActive: true,
      description: {
        tr: 'test 3333 detays',
        en: 'test 33 detay',
      },
      title: {
        tr: 'test 33331',
        en: 'test 33',
      },
      closeAs: null,
      closeMessage: null,
      defaultNote: 'this is default note ',
    },
    warehouse: '5db9759777a0c71180d7694c',
    createdAt: '2022-07-20T11:47:39.011Z',
    updatedAt: '2022-07-23T13:00:18.597Z',
    apology: null,
    warehouseName: 'ZincirlikuyuBüyük (DOKUNMA) ',
  },
};

export const mockedClosedDtsDetail = {
  dtsViolation: {
    _id: '62d7eb5bc5f63c12499b25be',
    status: 1000,
    isActive: true,
    description: 'Test check find in old panel - Azizol2',
    feedbackSource: {
      _id: '5f7c357a5c751d4f264a8870',
      isActive: true,
      title: {
        en: 'category 1112',
        tr: 'kategori 1112',
      },
      description: {
        en: 'desc 1112',
        tr: 'açıklama 1112',
      },
    },
    files: [],
    franchise: '5e0d8a1df0f1d572ab399aaa',
    person: '599bf3b76baae90b0632dfcb',
    realized: '2022-07-18T22:00:00.000Z',
    reporter: {
      email: 'muhammad.aminuddin@getir.com',
      user: { name: 'Muhammad Aminuddin' },
    },
    rule: {
      _id: '5bd0825022de3e232c6d2606',
      ruleNumber: 112,
      category: {
        _id: '5bc48e961f56680e17932098',
        isActive: true,
        description: {
          en: 'desc 1',
          tr: 'açıklama 1',
        },
        title: {
          en: 'category 1',
          tr: 'kategori 1',
        },
      },
      priority: {
        _id: '5bc5a821a4950b24d5a51c32',
        isActive: true,
        rejectionPoint: 13,
        warningPoint: 15,
        acceptancePoint: 17,
        description: {
          en: 'description 1112***',
          tr: 'description 1112****',
        },
        title: {
          en: 'title 1112**',
          tr: 'title 1112***',
        },
      },
      isActive: true,
      description: {
        tr: 'test 3333 detays',
        en: 'test 33 detay',
      },
      title: {
        tr: 'test 33331',
        en: 'test 33',
      },
      closeAs: null,
      closeMessage: null,
      defaultNote: 'this is default note ',
    },
    warehouse: '5db9759777a0c71180d7694c',
    createdAt: '2022-07-20T11:47:39.011Z',
    updatedAt: '2022-10-13T13:35:08.914Z',
    apology: null,
    decision: {
      status: 1,
      point: 17,
      note: 'this is default note ',
      adminEmail: 'berk.ozturk@getir.com',
      createdAt: '2022-10-13T13:35:08.911Z',
    },
    warehouseName: 'ZincirlikuyuBüyük (DOKUNMA) ',
  },
};

export const mockedBulkUploadResponse = [
  {
    status: 100,
    isActive: true,
    _id: '63a2e5db49501ead53641160',
    rule: '623987744c6b85d4794cb929',
    warehouse: '5dfa4a2e17b571cea40dff89',
    franchise: '5c701f3cdab669000191933d',
    realized: '2022-10-04T12:24:00.000Z',
    person: '60a7944e6e79490e75c5c52f',
    feedbackSource: '5fa3a28d9edd90cc93140d69',
    isImported: true,
    reporter: {
      id: '59b681e8398e711161ad5c0d',
      type: 1,
    },
    files: [],
    __v: 0,
    createdAt: '2022-12-21T10:54:19.983Z',
    updatedAt: '2022-12-21T10:54:19.983Z',
  },
];
