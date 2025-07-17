import { MIME_TYPE } from '@shared/shared/constants';
import { allowedImageMimeTypes, allowedVideoMimeTypes } from './constants';

import type { AllowedImageMimeType, AllowedPdfMimeType, AllowedVideoMimeType } from './types';

export const isAllowedImage = (mime: any): mime is AllowedImageMimeType => {
  return allowedImageMimeTypes.includes(mime);
};

export const isAllowedVideo = (mime: any): mime is AllowedVideoMimeType => {
  return allowedVideoMimeTypes.includes(mime);
};

export const isPdf = (mime: any): mime is AllowedPdfMimeType => {
  return mime === MIME_TYPE.PDF;
};
