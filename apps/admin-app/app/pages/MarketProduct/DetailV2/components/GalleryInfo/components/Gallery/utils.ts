import { TFunction } from 'react-i18next';

import { EditingStageValidImage } from '../../types';

export function getGalleryInitialIndex(
  images: readonly EditingStageValidImage[],
  getMainImage: boolean,
): number {
  const mainImageIndex = images.findIndex(({ isMain }) => isMain);
  const hasMainImage = mainImageIndex > -1;

  if (!hasMainImage || !getMainImage) return 0;
  return mainImageIndex;
}

export function getCoverImageAltText({
  t,
  isMain,
  isWideImage,
  countryLanguage,
}: {
  t: TFunction<'marketProductPageV2'>,
  isMain?: boolean,
  isWideImage?: boolean,
  countryLanguage: string
}): string {
  if (isWideImage) {
    return t('GALLERY.GALLERY_CARD.WIDE_IMAGE_ALT_TEXT', { language: countryLanguage.toUpperCase() });
  }

  if (isMain) {
    return t('GALLERY.GALLERY_CARD.MAIN_IMAGE_ALT_TEXT', { language: countryLanguage.toUpperCase() });
  }

  return t('GALLERY.GALLERY_CARD.IMAGE_ALT_TEXT', { language: countryLanguage.toUpperCase() });
}
