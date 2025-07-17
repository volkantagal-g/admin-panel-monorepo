import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';

const initialUrl = '/fleet/tms/driver/list';

describe('In Fleet/TmsDriver/List Page:', () => {
  const setup = async node => {
    return renderComponent({
      ui: node,
      rtlOptions: {},
    });
  };

  const getNextPageButton = () => {
    const container = screen.getByTitle('Next Page');
    return within(container).getByRole('button');
  };

  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_TMS_DRIVER_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  it('handles pagination changes without any errors', async () => {
    await setup(<PageComponent />);

    const filterButton = screen.getByText(/BRING/i);
    fireEvent.click(filterButton);

    const pageInput = screen.getAllByRole('textbox')[1];
    expect(pageInput).toHaveValue('1');

    const nextPageButton = getNextPageButton();

    userEvent.click(nextPageButton);

    const paginationSelect = screen.getAllByRole('combobox')[3];
    userEvent.click(paginationSelect);

    const pageSizeOption = screen.getAllByRole('option')[1];
    userEvent.click(pageSizeOption);

    await waitFor(() => {
      expect(pageInput).toHaveValue('1');
    });
  });
});
