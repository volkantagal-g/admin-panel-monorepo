import { ACTION_COLORS, CHANGE_TYPE_NAME, COLUMN_TYPES, SPECIFIC_AFFECTED, STATUS } from '@app/pages/MarketAutoGrowthOperations/constants';

const DifferenceTableColumns = (t, list, justUpdate) => {
  const columns = [];
  list.forEach(column => columns.push({
    title: t(column.title),
    dataIndex: column.key,
    key: column.key,
    width: 20,
    render: (text, record) => {
      const activeColumn = text === false ? STATUS.PASSIVE : STATUS.ACTIVE;
      let currentText = text;

      if (text && Array.isArray(text) && column.key === COLUMN_TYPES.PROMO_TYPE) currentText = text?.join('-');
      if (column.key === STATUS.ACTIVE) currentText = activeColumn;

      if (justUpdate) {
        return {
          props: { style: { color: record?.affected?.includes(column?.key) && ACTION_COLORS.update } },
          children: <div>{currentText || text}</div>,
        };
      }
      if (!justUpdate && (record?.changeType === CHANGE_TYPE_NAME.DELETE || record?.changeType === CHANGE_TYPE_NAME.ADD ||
      (record?.changeType === CHANGE_TYPE_NAME.UPDATE && record?.affected?.includes(column?.key)) ||
          record?.affected?.includes(SPECIFIC_AFFECTED.ALL) || column.key === COLUMN_TYPES.CHANGE_TYPE)) {
        return {
          props: { style: { color: ACTION_COLORS[record?.changeType] } },
          children: <div>{currentText || text}</div>,
        };
      }
      return { children: <div>{currentText}</div> };
    },
  }));
  return columns;
};
export default DifferenceTableColumns;
