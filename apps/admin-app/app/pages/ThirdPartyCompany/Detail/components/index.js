import Loadable from '@shared/utils/loadable';

export const CompanyDetailForm = Loadable(() => {
  return import('./CompanyDetailForm');
});

export const NewCredential = Loadable(() => {
  return import('./NewCredential');
});

export const CredentialList = Loadable(() => {
  return import('./CredentialList');
});

export const ChangeLogs = Loadable(() => {
  return import('./ChangeLogs');
});
