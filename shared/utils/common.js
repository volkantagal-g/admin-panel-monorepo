import {
  isString,
  toString,
  isEmpty,
  get,
  set,
  escapeRegExp,
  isNumber,
  setWith,
  uniq,
  has,
  isPlainObject,
  cloneDeep,
  isNil,
  forEach,
  mapValues,
  isFunction as _isFunction,
} from 'lodash';
import copy from 'copy-to-clipboard';
import { v4 as uuidv4 } from 'uuid';
import { diff } from 'deep-diff';
import { message } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Buffer } from 'buffer';
import { jsonToCSV } from 'react-papaparse';
import { jwtDecode } from 'jwt-decode';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { t, getLangKey } from '@shared/i18n';
import { ENVIRONMENT } from '@shared/config';
import { REGEX } from '@shared/shared/regex';
import commonConstants from '@shared/utils/commonConstants';
import {
  ALLOWED_KEYBOARD_CODES_FOR_PRICE_INPUT,
  DAY_OF_WEEKS,
  MINUTES_IN_A_HOUR,
} from '@shared/shared/constants';

const { MARKET_ORDER_STATUS_MILESTONES } = commonConstants;

export const isObjectIdValid = id => {
  if (!isString(id)) return false;
  return !!id.match(/^[0-9a-fA-F]{24}$/);
};

/**
 * @deprecated assigning empty object as default causes re-renders and dependency changes
 * if you want to check for null or undefiend, do this:
 * ```js
 *   state => state?.[reducerKey]?.[key]
 * ```
 * You shouldn't assign object or array as default value in selectors.
 *
 * Assign default value where you need to use the result. Example:
 * ```js
 *   (rowsData || []).map(rowData => <Row data={rowData}/>)
 * ```
 * @see https://getirdev.atlassian.net/wiki/spaces/PK/pages/1710262561/How+to+write+redux+reselect+selectors+with+performance+in+mind
 *
 */
export const getStateObject = (state, reducerKey, objectKey, { initialValue = {} } = {}) => {
  return get(state, `[${reducerKey}].${objectKey}`, initialValue);
};

export const searchItemFields = (item, searchString, searchFields) => {
  if (!item || !searchString || searchString.trim() === '') {
    return true;
  }

  const searchTexts = searchString.split(' ');

  let hasOneOfSearchStrings = false;

  searchTexts.every(searchText => {
    const filterRegx = new RegExp(escapeRegExp(searchText), 'i');
    if (!searchFields) {
      const itemJSON = JSON.stringify(item);
      hasOneOfSearchStrings = filterRegx.test(itemJSON);
      return hasOneOfSearchStrings;
    }
    let hasOneOfSearchFields = false;
    searchFields.some(searchField => {
      let propertyName = '';
      const propertyParts = searchField.split('.');
      const leftBracket = "['";
      const rightBracket = "']";
      propertyParts.forEach(propertyPart => {
        propertyName = propertyName.concat(leftBracket, propertyPart, rightBracket);
      });
      const propertyValue = get(item, propertyName);
      hasOneOfSearchFields = filterRegx.test(propertyValue);
      return hasOneOfSearchFields;
    });
    hasOneOfSearchStrings = hasOneOfSearchFields;
    return hasOneOfSearchFields;
  });

  return hasOneOfSearchStrings;
};

export const getLimitAndOffset = (pagination = {}) => {
  const { currentPage = 1, rowsPerPage = 10 } = pagination;
  return {
    limit: rowsPerPage,
    offset: (currentPage - 1) * rowsPerPage,
  };
};

export const convertLimitOffsetToRowsPerPageAndCurrentPage = ({ limit, offset }) => {
  return {
    rowsPerPage: limit,
    currentPage: offset === 0 ? 1 : Math.floor(offset / limit) + 1,
  };
};

export const currency = () => {
  const currencySymbol = get(getSelectedCountry(), 'currency.symbol', '');
  return currencySymbol;
};

