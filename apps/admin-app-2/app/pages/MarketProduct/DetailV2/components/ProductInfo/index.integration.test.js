import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { getMarketProductByIdSelector, getMarketProductTagsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct, mockedWeightTypeProduct } from '@shared/api/marketProduct/index.mock.data';

import ProductInfo from './index';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getMarketProductTagsMock } from '@shared/api/marketProductTag/index.mock.handler';
import { updateMarketProductTagMock } from '@shared/api/marketProduct/index.mock.handler';
import { mockedProductTags } from '@shared/api/marketProductTag/index.mock.data';
import BarcodesInfo from '@app/pages/MarketProduct/DetailV2/components/ProductInfo/components/BarcodesInfo';

describe('Market Product/Detail/Product Info', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <ProductInfo /> });
  });

  it('should render card titles correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <ProductInfo /> });
    const productTypeElements = screen.getAllByText('Product Type');
    const productTypeElement = productTypeElements.find(element => element.tagName.toLowerCase() === 'p');
    expect(productTypeElement).toBeInTheDocument();
    expect(screen.getByText('Product Names')).toBeInTheDocument();
    expect(screen.getByText('Details Info')).toBeInTheDocument();
    expect(screen.getByText('Ingredients Info')).toBeInTheDocument();
    expect(screen.getByText('Usage Info')).toBeInTheDocument();
    const additionalInfoElements = screen.getAllByText('Additional Info');
    const additionalInfoElement = additionalInfoElements.find(element => element.tagName.toLowerCase() === 'p');
    expect(additionalInfoElement).toBeInTheDocument();
    expect(screen.getByText('Additional Property Tables Info')).toBeInTheDocument();
  });

  it('should not allow edit on product sub type', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedWeightTypeProduct.marketProduct);
    await renderComponent({ ui: <ProductInfo /> });

    const productSubTypeInput = screen.getByRole('combobox', { name: /product sub type/i });
    const [productSubTypeEditButton] = screen.queryAllByTestId('edit-button');
    expect(productSubTypeInput).toBeDisabled();
    userEvent.click(productSubTypeEditButton);
    expect(productSubTypeInput).toBeDisabled();
  });

  it('should allow edit on product sub type if the field does not have a value', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedWeightTypeProduct.marketProduct,
      subType: undefined,
    });

    await renderComponent({ ui: <ProductInfo /> });

    const productSubTypeInput = screen.getByRole('combobox', { name: /product sub type/i });
    const [productSubTypeEditButton] = screen.queryAllByTestId('edit-button');
    expect(productSubTypeInput).toBeDisabled();
    userEvent.click(productSubTypeEditButton);
    expect(productSubTypeInput).toBeEnabled();
  });

  it('should edit description tags correctly', async () => {
    mockApiPerTestCase(getMarketProductTagsMock);
    mockApiPerTestCase(updateMarketProductTagMock);
    const marketProductTagsSpy = jest.spyOn(getMarketProductTagsSelector, 'getData');
    marketProductTagsSpy.mockReturnValue(mockedProductTags);
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedWeightTypeProduct.marketProduct,
      subType: undefined,
    });
    await renderComponent({ ui: <ProductInfo /> });

    const editTagsBtn = screen.getAllByRole('button', { name: /edit/i })[2];
    await userEvent.click(editTagsBtn);
    const addBtn = screen.getByText('Add');
    await userEvent.click(addBtn);
    expect(screen.getAllByText('Description Tags')[1]).toBeInTheDocument();
    const checkbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(checkbox);
    const okBtn = screen.getByRole('button', { name: /ok/i });
    await userEvent.click(okBtn);
    const saveBtn = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveBtn);
  });

  it('should edit Additional Property Tables Info correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedWeightTypeProduct.marketProduct,
      subType: undefined,
    });
    await renderComponent({ ui: <ProductInfo /> });

    const newTableBtn = screen.getByRole('button', { name: /new table/i });
    await userEvent.click(newTableBtn);
    expect(screen.getByText('Add Row')).toBeInTheDocument();
    const modal = screen.getByRole('document');
    const [trInput, enInput] = within(modal).getAllByRole('textbox');
    const addSubTitleBtn = within(modal).getByText(/add subtitle/i);
    await userEvent.type(trInput, 'example');
    await userEvent.type(enInput, 'example');
    await userEvent.click(addSubTitleBtn);
    const addSubTitleModal = screen.getAllByRole('document')[1];
    expect(within(addSubTitleModal).getByText('Add Subtitle')).toBeInTheDocument();
    const [trSubInput, enSubInput] = within(addSubTitleModal).getAllByRole('textbox');
    const okBtn = within(addSubTitleModal).getByRole('button', { name: /ok/i });
    const cancelBtn = within(addSubTitleModal).getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    await userEvent.click(addSubTitleBtn);
    await userEvent.type(trSubInput, 'exampleSub');
    await userEvent.type(enSubInput, 'exampleSub');
    await userEvent.click(okBtn);
  });

  it('should cancel Additional Property Tables Info correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedWeightTypeProduct.marketProduct,
      subType: undefined,
    });
    await renderComponent({ ui: <ProductInfo /> });

    const newTableBtn = screen.getByRole('button', { name: /new table/i });
    await userEvent.click(newTableBtn);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
  });

  it('should render Barcodes correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue({
      ...mockedWeightTypeProduct.marketProduct,
      subType: undefined,
    });
    await renderComponent({ ui: <ProductInfo /> });
    await renderComponent({ ui: <BarcodesInfo /> });
  });
});
