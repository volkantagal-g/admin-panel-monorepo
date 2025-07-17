import { getLangKey } from '@shared/i18n';
import { SERVICE_TYPES } from '@app/pages/CommunicationServiceCredentials/constants';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = [], serviceType) => {
  if (data.length < 1) return [];
  if (serviceType === SERVICE_TYPES.NOTIF) {
    return data.map(credentials => ({
      id: credentials.id,
      name: credentials.name,
      createdAt: credentials.createdAt,
      updatedAt: credentials.updatedAt,
      permissions: credentials.permissions,
      isActive: credentials.isActive,
      teamName: credentials.teamName,
      tribeName: credentials.tribeName,
      purpose: credentials.purpose,
    }));
  }
  if (serviceType === SERVICE_TYPES.EMAIL) {
    return data.map(credentials => ({
      id: credentials.id,
      name: credentials.name,
      teamName: credentials.teamName,
      tribeName: credentials.tribeName,
      permissions: credentials.permissions,
      toPatterns: credentials.toPatterns,
      provider: credentials.provider,
      from: credentials.from,
      fromName: credentials.fromName,
      purpose: credentials.purpose,
      createdAt: credentials.createdAt,
      isActive: credentials.isActive,
    }));
  }
  if (serviceType === SERVICE_TYPES.SMS) {
    return data.map(credentials => ({
      id: credentials.id,
      name: credentials.name,
      createdAt: credentials.createdAt,
      isActive: credentials.isActive,
      permissions: credentials.permissions,
      teamName: credentials.teamName,
      tribeName: credentials.tribeName,
      purpose: credentials.purpose,
    }));
  }
  return [];
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
