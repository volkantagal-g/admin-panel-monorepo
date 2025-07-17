import { getLangKey } from '@shared/i18n';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  if (data.length < 1) return [];
  return data.map(announcement => ({
    id: announcement.id,
    validFrom: announcement.validFrom,
    validUntil: announcement.validUntil,
    title: announcement.title,
    description: announcement.description,
    status: announcement.status,
    processStatus: announcement.processStatus,
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
