import Loadable from '@shared/utils/loadable';

export const GeneralInfoForm = Loadable(() => {
  return import('@app/pages/Planogram/Products/Detail/components/GeneralInfoForm');
});

export const Header = Loadable(() => {
  return import('@app/pages/Planogram/Products/Detail/components/Header');
});

export const PlanogramsTable = Loadable(() => {
  return import('@app/pages/Planogram/Products/Detail/components/PlanogramsTable');
});