/**
 * Converts given number to money
 *
 * ex: formatNumber(4656.8099999999995) -> "4.656,80"
 * ex: formatNumber(23123.123) ->  "23.123,12"
 * ex: formatNumber(23123.123456, 3) ->  "23.123,123"
 * ex: formatNumber(50.00) -> "50"
 * ex: formatNumber(50000) -> "50.000"
 * @param {number} number
 * @param {number} The number of digits to appear after the decimal point
 * @param {string} returnType
 *
 * @returns {string}
 *
 * @deprecated this is not correct, don't use this. You should use INTL formatters from utils/localization
 */
export const formatNumber = (_number, numberOfDigitsAfterDecimalPoint = 2) => {
  if (_number !== 0 && !_number && !isNumber(_number)) return '';
  const newNumber = (Math.floor(_number * 100) / 100).toFixed(numberOfDigitsAfterDecimalPoint);
  const [integerPart, fractionalPart] = newNumber.split('.');
  const newIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (fractionalPart === '00') {
    return newIntegerPart;
  }
  return [newIntegerPart, fractionalPart].join('.');
};

/**
 * @param {Array} list
 * @param {{ field: string }} [options = { field: "_id" }]
 * @returns {object} object of given data
 */
export const createMap = (list = [], options = { field: '_id' }) => {
  const map = {};
  list.forEach(item => {
    const mapKey = get(item, options.field, '');
    set(map, [mapKey], item);
  });
  return map;
};

export const getDiffObj = (oldObj, newObj) => {
  const differences = diff(oldObj, newObj) || [];
  const diffPaths = [];
  let tempPath = [];
  let uniqPaths = [];
  const oldValues = {};
  const newValues = {};
  const unsetValues = {};
  const diffObj = {};

  differences.forEach(difference => {
    tempPath = [];
    if (Array.isArray(difference.path)) {
      for (let i = 0; i < difference.path.length; i += 1) {
        const path = difference.path[i];
        tempPath.push(path);
        if (Array.isArray(get(oldObj, tempPath)) || Array.isArray(get(newObj, tempPath))) {
          break;
        }
      }
    }
    diffPaths.push(tempPath);
  });
  uniqPaths = uniq(diffPaths, item => {
    return JSON.stringify(item);
  });

  uniqPaths.forEach(path => {
    const tempOldValue = get(oldObj, path);
    const tempNewValue = get(newObj, path);

    if (tempNewValue !== undefined) {
      setWith(oldValues, path.join('.'), tempOldValue, Object);
      setWith(newValues, path.join('.'), tempNewValue, Object);
    }
    else {
      setWith(unsetValues, path.join('.'), tempOldValue || '');
    }
  });
  setWith(diffObj, 'oldValues', oldValues, Object);
  setWith(diffObj, 'newValues', newValues, Object);
  setWith(diffObj, 'unsetValues', unsetValues, Object);
  return diffObj;
};

export const isNullOrEmpty = param => {
  let variable = param;
  if (typeof variable === 'string') {
    variable = variable.trim();
  }
  return !(typeof variable !== 'undefined' && variable !== null && variable !== '');
};

export const isNullOrUndefined = value => typeof value === 'undefined' || value === null;

export const pushByPath = (obj, path, item) => {
  if (has(obj, path)) {
    const arr = get(obj, path);
    arr.push(item);
  }
  else {
    set(obj, path, [item]);
  }
};

export const getErrorCode = error => {
  const path = 'response.data.code';
  return get(error, path);
};

export const getErrorMessage = error => {
  const commonErrorMessagePaths = [
    'response.data.details.0.message',
    `response.data.message.${getLangKey()}`,
    `response.data.${getLangKey()}`,
    'response.data.message',
  ];
  const errorPath = commonErrorMessagePaths.find(path => get(error, path));
  return get(error, errorPath);
};

export const getRegexForCaseSensitiveLetters = text => {
  if (!isString(text)) return '';
  const regexStr = text.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1').replace(/[ıiIİ]/g, '[\u0130|\u0069|\u0131|\u0049]');
  return new RegExp(regexStr, 'i');
};

