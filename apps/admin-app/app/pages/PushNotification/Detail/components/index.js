import Loadable from '@shared/utils/loadable';

export const GeneralInformationForm = Loadable(() => {
  return import('./GeneralInformationForm');
});

export const ListInformationForm = Loadable(() => {
  return import('./ListInformationForm');
});

export const ContentInformationForm = Loadable(() => {
  return import('./ContentInformationForm');
});

export const SendingInformationForm = Loadable(() => {
  return import('./SendingInformationForm');
});

export const RulesForm = Loadable(() => {
  return import('./RulesForm');
});

export const ClientAppActionForm = Loadable(() => {
  return import('./ClientAppActionForm');
});

export const TestNotificationModal = Loadable(() => {
  return import('./TestNotificationModal');
});

export const SendingUserInformationModal = Loadable(() => {
  return import('./SendingUserInformationModal');
});

export const StatisticModal = Loadable(() => {
  return import('./StatisticModal');
});

export const ControllerForm = Loadable(() => {
  return import('./ControllerForm');
});

export const NotificationPageHeader = Loadable(() => {
  return import('./PageHeader');
});

export const AiNotifAppActionForm = Loadable(() => {
  return import('./AiNotifAppActionForm');
});
