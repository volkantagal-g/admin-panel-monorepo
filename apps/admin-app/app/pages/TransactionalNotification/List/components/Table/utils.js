import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { domainTypes, responsibleDepartment } from '@shared/shared/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(transactionalNotification => ({
    id: transactionalNotification.id,
    createdAt: transactionalNotification.createdAt,
    title: transactionalNotification.title,
    name: transactionalNotification.name,
    type: transactionalNotification.type,
    notificationType: transactionalNotification.notificationType,
    domainType: get(domainTypes, [transactionalNotification.domainType, langKey], ''),
    department: responsibleDepartment[transactionalNotification.department]?.[langKey],
    status: transactionalNotification.status,
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
