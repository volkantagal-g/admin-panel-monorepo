// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const getPageByIdUrl = '/page/getPage';

const getPageByIdMockOptions = {
  url: getPageByIdUrl,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { id } = req.body;
    return { data: { ...MOCKS.mockedPage, _id: id } };
  },
};

const getPagesUrl = '/page/getPages';

const getPagesMockOptions = {
  url: getPagesUrl,
  successData: MOCKS.mockedPages,
};

const getPageRolesUrl = '/page/getPageRoles';

const getPageRolesMockOptions = {
  url: getPageRolesUrl,
  successData: MOCKS.mockedPageRoles,
};

const getUserOwnedPages = {
  url: '/page/getUserOwnedPages',
  successData: MOCKS.mockedUserOwnedPages,
};

const addPageOwnersMockOptions = {
  url: '/page/addPageOwners',
  successData: {},
};

export default [
  getPageByIdMockOptions,
  getPagesMockOptions,
  getPageRolesMockOptions,
  getUserOwnedPages,
  addPageOwnersMockOptions,
];
