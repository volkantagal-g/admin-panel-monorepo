import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('@app/pages/Planogram/Warehouses/components/Header');
});

export const PlanogramWarehousesListTable = Loadable(() => {
  return import('@app/pages/Planogram/Warehouses/components/PlanogramWarehousesListTable');
});
