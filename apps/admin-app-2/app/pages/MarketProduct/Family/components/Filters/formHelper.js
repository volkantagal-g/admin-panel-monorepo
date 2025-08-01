import { FAMILY_STATUS_OPTION } from '@app/pages/MarketProduct/Family/constants';

export const getFamilyStatusOptions = t => Object.entries(FAMILY_STATUS_OPTION)?.map(([key, value]) => ({
  value,
  label: t(`FAMILY_STATUS_OPTION.${key}`),
}));
