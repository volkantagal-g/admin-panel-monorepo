import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import BundleInfo from './index';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedBundleProduct, mockedGetMarketProducts, mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getBundleProductMock, getMarketProductsBundleMock, updateMarketProductBundleMock } from '@shared/api/marketProduct/index.mock.handler';
import * as api from '@shared/api/marketProduct';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const BundleInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <BundleInfo />;
};

describe('Market Product/Detail/BundleInfo', () => {
  afterEach(cleanup);
  it('should render component without error', async () => {
    await renderComponent({ ui: <BundleInfo /> });
  });

  it('should render correct table columns', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    await renderComponent({ ui: <BundleInfo /> });
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  describe('Bundle Product Operations', () => {
    it('should delete bundle product correctly', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
      mockApiPerTestCase(getBundleProductMock);
      mockApiPerTestCase(updateMarketProductBundleMock);
      await renderComponent({ ui: <BundleInfo /> });
      const editBtn = await screen.findByTestId('edit-button');
      userEvent.click(editBtn);
      const [, deleteBtn] = await screen.findAllByRole('button', { name: /delete/i });
      userEvent.click(deleteBtn);

      const saveBtn = await screen.findByTestId('save-button');
      userEvent.click(saveBtn);
    });

    it('should cancel bundle product correctly', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
      mockApiPerTestCase(getBundleProductMock);
      mockApiPerTestCase(updateMarketProductBundleMock);
      await renderComponent({ ui: <BundleInfo /> });
      const editBtn = await screen.findByTestId('edit-button');
      userEvent.click(editBtn);

      const addProductBtn = await screen.findByRole('button', { name: /add product/i });
      userEvent.click(addProductBtn);
      const cancelBtnModal = await screen.findByTestId('cancelBtnModal');
      userEvent.click(cancelBtnModal);
      const cancelBtn = await screen.findByTestId('cancel-button');
      userEvent.click(cancelBtn);
    });

    it('should edit the product bundle correctly', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
      mockApiPerTestCase(getBundleProductMock);
      mockApiPerTestCase(updateMarketProductBundleMock);
      mockApiPerTestCase(getMarketProductsBundleMock);
      await renderComponent({ ui: <BundleInfo /> });
      const editBtn = await screen.findByTestId('edit-button');
      userEvent.click(editBtn);

      const [, editProductBtn] = await screen.findAllByRole('button', { name: /edit/i });
      userEvent.click(editProductBtn);
      const editProductModal = await screen.findByRole('document');
      const [countInput, sortInput] = await within(editProductModal).findAllByRole('spinbutton');
      userEvent.type(countInput, 3);
      userEvent.type(sortInput, 3);
      const applyBtn = await within(editProductModal).findByRole('button', { name: /apply/i });
      userEvent.click(applyBtn);
      const saveBtn = await screen.findByTestId('save-button');
      userEvent.click(saveBtn);
    });

    it('should add new product to bundle correctly', async () => {
      const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
      marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
      const marketProductsSpy = jest.spyOn(getMarketProductsSelector, 'getData');
      marketProductsSpy.mockReturnValue(mockedGetMarketProducts);
      const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
      getMarketProductsSpy.mockReturnValue(mockedBundleProduct.marketProduct);

      mockApiPerTestCase(updateMarketProductBundleMock);
      mockApiPerTestCase(getMarketProductsBundleMock);
      mockApiPerTestCase(getBundleProductMock);
      await renderComponent({ ui: <BundleInfoWithSaga /> });
      const editBtn = await screen.findByTestId('edit-button');
      userEvent.click(editBtn);

      const addProductBtn = await screen.findByRole('button', { name: /add product/i });
      userEvent.click(addProductBtn);
      const newProductModal = await screen.findByRole('document');
      const productSelect = await within(newProductModal).findByRole('combobox');
      userEvent.type(productSelect, 'test');
      const option = await screen.findByText(/example/i);
      userEvent.click(option);
      const addButton = await within(newProductModal).findByRole('button', { name: /add/i });
      userEvent.click(addButton);
      const saveBtn = await screen.findByTestId('save-button');
      userEvent.click(saveBtn);
    });
  });
});
