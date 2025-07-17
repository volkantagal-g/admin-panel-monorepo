import Loadable from '@shared/utils/loadable';

export const Maps = Loadable(() => import('./map'));

export const GeoJsonLayer = Loadable(() => import('./components/geoJsonLayer'));

export const WarehouseLayer = Loadable(() => import('./components/warehouseLayer'));

export const BaseLayers = Loadable(() => import('./components/baseLayers'));

export const DraggableMarker = Loadable(() => import('./components/draggableMarker'));

export const DrawingTool = Loadable(() => import('./components/drawingTool'));
