import Loadable from '@shared/utils/loadable';

export const Form = Loadable(() => {
  return import('./Form');
});