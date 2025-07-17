import { ALL_VALUE, YES_VALUE, NO_VALUE } from '../../constants';

export const activeSelectOptions = t => [
  {
    value: ALL_VALUE,
    label: t('ALL'),
  },
  {
    value: YES_VALUE,
    label: t('YES'),
  },
  {
    value: NO_VALUE,
    label: t('NO'),
  },
];
