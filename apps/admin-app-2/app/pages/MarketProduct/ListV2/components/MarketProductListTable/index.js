import { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import {
  importMarketProductDetailsSelector,
  exportMarketProductDetailsSelector,
  getMarketProductsSelector,
  importMarketProductAdditionalTablesSelector,
  exportMarketProductAdditionalTablesSelector,
  importMarketProductCategoryPositionsSelector,
  exportMarketProductCategoryPositionsSelector,
  importMarketProductDomainLimitsSelector,
  exportMarketProductDomainLimitsSelector,
  importMarketProductSupplyAndLogisticSelector,
  importMarketProductPricingMetadataSelector, filtersSelector,
  importMarketProductTogglesSelector,
} from '../../redux/selectors';
import { tableColumns } from '../../config';
import {
  IMPORT_EXPORT_KEYS,
  exampleDomainLimit,
  exampleNutritionalInfo,
  exampleProductDetails,
  exampleCategoryPositions,
  exampleSupplyAndLogistic,
  examplePricingMetadata,
  exampleProductToggles,
} from './constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS, MIME_TYPE } from '@shared/shared/constants';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { Table } from '@shared/components/GUI';
import { ImportExportDrawer } from '@shared/components/GUI/ImportExportDrawer';
import { IMPORT_EXPORT_TYPES } from '@shared/components/GUI/constants';
import { CsvDownloader } from './csvDownloader';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const Downloader = selectedItem => <CsvDownloader value={selectedItem} />;

const MarketProductListTable = ({ queryText, ids }) => {
  const dispatch = useDispatch();
  const data = useSelector(getMarketProductsSelector.getData);
  const count = useSelector(getMarketProductsSelector.getCount);
  const statusFilterOptions = useSelector(filtersSelector.getSelectedStatusFilterOptions);
  const isGetProductsPending = useSelector(getMarketProductsSelector.getIsPending);
  const { t } = useTranslation('marketProductPageV2');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const filterOptions = useSelector(filtersSelector.getSelectedFilterOptions);

  const debouncedFilterOptions = useDebounce(filterOptions, DEFAULT_DEBOUNCE_MS);
  const debouncedStatusFilterOptions = useDebounce(statusFilterOptions, DEFAULT_DEBOUNCE_MS);
  const debouncedIds = useDebounce(ids, DEFAULT_DEBOUNCE_MS);

  const { canAccess } = usePermission();

  const fetchPage = useCallback((page, pageSize = currentPageSize) => {
    dispatch(
      Creators.getMarketProductsRequest({
        ...getLimitAndOffset({ currentPage: page, rowsPerPage: pageSize }),
        filterOptions: debouncedFilterOptions,
        statusList: debouncedStatusFilterOptions,
        queryText,
        ids: debouncedIds,
      }),
    );
  }, [dispatch, currentPageSize, debouncedFilterOptions, debouncedStatusFilterOptions, queryText, debouncedIds]);

  const handlePaginationChange = useCallback((newPage, newPageSize) => {
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      fetchPage(newPage, newPageSize);
    }

    setCurrentPageSize(newPageSize);
  }, [fetchPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchPage(1);
  }, [fetchPage, debouncedFilterOptions, debouncedStatusFilterOptions, queryText, debouncedIds]);

  const isImportProductDetailsPending = useSelector(importMarketProductDetailsSelector.getIsPending);
  const isExportProductDetailsPending = useSelector(exportMarketProductDetailsSelector.getIsPending);
  const isImportProductAdditionalTablesPending = useSelector(importMarketProductAdditionalTablesSelector.getIsPending);
  const isExportProductAdditionalTablesPending = useSelector(exportMarketProductAdditionalTablesSelector.getIsPending);
  const isImportProductCategoryPositionsPending = useSelector(importMarketProductCategoryPositionsSelector.getIsPending);
  const isExportProductCategoryPositionsPending = useSelector(exportMarketProductCategoryPositionsSelector.getIsPending);
  const isImportProductDomainLimitsPending = useSelector(importMarketProductDomainLimitsSelector.getIsPending);
  const isExportProductDomainLimitsPending = useSelector(exportMarketProductDomainLimitsSelector.getIsPending);
  const isImportProductSupplyAndLogisticPending = useSelector(importMarketProductSupplyAndLogisticSelector.getIsPending);
  const isImportMarketProductPricingMetadataPending = useSelector(importMarketProductPricingMetadataSelector.getIsPending);
  const isImportProductTogglesPending = useSelector(importMarketProductTogglesSelector.getIsPending);

  const isPending = (
    isGetProductsPending ||
    isImportProductDetailsPending ||
    isExportProductDetailsPending ||
    isImportProductAdditionalTablesPending ||
    isExportProductAdditionalTablesPending ||
    isImportProductCategoryPositionsPending ||
    isExportProductCategoryPositionsPending ||
    isImportProductDomainLimitsPending ||
    isExportProductDomainLimitsPending ||
    isImportProductSupplyAndLogisticPending ||
    isImportMarketProductPricingMetadataPending ||
    isImportProductTogglesPending
  );

  const handleOpenImportExport = useCallback(() => {
    setDrawerVisible(true);
  }, []);

  const handleClose = () => {
    setDrawerVisible(false);
  };

  const handleImport = (loadedBase64File, selectedImport) => {
    switch (selectedImport) {
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL:
        dispatch(Creators.importMarketProductDomainLimitsRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL:
        dispatch(Creators.importMarketProductDetailsRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL:
        dispatch(Creators.importMarketProductAdditionalTablesRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL:
        dispatch(Creators.importMarketProductCategoryPositionsRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL:
        dispatch(Creators.importMarketProductSupplyAndLogisticRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL:
        dispatch(Creators.importMarketProductPricingMetadataRequest({ loadedFile: loadedBase64File }));
        break;
      case IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL:
        dispatch(Creators.importMarketProductTogglesRequest({ loadedFile: loadedBase64File }));
        break;
      default:
    }
  };

  const pagination = useMemo(() => ({
    total: count,
    current: currentPage,
    pageSize: currentPageSize,
    onChange: handlePaginationChange,
  }), [handlePaginationChange, count, currentPage, currentPageSize]);

  const columns = useMemo(() => tableColumns(t), [t]);

  return (
    <>
      <Table
        title={t('PRODUCTS')}
        data-testid="MARKET_PRODUCT_LIST"
        data={data}
        columns={columns}
        loading={isPending}
        pagination={pagination}
        currentPage={currentPage}
        currentPageSize={currentPageSize}
        handleOpenImportExport={handleOpenImportExport}
        total={count}
      />
      <ImportExportDrawer
        visible={drawerVisible}
        onClose={handleClose}
        onImport={handleImport}
        exampleCsvDownloader={Downloader}
        importExportOptions={[
          {
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DOMAIN_LIMITS_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleDomainLimit,
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_DOMAIN_LIMITS_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_DOMAIN_LIMITS_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductDomainLimitsRequest(),
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_ACTIVE_PRODUCTS,
            title: t('global:EXPORT_EXCEL'),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportActiveMarketProductsRequest({ t }),
          },
          {
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_DETAILS_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleProductDetails,
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_DETAILS_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_DETAILS_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductDetailsRequest(),
          },
          {
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_NUTRITIONAL_INFO_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleNutritionalInfo,
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_NUTRITIONAL_INFO_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_NUTRITIONAL_INFO_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductAdditionalTablesRequest(),
          },
          {
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_CATEGORY_POSITIONS_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleCategoryPositions,
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_CATEGORY_POSITIONS_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_CATEGORY_POSITIONS_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductCategoryPositionsRequest(),
          },
          ...(canAccess(permKey.PAGE_MARKET_PRODUCT_LIST_COMPONENT_IMPORT_SUPPLY_AND_LOGISTIC) ? [{
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_SUPPLY_AND_LOGISTIC_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleSupplyAndLogistic,
          }]
            : []),
          ...(canAccess(permKey.PAGE_MARKET_PRODUCT_LIST_COMPONENT_IMPORT_PRICE_METADATA) ? [{
            key: IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_MARKET_PRODUCT_PRICING_METADATA_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: examplePricingMetadata,
          }]
            : []),
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_SUPPLY_AND_LOGISTIC_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_PRODUCT_SUPPLY_AND_LOGISTIC_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductSupplyAndLogisticRequest(),
          },
          {
            key: IMPORT_EXPORT_KEYS.EXPORT_MARKET_PRODUCT_PRICING_METADATA_TO_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.EXPORT_MARKET_PRODUCT_PRICING_METADATA_TO_EXCEL),
            type: IMPORT_EXPORT_TYPES.EXPORT,
            action: Creators.exportMarketProductPricingMetadataRequest(),
          },
          {
            key: IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL,
            title: t(IMPORT_EXPORT_KEYS.IMPORT_PRODUCT_TOGGLES_FROM_EXCEL),
            type: IMPORT_EXPORT_TYPES.IMPORT,
            accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
            example: exampleProductToggles,
          },
        ]}
      />
    </>
  );
};

export default MarketProductListTable;
