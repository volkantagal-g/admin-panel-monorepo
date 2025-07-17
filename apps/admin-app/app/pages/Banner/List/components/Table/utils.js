import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { domainTypes } from '@shared/shared/constantValues';
import { componentTypes } from '@app/pages/Banner/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: (pagination?.number || 0) + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(banner => ({
    id: banner.id,
    startDate: banner.startDate,
    endDate: banner.endDate,
    title: banner.title,
    description: banner.description,
    targetDomain: get(domainTypes, [banner.targetDomain, langKey], ''),
    componentType: get(componentTypes, [banner.componentType, langKey], ''),
    customTag: banner.customTag,
    status: banner.status,
    picForegroundUrl: banner?.picForegroundUrl,
    picBackgroundUrl: banner?.picBackgroundUrl,
    picUrl: banner?.picUrl,
    type: banner.type,
    priority: banner.priority,
    advertPanelUrl: banner.advertPanelUrl,
    processStatus: banner.processStatus,
    pageIds: banner.pageIds,
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
