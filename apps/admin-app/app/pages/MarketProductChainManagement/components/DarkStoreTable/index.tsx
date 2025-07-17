import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Form, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { DEMOGRAPHY_LABELS, REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { fetchDarkStoresRequest, fetchLookupsRequest } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectCities,
  selectDarkStores,
  selectDemographies,
  selectDomains,
  selectError,
  selectFilters,
  selectLoading,
  selectLookupsLoading,
  selectPagination,
  selectRegions,
  selectSizes,
  selectSort,
  selectTotalCount,
} from './redux/selectors';
import { useStyles } from './styles';
import type { DarkStore, DarkStoreFilters } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

const TYPE_OPTIONS = [
  { id: '1', name: 'Main Warehouse', value: '1' },
  { id: '2', name: 'Regular Warehouse', value: '2' },
  { id: '3', name: 'Virtual Warehouse', value: '3' },
  { id: '4', name: 'Grocer Warehouse', value: '4' },
  { id: '5', name: 'Factory Warehouse', value: '5' },
  { id: '6', name: 'Supply Chain Operations', value: '6' },
  { id: '7', name: 'Vehicle Park', value: '7' },
  { id: '8', name: 'Store Conversion', value: '8' },
  { id: '99', name: 'Platform', value: '99' },
  { id: '10', name: 'Other', value: '10' },
];

