import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Form, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
import { useStyles } from './styles';
import { CentralWarehouse, CentralWarehouseFilters } from './types';

// Redux
import * as actions from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import * as selectors from './redux/selectors';

// Constants
const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

interface DomainType {
  label: string;
  class: string;
}

const DOMAIN_TYPE_MAP: Record<number, DomainType> = {
  1: { label: 'Getir10', class: 'getir10' },
  3: { label: 'GetirMore', class: 'getirMore' },
  4: { label: 'GetirWater', class: 'getirWater' },
};

const CentralWarehouseTable: React.FC = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE || 'marketProductChainManagement');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  // Inject reducer and saga
  useInjectReducer({ key: REDUX_STORE_KEYS.CENTRAL_WAREHOUSE_TABLE, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.CENTRAL_WAREHOUSE_TABLE, saga });

  // Selectors
  const data = useSelector(selectors.selectCentralWarehouses);
  const loading = useSelector(selectors.selectCentralWarehousesLoading);
  const error = useSelector(selectors.selectCentralWarehousesError);
  const totalCount = useSelector(selectors.selectCentralWarehousesTotalCount);
  const filters = useSelector(selectors.selectCentralWarehousesFilters);
  const pagination = useSelector(selectors.selectCentralWarehousesPagination);
  const sort = useSelector(selectors.selectCentralWarehousesSort);
  const cities = useSelector(selectors.selectCities);
  const citiesLoading = useSelector(selectors.selectCitiesLoading);
  const regions = useSelector(selectors.selectRegions);
  const regionsLoading = useSelector(selectors.selectRegionsLoading);
  const domainTypes = useSelector(selectors.selectDomainTypes);
  const domainTypesLoading = useSelector(selectors.selectDomainTypesLoading);

  // Initial data fetch
  useEffect(() => {
    // Fetch lookups first
    dispatch(actions.fetchCitiesRequest());
    dispatch(actions.fetchRegionsRequest());
    dispatch(actions.fetchDomainTypesRequest());

    // Then fetch data with or without an id
    dispatch(actions.fetchCentralWarehousesRequest({
      productId: id, // This can be undefined, and the saga will handle it
      filters: {},
      pagination: { page: 1, pageSize: 10 },
      sort: { field: 'name', order: 'ascend' },
    }));
  }, [dispatch, id]);

  // Initialize form with current filters
  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      domain: filters.domain || undefined,
      city: filters.city || undefined,
      region: filters.region || undefined,
    });
  }, [filters, form]);

  // Handle form values change
  const handleFormValuesChange = (changedValues: Partial<CentralWarehouseFilters>) => {
    const newFilters = {
      ...filters,
      ...changedValues,
    };

    // Reset pagination to first page when filters change
    dispatch(actions.fetchCentralWarehousesRequest({
      productId: id, // This can be undefined
      filters: newFilters,
      pagination: { ...pagination, page: 1 },
      sort,
    }));
  };

  // Handle table change (pagination, sorting)
  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<CentralWarehouse> | SorterResult<CentralWarehouse>[],
    _extra: TableCurrentDataSource<CentralWarehouse>,
  ) => {
    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    // Önce tüm state değişikliklerini gerçekleştir
    // Update sort state if it has changed
    if ((field && sort?.field !== field) || sort?.order !== order) {
      dispatch(actions.updateSort({ field: field as string, order: order as string }));
    }

    // Update pagination if it has changed
    if (current !== pagination.page || pageSize !== pagination.pageSize) {
      dispatch(actions.updatePagination({
        page: current || 1,
        pageSize: pageSize || 10,
      }));
    }

    // Sonra tek bir API çağrısı yap
    dispatch(
      actions.fetchCentralWarehousesRequest({
        productId: id,
        filters,
        pagination: {
          page: current || 1,
          pageSize: pageSize || 10,
        },
        sort: field ? { field: field as string, order: order as string } : undefined,
      }),
    );
  };

  // Helper function to get sort order
  const getSortOrder = (field: string): SortOrder | undefined => {
    if (sort?.field !== field) return undefined;
    if (sort.order === 'ascend') return 'ascend';
    if (sort.order === 'descend') return 'descend';
    return undefined;
  };

  const renderDomainTags = (domainString: string) => {
    if (!domainString || domainString === '-') return '-';

    // Parse domain IDs
    const domains = domainString.split(',').map(d => d.trim()).filter(Boolean);
    if (domains.length === 0) return '-';

    return (
      <div className={classes.domainTagsContainer}>
        {domains.map(domain => {
          const domainId = parseInt(domain, 10);
          const domainType = DOMAIN_TYPE_MAP[domainId] || { label: domain, class: 'getir10' };
          const domainClass = domainType.class as keyof typeof classes;

          return (
            <span key={domain} className={`${classes.domainTag} ${classes[domainClass]}`}>
              {domainType.label}
            </span>
          );
        })}
      </div>
    );
  };

  // Table columns
  const columns: TableColumnType<CentralWarehouse>[] = [
    {
      title: t('COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: getSortOrder('name'),
      width: 200,
      ellipsis: true,
      render: (name: string) => name || '-',
    },
    {
      title: t('COLUMNS.DOMAIN'),
      dataIndex: 'domain',
      key: 'domain',
      sorter: true,
      sortOrder: getSortOrder('domain'),
      width: 180,
      render: (domain: string) => renderDomainTags(domain),
    },
    {
      title: t('COLUMNS.CITY'),
      dataIndex: 'city',
      key: 'city',
      sorter: true,
      sortOrder: getSortOrder('city'),
      width: 120,
      ellipsis: true,
      render: (city: string) => city || '-',
    },
    {
      title: t('COLUMNS.REGION'),
      dataIndex: 'region',
      key: 'region',
      sorter: true,
      sortOrder: getSortOrder('region'),
      width: 120,
      ellipsis: true,
      render: (region: string) => region || '-',
    },
    {
      title: t('WAREHOUSE_STATUS'),
      dataIndex: 'state',
      key: 'state',
      sorter: true,
      sortOrder: getSortOrder('state'),
      width: 100,
      render: (state: number) => {
        if (state === 300) {
          return (
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#52c41a',
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
              border: '1px solid rgba(82, 196, 26, 0.2)',
            }}
            >
              {t('ACTIVE')}
            </span>
          );
        }
        return (
          <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '2px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#8c8c8c',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
          }}
          >
            {t('INACTIVE')}
          </span>
        );
      },
    },
  ];

  // Format pagination for antd Table
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
  };

  return (
    <div className={classes.container}>
      <div className={classes.filtersContainer}>
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
          className={classes.formItem}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="search" className={classes.formItem}>
                <XCommFloatingLabel.SearchInput
                  label={t('SEARCH')}
                  onSearch={value => {
                    handleFormValuesChange({ search: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="domain" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.DOMAIN')}
                  allowClear
                  loading={domainTypesLoading}
                  optionsData={domainTypes}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="city" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.CITY')}
                  allowClear
                  loading={citiesLoading}
                  optionsData={cities}
                  showSearch
                  onSearch={(search: string) => dispatch(actions.fetchCitiesRequest(search))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="region" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.REGION')}
                  allowClear
                  loading={regionsLoading}
                  optionsData={regions}
                  showSearch
                  onSearch={(search: string) => dispatch(actions.fetchRegionsRequest(search))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

// Named export ekle
export { CentralWarehouseTable };

// Default export'u koru
export default CentralWarehouseTable;
