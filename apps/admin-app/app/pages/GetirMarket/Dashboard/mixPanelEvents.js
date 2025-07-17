export const MARKET_DASHBOARD_EVENTS = {
  FILTERED: { EVENT_NAME: 'Market Dashboard - Filtered' },
  SEARCHED: { EVENT_NAME: 'Market Dashboard - Searched' },
  BUTTON_CLICKED: {
    EVENT_NAME: 'Market Dashboard - Button Clicked',
    SPECIAL_DATE_RANGE: 'Special Date Range',
    DATE_TYPE_BY_ENUM: {
      2: 'Hour',
      3: 'Day',
      4: 'Week',
    },
    TABLE_SORTING: {
      PRODUCTS: {
        NAME: 'Products Table',
        availableSlots: 'Table Sorting - Ava',
        itemCount: 'Table Sorting - Sum',
        totalPrice: 'Table Sorting - Bskt',
        percentage: 'Table Sorting - Ratio',
      },
      DELIVERY_FEE_DISCOUNT: {
        NAME: 'Delivery Fee Discount Table',
        count: 'Sorting - Count',
      },
      WAREHOUSE: {
        name: 'WH Table Sorting - Wh',
        city: 'WH Table Sorting - City',
        orderCount: 'WH Table Sorting - Ord',
        missedOrderCount: 'WH Table Sorting - Missed Ord',
        missedOrderRatio: 'WH Table Sorting - Missed Ratio',
        reachDurationAvg: 'WH Table Sorting - Reach',
        reachDurationWithoutQueueAvg: 'WH Table Sorting - Rwoq',
        queuedOrderPct: 'WH Table Sorting - Queue',
        throughput: 'WH Table Sorting - Throughput',
        utilization: 'WH Table Sorting - Utilization',
      },
    },
    TABLE_LISTING: {
      10: 'Table Listing - 10',
      25: 'Table Listing - 25',
      100: 'Table Listing - 100',
      All: 'Table Listing - All',
    },
    CHART_UTILIZATION: 'Chart - Utilization',
    CHART_COURIER: 'Chart - Courier',
    WAREHOUSE: { NAME: 'Warehouse Table', EXPAND: 'Warehouse Expanded' },
    PROMO: { NAME: 'Promo Table' },
  },
};
