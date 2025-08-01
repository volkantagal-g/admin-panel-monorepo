import { CopyOutlined, EyeOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Space, Switch, Table, Tabs, Tooltip, message, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

import Content from '@app/pages/MarketProductChainManagement/components/Content';
import ErrorFallback from '@app/pages/MarketProductChainManagement/components/ErrorFallback';
import Header from '@app/pages/MarketProductChainManagement/components/Header';
import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
import { renderSegment, renderSegment2 } from '@app/pages/MarketProductChainManagement/utils/segmentMapper';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import BulkEditBar from './components/BulkEditBar';
import ChainInfoSection from './components/ChainInfoSection';

import { FIELD_LABELS, FORM_FIELDS, SUPPLIER_TYPE_OPTIONS, LOCATION_TYPE_OPTIONS } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectCategoryOptions,
  selectChainList,
  selectChainListLoading,
  selectCurrentPage,
  selectDomainTypes,
  selectFilterParams,
  selectIsBulkEditMode,
  selectSelectedChainIds,
  selectTotal,
} from './redux/selectors';
import type { Chain as ChainType, FilterParams, RootState, ValidSortField } from './redux/types';
import useStyles from './styles';

const { TabPane } = Tabs;

// Custom component for the actions column
interface ChainActionsProps {
  record: ChainType;
  classes: any;
}

const ChainActions: React.FC<ChainActionsProps> = ({ record, classes }) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const { domain } = record.rawData;
  const domainType = domain ? (domain as any).type || domain.id : undefined;
  const detailUrl = `/chainManagement/chain/detail/${record.rawData.chain.id}${domainType ? `/${domainType}` : ''}?country=tr`;

  // Create the unique ID for this specific chain - same format as in chainsWithUniqueIds
  const uniqueId = domainType ? `${record.rawData.chain.id}-${domainType}` : record.rawData.chain.id;

  // Get the loading state for this specific chain
  const isUpdating = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.updatingChains?.[uniqueId] || false);
  const dispatch = useDispatch();

  const handleChange = useCallback((checked: boolean) => {
    dispatch(Creators.updateChainActiveRequest(record.rawData.chain.id, checked, domainType, uniqueId));
  }, [dispatch, record.rawData.chain.id, domainType, uniqueId]);

  return (
    <div className={classes.actionsColumn}>
      <Tooltip title={record.active ? t('TOOLTIPS.DEACTIVATE') : t('TOOLTIPS.ACTIVATE')}>
        <Switch
          checked={record.active}
          onChange={handleChange}
          size="small"
          className={classes.actionSwitch}
          loading={isUpdating}
          disabled={isUpdating}
        />
      </Tooltip>
      <Tooltip title={t('BUTTONS.DETAIL')}>
        <Link to={detailUrl} target="_blank" rel="noopener noreferrer">
          <Button
            type="link"
            className={classes.detailButton}
            icon={<EyeOutlined />}
          >
            {t('BUTTONS.DETAIL')}
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
};

