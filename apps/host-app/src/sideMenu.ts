import { ROUTE } from '@app/routes';
import {
  GEMINI,
  GEMU,
  GETIR_GROW_URL,
  GETIR_HUB_URL,
  GETIR_NEXT_URL,
  GETIR_PRO,
  GETIR_UP_URL,
  IT_HELP_DESK_URL,
  ROLE_LIST_TAB_PANE_KEY,
} from '@shared/shared/constants';
import { ENVIRONMENT } from '@shared/config';

export const MENU_TYPE_GROUP = 'group';

const menus = [
  // DASHBOARD & MONITORING - GETIRMARKET MANAGEMENT
  {
    key: 'MANAGEMENT',
    name: 'MANAGEMENT',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.EU_GROWTH_COMPARISON.key,
        name: 'EU_GROWTH_COMPARISON',
        path: ROUTE.EU_GROWTH_COMPARISON.path,
      },
      {
        key: ROUTE.GETIR_MARKET_DASHBOARD.key,
        name: 'GETIR_MARKET_DASHBOARD_MANAGEMENT_SECTION',
        path: ROUTE.GETIR_MARKET_DASHBOARD.path,
      },
      {
        key: ROUTE.GETIR_DRIVE_DASHBOARD.key,
        name: 'GETIR_DRIVE_DASHBOARD_FOR_MANAGEMENT_SECTION',
        path: ROUTE.GETIR_DRIVE_DASHBOARD.path,
      },
      {
        key: ROUTE.GETIR_MARKET_LIVE_MAP.key,
        name: 'GETIR_MARKET_LIVE_MAP_MANAGEMENT_SECTION',
        path: ROUTE.GETIR_MARKET_LIVE_MAP.path,
      },
      {
        key: ROUTE.DAILY_SUMMARY_GLOBAL.key,
        name: 'DAILY_SUMMARY_GLOBAL',
        path: ROUTE.DAILY_SUMMARY_GLOBAL.path,
      },
      {
        key: ROUTE.DAILY_SUMMARY_COUNTRY.key,
        name: 'DAILY_SUMMARY_COUNTRY',
        path: ROUTE.DAILY_SUMMARY_COUNTRY.path,
      },
      {
        key: ROUTE.DAILY_SUMMARY_FOUNDERS_CUSTOM.key,
        name: 'DAILY_SUMMARY_FOUNDERS_CUSTOM',
        path: ROUTE.DAILY_SUMMARY_FOUNDERS_CUSTOM.path,
      },
      {
        key: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD
          .key,
        name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD_MANAGEMENT_SECTION',
        path: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD
          .path,
      },
      {
        key: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT.key,
        name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT_MANAGEMENT_SECTION',
        path: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT.path,
      },
      {
        key: ROUTE.GETIR_MARKET_COMMERCIAL_MONITORING.key,
        name: 'GETIR_MARKET_COMMERCIAL_MONITORING',
        path: ROUTE.GETIR_MARKET_COMMERCIAL_MONITORING.path,
      },
      {
        key: ROUTE.GETIR_MARKET_GROWTH_COMPARISON.key,
        name: 'GETIR_MARKET_GROWTH_COMPARISON',
        path: ROUTE.GETIR_MARKET_GROWTH_COMPARISON.path,
      },
      {
        key: ROUTE.ORDER_COUNTER.key,
        name: 'ORDER_COUNTER',
        path: ROUTE.ORDER_COUNTER.path,
      },
      {
        key: 'EMPLOYEE_OFFICE_ATTENDANCE_TRACKING',
        name: 'EMPLOYEE_OFFICE_ATTENDANCE_TRACKING',
        children: [
          {
            key: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD.key,
            name: 'EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD',
            path: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD.path,
          },
          {
            key: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT
              .key,
            name: 'EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT',
            path: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT
              .path,
          },
        ],
      },
      {
        key: 'GETIR_FOOD_MANAGEMENT_SECTION',
        name: 'GETIR_FOOD',
        children: [
          {
            key: ROUTE.FOOD_LIVE_MAP.key,
            name: 'LIVE_MAP',
            path: ROUTE.FOOD_LIVE_MAP.path,
          },
          {
            key: ROUTE.GETIR_FOOD_ORDER_ACTIVE.key,
            name: 'ACTIVE_ORDERS',
            path: ROUTE.GETIR_FOOD_ORDER_ACTIVE.path,
          },
          {
            key: ROUTE.GETIR_FOOD_ORDER_SUMMARY.key,
            name: 'GETIR_FOOD_ORDER_SUMMARY_MANAGEMENT_SECTION',
            path: ROUTE.GETIR_FOOD_ORDER_SUMMARY.path,
          },
          {
            key: ROUTE.GETIR_FOOD_ORDER_FILTER.key,
            name: 'ORDER_FILTER',
            path: ROUTE.GETIR_FOOD_ORDER_FILTER.path,
          },
        ],
      },
      {
        key: ROUTE.GIS_HEATMAP.key,
        name: 'GIS_HEATMAP',
        path: ROUTE.GIS_HEATMAP.path,
      },
      {
        key: 'MARKET_KPI_MONITORING',
        name: 'MARKET_KPI_MONITORING',
        children: [
          {
            key: ROUTE.GROWTH_DASHBOARD.key,
            name: 'GROWTH_DASHBOARD',
            path: ROUTE.GROWTH_DASHBOARD.path,
          },
        ],
      },
    ],
  },
  // BUSINESS MONITORING
  {
    key: 'BUSINESS_MONITORING',
    name: 'BUSINESS_MONITORING',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'MARKET_KPI_MONITORING',
        name: 'MARKET_KPI_MONITORING',
        children: [
          {
            key: ROUTE.LIVE_MONITORING.key,
            name: 'ORDER_GROWTH_MONITORING',
            path: ROUTE.LIVE_MONITORING.path,
          },
          {
            key: ROUTE.OPERATIONS_LIVE_MONITORING.key,
            name: 'OPERATIONS_LIVE_MONITORING',
            path: ROUTE.OPERATIONS_LIVE_MONITORING.path,
          },
          {
            key: ROUTE.COURIER_LIVE_MONITORING.key,
            name: 'COURIER_LIVE_MONITORING',
            path: ROUTE.COURIER_LIVE_MONITORING.path,
          },
          {
            key: ROUTE.DAILY_TRACKING_ORDER.key,
            name: 'DAILY_TRACKING_ORDER',
            path: ROUTE.DAILY_TRACKING_ORDER.path,
          },
          {
            key: ROUTE.DAILY_TRACKING_INSTANT.key,
            name: 'DAILY_TRACKING_INSTANT',
            path: ROUTE.DAILY_TRACKING_INSTANT.path,
          },
          {
            key: ROUTE.GROWTH_DASHBOARD.key,
            name: 'GROWTH_DASHBOARD',
            path: ROUTE.GROWTH_DASHBOARD.path,
          },
        ],
      },
      {
        key: 'REPORTS_MENU_GROUP',
        name: 'REPORTS_MENU_GROUP',
        children: [
          {
            key: ROUTE.REPORTS.key,
            name: 'REPORTS',
            path: ROUTE.REPORTS.path,
          },
          {
            key: ROUTE.REPORT_TAGS.key,
            name: 'REPORT_TAGS',
            path: ROUTE.REPORT_TAGS.path,
          },
          {
            key: ROUTE.REPORT_TYPES.key,
            name: 'REPORT_TYPES',
            path: ROUTE.REPORT_TYPES.path,
          },
        ],
      },
      {
        key: 'BUSINESS_ALERTING_TOOL',
        name: 'BUSINESS_ALERTING_TOOL',
        children: [
          {
            key: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST.key,
            name: 'ALERT_CONDITIONS',
            path: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST.path,
          },
          {
            key: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_LIST.key,
            name: 'INCIDENTS',
            path: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_LIST.path,
          },
        ],
      },
      {
        key: ROUTE.LMD_AND_OTHER_EXPENSES_UPLOAD.key,
        name: 'LMD_AND_OTHER_EXPENSES_UPLOAD',
        path: ROUTE.LMD_AND_OTHER_EXPENSES_UPLOAD.path,
      },
    ],
  },
  // FIELD
  {
    key: 'FIELD_MANAGEMENT',
    name: 'FIELD_MANAGEMENT',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'FIELD_EMPLOYEE_GROUP',
        name: 'FIELD_EMPLOYEE',
        children: [
          {
            key: ROUTE.PERSON_LIST.key,
            name: 'PERSON_LIST',
            path: ROUTE.PERSON_LIST.path,
          },
          {
            key: ROUTE.WORKFORCE_CONTRACT_LIST.key,
            name: 'PERSON_CONTRACT',
            path: ROUTE.WORKFORCE_CONTRACT_LIST.path,
          },
          {
            key: ROUTE.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_LIST.key,
            name: 'LEAVE_MANAGEMENT',
            path: ROUTE.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_LIST.path,
          },
          {
            key: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOCK.key,
            name: 'TIMESHEET_LOCK',
            path: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOCK.path,
          },
          {
            key: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOGS.key,
            name: 'TIMESHEET_LOGS',
            path: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOGS.path,
          },
          {
            key: ROUTE.WORKFORCE_REPORTS.key,
            name: 'WORKFORCE_REPORTS',
            path: ROUTE.WORKFORCE_REPORTS.path,
          },
          {
            key: ROUTE.WORKFORCE_SLOT_PLAN_MANAGEMENT.key,
            name: 'SLOT_PLAN_MANAGEMENT',
            path: ROUTE.WORKFORCE_SLOT_PLAN_MANAGEMENT.path,
          },
          {
            key: ROUTE.COURIER_LOYALTY_LIST.key,
            name: 'COURIER_LOYALTY',
            path: ROUTE.COURIER_LOYALTY_LIST.path,
          },
        ],
      },
      {
        key: ROUTE.COURIER_LIST.key,
        name: 'COURIER_LIST',
        path: ROUTE.COURIER_LIST.path,
      },
      {
        key: ROUTE.COURIER_FEEDBACK_LIST.key,
        name: 'Courier Feedback',
        path: ROUTE.COURIER_FEEDBACK_LIST.path,
      },
      {
        key: ROUTE.COURIER_STATUS_AND_BUSY_LIST.key,
        name: 'Courier Status & Busy Dashboard',
        path: ROUTE.COURIER_STATUS_AND_BUSY_LIST.path,
      },
      {
        key: 'FIELD_PERFORMANCE_MANAGEMENT_MENU_GROUP',
        name: 'FIELD_PERFORMANCE_MANAGEMENT',
        children: [
          {
            key: ROUTE.DTS_LIST.key,
            name: 'DTS_LIST',
            path: ROUTE.DTS_LIST.path,
          },
          {
            key: ROUTE.DTS_SUMMARY.key,
            name: 'DTS_SUMMARY',
            path: ROUTE.DTS_SUMMARY.path,
          },
          {
            key: ROUTE.DTS_RULE_LIST.key,
            name: 'DTS_RULE_LIST',
            path: ROUTE.DTS_RULE_LIST.path,
          },
          {
            key: ROUTE.DDS_OBJECTION_LIST.key,
            name: 'DDS_OBJECTION_LIST',
            path: ROUTE.DDS_OBJECTION_LIST.path,
          },
          {
            key: ROUTE.STAFF_PLAN_PUBLICATION.key,
            name: 'STAFF_PLAN_PUBLICATION',
            path: ROUTE.STAFF_PLAN_PUBLICATION.path,
          },
          {
            key: ROUTE.FRANCHISE_EARNINGS_LIST.key,
            name: 'FRANCHISE_EARNINGS_LIST',
            path: ROUTE.FRANCHISE_EARNINGS_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_EARNINGS_UPLOAD.key,
            name: 'FRANCHISE_EARNINGS_UPLOAD',
            path: ROUTE.FRANCHISE_EARNINGS_UPLOAD.path,
          },
          {
            key: ROUTE.DYS_CONFIGS.key,
            name: 'DYS_CONFIGS',
            path: ROUTE.DYS_CONFIGS.path,
          },
          {
            key: ROUTE.DTS_CATEGORY_SETTING_LIST.key,
            name: 'DTS_CATEGORY_SETTING_LIST',
            path: ROUTE.DTS_CATEGORY_SETTING_LIST.path,
          },
          {
            key: ROUTE.DTS_FEEDBACK_SOURCE_SETTING_LIST.key,
            name: 'DTS_FEEDBACK_SOURCE_SETTING_LIST',
            path: ROUTE.DTS_FEEDBACK_SOURCE_SETTING_LIST.path,
          },
          {
            key: ROUTE.DTS_PRIORITY_SETTING_LIST.key,
            name: 'DTS_PRIORITY_SETTING_LIST',
            path: ROUTE.DTS_PRIORITY_SETTING_LIST.path,
          },
          {
            key: ROUTE.HIGH_LEVEL_DYS.key,
            name: 'HIGH_LEVEL_DYS',
            path: ROUTE.HIGH_LEVEL_DYS.path,
          },
          {
            key: ROUTE.FRANCHISE_CONFIG_LIST.key,
            name: 'FRANCHISE_DYNAMIC_CONFIG_LIST',
            path: ROUTE.FRANCHISE_CONFIG_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_CONFIG_TYPE_LIST.key,
            name: 'FRANCHISE_CONFIG_TYPE_LIST',
            path: ROUTE.FRANCHISE_CONFIG_TYPE_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_LEGAL_LIST.key,
            name: 'FRANCHISE_LEGAL_LIST',
            path: ROUTE.FRANCHISE_LEGAL_LIST.path,
          },
        ],
      },
      {
        key: 'QUALITY_EVALUATION_SYSTEM_MENU_GROUP',
        name: 'QUALITY_EVALUATION_SYSTEM',
        children: [
          {
            key: ROUTE.KDS_QUESTION_GROUP_LIST.key,
            name: 'KDS_QUESTION_GROUP_LIST',
            path: ROUTE.KDS_QUESTION_GROUP_LIST.path,
          },
          {
            key: ROUTE.KDS_SCORE_MAPPING.key,
            name: 'KDS_SCORE_MAPPING',
            path: ROUTE.KDS_SCORE_MAPPING.path,
          },
          {
            key: ROUTE.KDS_AUDIT_FORM_TYPE_LIST.key,
            name: 'KDS_AUDIT_FORM_TYPE_LIST',
            path: ROUTE.KDS_AUDIT_FORM_TYPE_LIST.path,
          },
          {
            key: ROUTE.KDS_QUESTION_LIST.key,
            name: 'KDS_QUESTION_LIST',
            path: ROUTE.KDS_QUESTION_LIST.path,
          },
          {
            key: ROUTE.STORE_AUDIT_LIST.key,
            name: 'STORE_AUDIT_LIST',
            path: ROUTE.STORE_AUDIT_LIST.path,
          },
        ],
      },
      {
        key: 'FIELD_ANNOUNCEMENT_MENU_GROUP',
        name: 'FIELD_ANNOUNCEMENT_MENU_GROUP',
        children: [
          {
            key: ROUTE.FIELD_ANNOUNCEMENT_LIST.key,
            name: 'FIELD_ANNOUNCEMENT_LIST',
            path: ROUTE.FIELD_ANNOUNCEMENT_LIST.path,
          },
          {
            key: ROUTE.FIELD_ANNOUNCEMENT_LIST_BY_WAREHOUSE.key,
            name: 'FIELD_ANNOUNCEMENT_LIST_BY_WAREHOUSE',
            path: ROUTE.FIELD_ANNOUNCEMENT_LIST_BY_WAREHOUSE.path,
          },
        ],
      },
      {
        key: 'WAREHOUSE_AND_FRANCHISE_MENU_GROUP',
        name: 'WAREHOUSE_AND_FRANCHISE_MENU_GROUP',
        children: [
          {
            key: ROUTE.WAREHOUSE_LIST.key,
            name: 'WAREHOUSE_LIST',
            path: ROUTE.WAREHOUSE_LIST.path,
          },
          {
            key: ROUTE.WAREHOUSE_PROPOSAL_LIST.key,
            name: 'WAREHOUSE_PROPOSAL_LIST',
            path: ROUTE.WAREHOUSE_PROPOSAL_LIST.path,
          },
          {
            key: ROUTE.MARKET_FRANCHISE_USER_ROLE_LIST.key,
            name: 'MARKET_FRANCHISE_USER_ROLE_LIST',
            path: ROUTE.MARKET_FRANCHISE_USER_ROLE_LIST.path,
          },
          {
            key: ROUTE.MARKET_FRANCHISE_USER_LIST.key,
            name: 'MARKET_FRANCHISE_USER_LIST',
            path: ROUTE.MARKET_FRANCHISE_USER_LIST.path,
          },
          {
            key: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_LIST.key,
            name: 'MARKET_FRANCHISE_USER_ROLE_GROUP_LIST',
            path: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_LIST.path,
          },
          {
            key: ROUTE.MARKET_FRANCHISE_LIST.key,
            name: 'MARKET_FRANCHISE_LIST',
            path: ROUTE.MARKET_FRANCHISE_LIST.path,
          },
          {
            key: ROUTE.PERSON_REQUEST_LIST.key,
            name: 'FRANCHISE_PERSON_REQUEST',
            path: ROUTE.PERSON_REQUEST_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_REQUEST_LIST.key,
            name: 'FRANCHISE_REQUEST_LIST',
            path: ROUTE.FRANCHISE_REQUEST_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_EQUIPMENT_LIST.key,
            name: 'FRANCHISE_EQUIPMENT_LIST',
            path: ROUTE.FRANCHISE_EQUIPMENT_LIST.path,
          },
          {
            key: ROUTE.PERSON_CANDIDATE_LIST.key,
            name: 'FRANCHISE_PERSON_CANDIDATE',
            path: ROUTE.PERSON_CANDIDATE_LIST.path,
          },
          {
            key: ROUTE.E2E_COURIER_PLAN_LIST.key,
            name: 'E2E_COURIER_PLAN_LIST',
            path: ROUTE.E2E_COURIER_PLAN_LIST.path,
          },
          {
            key: ROUTE.FRANCHISE_BILL_MANAGEMENT_LIST.key,
            name: 'FRANCHISE_BILL_MANAGEMENT',
            path: ROUTE.FRANCHISE_BILL_MANAGEMENT_LIST.path,
          },
        ],
      },
      {
        key: 'FLEET_MENU_GROUP',
        name: 'FLEET_MENU_GROUP',
        children: [
          {
            key: ROUTE.VEHICLE_CONSTRAINT_LIST.key,
            name: 'VEHICLE_CONSTRAINT_LIST',
            path: ROUTE.VEHICLE_CONSTRAINT_LIST.path,
          },
          {
            key: ROUTE.VEHICLE_LIST.key,
            name: 'VEHICLE_LIST',
            path: ROUTE.VEHICLE_LIST.path,
          },
          {
            key: ROUTE.TMS_DRIVER_LIST.key,
            name: 'TMS_DRIVER_LIST',
            path: ROUTE.TMS_DRIVER_LIST.path,
          },
          {
            key: ROUTE.TMS_LIST.key,
            name: 'TMS_LIST',
            path: ROUTE.TMS_LIST.path,
          },
        ],
      },
      {
        key: 'COURIER_COMMUNICATION_GROUP',
        name: 'COURIER_COMMUNICATION_GROUP',
        children: [
          {
            key: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_LIST.key,
            name: 'COURIER_COMMUNICATION_NOTIFICATION_LIST',
            path: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_LIST.path,
          },
          {
            key: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.key,
            name: 'COURIER_NOTIFICATION_SEGMENT_LIST',
            path: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.path,
          },
        ],
      },
      {
        key: 'COURIER_GAMIFICATION_TASK_GROUP',
        name: 'COURIER_GAMIFICATION_TASK_GROUP',
        children: [
          {
            key: ROUTE.COURIER_GAMIFICATION_TASK_LIST.key,
            name: 'COURIER_GAMIFICATION_TASK_LIST',
            path: ROUTE.COURIER_GAMIFICATION_TASK_LIST.path,
          },
        ],
      },
      {
        key: 'MAPS_AND_POLYGONS_MENU_GROUP',
        name: 'MAPS_AND_POLYGONS_MENU_GROUP',
        children: [
          {
            key: ROUTE.POLYGON_MAP.key,
            name: 'POLYGON_MAP',
            path: ROUTE.POLYGON_MAP.path,
          },
          {
            key: ROUTE.GIS_BANNED_AREAS.key,
            name: 'GIS_BANNED_AREAS',
            path: ROUTE.GIS_BANNED_AREAS.path,
          },
          {
            key: ROUTE.SERVICE_AVAILABILITY_AREA_LIST.key,
            name: 'SERVICE_AVAILABILITY_AREA_LIST',
            path: ROUTE.SERVICE_AVAILABILITY_AREA_LIST.path,
          },
          {
            key: ROUTE.GIS_HEATMAP.key,
            name: 'GIS_HEATMAP',
            path: ROUTE.GIS_HEATMAP.path,
          },
          {
            key: ROUTE.GIS_LOCATION_INTELLIGENCE.key,
            name: 'GIS_LOCATION_INTELLIGENCE',
            path: ROUTE.GIS_LOCATION_INTELLIGENCE.path,
          },
          {
            key: ROUTE.GIS_WEATHER_MAP.key,
            name: 'GIS_WEATHER_MAP',
            path: ROUTE.GIS_WEATHER_MAP.path,
          },
          {
            key: ROUTE.GIS_ADDRESS_SEARCH.key,
            name: 'GIS_ADDRESS_SEARCH',
            path: ROUTE.GIS_ADDRESS_SEARCH.path,
          },
          {
            key: ROUTE.GIS_COUNTRY_CITY_MANAGEMENT.key,
            name: 'GIS_COUNTRY_CITY_MANAGEMENT',
            path: ROUTE.GIS_COUNTRY_CITY_MANAGEMENT.path,
          },
        ],
      },
    ],
  },
  // MARKETING COMMERCIAL
  {
    key: 'MARKETING_COMMERCIAL_MENU_GROUP',
    name: 'MARKETING_COMMERCIAL_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'COMMUNICATION_MENU_GROUP',
        name: 'COMMUNICATION_MENU_GROUP',
        children: [
          {
            key: ROUTE.NOTIFICATION_CENTER_LIST.key,
            name: 'ANNOUNCEMENT_V2_LIST',
            path: ROUTE.NOTIFICATION_CENTER_LIST.path,
          },
          {
            key: ROUTE.PUSH_NOTIFICATION_LIST.key,
            name: 'PUSH_NOTIFICATION_LIST',
            path: ROUTE.PUSH_NOTIFICATION_LIST.path,
          },
          {
            key: ROUTE.POPUP_LIST.key,
            name: 'POPUP',
            path: ROUTE.POPUP_LIST.path,
          },
          {
            key: ROUTE.SMS_LIST.key,
            name: 'SMS',
            path: ROUTE.SMS_LIST.path,
          },
          {
            key: ROUTE.EMAIL_LIST.key,
            name: 'EMAIL',
            path: ROUTE.EMAIL_LIST.path,
          },
          {
            key: ROUTE.TRANSACTIONAL_NOTIFICATION_LIST.key,
            name: 'TRANSACTIONAL_NOTIFICATION',
            path: ROUTE.TRANSACTIONAL_NOTIFICATION_LIST.path,
          },
          {
            key: ROUTE.TRANSACTIONAL_SMS_LIST.key,
            name: 'TRANSACTIONAL_SMS',
            path: ROUTE.TRANSACTIONAL_SMS_LIST.path,
          },
          {
            key: ROUTE.COMMUNICATION_HISTORY.key,
            name: 'COMMUNICATION_HISTORY',
            path: ROUTE.COMMUNICATION_HISTORY.path,
          },
          {
            key: ROUTE.ANNOUNCEMENT_LIST.key,
            name: 'ANNOUNCEMENT',
            path: ROUTE.ANNOUNCEMENT_LIST.path,
          },
          {
            key: ROUTE.BANNER_LIST.key,
            name: 'BANNER',
            path: ROUTE.BANNER_LIST.path,
          },
          {
            key: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_LIST.key,
            name: 'COMMUNICATION_SERVICE_CREDENTIALS',
            path: ROUTE.COMMUNICATION_SERVICE_CREDENTIALS_LIST.path,
          },
          {
            key: ROUTE.COMMUNICATION_CALLBACK_URLS_LIST.key,
            name: 'COMMUNICATION_CALLBACK_URLS',
            path: ROUTE.COMMUNICATION_CALLBACK_URLS_LIST.path,
          },
          {
            key: ROUTE.COMMUNICATION_BULK_SMS_LIST.key,
            name: 'COMMUNICATION_BULK_SMS',
            path: ROUTE.COMMUNICATION_BULK_SMS_LIST.path,
          },
          {
            key: ROUTE.AUTO_SEGMENT_LIST.key,
            name: 'AUTO_SEGMENT_LIST',
            path: ROUTE.AUTO_SEGMENT_LIST.path,
          },
        ],
      },
      {
        key: ROUTE.CLIENT_TARGETING.key,
        name: 'CLIENT_TARGETING',
        path: ROUTE.CLIENT_TARGETING.path,
      },
      {
        key: ROUTE.CLIENT_LIST.key,
        name: 'CLIENT_LIST',
        path: ROUTE.CLIENT_LIST.path,
      },
      {
        key: ROUTE.CLIENT_LIST_DOUBLE_CHECKER.key,
        name: 'CLIENT_LIST_DOUBLE_CHECKER',
        path: ROUTE.CLIENT_LIST_DOUBLE_CHECKER.path,
      },
      {
        key: ROUTE.MARKETING_APPROVAL_LIST.key,
        name: 'MARKETING_APPROVAL_LIST',
        path: ROUTE.MARKETING_APPROVAL_LIST.path,
      },
      {
        key: ROUTE.CONTENT_UPLOAD_S3.key,
        name: 'CONTENT_UPLOAD_S3',
        path: ROUTE.CONTENT_UPLOAD_S3.path,
      },
      {
        key: ROUTE.CONTENT_CREATION.key,
        name: 'CONTENT_CREATION',
        path: ROUTE.CONTENT_CREATION.path,
      },
      {
        key: 'PROMOS',
        name: 'PROMOS',
        children: [
          {
            key: ROUTE.PROMO_LIST.key,
            name: 'PROMO_LIST',
            path: ROUTE.PROMO_LIST.path,
          },
          {
            key: ROUTE.PROMO_BADGES_LIST.key,
            name: 'PROMO_BADGES_LIST',
            path: ROUTE.PROMO_BADGES_LIST.path,
          },
        ],
      },
      {
        key: 'PERSONAL_PROMOS',
        name: 'PERSONAL_PROMOS',
        children: [
          {
            key: ROUTE.PERSONAL_PROMO_LIST.key,
            name: 'PERSONAL_PROMO_LIST',
            path: ROUTE.PERSONAL_PROMO_LIST.path,
          },
          {
            key: ROUTE.PERSONAL_PROMO_NEW.key,
            name: 'PERSONAL_PROMO_NEW',
            path: ROUTE.PERSONAL_PROMO_NEW.path,
          },
          {
            key: ROUTE.PERSONAL_PROMO_GENERATOR.key,
            name: 'PERSONAL_PROMO_GENERATOR',
            path: ROUTE.PERSONAL_PROMO_GENERATOR.path,
          },
        ],
      },
      {
        key: 'DISCOUNT_CODE',
        name: 'DISCOUNT_CODE',
        children: [
          {
            key: ROUTE.DISCOUNT_CODE_LIST.key,
            name: 'DISCOUNT_CODE_LIST',
            path: ROUTE.DISCOUNT_CODE_LIST.path,
          },
          {
            key: ROUTE.SEGMENTED_CODE_GENERATOR.key,
            name: 'SEGMENTED_CODE_GENERATOR',
            path: ROUTE.SEGMENTED_CODE_GENERATOR.path,
          },
        ],
      },
      {
        key: ROUTE.LOTTERY_NEW.key,
        name: 'LOTTERY_NEW',
        path: ROUTE.LOTTERY_NEW.path,
      },
      {
        key: ROUTE.AB_TEST_LIST.key,
        name: 'AB_TEST_LIST',
        path: ROUTE.AB_TEST_LIST.path,
      },
      {
        key: ROUTE.SEGMENT_LIST.key,
        name: 'SEGMENT_LIST',
        path: ROUTE.SEGMENT_LIST.path,
      },
    ],
  },
  // ALGORITHM
  {
    key: 'ALGORITHM_MENU_GROUP',
    name: 'ALGORITHM_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.ALGORITHM_CONFIG_LIST.key,
        name: 'ALGORITHM_CONFIG_MANAGEMENT',
        path: ROUTE.ALGORITHM_CONFIG_LIST.path,
      },
      {
        key: ROUTE.ALGORITHM_MARKET_DOMAIN_CONFIG_LIST.key,
        name: 'ALGORITHM_MARKET_CONFIG_MANAGEMENT',
        path: ROUTE.ALGORITHM_MARKET_DOMAIN_CONFIG_LIST.path,
      },
      {
        key: ROUTE.ALGORITHM_FOOD_DOMAIN_CONFIG_LIST.key,
        name: 'ALGORITHM_FOOD_CONFIG_MANAGEMENT',
        path: ROUTE.ALGORITHM_FOOD_DOMAIN_CONFIG_LIST.path,
      },
      {
        key: ROUTE.ALGORITHM_VOYAGER_DOMAIN_CONFIG_LIST.key,
        name: 'ALGORITHM_VOYAGER_CONFIG_MANAGEMENT',
        path: ROUTE.ALGORITHM_VOYAGER_DOMAIN_CONFIG_LIST.path,
      },
      {
        key: ROUTE.ALGORITHM_LOCALS_DOMAIN_CONFIG_LIST.key,
        name: 'ALGORITHM_LOCALS_CONFIG_MANAGEMENT',
        path: ROUTE.ALGORITHM_LOCALS_DOMAIN_CONFIG_LIST.path,
      },
    ],
  },
  // BUSINESS CONFIGS
  {
    key: 'MARKET_BUSINESS_CONFIGURATION_MENU_GROUP',
    name: 'MARKET_BUSINESS_CONFIGURATION_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.CONFIG_WORKING_HOURS.key,
        name: 'CONFIG_WORKING_HOURS',
        path: ROUTE.CONFIG_WORKING_HOURS.path,
      },
      {
        key: ROUTE.CONFIG_PEAK_HOURS.key,
        name: 'CONFIG_PEAK_HOURS',
        path: ROUTE.CONFIG_PEAK_HOURS.path,
      },
      {
        key: ROUTE.CONFIG_MOBILE_ANIMATION.key,
        name: 'CONFIG_MOBILE_ANIMATION',
        path: ROUTE.CONFIG_MOBILE_ANIMATION.path,
      },
      {
        key: ROUTE.CUSTOMER_AGREEMENT.key,
        name: 'CUSTOMER_AGREEMENT',
        path: ROUTE.CUSTOMER_AGREEMENT.path,
      },
      {
        key: ROUTE.WAREHOUSE_SEGMENT_LIST.key,
        name: 'WAREHOUSE_SEGMENT_LIST',
        path: ROUTE.WAREHOUSE_SEGMENT_LIST.path,
      },
      {
        key: ROUTE.MARKET_BUSINESS_CONFIG.key,
        name: 'MARKET_BUSINESS_CONFIG',
        path: ROUTE.MARKET_BUSINESS_CONFIG.path,
      },
    ],
  },
  // STOCK
  {
    key: 'STOCK_MENU_GROUP',
    name: 'STOCK_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.SUPPLIER_LIST.key,
        name: 'SUPPLIERS',
        path: ROUTE.SUPPLIER_LIST.path,
      },
      {
        key: ROUTE.TRANSFER_GROUP_LIST.key,
        name: 'TRANSFER_GROUPS',
        path: ROUTE.TRANSFER_GROUP_LIST.path,
      },
      {
        key: ROUTE.PICKER_LIST.key,
        name: 'PICKER_LIST',
        path: ROUTE.PICKER_LIST.path,
      },
      {
        key: ROUTE.STOCK_ORDER_VOLUME_AUTO.key,
        name: 'STOCK_ORDER_VOLUME_AUTO',
        path: ROUTE.STOCK_ORDER_VOLUME_AUTO.path,
      },
      {
        key: ROUTE.STOCK_ORDER_AUTO.key,
        name: 'STOCK_ORDER_AUTO',
        path: ROUTE.STOCK_ORDER_AUTO.path,
      },
      {
        key: ROUTE.STOCK_TRANSFER_AUTO.key,
        name: 'STOCK_TRANSFER_AUTO',
        path: ROUTE.STOCK_TRANSFER_AUTO.path,
      },
      {
        key: ROUTE.CUSTOMER_SATISFACTION_REQUEST_NEW.key,
        name: 'CUSTOMER_SATISFACTION',
        path: ROUTE.CUSTOMER_SATISFACTION_REQUEST_NEW.path,
      },
      {
        key: ROUTE.TOBB_GIB_REQUEST.key,
        name: 'TOBB_GIB_REQUEST',
        path: ROUTE.TOBB_GIB_REQUEST.path,
      },
    ],
  },
  // PLANOGRAM
  {
    key: 'PLANOGRAM_MENU_GROUP',
    name: 'PLANOGRAM_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.PLANOGRAM_PRODUCTS.key,
        name: 'PLANOGRAM_PRODUCTS',
        path: ROUTE.PLANOGRAM_PRODUCTS.path,
      },
      {
        key: ROUTE.PLANOGRAM_WAREHOUSES.key,
        name: 'PLANOGRAM_WAREHOUSES',
        path: ROUTE.PLANOGRAM_WAREHOUSES.path,
      },
    ],
  },
  // WRITE OFF
  {
    key: 'WRITE_OFF_MENU_GROUP',
    name: 'WRITE_OFF_MENU_GROUP',
    children: [
      {
        key: ROUTE.LOCATION_WRITE_OFF_LIST.key,
        name: 'LOCATION_WRITE_OFF_LIST',
        path: ROUTE.LOCATION_WRITE_OFF_LIST.path,
      },
    ],
  },
  // OPERATION - WAREHOUSE & FRANCHISE
  // GETIRMARKET
  {
    key: 'MARKET_MENU_GROUP',
    name: 'MARKET_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'MARKET_PRODUCT_MENU_GROUP',
        name: 'MARKET_PRODUCT_MENU_GROUP',
        children: [
          {
            key: ROUTE.MARKET_PRODUCT_LIST.key,
            name: 'MARKET_PRODUCTS',
            path: ROUTE.MARKET_PRODUCT_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_CATEGORY_LIST.key,
            name: 'MARKET_PRODUCT_CATEGORIES',
            path: ROUTE.MARKET_PRODUCT_CATEGORY_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_CATEGORY_SORT.key,
            name: 'MARKET_PRODUCT_CATEGORY_SORT',
            path: ROUTE.MARKET_PRODUCT_CATEGORY_SORT.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.key,
            name: 'MARKET_PRODUCT_CATEGORY_CATEGORY_VISIBILITY_LIST',
            path: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_LIST.key,
            name: 'MARKET_PRODUCT_MASTER_CATEGORIES',
            path: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_GROUP_LIST.key,
            name: 'MARKET_PRODUCT_GROUPS',
            path: ROUTE.MARKET_PRODUCT_GROUP_LIST.path,
          },
          {
            key: ROUTE.BRAND_LIST.key,
            name: 'BRANDS',
            path: ROUTE.BRAND_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_BADGE_LIST.key,
            name: 'MARKET_PRODUCT_BADGES',
            path: ROUTE.MARKET_PRODUCT_BADGE_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_PRICING_LIST.key,
            name: 'MARKET_PRODUCT_PRICING_LIST',
            path: ROUTE.MARKET_PRODUCT_PRICING_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_FAMILY_LIST.key,
            name: 'MARKET_PRODUCT_FAMILY_LIST',
            path: ROUTE.MARKET_PRODUCT_FAMILY_LIST.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_RECIPES.key,
            name: 'MARKET_PRODUCT_RECIPES',
            path: ROUTE.MARKET_PRODUCT_RECIPES.path,
          },
          {
            key: ROUTE.MARKET_PRODUCT_RECIPES_SORT.key,
            name: 'MARKET_PRODUCT_RECIPES_SORT',
            path: ROUTE.MARKET_PRODUCT_RECIPES_SORT.path,
          },
        ],
      },
      {
        key: ROUTE.GETIR_MARKET_DASHBOARD.key,
        name: 'DASHBOARD',
        path: ROUTE.GETIR_MARKET_DASHBOARD.path,
      },
      {
        key: ROUTE.GETIR_MARKET_LIVE_MAP.key,
        name: 'LIVE_MAP',
        path: ROUTE.GETIR_MARKET_LIVE_MAP.path,
      },
      {
        key: 'ORDER',
        name: 'ORDER',
        children: [
          {
            key: ROUTE.GETIR_MARKET_ORDER_RATINGS.key,
            name: 'GETIR_MARKET_ORDER_RATINGS',
            path: ROUTE.GETIR_MARKET_ORDER_RATINGS.path,
          },
          {
            key: ROUTE.GETIR_MARKET_FRAUD_SUSPICION_ORDERS.key,
            name: 'GETIR_MARKET_FRAUD_SUSPICION_ORDERS',
            path: ROUTE.GETIR_MARKET_FRAUD_SUSPICION_ORDERS.path,
          },
          {
            key: ROUTE.GETIR_MARKET_ORDER_FILTER.key,
            name: 'GETIR_MARKET_ORDER_FILTER',
            path: ROUTE.GETIR_MARKET_ORDER_FILTER.path,
          },
          {
            key: ROUTE.MISSING_PRODUCT_ORDERS.key,
            name: 'MISSING_PRODUCT_ORDERS',
            path: ROUTE.MISSING_PRODUCT_ORDERS.path,
          },
          {
            key: ROUTE.GETIR_MARKET_BAG_CONSTRAINTS.key,
            name: 'GETIR_MARKET_BAG_CONSTRAINTS',
            path: ROUTE.GETIR_MARKET_BAG_CONSTRAINTS.path,
          },
          {
            key: ROUTE
              .MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD.key,
            name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD',
            path: ROUTE
              .MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD
              .path,
          },
          {
            key: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT.key,
            name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT',
            path: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT
              .path,
          },
          {
            key: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_GROWTH.key,
            name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_GROWTH',
            path: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_GROWTH.path,
          },
          {
            key: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION.key,
            name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION',
            path: ROUTE.MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION.path,
          },
          {
            key: ROUTE
              .MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES.key,
            name: 'MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES',
            path: ROUTE
              .MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES.path,
          },
          {
            key: ROUTE.MARKET_FEES_BULK_UPLOAD.key,
            name: 'MARKET_FEES_BULK_UPLOAD',
            path: ROUTE.MARKET_FEES_BULK_UPLOAD.path,
          },
        ],
      },
      {
        key: 'MARKET_BASKET_MENU_GROUP',
        name: 'MARKET_BASKET_MENU_GROUP',
        children: [
          {
            key: ROUTE.MARKET_BASKET_LIST.key,
            name: 'MARKET_BASKET_LIST',
            path: ROUTE.MARKET_BASKET_LIST.path,
          },
        ],
      },
      {
        key: 'CUSTOMER_MENU_GROUP',
        name: 'CUSTOMER_MENU_GROUP',
        children: [
          {
            key: ROUTE.LLM_AGENT_GUIDANCE_GENERATION.key,
            name: 'LLM_AGENT_GUIDANCE_GENERATION',
            path: ROUTE.LLM_AGENT_GUIDANCE_GENERATION.path,
          },
        ],
      },
    ],
  },
  // MARKET PRODUCT CHAIN MANAGEMENT
  {
    key: 'CHAIN_MANAGEMENT_MENU_GROUP',
    name: 'CHAIN_MANAGEMENT_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST.key,
        name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST',
        path: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST.path,
      },
      {
        key: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST.key,
        name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST',
        path: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST.path,
      },
      {
        key: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST.key,
        name: 'MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST',
        path: ROUTE.MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST.path,
      },
    ],
  },
  // COMMERCE INTELLIGENCE
  {
    key: 'COMMERCE_INTELLIGENCE_MENU_GROUP',
    name: 'COMMERCE_INTELLIGENCE_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.COMMERCE_INTELLIGENCE_PRODUCT_MATCHING.key,
        name: 'COMMERCE_INTELLIGENCE_PRODUCT_MATCHING',
        path: ROUTE.COMMERCE_INTELLIGENCE_PRODUCT_MATCHING.path,
      },
      {
        key: 'COMMERCE_INTELLIGENCE_SMART_PRICING',
        name: 'COMMERCE_INTELLIGENCE_SMART_PRICING',
        type: MENU_TYPE_GROUP,
        children: [
          {
            key: ROUTE.COMMERCE_INTELLIGENCE_SMART_PRICING_INDEX.key,
            name: 'COMMERCE_INTELLIGENCE_SMART_PRICING_INDEX',
            path: ROUTE.COMMERCE_INTELLIGENCE_SMART_PRICING_INDEX.path,
          },
        ],
      },
    ],
  },
  // N11
  {
    key: 'N11_MENU_GROUP',
    name: 'N11_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'order',
        name: 'order',
        children: [
          {
            key: ROUTE.N11_ORDER_FILTER.key,
            name: 'N11_ORDER_FILTER',
            path: ROUTE.N11_ORDER_FILTER.path,
          },
        ],
      },
    ],
  },
  // GETIRFOOD
  {
    key: 'GETIR_FOOD',
    name: 'GETIR_FOOD',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.FOOD_LIVE_MAP.key,
        name: 'GETIR_FOOD_LIVE_MAP',
        path: ROUTE.FOOD_LIVE_MAP.path,
      },
      {
        key: ROUTE.GETIR_FOOD_ORDER_ACTIVE.key,
        name: 'ACTIVE_ORDERS',
        path: ROUTE.GETIR_FOOD_ORDER_ACTIVE.path,
      },
      {
        key: ROUTE.GETIR_FOOD_ORDER_FILTER.key,
        name: 'ORDER_FILTER',
        path: ROUTE.GETIR_FOOD_ORDER_FILTER.path,
      },
      {
        key: ROUTE.GETIR_FOOD_ORDER_SUMMARY.key,
        name: 'GETIR_FOOD_ORDER_SUMMARY',
        path: ROUTE.GETIR_FOOD_ORDER_SUMMARY.path,
      },
      {
        key: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2.key,
        name: 'GETIR_FOOD_FINANCIAL_DASHBOARD_V2',
        path: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2.path,
      },
      {
        key: ROUTE.GETIR_FOOD_MEAL_CARD_RECONCILIATION.key,
        name: 'GETIR_FOOD_MEAL_CARD_RECONCILIATION',
        path: ROUTE.GETIR_FOOD_MEAL_CARD_RECONCILIATION.path,
      },
      {
        key: ROUTE.GETIR_FOOD_ERP_DATA_TRACKING_V2.key,
        name: 'GETIR_FOOD_ERP_DATA_TRACKING_V2',
        path: ROUTE.GETIR_FOOD_ERP_DATA_TRACKING_V2.path,
      },
      {
        key: ROUTE.GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION.key,
        name: 'GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION',
        path: ROUTE.GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION.path,
      },
      {
        key: ROUTE.GETIR_FOOD_RESTAURANT_PAYBACK_STATUS.key,
        name: 'GETIR_FOOD_RESTAURANT_PAYBACK_STATUS',
        path: ROUTE.GETIR_FOOD_RESTAURANT_PAYBACK_STATUS.path,
      },
      {
        key: ROUTE.GETIR_FOOD_FINANCIAL_CONFIGS.key,
        name: 'GETIR_FOOD_FINANCIAL_CONFIGS',
        path: ROUTE.GETIR_FOOD_FINANCIAL_CONFIGS.path,
      },
      {
        key: ROUTE.GETIR_FOOD_WITHHOLDING_TAX_REPORTS.key,
        name: 'GETIR_FOOD_WITHHOLDING_TAX_REPORTS',
        path: ROUTE.GETIR_FOOD_WITHHOLDING_TAX_REPORTS.path,
      },
    ],
  },
  // GETIRLOCALS
  {
    key: 'ARTISAN_ORDER',
    name: 'GETIR_ARTISAN',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.ARTISAN_ORDER_LIVE_MAP.key,
        name: 'LIVE_MAP',
        path: ROUTE.ARTISAN_ORDER_LIVE_MAP.path,
      },
      {
        key: ROUTE.ARTISAN_ORDER_ACTIVE.key,
        name: 'ACTIVE_ORDERS',
        path: ROUTE.ARTISAN_ORDER_ACTIVE.path,
      },
      {
        key: ROUTE.GETIR_LOCALS_RETURN_LIST.key,
        name: 'GETIR_LOCALS_RETURN_LIST',
        path: ROUTE.GETIR_LOCALS_RETURN_LIST.path,
      },
      {
        key: ROUTE.ARTISAN_ORDER_FILTER.key,
        name: 'ORDER_FILTER',
        path: ROUTE.ARTISAN_ORDER_FILTER.path,
      },
      {
        key: ROUTE.GL_GROWTH_COMPARISON.key,
        name: 'GL_GROWTH_COMPARISON',
        path: ROUTE.GL_GROWTH_COMPARISON.path,
      },
      {
        key: ROUTE.GL_RETURN_ALERT.key,
        name: 'GL_RETURN_ALERT',
        path: ROUTE.GL_RETURN_ALERT.path,
      },
      {
        key: ROUTE.GL_RUNNER_LIST.key,
        name: 'GL_RUNNER_LIST',
        path: ROUTE.GL_RUNNER_LIST.path,
      },
      {
        key: ROUTE.LOCALS_LIVE_MONITORING_COURIER.key,
        name: 'LOCALS_LIVE_MONITORING_COURIER',
        path: ROUTE.LOCALS_LIVE_MONITORING_COURIER.path,
      },
      {
        key: ROUTE.GL_ERP_DATA_TRACKING.key,
        name: 'GL_ERP_DATA_TRACKING',
        path: ROUTE.GL_ERP_DATA_TRACKING.path,
      },
      {
        key: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.key,
        name: 'GL_SHOP_EXTERNAL_TRANSACTION',
        path: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.path,
      },
      {
        key: ROUTE.GL_SHOP_PAYBACK_STATUS.key,
        name: 'GL_SHOP_PAYBACK_STATUS',
        path: ROUTE.GL_SHOP_PAYBACK_STATUS.path,
      },
      {
        key: ROUTE.GETIR_LOCALS_WITHHOLDING_TAX_REPORTS.key,
        name: 'GETIR_LOCALS_WITHHOLDING_TAX_REPORTS',
        path: ROUTE.GETIR_LOCALS_WITHHOLDING_TAX_REPORTS.path,
      },
    ],
  },
  // GETIRWATER
  {
    key: 'GETIR_WATER',
    name: 'GETIR_WATER',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.GETIR_WATER_COURIER_STATUS.key,
        name: 'GETIR_WATER_COURIER_STATUS',
        path: ROUTE.GETIR_WATER_COURIER_STATUS.path,
      },
      {
        key: ROUTE.GETIR_WATER_CAMPAIGNS_LIST.key,
        name: 'GETIR_WATER_CAMPAIGNS',
        path: ROUTE.GETIR_WATER_CAMPAIGNS_LIST.path,
      },
      {
        key: ROUTE.GETIR_WATER_ACTIVE_ORDERS.key,
        name: 'GETIR_WATER_ACTIVE_ORDERS',
        path: ROUTE.GETIR_WATER_ACTIVE_ORDERS.path,
      },
      {
        key: ROUTE.GETIR_WATER_ORDER_FILTER.key,
        name: 'GETIR_WATER_ORDER_FILTER',
        path: ROUTE.GETIR_WATER_ORDER_FILTER.path,
      },
      {
        key: ROUTE.GETIR_WATER_VENDOR_FILTER.key,
        name: 'GETIR_WATER_VENDOR_FILTER',
        path: ROUTE.GETIR_WATER_VENDOR_FILTER.path,
      },
      {
        key: ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST.key,
        name: 'GETIR_WATER_ANNOUNCEMENTS',
        path: ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST.path,
        allowed: [],
      },
      {
        key: ROUTE.GETIR_WATER_SLOT_CONFIG.key,
        name: 'GETIR_WATER_SLOT_CONFIG',
        path: ROUTE.GETIR_WATER_SLOT_CONFIG.path,
      },
    ],
  },
  // FINANCE ORDER
  {
    key: 'GETIR_FINANCE_MENU_GROUP',
    name: 'GETIR_FINANCE_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.GETIR_FINANCE_ORDER_FILTER.key,
        name: 'GETIR_FINANCE_ORDER_FILTER',
        path: ROUTE.GETIR_FINANCE_ORDER_FILTER.path,
      },
    ],
  },
  // GETIRDRIVE
  {
    key: 'GETIR_DRIVE_MENU_GROUP',
    name: 'GETIR_DRIVE_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.GETIR_DRIVE_DASHBOARD.key,
        name: 'GETIR_DRIVE_DASHBOARD',
        path: ROUTE.GETIR_DRIVE_DASHBOARD.path,
      },
    ],
  },
  // PAYMENT SERVICES
  {
    key: 'PAYMENT_SERVICES',
    name: 'PAYMENT_SERVICES',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: 'ONLINE_PAYMENT_RECONCILIATIONS',
        name: 'ONLINE_PAYMENT_RECONCILIATIONS',
        children: [
          {
            key: ROUTE.BANK_RECONCILIATION_REPORT.key,
            name: 'BANK_RECONCILIATION_REPORT',
            path: ROUTE.BANK_RECONCILIATION_REPORT.path,
          },
          {
            key: ROUTE.RECONCILIATION_DAILY_REPORT.key,
            name: 'RECONCILIATION_DAILY_REPORT',
            path: ROUTE.RECONCILIATION_DAILY_REPORT.path,
          },
          {
            key: ROUTE.PAYOUTS_FOR_DOMAINS.key,
            name: 'PAYOUTS_FOR_DOMAINS',
            path: ROUTE.PAYOUTS_FOR_DOMAINS.path,
          },
          {
            key: ROUTE.PAYOUTS_TRANSACTIONS_FOR_DOMAINS.key,
            name: 'PAYOUTS_TRANSACTIONS_FOR_DOMAINS',
            path: ROUTE.PAYOUTS_TRANSACTIONS_FOR_DOMAINS.path,
          },
          {
            key: ROUTE.BANK_RECONCILIATION_SUMMARY.key,
            name: 'BANK_RECONCILIATION_SUMMARY',
            path: ROUTE.BANK_RECONCILIATION_SUMMARY.path,
          },
        ],
      },
      {
        key: 'PAY_IN',
        name: 'PAY_IN',
        children: [
          {
            key: ROUTE.PAYMENT_MERCHANT_LIST.key,
            name: 'PAYMENT_MERCHANT_LIST',
            path: ROUTE.PAYMENT_MERCHANT_LIST.path,
          },
          {
            key: ROUTE.PAYMENT_TRANSACTION_LIST.key,
            name: 'PAYMENT_TRANSACTION_LIST',
            path: ROUTE.PAYMENT_TRANSACTION_LIST.path,
          },
          {
            key: ROUTE.INSTALLMENT_COMMISSIONS.key,
            name: 'INSTALLMENTS',
            path: ROUTE.INSTALLMENT_COMMISSIONS.path,
          },
        ],
      },
      {
        key: 'PAY_OUT',
        name: 'PAY_OUT',
        children: [
          {
            key: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_LIST.key,
            name: 'TIP_PAYBACK_PAYOUT_SUMMARY_LIST',
            path: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_LIST.path,
          },
        ],
      },
      {
        key: 'FRAUD',
        name: 'FRAUD',
        children: [
          {
            key: ROUTE.PAYMENT_FRAUD_CONTROL_LIST.key,
            name: 'PAYMENT_FRAUD_CONTROL_LIST',
            path: ROUTE.PAYMENT_FRAUD_CONTROL_LIST.path,
          },

          {
            key: ROUTE.SEGMENT_FRAUD_MANAGEMENT.key,
            name: 'SEGMENT_FRAUD_MANAGEMENT',
            path: ROUTE.SEGMENT_FRAUD_MANAGEMENT.path,
          },
        ],
      },
    ],
  },
  // COMPANY
  {
    key: 'COMPANY_MENU_GROUP',
    name: 'COMPANY',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.COMPANY_KPI_DICTIONARY.key,
        name: 'COMPANY_KPI_DICTIONARY',
        path: ROUTE.COMPANY_KPI_DICTIONARY.path,
      },
      {
        key: 'EMPLOYEE_LIST',
        name: 'EMPLOYEE_LIST',
        children: [
          {
            key: ROUTE.EMPLOYEE_LIST.key,
            name: 'EMPLOYEE_LIST',
            path: ROUTE.EMPLOYEE_LIST.path,
          },
          {
            key: ROUTE.EMPLOYEE_LOGS.key,
            name: 'EMPLOYEE_LOGS',
            path: ROUTE.EMPLOYEE_LOGS.path,
          },
        ],
      },
      {
        key: ROUTE.EMPLOYEE_HOME.key,
        name: 'EMPLOYEE_HOME',
        path: ROUTE.EMPLOYEE_HOME.path,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_PRO',
        name: 'GETIR_PRO',
        path: GETIR_PRO,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GEMU',
        name: 'GEMU',
        path: GEMU,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GEMINI',
        name: 'GEMINI',
        path: GEMINI,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: ROUTE.EMPLOYEE_ASSET_LIST.key,
        name: 'ASSET_LIST',
        children: [
          {
            key: ROUTE.EMPLOYEE_ASSET_LIST.key,
            name: 'ASSET_LIST',
            path: ROUTE.EMPLOYEE_ASSET_LIST.path,
          },
          {
            key: ROUTE.ASSET_MANAGEMENT_LIST.key,
            name: 'ASSET_MANAGEMENT_COMPANY_CAR_LIST',
            path: ROUTE.ASSET_MANAGEMENT_LIST.path,
          },
        ],
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_GROW',
        name: 'GETIR_GROW',
        path: GETIR_GROW_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_BUY',
        name: 'GETIR_BUY',
        path: ENVIRONMENT.GETIR_BUY_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_UP',
        name: 'GETIR_UP',
        path: GETIR_UP_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_NEXT',
        name: 'GETIR_NEXT',
        path: GETIR_NEXT_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_GETIR_HUB',
        name: 'GETIR_HUB',
        path: GETIR_HUB_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
      {
        key: 'MENU_EXTERNAL_LINKS_COMPONENT_IT_HELP_DESK',
        name: 'IT_HELP_DESK',
        path: IT_HELP_DESK_URL,
        isExternal: true,
        // isGloballyAllowed: true,
      },
    ],
  },
  // Mentor - Mentee
  {
    key: 'MENTOR_MENTEE_MENU_GROUP',
    name: 'MENTOR_MENTEE_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.MENTORSHIP_PROFILE.key,
        name: 'MENTORSHIP_PROFILE',
        path: ROUTE.MENTORSHIP_PROFILE.path,
      },
      {
        key: ROUTE.MENTORSHIP_SEARCH.key,
        name: 'MENTORSHIP_SEARCH',
        path: ROUTE.MENTORSHIP_SEARCH.path,
      },
    ],
  },
  // DATA PANEL
  {
    key: 'DATA_PANEL_MENU_GROUP',
    name: 'DATA_PANEL_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.ON_OFF_PROMO_CONFIG.key,
        name: 'ON_OFF_PROMO_CONFIG',
        path: ROUTE.ON_OFF_PROMO_CONFIG.path,
      },
      {
        key: 'PRICING_GROUP',
        name: 'PRICING',
        children: [
          {
            key: ROUTE.PRICING_TOOL.key,
            name: 'PRICING_TOOL',
            path: ROUTE.PRICING_TOOL.path,
          },
        ],
      },
      {
        key: ROUTE.AB_TEST_V2_LIST.key,
        name: 'AB_TEST_V2_LIST',
        path: ROUTE.AB_TEST_V2_LIST.path,
      },
      {
        key: ROUTE.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS.key,
        name: 'AUTO_GROWTH',
        path: ROUTE.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS.path,
      },
      {
        key: 'MARKET_INTELLIGENCE_GROUP',
        name: 'MARKET_INTELLIGENCE',
        children: [
          {
            key: ROUTE.MARKET_INTELLIGENCE_PRICE_INDEX.key,
            name: 'MARKET_INTELLIGENCE_PRICE_INDEX',
            path: ROUTE.MARKET_INTELLIGENCE_PRICE_INDEX.path,
          },
          {
            key: ROUTE.MARKET_INTELLIGENCE_PRODUCTS.key,
            name: 'MARKET_INTELLIGENCE_PRODUCTS',
            path: ROUTE.MARKET_INTELLIGENCE_PRODUCTS.path,
          },
          {
            key: ROUTE.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION.key,
            name: 'MARKET_INTELLIGENCE_PRICE_RECOMMENDATION',
            path: ROUTE.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION.path,
          },
        ],
      },
    ],
  },
  // TECH DEPARTMENT
  {
    key: 'TECH_DEPARTMENT_MENU_GROUP',
    name: 'TECH_DEPARTMENT_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.CONFIG_LIST.key,
        name: 'CONFIG_LIST',
        path: ROUTE.CONFIG_LIST.path,
      },
      {
        key: ROUTE.THIRD_PARTY_COMPANY_LIST.key,
        name: 'THIRD_PARTY_COMPANY_LIST',
        path: ROUTE.THIRD_PARTY_COMPANY_LIST.path,
      },
      {
        key: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_HOME.key,
        name: 'TECHNOLOGY_COMPLIANCE_REPORT_HOME',
        path: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_HOME.path,
      },
      {
        key: ROUTE.INTERNAL_AUTHENTICATION_TEAM_LIST.key,
        name: 'INTERNAL_AUTHENTICATION_TEAM_LIST',
        path: ROUTE.INTERNAL_AUTHENTICATION_TEAM_LIST.path,
      },
      {
        key: ROUTE.SEGMENT_LIST.key,
        name: 'SEGMENT_LIST',
        path: ROUTE.SEGMENT_LIST.path,
      },
    ],
  },
  // ADMIN PLATFORM
  {
    key: 'ADMIN_PLATFORM_MENU_GROUP',
    name: 'ADMIN_PLATFORM_MENU_GROUP',
    type: MENU_TYPE_GROUP,
    children: [
      {
        key: ROUTE.PAGE_LIST.key,
        name: 'PAGES',
        path: ROUTE.PAGE_LIST.path,
      },
      {
        key: ROUTE.USER_LIST.key,
        name: 'USERS',
        path: ROUTE.USER_LIST.path,
      },
      {
        key: ROUTE.ROLE_LIST.key,
        name: 'ROLES',
        path: ROUTE.ROLE_LIST.path.replace(
          ':tabId',
          ROLE_LIST_TAB_PANE_KEY.ALL_ROLES,
        ),
      },
      {
        key: ROUTE.USER_WEBHELP_MATCHING.key,
        name: 'USER_WEBHELP_MATCHING',
        path: ROUTE.USER_WEBHELP_MATCHING.path,
      },
      {
        key: ROUTE.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT.key,
        name: 'EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT',
        path: ROUTE.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT.path,
      },
      {
        key: ROUTE.PANEL_DOC_SEARCH.key,
        name: 'PANEL_DOC_SEARCH',
        path: ROUTE.PANEL_DOC_SEARCH.path,
        domId: 'panel_doc_search_menu_item',
      },
    ],
  },
];

export default menus;
