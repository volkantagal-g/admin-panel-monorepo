import * as MOCKS from './index.mock.data';

const getQuestionListUrl = '/franchiseAudit/question/list';
const getQuestionGroupListUrl = '/franchiseAudit/questionGroup/filter';
const getScoreMappingUrl = '/franchiseAudit/scoreMapping/getScoreMapping';
const getAuditFormUrl = '/franchiseAudit/auditFormType/list';
const createNewQuestionUrl = '/franchiseAudit/question/create';
const getQuestionDetailUrl = '/franchiseAudit/question/detail';

const getQuestionMock = {
  url: getQuestionListUrl,
  successData: MOCKS.mockedQuestionList,
};

const getQuestionGroupMock = {
  url: getQuestionGroupListUrl,
  successData: MOCKS.mockedQuestionGroupList,
};

const getScoreMappingMock = {
  url: getScoreMappingUrl,
  successData: MOCKS.mockedScoreMappingList,
};

export const getAuditFormTypeMock = {
  url: getAuditFormUrl,
  successData: MOCKS.mockedAuditFormType,
};

const createNewQuestionMock = {
  url: createNewQuestionUrl,
  successData: MOCKS.mockCreateQuestionType,
};

const getQuestionDetailMock = {
  url: getQuestionDetailUrl,
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockQuestionDetail, id } };
  },
};

export default [
  getQuestionMock,
  getQuestionGroupMock,
  getScoreMappingMock,
  createNewQuestionMock,
  getQuestionDetailMock,
];
