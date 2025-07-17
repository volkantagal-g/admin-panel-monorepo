import {
  DEFAULT_MAP_OPTIONS,
  EXTENDED_GETIR_MARKET_POLYGON_TYPE,
  SUB_REGION_GETIR_MARKET_POLYGON_TYPE,
} from '@shared/shared/constants';

export const COURIERS_DATE_REFRESH_INTERVAL_AS_MS = 10_000;

export const MAP_OPTIONS = {
  CENTER: DEFAULT_MAP_OPTIONS.CENTER,
  ZOOM_RATIO: 15,
};

export const POLYGON_TYPES_FOR_LIVE_MAP = [SUB_REGION_GETIR_MARKET_POLYGON_TYPE, EXTENDED_GETIR_MARKET_POLYGON_TYPE];

export const TEST_ID = {
  TOP_RIGHT_PANEL: {
    WRAPPER: 'topRightPanelWrapper',
    COLLAPSE_BUTTON: 'topRightPanelCollapseButton',
    COURIERS_TABLE: {
      COURIERS: 'topRightPanelCouriersTableCouriers',
      COUNTS: 'topRightPanelCouriersTableCounts',
    },
    PICKER_TABLE: 'topRightPanelPickersTable',
    COURIER_FILTER_BUTTONS_WRAPPER: 'topRightPanelCouriersFilterButtonsWrapper',
    EVENT_PANEL: 'topRightPanelEventPanel',
    EVENT_PANEL_TABLE: 'topRightPanelEventPanelTable',
  },
  FILTERS: { SELECT_POLYGON_TYPE: 'filtersSelectPolygonType' },
};