/**
 * if this function returns true, the option will be included in the filtered options;Otherwise, it will be excluded
 *
 * NOTE: The reason for not using toLocaleLowerCase(langKey):
 * When selectedLang is en, the user search turkish word on select box, it will not filter the "İzmir" label, with "izmir" input.
 *
 * @param {String} _inputValue
 * @param {Object} option
 * @param {Boolean} isIdSearchable
 * @param {String} searchTerm
 * @param {String} key
 * @returns {Boolean}
 */
export const getSelectFilterOption = (_inputValue = '', option = {}, isIdSearchable = false, searchTerm = 'label', key = 'value') => {
  const keyValue = toString(get(option, key)) || '';
  const label = toString(get(option, searchTerm)) || toString(option.children) || '';
  const inputValue = toString(_inputValue);
  const inputValueRegex = getRegexForCaseSensitiveLetters(inputValue);
  const matchedWords = label.match(inputValueRegex);
  let isMatched = !!get(matchedWords, 'length');
  // TODO: There is a problem with below logic
  if (isIdSearchable && isObjectIdValid(keyValue) && keyValue === _inputValue) {
    isMatched = keyValue === _inputValue;
  }
  return isMatched;
};

/**
 * Remove item from array by given path and index
 *
 * Note: this function mutates array.
 *
 * @param {Object|Array} data (object or array)
 * @param {Array|String} The array path to remove given index
 * @param {Number} index to be removed from given data by path
 *
 * @returns {undefined}
 */

export const removeItemFromArrayByPath = (data, arrayPath, indexToRemove) => {
  const array = get(data, arrayPath, []);
  if (!isEmpty(array)) {
    array.splice(indexToRemove, 1);
  }
};

export const copyToClipboard = text => {
  copy(text);
  message.success(`${t('global:COPIED_TO_CLIPBOARD')}: ${text}`, 1);
};

/**
 * Normalizes number
 *
 * Note: this is the reason for writing this function
 * https://stackoverflow.com/questions/5037839/avoiding-problems-with-javascripts-weird-decimal-calculations
 *
 * 0.07 * 100 = 7.000000000000001 :(
 * 1.05 * 1 + 1.85 * 1 = 2.9000000000000004 :(
 *
 * @example normalizeNumber(7.000000000000001);
 * @return 7
 *
 * @example normalizeNumber(1.05 * 1 + 1.85 * 1)
 * @return 2.9
 *
 * @example normalizeNumber(7.5);
 * @return 7.5
 *
 * @param {Object} value
 * @param {Array} digits
 *
 * @returns {Number}
 */

export const normalizeNumber = (value, digits = 2) => {
  if (Number.isNaN(value) || value == null) return value;
  return Number(value.toFixed(digits));
};

/**
 * Set null to all empty strings in given (nested) object
 *
 * Note: this function mutates object.
 *
 * @param {Object} obj (object)
 *
 * @returns {undefined}
 */
export const setNullToEmptyStringDeep = obj => {
  Object.keys(obj).forEach(key => {
    if (isPlainObject(obj[key])) {
      setNullToEmptyStringDeep(obj[key], { obj, key });
    }
    else if (obj && obj[key] === '') {
      // eslint-disable-next-line no-param-reassign
      obj[key] = null;
    }
  });
};

/**
 * Generate unique filename
 *
 * @param {String} id
 *
 * @returns {String}
 */
export const generateFileName = (id = '') => `${id}_${uuidv4()}`;

export const convertPrimitiveArrayValuesToSelectOptions = values => {
  return (values || []).map(val => ({
    value: val,
    label: val?.toString(),
  }));
};

export const convertConstantValuesToSelectOptions = (values = {}, convertValueToInt = true) => {
  return Object.entries(values).map(([value, label]) => {
    return {
      value: convertValueToInt ? parseInt(value, 10) : value,
      label: label[getLangKey()] || label,
    };
  });
};

