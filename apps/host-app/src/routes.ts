import { TECH_SQUADS } from '@shared/shared/constants';
import history from '@shared/utils/history';

export const ROUTE_MAP = {
  HEALTH: {
    path: '/health',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Health',
  },
  LOGIN: {
    path: '/login',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Login',
  },
  LOGOUT: {
    path: '/logout',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Logout',
  },
  COUNTRY_SELECTION: {
    path: '/countrySelection',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Country Selection',
  },
  NOT_FOUND: {
    path: '/notFound',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Not Found',
  },
  PERSONAL_PROMO_GENERATOR: {
    path: '/personalPromo/generator',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Personal promo generator',
  },
  EXCLUDE_PROMO_PRODUCTS: {
    path: '/excludePromoProducts',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Exclude Promo Products',
  },
  HOME: {
    path: '/',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Home',
    isGlobal: true,
  },
  TRANSFER_GROUP_LIST: {
    path: '/transferGroup/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.TRANSPORTATION,
    name: 'Transfer Group List',
  },
  TRANSFER_GROUP_NEW: {
    path: '/transferGroup/new',
    squad: TECH_SQUADS.SUPPLY.STOCK.TRANSPORTATION,
    name: 'Transfer Group New',
  },
  TRANSFER_GROUP_DETAIL: {
    path: '/transferGroup/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.TRANSPORTATION,
    name: 'Transfer Group Detail',
    menuPath: '/transferGroup/list',
  },
  SUPPLIER_LIST: {
    path: '/supplier/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.PROCUREMENT,
    name: 'Supplier List',
  },
  SUPPLIER_NEW: {
    path: '/supplier/new',
    squad: TECH_SQUADS.SUPPLY.STOCK.PROCUREMENT,
    name: 'Supplier New',
  },
  SUPPLIER_DETAIL: {
    path: '/supplier/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.PROCUREMENT,
    name: 'Supplier Detail',
    menuPath: '/supplier/list',
  },
  PAGE_LIST: {
    path: '/page/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Page List',
  },
  PAGE_NEW: {
    path: '/page/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Page New',
    menuPath: '/page/list',
  },
  PAGE_DETAIL: {
    path: '/page/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Page Detail',
    menuPath: '/page/list',
  },
  PANEL_DOC_SEARCH: {
    path: '/panelDoc/search',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Panel Doc Search',
  },
  PANEL_DOC_DETAIL: {
    path: '/panelDoc/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Panel Doc Detail',
    menuPath: '/panelDoc/search',
  },
  PANEL_DOC_PREVIEW: {
    path: '/panelDoc/detail/:id/preview',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Panel Doc Preview',
    menuPath: '/panelDoc/search',
  },
  USER_LIST: {
    path: '/user/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'User List',
  },
  USER_WEBHELP_MATCHING: {
    path: '/user/webhelpMatching',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'User Webhelp Matching',
  },
  USER_NEW: {
    path: '/user/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'User New',
    menuPath: '/user/list',
  },
  USER_DETAIL: {
    path: '/user/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'User Detail',
    menuPath: '/user/list',
  },
  EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT: {
    path: '/user/externalCustomerServicesPanelAccountManagement',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'External Customer Services Panel Account Management',
  },
  COMPANY_KPI_DICTIONARY: {
    path: '/company/kpiDictionary',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'KPI Dictionary',
  },
  ROLE_HIERARCHY: {
    path: '/role/hierarchy',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Role Hierarchy',
    menuPath: '/role/list/allRoles',
  },
  ROLE_LIST: {
    path: '/role/list/:tabId',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Role List',
    menuPath: '/role/list/allRoles',
  },
  ROLE_NEW: {
    path: '/role/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Role New',
    menuPath: '/role/list/allRoles',
  },
  ROLE_DETAIL: {
    path: '/role/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Role Detail',
    menuPath: '/role/list/allRoles',
  },
  COMPONENT_NEW: {
    path: '/component/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Component New',
    menuPath: '/page/list',
  },
  COMPONENT_DETAIL: {
    path: '/component/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Component Detail',
    menuPath: '/page/list',
  },
  BRAND_LIST: {
    path: '/brand/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Brand List',
  },
  BRAND_NEW: {
    path: '/brand/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Brand New',
    menuPath: '/brand/list',
  },
  BRAND_DETAIL: {
    path: '/brand/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Brand Detail',
    menuPath: '/brand/list',
  },
  MARKET_PRODUCT_LIST: {
    path: '/marketProduct/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product List',
  },
  MARKET_PRODUCT_DETAIL: {
    path: '/marketProduct/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Detail',
    menuPath: '/marketProduct/list',
  },
  MARKET_PRODUCT_DETAILV2: {
    path: '/marketProduct/detailV2/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product DetailV2',
    menuPath: '/marketProduct/list',
  },
  MARKET_PRODUCT_PRICING_LIST: {
    path: '/marketProduct/pricing/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Market Product Pricing List',
    menuPath: '/marketProduct/pricing/list',
  },
  MARKET_PRODUCT_PRICING_DETAIL: {
    path: '/marketProduct/pricing/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Market Product Pricing Detail',
    menuPath: '/marketProduct/pricing/list',
  },
  MARKET_PRODUCT_PRICING_DISCOUNTED_DETAIL: {
    path: '/marketProduct/pricing/discounted/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Market Product Discounted Pricing Detail',
    menuPath: '/marketProduct/pricing/list',
  },
  MARKET_PRODUCT_FAMILY_LIST: {
    path: '/marketProduct/family/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Market Product Family List',
    menuPath: '/marketProduct/family/list',
  },
  MARKET_PRODUCT_RECIPES: {
    path: '/marketProduct/recipes',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Recipes',
    menuPath: '/marketProduct/recipes',
  },
  MARKET_PRODUCT_RECIPES_DETAIL: {
    path: '/marketProduct/recipes/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Recipe Detail',
  },
  MARKET_PRODUCT_RECIPES_SORT: {
    path: '/marketProduct/recipes/sort/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Recipes Sort',
  },
  MARKET_PRODUCT_FAMILY_DETAIL: {
    path: '/marketProduct/family/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Market Product Family Detail',
    menuPath: '/marketProduct/family/list',
  },
  MARKET_PRODUCT_SORT: {
    path: '/marketProduct/sort/:subCategoryId',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Sort',
  },
  MARKET_PRODUCT_CATEGORY_LIST: {
    path: '/marketProduct/category/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category List',
  },
  MARKET_PRODUCT_CATEGORY_NEW: {
    path: '/marketProduct/category/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category New',
  },
  MARKET_PRODUCT_CATEGORY_DETAIL: {
    path: '/marketProduct/category/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category Detail',
    menuPath: '/marketProduct/category/list',
  },
  MARKET_PRODUCT_CATEGORY_SORT: {
    path: '/marketProduct/category/sort',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category Sort',
  },
  MARKET_PRODUCT_SUB_CATEGORY_SORT: {
    path: '/marketProduct/subcategory/sort/:categoryId',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Sub Category Sort',
  },
  MARKET_PRODUCT_BADGE_LIST: {
    path: '/marketProduct/badge/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Badge List',
  },
  MARKET_PRODUCT_BADGE_NEW: {
    path: '/marketProduct/badge/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Badge New',
  },
  MARKET_PRODUCT_BADGE_DETAIL: {
    path: '/marketProduct/badge/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Badge Detail',
    menuPath: '/marketProduct/badge/list',
  },
  MARKET_PRODUCT_GROUP_LIST: {
    path: '/marketProduct/group/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Group List',
  },
  MARKET_PRODUCT_GROUP_NEW: {
    path: '/marketProduct/group/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Group New',
  },
  MARKET_PRODUCT_GROUP_DETAIL: {
    path: '/marketProduct/group/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Group Detail',
    menuPath: '/marketProduct/group/list',
  },
  MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST: {
    path: '/marketProduct/category/visibility/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category Visibility List',
  },
  MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL: {
    path: '/marketProduct/category/visibility/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category Visibility Detail',
    menuPath: '/marketProduct/category/visibility/list',
  },
  MARKET_PRODUCT_CATEGORY_VISIBILITY_NEW: {
    path: '/marketProduct/category/visibility/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Category Visibility New',
  },
  MARKET_PRODUCT_MASTER_CATEGORY_LIST: {
    path: '/marketProduct/masterCategory/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Master Category List',
  },
  MARKET_PRODUCT_MASTER_CATEGORY_DETAIL: {
    path: '/marketProduct/masterCategory/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Master Category Detail',
    menuPath: '/marketProduct/masterCategory/list',
  },
  MARKET_PRODUCT_MASTER_CATEGORY_NEW: {
    path: '/marketProduct/masterCategory/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PRODUCT_METADATA,
    name: 'Market Product Master Category New',
  },
  ARTISAN_ORDER_FILTER: {
    path: '/artisanOrder/filter',
    squad: TECH_SQUADS.DEMAND.LOCALS.SIMPLICITY,
    name: 'Artisan Order Filter',
  },
  WAREHOUSE_LIST: {
    path: '/warehouse/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Warehouse List',
  },
  WAREHOUSE_DETAIL: {
    path: '/warehouse/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Warehouse Detail',
    menuPath: '/warehouse/list',
  },
  WAREHOUSE_NEW: {
    path: '/warehouse/new',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Warehouse New',
  },
  WAREHOUSE_LIVE_MAP: {
    path: '/warehouse/liveMap/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Warehouse Based Live Map',
  },
  DELIVERY_FEE_BULK_UPLOAD: {
    path: '/deliveryFee/bulkUpload',
    name: 'Delivery Fee Bulk Upload',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
  },
  SERVICE_FEE_BULK_UPLOAD: {
    path: '/serviceFee/bulkUpload',
    name: 'Service Fee Bulk Upload',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
  },
  WAREHOUSE_PROPOSAL_LIST: {
    path: '/warehouseProposal/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Warehouse Proposal List',
  },
  WAREHOUSE_PROPOSAL_DETAIL: {
    path: '/warehouseProposal/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Warehouse Proposal Detail',
    menuPath: '/warehouseProposal/list',
  },
  WAREHOUSE_PROPOSAL_CREATE: {
    path: '/warehouseProposal/create',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Warehouse Proposal Create',
    menuPath: '/warehouseProposal/create',
  },
  EMPLOYEE_NEW: {
    path: '/employee/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee New',
  },
  EMPLOYEE_LIST: {
    path: '/employee/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee List',
  },
  EMPLOYEE_HOME: {
    path: '/employee/leaveAndHolidays',
    name: 'Employee Home',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
  },
  EMPLOYEE_PERMIT_LIST: {
    path: '/employee/leave/list',
    name: 'Employee Permit List',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
  },
  EMPLOYEE_DETAIL: {
    path: '/employee/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee Detail',
    menuPath: '/employee/list',
  },
  EMPLOYEE_DETAIL_ASSET_LIST: {
    path: '/employee/detail/:id/asset/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Asset List of an Employee',
  },
  EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT: {
    path: '/employee/officeAttendanceTracking/capacityManagement',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee Office Attendance Tracking Capacity Management',
  },
  EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD: {
    path: '/employee/officeAttendanceTracking/dashboard',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee Office Attendance Tracking Dashboard',
  },
  EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS: {
    path: '/employee/officeAttendanceTracking/:employeeId/transactions',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee Office Attendance Tracking Transactions of an Employee',
  },
  EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_TREND: {
    path: '/employee/officeAttendanceTracking/trend',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Employee Office Attendance Tracking Trend',
  },
  EMPLOYEE_LOGS: {
    path: '/employee/logs',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Employee Logs',
  },
  COURIER_DETAIL: {
    path: '/courier/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Courier Detail',
    menuPath: '/courier/list',
  },
  COURIER_COMMUNICATION_NOTIFICATION_LIST: {
    path: '/courier/communication/notification/list',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Communication Notification List',
  },
  COURIER_COMMUNICATION_CREATE_NOTIFICATION: {
    path: '/courier/communication/create/notification',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Communication Create Notification',
  },
  COURIER_COMMUNICATION_NOTIFICATION_DETAIL: {
    path: '/courier/communication/notification/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Communication Notification Detail',
    menuPath: '/courier/communication/notification/list',
  },
  COURIER_NOTIFICATION_SEGMENT_LIST: {
    path: '/courierNotification/segment/list',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
  },
  COURIER_NOTIFICATION_CREATE_SEGMENT: {
    path: '/courierNotification/segment/new',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
  },
  COURIER_FEEDBACK_LIST: {
    path: '/courier/feedback/list',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Feedback List',
  },
  COURIER_STATUS_AND_BUSY_LIST: {
    path: '/courier/statusAndBusyList',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Status And Busy List',
  },
  COURIER_LOYALTY_LIST: {
    path: '/courier/loyalty',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'Courier Loyalty',
  },
  EMPLOYEE_ASSET_LIST: {
    path: '/employee/asset/list',
    name: 'Employee Asset List',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
  },
  EMPLOYEE_ASSET_DETAIL: {
    path: '/employee/asset/detail/:assetId',
    name: 'Employee Asset Detail',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    menuPath: '/employee/asset/list',
  },
  EMPLOYEE_ASSET_NEW: {
    path: '/employee/asset/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'New Employee Asset',
  },
  ASSET_MANAGEMENT_LIST: {
    path: '/employee/assetManagement/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Company Asset Management List',
  },
  ASSET_MANAGEMENT_DETAIL: {
    path: '/employee/assetManagement/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Company Asset Management Detail',
  },
  ASSET_MANAGEMENT_NEW: {
    path: '/employee/assetManagement/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Company Asset Management New',
  },
  ASSET_MANAGEMENT_LOGS: {
    path: '/employee/assetManagement/logs',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Company Asset Management Logs',
  },
  IT_ASSET_DASHBOARD: {
    path: '/employee/asset/dashboard',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'IT Asset Dashboard',
  },
  MENTORSHIP_PROFILE: {
    path: '/mentorship/profile',
    exact: true,
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Mentor Mentee Profile',
  },
  MENTORSHIP_MENTOR_DETAIL: {
    path: '/mentorship/mentor/detail/:id',
    exact: true,
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Mentor Profile Detail',
  },
  MENTORSHIP_SEARCH: {
    path: '/mentorship/search',
    exact: true,
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Search Mentors',
  },
  MENTORSHIP_COURSE_DETAIL: {
    path: '/mentorship/course/detail/:id',
    exact: true,
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Mentorship course detail',
  },
  MENTORSHIP_PROGRESS: {
    path: '/mentorship/progress/:id',
    exact: true,
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.EMPLOYEE_MANAGEMENT,
    name: 'Mentorship progress page',
  },
  MARKET_FRANCHISE_NEW: {
    path: '/marketFranchise/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise New',
  },
  MARKET_FRANCHISE_LIST: {
    path: '/marketFranchise/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise List',
  },
  MARKET_FRANCHISE_DETAIL: {
    path: '/marketFranchise/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise Detail',
    menuPath: '/marketFranchise/list',
  },
  MARKET_FRANCHISE_USER_NEW: {
    path: '/marketFranchise/user/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User New',
  },
  MARKET_FRANCHISE_USER_LIST: {
    path: '/marketFranchise/user/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User List',
  },
  MARKET_FRANCHISE_USER_DETAIL: {
    path: '/marketFranchise/user/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Detail',
    menuPath: '/marketFranchise/user/list',
  },
  MARKET_FRANCHISE_USER_ROLE_NEW: {
    path: '/marketFranchise/user/role/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role New',
  },
  MARKET_FRANCHISE_USER_ROLE_LIST: {
    path: '/marketFranchise/user/role/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role List',
  },
  MARKET_FRANCHISE_USER_ROLE_DETAIL: {
    path: '/marketFranchise/user/role/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role Detail',
    menuPath: '/marketFranchise/user/role/list',
  },
  FRANCHISE_BILL_MANAGEMENT_LIST: {
    path: '/franchiseBillManagement/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Bill Management List',
  },
  FRANCHISE_BILL_MANAGEMENT_DETAIL: {
    path: '/franchiseBillManagement/detail/:billId',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Bill Management Detail',
    menuPath: '/franchiseBillManagement/list',
  },
  CONFIG_LIST: {
    path: '/config/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Config List',
  },
  CONFIG_LOG: {
    path: '/config/log/:key',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Config Logs',
  },
  CONFIG_NEW: {
    path: '/config/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'New Config',
  },
  MARKET_FRANCHISE_USER_ROLE_GROUP_LIST: {
    path: '/marketFranchise/user/roleGroup/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role Group List',
  },
  MARKET_FRANCHISE_USER_ROLE_GROUP_NEW: {
    path: '/marketFranchise/user/roleGroup/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role Group New',
  },
  MARKET_FRANCHISE_USER_ROLE_GROUP_DETAIL: {
    path: '/marketFranchise/user/roleGroup/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Market Franchise User Role Group Detail',
    menuPath: '/marketFranchise/user/roleGroup/list',
  },
  CONFIG_WORKING_HOURS: {
    path: '/config/workingHours',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF, // should be a different squad but which one?
    name: 'Config Working Hours',
  },
  CONFIG_PEAK_HOURS: {
    path: '/config/peakHours',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Config peak Hours',
  },
  POLYGON_MAP: {
    path: '/polygon/map',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Polygon Map',
  },
  GIS_BANNED_AREAS: {
    path: '/gis/bannedAreas',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Banned Areas',
  },
  SERVICE_AVAILABILITY_AREA_LIST: {
    path: '/saa',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Service Availability Area List',
  },
  SERVICE_AVAILABILITY_AREA_DETAIL: {
    path: '/saa/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Service Availability Area Detail',
    menuPath: '/saa',
  },
  SERVICE_AVAILABILITY_AREA_EDIT: {
    path: '/saa/detail/:id/edit',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Service Availability Area Edit',
    menuPath: '/saa',
  },
  SERVICE_AVAILABILITY_AREA_NEW: {
    path: '/saa/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Service Availability Area New',
    menuPath: '/saa',
  },
  FOOD_LIVE_MAP: {
    path: '/food/liveMap',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Food Live Map',
  },
  GETIR_FOOD_ORDER_ACTIVE: {
    path: '/foodOrder/active',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Getir Food Order Active',
  },
  GETIR_FOOD_ORDER_FILTER: {
    path: '/foodOrder/filter',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Food Order Filter',
  },
  GETIR_FOOD_ORDER_DETAIL: {
    path: '/foodOrder/detail/:orderDetailId',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Getir Food Order Detail',
    menuPath: '/foodOrder/active',
  },
  GETIR_FOOD_BASKET_DETAIL: {
    path: '/baskets/detail/:basketOrderId',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Getir Food Basket Detail',
  },
  GETIR_FOOD_ORDER_SUMMARY: {
    path: '/food/foodOrderSummary',
    squad: TECH_SQUADS.DEMAND.FOOD.POST_ORDER,
    name: 'Getir Food Active Order Summary',
  },
  GETIR_FOOD_FINANCIAL_DASHBOARD_V2: {
    path: '/food/financialDashboardV2',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Food Financial Dashboard V2',
  },
  GETIR_FOOD_FINANCIAL_DASHBOARD_V2_DETAIL: {
    path: '/food/financialDashboardV2/detail',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Food Financial Dashboard V2 Detail',
    menuPath: '/food/financialDashboardV2',
  },
  GETIR_FOOD_MEAL_CARD_RECONCILIATION: {
    path: '/food/mealCardReconciliation',
    squad: TECH_SQUADS.DEMAND.FOOD.FINANCE,
    name: 'Getir Food Meal Card Reconciliation',
  },
  GETIR_FOOD_ERP_DATA_TRACKING_V2: {
    path: '/food/erpDataTrackingV2',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Food ERP Data Tracking V2',
  },
  GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION: {
    path: '/food/restaurantExternalTransaction',
    name: 'Getir Food Restaurant External Transaction',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
  },
  GETIR_FOOD_RESTAURANT_PAYBACK_STATUS: {
    path: '/food/restaurantPaybackStatus',
    name: 'Getir Food Restaurant Payback Status',
    squad: TECH_SQUADS.DEMAND.FOOD.FINANCE,
  },
  GETIR_FOOD_FINANCIAL_CONFIGS: {
    path: '/food/financialConfigs',
    exact: true,
    name: 'Getir Food Financial Configs',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
  },
  GETIR_FOOD_WITHHOLDING_TAX_REPORTS: {
    path: '/food/withholdingTaxReports',
    name: 'Getir Food Withholding Tax Reports',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
  },
  DTS_LIST: {
    path: '/dts/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts List',
  },
  DTS_NEW: {
    path: '/dts/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts New',
    menuPath: '/dts/list',
  },
  DTS_DETAIL: {
    path: '/dts/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Detail',
    menuPath: '/dts/list',
  },
  DTS_SUMMARY: {
    path: '/dts/summary',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Summary',
  },
  DTS_RULE_LIST: {
    path: '/dts/rule/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Rule List',
  },
  DTS_RULE_NEW: {
    path: '/dts/rule/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Rule New',
  },
  DTS_RULE_DETAIL: {
    path: '/dts/rule/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Rule Detail',
    menuPath: '/dts/rule/list',
  },
  DTS_CATEGORY_SETTING_LIST: {
    path: '/dts/setting/category/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Category Setting List',
  },
  DTS_CATEGORY_SETTING_NEW: {
    path: '/dts/setting/category/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Category Setting New',
  },
  DTS_CATEGORY_SETTING_DETAIL: {
    path: '/dts/setting/category/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Category Setting Detail',
    menuPath: '/dts/setting/category/list',
  },
  DTS_FEEDBACK_SOURCE_SETTING_LIST: {
    path: '/dts/setting/feedbacksource/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Feedback Source Setting List',
  },
  DTS_FEEDBACK_SOURCE_SETTING_NEW: {
    path: '/dts/setting/feedbacksource/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Feedback Source Setting New',
  },
  DTS_FEEDBACK_SOURCE_SETTING_DETAIL: {
    path: '/dts/setting/feedbacksource/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Feedback Source Setting Detail',
    menuPath: '/dts/setting/feedbacksource/list',
  },
  DTS_PRIORITY_SETTING_LIST: {
    path: '/dts/setting/priority/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Priority Setting List',
  },
  DTS_PRIORITY_SETTING_NEW: {
    path: '/dts/setting/priority/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Priority Setting New',
  },
  DTS_PRIORITY_SETTING_DETAIL: {
    path: '/dts/setting/priority/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Priority Setting Detail',
    menuPath: '/dts/setting/priority/list',
  },
  DTS_LOGS_UPDATE: {
    path: '/dts/upload',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dts Logs Update',
  },
  HIGH_LEVEL_DYS: {
    path: '/dys',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'High Level Dys',
  },
  DAILY_TRACKING: {
    path: '/dailyTracking',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Tracking',
  },
  DAILY_TRACKING_ORDER: {
    path: '/dailyTracking/order',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Tracking Order',
  },
  DAILY_TRACKING_INSTANT: {
    path: '/dailyTracking/courier',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Tracking Instant',
  },
  DAILY_TRACKING_INSTANT_OLD: {
    path: '/dailyTracking/instant',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Tracking Instant',
    isGlobal: true,
  },
  PROFILE: {
    path: '/profile/:tabId',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Profile',
  },
  CONTENT_UPLOAD_S3: {
    path: '/contentUpload/s3',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Content Upload S3',
  },
  PROMO_BADGES_LIST: {
    path: '/promo/badges/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Promo Badges List',
  },
  PROMO_LIST: {
    path: '/promo/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Promo List',
  },
  PROMO_DETAIL: {
    path: '/promo/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Promo Detail',
  },
  CONTENT_CREATION: {
    path: '/contentCreation',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Content Creation',
  },
  PERSON_REQUEST_LIST: {
    path: '/person/request/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person Request List',
  },
  PERSON_REQUEST_DETAIL: {
    path: '/person/request/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person Request Detail',
    menuPath: '/person/request/list',
  },
  FRANCHISE_EARNINGS_LIST: {
    path: '/franchiseEarnings/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Franchise Earnings List',
  },
  FRANCHISE_EARNINGS_UPLOAD: {
    path: '/franchiseEarnings/upload',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Franchise Earnings Upload',
  },
  ARTISAN_ORDER_LIVE_MAP: {
    path: '/artisanOrder/liveMap',
    squad: TECH_SQUADS.DEMAND.LOCALS.COMPLEXITY,
    name: 'Artisan Order Live Map',
  },
  LIVE_MONITORING_OLD: {
    path: '/liveMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Live Monitoring',
    isGlobal: true,
  },
  LIVE_MONITORING: {
    path: '/orderGrowthMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Order Growth Monitoring',
  },
  LOCALS_LIVE_MONITORING_COURIER: {
    path: '/localsLiveMonitoring/courier',
    squad: TECH_SQUADS.DEMAND.LOCALS.POST_ORDER,
    name: 'Locals Live Monitoring - Courier',
  },
  CLIENT_TARGETING: {
    path: '/clientTargeting',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Client Targeting',
  },
  ARTISAN_ORDER: {
    path: '/artisanOrder',
    squad: TECH_SQUADS.DEMAND.LOCALS.SIMPLICITY,
    name: 'Artisan Order',
  },
  ARTISAN_ORDER_ACTIVE: {
    path: '/artisanOrder/active',
    squad: TECH_SQUADS.DEMAND.LOCALS.SIMPLICITY,
    name: 'Artisan Order Active',
  },
  GETIR_LOCALS_RETURN_LIST: {
    path: '/localsReturns/list',
    squad: TECH_SQUADS.DEMAND.LOCALS.SIMPLICITY,
    name: 'Locals Returns',
  },
  STAFF_PLAN_PUBLICATION: {
    path: '/staffPlanPublication',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Staff Plan Publication',
  },
  CUSTOMER_AGREEMENT: {
    path: '/customerAgreement',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.CORE_CLIENT,
    name: 'Customer Agreement',
  },
  ARTISAN_ORDER_DETAIL: {
    path: '/artisanOrder/detail/:orderDetailId',
    squad: TECH_SQUADS.DEMAND.LOCALS.SIMPLICITY,
    name: 'Artisan Order Detail',
  },
  MARKET_ORDER_ANALYTICS: {
    path: '/marketOrderAnalytics',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics',
  },
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT: {
    path: '/marketOrderAnalytics/activeOrdersForManagement',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics Active Orders For Management',
  },
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION: {
    path: '/marketOrderAnalytics/activeOrdersForOperation',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics Active Orders For Operation',
  },
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES: {
    path: '/marketOrderAnalytics/activeOrdersForCustomerServices',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics Active Orders For Customer Services',
  },
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD: {
    path: '/marketOrderAnalytics/activeOrdersSummary',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics Active Orders For Executive Dashboard',
  },
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_GROWTH: {
    path: '/marketOrderAnalytics/activeOrdersForGrowth',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Market Order Analytics Active Orders For Growth',
  },
  REPORTS: {
    path: '/reports',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Reports',
  },
  REPORTS_NEW: {
    path: '/reports/new/:reportTypeId',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Create New Report',
    menuPath: '/reports',
  },
  REPORT_TYPES: {
    path: '/reports/types',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Report Types',
  },
  REPORT_TYPES_NEW: {
    path: '/reports/types/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Create New Report Type',
    menuPath: '/reports/types',
  },
  REPORT_TYPES_DETAIL: {
    path: '/reports/types/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Report Type Detail',
    menuPath: '/reports/types',
  },
  REPORT_TAGS: {
    path: '/reports/tags',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Report Tags',
  },
  REPORT_TAGS_NEW: {
    path: '/reports/tags/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Create New Report Tag',
    menuPath: '/reports/tags',
  },
  REPORT_TAGS_DETAIL: {
    path: '/reports/tags/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Report Tag Detail',
    menuPath: '/reports/tags',
  },
  DDS_OBJECTION_LIST: {
    path: '/dds/objection/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dds Objection List',
  },
  DDS_OBJECTION_DETAIL: {
    path: '/dds/objection/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Dds Objection Detail',
    menuPath: '/dds/objection/list',
  },
  PERSON_CANDIDATE_LIST: {
    path: '/person/candidate/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person Candidate List',
  },
  PERSON_CANDIDATE_DETAIL: {
    path: '/person/candidate/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person Candidate Detail',
    menuPath: '/person/candidate/list',
  },
  PERSON_LIST: {
    path: '/person/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person List',
  },
  PERSON_NEW: {
    path: '/person/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person New',
    menuPath: '/person/list',
  },
  PERSON_DETAIL: {
    path: '/person/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Person Detail',
    menuPath: '/person/list',
  },
  WORKFORCE_EMPLOYEE_TIMESHEET_LOCK: {
    path: '/timesheetLock',
    name: 'Timesheet Lock',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  WORKFORCE_EMPLOYEE_TIMESHEET_LOGS: {
    path: '/timesheetLogs',
    name: 'Timesheet Logs',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  WORKFORCE_REPORTS: {
    path: '/workforceReports',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  WORKFORCE_SLOT_PLAN_MANAGEMENT: {
    path: '/slotPlanManagement',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  CLIENT_LIST_DOUBLE_CHECKER: {
    path: '/clientListDoubleChecker',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Client List Double Checker',
  },
  GL_GROWTH_COMPARISON: {
    path: '/getirLocals/growthComparison',
    squad: TECH_SQUADS.DEMAND.LOCALS.POST_ORDER,
    name: 'Gl Growth Comparison',
  },
  GL_RETURN_ALERT: {
    path: '/return/alert',
    squad: TECH_SQUADS.DEMAND.LOCALS.WESTEROS,
    name: 'Gl Return Alert',
  },
  GL_RETURN_ALERT_DETAIL: {
    path: '/return/detail/:warehouseId',
    squad: TECH_SQUADS.DEMAND.LOCALS.WESTEROS,
    name: 'Gl Return Alert Detail',
  },
  GL_RUNNER_LIST: {
    path: '/getirLocals/runner/list',
    squad: TECH_SQUADS.DEMAND.LOCALS.RUNNER,
    name: 'Gl Runner List',
  },
  GL_RUNNER_DETAIL: {
    path: '/getirLocals/runner/detail/:id',
    squad: TECH_SQUADS.DEMAND.LOCALS.RUNNER,
    name: 'Gl Runner Detail',
    menuPath: '/getirLocals/runner/list',
  },
  GL_RUNNER_NEW: {
    path: '/getirLocals/runner/new',
    squad: TECH_SQUADS.DEMAND.LOCALS.RUNNER,
    name: 'Gl Runner New',
    menuPath: '/getirLocals/runner/list',
  },
  GL_ERP_DATA_TRACKING: {
    path: '/getirLocals/erpDataTracking',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Locals ERP Data Tracking',
  },
  GL_SHOP_EXTERNAL_TRANSACTION: {
    path: '/getirLocals/shopExternalTransaction',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Locals Shop External Transaction',
  },
  GL_SHOP_PAYBACK_STATUS: {
    path: '/getirLocals/shopPaybackStatus',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Locals Shop Payback Status',
  },
  GETIR_LOCALS_WITHHOLDING_TAX_REPORTS: {
    path: '/getirLocals/withholdingTaxReports',
    squad: TECH_SQUADS.DEMAND.MARKETPLACE.FINANCE,
    name: 'Getir Locals Withholding Tax Reports',
  },
  COURIER_LIVE_MONITORING: {
    path: '/courierStatusMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Courier Live Monitoring',
  },
  COURIER_LIVE_MONITORING_OLD: {
    path: '/courierLiveMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Courier Live Monitoring',
    isGlobal: true,
  },
  OPERATIONS_LIVE_MONITORING: {
    path: '/whOpsMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Operations Live Monitoring',
  },
  OPERATIONS_LIVE_MONITORING_OLD: {
    path: '/liveMonitoring/operations',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Operations Live Monitoring',
    isGlobal: true,
  },
  GETIR_DRIVE_DASHBOARD: {
    path: '/getirDrive/dashboard',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'GetirDrive Dashboard',
  },
  GETIR_MARKET_LIVE_MAP: {
    path: '/getirMarket/liveMap',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'GetirMarket Live Map',
  },
  GETIR_MARKET_DASHBOARD: {
    path: '/getirMarket/dashboard',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'GetirMarket Dashboard',
  },
  GETIR_MARKET_COMMERCIAL_MONITORING: {
    path: '/getirMarket/commercialTrack',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'GetirMarket Commercial Monitoring',
  },
  GETIR_MARKET_COMMERCIAL_MONITORING_OLD: {
    path: '/getirMarket/commercialMonitoring',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'GetirMarket Commercial Monitoring',
    isGlobal: true,
  },
  DAILY_SUMMARY_GLOBAL: {
    path: '/summaryQuick/global',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Global',
  },
  DAILY_SUMMARY_GLOBAL_OLD: {
    path: '/dailySummary/global',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Global',
    isGlobal: true,
  },
  DAILY_SUMMARY_COUNTRY: {
    path: '/summaryQuick',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Country',
  },
  DAILY_SUMMARY_COUNTRY_OLD: {
    path: '/dailySummary',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Country',
    isGlobal: true,
  },
  DAILY_SUMMARY_FOUNDERS_CUSTOM: {
    path: '/summaryQuick/foundersCustom',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Founders Custom',
  },
  DAILY_SUMMARY_FOUNDERS_CUSTOM_OLD: {
    path: '/dailySummary/foundersCustom',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Daily Summary Founders Custom',
    isGlobal: true,
  },
  EU_GROWTH_COMPARISON: {
    path: '/euGrowthComparison',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Eu Growth Comparison',
  },
  AB_TEST_LIST: {
    path: '/abTesting/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'A/B Testing',
  },
  AB_TEST_NEW: {
    path: '/abTesting/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'A/B Testing Create',
    menuPath: '/abTesting/list',
  },
  AB_TEST_DETAIL: {
    path: '/abTesting/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'A/B Testing Detail',
    menuPath: '/abTesting/list',
  },
  ORDER_COUNTER: {
    path: '/count/orderCounter',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Order Counter',
  },
  ORDER_COUNTER_OLD: {
    path: '/count/sayac',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Order Counter',
    isGlobal: true,
  },
  LOTTERY_NEW: {
    path: '/lottery/new',
    squad: TECH_SQUADS.DEMAND.MARKET.GROWTH_RETENTION,
    name: 'Lottery New',
  },
  LOTTERY_DETAIL: {
    path: '/lottery/detail/:id',
    squad: TECH_SQUADS.DEMAND.MARKET.GROWTH_RETENTION,
    name: 'Lottery Detail',
  },
  FRANCHISE_REQUEST_LIST: {
    path: '/franchiseRequest/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Request List',
  },
  GETIR_WATER_ANNOUNCEMENTS_LIST: {
    path: '/getirWater/announcement/list',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Announcements List',
  },
  GETIR_WATER_ANNOUNCEMENT_NEW: {
    path: '/getirWater/announcement/new',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Announcement New',
    menuPath: '/getirWater/announcement/list',
  },
  GETIR_WATER_ANNOUNCEMENT_DETAIL: {
    path: '/getirWater/announcement/detail/:id',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Announcement Detail',
    menuPath: '/getirWater/announcement/list',
  },
  GETIR_WATER_COURIER_STATUS: {
    path: '/getirWater/courierStatus',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Courier Status',
  },
  GETIR_WATER_SLOT_CONFIG: {
    path: '/getirWater/slotConfig',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Slot Config',
  },
  GIVEAWAY_EVENT_DRAW_LIST: {
    path: '/giveaway-event/:eventId',
    name: 'Giveaway Event Draw List',
    squad: TECH_SQUADS.DEMAND.MARKET.GROWTH_RETENTION,
  },
  PUSH_NOTIFICATION_LIST: {
    path: '/pushNotification/list',
    name: 'Push Notification List',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
  },
  PUSH_NOTIFICATION_NEW: {
    path: '/pushNotification/new',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'Push Notification New',
    menuPath: '/pushNotification/list',
  },
  PUSH_NOTIFICATION_DETAIL: {
    path: '/pushNotification/detail/:id',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'Push Notification Detail',
    menuPath: '/pushNotification/list',
  },
  POPUP_LIST: {
    path: '/popup/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Popup List',
  },
  POPUP_NEW: {
    path: '/popup/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Popup New',
    menuPath: '/popup/list',
  },
  POPUP_DETAIL: {
    path: '/popup/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Popup Detail',
    menuPath: '/popup/list',
  },
  SMS_LIST: {
    path: '/sms/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Sms List',
  },
  SMS_NEW: {
    path: '/sms/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Sms New',
    menuPath: '/sms/list',
  },
  SMS_DETAIL: {
    path: '/sms/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Sms Detail',
    menuPath: '/sms/list',
  },
  EMAIL_LIST: {
    path: '/email/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Email List',
  },
  EMAIL_NEW: {
    path: '/email/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Email New',
    menuPath: '/email/list',
  },
  EMAIL_DETAIL: {
    path: '/email/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Email Detail',
    menuPath: '/email/list',
  },
  TRANSACTIONAL_NOTIFICATION_LIST: {
    path: '/transactional-notification/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Notification List',
  },
  TRANSACTIONAL_NOTIFICATION_NEW: {
    path: '/transactional-notification/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Notification New',
  },
  TRANSACTIONAL_NOTIFICATION_DETAIL: {
    path: '/transactional-notification/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Notification Detail',
    menuPath: '/transactional-notification/list',
  },
  TRANSACTIONAL_SMS_LIST: {
    path: '/transactional-sms/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Sms List',
  },
  TRANSACTIONAL_SMS_NEW: {
    path: '/transactional-sms/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Sms New',
  },
  TRANSACTIONAL_SMS_DETAIL: {
    path: '/transactional-sms/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Transactional Sms Detail',
    menuPath: '/transactional-sms/list',
  },
  COMMUNICATION_HISTORY: {
    path: '/communication-history',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Communication History',
  },
  ANNOUNCEMENT_LIST: {
    path: '/announcement/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement List',
  },
  ANNOUNCEMENT_NEW: {
    path: '/announcement/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement New',
  },
  ANNOUNCEMENT_DETAIL: {
    path: '/announcement/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement Detail',
    menuPath: '/announcement/list',
  },
  BANNER_LIST: {
    path: '/banner/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Banner List',
  },
  BANNER_NEW: {
    path: '/banner/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Banner New',
    menuPath: '/banner/list',
  },
  BANNER_DETAIL: {
    path: '/banner/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement Detail',
    menuPath: '/banner/list',
  },
  NOTIFICATION_CENTER_LIST: {
    path: '/announcementv2/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement V2 List',
  },
  NOTIFICATION_CENTER_NEW: {
    path: '/announcementv2/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement V2 New',
  },
  NOTIFICATION_CENTER_DETAIL: {
    path: '/announcementv2/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Announcement V2 Detail',
    menuPath: '/announcementv2/list',
  },
  COMMUNICATION_SERVICE_CREDENTIALS_LIST: {
    path: '/communication-service-credentials/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Communication Service Credentials List',
  },
  COMMUNICATION_SERVICE_CREDENTIALS_NEW: {
    path: '/communication-service-credentials/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Communication Service Credentials New',
  },
  COMMUNICATION_SERVICE_CREDENTIALS_DETAIL: {
    path: '/communication-service-credentials/detail/:id/:serviceType',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Communication Service Credentials Detail',
    menuPath: '/communication-service-credentials/list',
  },
  COMMUNICATION_CALLBACK_URLS_LIST: {
    path: '/callback-urls/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Callback Urls List',
  },
  COMMUNICATION_CALLBACK_URLS_NEW: {
    path: '/callback-urls/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Callback Urls New',
  },
  COMMUNICATION_CALLBACK_URLS_DETAIL: {
    path: '/callback-urls/detail/:id/:serviceType',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Callback Urls Detail',
    menuPath: '/callback-urls/list',
  },
  COMMUNICATION_BULK_SMS_LIST: {
    path: '/bulk-sms/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Bulk Sms List',
  },
  COMMUNICATION_BULK_SMS_NEW: {
    path: '/bulk-sms/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Bulk Sms New',
  },
  COMMUNICATION_BULK_SMS_DETAIL: {
    path: '/bulk-sms/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.COMMUNICATION,
    name: 'Bulk Sms Detail',
    menuPath: '/bulk-sms/list',
  },
  TECHNOLOGY_COMPLIANCE_REPORT_HOME: {
    path: '/technology/complianceReport',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Compliance Reports',
    menuPath: '/complianceReport',
  },
  TECHNOLOGY_COMPLIANCE_REPORT_NODE_VERSIONS: {
    path: '/technology/complianceReport/node/versions',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Versions Report (NodeJS)',
    menuPath: '/complianceReport',
  },
  TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITIES: {
    path: '/technology/complianceReport/node/vulnerabilities',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Vulnerability Report (NodeJS)',
    menuPath: '/complianceReport',
  },
  TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITY_DETAIL: {
    path: '/technology/complianceReport/node/vulnerabilities/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Vulnerability Details (NodeJS)',
    menuPath: '/complianceReport',
  },
  WAREHOUSE_SEGMENT_LIST: {
    path: '/warehouseSegment/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Warehouse Segment List',
  },
  WAREHOUSE_SEGMENT_DETAIL: {
    path: '/warehouseSegment/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Warehouse Segment Detail',
    menuPath: '/warehouseSegment/list',
  },
  WAREHOUSE_SEGMENT_NEW: {
    path: '/warehouseSegment/new',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Warehouse Segment New',
  },
  WAREHOUSE_SEGMENT_MATCHING_UPLOAD: {
    path: '/warehouseSegment/upload',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PRICING,
    name: 'Warehouse Segment Matching Upload',
  },
  GETIR_WATER_ACTIVE_ORDERS: {
    path: '/getirWater/activeOrders',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Active Orders',
  },
  GETIR_WATER_ORDER_FILTER: {
    path: '/getirWater/orderFilter',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Order Filter',
  },
  GETIR_WATER_VENDOR_FILTER: {
    path: '/getirWater/vendorFilter',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Vendor Filter',
  },
  DYS_CONFIGS: {
    path: '/dysConfigs',
    name: 'Dys Configs',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
  },
  CUSTOMER_SATISFACTION_REQUEST_NEW: {
    path: '/stock/blockedStock/customerSatisfaction/new',
    squad: TECH_SQUADS.SUPPLY.STOCK.MORIA,
    name: 'Customer Satisfaction Request New',
  },
  BANK_RECONCILIATION_REPORT: {
    path: '/payment/reconciliation/reconciliationReport',
    squad: TECH_SQUADS.DEMAND.PAYMENT.MIKLAGARD,
    name: 'Bank Reconciliation Report',
  },
  BANK_RECONCILIATION_SUMMARY: {
    path: '/payment/reconciliation/bankReconciliationSummary',
    squad: TECH_SQUADS.DEMAND.PAYMENT.MIKLAGARD,
    name: 'Bank Reconciliation Summary',
  },
  RECONCILIATION_DAILY_REPORT: {
    path: '/payment/reconciliation/dailyReport',
    squad: TECH_SQUADS.DEMAND.PAYMENT.MIKLAGARD,
    name: 'Reconciliation Daily Report',
  },
  PAYOUTS_FOR_DOMAINS: {
    path: '/payment/reconciliation/payoutForDomains',
    squad: TECH_SQUADS.DEMAND.PAYMENT.MIKLAGARD,
    name: 'Payout For Domains',
  },
  PAYOUTS_TRANSACTIONS_FOR_DOMAINS: {
    path: '/payment/reconciliation/payoutTransactionsForDomains',
    squad: TECH_SQUADS.DEMAND.PAYMENT.MIKLAGARD,
    name: 'Payout Transactions For Domains',
  },
  PAYMENT_FRAUD_CONTROL_LIST: {
    path: '/payment/fraudControl',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Fraud Rules',
  },
  GETIR_WATER_CAMPAIGNS_LIST: {
    path: '/getirWater/campaign/list',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Campaigns List',
  },
  GETIR_WATER_CAMPAIGN_NEW: {
    path: '/getirWater/campaign/new',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Campaign New',
  },
  GETIR_WATER_CAMPAIGN_DETAIL: {
    path: '/getirWater/campaign/detail/:id',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Campaign Detail',
  },
  GETIR_WATER_ORDER_DETAIL: {
    path: '/getirWater/orderDetail/:waterOrderId',
    squad: TECH_SQUADS.DEMAND.WATER_MARKETPLACE.MARKETPLACE,
    name: 'Getir Water Order Detail',
  },
  LOCATION_WRITE_OFF_NEW: {
    path: '/writeOff/location/new',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Location Write Off New',
  },
  LOCATION_WRITE_OFF_DETAIL: {
    path: '/writeOff/location/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Location Write Off Detail',
  },
  LOCATION_WRITE_OFF_LIST: {
    path: '/writeOff/location/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Location Write Off List',
  },
  PICKER_LIST: {
    path: '/picker/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Picker List',
  },
  PICKER_DETAIL: {
    path: '/picker/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.ORCHESTRATION,
    name: 'Picker Detail',
    menuPath: '/picker/list',
  },
  FIELD_ANNOUNCEMENT_LIST: {
    path: '/field-announcement/list',
    squad: TECH_SQUADS.SUPPLY.STOCK.WAREHOUSE_ORDER,
    name: 'Field Announcement List',
  },
  FIELD_ANNOUNCEMENT_DETAIL: {
    path: '/field-announcement/detail/:id',
    squad: TECH_SQUADS.SUPPLY.STOCK.WAREHOUSE_ORDER,
    name: 'Field Announcement Detail',
  },
  FIELD_ANNOUNCEMENT_CREATE: {
    path: '/field-announcement/create',
    squad: TECH_SQUADS.SUPPLY.STOCK.WAREHOUSE_ORDER,
    name: 'Field Announcement Create',
  },
  FIELD_ANNOUNCEMENT_LIST_BY_WAREHOUSE: {
    path: '/field-announcement/list-by-warehouse',
    squad: TECH_SQUADS.SUPPLY.STOCK.WAREHOUSE_ORDER,
    name: 'Field Announcement List By Warehouse',
  },
  CLIENT_DETAIL: {
    path: '/client/detail/:id',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.CUSTOMER,
    name: 'Client Detail',
    menuPath: '/client/list',
  },
  CLIENT_LIST: {
    path: '/client/list',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.CUSTOMER,
    name: 'Client List',
  },
  CLIENT_ATTACHMENTS_DETAIL: {
    path: '/client/attachments/:sessionId/:attachmentId',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.CUSTOMER,
    name: 'Client Attachment Detail',
  },
  GETIR_MARKET_ORDER_RATINGS: {
    path: '/marketOrder/ratings',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.POST_ORDER,
    name: 'GetirMarket Order Ratings',
  },
  E2E_COURIER_PLAN_LIST: {
    path: '/courierPlan',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Courier Plan List',
  },
  E2E_COURIER_PLAN_NEW: {
    path: '/courierPlan/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Courier Plan New',
  },
  E2E_COURIER_PLAN_PROCEED: {
    path: '/courierPlan/proceed/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Courier Plan Proceed',
  },
  COURIER_LIST: {
    path: '/courier/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    name: 'Courier List',
  },
  VEHICLE_CONSTRAINT_NEW: {
    path: '/fleet/vehicleConstraint/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF, // should be a different squad but which one?
    name: 'Vehicle Constraint New',
  },
  VEHICLE_CONSTRAINT_DETAIL: {
    path: '/fleet/vehicleConstraint/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF, // should be a different squad but which one?
    menuPath: '/fleet/vehicleConstraint/list',
    name: 'Vehicle Constraint Detail',
  },
  VEHICLE_CONSTRAINT_LIST: {
    path: '/fleet/vehicleConstraint/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF, // should be a different squad but which one?
    name: 'Vehicle Constraint List',
  },
  VEHICLE_NEW: {
    path: '/fleet/vehicle/new',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'Vehicle New',
  },
  VEHICLE_LIST: {
    path: '/fleet/vehicle/list',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'Vehicle List',
  },
  VEHICLE_DETAIL: {
    path: '/fleet/vehicle/detail/:id',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    menuPath: '/fleet/vehicle/list',
    name: 'Vehicle Detail',
  },
  TMS_DRIVER_LIST: {
    path: '/fleet/tms/driver/list',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'TMS Driver List',
  },
  TMS_DRIVER_DETAIL: {
    path: '/fleet/tms/driver/:id',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    menuPath: '/fleet/tms/driver/list',
    name: 'TMS Driver Detail',
  },
  TMS_NEW: {
    path: '/tms/new',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'TMS New',
  },
  TMS_LIST: {
    path: '/tms/list',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'TMS List',
  },
  TMS_CREATE: {
    path: '/tms/create',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.MARKETING_COMMUNICATION,
    name: 'TMS Create',
  },
  TMS_DETAIL: {
    path: '/tms/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COURIER.COURIER_SERVICES,
    name: 'TMS Detail',
  },
  FRANCHISE_EQUIPMENT_LIST: {
    path: '/franchiseEquipment/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Equipments List',
  },
  FRANCHISE_EQUIPMENT_NEW: {
    path: '/franchiseEquipment/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Equipment New',
  },
  FRANCHISE_EQUIPMENT_DETAIL: {
    path: '/franchiseEquipment/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_EXPERIENCE,
    name: 'Franchise Equipment Detail',
    menuPath: '/franchiseEquipment/list',
  },
  INTERNAL_AUTHENTICATION_TEAM_DETAIL: {
    path: '/internalAuthentication/team/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Internal Authentication Team Detail',
  },
  INTERNAL_AUTHENTICATION_TEAM_LIST: {
    path: '/internalAuthentication/team/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Internal Authentication Team List',
  },
  INTERNAL_AUTHENTICATION_SERVICE_DETAIL: {
    path: '/internalAuthentication/service/detail/:teamId/:serviceId',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Internal Authentication Service Detail',
  },
  INTERNAL_AUTHENTICATION_SERVICE_LIST: {
    path: '/internalAuthentication/service/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
    name: 'Internal Authentication Service List',
  },
  KDS_QUESTION_LIST: {
    path: '/kds/question/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question List',
  },
  KDS_QUESTION_NEW: {
    path: '/kds/question/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question New',
  },
  KDS_QUESTION_DETAIL: {
    path: '/kds/question/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question Detail',
    menuPath: '/kds/question/list',
  },
  KDS_QUESTION_GROUP_LIST: {
    path: '/kds/questionGroup/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question Group List',
  },
  KDS_QUESTION_GROUP_NEW: {
    path: '/kds/questionGroup/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question Group New',
  },
  KDS_QUESTION_GROUP_DETAIL: {
    path: '/kds/questionGroup/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Question Group Detail',
    menuPath: '/kds/questionGroup/list',
  },
  KDS_SCORE_MAPPING: {
    path: '/kds/scoreMapping',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Score Mapping',
  },
  KDS_AUDIT_FORM_TYPE_LIST: {
    path: '/kds/auditFormType/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Audit Form Type List',
  },
  KDS_AUDIT_FORM_TYPE_NEW: {
    path: '/kds/auditFormType/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Audit Form Type New',
  },
  KDS_AUDIT_FORM_TYPE_DETAIL: {
    path: '/kds/auditFormType/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Quality Evaluation Audit Form Type Detail',
    menuPath: '/kds/auditFormType/list',
  },
  STORE_AUDIT_LIST: {
    path: '/kds/storeAudit/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Store Audit List',
  },
  STORE_AUDIT_NEW: {
    path: '/kds/storeAudit/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Store Audit New',
  },
  STORE_AUDIT_DETAIL: {
    path: '/kds/storeAudit/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Store Audit Detail',
    menuPath: '/kds/storeAudit/list',
  },
  PLANOGRAM_PRODUCTS: {
    path: '/planogram/products',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Products',
  },
  PLANOGRAM_WAREHOUSES: {
    path: '/planogram/warehouses',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Warehouses',
  },
  PLANOGRAM_WAREHOUSES_DETAIL: {
    path: '/planogram/warehouses/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Warehouses Detail',
  },
  PLANOGRAM_WAREHOUSE_CONVERT: {
    path: '/planogram/warehouses/convert/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Warehouse New',
  },
  GROWTH_DASHBOARD: {
    path: '/growth/dailyTracking',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Growth Dashboard',
  },
  GROWTH_DASHBOARD_OLD: {
    path: '/growth/dashboard',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
    name: 'Growth Dashboard',
    isGlobal: true,
  },
  GIS_HEATMAP: {
    path: '/gis/heatmap',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'GIS Heatmap',
  },
  GIS_LOCATION_INTELLIGENCE: {
    path: '/gis/locationIntelligence',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Location Intelligence',
  },
  GIS_WEATHER_MAP: {
    path: '/gis/weatherMap',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Weather Map',
  },
  GIS_ADDRESS_SEARCH: {
    path: '/gis/addressSearch',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Address Search',
  },
  GIS_COUNTRY_CITY_MANAGEMENT: {
    path: '/gis/countryCityManagement',
    squad: TECH_SQUADS.INFRASTRUCTURE.MAPS.GIS_DEVELOPMENT,
    name: 'Country City Management',
  },
  PLANOGRAM_PRODUCT_DETAIL: {
    path: '/planogram/product/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Product Detail',
  },
  PLANOGRAM_PRODUCT_CONVERT: {
    path: '/planogram/product/convert/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Planogram Product Convert',
  },
  GETIR_MARKET_ORDER_DETAIL: {
    path: '/marketOrder/detail/:orderId',
    name: 'Market Order Detail',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  PAYMENT_MERCHANT_LIST: {
    path: '/payment/merchants',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Merchant List',
  },
  PAYMENT_MERCHANT_NEW: {
    path: '/payment/merchants/new',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Merchant New',
  },
  PAYMENT_MERCHANT_DETAIL: {
    path: '/payment/merchants/detail/:id',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Merchant Detail',
    menuPath: '/payment/merchants',
  },
  INSTALLMENT_COMMISSIONS: {
    path: '/payment/installmentCommissions',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Installment Commissions',
  },
  GETIR_MARKET_FRAUD_SUSPICION_ORDERS: {
    path: '/marketOrderAnalytics/activeFraudOrders',
    name: 'Fraud Suspicion Active Orders',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  CONFIG_MOBILE_ANIMATION: {
    path: '/config/mobileAnimation',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Mobile Animation Config',
  },
  MARKET_BUSINESS_CONFIG: {
    path: '/market/businessConfig',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Market Business Config',
  },
  STOCK_ORDER_VOLUME_AUTO: {
    path: '/stock/order/volumeAuto',
    name: 'Stock Order Volume Auto',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PLANNING_PARTNERSHIP,
  },
  ON_OFF_PROMO_CONFIG: {
    path: '/dataPanel/onOffPromoConfig',
    name: 'On Off',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  PRICING_TOOL: {
    path: '/dataPanel/pricing/pricingTool',
    name: 'Pricing Tool',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  MARKET_INTELLIGENCE_PRICE_INDEX: {
    path: '/dataPanel/marketIntelligence/marketIntelligencePriceIndex',
    name: 'Market Intelligence Price Index',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  MARKET_INTELLIGENCE_PRODUCTS: {
    path: '/dataPanel/marketIntelligence/marketIntelligenceProducts',
    name: 'Market Intelligence Products',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  MARKET_INTELLIGENCE_PRICE_RECOMMENDATION: {
    path: '/dataPanel/marketIntelligence/priceRecommendation',
    name: 'Market Intelligence Price Recommendation',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  AB_TEST_V2_LIST: {
    path: '/abTestingv2/list',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
    name: 'A/B Testing v2',
  },
  AB_TEST_V2_NEW: {
    path: '/abTestingv2/new',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
    name: 'A/B Testing v2 Create',
    menuPath: '/abTestingv2/list',
  },
  AB_TEST_V2_DETAIL: {
    path: '/abTestingv2/detail/:id',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
    name: 'A/B Testing v2 Detail',
    menuPath: '/abTestingv2/list',
  },
  MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS: {
    path: '/dataPanel/marketAutoGrowthOperations',
    name: 'Market Auto Growth Operations Tool Settings',
    squad: TECH_SQUADS.DATA.DATA_PANEL,
  },
  PAYMENT_TRANSACTION_LIST: {
    path: '/payment/transactions',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Transaction List',
  },
  PAYMENT_TRANSACTION_DETAIL: {
    path: '/payment/transactions/detail/:id',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Transaction Detail',
    menuPath: '/payment/transactions',
  },
  PAYMENT_EVENT_DETAIL: {
    path: '/payment/event/detail/:id',
    squad: TECH_SQUADS.DEMAND.PAYMENT.ASGARD,
    name: 'Payment Event Detail',
  },
  STOCK_ORDER_AUTO: {
    path: '/stock/order/auto',
    name: 'Stock Order Auto',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PLANNING_PARTNERSHIP,
  },
  STOCK_TRANSFER_AUTO: {
    path: '/stock/transfer/auto',
    name: 'Stock Transfer Auto',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.PLANNING_PARTNERSHIP,
  },
  GETIR_MARKET_ORDER_FILTER: {
    path: '/marketOrder/filter',
    name: 'Market Order filter',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  MISSING_PRODUCT_ORDERS: {
    path: '/marketOrder/missingProducts',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
    name: 'Missing Products Orders',
  },
  ALGORITHM_CONFIG_LIST: {
    path: '/algorithm/config/list',
    name: 'Algorithm Config List',
    squad: TECH_SQUADS.ALGORITHM.CORE,
  },
  ALGORITHM_CONFIG_DETAIL: {
    path: '/algorithm/config/:namespace/detail/:key',
    name: 'Algorithm Config Detail',
    squad: TECH_SQUADS.ALGORITHM.CORE,
    menuPath: '/algorithm/config/list',
  },
  ALGORITHM_MARKET_DOMAIN_CONFIG_LIST: {
    path: '/algorithm/config/domain/market/list',
    name: 'Algorithm Market Domain Config List',
    squad: TECH_SQUADS.ALGORITHM.CORE,
  },
  ALGORITHM_FOOD_DOMAIN_CONFIG_LIST: {
    path: '/algorithm/config/domain/food/list',
    name: 'Algorithm Domain Config Food List',
    squad: TECH_SQUADS.ALGORITHM.CORE,
  },
  ALGORITHM_VOYAGER_DOMAIN_CONFIG_LIST: {
    path: '/algorithm/config/domain/voyager/list',
    name: 'Algorithm Voyager Domain Config List',
    squad: TECH_SQUADS.ALGORITHM.CORE,
  },
  ALGORITHM_LOCALS_DOMAIN_CONFIG_LIST: {
    path: '/algorithm/config/domain/locals/list',
    name: 'Algorithm Domain Config Locals List',
    squad: TECH_SQUADS.ALGORITHM.CORE,
  },
  ALGORITHM_MARKET_DOMAIN_CONFIG_DETAIL: {
    path: '/algorithm/config/domain/market/detail/:key',
    name: 'Algorithm Market Domain Config Detail',
    squad: TECH_SQUADS.ALGORITHM.CORE,
    menuPath: '/algorithm/config/domain/market/list',
  },
  ALGORITHM_FOOD_DOMAIN_CONFIG_DETAIL: {
    path: '/algorithm/config/domain/food/detail/:key',
    name: 'Algorithm Domain Config Food Detail',
    squad: TECH_SQUADS.ALGORITHM.CORE,
    menuPath: '/algorithm/config/domain/food/list',
  },
  ALGORITHM_VOYAGER_DOMAIN_CONFIG_DETAIL: {
    path: '/algorithm/config/domain/voyager/detail/:key',
    name: 'Algorithm Voyager Domain Config Detail',
    squad: TECH_SQUADS.ALGORITHM.CORE,
    menuPath: '/algorithm/config/domain/voyager/list',
  },
  ALGORITHM_LOCALS_DOMAIN_CONFIG_DETAIL: {
    path: '/algorithm/config/domain/locals/detail/:key',
    name: 'Algorithm Domain Config Locals Detail',
    squad: TECH_SQUADS.ALGORITHM.CORE,
    menuPath: '/algorithm/config/domain/locals/list',
  },
  THIRD_PARTY_COMPANY_LIST: {
    path: '/thirdPartyCompany/list',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Third Party Company List',
  },
  THIRD_PARTY_COMPANY_NEW: {
    path: '/thirdPartyCompany/new',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Third Party Company New',
  },
  THIRD_PARTY_COMPANY_DETAIL: {
    path: '/thirdPartyCompany/detail/:id',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
    name: 'Third Party Company Detail',
    menuPath: '/thirdPartyCompany/list',
  },
  WORKFORCE_CONTRACT_LIST: {
    path: '/person/contract',
    name: 'Person Contract',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  WORKFORCE_CONTRACT_DETAIL: {
    path: '/person/contract/:id',
    name: 'Person Contract - Detail',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    menuPath: '/person/contract',
  },
  WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_LIST: {
    path: '/leaveRequest/list',
    name: 'Employee Leave Requests',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    menuPath: '/leaveRequest/list',
  },
  WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_DETAIL: {
    path: '/leaveRequest/:id',
    name: 'Employee Leave Request - Detail',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
    menuPath: '/leaveRequest/list',
  },
  SEGMENTED_CODE_GENERATOR: {
    path: '/discountCode/segmentedCodeGenerator',
    name: 'Segmented Code Generator',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
  },
  DISCOUNT_CODE_LIST: {
    path: '/discountCode/list',
    name: 'Discount Code List',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
  },
  TIP_PAYBACK_PAYOUT_SUMMARY_LIST: {
    path: '/tip/payback/payout-summary/list',
    name: 'Tip Payback - Payout Summary',
    squad: TECH_SQUADS.DEMAND.PAYMENT.LOCAL,
  },
  TIP_PAYBACK_PAYOUT_SUMMARY_DETAILS: {
    path: '/tip/payback/payout-summary/detail/:id',
    name: 'Tip Payback - Payout Summary Detail',
    squad: TECH_SQUADS.DEMAND.PAYMENT.LOCAL,
    menuPath: '/tip/payback/payout-summary/list',
  },
  TIP_PAYBACK_PAYOUT_SUMMARY_FAIL_REASONS: {
    path: '/tip/payback/payout-summary/fail-reason/:id',
    name: 'Tip Payback - Payout Summary Fail Reason',
    squad: TECH_SQUADS.DEMAND.PAYMENT.LOCAL,
  },
  AUTO_SEGMENT_LIST: {
    path: '/autoSegment/list',
    name: 'Auto Segment List Page',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
  },
  SEGMENT_DETAIL: {
    path: '/segment/detail/:segment',
    name: 'Segment Detail',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
  },
  SEGMENT_LIST: {
    path: '/segment/list',
    name: 'Segment List',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
  },
  SEGMENT_NEW: {
    path: '/segment/new',
    name: 'Segment New',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
  },
  SEGMENT_FRAUD_MANAGEMENT: {
    path: '/segment/fraudManagement',
    name: 'Segment Fraud Management',
    squad: TECH_SQUADS.INFRASTRUCTURE.CORE_ENGINEERING.CORE_SERVICES,
  },
  GETIR_PERSONAL_PROMO_DETAIL: {
    path: '/personalPromo/detail/:promoId',
    name: 'Discount detail',
    squad: TECH_SQUADS.DEMAND.CROSS_DOMAIN.CUSTOMER,
  },
  PERSONAL_PROMO_NEW: {
    path: '/personalPromo/new',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Personal promo new',
  },
  PERSONAL_PROMO_LIST: {
    path: '/personalPromo/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Personal promo list',
  },
  GETIR_MARKET_BAG_CONSTRAINTS: {
    path: '/marketOrder/bagConstraint',
    name: 'Bag constraint',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  GETIR_MARKET_BAG_CONSTRAINT_NEW: {
    path: '/marketOrder/bagConstraint/new',
    name: 'Create Bag constraint',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  GETIR_MARKET_BAG_CONSTRAINT_DETAIL: {
    path: '/marketOrder/bagConstraint/:id',
    name: 'Bag constraint Detail',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  FRANCHISE_CONFIG_LIST: {
    path: '/franchiseDynamicConfig/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Franchise Dynamic Config List',
  },
  FRANCHISE_CONFIG_NEW: {
    path: '/franchiseDynamicConfig/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Create Franchise Config',
  },
  FRANCHISE_CONFIG_DETAIL: {
    path: '/franchiseDynamicConfig/detail/:id',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Franchise Config Detail',
  },
  GETIR_MARKET_GROWTH_COMPARISON: {
    path: '/getirMarket/growth/comparison',
    name: 'GetirMarket Growth Comparison',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  GETIR_FINANCE_ORDER_DETAIL: {
    path: '/financeOrder/detail/:orderId',
    name: 'Finance Order Detail',
    squad: TECH_SQUADS.DEMAND.FINANCE.POST_ORDER,
  },
  GETIR_FINANCE_ORDER_FILTER: {
    path: '/financeOrder/filter',
    name: 'Finance Order Filter',
    squad: TECH_SQUADS.DEMAND.FINANCE.POST_ORDER,
    menuPath: '/financeOrder/filter',
  },
  FRANCHISE_CONFIG_TYPE_LIST: {
    path: '/franchiseConfigType/list',
    name: 'Franchise Config Type List',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
  },
  FRANCHISE_CONFIG_TYPE_NEW: {
    path: '/franchiseConfigType/new',
    name: 'Create Franchise Config Type',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
  },
  FRANCHISE_CONFIG_TYPE_DETAIL: {
    path: '/franchiseConfigType/detail/:configId',
    name: 'Franchise Config Type Detail',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
  },
  MARKET_FEES_BULK_UPLOAD: {
    path: '/marketFees/bulkUpload',
    name: 'Market Fee Bulk Upload',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  MARKET_FEES_DETAILS: {
    path: '/marketFees/detail/warehouse/:warehouseId',
    name: 'GetirMarket Fee Details',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  GETIR_MARKET_BASKET_CONFIG_DETAILS: {
    path: '/basketConfig/detail/warehouse/:warehouseId',
    name: 'Basket Config Details',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  // TODO: This one should also be removed after page logic is handled in original /order/filter page
  N11_ORDER_FILTER: {
    path: '/n11/order/filter',
    name: 'n11 Order filter',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
  },
  BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST: {
    path: '/businessAlertingTool/alertCondition/list',
    name: 'Business Alerting Tool Alert Condition List',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  BUSINESS_ALERTING_TOOL_INCIDENT_LIST: {
    path: '/businessAlertingTool/incident/list',
    name: 'Business Alerting Tool Incident List',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  BUSINESS_ALERTING_TOOL_ALERT_CONDITION_NEW: {
    path: '/businessAlertingTool/alertCondition/new',
    name: 'Business Alerting Tool Alert Condition New',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL: {
    path: '/businessAlertingTool/alertCondition/detail/:alertConditionId',
    name: 'Business Alerting Tool Alert Condition Detail',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  BUSINESS_ALERTING_TOOL_INCIDENT_DETAIL: {
    path: '/businessAlertingTool/incident/detail/:incidentId',
    name: 'Business Alerting Tool Incident Detail',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  LMD_AND_OTHER_EXPENSES_UPLOAD: {
    path: '/lmdAndOtherExpenses/upload',
    name: 'LMD and Other Expenses Upload Page',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.BUSINESS_MONITORING,
  },
  FRANCHISE_LEGAL_NEW: {
    path: '/franchiseLegal/new',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'Upload New Franchise Legal File',
  },
  FRANCHISE_LEGAL_LIST: {
    path: '/franchiseLegal/list',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'List Franchise Legal Files',
  },
  FRANCHISE_LEGAL_DETAIL: {
    path: '/franchiseLegal/detail/:agreementId',
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_PERFORMANCE,
    name: 'List Franchise Legal File Detail',
  },
  MARKET_BASKET_LIST: {
    path: '/marketBasket/list',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
    name: 'List Market Baskets',
  },
  MARKET_BASKET_DETAIL: {
    path: '/marketBasket/:basketId',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
    name: 'Market Basket Detail',
  },
  TOBB_GIB_REQUEST: {
    path: '/stock/tobb',
    exact: true,
    name: 'Tobb Request page',
    squad: TECH_SQUADS.INFRASTRUCTURE.INTRA.ADMIN_PLATFORM,
  },
  MARKETING_APPROVAL_LIST: {
    path: '/marketingApproval/list',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Marketing Approval List page',
  },
  MARKETING_APPROVAL_DETAIL: {
    path: '/marketingApproval/detail/:promoId',
    squad: TECH_SQUADS.DEMAND.MARKET.PROMO,
    name: 'Marketing Approval Detail page',
  },
  LLM_AGENT_GUIDANCE_GENERATION: {
    path: '/llm/agentGuidance',
    squad: TECH_SQUADS.DEMAND.MARKET.POST_ORDER,
    name: 'Agent Guidance ',
  },
  COURIER_GAMIFICATION_TASK_LIST: {
    name: 'Courier Gamification Task List',
    path: '/courier/gamificationTask/list',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  COURIER_GAMIFICATION_TASK_DETAIL: {
    name: 'Courier Gamification Task Detail',
    path: '/courier/gamificationTask/detail/:id',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  COURIER_GAMIFICATION_TASK_SUMMARY: {
    name: 'Courier Gamification Task Summary',
    path: '/courier/gamificationTask/summary/:id',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  COURIER_GAMIFICATION_TASK_CREATE: {
    name: 'Courier Gamification Task Create',
    path: '/courier/gamificationTask/create',
    exact: true,
    squad: TECH_SQUADS.SUPPLY.FRANCHISE.FRANCHISE_STAFF,
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CONFIGURATION: {
    path: '/chainManagement/configuration/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Configuration',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST: {
    path: 'chainManagement/warehouses/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Warehouses List',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_DETAIL: {
    path: '/chainManagement/warehouses/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Warehouses Detail',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST: {
    path: 'chainManagement/products/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Products List',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL: {
    path: '/chainManagement/products/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Products Detail',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL: {
    path: '/chainManagement/darkStore/detail/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Dark Store Detail',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_SUPPLIERS: {
    path: '/chainManagement/warehouses/matchSupplier/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Match Suppliers',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS: {
    path: '/chainManagement/matchDarkstore/:id',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Match CW DS',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST: {
    path: '/chainManagement/chain/list',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Chain List',
  },
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_DETAIL: {
    path: '/chainManagement/chain/detail/:id/:domainType?',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Market Product Chain Management Chain Detail',
  },
  COMMERCE_INTELLIGENCE_PRODUCT_MATCHING: {
    path: '/commerceIntelligence/productMatching',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Commerce Intelligence Product Matching',
  },
  COMMERCE_INTELLIGENCE_SMART_PRICING_INDEX: {
    path: '/commerceIntelligence/smartPricing/index',
    squad: TECH_SQUADS.SUPPLY.COMMERCE.COMMERCE,
    name: 'Commerce Intelligence Smart Pricing Index',
  },
} as const;

type ROUTE_MAP_TYPE = typeof ROUTE_MAP;

// create a type where each field in ROUTE_MAP object gets a "key" property which is the key of the field
type RouteMapWithKey = {
  [K in keyof ROUTE_MAP_TYPE]: ROUTE_MAP_TYPE[K] & { key: K };
};

const routes = Object.entries(ROUTE_MAP).map(([key, route]) => {
  return {
    key,
    ...route,
  };
}) as RouteMapWithKey[keyof RouteMapWithKey][];

export const ROUTE = routes.reduce((acc, route) => {
  return {
    ...acc,
    [route.key]: route,
  };
}, {} as RouteMapWithKey);

export const INITIAL_ROUTE = ROUTE.HOME;

const separateRedirectPath = (referrerUrl: string) => {
  if (
    ROUTE.LOGIN.path === referrerUrl ||
    ROUTE.COUNTRY_SELECTION.path === referrerUrl
  ) {
    return INITIAL_ROUTE.path;
  }

  return referrerUrl;
};

export const REDIRECT_URL = separateRedirectPath(history?.location?.pathname) + (history?.location?.search ?? '');
export const REDIRECT_SEARCH = history?.location?.search ?? '';

export default routes;
