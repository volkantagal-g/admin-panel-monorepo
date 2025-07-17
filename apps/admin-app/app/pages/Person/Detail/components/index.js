import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const GeneralInfo = Loadable(() => {
  return import('./GeneralInfo');
});

export const EmploymentInfo = Loadable(() => {
  return import('./EmploymentInfo');
});

export const PersonalInfo = Loadable(() => {
  return import('./PersonalInfo');
});

export const HomeAddress = Loadable(() => {
  return import('./HomeAddress');
});

export const ProfileBox = Loadable(() => {
  return import('./ProfileBox');
});

export const RelativeInfo = Loadable(() => {
  return import('./RelativeInfo');
});

export const TrainingsInfo = Loadable(() => {
  return import('./TrainingsInfo');
});

export const DisableCourierLoginBox = Loadable(() => {
  return import('./DisableCourierLoginBox');
});

export const DisableCourierLoginHistoryBox = Loadable(() => {
  return import('./DisableCourierLoginHistoryBox');
});

export const CouriersInfo = Loadable(() => {
  return import('./CouriersInfo');
});

export const FranchiseEmployersInfo = Loadable(() => {
  return import('./FranchiseEmployersInfo');
});

export const PasswordModal = Loadable(() => {
  return import('./PasswordModal');
});

export const PickersInfo = Loadable(() => {
  return import('./PickersInfo');
});

export const NotesBox = Loadable(() => {
  return import('./NotesBox');
});

export const IntegrationsBox = Loadable(() => {
  return import('./IntegrationsBox');
});

export const GetirUpTrainings = Loadable(() => {
  return import('./GetirUpTrainings');
});
