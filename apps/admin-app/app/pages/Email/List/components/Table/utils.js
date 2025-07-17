import moment from 'moment';

import { get } from 'lodash';

import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import { domainTypes, responsibleDepartment } from '@shared/shared/constantValues';

export const mapPaginationForTable = pagination => {
  return {
    current: pagination.number ? pagination.number + 1 : 1,
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  if (data.length < 1) return [];
  return data.map(email => ({
    emailId: email.id,
    creationDate: moment.utc(email.createdAt).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    startDate: moment.utc(email.startDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    dueDate: moment.utc(email.dueDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    domainType: get(domainTypes, [email.domainType, langKey], ''),
    responsibleDepartment: responsibleDepartment[email.responsibleDepartment]?.[langKey],
    status: email.status,
    customTag: email.customTag,
    processStatus: email.processStatus,
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
    size: pagination.pageSize,
    page: pagination.current - 1,
  };
};
