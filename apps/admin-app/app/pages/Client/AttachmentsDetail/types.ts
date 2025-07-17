import {
  allowedImageMimeTypes,
  allowedVideoMimeTypes,
  allowedPdfMimeType,
  allowedMimeTypes,
} from './constants';

export type AllowedImageMimeType = typeof allowedImageMimeTypes;
export type AllowedVideoMimeType = typeof allowedVideoMimeTypes;
export type AllowedPdfMimeType = typeof allowedPdfMimeType;
export type AllowedMimeType = typeof allowedMimeTypes;
