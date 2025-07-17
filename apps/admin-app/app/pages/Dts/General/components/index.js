import Loadable from '@shared/utils/loadable';

export const SelectRule = Loadable(() => {
  return import('./SelectRule');
});

export const SelectFeedbackSource = Loadable(() => {
  return import('./SelectFeedbackSource');
});

export const SelectEmployee = Loadable(() => {
  return import('./SelectEmployee');
});

export const SelectReporters = Loadable(() => {
  return import('./Reporter');
});
