import { sumBy as _sumBy, cloneDeep as _cloneDeep } from 'lodash';

const getAllExpandableRowKeys = ({ tableData }) => {
  const expandableRowKeys = [];
  tableData.forEach(row => {
    if (row.children) {
      expandableRowKeys.push(row.key);
      const childrenExpandableRowKeys = getAllExpandableRowKeys({ tableData: row.children });
      expandableRowKeys.push(...childrenExpandableRowKeys);
    }
  });

  return expandableRowKeys;
};

const getAllDataKeysFromTableData = ({ tableData }) => {
  const dataKeys = [];
  tableData.forEach(row => {
    dataKeys.push(row.dataKey);
    if (row.children) {
      const childrenDataKeys = getAllDataKeysFromTableData({ tableData: row.children });
      dataKeys.push(...childrenDataKeys);
    }
  });

  return dataKeys;
};

const clearZeroValueRowsFromTableData = ({ tableData = [] }) => {
  const tempTableData = _cloneDeep(tableData);
  return tempTableData.filter(row => {
    const valuesPerStartDate = Object.values(row?.formattedData?.valuesPerStartDate || {});
    const summedOrderCount = _sumBy(valuesPerStartDate, 'orderCount');

    if (summedOrderCount === 0) {
      return false;
    }

    if (row.children && row.children.length > 0) {
      const children = clearZeroValueRowsFromTableData({ tableData: row.children }) || [];
      Object.assign(row, { children });
    }

    return true;
  });
};

export const getFormattedTableData = ({ unformattedTableData }) => {
  const rows = [];
  const isTableDataPendingObj = {};
  unformattedTableData?.forEach(table => {
    if (
      !(table?.tableData?.length === 1 && table.tableData[0]?.recordConfig?.isSectionHeader) &&
      table.hasPermissionToViewData &&
      table.isVisible
    ) {
      rows.push(...((clearZeroValueRowsFromTableData({ tableData: table.tableData })) ?? []));
      const allRowKeys = getAllDataKeysFromTableData({ tableData: table.tableData });
      allRowKeys.forEach(rowKey => {
        isTableDataPendingObj[rowKey] = !!table.isTableDataPending;
      });
    }
  });

  const allExpandableRowKeys = getAllExpandableRowKeys({ tableData: rows, isReturnNonExpandableRowKeys: false });
  return { tableData: rows, isTableDataPendingObj, allExpandableRowKeys };
};

export const getRowClassName = ({ record, classes }) => {
  if (record.recordConfig?.isSectionHeader) {
    return classes.sectionHeaderRow;
  }
  let className = '';
  if (record.nestLevel > 0) {
    className += classes.expandedRow;
  }
  if (record.nestLevel % 2 === 1) {
    className += ` ${classes.oddNestLevel}`;
  }

  return className;
};
