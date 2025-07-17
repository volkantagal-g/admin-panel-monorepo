import Loadable from '@shared/utils/loadable';

export const SelectAuditFormType = Loadable(() => {
  return import('./SelectAuditFormType');
});
