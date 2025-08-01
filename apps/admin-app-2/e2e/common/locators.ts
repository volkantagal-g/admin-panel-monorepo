import { Locator, Page } from '@playwright/test';

export async function getSelectListDropdownWrapper({
  pageInstance,
  inputElem,
}: {
  pageInstance: Page,
  inputElem: Locator,
}): Promise<Locator> {
  // find the select component id
  const selectBoxId: string = await inputElem.evaluate((el: HTMLElement) => el.id);
  // find virtual select list wrapper. Antd select list is rendered in a virtual list out of the select box
  const selectListWrapper = pageInstance.locator(`#${selectBoxId}_list`).locator('xpath=..').locator('.rc-virtual-list');
  return selectListWrapper;
}

export function getClearButtonOfSelect({ inputElem }: {
  inputElem: Locator,
}) {
  // find the closes parent which has 'ant-select' class
  const selectBox = inputElem.locator('xpath=ancestor::div[contains(@class, "ant-select")]');
  // inside the wrapper, clear button has 'ant-select-clear' class
  const clearButton = selectBox.locator('.ant-select-clear');
  return clearButton;
}

/** ******************************* ANT TABLE ************************************** */
// NOTE: antd table creates 2 tables, one for header and one for body, so we need to get the header table to get the columns
// last th is the scroll bar, so we need to ignore it, it has ant-table-cell-scrollbar class
export async function getTableHeaderColumns({ containerElement }: {
  containerElement: Locator,
}) {
  const columns = await containerElement.locator('.ant-table-container .ant-table-header thead tr th:not(.ant-table-cell-scrollbar)').all();
  return columns;
}

export async function getTableHeaderColumnTitles({ containerElement }: {
  containerElement: Locator,
}) {
  const columns = await getTableHeaderColumns({ containerElement });
  const columnTitles = await Promise.all(columns.map(async column => {
    // replace nbps with space
    const textContent = (await column.textContent() || '').replace(/\u00a0/g, ' ');
    return textContent;
  }));

  return columnTitles;
}

export async function getTableDataRows({ containerElement }: {
  containerElement: Locator,
}): Promise<Locator[]> {
  // .ant-table-row so that non-data rows are not included, like empty case, or measurement related rows
  const rows = await containerElement.locator('.ant-table-container .ant-table-tbody tr.ant-table-row').all();
  return rows;
}

export async function getTableDataRowItems({
  containerElement,
  rowIndex,
}: {
  containerElement: Locator,
  rowIndex: number,
}): Promise<string[]> {
  const rows = await getTableDataRows({ containerElement });

  if (rowIndex >= rows.length) {
    return [];
  }
  const cols = await rows[rowIndex].locator('td').all();
  const rowItems = await Promise.all(cols.map(async col => {
    const textContent = ((await col.textContent()) || '').replace(/\u00a0/g, ' '); // replace nbps with space
    return textContent;
  }));
  return rowItems;
}

/** ******************************* ANT TABLE ************************************** */
