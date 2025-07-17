import { isNaN, some } from 'lodash';

import moment from 'moment';

import { t } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

export const channelOptions = [
  { _id: 5, name: { tr: 'Chat', en: 'Chat' } },
  { _id: 1, name: { tr: 'Telefon', en: 'Telephone' } },
  { _id: 3, name: { tr: 'Diğer', en: 'Other' }, enableTextField: true },
];

const CHANNEL_EXPLANATION_MAX_LENGTH = 20;
const CHANNEL_EXPLANATION_MIN_LENGTH = 3;

const SUBREASON_EXPLANATION_MAX_LENGTH = 100;
const SUBREASON_EXPLANATION_MIN_LENGTH = 5;

export const DESCRIPTION_MAX_LENGTH = 600;

export const DESCRIPTION_MIN_LENGTH = 5;

export const FULL_REFUND = 'FULL_REFUND';

export const PARTIAL_REFUND = 'PARTIAL_REFUND';

export const IN_PRODUCT_REFUND = 'IN_PRODUCT_REFUND';

export const REFUND_TYPE_VALUES = {
  [FULL_REFUND]: 1,
  [IN_PRODUCT_REFUND]: 2,
  [PARTIAL_REFUND]: 3,
};

export const HIGH_CLIENT_TRUST_SCORE = 'D';

export const BY_GETIR = 1;

export const BY_RESTAURANT = 2;

export const refundSourceOptions = {
  [BY_GETIR]: t('foodOrderPage:COMPLAINT_REFUND_MODAL.BY_GETIR'),
  [BY_RESTAURANT]: t('foodOrderPage:COMPLAINT_REFUND_MODAL.BY_RESTAURANT'),
};

const stringRequired = ({ min, max }) => [
  { required: true, message: t('error:REQUIRED') },
  {
    min: DESCRIPTION_MIN_LENGTH,
    type: 'string',
    message: t('foodOrderPage:COMPLAINT_REFUND_MODAL.ERRORS.MIN_CHARACTER_LIMIT', { min }),
  },
  {
    max: DESCRIPTION_MAX_LENGTH,
    type: 'string',
    message: t('foodOrderPage:COMPLAINT_REFUND_MODAL.ERRORS.MAX_CHARACTER_LIMIT', { max }),
  },
  { whitespace: true },
];

const radioButtonRequired = [{ required: true, message: t('error:REQUIRED') }];

export const rules = {
  complaintDescription: stringRequired({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH }),
  channelOptionText: stringRequired({ min: CHANNEL_EXPLANATION_MIN_LENGTH, max: CHANNEL_EXPLANATION_MAX_LENGTH }),
  subReasonText: stringRequired({ min: SUBREASON_EXPLANATION_MIN_LENGTH, max: SUBREASON_EXPLANATION_MAX_LENGTH }),
  refundDescription: stringRequired({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH }),
  refundSource: radioButtonRequired,
  isRestaurantReached: radioButtonRequired,
  isRefundApprovedByRestaurant: radioButtonRequired,
  refundType: radioButtonRequired,
  refundedProducts: [() => ({
    validator: async (_, refundedProducts) => {
      if (!some(refundedProducts, { checked: true })) {
        return Promise.reject(t('foodOrderPage:COMPLAINT_REFUND_MODAL.ERRORS.NO_PRODUCTS_SELECTED'));
      }
      return true;
    },
  })],
  productRefundType: [{ required: true, message: t('error:REQUIRED') }],
  productAmount: max => [
    { required: true, message: t('error:REQUIRED') },
    { max, type: 'number' },
    { min: 0.01, type: 'number' },
  ],
};

export const promoRules = {
  discountAmount: max => [
    { required: true, message: t('error:REQUIRED') },
    { max, type: 'number' },
    {
      min: 0.01,
      type: 'number',
      message: t('foodOrderPage:PROMOTION_MODAL.VALIDATIONS.MUST_BE_POSITIVE'),
    },
  ],
  validDayAmount: [
    { required: true, message: t('error:REQUIRED') },
    {
      min: 1,
      type: 'number',
      message: t('foodOrderPage:PROMOTION_MODAL.VALIDATIONS.MUST_BE_POSITIVE'),
    },
  ],
};

export const formatNumber = value => {
  if (value === null || value === '') {
    return value;
  }
  const intValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''), 10);
  return isNaN(intValue) ? null : intValue;
};

export const parseNumber = value => {
  return value && value.toString().replace(/[^0-9]/g, '');
};

export const getExpiryDate = expiryDays => formatDate(moment().add(expiryDays, 'days'), 'Do MMMM, YYYY');

const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;

export const getValidUntilDates = days => {
  const startTime = moment
    .tz(selectedCountryPrimaryTimeZone)
    .startOf('day')
    .valueOf();
  const endTime = moment
    .tz(selectedCountryPrimaryTimeZone)
    .endOf('day')
    .add(days, 'day')
    .valueOf();

  return { startTime, endTime };
};
