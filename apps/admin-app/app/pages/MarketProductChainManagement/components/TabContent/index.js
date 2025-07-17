import { useTranslation } from 'react-i18next';

import TabPanel from '@app/pages/MarketProductChainManagement/components/TabContent/components/TabPanel';
import { CentralWarehouseTable } from '@app/pages/MarketProductChainManagement/components/CentralWarehouseTable';
import { SuppliersTable } from '@app/pages/MarketProductChainManagement/components/SuppliersTable';
import WarehouseListDarkStoreTable from '@app/pages/MarketProductChainManagement/components/WarehouseListDarkStoreTable';

import {
  PAGE_TYPES,
  PRODUCT_TABS,
  WAREHOUSE_LIST_TABS,
  WAREHOUSE_TABS,
  TABS,
} from '@app/pages/MarketProductChainManagement/constants';

import { Tabs } from '@shared/components/GUI';
import { useModals } from '@app/pages/MarketProductChainManagement/components/TabContent/hooks/useModals';

export const INITIAL_FORM_VALUES = Object.freeze({
  search: null,
  domain: null,
  demography: null,
  city: null,
  region: null,
});

const TabContentWrapper = ({
  activeTab,
  formValues,
  setFormValues,
  classes,
  onTabChange,
  pageType,
  tabs: customTabs,
  isWarehouseList,
  tabData,
  loading,
  error,
  cities,
  citiesLoading,
  onCitySearch,
  regions,
  regionsLoading,
  onRegionSearch,
  selectedFreezeColumns,
  setSelectedFreezeColumns,
  selectedManageColumns,
  setSelectedManageColumns,
  demographies,
  demographiesLoading,
  sizes,
  sizesLoading,
  domainTypes,
  domainTypesLoading,
  categories,
  categoriesLoading,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const modals = useModals(activeTab);
  const defaultTabs = pageType === PAGE_TYPES.PRODUCT ? PRODUCT_TABS : WAREHOUSE_TABS;

  // Check if we're on central warehouse tab
  const isCentralWarehouseTab =
    activeTab === TABS.CENTRAL_WAREHOUSE ||
    activeTab === Number(TABS.CENTRAL_WAREHOUSE) ||
    activeTab === String(TABS.CENTRAL_WAREHOUSE);

  if (pageType === PAGE_TYPES.PRODUCT && !customTabs) {
    // For product page without custom tabs
    if (isCentralWarehouseTab) {
      return <CentralWarehouseTable />;
    }

    if (activeTab === TABS.SUPPLIER) {
      return <SuppliersTable />;
    }

    return (
      <TabPanel
        activeTab={activeTab}
        formValues={formValues}
        setFormValues={setFormValues}
        classes={classes}
        modals={modals}
        data={tabData?.data}
        loading={loading}
        error={error}
        pageType={pageType}
        isDetailPage={false}
        cities={cities}
        citiesLoading={citiesLoading}
        onCitySearch={onCitySearch}
        regions={regions}
        regionsLoading={regionsLoading}
        onRegionSearch={onRegionSearch}
        selectedFreezeColumns={selectedFreezeColumns}
        setSelectedFreezeColumns={setSelectedFreezeColumns}
        selectedManageColumns={selectedManageColumns}
        setSelectedManageColumns={setSelectedManageColumns}
        demographies={demographies}
        demographiesLoading={demographiesLoading}
        sizes={sizes}
        sizesLoading={sizesLoading}
        domainTypes={domainTypes}
        domainTypesLoading={domainTypesLoading}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
    );
  }

  let items;
  if (isWarehouseList) {
    items = WAREHOUSE_LIST_TABS.map(tab => {
      const tabKey = tab.key;
      const currentTabData = tabData?.[tabKey];
      const counts = {
        [WAREHOUSE_TABS.CENTRAL_WAREHOUSE]: {
          darkStores: currentTabData?.darkStoresCount || 0,
          products: currentTabData?.productsCount || 0,
          suppliers: currentTabData?.suppliersCount || 0,
        },
        [WAREHOUSE_TABS.DARK_STORE]: {
          products: currentTabData?.productsCount || 0,
          suppliers: currentTabData?.suppliersCount || 0,
          centralWarehouses: currentTabData?.centralWarehousesCount || 0,
        },
      };

      // If Central Warehouse tab, render the CentralWarehouseTable
      if (tabKey === WAREHOUSE_TABS.CENTRAL_WAREHOUSE) {
        return {
          key: String(tabKey),
          label: t(tab.label, {
            count: currentTabData?.count || 0,
            darkStores: counts[tabKey]?.darkStores || 0,
            products: counts[tabKey]?.products || 0,
            suppliers: counts[tabKey]?.suppliers || 0,
          }),
          children: <CentralWarehouseTable />,
        };
      }

      // If Dark Store tab, render the WarehouseListDarkStoreTable
      if (tabKey === WAREHOUSE_TABS.DARK_STORE) {
        return {
          key: String(tabKey),
          label: t(tab.label, {
            count: currentTabData?.count || 0,
            products: counts[tabKey]?.products || 0,
            suppliers: counts[tabKey]?.suppliers || 0,
            centralWarehouses: counts[tabKey]?.centralWarehouses || 0,
          }),
          children: <WarehouseListDarkStoreTable />,
        };
      }

      return {
        key: String(tabKey),
        label: t(tab.label, {
          count: currentTabData?.count || 0,
          darkStores: counts[tabKey]?.darkStores || 0,
          products: counts[tabKey]?.products || 0,
          suppliers: counts[tabKey]?.suppliers || 0,
          centralWarehouses: counts[tabKey]?.centralWarehouses || 0,
        }),
        children: (
          <TabPanel
            key={tabKey}
            activeTab={tabKey}
            formValues={formValues}
            setFormValues={setFormValues}
            classes={classes}
            modals={modals}
            data={currentTabData?.data}
            loading={loading}
            error={error}
            pageType={pageType}
            isDetailPage
            cities={cities}
            citiesLoading={citiesLoading}
            onCitySearch={onCitySearch}
            regions={regions}
            regionsLoading={regionsLoading}
            onRegionSearch={onRegionSearch}
            selectedFreezeColumns={selectedFreezeColumns}
            setSelectedFreezeColumns={setSelectedFreezeColumns}
            selectedManageColumns={selectedManageColumns}
            setSelectedManageColumns={setSelectedManageColumns}
            demographies={demographies}
            demographiesLoading={demographiesLoading}
            sizes={sizes}
            sizesLoading={sizesLoading}
            domainTypes={domainTypes}
            domainTypesLoading={domainTypesLoading}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        ),
      };
    });
  }
  else if (Array.isArray(customTabs)) {
    items = customTabs.map(tab => {
      return {
        key: String(tab.key),
        label: t(tab.label, { count: tabData?.[tab.key]?.count || 0 }),
        children: (
          <TabPanel
            activeTab={tab.key}
            formValues={formValues}
            setFormValues={setFormValues}
            classes={classes}
            modals={modals}
            data={tabData?.[tab.key]?.data}
            loading={loading}
            error={error}
            pageType={pageType}
            isDetailPage
            cities={cities}
            citiesLoading={citiesLoading}
            onCitySearch={onCitySearch}
            regions={regions}
            regionsLoading={regionsLoading}
            onRegionSearch={onRegionSearch}
            selectedFreezeColumns={selectedFreezeColumns}
            setSelectedFreezeColumns={setSelectedFreezeColumns}
            selectedManageColumns={selectedManageColumns}
            setSelectedManageColumns={setSelectedManageColumns}
            demographies={demographies}
            demographiesLoading={demographiesLoading}
            sizes={sizes}
            sizesLoading={sizesLoading}
            domainTypes={domainTypes}
            domainTypesLoading={domainTypesLoading}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        ),
      };
    });
  }
  else {
    items = Object.values(defaultTabs).map(tab => {
      // Eğer Central Warehouse tab'ı ise özel render yapalım
      if (tab === TABS.CENTRAL_WAREHOUSE) {
        return {
          key: String(tab),
          label: t('CENTRAL_WAREHOUSE_WITH_COUNT', {
            count: tabData?.[tab]?.count || 0,
            darkStores: tabData?.[tab]?.darkStoresCount || 0,
            products: tabData?.[tab]?.productsCount || 0,
            suppliers: tabData?.[tab]?.suppliersCount || 0,
          }),
          children: <CentralWarehouseTable />,
        };
      }

      return {
        key: String(tab),
        label: t(tab.label, { count: tabData?.[tab]?.count || 0 }),
        children: (
          <TabPanel
            activeTab={tab}
            formValues={formValues}
            setFormValues={setFormValues}
            classes={classes}
            modals={modals}
            data={tabData?.[tab]?.data}
            loading={loading}
            error={error}
            pageType={pageType}
            isDetailPage={false}
            cities={cities}
            citiesLoading={citiesLoading}
            onCitySearch={onCitySearch}
            regions={regions}
            regionsLoading={regionsLoading}
            onRegionSearch={onRegionSearch}
            selectedFreezeColumns={selectedFreezeColumns}
            setSelectedFreezeColumns={setSelectedFreezeColumns}
            selectedManageColumns={selectedManageColumns}
            setSelectedManageColumns={setSelectedManageColumns}
            demographies={demographies}
            demographiesLoading={demographiesLoading}
            sizes={sizes}
            sizesLoading={sizesLoading}
            domainTypes={domainTypes}
            domainTypesLoading={domainTypesLoading}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        ),
      };
    });
  }

  if (isWarehouseList || Array.isArray(customTabs)) {
    return (
      <Tabs
        defaultActiveKey={String(activeTab)}
        items={items}
        className={classes.tabs}
        onChange={onTabChange}
      />
    );
  }

  if (pageType === PAGE_TYPES.PRODUCT) {
    return (
      <Tabs
        defaultActiveKey={String(activeTab)}
        items={items.reverse()}
        className={classes.tabs}
        onChange={onTabChange}
      />
    );
  }

  return (
    <Tabs
      defaultActiveKey={String(activeTab)}
      items={items}
      className={classes.tabs}
      onChange={onTabChange}
    />
  );
};

export default TabContentWrapper;
