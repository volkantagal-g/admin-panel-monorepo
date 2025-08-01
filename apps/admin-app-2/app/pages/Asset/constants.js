import { convertConstantValuesToSelectOptions, convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

export const ASSET_CATEGORIES = {
  IT: 1,
  OTHER: 100,
};
export const ASSET_TYPES_BY_CATEGORY = {
  [ASSET_CATEGORIES.IT]: {
    LAPTOP: 1,
    CELL_PHONE: 2,
    TABLET: 7,
    MONITOR: 8,
    KEYBOARD: 9,
    MOUSE: 10,
    CONVERTER: 11,
    LICENSE: 12,
    HANDHELD_TERMINAL: 13,
    PERIPHERALS: 14,
  },
  [ASSET_CATEGORIES.OTHER]: {
    COMPANY_SIM_CARD: 3,
    CAR: 4,
    FOOD_CARD: 5,
    CREDIT_CARD: 6,
    CHAIR: 15,
    DRONE: 16,
    LABELING_MACHINE: 17,
    LASER_METER: 18,
    BARCODE_PRINTER: 19,
    LED_PRESENTATION_LAMP: 20,
    DVR_DEVICE: 21,
    LAPTOP_BAG: 22,
    OTHER: 99,
  },
};

export const ASSET_TYPES = {
  ...ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.IT],
  // ...ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.OTHER],
};

export const BRANDS_BY_ASSET_TYPES = {
  [ASSET_TYPES.LAPTOP]: {
    Apple: 'Apple',
    Lenovo: 'Lenovo',
    Asus: 'Asus',
    HP: 'HP',
    Huawei: 'Huawei',
    Dell: 'Dell',
    'OEM Computer': 'OEM Computer',
    Other: 'Other',
  },
  [ASSET_TYPES.CELL_PHONE]: {
    Apple: 'Apple',
    Samsung: 'Samsung',
    Xiaomi: 'Xiaomi',
    Huawei: 'Huawei',
    Oppo: 'Oppo',
    'General Mobile': 'General Mobile',
    LG: 'LG',
    OnePlus: 'OnePlus',
    Lenovo: 'Lenovo',
    Realme: 'Realme',
    Other: 'Other',
  },
  [ASSET_TYPES.TABLET]: {
    Apple: 'Apple',
    Lenovo: 'Lenovo',
    Samsung: 'Samsung',
    Wacom: 'Wacom',
    Other: 'Other',
  },
  [ASSET_TYPES.MONITOR]: {
    Lenovo: 'Lenovo',
    HP: 'HP',
    Dell: 'Dell',
    LG: 'LG',
    Acer: 'Acer',
    Philips: 'Philips',
    MSI: 'MSI',
    Samsung: 'Samsung',
    Other: 'Other',
  },
  [ASSET_TYPES.KEYBOARD]: {
    Apple: 'Apple',
    Logitech: 'Logitech',
    HP: 'HP',
    Microsoft: 'Microsoft',
    Other: 'Other',
  },
  [ASSET_TYPES.MOUSE]: {
    Apple: 'Apple',
    Logitech: 'Logitech',
    HP: 'HP',
    Lenovo: 'Lenovo',
    Microsoft: 'Microsoft',
    Trust: 'Trust',
    Kensington: 'Kensington',
    Other: 'Other',
  },
  [ASSET_TYPES.CONVERTER]: {
    Baseus: 'Baseus',
    Ugreen: 'Ugreen',
    Anker: 'Anker',
    Dark: 'Dark',
    Apple: 'Apple',
    Hama: 'Hama',
    Sandberg: 'Sandberg',
    Conceptronic: 'Conceptronic',
    Other: 'Other',
  },
  [ASSET_TYPES.LICENSE]: {
    Adobe: 'Adobe',
    AtlassianAccess: 'AtlassianAccess',
    DocuSign: 'DocuSign',
    'Google Analytics': 'Google Analytics',
    'Google Ads': 'Google Ads',
    'Google Email': 'Google Email',
    Jetbrains: 'Jetbrains',
    Miro: 'Miro',
    Segment: 'Segment',
    'Slack - Getir': 'Slack - Getir',
    'Slack - GetirDev': 'Slack - GetirDev',
    Zoom: 'Zoom',
    'Apple App Store': 'Apple App Store',
    AppsFlyer: 'AppsFlyer',
    'Ariba Buying': 'Ariba Buying',
    Asana: 'Asana',
    'Atlas Mongo': 'Atlas Mongo',
    AWS: 'AWS',
    'AWS - Getirdev': 'AWS - Getirdev',
    Balsamiq: 'Balsamiq',
    Bitrise: 'Bitrise',
    Branch: 'Branch',
    Caboodle: 'Caboodle',
    CharlesProxyCloudamqp: 'CharlesProxyCloudamqp',
    Concur: 'Concur',
    Convercent: 'Convercent',
    Fauth: 'Fauth',
    FB: 'FB',
    Feedback4e: 'Feedback4e',
    Figma: 'Figma',
    Firebase: 'Firebase',
    Fountain: 'Fountain',
    FranchisePanel: 'FranchisePanel',
    GlobalPanel: 'GlobalPanel',
    'Google Data Studio': 'Google Data Studio',
    GooglePlayStore: 'GooglePlayStore',
    Greenhouse: 'Greenhouse',
    Heroku: 'Heroku',
    Kustomer: 'Kustomer',
    Leanplum: 'Leanplum',
    LocalsPanel: 'LocalsPanel',
    Logo: 'Logo',
    Lokalise: 'Lokalise',
    MDUAccess: 'MDUAccess',
    MixPanel: 'MixPanel',
    NetGSM: 'NetGSM',
    'New Relic': 'New Relic',
    OnePassword: 'OnePassword',
    Papertrail: 'Papertrail',
    Plivo: 'Plivo',
    Redshift: 'Redshift',
    RestaurantPanel: 'RestaurantPanel',
    Salesforce: 'Salesforce',
    'Salesforce-Dev': 'Salesforce-Dev',
    'Salesforce - QA': 'Salesforce - QA',
    SAP: 'SAP',
    SensorTower: 'SensorTower',
    Sentry: 'Sentry',
    Slido: 'Slido',
    'Sonar Cloud': 'Sonar Cloud',
    'Studio 3T': 'Studio 3T',
    terminalAccessTestRail: 'terminalAccessTestRail',
    TravelPerk: 'TravelPerk',
    AdminPanel: 'AdminPanel',
    Breezy: 'Breezy',
    Workable: 'Workable',
  },
  [ASSET_TYPES.HANDHELD_TERMINAL]: {
    Sunmi: 'Sunmi',
    Newland: 'Newland',
    Other: 'Other',
  },
  [ASSET_TYPES.PERIPHERALS]: {
    'Portable HDD': 'Portable HDD',
    'Apple TV': 'Apple TV',
    'Smart Watch': 'Smart Watch',
    UPS: 'UPS',
    'Apple Pencil': 'Apple Pencil',
    'Barcode Reader': 'Barcode Reader',
    Anker: 'Anker',
    Headphone: 'Headphone',
    Superbox: 'Superbox',
    Webcam: 'Webcam',
    'Portable SSD': 'Portable SSD',
    'Docking Station': 'Docking Station',
    Printer: 'Printer',
    'Power Adapter': 'Power Adapter',
    'Wifi Adapter': 'Wifi Adapter',
    Jabra: 'Jabra',
    Speaker: 'Speaker',
    Hama: 'Hama', // converter
    Other: 'Other',
  },
};

