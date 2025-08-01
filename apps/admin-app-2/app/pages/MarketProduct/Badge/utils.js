import { getLangKey } from '@shared/i18n';

import { badgePositions } from '@shared/shared/constantValues';

export const getBadgePositionOptions = () => {
  return Object.entries(badgePositions).map(([key, value]) => {
    return {
      value: key,
      label: value[getLangKey()],
    };
  });
};
