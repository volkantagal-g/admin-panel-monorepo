import { Result, message } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Tabs } from '@shared/components/GUI';

import { usePageViewAnalytics } from '@shared/hooks';
import {
  DARKSTORE_DETAIL_ANALYTICS_CONFIG,
  DARKSTORE_TABS,
  REDUX_STORE_KEYS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/MarketProductChainManagement/constants';
import { isValidObjectId } from '@app/pages/MarketProductChainManagement/utils/validation';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { DarkStoreCentralWarehousesTable } from '@app/pages/MarketProductChainManagement/components/DarkStoreCentralWarehousesTable';
import { ACTION_TYPES } from '@app/pages/MarketProductChainManagement/components/DarkStoreCentralWarehousesTable/redux/constants';
import { DarkStoreSuppliersTable } from '@app/pages/MarketProductChainManagement/components/DarkStoreSuppliersTable';
import { ACTION_TYPES as DARK_STORE_SUPPLIERS_ACTION_TYPES } from '@app/pages/MarketProductChainManagement/components/DarkStoreSuppliersTable/redux/constants';
import DetailInfo from '@app/pages/MarketProductChainManagement/components/DetailInfo';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import DarkStoreConfigurationModal from '@app/pages/MarketProductChainManagement/components/Modals/DarkStoreConfigurationModal';
import useStyles from './styles';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import darkStoreCentralWarehousesReducer from '@app/pages/MarketProductChainManagement/components/DarkStoreCentralWarehousesTable/redux/reducer';
import darkStoreCentralWarehousesSaga from '@app/pages/MarketProductChainManagement/components/DarkStoreCentralWarehousesTable/redux/saga';
import { DarkStoreProductsTable } from '@app/pages/MarketProductChainManagement/components/DarkStoreProductsTable';
import { refreshProductsRequest } from '@app/pages/MarketProductChainManagement/components/DarkStoreProductsTable/redux/actions';
import darkStoreSuppliersReducer from '@app/pages/MarketProductChainManagement/components/DarkStoreSuppliersTable/redux/reducer';
import darkStoreSuppliersSaga from '@app/pages/MarketProductChainManagement/components/DarkStoreSuppliersTable/redux/saga';
import { Creators } from './redux/actions';
import { reducer, selectDarkStoreData, selectDarkStoreLoading } from './redux/reducer';
import { darkStoreDetailSagas } from './redux/saga';

const REDIRECT_DELAY = 2000;

const ChainManagementDarkStoreDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const { id: darkStoreId } = useParams();
  const [showError, setShowError] = useState(false);
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  const [activeTab, setActiveTab] = useState(DARKSTORE_TABS.PRODUCTS);
  const [productsCount, setProductsCount] = useState(0);
  const [centralWarehousesCount, setCentralWarehousesCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [demographies, setDemographies] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [demographiesLoading] = useState(false);
  const [sizesLoading] = useState(false);
  const [currentDemography, setCurrentDemography] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProductsCountChange = useCallback(count => {
    setProductsCount(count);
  }, []);

  const handleCentralWarehousesCountChange = useCallback(count => {
    setCentralWarehousesCount(count);
  }, []);

  const handleSuppliersCountChange = useCallback(count => {
    setSuppliersCount(count);
  }, []);

  usePageViewAnalytics({
    name: ROUTE[DARKSTORE_DETAIL_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[DARKSTORE_DETAIL_ANALYTICS_CONFIG.name].squad,
  });

  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_DETAIL, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.DARK_STORE_DETAIL, saga: darkStoreDetailSagas });
  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_CENTRAL_WAREHOUSES_TABLE, reducer: darkStoreCentralWarehousesReducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.DARK_STORE_CENTRAL_WAREHOUSES_TABLE, saga: darkStoreCentralWarehousesSaga });
  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_SUPPLIERS_TABLE, reducer: darkStoreSuppliersReducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.DARK_STORE_SUPPLIERS_TABLE, saga: darkStoreSuppliersSaga });

  const darkstore = useSelector(selectDarkStoreData, shallowEqual);
  const { fetch: isLoading } = useSelector(selectDarkStoreLoading, shallowEqual);

  const darkstoreTitle = useMemo(() => {
    if (!darkstore?.name) return '';
    return darkstore.name || '';
  }, [darkstore]);

  const formattedDarkstoreData = useMemo(() => {
    if (!darkstore) return null;

    return {
      id: darkstore.id,
      name: darkstore.name,
      domainTypes: darkstore.domainTypes ? darkstore.domainTypes.map(domain => (typeof domain === 'object' ? domain.domainType : domain)) : [],
      city: darkstore.city ? {
        en: darkstore.city.nameEN || '',
        tr: darkstore.city.nameTR || '',
      } : { en: '', tr: '' },
      region: darkstore.region ? {
        en: darkstore.region.nameEN || '',
        tr: darkstore.region.nameTR || '',
      } : { en: '', tr: '' },
      warehouseTypes: darkstore.warehouseType ? darkstore.warehouseType.warehouseType : null,
      demography: darkstore.demography ? darkstore.demography.name : null,
      size: darkstore.size ? darkstore.size.name : null,
      productsCount: darkstore.productCount || 0,
      centralWarehousesCount: darkstore.centralWarehouseCount || 0,
      suppliersCount: darkstore.supplierCount || 0,
    };
  }, [darkstore]);

  useEffect(() => {
    if (darkstore) {
      setCurrentDemography(darkstore.demography ? darkstore.demography.demography : null);
      setCurrentSize(darkstore.size ? darkstore.size.size : null);
    }
  }, [darkstore]);

  const handleChangeTabs = newTab => {
    setActiveTab(Number(newTab));
    dispatch(Creators.updateActiveTab(newTab));
  };

  const fetchDemographies = useCallback(async () => {
    try {
      const response = await marketProductChainManagementAPI.common.getDemographyLookup();
      if (response && response.success && response.data) {
        const formattedDemographies = response.data.demographies.map(demography => ({
          demography: demography.demography,
          size: demography.size,
          name: demography.name,
        }));
        setDemographies(formattedDemographies);
      }
    }
    catch (error) {
      message.error(t('ERROR_MESSAGES.FAILED_TO_FETCH_DEMOGRAPHIES'));
    }
  }, [t]);

  const fetchSizes = useCallback(async () => {
    try {
      const response = await marketProductChainManagementAPI.common.getSizeLookup();
      if (response && response.success && response.data) {
        const formattedSizes = response.data.sizes.map(size => ({
          size: size.size,
          name: size.name,
        }));
        setSizes(formattedSizes);
      }
    }
    catch (error) {
      message.error(t('ERROR_MESSAGES.FAILED_TO_FETCH_SIZES'));
    }
  }, [t]);

  const handleOpenConfigModal = () => {
    setIsConfigModalOpen(true);
    fetchDemographies();
    fetchSizes();
  };

  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const handleSaveConfig = async values => {
    if (!values || !darkStoreId) return;
    const { demography, size } = values;

    try {
      setIsUpdating(true);

      const requestBody = {
        darkstore: {
          demography,
          size,
        },
      };

      const response = await marketProductChainManagementAPI.darkstore.updateDarkStoreDetail(darkStoreId, requestBody);

      if (response && response.success) {
        message.success(t('FORM_MESSAGES.CHANGES_SAVED'));
        dispatch(Creators.fetchDarkStoreDetailRequest(darkStoreId));
        dispatch(refreshProductsRequest({ darkStoreVertexId: darkstore?.id }));
      }
      else {
        throw new Error(response?.error?.message || 'Failed to update dark store configuration');
      }
    }
    catch (error) {
      message.error(t('ERROR_MESSAGES.FAILED_TO_UPDATE_CONFIGURATION'));
    }
    finally {
      setIsUpdating(false);
      handleCloseConfigModal();
    }
  };

  useEffect(() => {
    if (darkStoreId && !isInitialDataFetched) {
      dispatch(Creators.fetchDarkStoreDetailRequest(darkStoreId));
      setIsInitialDataFetched(true);
    }
  }, [darkStoreId, dispatch, isInitialDataFetched]);

  useEffect(() => {
    if (darkstore?.id) {
      dispatch(refreshProductsRequest({
        darkStoreVertexId: darkstore.id,
        onTotalCountChange: handleProductsCountChange,
      }));

      dispatch({
        type: ACTION_TYPES.FETCH_CENTRAL_WAREHOUSES_REQUEST,
        payload: {
          darkStoreVertexId: darkstore.id,
          onTotalCountChange: handleCentralWarehousesCountChange,
        },
      });

      dispatch({
        type: DARK_STORE_SUPPLIERS_ACTION_TYPES.FETCH_SUPPLIERS_REQUEST,
        payload: {
          darkStoreVertexId: darkstore.id,
          onTotalCountChange: handleSuppliersCountChange,
        },
      });

      fetchDemographies();
      fetchSizes();
    }
  }, [darkstore?.id, dispatch, handleProductsCountChange, handleCentralWarehousesCountChange, handleSuppliersCountChange, fetchDemographies, fetchSizes]);

  useEffect(() => {
    if (!isValidObjectId(darkStoreId)) {
      setShowError(true);
      const timeoutId = setTimeout(() => {
        navigate('/chainManagement/warehouses/', {
          state: { invalidId: true },
          replace: true,
        });
      }, REDIRECT_DELAY);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      dispatch(Creators.resetState());
      setIsInitialDataFetched(false);
    };
  }, [dispatch, darkStoreId, navigate]);

  if (!isValidObjectId(darkStoreId) || showError) {
    return (
      <Result
        status="error"
        title={t('INVALID_DARKSTORE_ID')}
        subTitle={t('REDIRECTING_TO_WAREHOUSES')}
        className={classes.errorResult}
      />
    );
  }

  const items = [
    {
      key: String(DARKSTORE_TABS.PRODUCTS),
      label: t('PRODUCTS_WITH_COUNT', { count: productsCount }),
      children: (
        <DarkStoreProductsTable
          darkStoreVertexId={darkstore?.id}
          onTotalCountChange={handleProductsCountChange}
        />
      ),
    },
    {
      key: String(DARKSTORE_TABS.CENTRAL_WAREHOUSE),
      label: t('CENTRAL_WAREHOUSE_WITH_COUNT', { count: centralWarehousesCount }),
      children: <DarkStoreCentralWarehousesTable
        darkStoreVertexId={darkstore?.id}
        onTotalCountChange={handleCentralWarehousesCountChange}
      />,
    },
    {
      key: String(DARKSTORE_TABS.SUPPLIERS),
      label: t('SUPPLIERS_WITH_COUNT', { count: suppliersCount }),
      children: <DarkStoreSuppliersTable
        darkStoreVertexId={darkstore?.id}
        onTotalCountChange={handleSuppliersCountChange}
      />,
    },
  ];

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={darkstoreTitle}
          dsConfigurationButton
          darkStoreId={darkStoreId}
          loading={isLoading}
          onDSConfigClick={handleOpenConfigModal}
        />
        <DetailInfo
          data={formattedDarkstoreData}
          detailType="darkStore"
        />
        <Tabs
          defaultActiveKey={String(activeTab)}
          items={items}
          className={classes.tabs}
          onChange={handleChangeTabs}
        />
        <DarkStoreConfigurationModal
          isOpen={isConfigModalOpen}
          onCancel={handleCloseConfigModal}
          onSave={handleSaveConfig}
          demographies={demographies}
          sizes={sizes}
          demographiesLoading={demographiesLoading}
          sizesLoading={sizesLoading}
          currentDemography={currentDemography}
          currentSize={currentSize}
          confirmLoading={isUpdating}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(ChainManagementDarkStoreDetail);
