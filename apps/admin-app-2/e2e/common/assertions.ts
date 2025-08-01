import { type Page, type Locator, expect } from '@playwright/test';

import { getSelectListDropdownWrapper } from './locators';

export interface IExpectSidebarMenuToHave {
  instance: Page,
  menuGroupName: string,
  menuItemsArr: string[],
  menuGroupExact?: boolean,
}
export async function expectSidebarMenuToHave({
  instance,
  menuGroupName,
  menuGroupExact = true,
  menuItemsArr,
}: IExpectSidebarMenuToHave): Promise<void> {
  const sidebar: Locator = instance.getByRole('complementary');
  const menuGroupHeader: Locator = sidebar.getByText(menuGroupName, { exact: menuGroupExact });
  await expect(menuGroupHeader).toBeAttached();

  const findWithin = async (outerGroup: Locator, name: string): Promise<Locator> => {
    const menuGroupParent: Locator = outerGroup.locator('xpath=../..').first();
    let foundDeepMenuItem: Locator = menuGroupParent.getByRole('menuitem', { name, exact: true });

    if (await foundDeepMenuItem?.isVisible()) {
      return foundDeepMenuItem;
    }

    if (await outerGroup.textContent() !== menuGroupName) {
      await outerGroup.click(); // open menu group and try again
    }

    foundDeepMenuItem = menuGroupParent.getByRole('menuitem', { name, exact: true });

    await foundDeepMenuItem.waitFor({ state: 'visible' });
    return foundDeepMenuItem;
  };

  let lastCheckedMenuItem = menuGroupHeader;
  for (const menuItemText of menuItemsArr) {
    const menuItem = await findWithin(lastCheckedMenuItem, menuItemText);
    await expect(menuItem).toBeAttached();
    lastCheckedMenuItem = menuItem;
  }
}

export interface IExpectItemToBeSelected {
  selectElem: Locator,
  text: string | RegExp,
}
export async function expectSelectItemToBeSelected({
  selectElem,
  text,
}: IExpectItemToBeSelected): Promise<void> {
  const selectWrapper = selectElem.locator('xpath=//ancestor::div[contains(@class, \'ant-select-selector\')]');
  const selectedItems = await selectWrapper.locator('.ant-select-selection-item').all();
  let anyMach: boolean = false;
  for (const selectedItem of selectedItems) {
    const textContent: string | null = await selectedItem.textContent();
    if (typeof text === 'string') {
      anyMach = text === textContent;
    }
    else {
      anyMach = text.test(textContent || '');
    }
    if (anyMach) {
      break;
    }
  }
  expect(anyMach).toBeTruthy();
}

interface IExpectSelectItemAndWaitForToBeSelected {
  pageInstance: Page,
  selectElem: Locator,
  typedText?: string,
  isTypedTextExact?: boolean,
  search?: string | RegExp,
}

interface IExpectSyncSelectItemHasCorrectOptions {
  pageInstance: Page,
  selectElem: Locator,
  expectedOptions: string[],
  isPagination?: boolean;
}

export async function expectSelectItemAndWaitForToBeSelected({
  pageInstance,
  selectElem,
  typedText,
  search,
  isTypedTextExact = false,
}: IExpectSelectItemAndWaitForToBeSelected): Promise<void> {
  // wait for the select component to be in viewport (or ensure it is rendered in the DOM)
  if (!(await selectElem.isVisible())) {
    await expect(selectElem).toBeVisible();
  }

  // to ensure the select component is not disabled/readonly
  if (await selectElem.isDisabled()) {
    await expect(selectElem).toBeEnabled();
  }

  // click the select component to open the selectable list
  const clickableElem = selectElem.locator('xpath=..');

  // Some antd select items are not clickable in test env
  await clickableElem.evaluate((el: HTMLElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.pointerEvents = 'auto';
  });

  await clickableElem.locator('xpath=..').click();

  if (typedText) {
    // ensure the select list search input is empty
    await selectElem.clear();
    // fill the search input with the given text
    await selectElem.fill(typedText);
  }

  // find the select component id
  const selectBoxId: string = await selectElem.evaluate((el: HTMLElement) => el.id);
  // find virtual select list wrapper. Antd select list is rendered in a virtual list out of the select box
  const selectListWrapper = pageInstance.locator(`#${selectBoxId}_list`).locator('xpath=..').locator('.rc-virtual-list');

  // wait for the select list to appear in DOM, sometimes it takes time to render
  expect(selectListWrapper).toBeAttached({ timeout: 10_000 });

  if (!search && !typedText) {
    throw new Error('You must provide either search or typedText');
  }
  const text = (search || typedText) as string | RegExp;
  // find the selectable item
  const selectableItem = selectListWrapper.getByText(text, { exact: isTypedTextExact });
  // Some antd select items are not clickable in test env
  await selectableItem.evaluate((el: HTMLElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.pointerEvents = 'auto';
  });
  // click the select item
  await selectableItem.click();

  // to close the select list
  await pageInstance.keyboard.press('Escape');

  await expectSelectItemToBeSelected({
    selectElem,
    text,
  });
}

