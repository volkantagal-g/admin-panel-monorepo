const StatusEnum = {
  INACTIVE: {
    tr: 'Aktif Değil',
    en: 'Inactive',
  },
  ACTIVE: {
    tr: 'Aktif',
    en: 'Active',
  },
};

const ResponsibleDomainTypesEnum = {
  TR: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMarket',
    },
    4: {
      tr: 'GetirSu',
      en: 'GetirWater',
    },
  },
  DE: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  GB: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  PT: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  ES: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  NL: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  XN: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XI: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XM: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XJ: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XC: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XF: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XW: {
    1: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    3: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
};

const ResponsibleDomainTypesValuesEnum = {
  TR: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMarket',
    },
    WATER: {
      tr: 'GetirSu',
      en: 'GetirWater',
    },
  },
  DE: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  GB: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  PT: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  ES: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  NL: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
  },
  XN: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XI: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XM: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XJ: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XC: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XF: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
  XW: {
    GETIR10: {
      tr: 'Getir10',
      en: 'Getir10',
    },
    MARKET: {
      tr: 'GetirBüyük',
      en: 'GetirMore',
    },
  },
};

const QuestionTypeEnum = {
  MULTIPLE_CHOICE: {
    tr: 'Çoklu Seçim',
    en: 'Multiple Choice',
  },
  NUMBER_INPUT: {
    tr: 'Sayı Girişi',
    en: 'Number Input',
  },
};

const NotApplicableOptionType = {
  tr: 'Denetlenemedi',
  en: 'Not Applicable',
  'en-US': 'Not Applicable',
  es: 'No aplica',
  pt: 'Não aplicável',
  de: 'Unzutreffend',
  nl: 'Niet toepasbaar',
  isHighlighted: false,
};

const QuestionTypes = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  NUMBER_INPUT: 'NUMBER_INPUT',
};

const DomainTypes = {
  GETIR10: {
    tr: 'Getir10',
    en: 'Getir10',
  },
  MARKET: {
    tr: 'GetirBüyük',
    en: 'GetirMarket',
  },
  WATER: {
    tr: 'GetirSu',
    en: 'GetirWater',
  },
  STORE_CONVERSION: {
    tr: 'Store Conversion',
    en: 'Store Conversion',
  },
  MAIN_WAREHOUSE: {
    tr: 'Ana Depo',
    en: 'Main Warehouse',
  },
};

const StoreAuditStatuses = {
  100: {
    tr: 'Tamamlandı',
    en: 'Completed',
  },
  200: {
    tr: 'Bayiye Gönderildi',
    en: 'Sent To Franchise',
  },
  300: {
    tr: 'İnaktif',
    en: 'Inactive',
  },
  400: {
    tr: 'Devam Ediyor',
    en: 'In Progress',
  },
};

const AuditStatusColorsMap = {
  100: 'green',
  200: 'orange',
  300: 'red',
  400: 'magenta',
};

export {
  StatusEnum,
  ResponsibleDomainTypesEnum,
  ResponsibleDomainTypesValuesEnum,
  QuestionTypeEnum,
  NotApplicableOptionType,
  QuestionTypes,
  DomainTypes,
  StoreAuditStatuses,
  AuditStatusColorsMap,
};
