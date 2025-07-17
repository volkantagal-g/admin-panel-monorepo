export const getFormattedTableData = ({ unformattedTableData }) => {
  const rows = [];
  const isTableDataPendingObj = {};
  unformattedTableData?.forEach(table => {
    if (
      !(table?.tableData?.length === 1 && table.tableData[0]?.recordConfig?.isSectionHeader) &&
      table.hasPermissionToViewData &&
      table.isVisible
    ) {
      rows.push(...(table.tableData ?? {}));
      Object.assign(isTableDataPendingObj, table.isTableDataPendingObj);
    }
  });

  return { tableData: rows, isTableDataPendingObj };
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
