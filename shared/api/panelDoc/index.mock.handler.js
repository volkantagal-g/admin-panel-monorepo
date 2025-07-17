import * as MOCKS from './index.mock.data';

const getByFiltersUrl = '/panelDoc/getByFilters';

const getByFiltersMockOptions = {
  url: getByFiltersUrl,
  handler: req => {
    const { body } = req;
    if (body.isAdminGuide) {
      return { data: MOCKS.mockedGetAdminGuides };
    }
    if (body.isHighlighted) {
      return { data: MOCKS.mockedGetHighlightedDocuments };
    }
    return { data: MOCKS.mockedGetByFiltersGeneral };
  },
};

const getByIdUrl = '/panelDoc/getById';
const getByIdMockOptions = {
  url: getByIdUrl,
  successData: MOCKS.mockedGetById,
};

const getMyFavoriteDocumentsUrl = '/panelDoc/getMyFavorites';
const getMyFavoriteDocumentsMockOptions = {
  url: getMyFavoriteDocumentsUrl,
  successData: MOCKS.mockedMyFavorites,
};

export default [getByFiltersMockOptions, getByIdMockOptions, getMyFavoriteDocumentsMockOptions];
