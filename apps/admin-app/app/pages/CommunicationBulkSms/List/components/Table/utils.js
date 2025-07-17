import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { campaignStatus } from '@app/pages/CommunicationBulkSms/constantValues';
import { domainTypes } from '@shared/shared/constantValues';

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
  return data.map(bulkSms => ({
    id: bulkSms.id,
    senderDomain: get(domainTypes, [bulkSms.senderDomain, langKey], ''),
    senderOrganizationId: bulkSms.senderOrganization.organizationName,
    campaignStatus: get(campaignStatus[bulkSms.campaignStatus], langKey, ''),
    smsType: bulkSms.smsType,
    description: bulkSms.description,
    activenessStatus: bulkSms.activenessStatus,
    createdAt: bulkSms.createdAt,
    deliveryTime: bulkSms.deliveryTime,
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
