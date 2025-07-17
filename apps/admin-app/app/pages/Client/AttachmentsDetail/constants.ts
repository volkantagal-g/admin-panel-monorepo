import { MIME_TYPE } from '@shared/shared/constants';

export const allowedImageMimeTypes = [
  MIME_TYPE.PNG,
  MIME_TYPE.JPEG,
] as const;

export const allowedVideoMimeTypes = [
  MIME_TYPE.PNG,
  MIME_TYPE.MP4,
  MIME_TYPE.MPEG,
] as const;

export const allowedPdfMimeType = MIME_TYPE.PDF;

export const allowedMimeTypes = [
  ...allowedImageMimeTypes,
  ...allowedVideoMimeTypes,
  allowedPdfMimeType,
] as const;
