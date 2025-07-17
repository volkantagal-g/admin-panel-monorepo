// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import { REPORT_BASE_URL } from './index';
import * as MOCKS from './index.mock.data';

const getReportTagByIdUrl = `${REPORT_BASE_URL}/getReportTagById`;
const getReportTagsByRolesUrl = `${REPORT_BASE_URL}/getReportTagsByRoles`;

const getReportTagByIdMockOption = {
  url: getReportTagByIdUrl,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { _id } = req.body;
    const responseData = { ...MOCKS.mockedReportTag, _id };
    return { data: responseData };
  },
};

const getReportTagsByRolesMockOptions = {
  url: getReportTagsByRolesUrl,
  successData: MOCKS.mockedReportTagsByRoles,
};

export default [
  getReportTagByIdMockOption,
  getReportTagsByRolesMockOptions,
];
