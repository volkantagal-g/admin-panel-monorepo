/* eslint-disable testing-library/no-node-access */

import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// main is the are we render each page content, it should have some innerHTML
export async function waitPageToRenderSomething() {
  await waitFor(() => {
    const mainLayout = screen.getByRole('main');
    expect(mainLayout?.innerHTML).toBeTruthy();
  });
}

export function expectSidebarMenuToHaveV2(menuGroupName, menuItemsArr) {
  const sidebar = screen.getByRole('complementary');
  const menuGroupHeader = within(sidebar).getByText(menuGroupName);
  expect(menuGroupHeader).toBeInTheDocument();

  const findWithin = (outerGroup, name) => {
    const found = within(outerGroup.parentNode.parentNode).queryByRole('menuitem', { name });
    if (found) return found;
    userEvent.click(outerGroup); // open menu group and try again
    return within(outerGroup.parentNode.parentNode).queryByRole('menuitem', { name });
  };

  let lastCheckedMenuItem = menuGroupHeader;
  menuItemsArr.forEach(menuItemText => {
    const menuItem = findWithin(lastCheckedMenuItem, menuItemText);
    expect(menuItem).toBeInTheDocument();
    lastCheckedMenuItem = menuItem;
  });
}

export function waitForToastElementToAppear() {
  return waitFor(() => {
    const alertBox = screen.getByRole('alert');
    expect(alertBox).toBeInTheDocument();
  });
}

export function expectToHavePageHeaderText(pageHeaderText) {
  // eslint-disable-next-line testing-library/no-node-access
  const pageHeaderContainer = document.querySelector('.ant-page-header');
  const pageHeaderTitle = within(pageHeaderContainer).getByText(pageHeaderText);
  expect(pageHeaderTitle).toBeInTheDocument();
}

// antd does non-standard select input, we need to do custom queries
export function expectItemToBeSelected(itemText, nearestContainer = document) {
  // eslint-disable-next-line testing-library/no-node-access
  const selecteds = nearestContainer.querySelectorAll('.ant-select-selection-item');
  const anyMatch = Array.from(selecteds).some(selected => within(selected).queryByText(itemText));
  expect(anyMatch).toBeTruthy();
}

export function waitForItemToBeSelected(itemText, nearestContainer) {
  return waitFor(() => {
    expectItemToBeSelected(itemText, nearestContainer);
  });
}

/**
 * @param {HTMLSelectElement} input - antd select input
 * @param {Number} [count=0] - number of selected items to expect. default is 0
 * @returns None
 */
export async function expectSelectedItemsLength(input, count = 0) {
  let selectList = document.getElementById(`${input.id}_list`);
  if (!selectList) {
    userEvent.click(input);
    selectList = await waitFor(() => document.getElementById(`${input.id}_list`).parentNode);
    userEvent.click(document.body);
  }

  await waitFor(() => {
    const selectListWrapper = selectList.parentNode;
    const selectedItemsByAriaSelected = selectListWrapper.querySelectorAll('div[aria-selected="true"]');
    expect(selectedItemsByAriaSelected).toHaveLength(count);
  });
}

export const expectTableToHaveColumnNames = (tableContainer, columnNames) => {
  const tableQuery = within(tableContainer);
  columnNames.forEach(columnName => {
    expect(tableQuery.getByText(columnName)).toBeInTheDocument();
  });
};

export const expectTableToHaveValues = (tableContainer, values) => {
  const table = within(tableContainer).getByRole('table');
  const tableCells = within(table).getAllByRole('cell');
  const cellValues = tableCells.map(cell => cell.textContent.trim()).filter(value => value !== '');
  expect(cellValues).toEqual(values.flat());
};

// antd does non-standard select input, we need to do custom queries
/**
 * @param {Element} input
 * @param {string} typedText - To be used to search an item in the select input and DOM
 * @param {RegExp} [search] - RegExp expression to find the element to select in the DOM. if not provided, the typeText is used instead
 * @returns None
 */
export async function expectSelectItemAndWaitForToBeSelected(input, typedText, search) {
  userEvent.click(input);
  userEvent.clear(input);
  userEvent.type(input, typedText);

  // To wait for the data fetching for the backend fed components. Returns true immediately if the component data feed from constantValues.
  let selectListWrapper;
  await waitFor(() => {
    // eslint-disable-next-line testing-library/no-node-access
    const selectList = document.getElementById(`${input.id}_list`);
    // eslint-disable-next-line testing-library/no-node-access
    selectListWrapper = selectList?.parentNode;
    expect(selectListWrapper).toBeInTheDocument();
  });

  const selectableItem = await within(selectListWrapper).findByTitle(search || typedText);

  // Some antd select items are not clickable in test env
  selectableItem.style.pointerEvents = 'auto';

  userEvent.click(selectableItem);
  // To prevent conflicts with selected items of other antd-select components
  // eslint-disable-next-line testing-library/no-node-access
  await waitForItemToBeSelected(search || typedText, input.closest('div[class="ant-select-selector"]'));
}

