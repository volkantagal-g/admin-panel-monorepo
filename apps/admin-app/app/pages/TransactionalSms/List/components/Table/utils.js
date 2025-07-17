import { transactionalSmsDomainTypes } from '@app/pages/TransactionalSms/constantValues';

import { getLangKey } from '@shared/i18n';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) {
    return [];
  }
  return data.map(transactionalSms => ({
    id: transactionalSms.id,
    createdAt: transactionalSms.createdAt,
    name: transactionalSms.name,
    smsType: transactionalSms.smsType,
    targetService: transactionalSmsDomainTypes[transactionalSms.targetService]?.[langKey],
    status: transactionalSms.status,
  }));
};

export const manipulateFiltersBeforeSubmit = configs => {
  const { pagination, sorter } = configs;
  let sortQuery = 'createdAt,desc';
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
