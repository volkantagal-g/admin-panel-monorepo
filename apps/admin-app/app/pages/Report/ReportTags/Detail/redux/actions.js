import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TAGS_DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    setFormMode: { formMode: null },
    getReportTagByIdRequest: { id: null },
    getReportTagByIdSuccess: { data: null },
    getReportTagByIdFailure: { error: null },

    updateReportTagRequest: { data: null },
    updateReportTagSuccess: { data: null },
    updateReportTagFailure: { error: null },

    addRolesToReportTagRequest: { reportTagId: null, roleIds: [] },
    addRolesToReportTagSuccess: { data: null },
    addRolesToReportTagFailure: { error: null },

    getRolesByReportTagsRequest: { reportTagIds: [], shouldBringRoleDetails: false },
    getRolesByReportTagsSuccess: { data: null },
    getRolesByReportTagsFailure: { error: null },

    getRolesDetailsRequest: { roleIds: [] },
    getRolesDetailsSuccess: { data: null },
    getRolesDetailsFailure: { error: null },

    removeRoleFromReportTagRequest: { reportTagId: null, roleId: null },
    removeRoleFromReportTagSuccess: { data: null },
    removeRoleFromReportTagFailure: { error: null },

    getReportTypesRequest: { data: null },
    getReportTypesSuccess: { data: null },
    getReportTypesFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
