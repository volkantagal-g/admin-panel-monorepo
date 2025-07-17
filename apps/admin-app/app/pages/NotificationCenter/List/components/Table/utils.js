import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { domainTypes } from '@shared/shared/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: (pagination.number ?? 0) + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(notificationCenter => ({
    id: notificationCenter.id,
    validFrom: notificationCenter.validFrom,
    validUntil: notificationCenter.validUntil,
    title: notificationCenter.title,
    picUrl: notificationCenter?.picUrl,
    domainType: get(domainTypes, [notificationCenter.domainType, langKey], ''),
    description: notificationCenter.description,
    status: notificationCenter.status,
    processStatus: notificationCenter.processStatus,
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
