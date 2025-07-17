import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useMemo, useState } from 'react';

export const useDragAndDrop = ({ columns, setColumns }) => {
  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
  );

  const handleDragEnd = useCallback(({ active, over }) => {
    if (active.id !== over?.id) {
      setColumns(prevState => {
        const activeIndex = prevState.findIndex(index => index.key === active?.id);
        const overIndex = prevState.findIndex(index => index.key === over?.id);

        const activeColumn = prevState[activeIndex];
        const overColumn = prevState[overIndex];

        const isActiveFixed = activeColumn.fixed === 'left';
        const isOverFixed = overColumn.fixed === 'left';

        if (isActiveFixed) {
          const lastFixedIndex = prevState.reduce((acc, col, idx) => (col.fixed === 'left' ? idx : acc), -1);

          if (overIndex > lastFixedIndex) {
            return prevState;
          }
        }

        if (!isActiveFixed && isOverFixed) {
          return prevState;
        }

        const newColumns = arrayMove(prevState, activeIndex, overIndex);
        const fixedColumns = newColumns.filter(col => col.fixed === 'left');
        const nonFixedColumns = newColumns.filter(col => col.fixed !== 'left');

        return [...fixedColumns, ...nonFixedColumns];
      });
    }
    setDragIndex({ active: -1, over: -1 });
  }, [setColumns]);

  const handleDragOver = useCallback(({ active, over }) => {
    const activeIndex = columns.findIndex(index => index.key === active.id);
    const overIndex = columns.findIndex(index => index.key === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? 'right' : 'left',
    });
  }, [columns]);

  const dragOverlayTitle = useMemo(() => {
    const activeColumn = columns.find(index => index.key === dragIndex.active);
    return activeColumn?.title;
  }, [columns, dragIndex.active]);

  return {
    sensors,
    dragIndex,
    handleDragEnd,
    handleDragOver,
    dragOverlayTitle,
  };
};
