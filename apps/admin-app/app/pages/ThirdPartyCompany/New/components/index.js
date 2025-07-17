import Loadable from '@shared/utils/loadable';

export const ThirdPartyCompanyNewHeader = Loadable(() => {
  return import('./Header/index');
});

export const ThirdPartyCompanyNewForm = Loadable(() => {
  return import('./Form');
});
