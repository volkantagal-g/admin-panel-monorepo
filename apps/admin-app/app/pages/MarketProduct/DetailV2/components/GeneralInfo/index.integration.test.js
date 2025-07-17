import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedBundleProduct, mockedPieceTypeProduct, mockedWeightTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import { getWeightTypeProductMock } from '@shared/api/marketProduct/index.mock.handler';
import WeightInfo from '@app/pages/MarketProduct/DetailV2/components/GeneralInfo/components/WeightInfo';

describe('Market Product/Detail/General Info', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <GeneralInfo /> });
  });

  it('should render card titles correctly for bundle product', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
    await renderComponent({ ui: <GeneralInfo /> });
    expect(screen.getByText('Market Info')).toBeInTheDocument();
    expect(screen.getByText('Position Info')).toBeInTheDocument();
    expect(screen.getByText('Domain Based Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Bundle Info')).toBeInTheDocument();
    expect(screen.getByText('Product Settings')).toBeInTheDocument();
    expect(screen.getByText('Marketing Settings')).toBeInTheDocument();
    expect(screen.getByText('Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Age Restriction')).toBeInTheDocument();
  });

  it('should render card titles correctly for piece type product', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <GeneralInfo /> });
    expect(screen.getByText('Market Info')).toBeInTheDocument();
    expect(screen.getByText('Position Info')).toBeInTheDocument();
    expect(screen.getByText('Domain Based Sale Restriction')).toBeInTheDocument();
    expect(screen.queryByText('Bundle Info')).not.toBeInTheDocument();
    expect(screen.getByText('Product Settings')).toBeInTheDocument();
    expect(screen.getByText('Marketing Settings')).toBeInTheDocument();
    expect(screen.getByText('Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Age Restriction')).toBeInTheDocument();
  });

  it('should render card titles correctly for weight type product', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedWeightTypeProduct.marketProduct);
    await renderComponent({ ui: <GeneralInfo /> });
    expect(screen.getByText('Market Info')).toBeInTheDocument();
    expect(screen.getByText('Position Info')).toBeInTheDocument();
    expect(screen.getByText('Domain Based Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Weight Info')).toBeInTheDocument();
    expect(screen.queryByText('Bundle Info')).not.toBeInTheDocument();
    expect(screen.getByText('Product Settings')).toBeInTheDocument();
    expect(screen.getByText('Marketing Settings')).toBeInTheDocument();
    expect(screen.getByText('Sale Restriction')).toBeInTheDocument();
    expect(screen.getByText('Age Restriction')).toBeInTheDocument();
  });

  it('should edit weight info correctly', async () => {
    mockApiPerTestCase(getWeightTypeProductMock);
    await renderComponent({ ui: <WeightInfo /> });
    const editBtn = await screen.findByTestId('edit-button');
    userEvent.click(editBtn);
    const [startingWeightSelect] = await screen.findAllByRole('combobox');
    userEvent.click(startingWeightSelect);
    const startingWeightOptions = await screen.findAllByRole('option');
    userEvent.click(startingWeightOptions[0]);
    const saveBtn = await screen.findByRole('button', { name: /save/i });
    userEvent.click(saveBtn);
  });

  it('should cancel weight info correctly', async () => {
    mockApiPerTestCase(getWeightTypeProductMock);
    await renderComponent({ ui: <WeightInfo /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
