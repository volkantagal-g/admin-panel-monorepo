import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('@app/pages/Planogram/Products/components/Header');
});

export const PlanogramProductsListTable = Loadable(() => {
  return import('@app/pages/Planogram/Products/components/PlanogramProductsListTable');
});
