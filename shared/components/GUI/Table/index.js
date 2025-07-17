import { Table as TableAntd } from 'antd';
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import useStyles from './styles';
import Pagination from '@shared/components/GUI/Pagination';
import { TableTitle } from '@shared/components/GUI/TableTitle';

export const Table = memo(function Table({
  columns, currentPage,
  currentPageSize, enableQueryPagination,
  data, headerControls, isBEPaginationAvailable, onPaginationChange, onShowSizeChange, pagination,
  handleOpenImportExport,
  showQuickJumper, showSizeChanger,
  total, title, scroll, rowKey,
  isBorderRounded,
  ...otherProps
}) {
  const classes = useStyles({ title, isBorderRounded, isBEPaginationAvailable });

  const TitleItem = useCallback(() => (
    <TableTitle
      title={title}
      totalCountData={total}
      headerControls={headerControls}
      handleOpenImportExport={handleOpenImportExport}
    />
  ), [headerControls, handleOpenImportExport, title, total]);

  const PaginationForBE = useCallback(() => (
    <Pagination
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

  const getRowKey = record => {
    return record.rowKey || record.id || record._id || record.key || uniqueId();
  };

  return (
    <TableAntd
      {...otherProps}
      rowKey={rowKey || getRowKey}
      pagination={pagination}
      className={classes.table}
      columns={columns}
      dataSource={data}
      footer={isBEPaginationAvailable && PaginationForBE}
      title={TitleItem}
      scroll={scroll ?? { x: 'auto' }}
    />
  );
});

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  headerControls: PropTypes.element,
  isBEPaginationAvailable: PropTypes.bool,
  loading: PropTypes.bool,
  onPaginationChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  pagination: PropTypes.bool,
  handleOpenImportExport: PropTypes.func,
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  title: PropTypes.string,
  total: PropTypes.number,
  rowKey: PropTypes.string,
  isBorderRounded: PropTypes.bool,
};
Table.defaultProps = {
  currentPage: 1,
  currentPageSize: 10,
  data: [],
  headerControls: undefined,
  isBEPaginationAvailable: false,
  loading: false,
  onPaginationChange: () => {},
  onShowSizeChange: () => {},
  pagination: false,
  handleOpenImportExport: undefined,
  showQuickJumper: true,
  showSizeChanger: true,
  title: undefined,
  total: 0,
  rowKey: undefined,
  isBorderRounded: false,
};
