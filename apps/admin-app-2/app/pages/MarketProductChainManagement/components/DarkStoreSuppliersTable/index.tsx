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
import { fetchSuppliersRequest, updateFilters } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectError,
  selectFilters,
  selectLoading,
  selectLookupsLoading,
  selectPagination,
  selectSort,
  selectSuppliers,
  selectTotalCount,
} from './redux/selectors';
import { useStyles } from './styles';
import type { DarkStoreSuppliersTableProps, Supplier, SupplierFilters } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const DarkStoreSuppliersTable: React.FC<DarkStoreSuppliersTableProps> = ({ darkStoreVertexId, onTotalCountChange }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectReducer({ key: REDUX_STORE_KEYS.DARK_STORE_SUPPLIERS_TABLE, reducer });
  useInjectSaga({
    key: REDUX_STORE_KEYS.DARK_STORE_SUPPLIERS_TABLE,
    saga,
    mode: RESTART_ON_REMOUNT,
  });

  const suppliers = useSelector(selectSuppliers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalCount = useSelector(selectTotalCount);
  const filters = useSelector(selectFilters);
  const lookupsLoading = useSelector(selectLookupsLoading);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (darkStoreVertexId) {
      dispatch(fetchSuppliersRequest({ darkStoreVertexId }));
    }
  }, [dispatch, darkStoreVertexId]);

  useEffect(() => {
    if (onTotalCountChange) {
      onTotalCountChange(totalCount);
    }
  }, [totalCount, onTotalCountChange]);

  useEffect(() => {
    form.setFieldsValue({ search: filters.search || '' });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<SupplierFilters>) => {
    if (!darkStoreVertexId) return;

    dispatch(updateFilters(changedValues));

    const updatedFilters = { ...filters, ...changedValues };

    dispatch(fetchSuppliersRequest({
      darkStoreVertexId,
      filters: updatedFilters,
      pagination: { ...pagination, page: 1 },
      sort,
    }));
  };

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<Supplier> | SorterResult<Supplier>[],
    _extra: TableCurrentDataSource<Supplier>,
  ) => {
    if (!darkStoreVertexId) return;

    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    dispatch(fetchSuppliersRequest({
      darkStoreVertexId,
      filters,
      pagination: { page: current || 1, pageSize: pageSize || 10 },
      sort: field ? { field: field as string, order: order as ('ascend' | 'descend' | undefined) } : undefined,
    }));
  };

  const getSortOrder = (field: string): SortOrder | undefined => {
    if (sort?.field !== field) return undefined;
    if (sort.order === 'ascend') return 'ascend';
    if (sort.order === 'descend') return 'descend';
    return undefined;
  };

  const columns: TableColumnType<Supplier>[] = [
    {
      title: t('COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: getSortOrder('name'),
      width: 250,
      ellipsis: true,
    },
    {
      title: t('COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      sortOrder: getSortOrder('type'),
      width: 180,
    },
    {
      title: t('COLUMNS.CATEGORIES'),
      dataIndex: 'categories',
      key: 'categories',
      width: 120,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: t('COLUMNS.PRODUCTS'),
      dataIndex: 'products',
      key: 'products',
      width: 120,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: t('COLUMNS.CWS'),
      dataIndex: 'centralWarehouses',
      key: 'centralWarehouses',
      width: 120,
      render: (value: number) => value.toLocaleString(),
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
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        dataSource={suppliers}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: t('NO_DATA') }}
      />
    </div>
  );
};
