import { RECIPE_IMAGE_VALID_RATIOS, WIDE_IMAGE_VALID_RATIOS, SUPPORTED_IMAGE_FORMATS } from './constants';

export type SupportedImageFormat = typeof SUPPORTED_IMAGE_FORMATS[number];
export type ValidImageRatio = typeof RECIPE_IMAGE_VALID_RATIOS[number] | typeof WIDE_IMAGE_VALID_RATIOS[number];

export interface GalleryImage {
  key: string;
  imageUrl: string;
  isMain: boolean;
  isSelected: boolean;
  isLocal: boolean;
}

export interface NonMainImage extends GalleryImage {
  isMain: false;
  isSelected: boolean;
}

export interface MainImage extends GalleryImage {
  isMain: true;
  isSelected: false;
}

export interface LocalImage extends GalleryImage {
  isLocal: true;
  isUploading: boolean;
  extension: string;
  isFailed: boolean;
}

export interface RemoteImage extends GalleryImage {
  isLocal: false;
  isUploading: false;
}

export type EditingStageValidImage = (NonMainImage | MainImage) & (LocalImage | RemoteImage);

export type MultiLanguageGalleryImages = Record<string, readonly EditingStageValidImage[]>;
