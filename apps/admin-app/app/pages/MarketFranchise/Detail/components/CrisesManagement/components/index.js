import Loadable from '@shared/utils/loadable';

export const NewCardModal = Loadable(() => {
  return import('./NewCardModal');
});

export const UpdateCardModal = Loadable(() => {
  return import('./UpdateCardModal');
});

export const Upload = Loadable(() => {
  return import('./Upload');
});

export const Logs = Loadable(() => {
  return import('./LogsTable');
});

export const CardTable = Loadable(() => {
  return import('./CardTable');
});
