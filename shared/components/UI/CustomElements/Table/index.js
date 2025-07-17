import { useCallback } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import useStyles from './styles';

import { TableTitle } from '@shared/components/UI/CustomElements/Title';
import { getTableID, getRowKey } from '@shared/components/UI/CustomElements/utils';

import PaginationUI from '@shared/components/UI/CustomElements/Pagination';

function TableUI({
  columns,
  currentPage,
  currentPageSize,
  dataSource,
  enableQueryPagination,
  headerControls,
  importerProps,
  isPaginationEnable,
  loading,
  onExport,
  onPaginationChange,
  onShowSizeChange,
  settingsMenu,
  showQuickJumper,
  showSizeChanger,
  tableID,
  title,
  total,
  ...otherProps
}) {
  const classes = useStyles();

  const TitleItem = useCallback(() => (
    <TableTitle
      title={title}
      totalCountData={total}
      headerControls={headerControls}
      importerProps={importerProps}
      settingsMenu={settingsMenu}
      onExport={onExport}
    />
  ), [headerControls, importerProps, onExport, settingsMenu, title, total]);

  const PaginationItem = useCallback(() => (
    <PaginationUI
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      enableQueryPagination={enableQueryPagination}
      onChange={onPaginationChange}
      onShowSizeChange={onShowSizeChange}
      size="small"
      showQuickJumper={showQuickJumper}
      showSizeChanger={showSizeChanger}
      total={total}
    />
  ), [currentPage, currentPageSize, enableQueryPagination, onPaginationChange, onShowSizeChange, showQuickJumper, showSizeChanger, total]);

  return (
    <Table
      rowKey={getRowKey}
      {...otherProps}
      id={tableID}
      className={classes.customTableWrapper}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
      pagination={false}
      title={TitleItem}
      footer={isPaginationEnable && PaginationItem}
    />
  );
}

TableUI.propTypes = {
  columns: PropTypes.oneOfType(
    [
      PropTypes.func,
      PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func])),
      ),
    ],
  ).isRequired,
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  dataSource: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType(
        [
          PropTypes.number, PropTypes.string, PropTypes.bool, PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
          ),
        ],
      ),
    ),
  ).isRequired,
  enableQueryPagination: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  headerControls: PropTypes.element,
  importerProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.func])),
  isPaginationEnable: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onExport: PropTypes.func,
  onHeaderRow: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRow: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  rowSelection: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.func])),
  rowClassName: PropTypes.string,
  settingsMenu: PropTypes.element,
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'middle', 'small']),
  summary: PropTypes.func,
  tableID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tableLayout: PropTypes.oneOf(['-', 'auto', 'fixed']),
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
};

TableUI.defaultProps = {
  currentPage: 1,
  currentPageSize: 10,
  enableQueryPagination: false,
  getPopupContainer: () => {},
  headerControls: undefined,
  importerProps: undefined,
  isPaginationEnable: true,
  loading: false,
  onChange: () => {},
  onExport: undefined,
  onHeaderRow: () => {},
  onPaginationChange: () => {},
  onRow: () => {},
  onShowSizeChange: () => {},
  rowSelection: undefined,
  rowClassName: '',
  settingsMenu: undefined,
  size: 'default',
  summary: () => {},
  showQuickJumper: true,
  showSizeChanger: true,
  tableID: getTableID(),
  tableLayout: '-',
  total: 0,
};

export default TableUI;
