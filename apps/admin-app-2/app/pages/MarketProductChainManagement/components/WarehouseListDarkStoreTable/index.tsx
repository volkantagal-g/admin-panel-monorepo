import {
  EyeOutlined,
  LinkOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import type { TableColumnType, TablePaginationConfig } from 'antd';
import { Col, Dropdown, Form, Menu, Row, Table } from 'antd';
import type { FilterValue, SortOrder, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getLangKey } from '@shared/i18n';
import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { DEMOGRAPHY_LABELS, DOMAIN_NAME, REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';
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
  selectFilters,
  selectLoading,
  selectLookupsLoading,
  selectPagination,
  selectRegions,
  selectSizes,
  selectSort,
  selectTotalCount,
  selectWarehouseTypes,
} from './redux/selectors';
import { useStyles } from './styles';
import type { DarkStore, DarkStoreFilters, TablePagination, TableSort } from './types';

const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

const handleDetailClick = (record: DarkStore) => {
  window.open(`/chainManagement/darkStore/detail/${record.warehouseId}?country=tr`, '_blank');
};

const handleMatchClick = (record: DarkStore) => {
  window.open(`/chainManagement/matchDarkstore/${record.id}?country=tr`, '_blank');
};

const ActionMenu = ({ record, t }: { record: DarkStore; t: (key: string) => string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const menu = (
    <Menu>
      <Menu.Item
        key="details"
        icon={<EyeOutlined />}
        onClick={() => handleDetailClick(record)}
        style={{
          padding: '10px 16px',
          fontSize: '14px',
        }}
      >
        {t('DETAILS')}
      </Menu.Item>
      <Menu.Item
        key="match"
        icon={<LinkOutlined />}
        onClick={() => handleMatchClick(record)}
        style={{
          padding: '10px 16px',
          fontSize: '14px',
        }}
      >
        {t('MATCH_WITH_CW')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
    >
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          padding: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: isHovered ? '#f5f5f5' : 'transparent',
          transition: 'all 0.3s',
        }}
      >
        <MoreOutlined
          style={{
            fontSize: '24px',
            color: isHovered ? '#1890ff' : '#595959',
            transition: 'all 0.3s',
          }}
        />
      </span>
    </Dropdown>
  );
};

export const WarehouseListDarkStoreTable: React.FC = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectReducer({ key: REDUX_STORE_KEYS.WAREHOUSE_LIST_DARK_STORE_TABLE, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.WAREHOUSE_LIST_DARK_STORE_TABLE, saga });

  const darkStores = useSelector(selectDarkStores) as DarkStore[];
  const loading = useSelector(selectLoading) as boolean;
  const totalCount = useSelector(selectTotalCount) as number;
  const filters = useSelector(selectFilters) as DarkStoreFilters;
  const pagination = useSelector(selectPagination) as TablePagination;
  const sort = useSelector(selectSort) as TableSort;

  const cities = useSelector(selectCities) as { id: string; name: string; value: string }[];
  const regions = useSelector(selectRegions) as { id: string; name: string; value: string }[];
  const domains = useSelector(selectDomains) as { id: string; name: string; value: string; label: string }[];
  const demographies = useSelector(selectDemographies) as { id: string; name: string; value: string }[];
  const sizes = useSelector(selectSizes) as { id: string; name: string; value: string }[];
  const warehouseTypes = useSelector(selectWarehouseTypes) as { id: string; name: string; value: string; label: string }[];
  const lookupsLoading = useSelector(selectLookupsLoading) as boolean;

  useEffect(() => {
    dispatch(fetchLookupsRequest());
    dispatch(fetchDarkStoresRequest({
      filters: {},
      pagination: { page: 1, pageSize: 10 },
      sort: { field: 'updatedAt', order: 'descend' },
    }));
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({
      search: (filters as any)?.search || '',
      domain: (filters as any)?.domain || undefined,
      warehouseType: (filters as any)?.warehouseType || undefined,
      city: (filters as any)?.city || undefined,
      region: (filters as any)?.region || undefined,
      demography: (filters as any)?.demography || undefined,
      size: (filters as any)?.size || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = (changedValues: Partial<DarkStoreFilters>) => {
    const newFilters: DarkStoreFilters = { ...filters };

    Object.keys(changedValues).forEach(key => {
      const filterKey = key as keyof DarkStoreFilters;
      const value = changedValues[filterKey];

      if (value === undefined || value === null || value === '') {
        delete newFilters[filterKey];
      }
      else {
        (newFilters as any)[filterKey] = value;
      }
    });

    dispatch(fetchDarkStoresRequest({
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
    const newSort = sortInfo?.order ? {
      field: sortInfo.field as string,
      order: sortInfo.order,
    } : sort;

    dispatch(
      fetchDarkStoresRequest({
        filters,
        pagination: {
          page: current || 1,
          pageSize: pageSize || 10,
        },
        sort: newSort,
      }),
    );
  };

  const getSortOrder = (field: string): SortOrder | undefined => {
    if (sort?.field !== field) return undefined;
    if ((sort as any).order === 'ascend') return 'ascend';
    if ((sort as any).order === 'descend') return 'descend';
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
      width: 160,
      render: (domainItems: { id: number; name: string; class: string }[]) => {
        if (!domainItems || domainItems.length === 0) return '-';
        return (
          <div>
            {domainItems.map(domain => {
              let domainClass = '';
              switch (domain.name) {
                case DOMAIN_NAME.GETIR_MORE:
                  domainClass = classes.domainGetirMore;
                  break;
                case DOMAIN_NAME.GETIR10:
                  domainClass = classes.domainGetir10;
                  break;
                case DOMAIN_NAME.GETIR_WATER:
                  domainClass = classes.domainGetirWater;
                  break;
                default:
                  domainClass = classes.domainDefault;
              }
              return (
                <span key={domain.id} className={`${classes.domainTag} ${domainClass}`}>
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
        if (!warehouseTypes || warehouseTypes.length === 0) return '-';
        const option = warehouseTypes.find(opt => Number(opt.value) === type);
        return option?.label || '-';
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

        const demographyId = Number(demography);
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
        if (!size || size === '-') return '-';

        const sizeClassKey = record.sizeClass as keyof typeof classes;
        return (
          <div className={`${classes.sizeBadge} ${classes[sizeClassKey] || ''}`}>
            {record.sizeIcon || size}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.PRODUCTS'),
      dataIndex: 'productsCount',
      key: 'productsCount',
      width: 100,
      align: 'right',
      render: (count: number) => count?.toLocaleString() || '0',
    },
    {
      title: t('COLUMNS.CENTRAL_WAREHOUSES'),
      dataIndex: 'centralWarehousesCount',
      key: 'centralWarehousesCount',
      width: 100,
      align: 'right',
      render: (count: number) => count?.toLocaleString() || '0',
    },
    {
      title: t('COLUMNS.SUPPLIERS'),
      dataIndex: 'suppliersCount',
      key: 'suppliersCount',
      width: 100,
      align: 'right',
      render: (count: number) => count?.toLocaleString() || '0',
    },
    {
      title: ' ',
      key: 'actions',
      width: 60,
      align: 'center',
      fixed: 'right',
      render: (_, record: DarkStore) => <ActionMenu record={record} t={t} />,
    },
  ];

  const tablePagination = {
    current: pagination?.page,
    pageSize: pagination?.pageSize,
    total: totalCount,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showTotal: (total: number, range: [number, number]) => `${range[0].toLocaleString()}-${range[1].toLocaleString()} / ${total.toLocaleString()}`,
    position: ['bottomCenter'] as ('bottomCenter')[],
    hideOnSinglePage: false,
    showQuickJumper: true,
    size: 'default' as 'default',
  };

  const handleSelectClear = (filterKey: keyof DarkStoreFilters) => (value: any) => {
    if (value === undefined || value === null || value === '') {
      const update: Partial<DarkStoreFilters> = {};
      update[filterKey] = undefined;
      handleFormValuesChange(update);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.filtersContainer}>
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
          layout="vertical"
          size="large"
          onReset={() => {
            dispatch(fetchDarkStoresRequest({
              filters: {},
              pagination: { ...pagination, page: 1 },
              sort: undefined,
            }));
          }}
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
                  onChange={handleSelectClear('domain')}
                />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item name="warehouseType" className={classes.formItem}>
                <XCommFloatingLabel.Select
                  label={t('COLUMNS.TYPE')}
                  allowClear
                  optionsData={warehouseTypes}
                  onChange={handleSelectClear('warehouseType')}
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
                  onChange={handleSelectClear('city')}
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
                  onChange={handleSelectClear('region')}
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
                  onChange={handleSelectClear('demography')}
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
                  onChange={handleSelectClear('size')}
                />
              </Form.Item>
            </Col>
            <Col flex="1" />
          </Row>
        </Form>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={darkStores}
        loading={loading}
        pagination={tablePagination}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        sticky
      />
    </div>
  );
};

export default WarehouseListDarkStoreTable;
