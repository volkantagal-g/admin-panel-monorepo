import { getSelectOptionsFromEntries } from '../../utils';
import { marketBasketDeviceTypes, marketBasketDomainTypes, marketBasketStatuses } from '@shared/shared/constantValues';

export const domainTypeOptions = getSelectOptionsFromEntries(marketBasketDomainTypes);
export const statusOptions = getSelectOptionsFromEntries(marketBasketStatuses);
export const deviceTypeOptions = getSelectOptionsFromEntries(marketBasketDeviceTypes);

export const getInitialValues = ({
  domainType,
  startDate,
  endDate,
  city,
  pagination,
  statuses,
  deviceTypes,
  clientId,
}) => {
  return {
    domainType: domainType.toString(),
    date: [startDate, endDate],
    city,
    pagination,
    clientId,
    statuses,
    deviceTypes,
  };
};
