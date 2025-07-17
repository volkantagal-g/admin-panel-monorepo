import { getLangKey } from '@shared/i18n';

export const findCityName = (cityId, cities) => cities.find(city => city._id === cityId)?.name[getLangKey()];
