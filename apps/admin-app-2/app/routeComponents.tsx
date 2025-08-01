import pages from '@app/pages';

const ROUTE_COMPONENTS = {
  // MarketingApproval pages
  MARKETING_APPROVAL_LIST: pages.MarketingApprovalList,
  MARKETING_APPROVAL_DETAIL: pages.MarketingApprovalDetail,

  // MarketProductChainManagement pages
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CONFIGURATION: pages.ChainManagementConfiguration,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_LIST: pages.ChainManagementChainList,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_CHAIN_DETAIL: pages.ChainManagementChainDetail,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_LIST: pages.ChainManagementWarehousesList,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_WAREHOUSES_DETAIL: pages.ChainManagementWarehousesDetail,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_LIST: pages.ChainManagementProductsList,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_PRODUCTS_DETAIL: pages.ChainManagementProductsDetail,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_DARK_STORE_DETAIL: pages.ChainManagementDarkStoreDetail,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_SUPPLIERS: pages.ChainManagementMatchSuppliers,
  MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS: pages.ChainManagementMatchDarkStore,

  // MarketProduct pages
  MARKET_PRODUCT_LIST: pages.MarketProductListV2,
  MARKET_PRODUCT_DETAIL: pages.MarketProductDetailV2,
  MARKET_PRODUCT_PRICING_LIST: pages.MarketProductPricingList,
  MARKET_PRODUCT_PRICING_DETAIL: pages.MarketProductPricingDetail,
  MARKET_PRODUCT_FAMILY_LIST: pages.MarketProductFamilyList,
  MARKET_PRODUCT_RECIPES: pages.MarketProductRecipes,
  MARKET_PRODUCT_RECIPES_DETAIL: pages.MarketProductRecipesDetail,
  MARKET_PRODUCT_RECIPES_SORT: pages.MarketProductRecipesSort,
  MARKET_PRODUCT_FAMILY_DETAIL: pages.MarketProductFamilyDetail,
  MARKET_PRODUCT_PRICING_DISCOUNTED_DETAIL: pages.MarketProductPricingDiscountedDetail,
  MARKET_PRODUCT_SORT: pages.MarketProductSort,
  MARKET_PRODUCT_CATEGORY_LIST: pages.MarketProductCategoryList,
  MARKET_PRODUCT_CATEGORY_NEW: pages.MarketProductCategoryNew,
  MARKET_PRODUCT_CATEGORY_DETAIL: pages.MarketProductCategoryDetail,
  MARKET_PRODUCT_CATEGORY_SORT: pages.MarketProductCategorySort,
  MARKET_PRODUCT_SUB_CATEGORY_SORT: pages.MarketProductSubCategorySort,
  MARKET_PRODUCT_BADGE_LIST: pages.MarketProductBadgeList,
  MARKET_PRODUCT_BADGE_NEW: pages.MarketProductBadgeNew,
  MARKET_PRODUCT_BADGE_DETAIL: pages.MarketProductBadgeDetail,
  MARKET_PRODUCT_GROUP_LIST: pages.MarketProductGroupList,
  MARKET_PRODUCT_GROUP_NEW: pages.MarketProductGroupNew,
  MARKET_PRODUCT_GROUP_DETAIL: pages.MarketProductGroupDetail,
  MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST: pages.MarketProductCategoryVisibilityList,
  MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL: pages.MarketProductCategoryVisibilityDetail,
  MARKET_PRODUCT_CATEGORY_VISIBILITY_NEW: pages.MarketProductCategoryVisibilityNew,
  MARKET_PRODUCT_MASTER_CATEGORY_LIST: pages.MarketProductMasterCategoryList,
  MARKET_PRODUCT_MASTER_CATEGORY_DETAIL: pages.MarketProductMasterCategoryDetail,
  MARKET_PRODUCT_MASTER_CATEGORY_NEW: pages.MarketProductMasterCategoryNew,

  // MarketOrderRatings pages
  GETIR_MARKET_ORDER_RATINGS: pages.MarketOrderRatings,

  // MarketOrderAnalytics pages
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT: pages.ActiveOrdersForManagement,
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION: pages.ActiveOrdersForOperation,
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES: pages.ActiveOrdersForCustomerServices,
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD: pages.ActiveOrdersForExecutiveDashboard,
  MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_GROWTH: pages.ActiveOrdersForGrowth,
  GETIR_MARKET_FRAUD_SUSPICION_ORDERS: pages.FraudSuspicionOrders,

  // MarketOrder pages
  GETIR_MARKET_ORDER_DETAIL: pages.MarketOrderDetail,
  MISSING_PRODUCT_ORDERS: pages.MissingProductOrders,
  GETIR_MARKET_ORDER_FILTER: pages.OrderFilter,
  GETIR_MARKET_BAG_CONSTRAINTS: pages.BagConstraint,
  GETIR_MARKET_BAG_CONSTRAINT_NEW: pages.CreateBagConstraint,

  // MarketIntelligenceProducts pages
  MARKET_INTELLIGENCE_PRODUCTS: pages.MarketIntelligenceProducts,

  // MarketIntelligencePriceRecommendation pages
  MARKET_INTELLIGENCE_PRICE_RECOMMENDATION: pages.MarketIntelligencePriceRecommendation,

  // MarketIntelligencePriceIndex pages
  MARKET_INTELLIGENCE_PRICE_INDEX: pages.MarketIntelligencePriceIndex,

  // MarketFranchise pages
  MARKET_FRANCHISE_NEW: pages.MarketFranchiseNew,
  MARKET_FRANCHISE_LIST: pages.MarketFranchiseList,
  MARKET_FRANCHISE_DETAIL: pages.MarketFranchiseDetail,
  MARKET_FRANCHISE_USER_NEW: pages.MarketFranchiseUserNew,
  MARKET_FRANCHISE_USER_LIST: pages.MarketFranchiseUserList,
  MARKET_FRANCHISE_USER_DETAIL: pages.MarketFranchiseUserDetail,
  MARKET_FRANCHISE_USER_ROLE_NEW: pages.MarketFranchiseUserRoleNew,
  MARKET_FRANCHISE_USER_ROLE_LIST: pages.MarketFranchiseUserRoleList,
  MARKET_FRANCHISE_USER_ROLE_DETAIL: pages.MarketFranchiseUserRoleDetail,
  MARKET_FRANCHISE_USER_ROLE_GROUP_LIST: pages.MarketFranchiseUserRoleGroupList,
  MARKET_FRANCHISE_USER_ROLE_GROUP_NEW: pages.MarketFranchiseUserRoleGroupNew,
  MARKET_FRANCHISE_USER_ROLE_GROUP_DETAIL: pages.MarketFranchiseUserRoleGroupDetail,

  // MarketFees pages
  MARKET_FEES_BULK_UPLOAD: pages.bulkFeeUpload,
  MARKET_FEES_DETAILS: pages.MarketFeesDetail,

  // MarketBasket pages
  MARKET_BASKET_DETAIL: pages.MarketBasketDetail,
  MARKET_BASKET_LIST: pages.MarketBasketList,

  // MarketAutoGrowthOperations pages
  MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS: pages.MarketAutoGrowthOperations,

  // Market pages
  MARKET_BUSINESS_CONFIG: pages.MarketBusinessConfig,
};

export type ROUTE_COMPONENTS_TYPE = typeof ROUTE_COMPONENTS;

export default ROUTE_COMPONENTS;
