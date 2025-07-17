import Loadable from '@shared/utils/loadable';

export const ApplicantInfoForm = Loadable(() => {
  return import('./ApplicantInfoForm');
});

export const PropertyInfoForm = Loadable(() => {
  return import('./PropertyInfoForm');
});

export const Photos = Loadable(() => {
  return import('./Photos');
});

export const Map = Loadable(() => {
  return import('./Map');
});

export const ProposalInfoForm = Loadable(() => {
  return import('./ProposalInfoForm');
});