export const convertConstantValueTranslationsToSelectOptions = ({ constants, translationBaseKey, pageTranslator = t, labelKey = 'label' }) => {
  // To understand whether properties of constants are objects or not, so we need to get first value of constants
  const typeOfConstantsObjectProperty = typeof Object.values(constants)[0];
  if (typeOfConstantsObjectProperty === 'object') {
    return Object.keys(constants).map(key => {
      return {
        value: constants[key].value,
        [labelKey]: pageTranslator(`${translationBaseKey}.${key}`),
      };
    });
  }

  return Object.values(constants).map(value => {
    return {
      value,
      [labelKey]: pageTranslator(`${translationBaseKey}.${value}`) || value,
    };
  });
};

/**
 * @param {Blob} img
 * @param {function(string | ArrayBuffer | null): void} callback
 */
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', event => {
    return callback(event.target.result);
  });
  reader.readAsDataURL(img);
};
export const getFileText = (text, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', event => {
    return callback(event.target.result);
  });
  reader.readAsText(text);
};

export const selectOptionsSearch = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export const convertSelectOptions = (
  data = [],
  {
    valueKey = '_id',
    labelKey = 'name',
    isTranslation = false,
    hasTranslationKey = false,
    isData = false,
    labelBuilder = null,
  } = {},
) => {
  const labelCondition = ({ item }) => {
    if (_isFunction(labelBuilder)) return labelBuilder?.(item);
    if (hasTranslationKey) return t(item[labelKey]);
    if (isTranslation) return get(item, [labelKey, getLangKey()], '-');
    return get(item, labelKey);
  };

  return data.map(item => {
    return {
      value: get(item, valueKey),
      label: labelCondition({ item }),
      data: isData ? item : null,
    };
  });
};

export const getTranslatedLabel = (item = {}) => item[getLangKey()] ?? '';

export const checkIBANDigits = string => {
  let checksum = string.slice(0, 2);
  for (let offset = 2; offset < string.length; offset += 7) {
    const fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
};

export const isMobile = () => {
  const toMatch = [/Android/i, /iPhone/i, /webOS/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return toMatch.some(toMatchItem => window.navigator.userAgent.match(toMatchItem));
};

export const isScreenSizeLarge = () => {
  const macbookMoreSpaceScreenWidth = 1680;

  const screenWidth = window.innerWidth;

  return screenWidth > macbookMoreSpaceScreenWidth;
};

export const getScreenHeight = () => {
  const screenHeight = window.innerHeight;
  return screenHeight;
};

export const inDevelopmentEnvironment = ENVIRONMENT.ENV === 'development' || ENVIRONMENT.ENV === 'local';

export const removeNullOrUndefinedDeep = (object, { removeEmpty } = {}) => {
  const tempObject = cloneDeep(object);

  const func = obj => Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value && typeof value === 'object') {
      func(value);
    }
    else if (isNil(value) || (removeEmpty && isNullOrEmpty(value))) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });

  func(tempObject);
  return tempObject;
};

export const thousandSeparator = (amount, separator = '.') => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const loadScript = (target, src, id, onSuccess, onError) => {
  const currentScriptEl = document.getElementById(id);
  const hasValidScript = currentScriptEl && currentScriptEl instanceof HTMLScriptElement;
  if (hasValidScript) {
    return;
  }

  const firstScriptEl = document[target].getElementsByTagName('script')[0];
  const scriptEl = document.createElement('script');
  scriptEl.id = id;
  scriptEl.src = src;
  scriptEl.defer = true;
  scriptEl.async = true;

  if (firstScriptEl && firstScriptEl.parentNode) {
    firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);
  }
  else {
    document[target].appendChild(scriptEl);
  }

  scriptEl.onerror = onError;
  scriptEl.onload = onSuccess;
};

export const removeScript = id => {
  const scriptEl = document.getElementById(id);
  const validScript = scriptEl && scriptEl instanceof HTMLScriptElement;

  if (validScript) {
    scriptEl.parentNode.removeChild(scriptEl);
  }
};

export const getCityName = (cities, cityId) => cities.find(city => city._id === cityId)?.name;

