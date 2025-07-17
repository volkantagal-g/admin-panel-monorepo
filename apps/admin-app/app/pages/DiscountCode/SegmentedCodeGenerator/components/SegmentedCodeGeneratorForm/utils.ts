import moment from 'moment';

import { TFunction } from 'i18next';

import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { toTimeZoneWithoutChangingLocalTime } from '@shared/utils/dateHelper';

const validFrom = moment().startOf('day');
const validUntil = moment().endOf('day');

const selectedCountryTimeZones = getSelectedCountryTimeZones();
const defaultTimeZone = selectedCountryTimeZones?.[0]?.timezone;

export enum CODE_ACTION_TYPES {
  ASSIGN_SEGMENT=1,
  DEFINE_PROMOTION=2,
  SHOW_ANNOUNCEMENT=3,
}

type FormType = {
  title: string;
  description: string;
  validRanges: [moment.Moment, moment.Moment];
  count: number;
  prefix: string;
  syllableCount: number;
  useLimit: number;
  _selectedTimeZone: string;
  isAlreadySold: boolean;
  segment?: string;
  promo?: string;
  announcement?: string;
  actionType: CODE_ACTION_TYPES;
}

export const initialValues: FormType = {
  title: '',
  description: '',
  validRanges: [validFrom, validUntil],
  count: 0,
  prefix: '',
  syllableCount: 2,
  useLimit: 1,
  _selectedTimeZone: defaultTimeZone,
  actionType: CODE_ACTION_TYPES.ASSIGN_SEGMENT,
  isAlreadySold: false,
};

type PayloadType = {
  title: string;
  description: string;
  validFrom: moment.Moment;
  validUntil: moment.Moment;
  count: number;
  prefix: string;
  syllableCount: number;
  useLimit: number;
  segment?: string;
  promo?: string;
  announcement?: string;
  isAlreadySold: boolean;
  actionType: CODE_ACTION_TYPES;
}

export const isBeforeToday = (d: moment.Moment) => d.isBefore(moment().startOf('day'));

export const getModifiedValuesBeforeSubmit = ({ validRanges, _selectedTimeZone, ...rest }: FormType): PayloadType => {
  return {
    ...rest,
    validFrom: toTimeZoneWithoutChangingLocalTime({ date: validRanges[0], destinationTimezone: _selectedTimeZone }).startOf('day'),
    validUntil: toTimeZoneWithoutChangingLocalTime({ date: validRanges[1], destinationTimezone: _selectedTimeZone }).endOf('day'),
  };
};

export const DiscountCodeActionTypeOptions = (t: TFunction) => [{
  label: t('discountCodeActionTypeComponent:ASSIGN_SEGMENT'),
  value: CODE_ACTION_TYPES.ASSIGN_SEGMENT,
},
{
  label: t('discountCodeActionTypeComponent:DEFINE_PROMOTION'),
  value: CODE_ACTION_TYPES.DEFINE_PROMOTION,
},
{
  label: t('discountCodeActionTypeComponent:SHOW_ANNOUNCEMENT'),
  value: CODE_ACTION_TYPES.SHOW_ANNOUNCEMENT,
}];