export const ASSET_STATUSES = {
  AVAILABLE: 100,
  ASSIGNED: 200,
  IN_MAINTENANCE: 300,
  NOT_AVAILABLE: 400,
};

export const ASSET_ASSIGNMENT_STATUSES = {
  UNASSIGNABLE: 200,
  ASSIGNABLE: 300,
};

export const ASSET_DEVICE_STATUSES = {
  SOLD: 100,
  JUNK: 200,
  OBSOLETE: 300,
  LIQUID_DAMAGE: 400,
  BROKEN: 500,
  IN_GOOD_SHAPE: 600,
  STOLEN: 700,
  IN_OFFICE_USE: 800,
  IN_MAINTENANCE: 900,
  NOT_IN_USE: 1000,
};

export const ASSET_DEVICE_STATUS_AND_ASSIGNMENT_STATUS_RELATIONSHIP = {
  [ASSET_DEVICE_STATUSES.SOLD]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.JUNK]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.OBSOLETE]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.LIQUID_DAMAGE]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.BROKEN]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.STOLEN]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.IN_GOOD_SHAPE]: ASSET_ASSIGNMENT_STATUSES.ASSIGNABLE,
  [ASSET_DEVICE_STATUSES.IN_OFFICE_USE]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.IN_MAINTENANCE]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
  [ASSET_DEVICE_STATUSES.NOT_IN_USE]: ASSET_ASSIGNMENT_STATUSES.UNASSIGNABLE,
};

export const ASSET_COUNTRIES = {
  Turkey: 'tr',
  'United Kingdom': 'gb',
  Spain: 'es',
  Germany: 'de',
  France: 'fr',
  Italy: 'it',
  Netherlands: 'nl',
  'United States': 'us',
  Portugal: 'pt',
  India: 'in',
};

