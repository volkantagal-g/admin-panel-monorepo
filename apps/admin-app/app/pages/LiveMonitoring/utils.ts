type Props<T> = {
  filteredTableData: T[];
  tableColumns: {
    title: string | (() => string);
    titleCSV?: string | (() => string);
    dataIndex: string;
    render: (value: any, row: any) => any;
    renderCSV?: (value: any) => any;
  }[];
};

export function createCSVDataFromTableData<T extends Record<string, any>>({ filteredTableData, tableColumns } : Props<T>) {
  const formatted = (filteredTableData || []).map(row => {
    const formattedRow = {} as Record<string, T>;
    tableColumns.forEach(column => {
      const titleRenderer = column.titleCSV || column.title;
      const title = typeof titleRenderer === 'function' ? titleRenderer() : titleRenderer;
      const renderer = column.renderCSV || column.render;
      const renderedData = typeof renderer === 'function' ? renderer(row[column.dataIndex], row) : row[column.dataIndex];
      formattedRow[title] = renderedData;
    });
    return formattedRow;
  });
  return formatted;
}
