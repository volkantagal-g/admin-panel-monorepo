import Loadable from '@shared/utils/loadable';

const pages = {
  Health: Loadable(() => {
    return import('@app/pages/Health');
  }),
  Login: Loadable(() => {
    return import('@app/pages/Login');
  }),
  Logout: Loadable(() => {
    return import('@app/pages/Logout');
  }),
  CountrySelection: Loadable(() => {
    return import('@app/pages/CountrySelection');
  }),
  NotFound: Loadable(() => {
    return import('@app/pages/NotFound');
  }),
  PersonalPromoGenerator: Loadable(() => {
    return import('@app/pages/PersonalPromo/Generator');
  }),
  ExcludePromoProducts: Loadable(() => {
    return import('@app/pages/ExcludePromoProducts');
  }),
  PersonalPromoNew: Loadable(() => {
    return import('@app/pages/PersonalPromo/New');
  }),
  PersonalPromoList: Loadable(() => {
    return import('@app/pages/PersonalPromo/List');
  }),
  Home: Loadable(() => {
    return import('@app/pages/Home');
  }),
  TransferGroupList: Loadable(() => {
    return import('@app/pages/TransferGroup/List');
  }),
  TransferGroupNew: Loadable(() => {
    return import('@app/pages/TransferGroup/New');
  }),
  TransferGroupDetail: Loadable(() => {
    return import('@app/pages/TransferGroup/Detail');
  }),
  SupplierList: Loadable(() => {
    return import('@app/pages/Supplier/List');
  }),
  SupplierNew: Loadable(() => {
    return import('@app/pages/Supplier/New');
  }),
  SupplierDetail: Loadable(() => {
    return import('@app/pages/Supplier/Detail');
  }),
  PageList: Loadable(() => {
    return import('@app/pages/Page/List');
  }),
  PageNew: Loadable(() => {
    return import('@app/pages/Page/New');
  }),
  PageDetail: Loadable(() => {
    return import('@app/pages/Page/Detail');
  }),
  PanelDocDetail: Loadable(() => {
    return import('@app/pages/PanelDoc/Detail');
  }),
  PanelDocPreview: Loadable(() => {
    return import('@app/pages/PanelDoc/Preview');
  }),
  PanelDocSearch: Loadable(() => {
    return import('@app/pages/PanelDoc/Search');
  }),
  Profile: Loadable(() => {
    return import('@app/pages/Profile');
  }),
  UserList: Loadable(() => {
    return import('@app/pages/User/List');
  }),
  UserNew: Loadable(() => {
    return import('@app/pages/User/New');
  }),
  UserDetail: Loadable(() => {
    return import('@app/pages/User/Detail');
  }),
  UserWebhelpMatching: Loadable(() => {
    return import('@app/pages/User/WebhelpMatching');
  }),
  ExternalCustomerServicesPanelAccountManagement: Loadable(() => {
    return import(
      '@app/pages/User/ExternalCustomerServicesPanelAccountManagement'
    );
  }),
  CompanyKPIDictionary: Loadable(() => {
    return import('@app/pages/Company/KPIDictionary');
  }),
  RoleHierarchy: Loadable(() => {
    return import('@app/pages/Role/Hierarchy');
  }),
  RoleList: Loadable(() => {
    return import('@app/pages/Role/List');
  }),
  RoleNew: Loadable(() => {
    return import('@app/pages/Role/New');
  }),
  RoleDetail: Loadable(() => {
    return import('@app/pages/Role/Detail');
  }),
  ComponentNew: Loadable(() => {
    return import('@app/pages/Component/New');
  }),
  ComponentDetail: Loadable(() => {
    return import('@app/pages/Component/Detail');
  }),
  BrandList: Loadable(() => {
    return import('@app/pages/Brand/List');
  }),
  BrandNew: Loadable(() => {
    return import('@app/pages/Brand/New');
  }),
  BrandDetail: Loadable(() => {
    return import('@app/pages/Brand/Detail');
  }),
  MarketProductCategoryList: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/List');
  }),
  MarketProductCategoryNew: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/New');
  }),
  MarketProductCategoryDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/Detail');
  }),
  MarketProductListV2: Loadable(() => {
    return import('@app/pages/MarketProduct/ListV2');
  }),
  MarketProductDetailV2: Loadable(() => {
    return import('@app/pages/MarketProduct/DetailV2');
  }),
  MarketProductPricingList: Loadable(() => {
    return import('@app/pages/MarketProduct/Pricing');
  }),
  MarketProductPricingDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Pricing/Detail');
  }),
  MarketProductFamilyList: Loadable(() => {
    return import('@app/pages/MarketProduct/Family');
  }),
  MarketProductRecipes: Loadable(() => {
    return import('@app/pages/MarketProduct/Recipes/List');
  }),
  MarketProductRecipesDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Recipes/Detail');
  }),
  MarketProductRecipesSort: Loadable(() => {
    return import('@app/pages/MarketProduct/Recipes/Sort');
  }),
  MarketProductFamilyDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Family/Detail');
  }),
  MarketProductPricingDiscountedDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Pricing/DiscountedDetail');
  }),
  MarketProductSort: Loadable(() => {
    return import('@app/pages/MarketProduct/Sort');
  }),
  MarketProductCategorySort: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/Sort');
  }),
  MarketProductSubCategorySort: Loadable(() => {
    return import('@app/pages/MarketProduct/SubCategory/Sort');
  }),
  MarketProductCategoryVisibilityList: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/Visibility/List');
  }),
  MarketProductCategoryVisibilityNew: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/Visibility/New');
  }),
  MarketProductCategoryVisibilityDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Category/Visibility/Detail');
  }),
  MarketProductBadgeList: Loadable(() => {
    return import('@app/pages/MarketProduct/Badge/List');
  }),
  MarketProductBadgeNew: Loadable(() => {
    return import('@app/pages/MarketProduct/Badge/New');
  }),
  MarketProductBadgeDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Badge/Detail');
  }),
  MarketProductGroupList: Loadable(() => {
    return import('@app/pages/MarketProduct/Group/List');
  }),
  MarketProductGroupNew: Loadable(() => {
    return import('@app/pages/MarketProduct/Group/New');
  }),
  MarketProductGroupDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/Group/Detail');
  }),
  MarketProductMasterCategoryList: Loadable(() => {
    return import('@app/pages/MarketProduct/MasterCategory/List');
  }),
  MarketProductMasterCategoryDetail: Loadable(() => {
    return import('@app/pages/MarketProduct/MasterCategory/Detail');
  }),
  MarketProductMasterCategoryNew: Loadable(() => {
    return import('@app/pages/MarketProduct/MasterCategory/New');
  }),
  artisanOrderFilter: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Filter');
  }),
  GetirFoodOrderLiveMap: Loadable(() => {
    return import('@app/pages/GetirFood/LiveMap');
  }),
  GetirFoodOrderSummary: Loadable(() => {
    return import('@app/pages/GetirFood/ActiveOrderSummary');
  }),
  GetirFoodOrderActive: Loadable(() => {
    return import('@app/pages/GetirFood/ActiveOrders');
  }),
  GetirFoodOrderFilter: Loadable(() => {
    return import('@app/pages/GetirFood/FilterOrders');
  }),
  GetirFoodOrderDetail: Loadable(() => {
    return import('@app/pages/GetirFood/OrderDetail');
  }),
  GetirFoodBasketDetail: Loadable(() => {
    return import('@app/pages/GetirFood/BasketDetail');
  }),
  GetirFoodFinancialDashboardV2: Loadable(() => {
    return import('@app/pages/GetirFood/FinancialDashboardV2');
  }),
  GetirFoodFinancialDashboardV2Detail: Loadable(() => {
    return import('@app/pages/GetirFood/FinancialDashboardV2Detail');
  }),
  GetirFoodMealCardReconciliation: Loadable(() => {
    return import('@app/pages/GetirFood/MealCardReconciliation');
  }),
  GetirFoodERPDataTrackingV2: Loadable(() => {
    return import('@app/pages/GetirFood/ERPDataTrackingV2');
  }),
  GetirFoodRestaurantExternalTransaction: Loadable(() => {
    return import('@app/pages/GetirFood/RestaurantExternalTransaction');
  }),
  GetirFoodRestaurantPaybackStatus: Loadable(() => {
    return import('@app/pages/GetirFood/RestaurantPaybackStatus');
  }),
  GetirFoodFinancialConfigs: Loadable(() => {
    return import('@app/pages/GetirFood/FinancialConfigs');
  }),
  GetirFoodWithholdingTaxReports: Loadable(() => {
    return import('@app/pages/GetirFood/WithholdingTaxReports');
  }),
  WarehouseList: Loadable(() => {
    return import('@app/pages/Warehouse/List');
  }),
  WarehouseDetail: Loadable(() => {
    return import('@app/pages/Warehouse/Detail');
  }),
  WarehouseNew: Loadable(() => {
    return import('@app/pages/Warehouse/New');
  }),
  WarehouseLiveMap: Loadable(() => {
    return import('@app/pages/Warehouse/LiveMap');
  }),
  DeliveryFeeBulkUpload: Loadable(() => {
    return import('@app/pages/DeliveryFeeBulkUpload');
  }),
  ServiceFeeBulkUpload: Loadable(() => {
    return import('@app/pages/ServiceFeeBulkUpload');
  }),
  WarehouseProposalList: Loadable(() => {
    return import('@app/pages/WarehouseProposal/List');
  }),
  WarehouseProposalDetail: Loadable(() => {
    return import('@app/pages/WarehouseProposal/Detail');
  }),
  WarehouseProposalCreate: Loadable(() => {
    return import('@app/pages/WarehouseProposal/Create');
  }),
  EmployeeList: Loadable(() => {
    return import('@app/pages/Employee/List');
  }),
  EmployeeAssetList: Loadable(() => {
    return import('@app/pages/Asset/List');
  }),
  EmployeeNew: Loadable(() => {
    return import('@app/pages/Employee/New');
  }),
  AssetManagementList: Loadable(() => {
    return import('@app/pages/Employee/AssetManagement/List');
  }),
  AssetManagementDetail: Loadable(() => {
    return import('@app/pages/Employee/AssetManagement/Detail');
  }),
  AssetManagementNew: Loadable(() => {
    return import('@app/pages/Employee/AssetManagement/New');
  }),
  AssetManagementLogs: Loadable(() => {
    return import('@app/pages/Employee/AssetManagement/Logs');
  }),
  AssetNew: Loadable(() => {
    return import('@app/pages/Asset/New');
  }),
  AssetDashboard: Loadable(() => {
    return import('@app/pages/Asset/Dashboard');
  }),
  AssetDetail: Loadable(() => {
    return import('@app/pages/Asset/Detail');
  }),
  EmployeeDetail: Loadable(() => {
    return import('@app/pages/Employee/Detail');
  }),
  EmployeeDetailAssetList: Loadable(() => {
    return import('@app/pages/Employee/Asset/List');
  }),
  MentorshipProfile: Loadable(() => {
    return import('@app/pages/Mentorship/Profile');
  }),
  MentorshipMentorDetail: Loadable(() => {
    return import('@app/pages/Mentorship/Mentor/Detail');
  }),
  MentorshipSearch: Loadable(() => {
    return import('@app/pages/Mentorship/Search');
  }),
  MentorshipCourseDetail: Loadable(() => {
    return import('@app/pages/Mentorship/Course/Detail');
  }),
  MentorshipProgress: Loadable(() => {
    return import('@app/pages/Mentorship/Progress');
  }),
  CourierDetail: Loadable(() => {
    return import('@app/pages/Courier/Detail');
  }),
  CourierNotificationList: Loadable(() => {
    return import('@app/pages/CourierCommunication/NotificationList/List');
  }),
  CourierCreateNotification: Loadable(() => {
    return import('@app/pages/CourierCommunication/NotificationList/New');
  }),
  CourierNotificationDetail: Loadable(() => {
    return import('@app/pages/CourierCommunication/NotificationList/Detail');
  }),
  EmployeeHome: Loadable(() => {
    return import('@app/pages/Employee/Home');
  }),
  EmployeeLogs: Loadable(() => {
    return import('@app/pages/Employee/Logs');
  }),
  EmployeePermitList: Loadable(() => {
    return import('@app/pages/Employee/Permit/List');
  }),
  EmployeeOfficeAttendanceTrackingCapacityManagement: Loadable(() => {
    return import(
      '@app/pages/Employee/OfficeAttendanceTracking/CapacityManagement'
    );
  }),
  EmployeeOfficeAttendanceTrackingDashboard: Loadable(() => {
    return import('@app/pages/Employee/OfficeAttendanceTracking/Dashboard');
  }),
  EmployeeOfficeAttendanceTrackingEmployeeTransactions: Loadable(() => {
    return import(
      '@app/pages/Employee/OfficeAttendanceTracking/EmployeeTransactions'
    );
  }),
  // EmployeeOfficeAttendanceTrackingTrend: Loadable(() => {
  //   return import('@app/pages/Employee/OfficeAttendanceTracking/Trend');
  // }),
  MarketFranchiseList: Loadable(() => {
    return import('@app/pages/MarketFranchise/List');
  }),
  MarketFranchiseNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/New');
  }),
  MarketFranchiseDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/Detail');
  }),
  ConfigList: Loadable(() => {
    return import('@app/pages/Config/List');
  }),
  ConfigLog: Loadable(() => {
    return import('@app/pages/Config/Log');
  }),
  ConfigNew: Loadable(() => {
    return import('@app/pages/Config/New');
  }),
  ConfigWorkingHours: Loadable(() => {
    return import('@app/pages/Config/WorkingHours');
  }),
  ConfigPeakHours: Loadable(() => {
    return import('@app/pages/Config/PeakHours');
  }),
  ConfigMobileAnimation: Loadable(() => {
    return import('@app/pages/Config/MobileAnimation');
  }),
  PolygonMap: Loadable(() => {
    return import('@app/pages/Polygon/Map');
  }),
  GisBannedAreas: Loadable(() => {
    return import('@app/pages/GIS/BannedAreas');
  }),
  ServiceAvailabilityAreaList: Loadable(() => {
    return import('@app/pages/ServiceAvailabilityArea/List');
  }),
  ServiceAvailabilityAreaDetail: Loadable(() => {
    return import('@app/pages/ServiceAvailabilityArea/Detail');
  }),
  ServiceAvailabilityAreaEdit: Loadable(() => {
    return import('@app/pages/ServiceAvailabilityArea/Edit');
  }),
  ServiceAvailabilityAreaNew: Loadable(() => {
    return import('@app/pages/ServiceAvailabilityArea/New');
  }),
  DtsSummary: Loadable(() => {
    return import('@app/pages/Dts/Summary');
  }),
  DtsRuleList: Loadable(() => {
    return import('@app/pages/Dts/Rule/List');
  }),
  DtsLogsUpdate: Loadable(() => {
    return import('@app/pages/Dts/Upload');
  }),
  DtsRuleNew: Loadable(() => {
    return import('@app/pages/Dts/Rule/New');
  }),
  DtsRuleDetail: Loadable(() => {
    return import('@app/pages/Dts/Rule/Detail');
  }),
  DailyTrackingOrder: Loadable(() => {
    return import('@app/pages/DailyTracking/Order');
  }),
  DailyTrackingCourier: Loadable(() => {
    return import('@app/pages/DailyTracking/Courier');
  }),
  ContentCreation: Loadable(() => {
    return import('@app/pages/ContentCreation');
  }),
  ContentUploadS3: Loadable(() => {
    return import('@app/pages/ContentUpload/S3');
  }),
  PromoBadgesList: Loadable(() => {
    return import('@app/pages/Promo/Badges/List');
  }),
  PromoList: Loadable(() => {
    return import('@app/pages/Promo/List');
  }),
  PromoDetail: Loadable(() => {
    return import('@app/pages/Promo/Detail');
  }),
  DiscountCodeList: Loadable(() => {
    return import('@app/pages/DiscountCode/List');
  }),
  PersonRequestList: Loadable(() => {
    return import('@app/pages/Person/Request/List');
  }),
  PersonRequesDetail: Loadable(() => {
    return import('@app/pages/Person/Request/Detail');
  }),
  ArtisanOrderLiveMap: Loadable(() => {
    return import('@app/pages/ArtisanOrder/LiveMap');
  }),
  FranchiseBillManagementList: Loadable(() => {
    return import('@app/pages/FranchiseBillManagement/List');
  }),
  FranchiseBillManagementDetail: Loadable(() => {
    return import('@app/pages/FranchiseBillManagement/Detail');
  }),
  FranchiseEarningsList: Loadable(() => {
    return import('@app/pages/FranchiseEarnings/List');
  }),
  OrderGrowthMonitoring: Loadable(() => {
    return import('@app/pages/Growth/OrderGrowthMonitoring');
  }),
  ArtisanOrderActive: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Active');
  }),
  Returns: Loadable(() => {
    return import('@app/pages/LocalsReturns/List');
  }),
  ClientTargeting: Loadable(() => {
    return import('@app/pages/ClientTargeting');
  }),
  ABTestList: Loadable(() => {
    return import('@app/pages/ABTest/List');
  }),
  ABTestNew: Loadable(() => {
    return import('@app/pages/ABTest/New');
  }),
  ABTestDetail: Loadable(() => {
    return import('@app/pages/ABTest/Detail');
  }),
  StaffPlanPublication: Loadable(() => {
    return import('@app/pages/StaffPlanPublication');
  }),

  CustomerAgreement: Loadable(() => {
    return import('@app/pages/CustomerAgreement');
  }),
  ArtisanOrderDetail: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Detail');
  }),
  GLRunnerNew: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Runner/New');
  }),
  ActiveOrdersForManagement: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/ActiveOrdersForManagement');
  }),
  ActiveOrdersForOperation: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/ActiveOrdersForOperation');
  }),
  ActiveOrdersForCustomerServices: Loadable(() => {
    return import(
      '@app/pages/MarketOrderAnalytics/ActiveOrdersForCustomerServices'
    );
  }),
  ActiveOrdersForExecutiveDashboard: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/ActiveOrdersSummary');
  }),
  ActiveOrdersForGrowth: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/ActiveOrdersForGrowth');
  }),
  PersonList: Loadable(() => {
    return import('@app/pages/Person/List');
  }),
  PersonNew: Loadable(() => {
    return import('@app/pages/Person/New');
  }),
  PersonDetail: Loadable(() => {
    return import('@app/pages/Person/Detail');
  }),
  PersonCandidateList: Loadable(() => {
    return import('@app/pages/Person/Candidate/List');
  }),
  PersonCandidateDetail: Loadable(() => {
    return import('@app/pages/Person/Candidate/Detail');
  }),
  ClientListDoubleChecker: Loadable(() => {
    return import('@app/pages/ClientListDoubleChecker');
  }),
  GLGrowthComparison: Loadable(() => {
    return import('@app/pages/GLGrowthComparison');
  }),
  GLReturnAlert: Loadable(() => {
    return import('@app/pages/GLReturn/Alert');
  }),
  GLReturnAlertDetail: Loadable(() => {
    return import('@app/pages/GLReturn/Detail');
  }),
  GLRunnerList: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Runner/List');
  }),
  GLRunnerDetail: Loadable(() => {
    return import('@app/pages/ArtisanOrder/Runner/Detail');
  }),
  GLERPDataTracking: Loadable(() => {
    return import('@app/pages/LocalsERPDataTracking');
  }),
  GLShopExternalTransaction: Loadable(() => {
    return import('@app/pages/ShopExternalTransaction');
  }),
  GLShopPaybackStatus: Loadable(() => {
    return import('@app/pages/ShopPaybackStatus');
  }),
  GetirLocalsWithholdingTaxReports: Loadable(() => {
    return import('@app/pages/GetirLocals/WithholdingTaxReports');
  }),
  EUGrowthComparison: Loadable(() => {
    return import('@app/pages/EUGrowthComparison');
  }),
  CourierLiveMonitoring: Loadable(() => {
    return import('@app/pages/LiveMonitoring/CourierLiveMonitoring');
  }),
  CourierLoyaltyList: Loadable(() => {
    return import('@app/pages/CourierLoyalty/List');
  }),
  OperationsLiveMonitoring: Loadable(() => {
    return import('@app/pages/LiveMonitoring/Operations');
  }),
  LocalsLiveMonitoringCourier: Loadable(() => {
    return import('@app/pages/LiveMonitoring/Locals/Courier');
  }),
  ReportsList: Loadable(() => {
    return import('@app/pages/Report/Reports/List');
  }),
  ReportNew: Loadable(() => {
    return import('@app/pages/Report/Reports/New');
  }),
  ReportTypeList: Loadable(() => {
    return import('@app/pages/Report/ReportTypes/List');
  }),
  ReportTypeNew: Loadable(() => {
    return import('@app/pages/Report/ReportTypes/New');
  }),
  ReportTypeDetail: Loadable(() => {
    return import('@app/pages/Report/ReportTypes/Detail');
  }),
  ReportTagsList: Loadable(() => {
    return import('@app/pages/Report/ReportTags/List');
  }),
  ReportTagsNew: Loadable(() => {
    return import('@app/pages/Report/ReportTags/New');
  }),
  ReportTagsDetail: Loadable(() => {
    return import('@app/pages/Report/ReportTags/Detail');
  }),
  GetirDriveDashboard: Loadable(() => {
    return import('@app/pages/GetirDrive/Dashboard');
  }),
  GetirMarketLiveMap: Loadable(() => {
    return import('@app/pages/GetirMarket/LiveMap');
  }),
  GetirMarketDashboard: Loadable(() => {
    return import('@app/pages/GetirMarket/Dashboard');
  }),
  GetirMarketCommercialMonitoring: Loadable(() => {
    return import('@app/pages/GetirMarket/CommercialMonitoring');
  }),
  DailySummaryGlobal: Loadable(() => {
    return import('@app/pages/DailySummary/Global');
  }),
  DailySummaryCountry: Loadable(() => {
    return import('@app/pages/DailySummary/Country');
  }),
  DailySummaryFoundersCustom: Loadable(() => {
    return import('@app/pages/DailySummary/FoundersCustom');
  }),
  DdsObjectionList: Loadable(() => {
    return import('@app/pages/Dds/Objection/List');
  }),
  DdsObjectionDetail: Loadable(() => {
    return import('@app/pages/Dds/Objection/Detail');
  }),
  LotteryNew: Loadable(() => {
    return import('@app/pages/Lottery/New');
  }),
  LotteryDetail: Loadable(() => {
    return import('@app/pages/Lottery/Detail');
  }),
  FranchiseRequestList: Loadable(() => {
    return import('@app/pages/FranchiseRequest/List');
  }),
  FranchiseEarningsUpload: Loadable(() => {
    return import('@app/pages/FranchiseEarnings/Upload');
  }),
  GetirWaterCourierStatus: Loadable(() => {
    return import('@app/pages/GetirWater/CourierStatus');
  }),
  GetirWaterAnnouncementsList: Loadable(() => {
    return import('@app/pages/GetirWater/Announcements/List');
  }),
  GetirWaterAnnouncementNew: Loadable(() => {
    return import('@app/pages/GetirWater/Announcements/New');
  }),
  GetirWaterAnnouncementDetail: Loadable(() => {
    return import('@app/pages/GetirWater/Announcements/Detail');
  }),
  GetirWaterSlotConfig: Loadable(() => {
    return import('@app/pages/GetirWater/SlotConfig');
  }),
  GiveawayEventList: Loadable(() => {
    return import('@app/pages/GiveawayEvent/List');
  }),
  PushNoticationList: Loadable(() => {
    return import('@app/pages/PushNotification/List');
  }),
  PushNoticationNew: Loadable(() => {
    return import('@app/pages/PushNotification/New');
  }),
  PushNoticationDetail: Loadable(() => {
    return import('@app/pages/PushNotification/Detail');
  }),
  PopupList: Loadable(() => {
    return import('@app/pages/Popup/List');
  }),
  PopupNew: Loadable(() => {
    return import('@app/pages/Popup/New');
  }),
  PopupDetail: Loadable(() => {
    return import('@app/pages/Popup/Detail');
  }),
  SmsList: Loadable(() => {
    return import('@app/pages/Sms/List');
  }),
  SmsNew: Loadable(() => {
    return import('@app/pages/Sms/New');
  }),
  SmsDetail: Loadable(() => {
    return import('@app/pages/Sms/Detail');
  }),
  TransactionalNotificationList: Loadable(() => {
    return import('@app/pages/TransactionalNotification/List');
  }),
  TransactionalNotificationNew: Loadable(() => {
    return import('@app/pages/TransactionalNotification/New');
  }),
  TransactionalNotificationDetail: Loadable(() => {
    return import('@app/pages/TransactionalNotification/Detail');
  }),
  TransactionalSmsList: Loadable(() => {
    return import('@app/pages/TransactionalSms/List');
  }),
  TransactionalSmsNew: Loadable(() => {
    return import('@app/pages/TransactionalSms/New');
  }),
  TransactionalSmsDetail: Loadable(() => {
    return import('@app/pages/TransactionalSms/Detail');
  }),
  CommunicationHistory: Loadable(() => {
    return import('@app/pages/CommunicationHistory');
  }),
  AnnouncementList: Loadable(() => {
    return import('@app/pages/Announcement/List');
  }),
  AnnouncementNew: Loadable(() => {
    return import('@app/pages/Announcement/New');
  }),
  AnnouncementDetail: Loadable(() => {
    return import('@app/pages/Announcement/Detail');
  }),
  BannerList: Loadable(() => {
    return import('@app/pages/Banner/List');
  }),
  BannerNew: Loadable(() => {
    return import('@app/pages/Banner/New');
  }),
  BannerDetail: Loadable(() => {
    return import('@app/pages/Banner/Detail');
  }),
  NotificationCenterList: Loadable(() => {
    return import('@app/pages/NotificationCenter/List');
  }),
  NotificationCenterNew: Loadable(() => {
    return import('@app/pages/NotificationCenter/New');
  }),
  NotificationCenterDetail: Loadable(() => {
    return import('@app/pages/NotificationCenter/Detail');
  }),
  EmailList: Loadable(() => {
    return import('@app/pages/Email/List');
  }),
  EmailNew: Loadable(() => {
    return import('@app/pages/Email/New');
  }),
  EmailDetail: Loadable(() => {
    return import('@app/pages/Email/Detail');
  }),
  CommunicationServiceCredentialsList: Loadable(() => {
    return import('@app/pages/CommunicationServiceCredentials/List');
  }),
  CommunicationServiceCredentialsNew: Loadable(() => {
    return import('@app/pages/CommunicationServiceCredentials/New');
  }),
  CommunicationServiceCredentialsDetail: Loadable(() => {
    return import('@app/pages/CommunicationServiceCredentials/Detail');
  }),
  TechnologyComplianceReportHome: Loadable(() => {
    return import('@app/pages/technology/ComplianceReport/Home');
  }),
  TechnologyComplianceReportNodeVersions: Loadable(() => {
    return import('@app/pages/technology/ComplianceReport/Node/Versions');
  }),
  TechnologyComplianceReportNodeVulnerabilities: Loadable(() => {
    return import(
      '@app/pages/technology/ComplianceReport/Node/Vulnerabilities'
    );
  }),
  TechnologyComplianceReportNodeVulnerabilityDetail: Loadable(() => {
    return import(
      '@app/pages/technology/ComplianceReport/Node/VulnerabilityDetail'
    );
  }),
  CallbackUrlsList: Loadable(() => {
    return import('@app/pages/CommunicationCallbackUrls/List');
  }),
  CallbackUrlsNew: Loadable(() => {
    return import('@app/pages/CommunicationCallbackUrls/New');
  }),
  CallbackUrlsDetail: Loadable(() => {
    return import('@app/pages/CommunicationCallbackUrls/Detail');
  }),
  BulkSmsList: Loadable(() => {
    return import('@app/pages/CommunicationBulkSms/List');
  }),
  BulkSmsNew: Loadable(() => {
    return import('@app/pages/CommunicationBulkSms/New');
  }),
  BulkSmsDetail: Loadable(() => {
    return import('@app/pages/CommunicationBulkSms/Detail');
  }),
  WarehouseSegmentList: Loadable(() => {
    return import('@app/pages/WarehouseSegment/List');
  }),
  WarehouseSegmentDetail: Loadable(() => {
    return import('@app/pages/WarehouseSegment/Detail');
  }),
  WarehouseSegmentNew: Loadable(() => {
    return import('@app/pages/WarehouseSegment/New');
  }),
  WarehouseSegmentMatchingUpload: Loadable(() => {
    return import('@app/pages/WarehouseSegment/Upload');
  }),
  GetirWaterActiveOrders: Loadable(() => {
    return import('@app/pages/GetirWater/ActiveOrders');
  }),
  GetirWaterOrderFilter: Loadable(() => {
    return import('@app/pages/GetirWater/OrderFilter');
  }),
  GetirWaterVendorFilter: Loadable(() => {
    return import('@app/pages/GetirWater/VendorFilter');
  }),
  DYSConfigurations: Loadable(() => {
    return import('@app/pages/DysConfiguration');
  }),
  BankReconciliationReport: Loadable(() => {
    return import('@app/pages/Payment/Reconciliation/BankReconciliationReport');
  }),
  GetirWaterCampaignsList: Loadable(() => {
    return import('@app/pages/GetirWater/Campaigns/List');
  }),
  GetirWaterCampaignNew: Loadable(() => {
    return import('@app/pages/GetirWater/Campaigns/New');
  }),
  GetirWaterCampaignDetail: Loadable(() => {
    return import('@app/pages/GetirWater/Campaigns/Detail');
  }),
  GetirWaterOrderDetail: Loadable(() => {
    return import('@app/pages/GetirWater/OrderDetail');
  }),
  LocationWriteOffNew: Loadable(() => {
    return import('@app/pages/WriteOff/LocationWriteOff/New');
  }),
  LocationWriteOffDetail: Loadable(() => {
    return import('@app/pages/WriteOff/LocationWriteOff/Detail');
  }),
  LocationWriteOffList: Loadable(() => {
    return import('@app/pages/WriteOff/LocationWriteOff/List');
  }),
  ClientDetail: Loadable(() => {
    return import('@app/pages/Client/Detail');
  }),
  ClientList: Loadable(() => {
    return import('@app/pages/Client/List');
  }),
  ClientAttachmentsDetail: Loadable(() => {
    return import('@app/pages/Client/AttachmentsDetail');
  }),
  MarketOrderRatings: Loadable(() => {
    return import('@app/pages/MarketOrderRatings');
  }),
  FranchiseEquipmentList: Loadable(() => {
    return import('@app/pages/FranchiseEquipment/List');
  }),
  FranchiseEquipmentNew: Loadable(() => {
    return import('@app/pages/FranchiseEquipment/New');
  }),
  FranchiseEquipmentDetail: Loadable(() => {
    return import('@app/pages/FranchiseEquipment/Detail');
  }),
  InternalAuthenticationTeamDetail: Loadable(() => {
    return import('@app/pages/InternalAuthentication/Team/Detail');
  }),
  InternalAuthenticationTeamList: Loadable(() => {
    return import('@app/pages/InternalAuthentication/Team/List');
  }),
  InternalAuthenticationServiceDetail: Loadable(() => {
    return import('@app/pages/InternalAuthentication/Service/Detail');
  }),
  InternalAuthenticationServiceList: Loadable(() => {
    return import('@app/pages/InternalAuthentication/Service/List');
  }),
  KdsQuestionGroupList: Loadable(() => {
    return import('@app/pages/Kds/QuestionGroup/List');
  }),
  KdsQuestionGroupNew: Loadable(() => {
    return import('@app/pages/Kds/QuestionGroup/New');
  }),
  KdsQuestionGroupDetail: Loadable(() => {
    return import('@app/pages/Kds/QuestionGroup/Detail');
  }),
  KdsScoreMapping: Loadable(() => {
    return import('@app/pages/Kds/ScoreMapping');
  }),
  KdsAuditFormTypeList: Loadable(() => {
    return import('@app/pages/Kds/AuditFormType/List');
  }),
  KdsAuditFormTypeNew: Loadable(() => {
    return import('@app/pages/Kds/AuditFormType/New');
  }),
  KdsAuditFormTypeDetail: Loadable(() => {
    return import('@app/pages/Kds/AuditFormType/Detail');
  }),
  KdsQuestionNew: Loadable(() => {
    return import('@app/pages/Kds/Question/New');
  }),
  KdsQuestionList: Loadable(() => {
    return import('@app/pages/Kds/Question/List');
  }),
  KdsQuestionDetail: Loadable(() => {
    return import('@app/pages/Kds/Question/Detail');
  }),
  StoreAuditList: Loadable(() => {
    return import('@app/pages/Kds/StoreAudit/List');
  }),
  StoreAuditNew: Loadable(() => {
    return import('@app/pages/Kds/StoreAudit/New');
  }),
  StoreAuditDetail: Loadable(() => {
    return import('@app/pages/Kds/StoreAudit/Detail');
  }),
  CourierPlanList: Loadable(() => {
    return import('@app/pages/CourierPlan/List');
  }),
  CourierPlanNew: Loadable(() => {
    return import('@app/pages/CourierPlan/New');
  }),
  CourierPlanProceed: Loadable(() => {
    return import('@app/pages/CourierPlan/Detail');
  }),
  VehicleConstraintNew: Loadable(() => {
    return import('@app/pages/Fleet/VehicleConstraint/New');
  }),
  VehicleList: Loadable(() => {
    return import('@app/pages/Fleet/Vehicle/List');
  }),
  VehicleNew: Loadable(() => {
    return import('@app/pages/Fleet/Vehicle/New');
  }),
  VehicleDetail: Loadable(() => {
    return import('@app/pages/Fleet/Vehicle/Details');
  }),
  VehicleConstraintDetail: Loadable(() => {
    return import('@app/pages/Fleet/VehicleConstraint/Detail');
  }),
  VehicleConstraintList: Loadable(() => {
    return import('@app/pages/Fleet/VehicleConstraint/List');
  }),
  TmsDriverList: Loadable(() => {
    return import('@app/pages/Fleet/TmsDriver/List');
  }),
  TmsDriverDetail: Loadable(() => {
    return import('@app/pages/Fleet/TmsDriver/Detail');
  }),
  TmsList: Loadable(() => {
    return import('@app/pages/Fleet/TMS/List');
  }),
  TmsNew: Loadable(() => {
    return import('@app/pages/Fleet/TMS/New');
  }),
  TmsDetail: Loadable(() => {
    return import('@app/pages/Fleet/TMS/Detail');
  }),
  MarketFranchiseUserRoleNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/New');
  }),
  MarketFranchiseUserRoleList: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/List');
  }),
  MarketFranchiseUserRoleDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/Detail');
  }),
  PlanogramProductsList: Loadable(() => {
    return import('@app/pages/Planogram/Products');
  }),
  PlanogramWarehousesList: Loadable(() => {
    return import('@app/pages/Planogram/Warehouses');
  }),
  PlanogramWarehousesDetail: Loadable(() => {
    return import('@app/pages/Planogram/Warehouses/Detail');
  }),
  PlanogramWarehouseConvert: Loadable(() => {
    return import('@app/pages/Planogram/Warehouses/Convert');
  }),
  GisHeatMap: Loadable(() => {
    return import('@app/pages/GIS/HeatMap');
  }),
  GisLocationIntelligence: Loadable(() => {
    return import('@app/pages/GIS/LocationIntelligence');
  }),
  GisWeatherMap: Loadable(() => {
    return import('@app/pages/GIS/WeatherMap');
  }),
  GisAddressSearch: Loadable(() => {
    return import('@app/pages/GIS/AddressSearch');
  }),
  GisCountryCityManagement: Loadable(() => {
    return import('@app/pages/GIS/CountryCityManagement');
  }),
  PlanogramProductDetail: Loadable(() => {
    return import('@app/pages/Planogram/Products/Detail');
  }),
  PlanogramProductConvert: Loadable(() => {
    return import('@app/pages/Planogram/Products/Convert');
  }),
  FieldAnnouncementCreate: Loadable(() => {
    return import('@app/pages/FieldAnnouncement/Create');
  }),
  FieldAnnouncementList: Loadable(() => {
    return import('@app/pages/FieldAnnouncement/List');
  }),
  FieldAnnouncementListByWarehouse: Loadable(() => {
    return import('@app/pages/FieldAnnouncement/ListByWarehouse');
  }),
  FieldAnnouncementDetail: Loadable(() => {
    return import('@app/pages/FieldAnnouncement/Detail');
  }),
  GrowthDashboard: Loadable(() => {
    return import('@app/pages/Growth/Dashboard');
  }),
  MarketFranchiseUserRoleGroupNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/New');
  }),
  MarketFranchiseUserRoleGroupDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/Detail');
  }),
  PickerList: Loadable(() => {
    return import('@app/pages/Picker/List');
  }),
  PickerDetail: Loadable(() => {
    return import('@app/pages/Picker/Detail');
  }),
  MarketFranchiseUserRoleGroupList: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/List');
  }),
  MarketOrderDetail: Loadable(() => {
    return import('@app/pages/MarketOrder/OrderDetail');
  }),
  PaymentMerchantList: Loadable(() => {
    return import('@app/pages/Payment/Merchant/List');
  }),
  PaymentMerchantDetail: Loadable(() => {
    return import('@app/pages/Payment/Merchant/Detail');
  }),
  PaymentMerchantNew: Loadable(() => {
    return import('@app/pages/Payment/Merchant/New');
  }),
  FraudSuspicionOrders: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/FraudSuspicionOrders');
  }),
  MarketFranchiseUserNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/New');
  }),
  MarketFranchiseUserList: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/List');
  }),
  MarketFranchiseUserDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Detail');
  }),
  MissingProductOrders: Loadable(() => {
    return import('@app/pages/MarketOrder/MissingProduct');
  }),
  CourierList: Loadable(() => {
    return import('@app/pages/Courier/List');
  }),
  CourierStatusAndBusyList: Loadable(() => {
    return import('@app/pages/CourierStatus/List');
  }),
  CourierFeedbackList: Loadable(() => {
    return import('@app/pages/CourierFeedback/List');
  }),
  DtsCategorySettingList: Loadable(() => {
    return import('@app/pages/DtsSettings/Category/List');
  }),
  DtsCategorySettingNew: Loadable(() => {
    return import('@app/pages/DtsSettings/Category/New');
  }),
  DtsCategorySettingDetail: Loadable(() => {
    return import('@app/pages/DtsSettings/Category/Detail');
  }),
  DtsFeedbackSourceSettingList: Loadable(() => {
    return import('@app/pages/DtsSettings/FeedbackSource/List');
  }),
  DtsFeedbackSourceSettingNew: Loadable(() => {
    return import('@app/pages/DtsSettings/FeedbackSource/New');
  }),
  DtsFeedbackSourceSettingDetail: Loadable(() => {
    return import('@app/pages/DtsSettings/FeedbackSource/Detail');
  }),
  DtsPrioritySettingList: Loadable(() => {
    return import('@app/pages/DtsSettings/Priority/List');
  }),
  DtsPrioritySettingNew: Loadable(() => {
    return import('@app/pages/DtsSettings/Priority/New');
  }),
  DtsPrioritySettingDetail: Loadable(() => {
    return import('@app/pages/DtsSettings/Priority/Detail');
  }),
  StockOrderVolumeAuto: Loadable(() => {
    return import('@app/pages/Stock/Order/VolumeAuto');
  }),
  OnOffPromoConfig: Loadable(() => {
    return import('@app/pages/OnOffPromoConfig');
  }),
  PaymentTransactionList: Loadable(() => {
    return import('@app/pages/Payment/Transactions/List');
  }),
  PaymentTransactionDetail: Loadable(() => {
    return import('@app/pages/Payment/Transactions/Detail');
  }),
  PaymentEventDetail: Loadable(() => {
    return import('@app/pages/Payment/Event/Detail');
  }),
  StockOrderAuto: Loadable(() => {
    return import('@app/pages/Stock/Order/Auto');
  }),
  AlgorithmConfigList: Loadable(() => {
    return import('@app/pages/Algorithm/Config/List');
  }),
  AlgorithmConfigDetail: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Detail');
  }),
  AlgorithmMarketConfigList: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Market/List');
  }),
  AlgorithmFoodConfigList: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Food/List');
  }),
  AlgorithmVoyagerConfigList: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Voyager/List');
  }),
  AlgorithmLocalsConfigList: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Locals/List');
  }),
  AlgorithmMarketConfigDetail: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Market/Detail');
  }),
  AlgorithmFoodConfigDetail: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Food/Detail');
  }),
  AlgorithmVoyagerConfigDetail: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Voyager/Detail');
  }),
  AlgorithmLocalsConfigDetail: Loadable(() => {
    return import('@app/pages/Algorithm/Config/Domain/Locals/Detail');
  }),
  CourierNotificationSegmentList: Loadable(() => {
    return import('@app/pages/CourierCommunication/NotificationSegment/List');
  }),
  CourierNotificationCreateSegment: Loadable(() => {
    return import('@app/pages/CourierCommunication/NotificationSegment/New');
  }),
  StockTransferAuto: Loadable(() => {
    return import('@app/pages/Stock/Transfer/Auto');
  }),
  OrderFilter: Loadable(() => {
    return import('@app/pages/MarketOrder/OrderFilter');
  }),
  DtsList: Loadable(() => {
    return import('@app/pages/Dts/General/List');
  }),
  DtsNew: Loadable(() => {
    return import('@app/pages/Dts/General/New');
  }),
  DtsDetail: Loadable(() => {
    return import('@app/pages/Dts/General/Detail');
  }),
  ThirdPartyCompanyList: Loadable(() => {
    return import('@app/pages/ThirdPartyCompany/List');
  }),
  ThirdPartyCompanyNew: Loadable(() => {
    return import('@app/pages/ThirdPartyCompany/New');
  }),
  ThirdPartyCompanyDetail: Loadable(() => {
    return import('@app/pages/ThirdPartyCompany/Detail');
  }),
  PricingTool: Loadable(() => {
    return import('@app/pages/PricingTool');
  }),
  PersonContractList: Loadable(() => {
    return import('@app/pages/Employee/ContractType/List');
  }),
  PersonContractDetail: Loadable(() => {
    return import('@app/pages/Employee/ContractType/Detail');
  }),
  SegmentedCodeGenerator: Loadable(() => {
    return import('@app/pages/DiscountCode/SegmentedCodeGenerator');
  }),
  MarketBusinessConfig: Loadable(() => {
    return import('@app/pages/Market/BusinessConfig');
  }),
  HighLevelDys: Loadable(() => {
    return import('@app/pages/HighLevelDys');
  }),
  CustomerSatisfactionRequestNew: Loadable(() => {
    return import('@app/pages/CustomerSatisfactionRequest/New');
  }),
  MarketIntelligencePriceIndex: Loadable(() => {
    return import('@app/pages/MarketIntelligencePriceIndex');
  }),
  MarketIntelligencePriceRecommendation: Loadable(() => {
    return import('@app/pages/MarketIntelligencePriceRecommendation');
  }),
  TipPaybackPayoutSummaryList: Loadable(() => {
    return import('@app/pages/TipPayback/PayoutSummaryList');
  }),
  TipPaybackPayoutSummaryDetails: Loadable(() => {
    return import('@app/pages/TipPayback/PayoutSummaryDetails');
  }),
  TipPayoutSummaryFailReasons: Loadable(() => {
    return import('@app/pages/TipPayback/PayoutSummaryFailReasons');
  }),
  AutoSegmentList: Loadable(() => {
    return import('@app/pages/AutoSegment/List');
  }),
  SegmentDetail: Loadable(() => {
    return import('@app/pages/Segment/Detail');
  }),
  SegmentList: Loadable(() => {
    return import('@app/pages/Segment/List');
  }),
  SegmentNew: Loadable(() => {
    return import('@app/pages/Segment/New');
  }),
  MarketIntelligenceProducts: Loadable(() => {
    return import('@app/pages/MarketIntelligenceProducts');
  }),
  DiscountDetail: Loadable(() => {
    return import('@app/pages/PersonalPromo/Detail');
  }),
  MarketAutoGrowthOperations: Loadable(() => {
    return import('@app/pages/MarketAutoGrowthOperations');
  }),
  BagConstraint: Loadable(() => {
    return import('@app/pages/MarketOrder/BagConstraint/List');
  }),
  CreateBagConstraint: Loadable(() => {
    return import('@app/pages/MarketOrder/BagConstraint/New');
  }),
  FranchiseDynamicConfigList: Loadable(() => {
    return import('@app/pages/FranchiseDynamicConfig/List');
  }),
  FranchiseDynamicConfigNew: Loadable(() => {
    return import('@app/pages/FranchiseDynamicConfig/New');
  }),
  FranchiseDynamicConfigDetail: Loadable(() => {
    return import('@app/pages/FranchiseDynamicConfig/Detail');
  }),
  GetirMarketGrowthComparison: Loadable(() => {
    return import('@app/pages/GetirMarket/Growth/Comparison');
  }),
  ReconciliationDailyReport: Loadable(() => {
    return import(
      '@app/pages/Payment/Reconciliation/ReconciliationDailyReport'
    );
  }),
  OrderCounter: Loadable(() => {
    return import('@app/pages/OrderCounter');
  }),
  InstallmentCommissions: Loadable(() => {
    return import('@app/pages/Payment/InstallmentCommissions');
  }),
  LeaveManagementList: Loadable(() => {
    return import('@app/pages/LeaveManagement/List');
  }),
  LeaveManagementDetail: Loadable(() => {
    return import('@app/pages/LeaveManagement/Detail');
  }),
  TimesheetLock: Loadable(() => {
    return import('@app/pages/TimesheetLock');
  }),
  TimesheetLogs: Loadable(() => {
    return import('@app/pages/TimesheetLogs');
  }),
  WorkforceReports: Loadable(() => {
    return import('@app/pages/WorkforceReports');
  }),
  SlotPlanManagement: Loadable(() => {
    return import('@app/pages/SlotPlanManagement');
  }),
  FinanceOrderDetail: Loadable(() => {
    return import('@app/pages/FinanceOrder/detail');
  }),
  FinanceOrderFilter: Loadable(() => {
    return import('@app/pages/FinanceOrder/filter');
  }),
  FranchiseConfigTypeList: Loadable(() => {
    return import('@app/pages/FranchiseConfigType/List');
  }),
  FranchiseConfigTypeNew: Loadable(() => {
    return import('@app/pages/FranchiseConfigType/New');
  }),
  FranchiseConfigTypeDetail: Loadable(() => {
    return import('@app/pages/FranchiseConfigType/Detail');
  }),
  bulkFeeUpload: Loadable(() => {
    return import('@app/pages/MarketFees/BulkFeeUpload');
  }),
  MarketFeesDetail: Loadable(() => {
    return import('@app/pages/MarketFees/Detail');
  }),
  BasketConfigDetails: Loadable(() => {
    return import('@app/pages/BasketConfig/Detail');
  }),
  PayoutsForDomains: Loadable(() => {
    return import('@app/pages/Payment/Reconciliation/PayoutsForDomains');
  }),
  BusinessAlertingToolAlertConditionList: Loadable(() => {
    return import('@app/pages/BusinessAlertingTool/AlertCondition/List');
  }),
  BusinessAlertingToolIncidentList: Loadable(() => {
    return import('@app/pages/BusinessAlertingTool/Incident/List');
  }),
  BusinessAlertingToolAlertConditionNew: Loadable(() => {
    return import('@app/pages/BusinessAlertingTool/AlertCondition/New');
  }),
  BusinessAlertingToolAlertConditionDetail: Loadable(() => {
    return import('@app/pages/BusinessAlertingTool/AlertCondition/Detail');
  }),
  BusinessAlertingToolIncidentDetail: Loadable(() => {
    return import('@app/pages/BusinessAlertingTool/Incident/Detail');
  }),
  LMDAndOtherExpensesUpload: Loadable(() => {
    return import('@app/pages/LmdAndOtherExpenses/Upload');
  }),
  FranchiseLegalList: Loadable(() => {
    return import('@app/pages/FranchiseLegal/List');
  }),
  FranchiseLegalNew: Loadable(() => {
    return import('@app/pages/FranchiseLegal/Upload');
  }),
  ABTestV2List: Loadable(() => {
    return import('@app/pages/ABTestV2/List');
  }),
  ABTestV2New: Loadable(() => {
    return import('@app/pages/ABTestV2/New');
  }),
  ABTestV2Detail: Loadable(() => {
    return import('@app/pages/ABTestV2/Detail');
  }),
  FranchiseLegalDetail: Loadable(() => {
    return import('@app/pages/FranchiseLegal/Detail');
  }),
  PayoutsTransactionsForDomains: Loadable(() => {
    return import(
      '@app/pages/Payment/Reconciliation/PayoutsTransactionsForDomains'
    );
  }),
  MarketBasketList: Loadable(() => {
    return import('@app/pages/MarketBasket/List');
  }),
  MarketBasketDetail: Loadable(() => {
    return import('@app/pages/MarketBasket/Detail');
  }),
  TobbGibRequest: Loadable(() => {
    return import('@app/pages/Stock/Tobb');
  }),
  GenericNavigator: Loadable(() => {
    return import('@app/pages/GenericNavigator');
  }),
  BankReconciliationSummary: Loadable(() => {
    return import(
      '@app/pages/Payment/Reconciliation/BankReconciliationSummary'
    );
  }),
  MarketingApprovalList: Loadable(() => {
    return import('@app/pages/MarketingApproval/List');
  }),
  MarketingApprovalDetail: Loadable(() => {
    return import('@app/pages/MarketingApproval/Detail');
  }),
  PaymentFraudControlList: Loadable(() => {
    return import('@app/pages/Payment/FraudControl');
  }),
  AgentGuidanceGeneration: Loadable(() => {
    return import('@app/pages/llm/AgentGuidance');
  }),
  CourierGamificationTaskList: Loadable(() => {
    return import('@app/pages/CourierGamification/List');
  }),
  CourierGamificationTaskDetail: Loadable(() => {
    return import('@app/pages/CourierGamification/Detail');
  }),
  CourierGamificationTaskSummary: Loadable(() => {
    return import('@app/pages/CourierGamification/Summary');
  }),
  CourierGamificationTaskCreate: Loadable(() => {
    return import('@app/pages/CourierGamification/Create');
  }),
  ChainManagementWarehousesList: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Warehouses');
  }),
  ChainManagementWarehousesDetail: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Warehouses/Detail');
  }),
  ChainManagementProductsList: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Products');
  }),
  ChainManagementProductsDetail: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Products/Detail');
  }),
  ChainManagementConfiguration: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Configuration');
  }),
  ChainManagementDarkStoreDetail: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Warehouses/DarkStore');
  }),
  ChainManagementMatchSuppliers: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Warehouses/MatchSuppliers');
  }),
  ChainManagementMatchDarkStore: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Warehouses/MatchDarkstore');
  }),
  ChainManagementChainList: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Chain');
  }),
  ChainManagementChainDetail: Loadable(() => {
    return import('@app/pages/MarketProductChainManagement/Chain/Detail');
  }),
  SegmentFraudManagement: Loadable(() => {
    return import('@app/pages/Segment/FraudManagement');
  }),
  CommerceIntelligenceProductMatching: Loadable(() => {
    return import('@app/pages/CommerceIntelligence/ProductMatching');
  }),
  CommerceIntelligenceSmartPricingIndex: Loadable(() => {
    return import('@app/pages/CommerceIntelligence/SmartPricing/Index');
  }),
};

export default pages;