export const searchColumnDataByRegex = (columnData, input) => {
  if (columnData && typeof columnData === 'string') {
    const valueRegex = getRegexForCaseSensitiveLetters(input);
    return columnData.match(valueRegex);
  }
  return false;
};

export const getTaxNumberValidatorForCountry = () => {
  const selectedCountryCode = get(getSelectedCountry(), ['code', 'alpha2']);

  if (selectedCountryCode === 'ES') {
    return REGEX.TAX_NUMBER_ALPHANUMERICAL;
  }

  return REGEX.TAX_NUMBER;
};

export const isCurrentCountryTurkey = () => {
  const selectedCountryCode = get(getSelectedCountry(), ['code', 'alpha2']);

  if (selectedCountryCode === 'TR') {
    return true;
  }

  return false;
};

export const isCurrentCountryInList = list => {
  const selectedCountryCode = get(getSelectedCountry(), ['code', 'alpha2']);

  if (list.includes(selectedCountryCode)) {
    return true;
  }

  return false;
};

export const getStatusColors = status => {
  switch (true) {
    case status < MARKET_ORDER_STATUS_MILESTONES.BROWSING:
      return 'incomplete';
    case status > MARKET_ORDER_STATUS_MILESTONES.DELIVERED && status < MARKET_ORDER_STATUS_MILESTONES.CANCELED_BY_COURIER:
      return 'success';
    case status >= MARKET_ORDER_STATUS_MILESTONES.CANCELED_BY_COURIER:
      return 'cancelled';
    default:
      return 'active';
  }
};

export const getMaskedName = name => name
  ?.split(' ')
  ?.map((word, index) => (index === 0 ? word : `${word?.[0]}.`))
  ?.join(' ');

export const getMaskedPhoneNumber = gsm => gsm
  ?.split('')
  ?.map((char, index) => (index < 3 || index > gsm.length - 3 ? char : '*'))
  ?.join('');
export const getReversedCoordinate = (coord = []) => [coord[1], coord[0]];

export const getReversedPolygonCoordinates = (coordinates = []) => {
  const tempCoordinates = [];
  forEach(coordinates, (subCoords, coordinatesIndex) => {
    tempCoordinates[coordinatesIndex] = [];
    forEach(subCoords, coord => {
      tempCoordinates[coordinatesIndex].push(getReversedCoordinate(coord));
    });
  });
  return tempCoordinates;
};

export const alphabeticallySortByParam = (data = [], param = 'label') => {
  return data.sort((a, b) => a[param].localeCompare(b[param]));
};
export const getId = obj => obj?.id || obj?._id;

export const isCountryInDivision = (country, division) => {
  if (!country || !division) return false;
  const foundCountry = (division?.countries || []).find(divisionCountry => getId(divisionCountry) === getId(country));
  return !!foundCountry;
};

export const getDivisionOfACountryFromAllDivisions = (country, divisions = []) => {
  if (!country || !divisions) return null;
  return divisions.find(d => isCountryInDivision(country, d)) || null;
};

export const getRelativeRouteWithSlug = (path, params = {}) => {
  let relativePath = path;
  mapValues(params, (num, key) => {
    relativePath = relativePath.replace(`:${key}`, params[key]);
  });
  return relativePath;
};

// incoming data is mapped according to columns
// columns input needs to key-value pair.
// rows info comes from "data" using column key
const prePareRows = (data, columns) => {
  const rows = [];
  const columnTitles = [];
  const columnKeys = [];
  columns.forEach(columnValue => {
    columnTitles.push(columnValue?.title);
    columnKeys.push(columnValue?.key);
  });

  rows.push(columnTitles);
  data.forEach(d => {
    const rowData = [];
    columnKeys.map(key => rowData.push(d[key]));
    rows.push(rowData);
  });
  return rows;
};

