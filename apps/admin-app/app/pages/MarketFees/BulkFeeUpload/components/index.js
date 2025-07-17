import Loadable from '@loadable/component';

export const ServiceFeeBulkUpload = Loadable(() => import('./ServiceFeeBulkUploadV2'));
export const DeliveryFeeBulkUpload = Loadable(() => import('./DeliveryFeeBulkUploadV2'));
export const BasketAmountBulkUpload = Loadable(() => import('./BasketAmountBulkUpload'));
