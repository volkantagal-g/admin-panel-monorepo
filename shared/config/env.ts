import _ from 'lodash';

import {
  DEV_MISSING_PRODUCT_REASON_ID,
  GETIR_BUY_DEV_URL,
  GETIR_BUY_PROD_URL,
  PROD_MISSING_PRODUCT_REASON_ID,
  SALESFORCE_DASHBOARD_DEV_URLS,
  SALESFORCE_DASHBOARD_PROD_URLS,
} from '@shared/shared/constants';

const hostname = _.get(window, 'location.hostname', '');
const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
export const isProd = hostname.includes('getir.com');
let defaultEnv;
if (isProd) {
  defaultEnv = 'production';
}
else {
  defaultEnv = isLocalHost ? 'local' : 'development';
}

export default {
  BASE_URI: '/',
  ENV: process.env.REACT_APP_ENV || defaultEnv,
  REACT_APP_VERSION: process.env.REACT_APP_VERSION || 'N/A',
  REACT_APP_TARGET_ENV: process.env.REACT_APP_TARGET_ENV,
  REACT_APP_API_GATEWAY_URI: process.env.REACT_APP_API_GATEWAY_URI || 'http://localhost:34000',
  GETIR_MARKET_FRANCHISE_ID: process.env.GETIR_MARKET_FRANCHISE_ID || '5e0d8a1df0f1d572ab399aaa',
  YANDEX_JS_KEY: process.env.YANDEX_JS_KEY || 'a9942c28-89b1-4347-9faa-f0eb81c265db',
  REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyB79Q0bG-WYJ_yK9t5kUMXer9tzN-vM2Bk',
  REACT_APP_LOCALS_PANEL_URL: process.env.REACT_APP_LOCALS_PANEL_URL || 'https://panel-fe.artisandev.getirapi.com',
  REACT_APP_GIS_GEOSERVER_URL: process.env.REACT_APP_GIS_GEOSERVER_URL || 'https://gis-geoserver.develop.getirapi.com/geoserver/getir/wms',
  REACT_APP_FOOD_RESTAURANT_PANEL_URL: process.env.REACT_APP_FOOD_RESTAURANT_PANEL_URL || 'http://food-panel-frontend.fooddev.getirapi.com',
  GOOGLE_AUTH: {
    JS_URI: 'https://accounts.google.com/gsi/client',
    DOM_ID: 'google-auth',
    CLIENT_ID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || '101316913464-o11gcjp7rip27df82u428u9s2tou0lp8.apps.googleusercontent.com', // panel-321812
  },
  REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY: process.env.REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY || '2jKAsGoFPrVNGna5p0igFEpbxZf',
  REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL: process.env.REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL || 'https://rudderstack-external.datadev.getirapi.com',
  REACT_APP_WATER_PANEL_URL: process.env.REACT_APP_WATER_PANEL_URL || 'https://water-panel.develop.getirapi.com',
  REACT_APP_WATER_UPLOAD_IMAGE_SERVICE: process.env.REACT_APP_WATER_UPLOAD_IMAGE_SERVICE || 'https://water-product-service.getirsudev.getirapi.com/v1',
  MISSING_PRODUCT_REASON_ID: isProd ? PROD_MISSING_PRODUCT_REASON_ID : DEV_MISSING_PRODUCT_REASON_ID,
  GETIR_BUY_URL: isProd ? GETIR_BUY_PROD_URL : GETIR_BUY_DEV_URL,
  SALESFORCE_DASHBOARD_URLS: isProd ? SALESFORCE_DASHBOARD_PROD_URLS : SALESFORCE_DASHBOARD_DEV_URLS,
};