export const exportExcel = (data = [], fileName = '', columns = [], isHeaderVisible = true) => {
  const rows = prePareRows(data, columns);
  const processRow = row => {
    let finalVal = '';
    for (let j = 0; j < row.length; j += 1) {
      let innerValue = '';
      if (row[j]) {
        innerValue = row[j].toString();
      }
      else {
        innerValue = '';
      }
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = `"${result}"`;
      if (j > 0) finalVal += ',';
      finalVal += result;
    }
    return `${finalVal}\n`;
  };

  let csvFile = '';
  const rowIndex = isHeaderVisible ? 0 : 1; // skip header line condition
  for (let i = rowIndex; i < rows.length; i += 1) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob(
    [
      new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM,
      csvFile,
    ],
    { type: 'text/csv;charset=utf-8;' },
  );
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  }
  else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export const convertToCapitalLetter = text => {
  const lowerCaseName = text.toLocaleLowerCase('tr-TR').trim();
  let nameArr = lowerCaseName.replace(/\s+/g, ' ').split(' ');
  nameArr = nameArr.map(name => {
    return name[0].toLocaleUpperCase('tr-TR') + name.substring(1);
  });
  return nameArr.join(' ');
};

export const getFileExtension = fileName => fileName?.split('.')?.pop() || '';

/**
 * @deprecated not good, don't use it
 */
export const isValidObjectId = n => /^[0-9a-f]{24}$/.test(n);

export const hasDuplicates = (arr = []) => uniq(arr).length !== arr.length;

export const handleKeyDownForPriceInput = event => {
  const TOAST_AUTO_CLOSE_IN_MS = 4000;
  const inputValue = `${event?.target?.value}${event?.key}`;
  const hasMoreThanOneCommaOrDot = (inputValue?.match(/\.|,/g) || [])?.length > 1;
  const priceRegex = /[0-9.,]/;
  if (ALLOWED_KEYBOARD_CODES_FOR_PRICE_INPUT[event.code] ||
    event.metaKey ||
    event.ctrlKey ||
    (priceRegex.test(event.key) && !hasMoreThanOneCommaOrDot)
  ) {
    if (event?.key?.includes(',')) {
      toast.warn(t('error:COMMA_IS_NOT_ALLOWED'), { autoClose: TOAST_AUTO_CLOSE_IN_MS });
    }
    return true;
  }

  event.preventDefault();
  return false;
};

export const handleKeyDownForIntegerInput = event => {
  const TOAST_AUTO_CLOSE_IN_MS = 4000;
  const inputValue = `${event?.target?.value}${event?.key}`;
  const hasMoreThanOneCommaOrDot = (inputValue?.match(/\.|,/g) || [])?.length > 1;
  const priceRegex = /[0-9.,]/;

  // Allow negative sign only at the beginning of the input
  const isValidMinus = event.key === '-' && (event.target.value === '' || event.target.selectionStart === 0);

  if (ALLOWED_KEYBOARD_CODES_FOR_PRICE_INPUT[event.code] ||
    event.metaKey ||
    event.ctrlKey ||
    isValidMinus ||
    (priceRegex.test(event.key) && !hasMoreThanOneCommaOrDot)
  ) {
    if (event?.key?.includes(',')) {
      toast.warn(t('error:COMMA_IS_NOT_ALLOWED'), { autoClose: TOAST_AUTO_CLOSE_IN_MS });
    }
    return true;
  }

  event.preventDefault();
  return false;
};

export const isEmptyObject = obj => isEmpty(obj) || Object.values(obj).every(item => item === undefined || item === null);

export const getUTCHoursFromMinutesOfDay = ({
  startMin,
  endMin,
  isExcludeEndHour = false,
}) => {
  const hoursArr = [];
  if (startMin % MINUTES_IN_A_HOUR !== 0 || endMin % MINUTES_IN_A_HOUR !== 0) {
    return hoursArr;
  }

  const startHour = startMin / MINUTES_IN_A_HOUR;
  const exactEndHour = endMin / MINUTES_IN_A_HOUR;
  const endHour = isExcludeEndHour ? exactEndHour - 1 : exactEndHour;
  for (let i = startHour; i <= endHour; i += 1) {
    const utcHours = moment()
      .startOf('day')
      .add(i, 'hours')
      .utc()
      .hour();
    hoursArr.push(utcHours);
  }
  return hoursArr;
};

