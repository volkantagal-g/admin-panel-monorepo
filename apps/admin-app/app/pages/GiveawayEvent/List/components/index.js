import Loadable from '@shared/utils/loadable';

export const GiveawayEventsTable = Loadable(() => {
  return import('./GiveawayEventsTable');
});

export const Header = Loadable(() => {
  return import('./Header');
});

export const GiveawaySearch = Loadable(() => {
  return import('./GiveawaySearch');
});
