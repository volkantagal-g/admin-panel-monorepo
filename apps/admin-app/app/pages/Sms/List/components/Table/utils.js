import { getLangKey } from '@shared/i18n';
import { responsibleDepartment, domainTypes } from '@shared/shared/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number ? pagination.number + 1 : 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(sms => ({
    id: sms.id,
    startDate: sms.startDate,
    endDate: sms.endDate,
    domainType: domainTypes[sms.domainType]?.[langKey],
    responsibleDepartment: responsibleDepartment[sms.responsibleDepartment]?.[langKey],
    status: sms.status,
    processStatus: sms.processStatus,
  }));
};

export const manipulateFiltersBeforeSubmit = configs => {
  const { pagination, sorter } = configs;
  let sortQuery = '';
  if (sorter.order) {
    sortQuery = `${sorter.columnKey},${sorter.order.slice(0, -3)}`;
  }
  const langKey = getLangKey();
  return {
    sort: sortQuery,
    clientLanguage: langKey,
    size: pagination?.pageSize,
    page: (pagination?.current || 1) - 1,
  };
};
