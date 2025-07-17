import { invert, includes } from 'lodash';

import * as MOCKS from './index.mock.data';
import { mockedMarketProducts } from './marketProducts.mock.data';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

const getMarketProductWithCategoryPositionsURL = '/marketProduct/getMarketProductWithCategoryPositions';
const updateMarketProductURL = '/marketProduct/updateMarketProduct';
const createMarketProductImageUrlURL = '/marketProduct/createMarketProductImageUrl';
const getMarketProductsURL = '/marketProduct/getMarketProducts';
const createMarketProductURL = '/marketProduct/createMarketProduct';
const getProductsOfSubCategoryURL = '/marketProduct/getProductsOfSubCategory';
const updateMarketCategoryPositionURL = '/marketProduct/updateMarketCategoryPosition';

export const getPieceTypeProductMock = {
  url: getMarketProductWithCategoryPositionsURL,
  successData: MOCKS.mockedPieceTypeProduct,
};

export const getWeightTypeProductMock = {
  url: getMarketProductWithCategoryPositionsURL,
  successData: MOCKS.mockedWeightTypeProduct,
};

export const getBundleProductMock = {
  url: getMarketProductWithCategoryPositionsURL,
  successData: MOCKS.mockedBundleProduct,
};

export const getSAPProductMock = {
  url: getMarketProductWithCategoryPositionsURL,
  successData: MOCKS.mockedSAPProduct,
};

export const updateSAPProductMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedSAPProduct,
};

export const updateArchiveProductMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedArchivedProduct,
};

export const updateMarketProductImageMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedPieceTypeProduct,
};

export const createMarketProductImageUrlMock = {
  url: createMarketProductImageUrlURL,
  successData: MOCKS.mockedCreateMarketImageUrl,
};

export const getProductsOfSubCategoryMock = {
  url: getProductsOfSubCategoryURL,
  successData: MOCKS.mockedGetProductsOfSubCategory,
};

export const updateMarketCategoryPositionMock = {
  handler: ({
    body: {
      category,
      categories,
      subCategory,
      subCategories,
      productId,
    },
  }) => {
    return {
      data: {
        ...MOCKS.mockedPieceTypeProduct.marketProduct,
        _id: productId,
        category,
        categories,
        subCategory,
        subCategories,
      },
      isError: false,
    };
  },
  url: updateMarketCategoryPositionURL,
};

export const getMarketProductsMock = ({
  statusList = [
    'INACTIVE',
    'ACTIVE',
  ],
  filterOptions = {
    barcodes: true,
    fullName: true,
    sapReferenceCode: true,
  },
  queryText = '',
  ids = [],
  limit = 10,
  offset = 0,
} = {}) => {
  const results = mockedMarketProducts
    .filter(
      marketProductMock => {
        if (ids.length > 0) {
          return ids.includes(marketProductMock._id);
        }

        return true;
      },
    )
    .filter(
      marketProductMock => {
        const matchesFullName =
          queryText !== ''
          && filterOptions.fullName
          && (
            marketProductMock.fullName.tr.includes(queryText) || marketProductMock.fullName.en.includes(queryText)
          );

        const matchesSapReferenceCode = filterOptions.sapReferenceCode && includes(marketProductMock.sapReferenceCode, queryText);
        const foundInBarcodes = filterOptions.barcodes && marketProductMock.barcodes.includes(queryText);
        const statusListInverted = invert(MARKET_PRODUCT_STATUS);
        const matchesStatus = statusList.includes(statusListInverted[marketProductMock.status]);

        return foundInBarcodes
          || matchesFullName
          || matchesSapReferenceCode
          || matchesStatus;
      },
    );

  return {
    url: getMarketProductsURL,
    successData: {
      products: results.slice(offset, offset + limit),
      totalCount: results.length,
    },
  };
};

export const createMarketProductURLMock = {
  url: createMarketProductURL,
  successData: MOCKS.mockedCreateMarketProduct,
};

export const updateMarketProductDisplayTypeMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedDisplayTypeProduct,
};

export const updateMarketProductBundleMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedBundleProduct,
};

export const getMarketProductsBundleMock = {
  url: getMarketProductsURL,
  successData: MOCKS.mockedGetMarketProducts,
};

export const updateMarketProductAgeRestrictionMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedAgeRestrictionProduct,
};
export const updateMarketProductSaleRestrictionMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedSaleRestrictionProduct,
};

export const updateMarketProductWeightInfoMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedWeightInfoProduct,
};

export const updateMarketProductDomainBasedSaleRestrictionMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedDomainBasedSaleRestrictionProduct,
};

export const updateMarketProductTagMock = {
  url: updateMarketProductURL,
  successData: MOCKS.mockedMarketProductTag,
};

export default [
  getPieceTypeProductMock,
  getWeightTypeProductMock,
  getBundleProductMock,
  getSAPProductMock,
  updateSAPProductMock,
  updateArchiveProductMock,
  createMarketProductURLMock,
  getProductsOfSubCategoryMock,
  updateMarketCategoryPositionMock,
  updateMarketProductDisplayTypeMock,
  updateMarketProductBundleMock,
  getMarketProductsBundleMock,
  updateMarketProductAgeRestrictionMock,
  updateMarketProductSaleRestrictionMock,
  updateMarketProductWeightInfoMock,
  updateMarketProductDomainBasedSaleRestrictionMock,
  updateMarketProductTagMock,
];
