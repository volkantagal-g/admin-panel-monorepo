import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WAREHOUSE_PROPOSAL.CREATE}_`;

export const { Types, Creators } = createActions({
  createWarehouseProposalRequest: { requestBody: {} },
  createWarehouseProposalSuccess: {},
  createWarehouseProposalFailure: { error: null },
  uploadWarehouseProposalImageRequest: { fileName: '', contentType: '', folderPath: '', bucketName: '', loadedImage: '', imageType: '' },
  uploadWarehouseProposalImageSuccess: { uploadedImageCdnUrl: null, uploadedThumbnailImageCdnUrl: null },
  uploadWarehouseProposalImageFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
