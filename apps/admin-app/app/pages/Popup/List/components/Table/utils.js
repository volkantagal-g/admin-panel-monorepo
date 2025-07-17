import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { popupTypeOptions } from '@app/pages/Popup/constantValues';
import { domainTypes } from '@shared/shared/constantValues';

export const mapDataForTable = data => {
  const langKey = getLangKey();
  return data.map(popup => (
    {
      key: popup.id,
      id: popup.id,
      picUrl: get(popup, ['picURL', langKey], get(popup, ['picURL', popup.phoneLanguages[0]], '')),
      type: get(popupTypeOptions, [popup.type, langKey], ''),
      title: get(popup, ['title', langKey], get(popup, ['title', popup.phoneLanguages[0]], '')),
      validFrom: get(popup, ['validFrom'], ''),
      validUntil: get(popup, ['validUntil'], ''),
      domainType: get(domainTypes, [popup.domainType, langKey], ''),
      shownCount: get(popup, ['shownCount'], ''),
      priority: get(popup, ['priority'], ''),
      status: get(popup, ['status'], ''),
    }
  ));
};

export const mapPaginationForTable = pagination => {
  // If backend service will be okay with prop names which referenced on document it can avoid unnecessary name mapping
  // https://ant.design/components/table/#components-table-demo-ajax
  return {
    current: pagination.number + 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const manipulateFiltersBeforeSubmit = configs => {
  const { pagination, sorter } = configs;
  // Ant table returns 'ascend' || 'descend' || undefined but backend service waits asc || desc for sorting
  let sortQuery = '';
  if (sorter.order) {
    sortQuery = `${sorter.columnKey},${sorter.order.slice(0, -3)}`;
  }
  return {
    sort: sortQuery,
    size: pagination.pageSize,
    page: pagination.current - 1,
  };
};
