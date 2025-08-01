import Loadable from '@shared/utils/loadable';

const pages = {
  // MarketingApproval pages
  MarketingApprovalList: Loadable(() => {
    return import('@app/pages/MarketingApproval/List');
  }),
  MarketingApprovalDetail: Loadable(() => {
    return import('@app/pages/MarketingApproval/Detail');
  }),

  // MarketProductChainManagement pages
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

  // MarketProduct pages
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

  // MarketOrderRatings pages
  MarketOrderRatings: Loadable(() => {
    return import('@app/pages/MarketOrderRatings');
  }),

  // MarketOrderAnalytics pages
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
  FraudSuspicionOrders: Loadable(() => {
    return import('@app/pages/MarketOrderAnalytics/FraudSuspicionOrders');
  }),

  // MarketOrder pages
  MarketOrderDetail: Loadable(() => {
    return import('@app/pages/MarketOrder/OrderDetail');
  }),
  MissingProductOrders: Loadable(() => {
    return import('@app/pages/MarketOrder/MissingProduct');
  }),
  OrderFilter: Loadable(() => {
    return import('@app/pages/MarketOrder/OrderFilter');
  }),
  BagConstraint: Loadable(() => {
    return import('@app/pages/MarketOrder/BagConstraint/List');
  }),
  CreateBagConstraint: Loadable(() => {
    return import('@app/pages/MarketOrder/BagConstraint/New');
  }),

  // MarketIntelligenceProducts pages
  MarketIntelligenceProducts: Loadable(() => {
    return import('@app/pages/MarketIntelligenceProducts');
  }),

  // MarketIntelligencePriceRecommendation pages
  MarketIntelligencePriceRecommendation: Loadable(() => {
    return import('@app/pages/MarketIntelligencePriceRecommendation');
  }),

  // MarketIntelligencePriceIndex pages
  MarketIntelligencePriceIndex: Loadable(() => {
    return import('@app/pages/MarketIntelligencePriceIndex');
  }),

  // MarketFranchise pages
  MarketFranchiseList: Loadable(() => {
    return import('@app/pages/MarketFranchise/List');
  }),
  MarketFranchiseNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/New');
  }),
  MarketFranchiseDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/Detail');
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
  MarketFranchiseUserRoleNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/New');
  }),
  MarketFranchiseUserRoleList: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/List');
  }),
  MarketFranchiseUserRoleDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/Role/Detail');
  }),
  MarketFranchiseUserRoleGroupNew: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/New');
  }),
  MarketFranchiseUserRoleGroupDetail: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/Detail');
  }),
  MarketFranchiseUserRoleGroupList: Loadable(() => {
    return import('@app/pages/MarketFranchise/User/RoleGroup/List');
  }),

  // MarketFees pages
  bulkFeeUpload: Loadable(() => {
    return import('@app/pages/MarketFees/BulkFeeUpload');
  }),
  MarketFeesDetail: Loadable(() => {
    return import('@app/pages/MarketFees/Detail');
  }),

  // MarketBasket pages
  MarketBasketList: Loadable(() => {
    return import('@app/pages/MarketBasket/List');
  }),
  MarketBasketDetail: Loadable(() => {
    return import('@app/pages/MarketBasket/Detail');
  }),

  // MarketAutoGrowthOperations pages
  MarketAutoGrowthOperations: Loadable(() => {
    return import('@app/pages/MarketAutoGrowthOperations');
  }),

  // Market pages
  MarketBusinessConfig: Loadable(() => {
    return import('@app/pages/Market/BusinessConfig');
  }),
};

export default pages;