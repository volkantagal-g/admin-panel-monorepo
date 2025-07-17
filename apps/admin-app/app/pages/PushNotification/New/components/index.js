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

export const ControllerForm = Loadable(() => {
  return import('./ControllerForm');
});

export const ClientAppActionForm = Loadable(() => {
  return import('./ClientAppActionForm');
});
