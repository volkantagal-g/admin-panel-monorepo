import '@test/publicUtils/configureWithoutCleanup';
import { within } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedAuto = {
  ALIAS: 'Alias',
  KEY: 'Key',
  TYPE: 'Type',
  PARENT_ALIAS: 'Parent Alias',
};

const url = '/algorithm/config/list';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Algorithm Config List Page', () => {
  it('should render algorithm config list page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_ALGORITHM_CONFIG_LIST,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render table columns header', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedAuto.ALIAS)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.KEY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.TYPE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.PARENT_ALIAS)).toBeTruthy();
  });
});
