import { TAG_COLORS } from '@shared/shared/constants';

export const TAG_PROPERTY = {
  true: {
    color: TAG_COLORS.success,
    label: 'YES',
  },
  false: {
    color: TAG_COLORS.danger,
    label: 'NO',
  },
};
export const PERSON_TRAINING_TYPE = { SAFE_RIDING: 1 };
export const DEFAULT_FILTER = {
  name: '',
  isActivated: true,
  uniqueIdentifier: '',
};
export const DEFAULT_ACTIVE_KEY = '1';
export const DEFAULT_IS_SEARCHABLE = true;
export const IMAGE_HEIGHT = 50;
export const ANT_SPACING_24 = 24;
export const DEFAULT_ROW_SPACING = [8, 8];
export const HEADER_COL_FLEX_VALUE = 1;
export const DEFAULT_COL_SPACING = {
  md: 12,
  xs: ANT_SPACING_24,
};
