import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { responsibleDepartment, domainTypes } from '@shared/shared/constantValues';

export const mapDataForTable = (data = []) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(notif => (
    {
      notificationId: notif.id,
      title: notif.title,
      notificationType: notif.notificationType,
      notificationText: notif.message,
      customTag: notif.customTag,
      creationDate: notif.createdAt,
      startDate: notif.startDate,
      service: get(domainTypes, [notif.domainType, langKey], ''),
      responsibleDepartment: responsibleDepartment[notif.responsibleDepartment]?.[langKey],
      notificationCategory: notif.notificationCategory,
      target_person: notif.maxUserCount,
      successCount: notif.successCount,
      status: notif.status,
      processStatus: notif.processStatus,
    }
  ));
};

export const getCountryOptions = (countries, langKey) => {
  return countries?.map(country => {
    return {
      value: country?._id,
      label: country?.name?.[langKey],
    };
  });
};