export const getUTCMinutesFromMinutesOfDay = ({ startMin, endMin, step }) => {
  const hoursArr = [];

  for (let i = startMin; i <= endMin; i += step) {
    const startOfDay = moment().startOf('day').utc();
    const minutes = startOfDay.clone().add(i, 'minutes').diff(startOfDay, 'minutes');
    hoursArr.push(minutes);
  }
  return hoursArr;
};

export const getRandomNumber = ({ min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const removeNonDigits = (string, radix = 10) => {
  // Remove non-digit characters from the string
  const digitsOnly = string.replace(/\D/g, '');
  // Return the resulting number, using the specified radix
  return parseInt(digitsOnly, radix);
};

export const arraysAreEqualSets = (arr1, arr2) => {
  if (arr1?.length !== arr2?.length) return false;
  const s = new Set(arr2);
  for (let i = 0; i < arr1.length; i += 1) {
    if (!s.has(arr1[i])) return false;
  }
  return true;
};

/**
 * Replace the non-breaking space character to normal space.
 // eslint-disable-next-line no-irregular-whitespace
 * e.g. \xa0 -> " "
 * ref: https://stackoverflow.com/a/64909632
 * @param {String} text
 * @returns String breaking space replaced text
 */
export const replaceNonBreakingSpacesToSpace = text => {
  return text.replace(/\xa0/g, ' ').replace(/\u202f/g, ' ');
};

export const jsonToBase64 = object => {
  const jsonStr = JSON.stringify(object);
  return Buffer.from(jsonStr).toString('base64');
};

export const base64ToJson = base64String => {
  if (!base64String) {
    return {};
  }
  const jsonStr = Buffer.from(base64String, 'base64').toString();
  return JSON.parse(jsonStr);
};

const convertToCSV = data => {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
};

export const getFirstDayOfWeekForCountry = ({ selectedCountry }) => {
  const { defaultLanguageCode } = selectedCountry;
  const firstDayOfWeek = moment.localeData(defaultLanguageCode).firstDayOfWeek();
  return firstDayOfWeek;
};

export const getDaysOfWeekForCountry = ({ selectedCountry }) => {
  const firstDayOfWeek = getFirstDayOfWeekForCountry({ selectedCountry });
  if (firstDayOfWeek === 1) {
    const [firstDay, ...remaningWeekDays] = DAY_OF_WEEKS;
    return [...remaningWeekDays, firstDay];
  }
  return [...DAY_OF_WEEKS];
};

export const downloadDataAsCSVV2 = (jsonData, fileName, options = { header: true }) => {
  const csv = jsonToCSV(jsonData, options);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const downloadDataAsCSV = ({ data, columns, fileName = `downloaded_csv_${Date.now()}.csv` }) => {
  const csvDataMerge = [...columns, ...data];
  // NOTE: fails when the columns have comma in the value
  const csvData = convertToCSV(csvDataMerge);
  const link = document.createElement('a');
  link.setAttribute('href', csvData);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getFilteredOperationalAndOldOperationalCountries = countries => {
  const operationalCountries = countries?.filter(country => country.operational);
  const oldOperationalCountries = countries?.filter(country => !country.operational && country.wasOperational);

  return { operationalCountries, oldOperationalCountries };
};

export const isEmailValid = email => REGEX.EMAIL.test(email);

/**
 * Checks if a JWT token is expired.
 *
 * @param {string} jwt - The JSON Web Token to check.
 * @param {number} [expirationOffsetInMS=0] - Optional offset in milliseconds to adjust the expiration time.
 * @returns {boolean} - Returns true if the token is expired or invalid, otherwise false.
 */
export const isJWTExpired = (jwt, expirationOffsetInMS = 0) => {
  try {
    const decodedToken = jwtDecode(jwt);

    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const offsetInSeconds = expirationOffsetInMS / 1000;

    return currentTime > decodedToken.exp - offsetInSeconds;
  }
  catch (error) {
    return true;
  }
};
