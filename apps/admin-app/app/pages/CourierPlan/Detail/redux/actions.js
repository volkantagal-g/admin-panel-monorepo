import { createActions } from 'reduxsauce';

import prefixKey from './key';

export const { Types, Creators } = createActions(
  {
    getCourierPlanRequest: { id: undefined },
    getCourierPlanSuccess: { plan: null },
    getCourierPlanFailure: { error: null },
    uploadCourierPlanExcelFileRequest: {
      planId: undefined,
      stepKey: null,
      uploadParams: null,
      data: null,
    },
    uploadCourierPlanExcelFileFailure: { error: null },
    proceedCourierPlanProcessRequest: {
      planId: undefined,
      stepKey: null,
      data: null,
    },
    proceedCourierPlanProcessFailure: { error: null },
    updateTTPRequest: {
      planId: undefined,
      stepKey: null,
      uploadParams: null,
      data: null,
    },
    updateTTPFailure: { error: null },
    publishCourierPlanProcessRequest: {
      publishType: undefined,
      planId: undefined,
    },
    publishCourierPlanProcessSuccess: {},
    publishCourierPlanProcessFailure: { error: null },
    downloadSignedFileRequest: { key: undefined },
    downloadSignedFileSuccess: {},
    downloadSignedFileFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${prefixKey}_` },
);
