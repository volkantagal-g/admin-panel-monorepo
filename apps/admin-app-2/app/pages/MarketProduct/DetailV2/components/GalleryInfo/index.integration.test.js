import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import { updateMarketProductDisplayTypeMock } from '@shared/api/marketProduct/index.mock.handler';

describe('Market Product/Detail/Gallery Info', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <GeneralInfo /> });
  });

  it('should render card titles correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <GeneralInfo /> });
    expect(screen.getByText('Display Settings')).toBeInTheDocument();
    expect(screen.getByText('Display Type Info')).toBeInTheDocument();
  });

  it('should change display type info correctly', async () => {
    mockApiPerTestCase(updateMarketProductDisplayTypeMock);
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <GeneralInfo /> });
    const editBtn = await screen.findByText(/edit/i);
    userEvent.click(editBtn);
    const displayTypeSelect = screen.getByRole('combobox');
    expect(displayTypeSelect).toBeInTheDocument();
    userEvent.click(displayTypeSelect);
    const wideOption = await screen.findByText('Wide');
    await userEvent.click(wideOption);
    const selectedValue = screen.getByText('Wide', { selector: '.ant-select-selection-item' });
    expect(selectedValue).toBeInTheDocument();
    const saveBtn = await screen.findByText(/save/i);
    userEvent.click(saveBtn);
  });
});
