import moment from 'moment';

import { POPUP_STATUS_TYPE, POPUP_TYPE } from '@app/pages/Popup/constants';
import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';
import store from '@shared/redux/store';
import { targetServiceType } from '@shared/shared/constantValues';

export const SAMPLE_POPUP_ID = '620e3ff36529da230c96dbeb';
export const SAMPLE_PROMO_CODE = 'ACTIVATE_PROMO_DISCOUNT_50';

export const samplePopupRequest = {
  activeDomains: [targetServiceType.GETIR, targetServiceType.GETIR_LOCAL],
  type: POPUP_TYPE.GENERIC,
  domainType: targetServiceType.GETIR_LOCAL,
  priority: 12,
  clientSegments: ['1234567'],
  maxShownCondition: 21,
  picURL: { tr: 'https://sample-cdn.url' },
  title: { tr: 'Popup Başlık (tr)' },
  description: { tr: 'Popup Açıklama (tr)' },
  positiveButton: {
    text: { tr: 'Pozitif Button (tr)' },
    action: { type: CLIENT_APP_ACTION_TYPE.NONE },
  },
  negativeButton: {
    text: { tr: 'test' },
    action: { type: CLIENT_APP_ACTION_TYPE.CLOSE },
  },
  phoneLanguages: ['tr'],
  validFrom: moment().toISOString(),
  validUntil: moment().add(1, 'days').toISOString(),
  status: POPUP_STATUS_TYPE.INACTIVE,
};

export const sampleGenericPopupRequest = {
  domainType: POPUP_TYPE.GENERIC,
  ...samplePopupRequest,
};

export const sampleGenericPopupResponse = { ...sampleGenericPopupRequest };

export const samplePopupListFilter = {
  page: 0,
  start: moment().toISOString(),
  end: moment().add(1, 'days').toISOString(),
};

export const samplePopupResults = [
  { id: SAMPLE_POPUP_ID, ...sampleGenericPopupResponse },
  { id: SAMPLE_POPUP_ID + 1, ...sampleGenericPopupResponse },
];

export const sampleGlobalRuleset = {
  hourly: 7,
  daily: 10,
  weekly: 10,
  monthly: 10,
};

const sampleSelectedCountry = {
  selectedCountry: {
    _id: '55999ad00000020000000000',
    name: {
      de: 'Vereinigtes Königreich',
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      nl: 'Verenigd Koninkrijk',
      tr: 'İngiltere',
      es: 'Reino Unido',
      it: 'Regno Unito',
      pt: 'Reino Unido',
    },
    center: {
      type: 'Point',
      coordinates: [
        -3.435973,
        55.378051,
      ],
      acc: -1,
      time: '2019-12-13T21:00:00.000Z',
    },
    code: {
      alpha2: 'GB',
      alpha3: 'GBR',
      numeric: 826,
    },
    currency: {
      code: {
        alpha: 'GBP',
        numeric: 826,
      },
      symbol: '£',
      isSymbolFirst: true,
    },
    dialingCode: 44,
    timezones: [
      { timezone: 'Europe/London' },
    ],
    flag: '🇬🇧',
    defaultLanguageCode: 'en',
    languageSortOrder: [
      'en',
      'tr',
    ],
    languages: {
      en: { name: 'English' },
      tr: { name: 'Türkçe' },
    },
  },
  selectedCountryDivision: null,
};

export function createPopupMockStore() {
  store.dispatch({ type: 'COUNTRY_SELECTION_SET_SELECTED_COUNTRY', ...sampleSelectedCountry });
  return store;
}
