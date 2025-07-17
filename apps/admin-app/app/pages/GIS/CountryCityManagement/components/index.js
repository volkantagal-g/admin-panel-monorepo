import Loadable from '@shared/utils/loadable';

export const CountryList = Loadable(() => import('./Country/List'));
export const CountryCreate = Loadable(() => import('./Country/Create'));
