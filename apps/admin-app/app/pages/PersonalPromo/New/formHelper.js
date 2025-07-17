import * as Yup from 'yup';
import moment from 'moment';

import {
  ALL_DOMAIN_TYPES,
  PROMO_APPLY_TYPES,
  PROMO_DISCOUNT_CODE_URLS,
  PROMO_MECHANICS,
  PROMO_PAYMENT_METHODS,
  PROMO_TARGET,
  PromoUsageType,
} from '@app/pages/Promo/constantValues';

import {
  getSelectedCountry,
  getSelectedCountryCurrencySymbol,
  getSelectedCountryLanguages,
  getSelectedCountryTimeZones,
} from '@shared/redux/selectors/countrySelection';
import { PromoStatus, PromoType } from '@app/pages/Promo/types';

const selectedCountry = getSelectedCountry();

const selectedCountryPrimaryTimeZone =
  getSelectedCountryTimeZones()[0]?.timezone;

const selectedLanguages = getSelectedCountryLanguages();

const selectedSymbol = getSelectedCountryCurrencySymbol();

export const countryLanguages = selectedLanguages.map(key => {
  const newKey = key === 'en-US' ? 'enUS' : key;
  return newKey;
});

export const mapLanguagesToStrings = (languages, str = '') => {
  return languages.reduce((acc, langKey) => {
    acc[langKey] = str;
    return acc;
  }, {});
};

export const getPicURLs = languages => languages.reduce((acc, langKey) => {
  acc[langKey] = PROMO_DISCOUNT_CODE_URLS[langKey];
  return acc;
}, {});

export const getPushText = (language, amount) => {
  const pushText = {
    tr: `Sana özel ${selectedSymbol}${amount} indirim!`,
    en: `${selectedSymbol}${amount} discount for you!`,
    fr: `${selectedSymbol}${amount} réduction pour vous!`,
    de: `${selectedSymbol}${amount} Rabatt für dich!`,
    nl: `${selectedSymbol}${amount} korting voor jou!`,
    it: `${amount}${selectedSymbol} di sconto per te!`,
    es: `${amount}${selectedSymbol} de descuento para ti!`,
    pt: `${amount}${selectedSymbol} de desconto para ti!`,
    enUS: `${selectedSymbol}${amount} discount for you!`,
  };
  return pushText[language];
};

export const validationSchema = () => {
  return Yup.object().shape({
    discountAmount: Yup.number().required().min(0),
    client: Yup.string().required(),
    expire: Yup.number().required().min(1),
    useLimit: Yup.number().required().min(0),
  });
};

export const getModifiedValuesBeforeSubmit = values => {
  // expire is only required to calculate endTime, we filter it out
  const { expire, ...remainingValues } = values;

  const startTime = moment
    .tz(selectedCountryPrimaryTimeZone)
    .startOf('day')
    .valueOf();
  const endTime = moment
    .tz(selectedCountryPrimaryTimeZone)
    .endOf('day')
    .add(expire, 'day')
    .valueOf();

  const newValues = {
    ...remainingValues,
    description: values.title,
    promoUsageType: PromoUsageType.PERSONAL,
    promoTarget: PROMO_TARGET.GETIR_MARKET,
    deliveryFee: {
      amount: values.deliveryFee,
      doNotCharge: values.doNotChargeDeliveryFee,
    },
    validFrom: startTime,
    validUntil: endTime,
    validRanges: [
      {
        start: startTime,
        end: endTime,
      },
    ],
    domainTypes: ALL_DOMAIN_TYPES,
  };
  return newValues;
};

export const getInitialValues = () => {
  return {
    // fixed values
    promoUsageType: PromoUsageType.PERSONAL,
    clientSegments: [0],
    region: [1000, 1300, 1600, 1900, 4000],
    status: PromoStatus.Active,
    useLimit: 1,
    useLimitPerDay: 0,
    paymentMethods: Object.values(PROMO_PAYMENT_METHODS),
    polygons: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [29, 41],
            [29, 40],
            [30, 40],
            [30, 41],
            [29, 41],
          ],
        ],
      ],
    },
    expire: 180,
    // default values
    client: null,
    title: mapLanguagesToStrings(countryLanguages),
    description: mapLanguagesToStrings(countryLanguages),
    thumbnailURL: mapLanguagesToStrings(
      countryLanguages,
      'http://cdn.getir.com/misc/getir_icon.jpg',
    ),
    picURL: getPicURLs(countryLanguages),
    promoType: PromoType.Amount,
    discountAmount: 10,
    applyType: PROMO_APPLY_TYPES.NORMAL,
    priority: 10000000,
    isBalanceEnabled: false,
    doNotChargeDeliveryFee: false,
    deliveryFee: null,
    doNotApplyMinimumBasketSize: false,
    promoMechanic: PROMO_MECHANICS.PAY_X_TL_TAKE_Y_TL,
    sendPush: null,
    pushData: countryLanguages.map(language => ({
      lang: language,
      body: getPushText(language, 10),
    })),
    isAlreadySold: false,
  };
};

export const validateValuesBeforeSubmit = (values, t) => {
  const { client } = values;
  if (!client) {
    throw new Error(t('ERRORS.CLIENT_EMPTY'));
  }
};

export const getConfigUrls = config => {
  return config?.customValue?.[selectedCountry?.code?.alpha2];
};
