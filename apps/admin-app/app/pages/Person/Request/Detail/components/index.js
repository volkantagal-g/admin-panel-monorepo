import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const InformationEditRequestDetailBody = Loadable(() => {
  return import('./InformationEditRequestDetailBody');
});

export const ChangeDetailsCard = Loadable(() => {
  return import('./ChangeDetailsCard');
});

export const RejectNotesSection = Loadable(() => {
  return import('./RejectNotesSection');
});

export const PersonalInfoCard = Loadable(() => {
  return import('./PersonalInfoCard');
});

export const Title = Loadable(() => {
  return import('./Title');
});
