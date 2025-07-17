import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { getPersonCandidateListRequestParams } from '../utils';

const prefix = `${REDUX_KEY.PERSON_CANDIDATE.LIST}_`;

const candidateListCommonArgs = {
  franchise: undefined,
  warehouse: undefined,
  status: undefined,
  workerType: undefined,
  startDate: undefined,
  endDate: undefined,
  assignees: undefined,
  uniqueIdentifier: undefined,
  limit: undefined,
  offset: undefined,
};

export const { Types, Creators } = createActions(
  {
    getPersonCandidateListRequest: candidateListCommonArgs,
    getPersonCandidateListSuccess: { data: null, total: 0 },
    getPersonCandidateListFailure: { error: null },
    updateAssigneeRequest: {
      ...candidateListCommonArgs,
      candidateId: undefined,
    },
    getPersonCandidateListReportRequest: {
      filters: getPersonCandidateListRequestParams(candidateListCommonArgs, false),
      utcOffset: undefined,
      lang: undefined,
    },
    getPersonCandidateListReportSuccess: null,
    getPersonCandidateListReportFailure: { error: null },
    updateAssigneeSuccess: null,
    updateAssigneeFailure: { error: null },
    getPersonCandidateActionHistoryRequest: { candidate: undefined },
    getPersonCandidateActionHistorySuccess: { data: null },
    getPersonCandidateActionHistoryFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
