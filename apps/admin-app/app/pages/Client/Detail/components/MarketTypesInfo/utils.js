import { get, find } from 'lodash';

export const getCountFromOrderCounts = (sucOrderCounts, domainType) => (
  get(find(sucOrderCounts, { domainType }), 'count', 0)
);
