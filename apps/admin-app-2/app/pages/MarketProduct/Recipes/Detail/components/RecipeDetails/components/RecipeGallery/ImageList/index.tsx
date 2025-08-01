import _ from 'lodash';
import { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { TableRowSelection } from 'antd/lib/table/interface';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/events.d';
import { DndContext } from '@dnd-kit/core';

import { EditingStageValidImage } from '../types';
import { tableConfig, getColumns } from './config';
import useStyles from './styles';

export type ImageListProps = {
  currentImages: readonly EditingStageValidImage[];
  onRetry: (key: string) => void;
  onRemove: (key: string) => void;
  onMainImageChange: (key: string) => void,
  onImageMove: (from: number, to: number) => void,
  onSelectionChange: (key: string[]) => void,
};

export const ImageList: FC<ImageListProps> = function ImageList({
  currentImages,
  onRetry,
  onRemove,
  onMainImageChange,
  onImageMove,
  onSelectionChange,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const { table: tableStyles } = useStyles();

  const columns = useMemo(
    () => getColumns({
      t,
      onMainImageChange,
      onRetry,
      onRemove,
    }),
    [t, onMainImageChange, onRetry, onRemove],
  );
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = currentImages.findIndex(i => i.key === active.id);
      const overIndex = currentImages.findIndex(i => i.key === over?.id);
      onImageMove(activeIndex, overIndex);
    }
  };

  const rowSelection: TableRowSelection<EditingStageValidImage> = useMemo(() => ({
    type: 'checkbox',
    selectedRowKeys: _.filter(currentImages, _.matchesProperty('isSelected', true)).map(_.property('key')),
    onChange: selectedRowKeys => onSelectionChange(selectedRowKeys as string[]),
    getCheckboxProps: record => ({ disabled: record.isMain }),
    columnWidth: '45px',
  }), [onSelectionChange, currentImages]);

  const imageKeys = useMemo(() => currentImages.map(image => image[tableConfig.rowKey]), [currentImages]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={imageKeys}
        strategy={verticalListSortingStrategy}
      >
        <Table
          className={tableStyles}
          columns={columns}
          dataSource={currentImages}
          rowSelection={rowSelection}
          {...tableConfig}
        />
      </SortableContext>
    </DndContext>
  );
};

export default ImageList;
