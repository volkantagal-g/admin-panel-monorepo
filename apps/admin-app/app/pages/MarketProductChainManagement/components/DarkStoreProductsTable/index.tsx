import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Form, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import {
  REDUX_STORE_KEYS,
  SEGMENT_LABELS,
} from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import {
  fetchDemographicsRequest,
  fetchDomainTypesRequest,
  fetchProductsRequest,
  updateFilters,
} from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectDemographies,
  selectDomains,
  selectError,
  selectFilters,
  selectLoading,
  selectLookupsLoading,
  selectPagination,
  selectProducts,
  selectSort,
  selectTotalCount,
} from './redux/selectors';
import { useStyles } from './styles';
import type { DarkStoreProductsTableProps, Products, ProductsFilters } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const DarkStoreProductsTable: React.FC<DarkStoreProductsTableProps> = ({ darkStoreVertexId, onTotalCountChange }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_PRODUCTS_TABLE, reducer });
  useInjectSaga({
    key: REDUX_STORE_KEYS.DARK_STORE_PRODUCTS_TABLE,
    saga,
    mode: RESTART_ON_REMOUNT,
  });

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalCount = useSelector(selectTotalCount);
  const filters = useSelector(selectFilters);
  const domains = useSelector(selectDomains);
  const demographies = useSelector(selectDemographies);
  const lookupsLoading = useSelector(selectLookupsLoading);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (onTotalCountChange) {
      onTotalCountChange(totalCount);
    }
  }, [totalCount, onTotalCountChange]);

  useEffect(() => {
    if (darkStoreVertexId) {
      dispatch(fetchDomainTypesRequest(''));
      dispatch(fetchDemographicsRequest(''));
      dispatch(fetchProductsRequest({ darkStoreVertexId }));
    }
  }, [dispatch, darkStoreVertexId]);

  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      type: filters.type || undefined,
      preferred: filters.preferred || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<ProductsFilters>) => {
    if (!darkStoreVertexId) return;

    dispatch(updateFilters(changedValues));

    const updatedFilters = {
      ...filters,
      ...changedValues,
    };

    dispatch(fetchProductsRequest({
      darkStoreVertexId,
      filters: updatedFilters,
      pagination: { ...pagination, page: 1 },
      sort,
    }));
  };

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<Products> | SorterResult<Products>[],
    _extra: TableCurrentDataSource<Products>,
  ) => {
    if (!darkStoreVertexId) return;

    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    dispatch(fetchProductsRequest({
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

  const columns: TableColumnType<Products>[] = [
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
      render: (value: string, record: Products) => {
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
      title: t('COLUMNS.DEMOGRAPHY'),
      dataIndex: 'demography',
      key: 'demography',
      sorter: true,
      sortOrder: getSortOrder('demography'),
      width: 150,
      render: (value: string | number, record: Products) => {
        if (!record.demographyValues || record.demographyValues.length === 0) return '-';
        return (
          <div>
            {record.demographyValues.map(demo => (
              <span key={demo.id} className={`${classes.demographyBadge} ${classes.demographyTag}`} style={{ marginRight: '2px' }}>
                {demo.name}
              </span>
            ))}
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
      width: 120,
      render: (value: string, record: Products) => {
        if (!record.sizeValues || record.sizeValues.length === 0) return '-';
        return (
          <div>
            {record.sizeValues.map(sizeItem => (
              <span key={sizeItem.id} className={`${classes.sizeBadge} ${classes.sizeTag}`} style={{ marginRight: '2px' }}>
                {sizeItem.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.CATEGORY'),
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (value: string) => {
        return value ? t(value.toUpperCase()) : '-';
      },
    },
    {
      title: t('SEGMENT'),
      dataIndex: 'segment',
      key: 'segment',
      sorter: true,
      sortOrder: getSortOrder('segment'),
      width: 120,
      render: (value: number | null) => {
        if (value === null || value === undefined || value === 0) return '-';
        return SEGMENT_LABELS[value as keyof typeof SEGMENT_LABELS]?.en || value;
      },
    },
    {
      title: t('isLocal'),
      dataIndex: 'local',
      key: 'local',
      sorter: true,
      sortOrder: getSortOrder('local'),
      width: 80,
      render: (value: boolean | null) => {
        if (value === null || value === undefined) return '-';
        return (
          <span className={value ? classes.localCell : classes.nonLocalCell}>
            {t(value ? 'YES' : 'NO')}
          </span>
        );
      },
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
                  options={domains.map((domain: any) => ({
                    label: domain.name,
                    value: domain.value || domain.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={8} md={4} lg={4}>
              <Form.Item name="demography" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.DEMOGRAPHY')}
                  allowClear
                  options={demographies.map((demography: any) => ({
                    label: demography.name,
                    value: demography.value || demography.id,
                  }))}
                  loading={lookupsLoading}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={error ? [] : products}
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
