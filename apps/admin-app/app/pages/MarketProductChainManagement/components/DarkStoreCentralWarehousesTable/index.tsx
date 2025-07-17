import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Form, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import {
  fetchCentralWarehousesRequest,
  fetchCitiesRequest,
  fetchDomainTypesRequest,
  updateFilters,
} from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectCentralWarehouses,
  selectCities,
  selectDomains,
  selectError,
  selectFilters,
  selectLoading,
  selectLookupsLoading,
  selectPagination,
  selectSort,
  selectTotalCount,
} from './redux/selectors';
import { useStyles } from './styles';
import type { CentralWarehouse, CentralWarehouseFilters, DarkStoreCentralWarehousesTableProps, FilterOption } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const DarkStoreCentralWarehousesTable: React.FC<DarkStoreCentralWarehousesTableProps> = ({ darkStoreVertexId, onTotalCountChange }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_CENTRAL_WAREHOUSES_TABLE, reducer });
  useInjectSaga({
    key: REDUX_STORE_KEYS.DARK_STORE_CENTRAL_WAREHOUSES_TABLE,
    saga,
    mode: RESTART_ON_REMOUNT,
  });

  const centralWarehouses = useSelector(selectCentralWarehouses);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalCount = useSelector(selectTotalCount);
  const filters = useSelector(selectFilters);
  const domains = useSelector(selectDomains);
  const cities = useSelector(selectCities);
  const lookupsLoading = useSelector(selectLookupsLoading);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (darkStoreVertexId) {
      dispatch(fetchDomainTypesRequest(''));
      dispatch(fetchCitiesRequest(''));
      dispatch(fetchCentralWarehousesRequest({ darkStoreVertexId }));
    }
  }, [dispatch, darkStoreVertexId]);

  useEffect(() => {
    if (onTotalCountChange) {
      onTotalCountChange(totalCount);
    }
  }, [totalCount, onTotalCountChange]);

  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      domain: filters.domain || undefined,
      city: filters.city || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<CentralWarehouseFilters>) => {
    if (!darkStoreVertexId) return;

    dispatch(updateFilters(changedValues));

    const updatedFilters = {
      ...filters,
      ...changedValues,
    };

    dispatch(fetchCentralWarehousesRequest({
      darkStoreVertexId,
      filters: updatedFilters,
      pagination: { ...pagination, page: 1 },
      sort,
    }));
  };

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<CentralWarehouse> | SorterResult<CentralWarehouse>[],
    _extra: TableCurrentDataSource<CentralWarehouse>,
  ) => {
    if (!darkStoreVertexId) return;

    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    dispatch(fetchCentralWarehousesRequest({
      darkStoreVertexId,
      filters,
      pagination: {
        page: current || 1,
        pageSize: pageSize || 10,
      },
      sort: field ? {
        field: field as string,
        order: order as ('ascend' | 'descend' | undefined),
      } : undefined,
    }));
  };

  const getSortOrder = (field: string): SortOrder | undefined => {
    if (sort?.field !== field) return undefined;
    if (sort.order === 'ascend') return 'ascend';
    if (sort.order === 'descend') return 'descend';
    return undefined;
  };

  const columns: TableColumnType<CentralWarehouse>[] = [
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
      dataIndex: 'domain',
      key: 'domain',
      sorter: true,
      sortOrder: getSortOrder('domain'),
      width: 160,
      render: (value: string, record: CentralWarehouse) => {
        if (!value) return '-';

        if (record.domainClasses && record.domainClasses.length > 0) {
          return (
            <div>
              {value.split(',').map((domain, i) => {
                const uniqueKey = `${record.id}-${domain}-${Math.random().toString(36).substring(2, 9)}`;
                return (
                  <span
                    key={uniqueKey}
                    className={`${classes.domainBadge} ${classes.domainTag}`}
                  >
                    {t(domain)}
                  </span>
                );
              })}
            </div>
          );
        }

        return t(value);
      },
    },
    {
      title: t('COLUMNS.CITY'),
      dataIndex: 'city',
      key: 'city',
      sorter: true,
      sortOrder: getSortOrder('city'),
      width: 120,
    },
    {
      title: t('COLUMNS.REGION'),
      dataIndex: 'region',
      key: 'region',
      sorter: true,
      sortOrder: getSortOrder('region'),
      width: 120,
    },
    {
      title: t('COLUMNS.CATEGORIES'),
      dataIndex: 'categories',
      key: 'categories',
      width: 120,
    },
    {
      title: t('COLUMNS.PRODUCTS'),
      dataIndex: 'products',
      key: 'products',
      width: 120,
    },
    {
      title: t('COLUMNS.SUPPLIERS'),
      dataIndex: 'suppliers',
      key: 'suppliers',
      width: 120,
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
  };

  if (!darkStoreVertexId) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.filtersContainer}>
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item name="search" className={classes.formItem}>
                <XCommFloatingLabel.SearchInput
                  label={t('SEARCH')}
                  onSearch={value => {
                    handleFormValuesChange({ search: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} md={4} lg={4}>
              <Form.Item name="domain" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.DOMAIN')}
                  allowClear
                  loading={lookupsLoading}
                  options={domains.map((domain: FilterOption) => ({
                    label: domain.name,
                    value: domain.value,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} md={4} lg={4}>
              <Form.Item name="city" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.CITY')}
                  allowClear
                  loading={lookupsLoading}
                  options={cities.map((city: FilterOption) => ({
                    label: city.name,
                    value: city.value,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={error ? [] : centralWarehouses}
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: t('NO_DATA') }}
      />
    </div>
  );
};
