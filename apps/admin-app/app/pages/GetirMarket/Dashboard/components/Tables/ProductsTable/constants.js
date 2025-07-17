export const salesGroupType = t => {
  return {
    product: {
      type: 'P',
      shortName: t("getirMarketDashboardPage:PRODUCT_SHORT"),
      fullName: t("getirMarketDashboardPage:PRODUCT"),
      dataSource: 'productAvailability',
    },
    subCategory: {
      type: 'SC',
      shortName: t("getirMarketDashboardPage:SUBCATEGORY_SHORT"),
      fullName: t("getirMarketDashboardPage:SUB_CATEGORY"),
      dataSource: 'subCategoryAvailability',
    },
    category: {
      type: 'C',
      shortName: t("getirMarketDashboardPage:CATEGORY_SHORT"),
      fullName: t("getirMarketDashboardPage:CATEGORY"),
      dataSource: 'categoryAvailability',
    },
    supplier: {
      type: 'S',
      shortName: t("getirMarketDashboardPage:SUPPLIER_SHORT"),
      fullName: t("getirMarketDashboardPage:SUPPLIER"),
      dataSource: 'supplierAvailability',
    },
  };
};
