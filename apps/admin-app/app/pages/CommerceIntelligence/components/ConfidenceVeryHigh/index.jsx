import { Col, Form, Pagination, Row, Select, Table } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import PurpleArrowIcon from '@app/pages/CommerceIntelligence/assets/icons/purpleArrow.svg';
import { XCommFloatingLabel } from '@app/pages/CommerceIntelligence/components/XCommFloatingLabel';
import { REDUX_STORE_KEYS, TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import { COMPETITORS_LOOKUP, MOCK_PRODUCT_DATA } from '@app/pages/CommerceIntelligence/mockData';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import DoubleLeftIcon from '@app/pages/CommerceIntelligence/assets/icons/doubleLeft.svg';
import DoubleRightIcon from '@app/pages/CommerceIntelligence/assets/icons/doubleRight.svg';
import BulkEditBar from '@app/pages/CommerceIntelligence/components/BulkEditBar';
import { useCheckboxLogic } from './hooks/useCheckboxLogic';
import { Creators } from './redux/actions';
import { reducer } from './redux/reducer';
import { saga } from './redux/saga';
import {
  selectFilters,
  selectLevel3Categories,
  selectLevel4Categories,
  selectLoading,
} from './redux/selectors';
import useStyles from './styles';
import { createChildTableColumns, createMainTableColumns } from './utils/tableColumns';

const ExpandIcon = memo(({ expanded, onExpand, record, classes }) => {
  if (!record.competitor?.length) {
    return null;
  }

  const expandClass = expanded ? 'expanded' : '';

  return (
    <span
      className={classes.customExpandIcon}
      tabIndex={0}
      role="button"
      onClick={e => onExpand(record, e)}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') onExpand(record, e);
      }}
    >
      <img src={PurpleArrowIcon} alt="expand" className={expandClass} />
    </span>
  );
});

const ExpandedContent = memo(({ record, classes, t, getChildCheckboxState, handleChildCheckboxChange, isChildRowSelected }) => {
  const competitorData = record.competitor.map(competitor => ({
    ...competitor,
    parentProductId: record.productId,
  }));

  return (
    <div className={classes.expandedContent}>
      <Table
        columns={createChildTableColumns(classes, t, getChildCheckboxState, handleChildCheckboxChange)}
        dataSource={competitorData}
        pagination={false}
        rowKey={(item, index) => `${item.productName}-${index}`}
        rowClassName={(childRecord, index) => {
          const childProductId = `${childRecord.productName}-${index}`;
          return isChildRowSelected(record.productId, childProductId) ? classes.selectedChildRow : '';
        }}
      />
    </div>
  );
});

const createExpandIconRenderer = classes => props => <ExpandIcon {...props} classes={classes} />;

const ItemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <img src={PurpleArrowIcon} alt="previous" className="prev-icon" />;
  }
  if (type === 'next') {
    return <img src={PurpleArrowIcon} alt="next" className="next-icon" />;
  }
  if (type === 'jump-prev') {
    return <img src={DoubleLeftIcon} alt="jump previous" className="jump-prev-icon" />;
  }
  if (type === 'jump-next') {
    return <img src={DoubleRightIcon} alt="jump next" className="jump-next-icon" />;
  }
  return originalElement;
};

