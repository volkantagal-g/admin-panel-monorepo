import '@test/publicUtils/configureWithoutCleanup';
import { within } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedAuto = {
  ALIAS: 'Alias',
  ID: 'ID',
  TYPE: 'Type',
};

const url = '/algorithm/config/domain/food/list';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Algorithm Food Domain Config List Page', () => {
  it('should render algorithm food domain config list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ALGORITHM_FOOD_DOMAIN_CONFIG_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render table columns header', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedAuto.ALIAS)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.ID)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.TYPE)).toBeTruthy();
  });
});
