import { Result } from 'antd';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import DraggableTable from '@app/pages/MarketProductChainManagement/components/DraggableTable';
import { defaultVisibleColumns } from '@app/pages/MarketProductChainManagement/components/DraggableTable/config';
import Filters from '@app/pages/MarketProductChainManagement/components/Filters';
import FreezeColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/FreezeColumnsModal';
import ManageColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/ManageColumnsModal';
import {
  DARKSTORE_TABS,
  darkStoreDetailModalOptions,
  PAGE_SIZE_OPTIONS,
  PAGE_TYPES,
  PRODUCT_TABS,
  productModalOptions,
  productSupplierModalOptions,
  WAREHOUSE_TABS,
  warehouseModalOptions,
} from '@app/pages/MarketProductChainManagement/constants';
import useStyles from './styles';

const TabPanel = ({
  activeTab,
  formValues,
  setFormValues,
  modals,
  data,
  loading,
  error,
  pageType,
  isDetailPage,
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
  const classes = useStyles();
  const [openFreezeColumnsModal, setOpenFreezeColumnsModal] = useState(false);
  const [openManageColumnsModal, setOpenManageColumnsModal] = useState(false);

  useEffect(() => {
    if (setSelectedManageColumns) {
      if (activeTab === PRODUCT_TABS.SUPPLIERS && pageType === PAGE_TYPES.PRODUCT) {
        const supplierColumns = ['name', 'type', 'netBuyingPrice', 'bonuses', 'preferred'];
        setSelectedManageColumns(supplierColumns);

        setTimeout(() => {
          setSelectedManageColumns(supplierColumns);
        }, 100);
      }
      else {
        const defaultColumns = activeTab ? defaultVisibleColumns[activeTab] : defaultVisibleColumns.default;
        setSelectedManageColumns(defaultColumns || []);
      }
    }
  }, [activeTab, pageType, setSelectedManageColumns]);

  const getModalOptions = () => {
    if (activeTab === PRODUCT_TABS.PRODUCTS) {
      return productModalOptions;
    }
    if (activeTab === PRODUCT_TABS.SUPPLIERS) {
      return productSupplierModalOptions;
    }
    if (activeTab === WAREHOUSE_TABS.CENTRAL_WAREHOUSE) {
      return warehouseModalOptions[WAREHOUSE_TABS.CENTRAL_WAREHOUSE];
    }
    if (activeTab === WAREHOUSE_TABS.DARK_STORE) {
      return warehouseModalOptions[WAREHOUSE_TABS.DARK_STORE];
    }
    if (Object.values(DARKSTORE_TABS).includes(activeTab)) {
      return darkStoreDetailModalOptions[activeTab] || [];
    }
    return [];
  };

  const handleTableChange = useCallback((newPagination, filters, sortConfig) => {
    const updatedValues = {
      ...formValues,
      filters: formValues.filters,
    };

    if (newPagination) {
      updatedValues.pagination = {
        page: newPagination.current,
        pageSize: newPagination.pageSize,
      };
    }

    if (sortConfig?.field) {
      updatedValues.sort = {
        field: sortConfig.field,
        order: sortConfig.order,
      };
    }

    setFormValues(updatedValues);
  }, [formValues, setFormValues]);

  const currentPagination = {
    current: Number(formValues?.pagination?.page) || 1,
    pageSize: Number(formValues?.pagination?.pageSize) || 10,
    total: Number(formValues?.pagination?.total) || 0,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showTotal: (totalRecords, range) => `${range[0]}-${range[1]} / ${totalRecords}`,
    position: ['bottomRight'],
    hideOnSinglePage: false,
    showQuickJumper: true,
  };

  const tableData = Array.isArray(data) ? data : [];

  const content = (
    <div className={classNames(classes.paginationContainer, { loading })}>
      <Filters
        activeTab={activeTab}
        formValues={formValues}
        setFormValues={setFormValues}
        pageType={pageType}
        setOpenFreezeColumnsModal={setOpenFreezeColumnsModal}
        setOpenManageColumnsModal={setOpenManageColumnsModal}
        isDetailPage={isDetailPage}
        cities={cities}
        citiesLoading={citiesLoading}
        onCitySearch={onCitySearch}
        regions={regions}
        regionsLoading={regionsLoading}
        onRegionSearch={onRegionSearch}
        demographies={demographies}
        demographiesLoading={demographiesLoading}
        sizes={sizes}
        sizesLoading={sizesLoading}
        domainTypes={domainTypes}
        domainTypesLoading={domainTypesLoading}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
      <DraggableTable
        data={tableData}
        activeTab={activeTab}
        selectedFreezeColumns={selectedFreezeColumns}
        selectedManageColumns={selectedManageColumns}
        onDeletePlatform={modals?.onDeletePlatform}
        isDetailPage={isDetailPage}
        pageType={pageType}
        pagination={currentPagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <FreezeColumnsModal
        openFreezeColumnsModal={openFreezeColumnsModal}
        setOpenFreezeColumnsModal={setOpenFreezeColumnsModal}
        options={getModalOptions()}
        selectedFreezeColumns={selectedFreezeColumns}
        setSelectedFreezeColumns={setSelectedFreezeColumns}
      />

      <ManageColumnsModal
        openManageColumnsModal={openManageColumnsModal}
        setOpenManageColumnsModal={setOpenManageColumnsModal}
        options={getModalOptions()}
        selectedManageColumns={selectedManageColumns}
        setSelectedManageColumns={setSelectedManageColumns}
        activeTab={activeTab}
        pageType={pageType}
      />
    </div>
  );

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Result
          status="error"
          title="Error"
          subTitle={error.message || 'An unknown error occurred'}
          className={classes.errorResult}
        />
      </div>
    );
  }

  return content;
};

export default TabPanel;
