/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import renderComponent from '@test/publicUtils/renderComponent';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';
import { mockedGetProductsOfSubCategory, mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import * as api from '@shared/api/marketProduct';
import {
  getPieceTypeProductMock,
  getProductsOfSubCategoryMock,
  updateMarketCategoryPositionMock,
} from '@shared/api/marketProduct/index.mock.handler';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

import PositionInfo from '.';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const mockCategories = [
  {
    _id: '58514a7942e27300040e5f8c',
    name: {
      tr: 'A Test Category',
      en: 'A Test Category',
    },
    status: 1,
    type: 1,
    isSubCategory: false,
  },
  {
    _id: '6603d817c794f326ea3494d6',
    name: {
      tr: 'B Test Category',
      en: 'B Test Category',
    },
    status: 1,
    type: 1,
    isSubCategory: false,
  },
  {
    _id: '564c67c5d35e7d0c002bd29a',
    name: {
      en: 'Test Sub Category',
      tr: 'Test Alt Kategori',
    },
    status: 1,
    type: 1,
    isSubCategory: true,
    parent: '6603d817c794f326ea3494d6',
  },
];

const PositionInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return (
    <PositionInfo />
  );
};

describe('Market Product/Detail/PositionInfo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render component without error', async () => {
    await renderComponent({ ui: <PositionInfo /> });
  });

  it('should render correct columns', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);

    await renderComponent({ ui: <PositionInfo /> });

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub Category')).toBeInTheDocument();
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should render correct data', async () => {
    const {
      marketProduct: mockProduct,
      positions: mockPositions,
    } = mockedPieceTypeProduct;

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockProduct);

    const marketProductPositionSpy = jest.spyOn(getMarketProductByIdSelector, 'getPositions');
    marketProductPositionSpy.mockReturnValue(mockPositions);

    await renderComponent({ ui: <PositionInfo /> });

    mockPositions.forEach(position => {
      const {
        _id: positionId,
        category: {
          _id: categoryId,
          name: { en: categoryName },
        },
        subCategory: {
          _id: subCategoryId,
          name: { en: subCategoryName },
        },
        productPosition,
      } = position;

      screen.getByText(categoryName);
      screen.getByText(subCategoryName);
      screen.getByText(categoryName);
      screen.getByText(productPosition);

      if (
        categoryId === mockProduct.category._id
        && subCategoryId === mockProduct.subCategory._id
      ) {
        const row = document.querySelector(`tr[data-row-key="${positionId}"]`);

        const button = within(row).getByRole('button', { name: 'Main Category' });

        expect(button).toBeDisabled();
      }
    });
  });

  it('should show new position modal succesfuly and match parent and sub category properly', async () => {
    const {
      marketProduct: mockProduct,
      positions: mockPositions,
    } = mockedPieceTypeProduct;

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockProduct);

    const marketProductPositionSpy = jest.spyOn(getMarketProductByIdSelector, 'getPositions');
    marketProductPositionSpy.mockReturnValue(mockPositions);

    const marketProductCategoriesSpy = jest.spyOn(getMarketProductCategoriesSelector, 'getData');
    marketProductCategoriesSpy.mockReturnValue(mockCategories);

    mockApiPerTestCase(getProductsOfSubCategoryMock);

    await renderComponent({ ui: <PositionInfoWithSaga /> });

    const editButton = screen.getByRole('button', { name: /edit/i });

    userEvent.click(editButton);

    const newPositionButton = await screen.findByRole('button', { name: /new position/i });
    userEvent.click(newPositionButton);

    await screen.findByText(/new product position/i);

    const [categoryInput, subCategoryInput] = screen.queryAllByRole('combobox');
    userEvent.click(categoryInput);

    const categoryOption = await screen.findByText(/b test category/i);
    expect(subCategoryInput).toBeDisabled();
    userEvent.click(categoryOption);

    expect(subCategoryInput).toBeEnabled();

    userEvent.click(subCategoryInput);
    const subCategoryOption = await screen.findByText(/test sub category/i);
    userEvent.click(subCategoryOption);

    await screen.findByText(/test 1/i);
    await screen.findByText(/test 2/i);
    await screen.findByText(/test 3/i);
  });

  it('should show updated position list successfully after an update', async () => {
    const {
      marketProduct: mockProduct,
      positions: mockPositions,
    } = mockedPieceTypeProduct;

    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockProduct);

    const marketProductCategoriesSpy = jest.spyOn(getMarketProductCategoriesSelector, 'getData');
    marketProductCategoriesSpy.mockReturnValue([
      ...mockProduct.categories.map(mockCategory => ({
        ...mockCategory,
        isSubCategory: false,
      })),
      ...mockProduct.subCategories.map(mockSubCategory => ({
        ...mockSubCategory,
        isSubCategory: true,
      })),
      ...mockCategories,
    ]);

    const getMarketProductsSpy = jest.spyOn(api, 'getMarketProducts');
    getMarketProductsSpy.mockReturnValue(mockProduct);

    const marketProductPositionSpy = jest.spyOn(getMarketProductByIdSelector, 'getPositions');
    marketProductPositionSpy.mockReturnValue(mockPositions);

    const updateMarketCategoryPositionSpy = jest.spyOn(api, 'updateMarketCategoryPosition');

    mockApiPerTestCase(getProductsOfSubCategoryMock);
    mockApiPerTestCase(updateMarketCategoryPositionMock);

    await renderComponent({ ui: <PositionInfoWithSaga /> });

    const editButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(editButton);
    const newPositionButton = await screen.findByRole('button', { name: /new position/i });
    userEvent.click(newPositionButton);

    await screen.findByText(/new product position/i);
    const [categoryInput, subCategoryInput] = screen.queryAllByRole('combobox');
    userEvent.click(categoryInput);
    const categoryOption = await screen.findByText(/b test category/i);
    expect(subCategoryInput).toBeDisabled();
    userEvent.click(categoryOption);
    expect(subCategoryInput).toBeEnabled();
    userEvent.click(subCategoryInput);
    const subCategoryOption = await screen.findByText(/test sub category/i);
    userEvent.click(subCategoryOption);

    await screen.findByText(/test 1/i);
    await screen.findByText(/test 2/i);
    await screen.findByText(/test 3/i);

    const positionInput = await screen.findByTestId('position-number-input');
    userEvent.clear(positionInput);
    userEvent.type(positionInput, '3');
    const addButton = await screen.findByRole('button', { name: /add/i });
    userEvent.click(addButton);

    const newMarketProduct = {
      ...mockProduct,
      categories: [
        ...mockProduct.categories,
        mockCategories[1],
      ],
      subCategories: [
        ...mockProduct.subCategories,
        mockCategories[2],
      ],
    };

    const newPositions = [
      ...mockPositions,
      {
        id: '65d70cd8cfec08b37e700aa0',
        items: [
          {
            item: mockedGetProductsOfSubCategory.items[0].item._id,
            position: 1,
          },
          {
            item: mockedGetProductsOfSubCategory.items[1].item._id,
            position: 2,
          },
          {
            item: mockProduct._id,
            position: 3,
          },
          {
            item: mockedGetProductsOfSubCategory.items[2].item._id,
            position: 4,
          },
        ],
        category: mockCategories[1],
        subCategory: mockCategories[2],
        productPosition: 3,
      },
    ];

    mockApiOnce({
      ...getPieceTypeProductMock,
      successData: {
        marketProduct: newMarketProduct,
        positions: newPositions,
      },
    });

    const confirmationButton = await screen.findByRole('button', { name: /yes/i });
    userEvent.click(confirmationButton);

    getMarketProductsSpy.mockRestore();
    marketProductPositionSpy.mockRestore();

    await waitFor(() => {
      expect(confirmationButton).not.toBeInTheDocument();
    }, { timeout: 1000 });

    await screen.findByText(/test sub category/i);

    expect(updateMarketCategoryPositionSpy).toHaveBeenCalledWith({
      body: {
        items: [
          {
            item: mockedGetProductsOfSubCategory.items[0].item._id,
            position: 1,
          },
          {
            item: mockedGetProductsOfSubCategory.items[1].item._id,
            position: 2,
          },
          {
            item: mockProduct._id,
            position: 3,
          },
          {
            item: mockedGetProductsOfSubCategory.items[2].item._id,
            position: 4,
          },
        ],
        category: mockCategories[1]._id,
        subCategory: mockCategories[2]._id,
        categories: [
          ...mockProduct.categories.map(category => category._id),
          mockCategories[1]._id,
        ],
        subCategories: [
          ...mockProduct.subCategories.map(subCategory => subCategory._id),
          mockCategories[2]._id,
        ],
        productId: mockProduct._id,
        removal: false,
        version: 82,
      },
    });
  });

  it('should cancel without error', async () => {
    await renderComponent({ ui: <PositionInfo /> });
    const editBtn = await screen.findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
