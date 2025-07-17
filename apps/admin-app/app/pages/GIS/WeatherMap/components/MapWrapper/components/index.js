import Loadable from '@shared/utils/loadable';

export const WarehouseLayerWrapper = Loadable(() => import('./warehouseLayer'));
export const HexagonLayerWrapper = Loadable(() => import('./hexagonLayer'));
