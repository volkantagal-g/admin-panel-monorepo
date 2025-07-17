import Loadable from '@shared/utils/loadable';

export const Maps = Loadable(() => import('./map'));

export const PolygonLayer = Loadable(() => import('./components/polygonLayer'));
export const WarehouseLayer = Loadable(() => import('./components/warehouseLayer'));
export const DrawingTool = Loadable(() => import('./components/drawingTool'));
export const DraggableMarker = Loadable(() => import('./components/draggableMarker'));
export const PointClusterLayer = Loadable(() => import('./components/pointClusterLayer'));
export const DeckGLOverlay = Loadable(() => import('./components/deckGL'));
