import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_GAMIFICATION_TASK.CREATE}_`;

export const { Types, Creators } = createActions({
  createCourierGamificationTaskRequest: { requestBody: {} },
  createCourierGamificationTaskSuccess: { isSuccess: null },
  createCourierGamificationTaskFailure: { error: null },
  getPersonIdsListRequest: { warehouseIds: [] },
  getPersonIdsListSuccess: { data: null },
  getPersonIdsListFailure: { error: null },
  uploadCourierTaskImageRequest: { fileName: '', contentType: '', folderPath: '', bucketName: '', loadedImage: '', imageType: '' },
  uploadCourierTaskImageSuccess: { uploadedImageCdnUrl: null, uploadedThumbnailImageCdnUrl: null },
  uploadCourierTaskImageFailure: { error: null },
  cleanPersonIds: null,
  initPage: null,
  destroyPage: null,
}, { prefix });