const ConfidenceVeryHigh = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [resetL4Counter, setResetL4Counter] = useState(0);
  const { page, pageSize: initialPageSize } = MOCK_PRODUCT_DATA.pagination;
  const [currentPage, setCurrentPage] = useState(page);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useInjectReducer({ key: REDUX_STORE_KEYS.CONFIDENCE_VERY_HIGH, reducer });
  useInjectSaga({
    key: REDUX_STORE_KEYS.CONFIDENCE_VERY_HIGH,
    saga,
    mode: RESTART_ON_REMOUNT,
  });

  const level3Categories = useSelector(selectLevel3Categories);
  const level4Categories = useSelector(selectLevel4Categories);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectLoading);

  const {
    handleMasterCheckboxChange,
    handleParentCheckboxChange,
    handleChildCheckboxChange,
    getParentCheckboxState,
    getMasterCheckboxState,
    getChildCheckboxState,
    getTotalSelectedCount,
    isRowSelected,
    isChildRowSelected,
    clearAllSelections,
    handleBulkDelete,
    handleBulkMatch,
  } = useCheckboxLogic();

  const selectedCount = getTotalSelectedCount();

  const handleBulkCancel = useCallback(() => {
    clearAllSelections();
  }, [clearAllSelections]);

  const defaultExpandedRowKeys = useMemo(
    () => MOCK_PRODUCT_DATA.data
      .filter(item => item.match === 1 && item.competitor?.length > 0)
      .map(item => item.productId),
    [],
  );

  useEffect(() => {
    dispatch(Creators.fetchLevel3CategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({
      search: filters.search || '',
      competitor: filters.competitor || undefined,
      level3: filters.level3 || undefined,
      level4: filters.level4 || undefined,
    });
  }, [filters, form]);

  const handleFormValuesChange = useCallback(changedValues => {
    dispatch(Creators.updateFilters(changedValues));
  }, [dispatch]);

  const handleSearchChange = useCallback(value => {
    handleFormValuesChange({ search: value });
  }, [handleFormValuesChange]);

  const handleLevel3Change = useCallback(values => {
    form.setFieldsValue({ level4: [] });

    if (values && values.length > 0) {
      dispatch(Creators.fetchLevel4CategoriesRequest(values));
    }
    else {
      dispatch(Creators.fetchLevel4CategoriesRequest([]));
      form.resetFields(['level4']);
      setResetL4Counter(prev => prev + 1);
    }

    const updatedFields = {
      level3: values,
      level4: [],
    };
    form.setFieldsValue(updatedFields);
    handleFormValuesChange(updatedFields);
  }, [dispatch, form, handleFormValuesChange]);

  const handleFilterOption = useCallback((input, option) => {
    const optionLabel = option?.label?.props?.children?.[1]?.props?.children?.toString().toLowerCase() || '';
    const optionValue = option?.value?.toString().toLowerCase() || '';
    const optionName = option?.name?.toString().toLowerCase() || '';
    const searchText = input.toLowerCase().trim();
    const searchTerms = searchText.split(/\s+/);

    return searchTerms.every(term => optionLabel.includes(term) ||
      optionValue.includes(term) ||
      optionName.includes(term));
  }, []);

  const dropdownRender = menu => (
    <div>
      <div className={classes.dropdownMenuWithScrollbar}>
        {menu}
      </div>
    </div>
  );

  const mainTableColumns = createMainTableColumns(
    classes,
    t,
    getMasterCheckboxState,
    getParentCheckboxState,
    handleMasterCheckboxChange,
    handleParentCheckboxChange,
  );

  const expandIconRenderer = useMemo(() => createExpandIconRenderer(classes), [classes]);
  const expandedRowRenderer = useCallback(record => (
    <ExpandedContent
      record={record}
      classes={classes}
      t={t}
      getChildCheckboxState={getChildCheckboxState}
      handleChildCheckboxChange={handleChildCheckboxChange}
      isChildRowSelected={isChildRowSelected}
    />
  ), [classes, t, getChildCheckboxState, handleChildCheckboxChange, isChildRowSelected]);

  const handlePageSizeChange = useCallback(value => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  const handlePageChange = useCallback((pageNumber, size) => {
    setCurrentPage(pageNumber);
    if (size !== pageSize) {
      setPageSize(size);
    }
  }, [pageSize]);

  const handleFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleLastPage = useCallback(() => {
    const totalPages = Math.ceil(MOCK_PRODUCT_DATA.totalCount / pageSize);
    setCurrentPage(totalPages);
  }, [pageSize]);

  return (
    <div className={classes.container}>
      <div className={classes.tableContainer}>
        <div className={classes.table}>
          <div className={classes.filtersContainer}>
            <Form
              form={form}
              onValuesChange={handleFormValuesChange}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Form.Item name="search" className={classes.formItem} initialValue={null}>
                    <XCommFloatingLabel.SearchInput
                      label={t('SEARCH')}
                      onSearch={handleSearchChange}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Form.Item name="level3" className={classes.formItem} initialValue={[]}>
                    <XCommFloatingLabel.Select
                      label={t('CATEGORY')}
                      allowClear
                      mode="multiple"
                      loading={loading.level3}
                      optionsData={level3Categories}
                      dropdownRender={dropdownRender}
                      showSearch
                      virtual
                      listHeight={400}
                      optionFilterProp="label"
                      filterOption={handleFilterOption}
                      onChange={handleLevel3Change}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Form.Item
                    key={`l4-item-${resetL4Counter}`}
                    name="level4"
                    className={classes.formItem}
                  >
                    <XCommFloatingLabel.Select
                      key={`l4-select-${resetL4Counter}`}
                      label={t('SUB_CATEGORY')}
                      allowClear
                      mode="multiple"
                      loading={loading.level4}
                      optionsData={level4Categories}
                      dropdownRender={dropdownRender}
                      showSearch
                      virtual
                      listHeight={400}
                      optionFilterProp="label"
                      disabled={form.getFieldValue('level3')?.length === 0}
                      filterOption={handleFilterOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Form.Item name="competitor" className={classes.formItem} initialValue={[]}>
                    <XCommFloatingLabel.Select
                      label={t('COMPETITOR')}
                      allowClear
                      mode="multiple"
                      loading={false}
                      optionsData={COMPETITORS_LOOKUP.map(competitor => ({
                        label: competitor.name,
                        value: competitor.value,
                      }))}
                      dropdownRender={dropdownRender}
                      showSearch
                      filterOption={handleFilterOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className={classes.expandableTableContainer}>
            <Table
              columns={mainTableColumns}
              expandable={{
                expandedRowRender: expandedRowRenderer,
                expandIconColumnIndex: mainTableColumns.length - 1,
                expandIcon: expandIconRenderer,
                indentSize: 0,
                expandRowByClick: true,
                rowExpandable: record => record.competitor?.length > 0,
                defaultExpandedRowKeys,
              }}
              dataSource={MOCK_PRODUCT_DATA.data}
              pagination={false}
              rowKey="productId"
              rowClassName={record => (isRowSelected(record.productId) ? classes.selectedRow : '')}
            />
            <div className={classes.paginationContainer}>
              <div className={classes.paginationCenter}>
                <div className={classes.customPaginationWrapper}>
                  <button
                    type="button"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                    className={classes.paginationButton}
                    aria-label="First page"
                  >
                    <img src={DoubleLeftIcon} alt="first page" className="jump-prev-icon" />
                  </button>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={MOCK_PRODUCT_DATA.totalCount}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className={classes.pagination}
                    itemRender={ItemRender}
                    showTotal={false}
                  />
                  <button
                    type="button"
                    onClick={handleLastPage}
                    disabled={currentPage === Math.ceil(MOCK_PRODUCT_DATA.totalCount / pageSize)}
                    className={classes.paginationButton}
                    aria-label="Last page"
                  >
                    <img src={DoubleRightIcon} alt="last page" className="jump-next-icon" />
                  </button>
                </div>
              </div>
              <div className={classes.limitContainer}>
                <span className={classes.limitLabel}>Limit</span>
                <Select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  suffixIcon={<img src={PurpleArrowIcon} alt="arrow" style={{ width: 20, height: 20 }} />}
                  className={classes.limitSelect}
                  options={[
                    { label: '5', value: 5 },
                    { label: '10', value: 10 },
                    { label: '20', value: 20 },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BulkEditBar
        selectedCount={selectedCount}
        onCancel={handleBulkCancel}
        onDelete={handleBulkDelete}
        onMatch={handleBulkMatch}
      />
    </div>
  );
};

export default memo(ConfidenceVeryHigh);
