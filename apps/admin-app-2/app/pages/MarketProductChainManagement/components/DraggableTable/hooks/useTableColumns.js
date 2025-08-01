import { useMemo } from 'react';

const ACTION_COLUMN_KEY = 'actions';

const createColumnConfig = (column, index, options = {}) => ({
  ...column,
  key: options.key || `${index}`,
  onHeaderCell: () => ({ id: options.key || `${index}` }),
  onCell: () => ({ id: options.key || `${index}` }),
  ...(options.fixed && { fixed: options.fixed }),
});

export const useTableColumns = ({
  baseColumns,
  selectedFreezeColumns = [],
  selectedManageColumns = baseColumns.map(col => col.dataIndex),
}) => {
  const columns = useMemo(() => {
    const actionColumn = baseColumns.find(column => column.dataIndex === ACTION_COLUMN_KEY);

    const visibleColumns = baseColumns.filter(column => column.dataIndex !== ACTION_COLUMN_KEY &&
      selectedManageColumns.includes(column.dataIndex));

    const frozenColumns = visibleColumns
      .filter(column => selectedFreezeColumns.includes(column.dataIndex))
      .map((column, index) => createColumnConfig(column, index, {
        key: column.dataIndex,
        fixed: 'left',
      }));

    const nonFrozenColumns = visibleColumns
      .filter(column => !selectedFreezeColumns.includes(column.dataIndex))
      .map((column, index) => createColumnConfig(column, index + frozenColumns.length, {
        key: column.dataIndex,
        fixed: null,
      }));

    const sortedColumns = [...frozenColumns, ...nonFrozenColumns];

    if (actionColumn) {
      const actionConfig = createColumnConfig(actionColumn, sortedColumns.length, {
        key: ACTION_COLUMN_KEY,
        fixed: 'right',
      });
      sortedColumns.push(actionConfig);
    }

    return sortedColumns;
  }, [baseColumns, selectedFreezeColumns, selectedManageColumns]);

  return {
    columns,
    setColumns: () => {},
  };
};
