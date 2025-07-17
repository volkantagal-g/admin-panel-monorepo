import ExcelJS from 'exceljs';

// Function to convert JSON data to Excel
export function generateExcel(jsonData = [], fileName = 'example_pricing') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(fileName);

  // Add headers to the worksheet
  const headers = Object.keys(jsonData[0]);
  worksheet.addRow(headers);

  // Add data rows to the worksheet
  jsonData.forEach(row => {
    const rowValues = headers.map(header => row[header]);
    worksheet.addRow(rowValues);
  });

  // Create a Blob with the Excel data
  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a click event to start the download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${fileName}.xlsx`;
    downloadLink.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  });
}
