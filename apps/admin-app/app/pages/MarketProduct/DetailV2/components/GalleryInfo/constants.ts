import { MIME_TYPE } from '@shared/shared/constants';

export const SUPPORTED_IMAGE_FORMATS = [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.WEBP] as const;
export const PRODUCT_IMAGE_VALID_RATIOS = ['1:1', '3:4'] as const;
export const WIDE_IMAGE_VALID_RATIOS = ['2:1', '3:1'] as const;
