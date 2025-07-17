import * as MOCKS from './index.mock.data';

const getAuditFormTypeUrl = '/franchiseAudit/auditFormType/list';

const getAuditFormTypesConfigMock = {
  url: getAuditFormTypeUrl,
  successData: MOCKS.mockedAuditFormTypeListResponse,
};

const createAuditFormTypeUrl = '/franchiseAudit/auditFormType/create';

const createAuditFormTypeMockOptions = {
  url: createAuditFormTypeUrl,
  successData: { _id: 'success_id' },
};

const getAuditFormTypById = '/franchiseAudit/auditFormType/detail';

const getAuditFormTypByIdMockOptions = {
  url: getAuditFormTypById,
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockedAuditFormTypeDetail, id } };
  },
};

export default [getAuditFormTypesConfigMock, createAuditFormTypeMockOptions, getAuditFormTypByIdMockOptions];