export async function expectRemoveSelectedItemAndWaitForToBeRemoved(input) {
  userEvent.hover(input);
  let removeComponent;
  await waitFor(() => {
    const selectorWrapper = input.closest('div[class="ant-select-selector"]');
    removeComponent = selectorWrapper.parentNode.querySelector('span[class="ant-select-clear"]');
    expect(removeComponent).toBeInTheDocument();
  });
  userEvent.click(removeComponent);

  const selectList = document.getElementById(`${input.id}_list`);
  const selectListWrapper = selectList.parentNode;
  await waitFor(() => {
    const selectedItemsByClassName = selectListWrapper.querySelectorAll('.ant-select-item-option-selected');
    const selectedItemsByAriaSelected = selectListWrapper.querySelectorAll('div[aria-selected="true"]');
    expect([...selectedItemsByClassName, ...selectedItemsByAriaSelected]).toHaveLength(0);
  });
}

/**
 * @param {Element} input
 * @param {string} dateText
 * @returns None
 */
export function expectSelectDate(input, dateText) {
  userEvent.click(input);
  userEvent.clear(input);
  userEvent.type(input, `${dateText}{enter}`);
  userEvent.click(document.body);

  expect(input).toHaveValue(dateText);
}

/**
 * Asserts DateRangePicker values.
 * @param {*} label - Label of the Range picker
 * @param {*} start - Starting date selected by the user
 * @param {*} end - Ending date selected by the user
 */
export function expectDateRange(label, start, end) {
  const rangePicker = screen.getByText(label);
  expect(rangePicker).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  const [first, second] = rangePicker.parentElement.nextSibling.querySelectorAll('input');

  userEvent.click(first);
  userEvent.clear(first);
  userEvent.type(first, `${start}{enter}`);

  userEvent.click(second);
  userEvent.clear(second);
  userEvent.type(second, `${end}{enter}`);

  userEvent.click(document.body);

  expect(first).toHaveValue(start);
  expect(second).toHaveValue(end);
}

export function expectAntTableHeaderHaveSorter(headerElement, { headerText, defaultSortDirection }) {
  // eslint-disable-next-line testing-library/no-node-access
  const headerRows = headerElement.querySelectorAll('.ant-table-thead > tr');
  const columnHeader = within(headerRows[0]).getByText(headerText);
  // eslint-disable-next-line testing-library/no-node-access
  let columnHeaderParentNode = columnHeader.parentNode;
  if (columnHeaderParentNode.classList.contains('ant-table-column-title')) {
    columnHeaderParentNode = columnHeaderParentNode.parentNode;
  }
  expect(columnHeaderParentNode).toHaveClass('ant-table-column-sorters');

  if (defaultSortDirection) {
    // eslint-disable-next-line testing-library/no-node-access
    const sorterContainer = columnHeaderParentNode.querySelector(`.ant-table-column-sorter-${defaultSortDirection}.active`);
    expect(sorterContainer).toBeInTheDocument();
  }
}

export function getAntTableRowByRowKey(tableContainer, { key }) {
  // eslint-disable-next-line testing-library/no-node-access
  return tableContainer.querySelector(`tr[data-row-key="${key}"]`);
}

// antd table component can add 2 <table>s, one for columns one for data, if you want data tables, use this
export function getAntTableBodies(wrapperElem = document) {
  return Array.from(wrapperElem.querySelectorAll('.ant-table-body > table'));
}

export function getAntTableHeaderTables(wrapperElem = document) {
  return Array.from(wrapperElem.querySelectorAll('.ant-table-header > table'));
}

export function getAntTableExtendedPaginationComponents(tableElem = document) {
  const tableFooterContainer = tableElem.querySelector('.ant-table-footer');
  const limitContainer = tableFooterContainer.querySelector('div[class^="limitContainer"]');
  const limitInput = within(limitContainer).getByRole('combobox');

  const paginationContainer = tableFooterContainer.querySelector('.ant-pagination');
  const nextButtonListItem = within(paginationContainer).getByRole('listitem', { name: /next page/i });
  const nextButton = within(nextButtonListItem).getByRole('button');
  const prevButtonListItem = within(paginationContainer).getByRole('listitem', { name: /previous page/i });
  const prevButton = within(prevButtonListItem).getByRole('button');

  const pagerListItem = paginationContainer.querySelector('.ant-pagination-simple-pager');
  const pagerInput = pagerListItem.children[0];
  const maxPage = pagerListItem.textContent.replaceAll(pagerListItem.children[1].textContent, '');

  return {
    limitContainer,
    limitInput,
    nextButton,
    prevButton,
    pagerInput,
    maxPage,
  };
}

export async function waitForAntTableBodies(wrapperElem = document) {
  let tables = [];
  await waitFor(() => {
    tables = getAntTableBodies(wrapperElem);
    expect(tables.length).toBeGreaterThan(0);
  });
  return tables;
}

export async function waitForAntTableHeaderTables(wrapperElem = document) {
  let tables = [];
  await waitFor(() => {
    tables = getAntTableHeaderTables(wrapperElem);
    expect(tables.length).toBeGreaterThan(0);
  });
  return tables;
}
