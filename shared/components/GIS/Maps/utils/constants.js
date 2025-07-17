import {
  GETIR_DOMAIN_TYPES,
  WAREHOUSE_BUSY_STATUS,
  WAREHOUSE_FREE_STATUS,
  WAREHOUSE_OUT_OF_COURIER_STATUS,
} from '@shared/shared/constants';
import markerStorePrimary from '@shared/assets/markers/marker_store_primary.png';
import markerStoreRed from '@shared/assets/markers/marker_store_red.png';
import markerStoreYellow from '@shared/assets/markers/marker_store_yellow.png';
import marketG30Primary from '@shared/assets/markers/market_warehouse_g30_primary.png';
import marketG30Red from '@shared/assets/markers/market_warehouse_g30_red.png';
import marketG30Yellow from '@shared/assets/markers/market_warehouse_g30_yellow.png';
import voyagerWarehousePrimary from '@shared/assets/markers/voyager/warehouse_primary.png';
import voyagerWarehouseRed from '@shared/assets/markers/voyager/warehouse_red.png';
import voyagerWarehouseYellow from '@shared/assets/markers/voyager/warehouse_yellow.png';
import marketWarehouseMergedPrimary from '@shared/assets/markers/market_warehouse_merged_primary.png';
import marketWarehouseMergedRed from '@shared/assets/markers/market_warehouse_merged_red.png';
import marketWarehouseMergedYellow from '@shared/assets/markers/market_warehouse_merged_yellow.png';

export const CENTER_OF_TURKEY = [39, 35];
export const MAP_DEFAULT_ZOOM = 6;

export const ATTRIBUTIONS = {
  // eslint-disable-next-line max-len
  ESRI_SATELLITE: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  OSM: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap contributors</a> 2022',
  GOOGLE: 'Map data &copy; <a href="https://www.google.com.tr/maps/">Google</a> 2022',
  GETIR: '&copy; <a href="https://getir.com/">Getir</a>',
  VECTOR: 'Vector data &copy; <a href="mailto:gis@getir.com">Getir GIS Team</a> 2022',
};

export const TILE_LAYERS = {
  ESRI_SATELLITE: {
    URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    NAME: 'ESRI_SATELLITE',
    MAX_ZOOM: 17,
    MIN_ZOOM: 0,
  },
  OSM: {
    URL: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    NAME: 'OSM',
    MAX_ZOOM: 20,
    MIN_ZOOM: 0,
  },
  GOOGLE_STREET: {
    URL: 'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    NAME: 'GOOGLE_STREET',
    MAX_ZOOM: 22,
    MIN_ZOOM: 0,
  },
  GOOGLE_ROAD: { NAME: 'GOOGLE_ROAD' },
  GOOGLE_TRAFFIC: { NAME: 'GOOGLE_TRAFFIC' },
  GOOGLE_SATELLITE: { NAME: 'GOOGLE_SATELLITE' },
  GOOGLE_HYBRID: { NAME: 'GOOGLE_HYBRID' },
};

export const warehouseMarkersByDomainTypeByStatus = {
  [GETIR_DOMAIN_TYPES.GETIR10]: {},
  [GETIR_DOMAIN_TYPES.MARKET]: {},
  [GETIR_DOMAIN_TYPES.VOYAGER]: {},
  MERGED: {},
};
// g10
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_FREE_STATUS] = markerStorePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_BUSY_STATUS] = markerStoreRed;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_OUT_OF_COURIER_STATUS] = markerStoreYellow;
// g30
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_FREE_STATUS] = marketG30Primary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_BUSY_STATUS] = marketG30Red;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_OUT_OF_COURIER_STATUS] = marketG30Yellow;
// VOYAGER
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_FREE_STATUS] = voyagerWarehousePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_BUSY_STATUS] = voyagerWarehouseRed;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_OUT_OF_COURIER_STATUS] = voyagerWarehouseYellow;
// merged
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_FREE_STATUS] = marketWarehouseMergedPrimary;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_BUSY_STATUS] = marketWarehouseMergedRed;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_OUT_OF_COURIER_STATUS] = marketWarehouseMergedYellow;
