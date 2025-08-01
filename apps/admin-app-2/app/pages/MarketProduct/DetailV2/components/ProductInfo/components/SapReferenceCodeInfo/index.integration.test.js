import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { act, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { updateSAPProductMock } from '@shared/api/marketProduct/index.mock.handler';
import { mockedPieceTypeProduct, mockedBundleProduct } from '@shared/api/marketProduct/index.mock.data';

import * as CountrySelection from '@shared/redux/selectors/countrySelection';
import * as api from '@shared/api/marketProduct';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import permKey from '@shared/shared/permKey.json';
import { REDUX_KEY } from '@shared/shared/constants';
import { SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';

import SapReferenceCodeInfo from './index';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const TEST_SAP_REFERENCE = 'TEST_SAP_REFERENCE';

const SapReferenceCodeInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <SapReferenceCodeInfo />;
};

describe('Market Product/Detail/Product Info/Sap Info', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should not render if country is not in list of enabled countries list', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: 'NONEXISTENT COUNTRY CODE' } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const title = screen.queryByText('SAP Info');
    expect(title).not.toBeInTheDocument();
  });

  it('should not render if isBundle is true even if country is in list of enabled countries', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedBundleProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const title = screen.queryByText('SAP Info');
    expect(title).not.toBeInTheDocument();
  });

  it('should render if country is in the list of enabled countries and sapReferenceCode does not exist', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      sapReferenceCode: undefined,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const title = screen.queryByText('SAP Info');
    expect(title).toBeInTheDocument();
  });

  it('should render if country is in the list of enabled countries and sapReferenceCode exists', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue(TEST_SAP_REFERENCE);

    const title = screen.queryByText('SAP Info');
    expect(title).toBeInTheDocument();
  });

  it('should hide edit button only if country is in the list of enabled countries but product is not archived', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const title = screen.queryByText('SAP Info');
    expect(title).toBeInTheDocument();

    const editButton = screen.queryByTestId('edit-button');
    expect(editButton).not.toBeInTheDocument();
  });

  it('should not show edit button if PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT permission is not available', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const editButton = screen.queryByTestId('edit-button');
    expect(editButton).not.toBeInTheDocument();
  });

  it('should show edit button if PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT permission is available', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    const { addUserPermissions } = await renderComponent({ ui: <SapReferenceCodeInfo /> });

    await act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT]);
    });

    const editButton = screen.queryByTestId('edit-button');
    expect(editButton).toBeInTheDocument();
  });

  it('should show edit button if country is in the list of enabled countries and product is archived', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    const { addUserPermissions } = await renderComponent({ ui: <SapReferenceCodeInfo /> });

    const title = screen.queryByText('SAP Info');
    expect(title).toBeInTheDocument();

    await act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT]);
    });

    const editButton = screen.queryByTestId('edit-button');

    expect(editButton).toBeInTheDocument();
  });

  it('should show Save and Cancel buttons and activate SAP edit box after clicking Edit button', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    const { addUserPermissions } = await renderComponent({ ui: <SapReferenceCodeInfo /> });

    await act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT]);
    });

    const editButton = screen.getByTestId('edit-button');

    userEvent.click(editButton);

    screen.getByTestId('cancel-button');
    screen.getByTestId('save-button');
  });

  it('should properly disable and enable the input with Edit and Cancel buttons', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    const { addUserPermissions } = await renderComponent({ ui: <SapReferenceCodeInfo /> });

    await act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT]);
    });

    const editButton = screen.getByTestId('edit-button');
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    userEvent.click(editButton);
    expect(input).toBeEnabled();

    const cancelButton = screen.getByTestId('cancel-button');
    userEvent.click(cancelButton);
    expect(input).toBeDisabled();
  });

  it('should save when save button is clicked', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    const updateMarketProductSpy = jest.spyOn(api, 'updateMarketProduct');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES[0] } },
    );

    const changedSapReferenceCode = 'TEST_SAP_REFERENCE_NEW';

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: TEST_SAP_REFERENCE,
    });

    mockApiPerTestCase({
      ...updateSAPProductMock,
      successData: {
        ...updateSAPProductMock.successData,
        sapReferenceCode: changedSapReferenceCode,
      },
    });

    const { addUserPermissions } = await renderComponent({ ui: <SapReferenceCodeInfoWithSaga /> });

    act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT]);
    });

    const editButton = await screen.findByTestId('edit-button');
    const input = await screen.findByRole('textbox');

    expect(input).toHaveValue(TEST_SAP_REFERENCE);

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
      sapReferenceCode: changedSapReferenceCode,
    });

    userEvent.click(editButton);
    userEvent.clear(input);
    userEvent.type(input, changedSapReferenceCode);
    userEvent.click(await screen.findByTestId('save-button'));

    await screen.findByTestId('edit-button');

    expect(updateMarketProductSpy).toHaveBeenCalledWith({
      id: mockedPieceTypeProduct._id,
      body: { sapReferenceCode: changedSapReferenceCode },
    });

    await waitFor(() => expect(input).toHaveValue(changedSapReferenceCode));
  });
});
