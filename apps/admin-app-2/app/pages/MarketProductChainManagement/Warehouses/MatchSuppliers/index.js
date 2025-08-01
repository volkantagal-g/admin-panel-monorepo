import { Form, Table } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';

import { Button } from '@shared/components/GUI';
import { usePageViewAnalytics } from '@shared/hooks';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import plusIcon from '@app/pages/MarketProductChainManagement/assets/Icons/purple-plus.svg';
import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import SearchInput from '@app/pages/MarketProductChainManagement/components/SearchInput';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

import { MATCH_SUPPLIER_ANALYTICS_CONFIG } from '@app/pages/MarketProductChainManagement/Warehouses/constants';
import SaveModal from '@app/pages/MarketProductChainManagement/Warehouses/MatchSuppliers/components/SaveModal';
import { getMatchedColumns, getUnmatchedColumns } from '@app/pages/MarketProductChainManagement/Warehouses/MatchSuppliers/constants';
import useStyles from '@app/pages/MarketProductChainManagement/Warehouses/MatchSuppliers/styles';
import { useMatchSupplierForm } from './hooks/useMatchSupplierForm';
import { useMatchSupplierState } from './hooks/useMatchSupplierState';
import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';

const PlatformSelect = memo(({ platforms, selectedValue, onChange }) => {
  const { loading } = useMatchSupplierState();
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const options = useMemo(
    () => platforms.map(platform => ({
      id: platform.id,
      name: platform.name,
    })),
    [platforms],
  );

  const handleChange = useCallback(value => {
    if (onChange) {
      onChange(value);
    }
  }, [onChange]);

  return (
    <XCommFloatingLabel.Select
      label={t('PLATFORM')}
      autoComplete="off"
      showSearch
      value={selectedValue}
      onChange={handleChange}
      optionsData={options}
      className={classes.platformSelect}
      allowClear
      loading={loading.fetch}
      aria-label="Select Platform"
    />
  );
});

const PlatformCell = memo(({ platforms, selectedValue, onChange, isEditing, onEditClick }) => {
  const classes = useStyles();

  if (isEditing || selectedValue) {
    return (
      <PlatformSelect
        platforms={platforms}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );
  }

  return (
    <Button
      type="text"
      onClick={onEditClick}
      icon={<img src={plusIcon} alt="Add platform" />}
      className={classes.addPlatformButton}
      aria-label="Add Platform"
    />
  );
});

const filterOption = (input, option) => {
  if (!option?.label) return false;
  return option.label.toLowerCase().includes(input.toLowerCase());
};

