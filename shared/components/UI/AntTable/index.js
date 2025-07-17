import { Table } from 'antd';
import { uniqueId } from 'lodash';

import { FIRST_ROW_CLASS_NAME } from '@shared/shared/constants';
import { Footer, Header } from './components';
import defaultOptions from './defaultOptions';
import useStyles from './styles';

/**
 * @deprecated AntTable Footer uses local pagination state, which causes additional renders on initial render
 *
 * Use AntTableV2 instead, which doesn't have pagination state, you provide the state and control it
 * Now you can drop using useEffectSkipInitialRender hook
 */

const AntTable = props => {
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
          isScrollableToTop={isScrollableToTop}
        />
      );
    }

    return null;
  };

  const getRowKey = record => {
    return record.id || record._id || record.key || uniqueId();
  };

  const getRowClassName = (record, index) => {
    if (rowClassName) {
      return rowClassName(record, index);
    }
    return index === 0 ? FIRST_ROW_CLASS_NAME : '';
  };

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
        rowKey={getRowKey}
        pagination={false}
        showHeader={showHeader}
        footer={showFooter ? renderCustomFooter : null}
        tableLayout={tableLayout}
        scroll={scroll}
        components={components}
        title={tableTitle}
        {...otherProps}
      />
    </div>
  );
};

export default AntTable;