export async function expectSyncSelectItemHasCorrectOptions({
  pageInstance,
  selectElem,
  expectedOptions,
  isPagination,
}: IExpectSyncSelectItemHasCorrectOptions) {
  if (!(await selectElem.isVisible())) {
    await expect(selectElem).toBeVisible();
  }

  // to ensure the select component is not disabled/readonly
  if (await selectElem.isDisabled()) {
    await expect(selectElem).toBeEnabled();
  }

  // click the select component to open the selectable list
  const clickableElem = selectElem.locator('xpath=..');

  // Some antd select items are not clickable in test env
  await clickableElem.evaluate((el: HTMLElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.pointerEvents = 'auto';
  });

  await clickableElem.locator('xpath=..').click();

  const selectBoxId: string = await selectElem.evaluate((el: HTMLElement) => el.id);

  // find virtual select list wrapper. Antd select list is rendered in a virtual list out of the select box
  const listId = isPagination ? '#antTableV2PaginationLimitInput_list' : `#${selectBoxId}_list`;
  const selectListWrapper = pageInstance.locator(listId).locator('xpath=..').locator('.rc-virtual-list');

  // extract all option labels line below
  const allOptions = await selectListWrapper.locator('.ant-select-item-option-content').all();
  const allOptionsTexts = await Promise.all(allOptions.map(async option => option.textContent()));

  await clickableElem.locator('xpath=..').click();
  expect(expectedOptions).toHaveLength(allOptions.length);
  expect(expectedOptions).toEqual(expect.arrayContaining(allOptionsTexts));
}

export async function waitForAsyncSelectListToLoad({
  inputElem,
  pageInstance,
  text,
  exactMatch = false,
}:
{
  inputElem: Locator,
  pageInstance: Page,
  text: string | RegExp,
  exactMatch?: boolean,
}): Promise<void> {
  const antSelectSelector = inputElem.locator('xpath=//ancestor::div[contains(@class, \'ant-select-selector\')]');
  await antSelectSelector.click();

  const selectListWrapper = await getSelectListDropdownWrapper({
    pageInstance,
    inputElem,
  });

  await expect(selectListWrapper.getByText(text, { exact: exactMatch })).toBeVisible({ timeout: 10000 });
  // to close the select list
  await pageInstance.keyboard.press('Escape');
}

export async function waitForSelectToBeCleared({ inputElem }: {
  inputElem: Locator,
}): Promise<void> {
  const parent = inputElem.locator('xpath=ancestor::div[contains(@class, "ant-select")]');

  await expect(async () => {
    const allSelectedItems = await parent.locator('.ant-select-selection-item').all();
    expect(allSelectedItems.length).toBe(0);
  }).toPass({ timeout: 5000 });
}

export async function getInputByPlaceholder({
  containerInstance,
  placeholder,
}: {
  containerInstance: Locator,
  placeholder: string,
}): Promise<void> {
  const input = containerInstance.locator(
    `//span[contains(@class, 'ant-select-selection-placeholder') and text()='${placeholder}']
    /ancestor::div[contains(@class, 'ant-select-selector')]/descendant::input`,
  );
  await expect(input).toBeVisible();
}

export async function expectTableHeaderToBeSorted({
  header,
  title,
  sortDirection,
}: {
  header: Locator,
  title: string,
  sortDirection: 'ascending' | 'descending' | 'none',
}): Promise<void> {
  const tableCell = header.getByRole('cell', { name: title });
  if (sortDirection === 'ascending') {
    await expect(tableCell.locator('.ant-table-column-sorter-up'))
      .toHaveClass('anticon anticon-caret-up ant-table-column-sorter-up active');
  }
  else if (sortDirection === 'descending') {
    await expect(tableCell.locator('.ant-table-column-sorter-down'))
      .toHaveClass('anticon anticon-caret-down ant-table-column-sorter-down active');
  }
  else {
    // If there is no sorting, it should not have any of the above classes, and we need to check if it has the sort class
    await expect(tableCell).toHaveClass('ant-table-cell ant-table-column-has-sorters');
  }
}

export async function expectTableCellNotToHaveSorter({
  table,
  title,
}: {
  table: Locator,
  title: string,
}): Promise<void> {
  const tableCell = table.getByRole('cell', { name: title });
  await expect(tableCell).not.toHaveClass('ant-table-column-sorter-full');
}

export async function expectTableSortersCountToBe({
  table,
  sortCount,
}: {
  table: Locator,
  sortCount: number,
}): Promise<void> {
  await table.locator('.ant-table-column-sorter-full').count().then(count => {
    expect(count).toBe(sortCount);
  });
}

interface IExpectDownloadedFileToBe {
  expectedFileName: string,
  expectedFileFormat?: string
  pageInstance: Page
  downloadButton: Locator
}
export async function expectDownloadedFileToBe({ expectedFileName, expectedFileFormat, pageInstance, downloadButton }: IExpectDownloadedFileToBe) {
  const [download] = await Promise.all([
    pageInstance.waitForEvent('download', { timeout: 60000 }),
    downloadButton.click(),
  ]);

  const filePath = await download.path();
  const downloadedFileName = download.suggestedFilename();
  const fileType = downloadedFileName?.split('.')?.pop();

  expect(downloadedFileName).toBe(expectedFileName);

  if (expectedFileFormat) {
    expect(fileType).toBe(expectedFileFormat);
  }
}