export const ASSET_CITIES = {
  tr: {
    Istanbul: 'Istanbul',
    Ankara: 'Ankara',
    Izmir: 'Izmir',
  },
  gb: { London: 'London' },
  nl: { Amsterdam: 'Amsterdam' },
  us: {
    'New York': 'New York',
    Chicago: 'Chicago',
  },
  de: {
    Berlin: 'Berlin',
    Dusseldorf: 'Dusseldorf',
  },
  es: {
    Barcelona: 'Barcelona',
    Madrid: 'Madrid',
    Malaga: 'Malaga',
    Seville: 'Seville',
    Valencia: 'Valencia',
    Zaragoza: 'Zaragoza',
  },
  it: {
    Milan: 'Milan',
    Rome: 'Rome',
    Turin: 'Turin',
  },
  fr: { Paris: 'Paris' },
  pt: { Lisbon: 'Lisbon' },
  in: { Bangalore: 'Bangalore' },
};

export const ASSET_RAM_OPTIONS = [
  { label: '4 GB', value: 4 },
  { label: '8 GB', value: 8 },
  { label: '16 GB', value: 16 },
  { label: '18 GB', value: 18 },
  { label: '24 GB', value: 24 },
  { label: '32 GB', value: 32 },
  { label: '36 GB', value: 36 },
  { label: '48 GB', value: 48 },
  { label: '64 GB', value: 64 },
  { label: 'UNKNOWN', value: 0 },
];

export const ASSET_CHIP_TYPE_OPTIONS = [
  { label: 'Intel i3', value: 'Intel i3' },
  { label: 'Intel i5', value: 'Intel i5' },
  { label: 'Intel i7', value: 'Intel i7' },
  { label: 'Intel i9', value: 'Intel i9' },
  { label: 'M1', value: 'M1' },
  { label: 'M1 Pro', value: 'M1 Pro' },
  { label: 'M1 Max', value: 'M1 Max' },
  { label: 'M1 Ultra', value: 'M1 Ultra' },
  { label: 'M2', value: 'M2' },
  { label: 'M2 Pro', value: 'M2 Pro' },
  { label: 'M2 Max', value: 'M2 Max' },
  { label: 'M3', value: 'M3' },
  { label: 'M3 Pro', value: 'M3 Pro' },
  { label: 'M3 Max', value: 'M3 Max' },
  { label: 'M4', value: 'M4' },
  { label: 'M4 Pro', value: 'M4 Pro' },
  { label: 'M4 Max', value: 'M4 Max' },
  { label: 'UNKNOWN', value: 'UNKNOWN' },
];

export const ASSET_DISPLAY_SIZE_OPTIONS = [
  { label: '9-inch', value: 9 },
  { label: '12-inch', value: 12 },
  { label: '13-inch', value: 13 },
  { label: '14-inch', value: 14 },
  { label: '15-inch', value: 15 },
  { label: '16-inch', value: 16 },
  { label: '17-inch', value: 17 },
  { label: '19-inch', value: 19 },
  { label: '22-inch', value: 22 },
  { label: '24-inch', value: 24 },
  { label: '26-inch', value: 26 },
  { label: '27-inch', value: 27 },
  { label: '29-inch', value: 29 },
  { label: '36-inch', value: 36 },
  { label: 'UNKNOWN', value: 0 },
];

export const ASSET_RESOLUTION_OPTIONS = [
  { label: '1280 x 720', value: '1280 x 720' },
  { label: '1600 x 900', value: '1600 x 900' },
  { label: '1920 x 1080', value: '1920 x 1080' },
  { label: '2048 x 1152', value: '2048 x 1152' },
  { label: '2560 x 1440', value: '2560 x 1440' },
  { label: '3840 x 2160', value: '3840 x 2160' },
];

export const ASSET_OPERATION_SYSTEM_OPTIONS = {
  [ASSET_TYPES.LAPTOP]: [
    { label: 'MacOS', value: 'MacOS' },
    { label: 'Windows', value: 'Windows' },
    { label: 'Linux', value: 'Linux' },
    { label: 'Other', value: 'Other' },
  ],
  [ASSET_TYPES.CELL_PHONE]: [
    { label: 'iOS', value: 'iOS' },
    { label: 'Android', value: 'Android' },
    { label: 'HarmonyOS', value: 'HarmonyOS' },
    { label: 'Other', value: 'Other' },
  ],
  [ASSET_TYPES.TABLET]: [
    { label: 'ipadOS', value: 'ipadOS' },
    { label: 'Android', value: 'Android' },
    { label: 'Other', value: 'Other' },
  ],
};

export const ASSET_DEVICE_CONFIG_FIELDS = [
  'deviceModel',
  'storage',
  'year',
  'displaySize',
  'imei1',
  'imei2',
  'refreshRate',
  'chipType',
  'ram',
  'resolution',
];

export const ASSET_RENTALS = {
  Rental: 'Rental',
  Bought: 'Bought',
};

