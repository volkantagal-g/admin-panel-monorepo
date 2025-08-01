import { Result } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Tabs } from '@shared/components/GUI';

import { usePageViewAnalytics } from '@shared/hooks';
import {
  PRODUCT_DETAIL_ANALYTICS_CONFIG,
  PRODUCT_TABS,
  REDUX_STORE_KEYS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/MarketProductChainManagement/constants';
import { isValidObjectId } from '@app/pages/MarketProductChainManagement/utils/validation';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import DetailInfo from '@app/pages/MarketProductChainManagement/components/DetailInfo';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import { CentralWarehouseTable } from '@app/pages/MarketProductChainManagement/components/CentralWarehouseTable';
import { SuppliersTable } from '@app/pages/MarketProductChainManagement/components/SuppliersTable';
import { DarkStoreTable } from '@app/pages/MarketProductChainManagement/components/DarkStoreTable';
import useStyles from '@app/pages/MarketProductChainManagement/Products/Detail/styles';

import { Creators } from './redux/actions';
import {
  reducer,
  selectProductData,
  selectProductLoading,
} from './redux/reducer';
import { productDetailSagas } from './redux/sagas';

const REDIRECT_DELAY = 2000; // 2 saniye

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const { id: productId } = useParams();
  const [showError, setShowError] = useState(false);
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  const [activeTab, setActiveTab] = useState(PRODUCT_TABS.CENTRAL_WAREHOUSE);

  usePageViewAnalytics({
    name: ROUTE[PRODUCT_DETAIL_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[PRODUCT_DETAIL_ANALYTICS_CONFIG.name].squad,
  });

  useInjectReducer({ key: REDUX_STORE_KEYS.PRODUCT_DETAIL, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.PRODUCT_DETAIL, saga: productDetailSagas });

  const product = useSelector(selectProductData, shallowEqual);
  const { fetch: isLoading } = useSelector(selectProductLoading, shallowEqual);

  const productTitle = useMemo(() => {
    if (!product?.name) return '';
    return product.name[t('LANGUAGE_CODE')] || product.name.en || '';
  }, [product, t]);

  const handleChangeTabs = newTab => {
    setActiveTab(Number(newTab));
  };

  useEffect(() => {
    if (productId && !isInitialDataFetched) {
      dispatch(Creators.fetchProductDetailRequest(productId));
      dispatch(Creators.fetchDarkStoresRequest(productId));
      dispatch(Creators.fetchSuppliersRequest());
      dispatch(Creators.fetchWarehousesRequest());
      setIsInitialDataFetched(true);
    }
  }, [productId, dispatch, isInitialDataFetched]);

  useEffect(() => {
    if (!isValidObjectId(productId)) {
      setShowError(true);
      const timeoutId = setTimeout(() => {
        navigate('/chainManagement/products/list', {
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
  }, [dispatch, productId, navigate]);

  if (!isValidObjectId(productId) || showError) {
    return (
      <Result
        status="error"
        title={t('INVALID_PRODUCT_ID')}
        subTitle={t('REDIRECTING_TO_PRODUCTS')}
        className={classes.errorResult}
      />
    );
  }

  const items = [
    {
      key: String(PRODUCT_TABS.CENTRAL_WAREHOUSE),
      label: t('CENTRAL_WAREHOUSE'),
      children: <CentralWarehouseTable />,
    },
    {
      key: String(PRODUCT_TABS.DARK_STORE),
      label: t('DARK_STORE'),
      children: <DarkStoreTable />,
    },
    {
      key: String(PRODUCT_TABS.SUPPLIERS),
      label: t('SUPPLIERS_LIST'),
      children: <SuppliersTable />,
    },
  ];

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={productTitle}
          configurationButton
          productId={productId}
          isLoading={isLoading}
        />
        <DetailInfo
          data={product}
          detailType="product"
        />
        <Tabs
          defaultActiveKey={String(activeTab)}
          items={items}
          className={classes.tabs}
          onChange={handleChangeTabs}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(ProductDetail);