export const DarkStoreTable: React.FC = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  // Inject reducer and saga
  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORES_TABLE, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.DARK_STORES_TABLE, saga });

  // Selectors
  const darkStores = useSelector(selectDarkStores);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalCount = useSelector(selectTotalCount);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  // Lookup selectors
  const cities = useSelector(selectCities);
  const regions = useSelector(selectRegions);
  const domains = useSelector(selectDomains);
  const demographies = useSelector(selectDemographies);
  const sizes = useSelector(selectSizes);
  const lookupsLoading = useSelector(selectLookupsLoading);

  useEffect(() => {
    // Fetch lookups first
    dispatch(fetchLookupsRequest());

    // Then fetch dark stores if we have an id
    if (id) {
      dispatch(fetchDarkStoresRequest({
        productId: id,
        filters: {},
        pagination: { page: 1, pageSize: 10 },
        sort: { field: 'name', order: 'asc' },
      }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      domain: filters.domain || undefined,
      warehouseType: filters.warehouseType || undefined,
      city: filters.city || undefined,
      region: filters.region || undefined,
      demography: filters.demography || undefined,
      size: filters.size || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<DarkStoreFilters>) => {
    if (!id) return;

    const newFilters = {
      ...filters,
      ...changedValues,
    };

    dispatch(fetchDarkStoresRequest({
      productId: id,
      filters: newFilters,
      pagination: { ...pagination, page: 1 },
      sort,
    }));
  };

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<DarkStore> | SorterResult<DarkStore>[],
    _extra: TableCurrentDataSource<DarkStore>,
  ) => {
    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    dispatch(
      fetchDarkStoresRequest({
        productId: id,
        filters,
        pagination: {
          page: current || 1,
          pageSize: pageSize || 10,
        },
        sort: field ? {
          field: field as string,
          order,
        } : undefined,
      }),
    );
  };

  const getSortOrder = (field: string): SortOrder | undefined => {
    if (sort?.field !== field) return undefined;
    if (sort.order === 'ascend') return 'ascend';
    if (sort.order === 'descend') return 'descend';
    return undefined;
  };

  const columns: TableColumnType<DarkStore>[] = [
    {
      title: t('COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: getSortOrder('name'),
      width: 150,
      ellipsis: true,
    },
    {
      title: t('COLUMNS.DOMAIN'),
      dataIndex: 'domains',
      key: 'domains',
      sorter: true,
      sortOrder: getSortOrder('domains'),
      width: 120,
      render: (domainItems: { id: number; name: string; class: string }[]) => {
        if (!domainItems || domainItems.length === 0) return '-';
        return (
          <div>
            {domainItems.map(domain => {
              const domainClassKey = domain.class as keyof typeof classes;
              return (
                <span key={domain.id} className={`${classes.domainTag} ${classes[domainClassKey] || ''}`}>
                  {domain.name}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      sortOrder: getSortOrder('type'),
      width: 120,
      render: (type: number) => {
        if (!type) return '-';
        const option = TYPE_OPTIONS.find(opt => Number(opt.id) === type);
        return option?.name || '-';
      },
    },
    {
      title: t('COLUMNS.CITY'),
      dataIndex: 'city',
      key: 'city',
      sorter: true,
      sortOrder: getSortOrder('city'),
      width: 120,
      ellipsis: true,
    },
    {
      title: t('COLUMNS.REGION'),
      dataIndex: 'region',
      key: 'region',
      sorter: true,
      sortOrder: getSortOrder('region'),
      width: 120,
      ellipsis: true,
    },
    {
      title: t('COLUMNS.DEMOGRAPHY'),
      dataIndex: 'demography',
      key: 'demography',
      sorter: true,
      sortOrder: getSortOrder('demography'),
      width: 120,
      render: (demography: string | number, record: DarkStore) => {
        if (!demography) return '-';

        // Map the demography key to the proper label
        // The demography value could be the key directly (e.g., "1" or 1)
        const demographyId = Number(demography);
        // Use DEMOGRAPHY_LABELS to get the localized label
        const displayValue = Number.isNaN(demographyId) ?
          demography :
          (DEMOGRAPHY_LABELS[demographyId]?.[getLangKey()] || demography);

        const demographyClassKey = record.demographyClass as keyof typeof classes;
        return (
          <div className={`${classes.demographyBadge} ${classes[demographyClassKey] || ''}`}>
            {displayValue}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.SIZE'),
      dataIndex: 'size',
      key: 'size',
      sorter: true,
      sortOrder: getSortOrder('size'),
      width: 100,
      render: (size: string, record: DarkStore) => {
        if (!size) return '-';

        const sizeClass = record.sizeClass?.toLowerCase() || '';
        const sizeClassKey = sizeClass as keyof typeof classes;

        return (
          <div className={`${classes.sizeBadge} ${classes[sizeClassKey] || ''}`}>
            {record.sizeIcon}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.CATEGORIES'),
      dataIndex: 'categories',
      key: 'categories',
      width: 100,
      align: 'right',
      render: (count: number) => count.toLocaleString() || '0',
    },
    {
      title: t('COLUMNS.PRODUCTS'),
      dataIndex: 'productsCount',
      key: 'productsCount',
      width: 100,
      align: 'right',
      render: (count: number) => count.toLocaleString() || '0',
    },
    {
      title: t('COLUMNS.CENTRAL_WAREHOUSES'),
      dataIndex: 'centralWarehousesCount',
      key: 'centralWarehousesCount',
      width: 100,
      align: 'right',
      render: (count: number) => count.toLocaleString() || '0',
    },
    {
      title: t('COLUMNS.SUPPLIERS'),
      dataIndex: 'suppliersCount',
      key: 'suppliersCount',
      width: 100,
      align: 'right',
      render: (count: number) => count.toLocaleString() || '0',
    },
  ];

  const tablePagination = {
    current: pagination.page,
    pageSize: pagination.pageSize,
    total: totalCount,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showTotal: (total: number, range: [number, number]) => `${range[0].toLocaleString()}-${range[1].toLocaleString()} / ${total.toLocaleString()}`,
    position: ['bottomCenter'] as ('bottomCenter')[],
    hideOnSinglePage: false,
    showQuickJumper: true,
    size: 'default' as 'default',
  };

  if (!id) {
    return null;
  }

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <div className={classes.errorMessage}>{error.message}</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {id && (
        <div className={classes.filtersContainer}>
          <Form
            form={form}
            onValuesChange={handleFormValuesChange}
            layout="vertical"
            size="large"
          >
            <Row gutter={[16, 16]}>
              <Col flex="1">
                <Form.Item name="search" className={classes.formItem}>
                  <XCommFloatingLabel.SearchInput
                    label={t('SEARCH')}
                    onSearch={value => {
                      handleFormValuesChange({ search: value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name="domain" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.DOMAIN')}
                    allowClear
                    loading={lookupsLoading}
                    optionsData={domains}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name="warehouseType" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.TYPE')}
                    allowClear
                    optionsData={TYPE_OPTIONS}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name="city" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.CITY')}
                    allowClear
                    loading={lookupsLoading}
                    optionsData={cities}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col flex="1">
                <Form.Item name="region" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.REGION')}
                    allowClear
                    loading={lookupsLoading}
                    optionsData={regions}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name="demography" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.DEMOGRAPHY')}
                    allowClear
                    loading={lookupsLoading}
                    optionsData={demographies}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name="size" className={classes.formItem}>
                  <XCommFloatingLabel.Select
                    label={t('COLUMNS.SIZE')}
                    allowClear
                    loading={lookupsLoading}
                    optionsData={sizes}
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                {/* Boş kolon - dengeleme için */}
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <Table
        className={classes.table}
        columns={columns}
        dataSource={darkStores}
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