const MatchSuppliers = () => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const {
    matchedForm,
    unmatchedForm,
    handleMatchedFormChange,
    handleUnmatchedFormChange,
    resetForms,
    validateForms,
  } = useMatchSupplierForm();

  const {
    warehouses,
    editingPlatform,
    selectedPlatforms,
    matchedSuppliers,
    unmatchedSuppliers,
    selectedWarehouse,
    loading,
    hasChanges,
    matchedSearchValue,
    unmatchedSearchValue,
    handleWarehouseChange,
    handlePlatformChange,
    handleMoveToMatched,
    handleMoveToUnmatched,
    handleEditClick,
    handleSaveChanges,
  } = useMatchSupplierState(resetForms);

  const filteredMatchedSuppliers = useMemo(() => {
    if (!matchedSearchValue) return matchedSuppliers;
    const searchTerm = matchedSearchValue.toLowerCase();
    return matchedSuppliers.filter(supplier => supplier.name.toLowerCase().includes(searchTerm));
  }, [matchedSuppliers, matchedSearchValue]);

  const filteredUnmatchedSuppliers = useMemo(() => {
    if (!unmatchedSearchValue) return unmatchedSuppliers;
    const searchTerm = unmatchedSearchValue.toLowerCase();
    return unmatchedSuppliers.filter(supplier => supplier.name.toLowerCase().includes(searchTerm));
  }, [unmatchedSuppliers, unmatchedSearchValue]);

  const selectedWarehouseName = useMemo(
    () => warehouses.find(w => w.id === selectedWarehouse)?.name || '',
    [warehouses, selectedWarehouse],
  );

  const reduxKey = REDUX_STORE_KEYS.MATCH_SUPPLIERS;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  usePageViewAnalytics({
    name: ROUTE[MATCH_SUPPLIER_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[MATCH_SUPPLIER_ANALYTICS_CONFIG.name].squad,
  });

  useEffect(() => {
    dispatch(Creators.fetchCentralWarehousesForMatchRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedWarehouse) {
      const timer = setTimeout(() => {
        setIsTableVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    setIsTableVisible(false);
    return undefined;
  }, [selectedWarehouse]);

  const renderPlatformCell = useCallback((platforms, record) => (
    <PlatformCell
      platforms={platforms}
      selectedValue={record.selectedPlatform?.id || selectedPlatforms[record.id]}
      onChange={value => handlePlatformChange(value, record.id)}
      isEditing={editingPlatform === record.id}
      onEditClick={() => handleEditClick(record.id)}
    />
  ), [editingPlatform, selectedPlatforms, handlePlatformChange, handleEditClick]);

  const columns = useMemo(
    () => getMatchedColumns({
      t,
      classes,
      renderPlatformCell,
      handleMoveToUnmatched,
    }),
    [t, classes, renderPlatformCell, handleMoveToUnmatched],
  );

  const unmatchedColumns = useMemo(
    () => getUnmatchedColumns({
      t,
      classes,
      handleMoveToMatched,
    }),
    [t, classes, handleMoveToMatched],
  );

  const warehouseOptions = useMemo(() => {
    if (!Array.isArray(warehouses)) {
      return [];
    }
    return warehouses.map(warehouse => ({
      id: warehouse.id,
      name: warehouse.name,
      label: warehouse.name,
      value: warehouse.id,
    }));
  }, [warehouses]);

  const handleSaveClick = useCallback(() => {
    setIsSaveModalOpen(true);
  }, []);

  const handleSaveConfirm = useCallback(async () => {
    const isValid = await validateForms();
    if (!isValid) return;

    handleSaveChanges();
    setIsSaveModalOpen(false);
  }, [validateForms, handleSaveChanges]);

  const handleSaveCancel = useCallback(() => {
    setIsSaveModalOpen(false);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        <Header
          title={t('MATCHING_CENTRAL_WAREHOUSE_WITH_SUPPLIER')}
        />
        <Content
          pageContent={(
            <div className={classes.configurationContent}>
              <div className={`${classes.header} ${isTableVisible ? classes.hasTables : ''}`}>
                <h2 className={classes.headerTitle}>{t('MATCH_SUPPLIERS_HEADER')}</h2>
                <div className={classes.warehouseSelect}>
                  <XCommFloatingLabel.Select
                    label={t('WAREHOUSE')}
                    autoComplete="off"
                    showSearch
                    value={selectedWarehouse}
                    onChange={handleWarehouseChange}
                    optionsData={warehouseOptions}
                    suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                    disabled={hasChanges}
                    loading={loading.fetch}
                    filterOption={filterOption}
                    optionFilterProp="label"
                    aria-label="Select Warehouse"
                  />
                </div>
              </div>
              {selectedWarehouse && isTableVisible && (
                <>
                  <div className={classes.tablesWrapper}>
                    <div className={classes.tableContainer} role="region" aria-label="Matched Suppliers">
                      <div className={classes.tableHeaderWrapper}>
                        <h3 className={classes.subTitle}>{t('MATCHED')}</h3>
                        <Form
                          form={matchedForm}
                          className={classes.searchInput}
                          onValuesChange={handleMatchedFormChange}
                        >
                          <SearchInput
                            name="matchedSearch"
                            label={t('SEARCH')}
                            form={matchedForm}
                            aria-label="Search Matched Suppliers"
                          />
                        </Form>
                      </div>
                      <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={filteredMatchedSuppliers}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 400 }}
                        loading={loading.fetch}
                        aria-label="Matched Suppliers Table"
                      />
                    </div>
                    <div className={classes.tableContainer} role="region" aria-label="Unmatched Suppliers">
                      <div className={classes.tableHeaderWrapper}>
                        <h3 className={classes.subTitle}>{t('SUPPLIERS_LIST')}</h3>
                        <Form
                          form={unmatchedForm}
                          className={classes.searchInput}
                          onValuesChange={handleUnmatchedFormChange}
                        >
                          <SearchInput
                            name="unmatchedSearch"
                            label={t('SEARCH')}
                            form={unmatchedForm}
                          />
                        </Form>
                      </div>
                      <Table
                        rowKey="id"
                        columns={unmatchedColumns}
                        dataSource={filteredUnmatchedSuppliers}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 400 }}
                        loading={loading.fetch}
                        aria-label="Unmatched Suppliers Table"
                      />
                    </div>
                  </div>
                  <div className={classes.saveButtonWrapper}>
                    <Button
                      type="primary"
                      onClick={handleSaveClick}
                      disabled={!hasChanges}
                      loading={loading.save}
                    >
                      {t('SAVE_CHANGES')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        />
        <SaveModal
          isOpen={isSaveModalOpen}
          onCancel={handleSaveCancel}
          onConfirm={handleSaveConfirm}
          warehouseName={selectedWarehouseName}
        />
      </>
    </ErrorBoundary>
  );
};

export default memo(MatchSuppliers);
