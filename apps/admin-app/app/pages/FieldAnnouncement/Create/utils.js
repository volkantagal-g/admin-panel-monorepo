import { getUser } from '@shared/redux/selectors/auth';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';

export const getRequestParamsToCreateAnnouncement = filters => {
  const { _id: userId } = getUser();
  const { code: { alpha2: selectedCountryCode } } = getSelectedCountry();
  const langKey = getLangKey();

  const {
    announcementType,
    franchiseIds,
    warehouseIds,
    descriptionEn,
    descriptionNative,
    titleEn,
    titleNative,
    active,
    startEndDate,
    files,
    isNotification,
  } = filters;

  const params = { country: selectedCountryCode, language: langKey, active };

  if (announcementType === 'warehouse') {
    params.createdBy = userId;
    params.warehouseIds = warehouseIds;
    params.description = { en: descriptionEn, native: descriptionNative };
    params.title = { en: titleEn, native: titleNative };
  }

  if (announcementType === 'franchise') {
    const [startDate, endDate] = startEndDate;

    params.franchiseIds = franchiseIds;
    params.description = { native: descriptionNative };
    params.title = { native: titleNative };
    params.startDate = startDate;
    params.endDate = endDate;
    params.announcementFiles = files;
    params.isNotification = isNotification;
  }

  return params;
};
