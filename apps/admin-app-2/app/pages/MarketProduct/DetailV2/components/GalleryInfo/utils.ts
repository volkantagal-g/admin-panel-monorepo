import _ from 'lodash';

import { EditingStageValidImage, GalleryImage, LocalImage, MultiLanguageGalleryImages, RemoteImage } from './types';

export function isImageRemote(image: GalleryImage): image is RemoteImage {
  return !image.isLocal;
}

export function areImagesRemote(images: readonly GalleryImage[]): images is RemoteImage[] {
  return _.every(images, isImageRemote);
}

export function imagesHaveOnlyOneMainImage(images: readonly GalleryImage[]): boolean {
  return _.filter(images, ['isMain', true]).length === 1;
}

export function getInitialWideImages(
  widePicURL: Record<string, string>,
  countryLanguages: string[],
): MultiLanguageGalleryImages {
  return _.mapValues(
    {
      ..._.fromPairs(
        countryLanguages.map(lang => [lang, undefined]),
      ),
      ...widePicURL,
    },
    image => {
      if (image) {
        return [{
          imageUrl: image,
          isMain: true,
          isSelected: false,
          isLocal: false,
          isUploading: false,
        } as EditingStageValidImage];
      }

      return [];
    },
  );
}

export function getInitialProductImages(
  picURLs: Record<string, string[]>,
  picURL: Record<string, string>,
  countryLanguages: string[],
): MultiLanguageGalleryImages {
  return _.mapValues(
    {
      ..._.fromPairs(
        countryLanguages.map(lang => [lang, []]),
      ),
      ...picURLs,
    },
    (images, countryLanguage) => _.compact<string>(images)
      .map(imageUrl => {
        return {
          imageUrl,
          key: _.uniqueId(),
          isMain: imageUrl === picURL?.[countryLanguage],
          isSelected: false,
          isLocal: false,
          isUploading: false,
        } as EditingStageValidImage;
      }),
  );
}

export function progressImagesInQueueToUploading(multiLanguageImages: MultiLanguageGalleryImages): {
  foundQueuedImages: LocalImage[],
  progressedImages: MultiLanguageGalleryImages,
} {
  const foundQueuedImages: LocalImage[] = [];

  const progressedImages = _.mapValues(multiLanguageImages, images => {
    return images.map(image => {
      if (
        image.isLocal
        && !image.isUploading
        && !image.isFailed
      ) {
        foundQueuedImages.push(image);

        return {
          ...image,
          isUploading: true,
        };
      }

      return image;
    });
  });

  return {
    foundQueuedImages,
    progressedImages,
  };
}

export function progressUploadingImagesToFailed(
  multiLanguageImages: MultiLanguageGalleryImages,
  failedImages: { key: string }[],
): MultiLanguageGalleryImages | undefined {
  let foundFailedImages = false;

  const progressedImages = _.mapValues(multiLanguageImages, images => {
    return images.map(image => {
      if (
        image.isLocal
        && image.isUploading
        && !image.isFailed
      ) {
        const errorEntry = failedImages.find(_.matches({ key: image.key }));
        if (errorEntry) {
          foundFailedImages = true;

          return {
            ...image,
            isUploading: false,
            isFailed: true,
          };
        }
      }

      return image;
    });
  });

  if (!foundFailedImages) {
    return undefined;
  }

  return progressedImages;
}

export function progressUploadedImagesToRemote(
  multiLanguageImages: MultiLanguageGalleryImages,
  uploadedImages: { key: string, cdnUrl: string }[], // TODO: use redux states types in the future when possible
): MultiLanguageGalleryImages | undefined {
  let foundUploadedImages = false;

  const progressedImages = _.mapValues(multiLanguageImages, images => {
    return images.map(image => {
      if (image.isLocal) {
        const uploadEntry = uploadedImages.find(_.matches({ key: image.key }));

        if (uploadEntry) {
          foundUploadedImages = true;

          return {
            isMain: image.isMain,
            key: image.key,
            imageUrl: uploadEntry?.cdnUrl,
            isLocal: false,
            isSelected: image.isSelected,
          };
        }
      }

      return image;
    });
  }) as MultiLanguageGalleryImages;

  if (!foundUploadedImages) {
    return undefined;
  }

  return progressedImages;
}

export function getImagesPayload({
  savedImages,
  savedCountryLanguage,
  allImages,
  countryLanguages,
  overrideOtherLanguages,
}: {
  savedImages: readonly RemoteImage[],
  savedCountryLanguage: string,
  countryLanguages: string[],
  allImages: MultiLanguageGalleryImages,
  overrideOtherLanguages: boolean,
}) {
  const imageUrl = _.property('imageUrl');

  const imagesPayload = _.mapValues(
    allImages,
    (__, currentCountryLanguage) => {
      if (currentCountryLanguage === savedCountryLanguage) {
        return savedImages.map(imageUrl);
      }

      if (overrideOtherLanguages && countryLanguages.includes(currentCountryLanguage)) {
        return savedImages.map(imageUrl);
      }

      return undefined;
    },
  );

  const mainImagesPayload = _.mapValues(
    allImages,
    (__, currentCountryLanguage) => {
      const savedImagesMain = savedImages.find(_.matches({ isMain: true }));

      const savedLanguageMainImageUrl = savedImagesMain?.imageUrl;

      if (currentCountryLanguage === savedCountryLanguage) {
        return savedLanguageMainImageUrl;
      }

      if (overrideOtherLanguages && countryLanguages.includes(currentCountryLanguage)) {
        return savedLanguageMainImageUrl;
      }

      return undefined;
    },
  );

  return {
    mainImagesPayload,
    imagesPayload,
  };
}
