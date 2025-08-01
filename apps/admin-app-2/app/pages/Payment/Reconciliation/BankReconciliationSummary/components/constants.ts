import moment, { Moment } from 'moment';

import { LOCATION_BASED_SOURCE_OF_STATEMENTS } from '../../utils';
import { ALL_DOMAIN_OPTIONS } from '../../constants';

export type RangeValue = [Moment | null, Moment | null] | null;

export type InitFiltersTypes = {
  sourceOfStatement: number | null;
  domainType: number | null;
  date: RangeValue;
};

export const INIT_FILTERS: InitFiltersTypes = {
  date: [moment(), moment()],
  sourceOfStatement: LOCATION_BASED_SOURCE_OF_STATEMENTS[0].value,
  domainType: ALL_DOMAIN_OPTIONS(() => {})[0].value,
};
