import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { act, cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { updateArchiveProductMock } from '@shared/api/marketProduct/index.mock.handler';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';

import * as CountrySelection from '@shared/redux/selectors/countrySelection';
import * as api from '@shared/api/marketProduct';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import permKey from '@shared/shared/permKey.json';
import { REDUX_KEY } from '@shared/shared/constants';
import { ARCHIVE_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';

import ProductStatus from './index';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const ProductStatusWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <ProductStatus />;
};

describe('Market Product/Detail/Summary Info/Product Status', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render without errors', async () => {
    await renderComponent({ ui: <ProductStatus /> });
  });

  it('should show statuses correctly for inactive products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    await renderComponent({ ui: <ProductStatus /> });

    const activeToggle = screen.getByLabelText('Active');
    expect(activeToggle).not.toBeChecked();
  });

  it('should show statuses correctly for active products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 1,
    });

    await renderComponent({ ui: <ProductStatus /> });

    const activeToggle = screen.getByLabelText('Active');
    expect(activeToggle).toBeChecked();
  });

  it('should show statuses correctly for enabled products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      isEnabled: true,
    });

    await renderComponent({ ui: <ProductStatus /> });

    const enabledToggle = screen.getByLabelText('Enabled');
    expect(enabledToggle).toBeChecked();
  });

  it('should show statuses correctly for visible products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      isVisible: true,
    });

    await renderComponent({ ui: <ProductStatus /> });

    const visibleToggle = screen.getByLabelText('Show on app');
    expect(visibleToggle).toBeChecked();
  });

  it('should show disabled statuses correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      isVisible: false,
      isEnabled: false,
      status: 0,
    });

    await renderComponent({ ui: <ProductStatus /> });

    const activeToggle = screen.getByLabelText('Active');
    expect(activeToggle).not.toBeChecked();

    const EnabledToggle = screen.getByLabelText('Enabled');
    expect(EnabledToggle).not.toBeChecked();

    const visibleToggle = screen.getByLabelText('Show on app');
    expect(visibleToggle).not.toBeChecked();
  });

  it('should not render archive toggle in a country where archive feature is not enabled', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: 'NONEXISTENT COUNTRY CODE' } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeInTheDocument();
  });

  it('should render archive toggle in a country where archive feature is enabled', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).toBeInTheDocument();
  });

  it('should show archive toggle value correctly for archived products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).toBeChecked();
  });

  it('should show archive toggle value correctly for inactive products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeChecked();
  });

  it('should show archive toggle value correctly for active products', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 1,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeChecked();
  });

  it('activation toggle should be disabled if a product is archived', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).toBeChecked();

    const activeToggle = screen.queryByLabelText('Active');
    expect(activeToggle).not.toBeChecked();
    expect(activeToggle).toBeDisabled();
  });

  it('archive toggle should be disabled if a product is active', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 1,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeChecked();
    expect(archiveToggle).toBeDisabled();

    const activeToggle = screen.queryByLabelText('Active');
    expect(activeToggle).toBeChecked();
    expect(activeToggle).toBeEnabled();
  });

  it('archive toggle should not be disabled if a product is inactive', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    const { addUserPermissions } = await renderComponent({ ui: <ProductStatus /> });

    act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ARCHIVED_STATUS]);
    });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeChecked();
    expect(archiveToggle).toBeEnabled();

    const activeToggle = screen.queryByLabelText('Active');
    expect(activeToggle).not.toBeChecked();
    expect(activeToggle).toBeEnabled();
  });

  it('archive toggle should be disabled if a product is inactive and user has no related permission', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    await renderComponent({ ui: <ProductStatus /> });

    const archiveToggle = screen.queryByLabelText('Archived');
    expect(archiveToggle).not.toBeChecked();
    expect(archiveToggle).toBeDisabled();

    const activeToggle = screen.queryByLabelText('Active');
    expect(activeToggle).not.toBeChecked();
    expect(activeToggle).toBeEnabled();
  });

  it('clicking archive toggle should trigger confirmation modal', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    const { addUserPermissions } = await renderComponent({ ui: <ProductStatusWithSaga /> });

    act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ARCHIVED_STATUS]);
    });

    const archiveToggle = screen.queryByLabelText('Archived');
    userEvent.click(archiveToggle);

    const modalContainer = await screen.findByRole('dialog');

    within(modalContainer).getByText('Confirm');
    within(modalContainer).getByText('Cancel');
    within(modalContainer).getByText('Yes');
  });

  it('confirming archive confirmation modal should trigger api call and update checked state after a successful response', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    const updateMarketProductSpy = jest.spyOn(api, 'updateMarketProduct');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    mockApiPerTestCase(updateArchiveProductMock);

    const { addUserPermissions } = await renderComponent({ ui: <ProductStatusWithSaga /> });

    act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ARCHIVED_STATUS]);
    });

    const archiveToggle = screen.queryByLabelText('Archived');
    userEvent.click(archiveToggle);

    const modalContainer = screen.getByRole('dialog');

    const yesButton = within(modalContainer).getByText('Yes');
    userEvent.click(yesButton);

    expect(updateMarketProductSpy).toHaveBeenCalledWith({
      id: mockedPieceTypeProduct.marketProduct._id,
      body: { status: 4 },
    });

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 4,
    });

    await waitFor(() => expect(archiveToggle).toBeChecked());
  });

  it('should be enabled/disabled the product correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    marketProductSpy.mockReturnValue({
      ...mockedPieceTypeProduct.marketProduct,
      status: 0,
    });

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: ARCHIVE_ENABLED_COUNTRY_CODES[0] } },
    );

    const { addUserPermissions } = await renderComponent({ ui: <ProductStatusWithSaga /> });

    act(() => {
      addUserPermissions([permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ARCHIVED_STATUS]);
    });

    const enabledToggle = screen.queryByLabelText('Enabled');
    userEvent.click(enabledToggle);

    const modalContainer = await screen.findByRole('dialog');

    within(modalContainer).getByText('Confirm');
    within(modalContainer).getByText('Cancel');
    within(modalContainer).getByText('Yes');

    const yesBtn = await screen.findByRole('button', { name: /yes/i });
    userEvent.click(yesBtn);
  });
});
