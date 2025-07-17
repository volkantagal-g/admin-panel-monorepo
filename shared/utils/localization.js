import { isNumber as _isNumber } from 'lodash';
import trTR from 'antd/es/locale/tr_TR';
import enUS from 'antd/es/locale/en_US';

import { LOCAL_DATE_FORMAT, LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';
import { getSelectedCountryCurrencyAlpha } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';

// Get locale for ant design components according to user locale
export const getAntLocale = (userLocale = getLangKey()) => {
  if (userLocale === 'en') {
    return enUS;
  }

  return trTR;
};

export const getLocalDateFormat = (userLocale = getLangKey()) => {
  if (userLocale === 'en') {
    return LOCAL_DATE_FORMAT.EN;
  }

  return LOCAL_DATE_FORMAT.TR;
};

export const getLocalDateTimeFormat = (userLocale = getLangKey()) => {
  if (userLocale === 'en') {
    return LOCAL_DATE_TIME_FORMAT.EN;
  }

  return LOCAL_DATE_TIME_FORMAT.TR;
};

export const numberFormat = ({ maxDecimal = 2, minDecimal = 0 } = { maxDecimal: 2, minDecimal: 0 }) => {
  let maxDecimalAdjusted = maxDecimal;
  if (maxDecimalAdjusted < minDecimal) {
    maxDecimalAdjusted = minDecimal;
  }
  return new Intl.NumberFormat(getLangKey(), { maximumFractionDigits: maxDecimalAdjusted, minimumFractionDigits: minDecimal });
};
export const numberFormatWithoutDecimal = numberFormat({ maxDecimal: 0 });
export const numberFormatWithOneDecimal = numberFormat({ maxDecimal: 1 });
export const numberFormatWithTwoDecimal = numberFormat({ maxDecimal: 2 });

export const percentFormat = ({ maxDecimal = 2, minDecimal } = { maxDecimal: 2 }) => {
  return new Intl.NumberFormat(getLangKey(), {
    style: 'percent',
    maximumFractionDigits: maxDecimal,
    ...(_isNumber(minDecimal) && { minimumFractionDigits: minDecimal }),
  });
};
export const percentFormatWithoutDecimal = percentFormat({ maxDecimal: 0 });
export const percentFormatWithOneDecimal = percentFormat({ maxDecimal: 1, minDecimal: 1 });
export const percentFormatWithTwoDecimal = percentFormat({ maxDecimal: 2, minDecimal: 2 });

export const currencyFormat = (
  { maxDecimal = 2, minDecimal = 2, userLocale = getLangKey(), currency = getSelectedCountryCurrencyAlpha() }
  = { maxDecimal: 2, minDecimal: 2, userLocale: getLangKey(), currency: getSelectedCountryCurrencyAlpha() },
) => {
  let maxDecimalAdjusted = maxDecimal;
  if (maxDecimalAdjusted < minDecimal) {
    maxDecimalAdjusted = minDecimal;
  }
  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency,
    maximumFractionDigits: maxDecimalAdjusted,
    minimumFractionDigits: minDecimal,
  });
};

export const numberFormatterWithSuffix = (num, maxDecimal = 0) => {
  if (num >= 999 && num < 999999) {
    return `${(numberFormat({ maxDecimal }).format(num / 1000))}${t('global:THOUSAND_SHORT')}`;
  }
  if (num >= 999999) {
    return `${(numberFormat({ maxDecimal }).format(num / 1000000))}${t('global:MILLION_SHORT')}`;
  }
  return numberFormat({ maxDecimal }).format(num);
};
