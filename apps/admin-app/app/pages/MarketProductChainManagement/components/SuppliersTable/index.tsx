import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Form, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { fetchSuppliersRequest, updateFilters } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  selectError,
  selectFilters,
  selectLoading,
  selectPagination,
  selectSort,
  selectSuppliers,
  selectTotalCount,
} from './redux/selectors';
import { useStyles } from './styles';
import type { Supplier, SupplierFilters } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const SuppliersTable: React.FC = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  useInjectReducer({ key: REDUX_STORE_KEYS.SUPPLIERS_TABLE, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.SUPPLIERS_TABLE, saga });

  const suppliers = useSelector(selectSuppliers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalCount = useSelector(selectTotalCount);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (id) {
      dispatch(fetchSuppliersRequest({ productId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      type: filters.type || undefined,
      preferred: filters.preferred || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<SupplierFilters>) => {
    if (!id) return;

    dispatch(updateFilters(changedValues));

    const updatedFilters = {
      ...filters,
      ...changedValues,
    };

    dispatch(fetchSuppliersRequest({
      productId: id,
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
    if (!id) return;

    const { current, pageSize } = tablePagination;
    const sortInfo = Array.isArray(sorter) ? sorter[0] : sorter;
    const { field, order } = sortInfo || {};

    dispatch(fetchSuppliersRequest({
      productId: id,
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

  // Helper function to get sort order
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
      width: 150,
      ellipsis: true,
    },
    {
      title: t('COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      sortOrder: getSortOrder('type'),
      width: 120,
      render: (_: unknown, record: Supplier) => t(record.type.toUpperCase()),
    },
    {
      title: t('COLUMNS.NET_BUYING_PRICE'),
      dataIndex: 'netBuyingPrice',
      key: 'netBuyingPrice',
      width: 150,
      align: 'right',
      render: (value: number | null) => (value !== null ? value.toLocaleString() : '-'),
    },
    {
      title: t('COLUMNS.BONUSES'),
      dataIndex: 'bonuses',
      key: 'bonuses',
      width: 120,
      align: 'right',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: t('COLUMNS.PREFERRED'),
      dataIndex: 'preferred',
      key: 'preferred',
      sorter: true,
      sortOrder: getSortOrder('preferred'),
      width: 120,
      align: 'center',
      render: (value: boolean) => t(value ? 'YES' : 'NO'),
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
      <div className={classes.filtersContainer}>
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="search" className={classes.formItem}>
                <XCommFloatingLabel.SearchInput
                  label={t('SEARCH')}
                  onSearch={value => {
                    handleFormValuesChange({ search: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="type" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.TYPE')}
                  allowClear
                  optionsData={[
                    { id: 'manufacturer', name: t('SUPPLIER_TYPE.MANUFACTURER') },
                    { id: 'supplier', name: t('SUPPLIER_TYPE.SUPPLIER') },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="preferred" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.PREFERRED')}
                  allowClear
                  optionsData={[
                    { id: 'true', name: t('YES') },
                    { id: 'false', name: t('NO') },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={suppliers}
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
