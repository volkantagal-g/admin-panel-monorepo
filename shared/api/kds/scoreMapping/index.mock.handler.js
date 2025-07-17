import * as MOCKS from './index.mock.data';

const getScoreMappingUrl = '/franchiseAudit/scoreMapping/getScoreMapping';
const updateScoreMappingUrl = '/franchiseAudit/scoreMapping/updateScoreMapping';

export const getScoreMappingMockOptions = {
  url: getScoreMappingUrl,
  successData: MOCKS.mockedScoreMappingList,
};

export const getNumberInputScoreMapping = {
  url: getScoreMappingUrl,
  successData: MOCKS.mockedScoreMappingNumberList,
};

export const updateScoreMapping = {
  url: updateScoreMappingUrl,
  successData: MOCKS.mockedScoreMappingList,
};

export default [updateScoreMapping];
