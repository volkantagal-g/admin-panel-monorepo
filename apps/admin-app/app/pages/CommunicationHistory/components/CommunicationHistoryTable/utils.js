import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { COMMUNICATION_CHANNEL_TYPES } from '@app/pages/CommunicationHistory/constants';
import { domainTypes } from '@shared/shared/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = [], communicationType) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    return data.map(item => ({
      id: item.id,
      clientId: item.clientId,
      templateId: item.templateId,
      configurationName: item.configurationName,
      createdAt: item.createdAt,
      deviceType: item.deviceType,
      notificationType: item.notificationType,
      title: item?.title,
      body: item?.body,
    }));
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    return data.map(item => ({
      body: item.body,
      configurationName: item.configurationName,
      deliveryStatus: item.deliveryStatus,
      domainType: get(domainTypes, [item.domainType, langKey], ''),
      id: item.id,
      number: item.number,
      provider: item.provider,
      sendingDate: item.sendingDate,
      smsType: item.smsType,
      failReason: item.failReason,
    }));
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
    return data.map(item => ({
      id: item.id,
      configurationName: item.configurationName,
      status: item.status,
      createdAt: item.createdAt,
      emailType: item.emailType,
      failReason: item.failReason,
      recipient: item.recipient?.email,
      reportId: item.reportId,
      templateId: item.templateId,
    }));
  }
  return [];
};

export const manipulateFiltersBeforeSubmit = configs => {
  const { pagination, sorter, communicationType, currentDataSource } = configs;
  let sortQuery = '';
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.NOTIF) {
    sortQuery = 'createdAt,desc';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.SMS) {
    sortQuery = 'sendingDate,desc';
  }
  if (communicationType === COMMUNICATION_CHANNEL_TYPES.EMAIL) {
    sortQuery = 'createdAt,desc';
  }
  if (sorter.order) {
    const firstItem = currentDataSource[0];
    if (Object.prototype.hasOwnProperty.call(firstItem, sorter.columnKey)) {
      sortQuery = `${sorter.columnKey},${sorter.order.slice(0, -3)}`;
    }
  }
  const langKey = getLangKey();
  return {
    sort: sortQuery,
    clientLanguage: langKey,
    size: pagination?.pageSize,
    page: (pagination?.current || 1) - 1,
  };
};
