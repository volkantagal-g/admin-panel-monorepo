import { MIME_TYPE } from '@shared/shared/constants';

export const SUPPORTED_IMAGE_FORMATS = [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.WEBP, MIME_TYPE.GIF, MIME_TYPE.MP4] as const;
export const RECIPE_IMAGE_VALID_RATIOS = ['1:1'] as const;
export const RECIPE_THUMBNAIL_VALID_RATIOS = ['3:4'] as const;
