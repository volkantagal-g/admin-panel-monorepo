import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { usePageViewAnalytics } from '@shared/hooks';
import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import { MATCH_DARKSTORE_ANALYTICS_CONFIG, REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import BulkEditModal from './components/BulkEditModal';
import DataDisplay from './components/DataDisplay';
import DatasetSelection from './components/DatasetSelection';
import FilterModal from './components/FilterModal';
import SaveChangesModal from './components/SaveChangesModal';
import { DATASET_OPTIONS, STEPS } from './constants';
import { useMatchDarkstore } from './hooks/useMatchDarkstore';
import { Creators } from './redux/actions';
import { reducer } from './redux/reducer';
import { matchDarkStoreSagas } from './redux/sagas';
import useStyles from './styles';

const initialValues = {
  dataset: null,
  selectedValue: null,
  selectedProducts: {},
  changes: [],
};

const validationSchema = Yup.object().shape({
  dataset: Yup.string()
    .required('Dataset selection is required'),
  selectedValue: Yup.string()
    .when('dataset', {
      is: value => Boolean(value),
      then: schema => schema.required('Please select a value for the chosen dataset'),
    }),
});

const MatchDarkStore = () => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedState, setExpandedState] = useState({
    expandedDarkStoreDetails: {},
    expandedPanels: null,
  });
  const dispatch = useDispatch();
  const { id: darkStoreId } = useParams();

  const reduxKey = REDUX_STORE_KEYS.MATCH_DARKSTORE;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga: matchDarkStoreSagas });

  usePageViewAnalytics({
    name: ROUTE[MATCH_DARKSTORE_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[MATCH_DARKSTORE_ANALYTICS_CONFIG.name].squad,
  });

  const {
    cities,
    centralWarehouses,
    loading,
    categories,
    darkStores,
  } = useSelector(state => {
    const storeData = state?.[reduxKey];
    return {
      cities: storeData?.cities || [],
      centralWarehouses: storeData?.centralWarehouses || [],
      darkStores: storeData?.darkStores || [],
      suppliers: storeData?.suppliers || [],
      products: storeData?.products || [],
      categories: storeData?.categories || [],
      loading: storeData?.loading || false,
    };
  });

  useEffect(() => {
    dispatch(Creators.fetchCitiesRequest());
    dispatch(Creators.fetchCentralWarehousesForMatchRequest());
    dispatch(Creators.fetchDarkStoreListRequest());
    dispatch(Creators.fetchSuppliersRequest());
    dispatch(Creators.fetchMarketProductMasterCategoriesRequest());
  }, [dispatch]);

  const {
    currentStep,
    setCurrentStep,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    isBulkEditModalOpen,
    setIsBulkEditModalOpen,
    activeFilters,
    filterValues,
    handleSubmit,
    handleSaveClick,
    handleFilterClick,
    handleFilter,
    handleRemoveFilter,
    handleBulkEditClick,
    handleChangeCW,
    t,
  } = useMatchDarkstore();

  const getInitialFormValues = useCallback(() => {
    if (darkStoreId && darkStores.length > 0) {
      const darkStore = darkStores.find(ds => ds.value === darkStoreId);
      if (darkStore) {
        return {
          ...initialValues,
          dataset: DATASET_OPTIONS.DARK_STORE,
          selectedValue: darkStoreId,
        };
      }
    }
    return initialValues;
  }, [darkStoreId, darkStores]);

  useEffect(() => {
    if (darkStoreId && darkStores.length > 0) {
      const darkStore = darkStores.find(ds => ds.value === darkStoreId);
      if (darkStore) {
        setCurrentStep(STEPS.DATA_DISPLAY);
      }
    }
  }, [darkStoreId, darkStores, setCurrentStep]);

  const getSelectedOptionLabel = (dataset, value) => {
    if (!value) return '';

    let options = [];
    switch (dataset) {
      case DATASET_OPTIONS.CITY:
        options = cities;
        break;
      case DATASET_OPTIONS.CENTRAL_WAREHOUSE:
        options = centralWarehouses;
        break;
      case DATASET_OPTIONS.DARK_STORE:
        options = [];
        break;
      default:
        return '';
    }

    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  const handleCWChange = useCallback((darkStore, product, value, setFieldValue, values) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const newChanges = [...values.changes];
      let matchCriteria;
      let productType;

      if (product === null) {
        productType = 'darkstore';
      }
      else if ('productCount' in product) {
        productType = 'category';
      }
      else if (product && product.id) {
        productType = 'product';
      }
      else {
        productType = 'unknown';
      }

      switch (productType) {
        case 'darkstore':
          matchCriteria = change => change.darkStore === darkStore.name &&
            !change.product &&
            !change.categoryName &&
            !change.productDetails;
          break;

        case 'category':
          matchCriteria = change => change.darkStore === darkStore.name &&
            change.isCategory === true &&
            change.productDetails?.id === product.id;
          break;

        case 'product':
          matchCriteria = change => change.darkStore === darkStore.name &&
            change.isCategory === false &&
            change.productDetails?.id === product.id;
          break;

        default:
          setIsProcessing(false);
          return;
      }

      const existingChangeIndex = newChanges.findIndex(matchCriteria);

      if (value === null || value === undefined) {
        const newChange = {
          darkStore: darkStore.name,
          darkStoreDetails: darkStore,
          centralWarehouse: null,
          productDetails: product || null,
          timestamp: new Date().toISOString(),
          isCategory: productType === 'category',
        };

        switch (productType) {
          case 'product':
            newChange.product = product.nameTR || '';
            newChange.categoryName = '';
            newChange.productIsDelete = true;
            break;
          case 'category':
            newChange.product = '';
            newChange.categoryName = product.nameTR || '';
            newChange.masterCategoryIsDelete = true;
            break;
          case 'darkstore':
            newChange.product = '';
            newChange.categoryName = '';
            newChange.darkstoreIsDelete = true;
            break;
          default:
            newChange.product = '';
            newChange.categoryName = '';
        }

        if (existingChangeIndex !== -1) {
          newChanges[existingChangeIndex] = newChange;
        }
        else {
          newChanges.push(newChange);
        }

        setFieldValue('changes', newChanges);
        return;
      }

      const newChange = {
        darkStore: darkStore.name,
        darkStoreDetails: darkStore,
        centralWarehouse: value,
        productDetails: product || null,
        timestamp: new Date().toISOString(),
        isCategory: productType === 'category',
      };

      switch (productType) {
        case 'product':
          newChange.product = product.nameTR || '';
          newChange.categoryName = '';
          newChange.productIsDelete = false;
          break;
        case 'category':
          newChange.product = '';
          newChange.categoryName = product.nameTR || '';
          newChange.masterCategoryIsDelete = false;
          break;
        case 'darkstore':
          newChange.product = '';
          newChange.categoryName = '';
          newChange.darkstoreIsDelete = false;
          break;
        default:
          newChange.product = '';
          newChange.categoryName = '';
      }

      if (existingChangeIndex !== -1) {
        newChanges[existingChangeIndex] = newChange;
      }
      else {
        newChanges.push(newChange);
      }

      setFieldValue('changes', newChanges);
    }
    finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  const getFilterLabel = (key, value) => {
    if (!value) return '';

    const option = cities.find(city => city.value === value)
      || centralWarehouses.find(cw => cw.value === value);

    return option ? option.label : value;
  };

  const renderStep = (values, setFieldValue) => {
    switch (currentStep) {
      case STEPS.DATASET_SELECTION:
        return (
          <DatasetSelection
            values={values}
            setFieldValue={setFieldValue}
            setCurrentStep={setCurrentStep}
            cities={cities}
            centralWarehouses={centralWarehouses}
            loading={loading}
          />
        );
      case STEPS.DATA_DISPLAY:
        return (
          <>
            <DataDisplay
              values={values}
              setFieldValue={setFieldValue}
              activeFilters={activeFilters}
              filterValues={filterValues}
              handleFilterClick={handleFilterClick}
              handleBulkEditClick={handleBulkEditClick}
              handleSaveClick={handleSaveClick}
              handleRemoveFilter={handleRemoveFilter}
              getFilterLabel={getFilterLabel}
              getSelectedOptionLabel={getSelectedOptionLabel}
              handleCentralWarehouseChange={handleCWChange}
              onExpandedStateChange={setExpandedState}
            />
            <SaveChangesModal
              isOpen={isSaveModalOpen}
              onClose={() => setIsSaveModalOpen(false)}
              changes={values.changes}
              onSave={() => handleSubmit(values, { setSubmitting: () => {} })}
            />
            <FilterModal
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              onFilter={handleFilter}
              initialFilters={filterValues}
              dataset={values.dataset}
              selectedValue={values.selectedValue}
              categories={categories}
            />
            <BulkEditModal
              isOpen={isBulkEditModalOpen}
              onClose={() => setIsBulkEditModalOpen(false)}
              onChangeCW={handleChangeCW}
              centralWarehouses={centralWarehouses}
              dataset={values.dataset}
              selectedValue={values.selectedValue}
              filterValues={filterValues}
              expandedDarkStoreDetails={expandedState.expandedDarkStoreDetails}
              expandedPanels={expandedState.expandedPanels}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={t('MATCHING_CENTRAL_WAREHOUSE_WITH_DARK_STORE')}
        />
        <Content
          pageContent={(
            <div className={classes.matchDarkStoreContent}>
              <Formik
                initialValues={getInitialFormValues()}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    {renderStep(values, setFieldValue)}
                  </Form>
                )}
              </Formik>
            </div>
          )}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MatchDarkStore;
