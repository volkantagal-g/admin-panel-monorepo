import { isEmpty, uniqueId } from 'lodash';
import { Table } from 'antd';

import { FIRST_ROW_CLASS_NAME } from '@shared/shared/constants';
import { t } from '@shared/i18n';
import { Footer, Header } from './components';
import defaultOptions from './defaultOptions';
import useStyles from './styles';

/**
 *
 * Same AntTable, only thing different is Footer's pagination logic
 * So when migrate to this component, check your pagination flow
 *
 * V2 doesn't store local pagination state, control pagination in your own parent component
 * It will not call onPaginationChange on mount, only when pagination inputs clicked/changed
 * You can now drop using useEffectSkipInitialRender hook
 */

const AntTableV2 = props => {
  const {
    data,
    columns,
    loading,
    title,
    totalBadge,
    importerProps,
    onExport,
    settingsMenu,
    showHeader = true,
    showFooter = true,
    footer,
    onPaginationChange,
    resetAfterLimitChange = true,
    isScrollableToTop = true,
    pagination = defaultOptions.pagination,
    size = defaultOptions.size,
    pageSizeOptions = defaultOptions.pageSizeOptions,
    tableLayout = defaultOptions.tableLayout,
    scroll = defaultOptions.scroll,
    total = defaultOptions.total,
    rowClassName,
    containerClassName,
    rightElement,
    components,
    tableTitle,
    pageSize,
    rowKey,
    onChange,
    showSorterTooltip,
    showTotal = false,
    showFrontendPagination = false,
    ...otherProps
  } = props;

  const classes = useStyles();
  const renderCustomFooter = () => {
    if (footer) {
      return footer;
    }

    if (onPaginationChange) {
      return (
        <Footer
          total={total}
          currentPage={pagination.currentPage}
          rowsPerPage={pagination.rowsPerPage}
          pageSizeOptions={pageSizeOptions}
          onPaginationChange={onPaginationChange}
          resetAfterLimitChange={resetAfterLimitChange}
          isScrollableToTop={isScrollableToTop}
          showTotal={showTotal}
        />
      );
    }

    return null;
  };

  const getRowKey = record => {
    return record.rowKey || record.id || record._id || record.key || uniqueId();
  };

  const getRowClassName = (record, index) => {
    if (rowClassName) {
      return rowClassName(record, index);
    }
    return index === 0 ? FIRST_ROW_CLASS_NAME : '';
  };

  const sortOptionsTranslation = {
    triggerDesc: t('SORT_TABLE_DESC'),
    triggerAsc: t('SORT_TABLE_ASC'),
    cancelSort: t('SORT_TABLE_CANCEL'),
  };

  let formattedPagination = {};

  if (showFrontendPagination) {
    formattedPagination = pagination || {};
  }
  else if (pageSize) {
    formattedPagination.pageSize = pageSize;
  }

  return (
    <div className={containerClassName || classes.container}>
      {(title || totalBadge || importerProps || onExport || settingsMenu) && (
        <Header
          key="Item-1"
          loading={loading}
          title={title}
          totalBadge={totalBadge}
          importerProps={importerProps}
          onExport={onExport}
          settingsMenu={settingsMenu}
          rightElement={rightElement}
        />
      )}
      <Table
        key="Item-2"
        className={classes.table}
        rowClassName={getRowClassName}
        dataSource={data}
        columns={columns}
        loading={loading}
        size={size}
        rowKey={rowKey || getRowKey}
        pagination={isEmpty(formattedPagination) ? false : formattedPagination}
        showHeader={showHeader}
        footer={showFooter ? renderCustomFooter : null}
        tableLayout={tableLayout}
        scroll={scroll}
        components={components}
        onChange={onChange}
        locale={sortOptionsTranslation}
        showSorterTooltip={showSorterTooltip}
        title={tableTitle}
        {...otherProps}
      />
    </div>
  );
};

export default AntTableV2;
