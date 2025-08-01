import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from 'react-dom/test-utils';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';

import PageComponent from '.';
import permKey from '@shared/shared/permKey.json';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import {
  getMarketAlgorithmProductGroupMock, getMarketManuelProductGroupMock, getMarketProductsMock, getProductsOfProductGroupMock,
  updateMarketProductGroupAlreadyExistsMock, updateMarketProductGroupMock,
} from '@shared/api/marketProductGroup/index.mock.handler';

describe('Market Product Group Detail Page', () => {
  afterAll(jest.restoreAllMocks);

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render without error', async () => {
    mockApiPerTestCase(getMarketManuelProductGroupMock);
    mockApiPerTestCase(getProductsOfProductGroupMock);
    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_PRODUCT_GROUP_DETAIL,
      pageUrl: '/marketProduct/group/detail/64b95d937188203e61d6f2c8',
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  describe('Products of Product Group Table', () => {
    const setupTest = async () => {
      mockApiPerTestCase(getMarketManuelProductGroupMock);
      mockApiPerTestCase(getProductsOfProductGroupMock);
      mockApiPerTestCase(updateMarketProductGroupMock);
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_GROUP_DETAIL,
        pageUrl: '/marketProduct/group/detail/64b95d937188203e61d6f2c8',
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    };
    it('should edit table without error', async () => {
      await setupTest();
      const [, editTableButton] = await screen.findAllByRole('button', { name: /edit/i });
      userEvent.click(editTableButton);
      await waitFor(() => {
        expect(screen.getByText('Select All')).toBeInTheDocument();
      });
      expect(screen.getByText('Delete Selected Rows 0')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      const selectAllButton = await screen.findByRole('button', { name: /select all/i });
      const deleteSelectedRowsButton = await screen.findByRole('button', { name: /delete selected rows/i });
      userEvent.click(selectAllButton);
      userEvent.click(deleteSelectedRowsButton);
      const confirmModal = await screen.findByRole('document');
      const saveDeleteRowsButton = await within(confirmModal).findByRole('button', { name: /save/i });
      userEvent.click(deleteSelectedRowsButton);
      userEvent.click(saveDeleteRowsButton);
      const [, saveButton] = await screen.findAllByRole('button', { name: /save/i });
      userEvent.click(saveButton);
    });

    it('should cancel table without error', async () => {
      await setupTest();
      const [, editTableButton] = await screen.findAllByRole('button', { name: /edit/i });
      userEvent.click(editTableButton);
      const cancelButton = await screen.findByRole('button', { name: /cancel/i });
      userEvent.click(cancelButton);
    });

    it('should cancel modal without error', async () => {
      await setupTest();
      const [, editTableButton] = await screen.findAllByRole('button', { name: /edit/i });
      userEvent.click(editTableButton);
      await waitFor(() => {
        expect(screen.getByText('Select All')).toBeInTheDocument();
      });
      expect(screen.getByText('Delete Selected Rows 0')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      const selectAllButton = await screen.findByRole('button', { name: /select all/i });
      const deleteSelectedRowsButton = await screen.findByRole('button', { name: /delete selected rows/i });
      userEvent.click(selectAllButton);
      userEvent.click(deleteSelectedRowsButton);
      const confirmModal = await screen.findByRole('document');
      const cancelDeleteRowsButton = await within(confirmModal).findByRole('button', { name: /cancel/i });
      userEvent.click(cancelDeleteRowsButton);
    });

    it('should add new product without error', async () => {
      mockApiPerTestCase(getMarketProductsMock);
      await setupTest();
      const addNewProductsButton = await screen.findByRole('button', { name: /add new products/i });
      userEvent.click(addNewProductsButton);
      const addNewProductsModal = await screen.findByRole('document');
      const [, productsSelect] = await within(addNewProductsModal).findAllByRole('combobox');
      userEvent.click(productsSelect);
      const addButton = await within(addNewProductsModal).findByRole('button', { name: /add/i });
      userEvent.click(addButton);
    });

    it('should cancel add new product modal without error', async () => {
      mockApiPerTestCase(getMarketProductsMock);
      await setupTest();
      const addNewProductsButton = await screen.findByRole('button', { name: /add new products/i });
      userEvent.click(addNewProductsButton);
      const addNewProductsModal = await screen.findByRole('document');
      const cancelButton = await within(addNewProductsModal).findByRole('button', { name: /cancel/i });
      userEvent.click(cancelButton);
    });
  });

  it('should show a second toast error box for showing product group id for ProductGroupingExistsWithSameProperties error from BE', async () => {
    mockApiPerTestCase(getMarketAlgorithmProductGroupMock);
    mockApiPerTestCase(updateMarketProductGroupAlreadyExistsMock);

    await renderPage({
      pagePermKey: permKey.PAGE_MARKET_PRODUCT_GROUP_DETAIL,
      pageUrl: '/marketProduct/group/detail/6613adc7aeef8e8f6df8079b',
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();

    const activationToggleButton = screen.getByText(/inactive/i);

    jest.useFakeTimers();
    userEvent.click(activationToggleButton);

    await screen.findByRole('heading', { name: /existing product group/i });
    await screen.findByRole('link', { name: /click to open: 660552a1ee4a477ae9150db7 link/i });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    jest.useRealTimers();
  });
});
