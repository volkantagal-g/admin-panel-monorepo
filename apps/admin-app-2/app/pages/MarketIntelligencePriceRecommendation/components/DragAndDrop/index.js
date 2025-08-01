import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

import { DATA_DROP_CONVERTER } from '../../constants';

const DragAndDrop = ({ tableData, setTableData }) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);

  const columns = [
    {
      title: t('SORT'),
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      className: 'drag-visible',
      render: text => {
        return DATA_DROP_CONVERTER[text];
      },
    },
  ];

  const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
  ));

  const DraggableBodyRow = useCallback(({ className, style, ...restProps }) => {
    const index = tableData.findIndex(
      x => x.index === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  }, [tableData]);

  const DraggableContainer = useCallback(props => (
    <SortableContainer
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const newData = arrayMove(
            [].concat(tableData),
            oldIndex,
            newIndex,
          ).filter(el => !!el);
          setTableData(newData);
        }
      }}
      {...props}
    />
  ), [setTableData, tableData]);

  return (
    <Table
      pagination={false}
      dataSource={tableData}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};
export default DragAndDrop;
