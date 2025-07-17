import { memo, useMemo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import PropTypes from 'prop-types';

import { DraggableRow } from './DraggableRow';
import { Table } from '../Table';

export const TableDraggable = memo(function TableDraggable({
  columns,
  data,
  isSortingColumnHidden,
  onDragEnd,
  rowKey,
  ...otherProps
}) {
  const visibleColumns = useMemo(() => {
    return isSortingColumnHidden
      ? columns.filter(c => c.key !== 'sort')
      : columns;
  }, [isSortingColumnHidden, columns]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext
        items={data.map(d => d[rowKey])}
        strategy={verticalListSortingStrategy}
      >
        <Table
          {...otherProps}
          rowKey={rowKey}
          components={{ body: { row: DraggableRow } }}
          pagination={false}
          columns={visibleColumns}
          data={data}
        />
      </SortableContext>
    </DndContext>
  );
});

TableDraggable.propTypes = {
  ...Table.propTypes,
  isSortingColumnHidden: PropTypes.bool,
  rowKey: PropTypes.string.isRequired,
  onDragEnd: PropTypes.func,
};

TableDraggable.defaultProps = {
  ...Table.defaultProps,
  isSortingColumnHidden: false,
  onDragEnd: () => {},
};