export const ASSET_STATUS_OPTIONS = convertConstantValueTranslationsToSelectOptions({
  constants: ASSET_STATUSES,
  translationBaseKey: 'assetPage:ASSET_STATUSES',
});

export const ASSET_DEVICE_STATUS_OPTIONS =
 pageTranslator => convertConstantValueTranslationsToSelectOptions({
   constants: ASSET_DEVICE_STATUSES,
   translationBaseKey: 'assetPage:ASSET_DEVICE_STATUSES',
   pageTranslator,
 });

export const ASSET_ASSIGNMENT_STATUS_OPTIONS =
pageTranslator => convertConstantValueTranslationsToSelectOptions({
  constants: ASSET_ASSIGNMENT_STATUSES,
  translationBaseKey: 'assetPage:ASSET_ASSIGNMENT_STATUSES',
  pageTranslator,
});

export const ALL_ASSET_TYPE_OPTIONS = pageTranslator => convertConstantValueTranslationsToSelectOptions({
  constants: ASSET_TYPES,
  translationBaseKey: 'assetPage:ASSET_TYPES',
  pageTranslator,
});

export const ASSET_CATEGORY_OPTIONS =
  pageTranslator => convertConstantValueTranslationsToSelectOptions({
    constants: ASSET_CATEGORIES,
    translationBaseKey: 'assetPage:ASSET_CATEGORIES',
    pageTranslator,
  });

export const IT_ASSET_TYPE_OPTIONS =
  pageTranslator => convertConstantValueTranslationsToSelectOptions({
    constants: ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.IT],
    translationBaseKey: 'assetPage:ASSET_TYPES',
    pageTranslator,
  });

export const OtherAssetTypeOptions =
  pageTranslator => convertConstantValueTranslationsToSelectOptions({
    constants: ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.OTHER],
    translationBaseKey: 'assetPage:ASSET_TYPES',
    pageTranslator,
  });

export const ASSET_TYPE_OPTIONS = {
  [ASSET_CATEGORIES.IT]: IT_ASSET_TYPE_OPTIONS,
  [ASSET_CATEGORIES.OTHER]: OtherAssetTypeOptions,
};

export const ASSET_COUNTRY_OPTIONS =
  pageTranslator => convertConstantValueTranslationsToSelectOptions({
    constants: ASSET_COUNTRIES,
    translationBaseKey: 'assetPage:ASSET_COUNTRIES',
    pageTranslator,
  });

export const ASSET_RENTAL_OPTIONS =
  pageTranslator => convertConstantValueTranslationsToSelectOptions({
    constants: ASSET_RENTALS,
    translationBaseKey: 'assetPage:ASSET_RENTALS',
    pageTranslator,
  });

export const ASSET_VERSIONS = {
  v1: 'v1',
  v2: 'v2',
};

export const DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES = {
  storage: new Set([ASSET_TYPES.LAPTOP, ASSET_TYPES.TABLET, ASSET_TYPES.CELL_PHONE]),
  displaySize: new Set([ASSET_TYPES.LAPTOP, ASSET_TYPES.TABLET, ASSET_TYPES.MONITOR]),
  imei1: new Set([ASSET_TYPES.TABLET, ASSET_TYPES.CELL_PHONE]),
  imei2: new Set([ASSET_TYPES.TABLET, ASSET_TYPES.CELL_PHONE]),
  refreshRate: new Set([ASSET_TYPES.MONITOR]),
  chipType: new Set([ASSET_TYPES.LAPTOP]),
  ram: new Set([ASSET_TYPES.LAPTOP]),
  year: new Set([ASSET_TYPES.LAPTOP]),
  resolution: new Set([ASSET_TYPES.MONITOR]),
  macAddresses: new Set([ASSET_TYPES.LAPTOP]),
};

export const ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS = {
  1: '₺',
  2: '€',
  3: '$',
  4: '£',
  5: '₹',
};

export const ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS_OPTIONS = convertConstantValuesToSelectOptions(ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS);

export const ASSET_REPAIR_HISTORY_ENABLED_DEVICES = new Set([ASSET_TYPES.LAPTOP, ASSET_TYPES.CELL_PHONE, ASSET_TYPES.MONITOR,
  ASSET_TYPES.CONVERTER, ASSET_TYPES.PERIPHERALS, ASSET_TYPES.TABLET, ASSET_TYPES.HANDHELD_TERMINAL]);

export const BULK_UPLOAD_IT_ASSETS_WARNING_MESSAGE_DOC_LINK = 'https://docs.google.com/spreadsheets/d/1qiD1h5666Rcx3GFJIi5l9b2gj8I-7hRp/edit?usp=sharing&ouid=107891477469412931705&rtpof=true&sd=true';

export const SELECT_ALL_OPTION_VALUE = 'all';

export const MAC_ADDRESS_REGEX = /^[0-9a-f]{1,2}([.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/gmi;