const Chain: React.FC = () => {
  const dispatch = useDispatch();
  const chains = useSelector<RootState, ChainType[]>(state => selectChainList(state));
  const loading = useSelector((state: RootState) => selectChainListLoading(state));
  const selectedChainIds = useSelector((state: RootState) => selectSelectedChainIds(state));
  const isBulkEditMode = useSelector((state: RootState) => selectIsBulkEditMode(state));
  const total = useSelector((state: RootState) => selectTotal(state));
  const currentPage = useSelector((state: RootState) => selectCurrentPage(state));
  const filterParams = useSelector((state: RootState) => selectFilterParams(state));
  const categoryOptions = useSelector((state: RootState) => selectCategoryOptions(state));
  const [form] = Form.useForm();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const [l3Categories, setL3Categories] = React.useState<any[]>([]);
  const [resetL4Counter, setResetL4Counter] = React.useState(0);
  const productSearchOptions = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.productSearchOptions || []);
  const isSearchingProducts = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.isSearchingProducts || false);
  const [showInfo, setShowInfo] = useState(false);

  useInjectReducer({ key: REDUX_STORE_KEYS.CHAIN, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.CHAIN, saga });

  const defaultFilterParams = useMemo(() => ({
    page: 1,
    pageSize: 20,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
    products: [],
    suppliers: [],
    locations: [],
    domains: [],
    isEnabled: undefined,
    locationTypes: [],
    storageType: undefined,
    supplierTypes: [],
    search: undefined,
  }), []);

  useEffect(() => {
    dispatch(Creators.filterChainsRequest(defaultFilterParams));
    dispatch(Creators.getCategoryOptionsRequest());
    dispatch(Creators.getChainNodesRequest('SUPPLIER'));
    dispatch(Creators.getChainNodesRequest('LOCATION'));
    dispatch(Creators.getDomainTypesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, defaultFilterParams]);

  const chainNodeOptions = useSelector((state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.chainNodeOptions || {
    supplier: [],
    location: [],
  });

  const domainTypes = useSelector(selectDomainTypes);

  const handleFormValuesChange = useCallback(async (changedValues: any, allValues: any) => {
    const shouldResetPagination = Object.keys(changedValues).some(key => [
      FORM_FIELDS.ENABLED, FORM_FIELDS.PRODUCT, FORM_FIELDS.SUPPLIER,
      FORM_FIELDS.LOCATION, FORM_FIELDS.DOMAINS, FORM_FIELDS.LOCATION_TYPES,
      FORM_FIELDS.SUPPLIER_TYPES, FORM_FIELDS.CATEGORY_LEVEL_4,
    ].includes(key as any));

    const finalChangedValues = shouldResetPagination ?
      { ...changedValues, page: 1 } :
      changedValues;

    dispatch(Creators.handleFormValuesChangeRequest(finalChangedValues, allValues));
  }, [dispatch]);

  const handleBulkEdit = useCallback(() => {
    dispatch(Creators.setBulkEditMode(true));
  }, [dispatch]);

  const handleCancelBulkEdit = useCallback(() => {
    dispatch(Creators.setBulkEditMode(false));
    dispatch(Creators.clearSelectedChains());
  }, [dispatch]);

  const handleEditSelected = useCallback(() => {
    dispatch(Creators.openBulkEditDrawer());
  }, [dispatch]);

  const rowSelection = useMemo(() => (isBulkEditMode ? {
    selectedRowKeys: selectedChainIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      dispatch(Creators.setSelectedChains(selectedRowKeys as string[]));
    },
    getCheckboxProps: (record: ChainType) => {
      // Generate a unique identifier for each row by combining chainId and domainType
      const { domain } = record.rawData;
      const domainTypeId = domain?.id;
      // Create uniqueId without modifying the record directly
      return {};
    },
  } : undefined), [dispatch, isBulkEditMode, selectedChainIds]);

  // Prepare data with consistent uniqueIds
  const chainsWithUniqueIds = useMemo(() => {
    return chains.map(chain => {
      if (chain.uniqueId && chain.key) {
        return chain;
      }

      const { domain } = chain.rawData;
      const domainTypeId = domain?.id;
      const uniqueId = domainTypeId ? `${chain.id}-${domainTypeId}` : chain.id;
      return {
        ...chain,
        uniqueId,
        key: uniqueId,
      };
    });
  }, [chains]);

  const headerButtons = useMemo(() => [
    {
      condition: true,
      onClick: () => setShowInfo(!showInfo),
      text: showInfo ? t('BUTTONS.HIDE_INFO') : t('BUTTONS.SHOW_INFO'),
      type: 'default' as const,
      icon: <InfoCircleOutlined />,
    },
    {
      condition: !isBulkEditMode,
      onClick: handleBulkEdit,
      text: t('BUTTONS.BULK_EDIT'),
      type: 'primary' as const,
      icon: <FormOutlined />,
    },
    {
      condition: isBulkEditMode,
      onClick: handleCancelBulkEdit,
      text: t('BUTTONS.CANCEL'),
      type: 'default' as const,
    },
    {
      condition: isBulkEditMode && selectedChainIds.length > 0,
      onClick: handleEditSelected,
      text: t('BUTTONS.EDIT_SELECTED', { count: selectedChainIds.length }),
      type: 'primary' as const,
    },
  ], [isBulkEditMode, selectedChainIds.length, handleBulkEdit, handleCancelBulkEdit, handleEditSelected, t, showInfo]);

  const sortFieldMap = useMemo<Record<string, ValidSortField>>(() => ({
    product: 'productName',
    supplier: 'supplierName',
    location: 'locationName',
    domain: 'domainType',
    batchSize: 'batchSize',
    minOrderQuantity: 'minOrderQuantity',
    minStock: 'minStock',
    segment: 'productSegmentPlanning',
    segment2: 'productSegmentLogistic',
    planningSegment: 'planningSegment',
    introductionDate: 'introductionDate',
    terminationDate: 'terminationDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    active: 'isEnabled',
    status: 'status',
  }), []);

  const handleTableChange = useCallback((pagination: any, filters: any, sorter: any) => {
    const sortConfig = Array.isArray(sorter) ? sorter[0] : sorter;
    const sortField = sortFieldMap[sortConfig.field] || sortConfig.field;

    const newPage = pagination.current !== undefined ? pagination.current : currentPage;
    const newPageSize = pagination.pageSize !== undefined ? pagination.pageSize : (filterParams as FilterParams).pageSize || 20;

    const newFilterParams: FilterParams = {
      ...filterParams,
      page: newPage,
      pageSize: newPageSize,
      sortBy: sortField,
      sortOrder: sortConfig.order === 'ascend' ? 'asc' : 'desc',
    };

    dispatch(Creators.filterChainsRequest(newFilterParams));
  }, [dispatch, filterParams, sortFieldMap, currentPage]);

  const handlePaginationChange = useCallback((page: number, pageSize?: number) => {
    const newFilterParams = {
      ...filterParams,
      page,
      pageSize: pageSize || (filterParams as FilterParams).pageSize || 20,
    };
    dispatch(Creators.filterChainsRequest(newFilterParams));
  }, [dispatch, filterParams]);

  const handlePaginationSizeChange = useCallback((current: number, size: number) => {
    const newFilterParams = {
      ...filterParams,
      pageSize: size,
      page: 1, // Reset to first page when changing page size
    };
    dispatch(Creators.filterChainsRequest(newFilterParams));
  }, [dispatch, filterParams]);

  const columns = useMemo<ColumnsType<ChainType>>(() => [
    {
      title: t('COLUMNS.PRODUCT'),
      dataIndex: 'product',
      key: 'product',
      sorter: true,
      width: 180,
      render: (value: string) => (
        <div className={classes.cellContent}>
          {value}
        </div>
      ),
    },
    {
      title: t('COLUMNS.DOMAIN'),
      dataIndex: 'domain',
      key: 'domain',
      sorter: true,
      width: 120,
      render: (value: string, record: ChainType) => {
        const { domain } = record.rawData;
        if (!domain) return <span className={classes.emptyDomain}>-</span>;

        return (
          <div className={classes.domainTag}>
            {domain.name || '-'}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.SUPPLIER'),
      dataIndex: 'supplier',
      key: 'supplier',
      sorter: true,
      width: 180,
      render: (value: string) => (
        <div className={classes.cellContent}>
          {value}
        </div>
      ),
    },
    {
      title: t('COLUMNS.LOCATION'),
      dataIndex: 'location',
      key: 'location',
      sorter: true,
      width: 160,
      render: (value: string) => (
        <div className={classes.cellContent}>
          {value}
        </div>
      ),
    },
    {
      title: t('COLUMNS.BATCH'),
      dataIndex: 'batchSize',
      key: 'batchSize',
      sorter: true,
      width: 100,
      align: 'right' as const,
    },
    {
      title: t('COLUMNS.MOQ'),
      dataIndex: 'minOrderQuantity',
      key: 'minOrderQuantity',
      sorter: true,
      width: 100,
      align: 'right' as const,
    },
    {
      title: t('COLUMNS.MIN_STOCK'),
      dataIndex: 'minStock',
      key: 'minStock',
      sorter: true,
      width: 100,
      align: 'right' as const,
    },
    {
      title: t('COLUMNS.SEGMENT'),
      key: 'segment',
      sorter: true,
      dataIndex: 'segment',
      render: renderSegment,
      width: 150,
    },
    {
      title: t('COLUMNS.SEGMENT_2'),
      key: 'segment2',
      sorter: true,
      dataIndex: 'segment2',
      render: renderSegment2,
      width: 150,
    },
    {
      title: t('COLUMNS.PLANNING_SEGMENT'),
      dataIndex: 'planningSegment',
      key: 'planningSegment',
      sorter: true,
      width: 120,
    },
    {
      title: t('COLUMNS.INTRO_DATE'),
      dataIndex: 'introductionDate',
      key: 'introductionDate',
      sorter: true,
      render: (value: string) => (value ? new Date(value).toLocaleDateString() : '-'),
      width: 120,
    },
    {
      title: t('COLUMNS.TERM_DATE'),
      dataIndex: 'terminationDate',
      key: 'terminationDate',
      sorter: true,
      render: (value: string) => (value ? new Date(value).toLocaleDateString() : '-'),
      width: 120,
    },
    {
      title: t('COLUMNS.DIRECT'),
      dataIndex: 'direct',
      key: 'direct',
      render: (value: boolean) => (value ? '✓' : ''),
      sorter: true,
      width: 80,
      align: 'center' as const,
    },
    {
      title: t('COLUMNS.CHAIN_ID'),
      dataIndex: 'id',
      key: 'id',
      sorter: false,
      width: 70,
      render: (value: string) => (
        <div className={classes.copyWrapper}>
          <span className={classes.idText}>{value}</span>
          <CopyOutlined
            className={classes.copyIcon}
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard.writeText(value)
                .then(() => message.success(t('MESSAGES.ID_COPIED')))
                .catch(() => message.error(t('MESSAGES.COPY_FAILED')));
            }}
          />
        </div>
      ),
    },
    {
      title: t('COLUMNS.ACTIONS'),
      key: 'actions',
      fixed: 'right',
      width: 160,
      align: 'center' as const,
      render: (_, record: ChainType) => (
        <ChainActions record={record} classes={classes} />
      ),
    },
  ], [t, classes]);

  const debouncedSearch = useMemo(() => debounce((searchText: string) => {
    if (searchText && searchText.length > 2) {
      dispatch(Creators.searchProductsRequest(searchText));
    }
  }, 300), [dispatch]);

  const handleProductSearch = useCallback((value: string) => {
    debouncedSearch(value);
  }, [debouncedSearch]);

  const renderProductNotFoundContent = useCallback(() => {
    if (isSearchingProducts) {
      return <Spin size="small" />;
    }

    return (
      <div style={{ textAlign: 'center', padding: '8px' }}>
        {productSearchOptions.length === 0
          ? t('PRODUCTS.TYPE_TO_SEARCH')
          : t('PRODUCTS.NO_RESULTS_FOUND')}
      </div>
    );
  }, [isSearchingProducts, productSearchOptions.length, t]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.pageWrapper}>
        <Header
          title={t('PAGE_TITLE.CHAINS')}
          configurationButton={false}
          actionButton={false}
          editButton={false}
          onEditClick={() => { }}
          saveButton={false}
          onSaveClick={() => { }}
          dsConfigurationButton={false}
          cancelButton={false}
          onCancelClick={() => { }}
          onDSConfigClick={() => { }}
          productId={null}
          buttons={headerButtons as any}
        />

        {showInfo && <ChainInfoSection />}

        <Content
          pageContent={(
            <Card className={classes.contentCard}>
              <Tabs
                defaultActiveKey="chains"
                size="large"
                className={classes.tabs}
              >
                <TabPane
                  tab={(
                    <Space>
                      <span>{t('TABS.CHAINS')}</span>
                      <span className={classes.tabCount}>({total || 0})</span>
                    </Space>
                  )}
                  key="chains"
                >
                  <div className={classes.tabContent}>
                    <Card className={classes.filterCard}>
                      <Form
                        form={form}
                        layout="vertical"
                        size="large"
                        onValuesChange={handleFormValuesChange}
                      >
                        <h4 className={classes.filterSectionTitle}>{t('FILTERS.CATEGORY_FILTERS')}</h4>
                        <div className={classes.categoryFilterSection}>
                          <Row gutter={[24, 24]}>
                            <Col xs={24} sm={12} md={8} lg={8}>
                              <Form.Item name={FORM_FIELDS.CATEGORY_LEVEL_3} className={`${classes.formItem} ${classes.categoryL3Item}`}>
                                <div className={classes.categoryWrapper}>
                                  <XCommFloatingLabel.Select
                                    name={FORM_FIELDS.CATEGORY_LEVEL_3}
                                    label={FIELD_LABELS[FORM_FIELDS.CATEGORY_LEVEL_3]}
                                    loading={loading}
                                    form={form}
                                    optionsData={categoryOptions[FORM_FIELDS.CATEGORY_LEVEL_3] || []}
                                    mode="multiple"
                                    allowClear
                                    onChange={values => {
                                      setL3Categories(values || []);
                                      form.setFieldsValue({ [FORM_FIELDS.CATEGORY_LEVEL_4]: [] });

                                      if (values && values.length > 0) {
                                        dispatch(Creators.getL4CategoryOptionsRequest(values));
                                      }
                                      else {
                                        dispatch(Creators.getL4CategoryOptionsRequest([]));
                                        form.resetFields([[FORM_FIELDS.CATEGORY_LEVEL_4]]);
                                        setResetL4Counter(prev => prev + 1);
                                        handleFormValuesChange(
                                          { [FORM_FIELDS.CATEGORY_LEVEL_4]: [] },
                                          { ...form.getFieldsValue(), [FORM_FIELDS.CATEGORY_LEVEL_4]: [] },
                                        );
                                      }

                                      const updatedFields = {
                                        [FORM_FIELDS.CATEGORY_LEVEL_3]: values,
                                        [FORM_FIELDS.CATEGORY_LEVEL_4]: [],
                                      };
                                      form.setFieldsValue(updatedFields);
                                    }}
                                  />
                                  <div className={classes.categoryHint}>
                                    {t('CATEGORY.SELECT_TO_ENABLE_L4')}
                                  </div>
                                </div>
                              </Form.Item>
                              <div className={classes.categoryConnector} />
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8}>
                              <Form.Item
                                key={`l4-item-${resetL4Counter}`}
                                name={FORM_FIELDS.CATEGORY_LEVEL_4}
                                className={`${classes.formItem} ${classes.categoryL4Item}`}
                              >
                                <div className={classes.categoryWrapper}>
                                  <XCommFloatingLabel.Select
                                    key={`l4-select-${resetL4Counter}`}
                                    name={FORM_FIELDS.CATEGORY_LEVEL_4}
                                    label={FIELD_LABELS[FORM_FIELDS.CATEGORY_LEVEL_4]}
                                    loading={loading}
                                    form={form}
                                    optionsData={categoryOptions[FORM_FIELDS.CATEGORY_LEVEL_4] || []}
                                    mode="multiple"
                                    allowClear
                                    disabled={form.getFieldValue(FORM_FIELDS.CATEGORY_LEVEL_3)?.length === 0}
                                    className={form.getFieldValue(FORM_FIELDS.CATEGORY_LEVEL_3)?.length === 0 ? classes.disabledInput : ''}
                                    onChange={values => {
                                      handleFormValuesChange(
                                        { [FORM_FIELDS.CATEGORY_LEVEL_4]: values },
                                        { ...form.getFieldsValue(), [FORM_FIELDS.CATEGORY_LEVEL_4]: values },
                                      );
                                    }}
                                  />
                                  <div className={classes.categoryHint}>
                                    {form.getFieldValue(FORM_FIELDS.CATEGORY_LEVEL_3)?.length === 0
                                      ? <span className={classes.categoryHintDisabled}>{t('CATEGORY.SELECT_L3_FIRST')}</span>
                                      : <span className={classes.categoryHintEnabled}>{t('CATEGORY.FILTERS_APPLIED')}</span>}
                                  </div>
                                </div>
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>

                        <h4 className={classes.filterSectionTitle}>{t('FILTERS.ADDITIONAL_FILTERS')}</h4>
                        <Row gutter={[24, 24]}>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.PRODUCT} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                name={FORM_FIELDS.PRODUCT}
                                label={FIELD_LABELS[FORM_FIELDS.PRODUCT]}
                                loading={isSearchingProducts}
                                form={form}
                                optionsData={productSearchOptions}
                                mode="multiple"
                                allowClear
                                showSearch
                                filterOption={false}
                                onSearch={handleProductSearch}
                                notFoundContent={renderProductNotFoundContent()}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.SUPPLIER} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                name={FORM_FIELDS.SUPPLIER}
                                label={FIELD_LABELS[FORM_FIELDS.SUPPLIER]}
                                loading={loading}
                                form={form}
                                optionsData={chainNodeOptions.supplier as any[]}
                                mode="multiple"
                                allowClear
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.LOCATION} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                name={FORM_FIELDS.LOCATION}
                                label={FIELD_LABELS[FORM_FIELDS.LOCATION]}
                                loading={loading}
                                form={form}
                                optionsData={chainNodeOptions.location as any[]}
                                mode="multiple"
                                allowClear
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.DOMAINS} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                name={FORM_FIELDS.DOMAINS}
                                label={FIELD_LABELS[FORM_FIELDS.DOMAINS]}
                                loading={loading}
                                form={form}
                                optionsData={domainTypes as any[]}
                                mode="multiple"
                                allowClear
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.LOCATION_TYPES} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                mode="multiple"
                                allowClear
                                name={FORM_FIELDS.LOCATION_TYPES}
                                label={FIELD_LABELS[FORM_FIELDS.LOCATION_TYPES]}
                                loading={loading}
                                form={form}
                                optionsData={LOCATION_TYPE_OPTIONS.map(opt => ({ id: opt.value, name: opt.label }))}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.SUPPLIER_TYPES} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                mode="multiple"
                                allowClear
                                name={FORM_FIELDS.SUPPLIER_TYPES}
                                label={FIELD_LABELS[FORM_FIELDS.SUPPLIER_TYPES]}
                                loading={loading}
                                form={form}
                                optionsData={SUPPLIER_TYPE_OPTIONS.map(opt => ({ id: opt.value, name: opt.label }))}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item name={FORM_FIELDS.ENABLED} className={classes.formItem}>
                              <XCommFloatingLabel.Select
                                name={FORM_FIELDS.ENABLED}
                                label={FIELD_LABELS[FORM_FIELDS.ENABLED]}
                                loading={loading}
                                form={form}
                                optionsData={[
                                  { id: 'true', name: t('ENABLED') },
                                  { id: 'false', name: t('DISABLED') },
                                ]}
                                allowClear
                                onChange={value => {
                                  let boolValue;
                                  if (value === 'true') boolValue = true;
                                  else if (value === 'false') boolValue = false;
                                  else boolValue = undefined;

                                  handleFormValuesChange(
                                    { [FORM_FIELDS.ENABLED]: boolValue },
                                    { ...form.getFieldsValue(), [FORM_FIELDS.ENABLED]: boolValue },
                                  );
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Card>

                    <Table<ChainType>
                      className={classes.table}
                      columns={columns}
                      dataSource={chainsWithUniqueIds}
                      loading={loading}
                      rowKey={record => record.uniqueId || record.id}
                      rowSelection={rowSelection}
                      scroll={{ x: 'max-content', y: 500 }}
                      onChange={handleTableChange}
                      size="large"
                      bordered={false}
                      sticky
                      pagination={{
                        current: currentPage,
                        total,
                        pageSize: (filterParams as FilterParams).pageSize || 20,
                        showSizeChanger: true,
                        showTotal: (totalItems, range) => `${range[0].toLocaleString()}-${range[1].toLocaleString()} / ${totalItems.toLocaleString()}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        position: ['bottomCenter'],
                        onChange: handlePaginationChange,
                        onShowSizeChange: handlePaginationSizeChange,
                        hideOnSinglePage: false,
                        showQuickJumper: true,
                        // Ensure pagination controls are synced with state
                        showLessItems: true,
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane
                  tab={(
                    <Space>
                      <span>{t('TABS.INCOMPLETE_CHAINS')}</span>
                      <span className={classes.tabCount}>(8)</span>
                    </Space>
                  )}
                  key="incomplete"
                />
              </Tabs>
            </Card>
          )}
          loading={loading}
        />
        <BulkEditBar
          selectedCount={selectedChainIds.length}
          onCancel={handleCancelBulkEdit}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Chain;
