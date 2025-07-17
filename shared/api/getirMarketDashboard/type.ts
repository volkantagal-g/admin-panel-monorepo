export type GetWarehouseOrderStatsType = {
  warehouseOrderStats: {
    [domainType: string]: {
      warehouse: string;
      domainType: number;
      orderCount: number;
      missedOrderCount: number;
      netRevenue: number;
      netRevenueTaxExcluded: number;
    }[];
  };
  isNewDataAccessUsed: boolean;
}

export type GetWarehouseStatsV2Type = {
  warehouseStats: {
    [domainType: string]: [
      {
        warehouse: string;
        domainType: number;
        orderCount: number;
        missedOrderCount: number;
        netRevenue: number;
        netRevenueTaxExcluded: number;
        utilizedHours: number;
        idleHours: number;
        busyHours: number;
        batchOrder: [
          {
            warehouse: string;
            domainType: number;
            batchIndex: number;
            orderCount: number;
            nonQueuedOrderCount: number;
            checkoutToReachDuration: number;
            checkoutToReachDurationNonQueued: number;
          }
        ];
      }
    ];
  };
  isNewDataAccessUsed: boolean;
};

export type GetClientOrdersType = {
  isNewDataAccessUsed: boolean;
  rankStats: [];
};

export type GetClientDownloadSignupStatsType = {
  isNewDataAccessUsed: boolean;
  downloadClientCount: number;
  signupClientCount: number;
  subscriptionClientCount: number;
};

export type GetOrderPromoDistributionBetweenDatesType = {
  totalOrder: number;
  organicOrders: number;
  usedPromoOrders: number;
  getirFinancedCount: number;
  usedTotalPromoCounts: number;
  supplierSupportedCount: number;
  thirdPartySupportedCount: number;
  data: {
    [domainType: string]: {
      items: [
        {
          promoCode: string;
          orderCount: number;
        }
      ];
      orderCount: number;
    };
  };
  isNewDataAccessUsed: boolean;
};
