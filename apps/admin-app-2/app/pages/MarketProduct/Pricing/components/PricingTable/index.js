import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';

import { deleteDiscountedPriceSelector, deletePriceSelector, getMarketProductsPriceListSelector } from '@app/pages/MarketProduct/Pricing/redux/selector';
import { exampleDomainCsv, exampleWarehouseCsv, exampleWasteCsv, TableColumns, exampleBuyingPricesJson } from './config';
import { Modal, Table } from '@shared/components/GUI';
import { getWarehousesSelector, getMarketProductsSelector } from '@shared/redux/selectors/common';
import { modifiedPriceTableList, isAllowedToOperate } from '@app/pages/MarketProduct/Pricing/utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import { Creators } from '@app/pages/MarketProduct/Pricing/redux/actions';
import { IMPORT_EXPORT_TYPES } from '@shared/components/GUI/constants';
import { ImportExportDrawer } from '@shared/components/GUI/ImportExportDrawer';
import { SELLING_PRICE_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { IMPORT_EXPORT_KEYS } from '@app/pages/MarketProduct/Pricing/constants';
import { MIME_TYPE } from '@shared/shared/constants';
import { CsvDownloader } from '@app/pages/MarketProduct/Pricing/components/PricingTable/csvDownloader';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const Downloader = selectedItem => <CsvDownloader value={selectedItem} />;

const PricingTable = ({ formValues }) => {
  const { t } = useTranslation('marketProductPricingPage');
  const dispatch = useDispatch();

  const initialPagination = { page: 1, pageSize: 10 };

  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [currentPageSize, setCurrentPageSize] = useState(initialPagination.pageSize);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState({
    id: null,
    isDiscounted: null,
  });

  const selectedCountry = useSelector(getSelectedCountryV2);
  const data = useSelector(getMarketProductsPriceListSelector.getData);
  const isPending = useSelector(getMarketProductsPriceListSelector.getIsPending);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const products = useSelector(getMarketProductsSelector.getData);
  const isPriceDeletePending = useSelector(deletePriceSelector.getIsPending);
  const isPriceDiscountedDeletePending = useSelector(deleteDiscountedPriceSelector.getIsPending);

  const { canAccess } = usePermission();

  const isPriceDeleting = isPriceDeletePending || isPriceDiscountedDeletePending;

  const loading = isPending;

  const listData = useMemo(
    () => modifiedPriceTableList(data?.data, products, warehouses),
    [data?.data, products, warehouses],
  );

  const handleDelete = ({ id, isDiscounted }) => {
    setOpen(true);
    setDeleteItem({ id, isDiscounted });
  };

  const handleApprove = () => {
    const { id, isDiscounted } = deleteItem;
    const limit = currentPageSize;
    const offset = limit * (currentPage - 1);
    const modifiedParams = {
      ...formValues,
      offset: offset > 0 ? offset : undefined,
      limit,
    };
    if (isDiscounted) {
      dispatch(Creators.deleteDiscountedPriceRequest({ discountedPriceId: id, formValues: modifiedParams }));
    }
    else {
      dispatch(Creators.deletePriceRequest({ priceId: id, formValues: modifiedParams }));
    }
    setOpen(false);
  };

  const handleOpenImportExport = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleImport = (loadedBase64File, selectedImport) => {
    if (selectedImport === IMPORT_EXPORT_KEYS.IMPORT_DOMAIN) {
      dispatch(Creators.importPricingsRequest({ loadedFile: loadedBase64File, priceType: SELLING_PRICE_TYPES.DOMAIN }));
    }
    if (selectedImport === IMPORT_EXPORT_KEYS.IMPORT_WAREHOUSE) {
      dispatch(Creators.importPricingsRequest({ loadedFile: loadedBase64File, priceType: SELLING_PRICE_TYPES.WAREHOUSE }));
    }
    if (selectedImport === IMPORT_EXPORT_KEYS.IMPORT_WASTE) {
      dispatch(Creators.importPricingsRequest({ loadedFile: loadedBase64File, priceType: SELLING_PRICE_TYPES.WASTE }));
    }
    if (selectedImport === IMPORT_EXPORT_KEYS.IMPORT_BUYING_PRICES) {
      dispatch(Creators.importMarketProductBuyingPricesRequest({ loadedFile: loadedBase64File }));
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    const limit = pageSize || 0;
    const offset = limit * (page - 1);
    const modifiedParams = {
      ...formValues,
      offset: offset > 0 ? offset : undefined,
      limit,
    };
    dispatch(Creators.getMarketProductsPriceListRequest({ ...modifiedParams, callbackForProducts: true }));
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
  };

  useEffect(() => {
    setCurrentPage(initialPagination.page);
    setCurrentPageSize(initialPagination.pageSize);
  }, [formValues, initialPagination.page, initialPagination.pageSize]);

  const importExportOptions = [
    ...(isAllowedToOperate(selectedCountry)
      ? [
        {
          key: IMPORT_EXPORT_KEYS.IMPORT_DOMAIN,
          title: t('IMPORT_PRICING_DOMAIN'),
          explanation: t('IMPORT_PRICING_DETAIL_DOMAIN'),
          type: IMPORT_EXPORT_TYPES.IMPORT,
          example: exampleDomainCsv,
          accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
        },
        {
          key: IMPORT_EXPORT_KEYS.IMPORT_WAREHOUSE,
          title: t('IMPORT_PRICING_WAREHOUSE'),
          explanation: t('IMPORT_PRICING_DETAIL_WAREHOUSE'),
          type: IMPORT_EXPORT_TYPES.IMPORT,
          example: exampleWarehouseCsv,
          accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
        },
      ]
      : []),
    {
      key: IMPORT_EXPORT_KEYS.IMPORT_WASTE,
      title: t('IMPORT_PRICING_WASTE'),
      explanation: t('IMPORT_PRICING_DETAIL_WASTE'),
      type: IMPORT_EXPORT_TYPES.IMPORT,
      example: exampleWasteCsv,
      accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
    },
    ...(canAccess(permKey.PAGE_MARKET_PRODUCT_PRICING_LIST_COMPONENT_IMPORT_BUYING_PRICES) ? [
      {
        key: IMPORT_EXPORT_KEYS.IMPORT_BUYING_PRICES,
        title: t('IMPORT_BUYING_PRICES'),
        explanation: t('IMPORT_BUYING_PRICES_DETAIL'),
        type: IMPORT_EXPORT_TYPES.IMPORT,
        example: exampleBuyingPricesJson,
        accept: [MIME_TYPE.XLS, MIME_TYPE.XLSX],
      },
    ]
      : []),
    {
      key: IMPORT_EXPORT_KEYS.EXPORT_PRICES,
      title: t('EXPORT_PRICING'),
      explanation: t('EXPORT_PRICING_DETAIL'),
      type: IMPORT_EXPORT_TYPES.EXPORT,
      action: Creators.exportPricingsRequest(),
    },
    {
      key: IMPORT_EXPORT_KEYS.EXPORT_DISCOUNTED_PRICES,
      title: t('EXPORT_DISCOUNTED_PRICING'),
      explanation: t('EXPORT_DISCOUNTED_PRICING_DETAIL'),
      type: IMPORT_EXPORT_TYPES.EXPORT,
      action: Creators.exportDiscountedPricingsRequest(),
    },
    {
      key: IMPORT_EXPORT_KEYS.EXPORT_SUPPLIER_BUYING_PRICES,
      title: t('EXPORT_SUPPLIER_BUYING_PRICES'),
      explanation: t('EXPORT_SUPPLIER_BUYING_PRICES_DETAIL'),
      type: IMPORT_EXPORT_TYPES.EXPORT,
      action: Creators.exportMarketProductSupplierBuyingPricesRequest(),
    },
  ];

  return (
    <>
      <Table
        data={listData}
        columns={TableColumns(t, handleDelete, isPriceDeleting)}
        loading={loading}
        onPaginationChange={handlePaginationChange}
        currentPage={currentPage}
        currentPageSize={currentPageSize}
        total={data?.count}
        isBEPaginationAvailable
        title={t('TITLES.LIST')}
        handleOpenImportExport={handleOpenImportExport}
        data-testId="pricing-table"
      />
      <Modal
        centerTitle={false}
        onCancel={() => setOpen(false)}
        onOk={handleApprove}
        visible={open}
        title={t('ARE_YOU_SURE')}
      >
        <div>{t('DELETE_TEXT')}</div>
      </Modal>
      <ImportExportDrawer
        visible={visible}
        onClose={handleClose}
        onImport={handleImport}
        exampleCsvDownloader={Downloader}
        importExportOptions={importExportOptions}
      />
    </>
  );
};

export default PricingTable;
