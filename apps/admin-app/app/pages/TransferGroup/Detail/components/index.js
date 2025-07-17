import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const TransferGroupDetailForm = Loadable(() => {
  return import('./Form');
});

export const ProductTransferGroupsTable = Loadable(() => {
  return import('./ProductTransferGroupsTable');
});

export const WarehouseTransferGroupsTable = Loadable(() => {
  return import('./WarehouseTransferGroupsTable');
});
