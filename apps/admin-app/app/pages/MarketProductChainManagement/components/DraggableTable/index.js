import {
  closestCenter,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { Table } from 'antd';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTableColumns } from '@app/pages/MarketProductChainManagement/components/DraggableTable/config';
import { useDragAndDrop } from '@app/pages/MarketProductChainManagement/components/DraggableTable/hooks/useDragAndDrop';
import { useTableColumns } from '@app/pages/MarketProductChainManagement/components/DraggableTable/hooks/useTableColumns';
import useStyles from '@app/pages/MarketProductChainManagement/components/DraggableTable/styles';

export const DragIndexContext = createContext(null);

const TableBodyCell = props => <td {...props} />;

const TableHeaderCell = ({ id, ...props }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id });
  return <th {...props} ref={setNodeRef} {...attributes} {...listeners} />;
};

const DraggableTable = ({
  data,
  activeTab,
  selectedFreezeColumns,
  selectedManageColumns,
  onDeletePlatform,
  isDetailPage,
  pageType,
  pagination,
  onChange,
  loading,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();
  const [sortState, setSortState] = useState({ field: 'name', order: 'ascend' });

  const baseColumns = useMemo(
    () => getTableColumns(t, classes, activeTab, onDeletePlatform, isDetailPage, pageType),
    [t, classes, activeTab, onDeletePlatform, isDetailPage, pageType],
  );

  const { columns, setColumns } = useTableColumns({
    baseColumns,
    selectedFreezeColumns,
    selectedManageColumns,
  });

  const {
    sensors,
    dragIndex,
    handleDragEnd,
    handleDragOver,
    dragOverlayTitle,
  } = useDragAndDrop({ columns, setColumns });

  const handleTableChange = useCallback((newPagination, filters, sorter) => {
    if (onChange) {
      const newSortState = {
        field: sorter.field || sortState.field,
        order: sorter.order === 'ascend' ? 'ascend' : 'descend',
      };

      setSortState(newSortState);

      const sortConfig = {
        field: newSortState.field,
        order: newSortState.order === 'ascend' ? 'asc' : 'desc',
      };

      onChange(newPagination, filters, sortConfig);
    }
  }, [onChange, sortState.field]);

  const uniqueData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const seen = new Set();
    return data.filter(item => {
      if (!item.centralWarehouseVertexId) return true;
      const duplicate = seen.has(item.centralWarehouseVertexId);
      seen.add(item.centralWarehouseVertexId);
      return !duplicate;
    });
  }, [data]);

  const totalWidth = useMemo(() => {
    return columns.reduce((total, col) => total + (col.width || 100), 0);
  }, [columns]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={columns.map(index => index.key)}
        strategy={horizontalListSortingStrategy}
      >
        <DragIndexContext.Provider value={dragIndex}>
          <div className={classes.table}>
            <Table
              rowKey="centralWarehouseVertexId"
              columns={columns}
              dataSource={uniqueData}
              components={{
                header: { cell: TableHeaderCell },
                body: { cell: TableBodyCell },
              }}
              scroll={{
                x: Math.max(totalWidth, 800),
                y: 600,
              }}
              pagination={pagination}
              onChange={handleTableChange}
              sortDirections={['ascend', 'descend']}
              sortOrder={sortState.order}
              loading={loading}
              sticky
            />
          </div>
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        {dragOverlayTitle && <div className={classes.dragOverlayCell}>{dragOverlayTitle}</div>}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableTable;
