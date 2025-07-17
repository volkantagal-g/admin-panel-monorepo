import Loadable from '@shared/utils/loadable';

export const MultiChoiceMapping = Loadable(() => {
  // eslint-disable-next-line import/no-cycle
  return import('./MultiChoiceMapping');
});

export const NumberInputMapping = Loadable(() => {
  // eslint-disable-next-line import/no-cycle
  return import('./NumberInputMapping');
});
