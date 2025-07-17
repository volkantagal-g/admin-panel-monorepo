import {
  areImagesRemote, getImagesPayload,
  getInitialProductImages,
  getInitialWideImages,
  imagesHaveOnlyOneMainImage,
  progressImagesInQueueToUploading, progressUploadedImagesToRemote,
  progressUploadingImagesToFailed,
} from './utils';
import { EditingStageValidImage, GalleryImage, LocalImage, MultiLanguageGalleryImages, RemoteImage } from './types';

const mockValidSubmittableList = [
  {
    key: '0',
    imageUrl: 'test',
    isMain: false,
    isSelected: false,
    isLocal: false,
    isUploading: false,
  },
  {
    key: '1',
    imageUrl: 'test',
    isMain: true,
    isSelected: false,
    isLocal: false,
    isUploading: false,
  },
  {
    key: '2',
    imageUrl: 'test',
    isMain: false,
    isSelected: false,
    isLocal: false,
    isUploading: false,
  },
] as const;

const mockImage: EditingStageValidImage = {
  key: '100',
  imageUrl: 'test',
  isMain: false,
  isSelected: false,
  isLocal: false,
  isUploading: false,
} as const;

describe('Market Product/ Detail / Gallery Info / utils', () => {
  describe('utility areImagesRemote', () => {
    it('should return true if input does not have any local image', () => {
      expect(areImagesRemote(mockValidSubmittableList)).toEqual(true);
    });

    it('should return false if input has at least one local image', () => {
      expect(areImagesRemote([
        ...mockValidSubmittableList,
        {
          key: '1',
          imageUrl: 'test',
          isMain: false,
          isSelected: false,
          isLocal: true,
        },
      ])).toEqual(false);
    });
  });

  describe('utility imagesHaveOnlyOneMainImage', () => {
    it('should return true if input list has only one local image', () => {
      expect(imagesHaveOnlyOneMainImage(mockValidSubmittableList)).toEqual(true);
    });

    it('should return false if input has no main image', () => {
      expect(imagesHaveOnlyOneMainImage([{
        key: '0',
        imageUrl: 'test',
        isMain: false,
        isSelected: false,
        isLocal: false,
      }])).toEqual(false);
    });

    it('should return false if input has more than one main image', () => {
      expect(imagesHaveOnlyOneMainImage([
        ...mockValidSubmittableList,
        {
          key: '0',
          imageUrl: 'test',
          isMain: true,
          isSelected: false,
          isLocal: false,
        },
      ])).toEqual(false);
    });
  });

  describe('utility getInitialWideImages', () => {
    it('should return correct list format', () => {
      expect(getInitialWideImages(
        {
          tr: 'tr',
          en: 'en',
        },
        ['tr', 'en'],
      )).toEqual({
        tr: [{
          imageUrl: 'tr',
          isMain: true,
          isSelected: false,
          isLocal: false,
          isUploading: false,
        }],
        en: [{
          imageUrl: 'en',
          isMain: true,
          isSelected: false,
          isLocal: false,
          isUploading: false,
        }],
      });
    });
  });

  describe('utility getInitialProductImages', () => {
    it('should return correct product image gallery list in correct form', () => {
      expect(getInitialProductImages(
        {
          tr: [
            'url1',
            'url2',
            'url3',
          ],
          en: [
            'url1',
            'url2',
            'url3',
          ],
        },
        {
          tr: 'url2',
          en: 'url3',
        },
        ['tr', 'en'],
      )).toEqual({
        tr: [
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url1',
          },
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url2',
            isMain: true,
          },
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url3',
          },
        ],
        en: [
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url1',
          },
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url2',
          },
          {
            ...mockImage,
            key: expect.anything(),
            imageUrl: 'url3',
            isMain: true,
          },
        ],
      });
    });
  });

  describe('utility progressImagesInQueueToUploading', () => {
    it('should return the image list with uploading images have property isUploading is true', () => {
      const mockQueuedImageEn = {
        ...mockImage,
        key: '20',
        isLocal: true,
        isUploading: false,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const mockQueuedImageTr = {
        ...mockImage,
        key: '21',
        isLocal: true,
        isUploading: false,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const initialImages = {
        tr: [
          ...mockValidSubmittableList,
          mockQueuedImageTr,
        ],
        en: [
          mockQueuedImageEn,
        ],
      };

      const { foundQueuedImages, progressedImages } = progressImagesInQueueToUploading(initialImages);

      expect(foundQueuedImages).toEqual([
        mockQueuedImageTr,
        mockQueuedImageEn,
      ]);

      expect(progressedImages).toEqual({
        tr: [
          ...mockValidSubmittableList,
          {
            ...mockQueuedImageTr,
            isUploading: true,
          },
        ],
        en: [{
          ...mockQueuedImageEn,
          isUploading: true,
        }],
      });
    });
  });

  describe('utility progressUploadingImagesToFailed', () => {
    it('should return the image list with errored images have property isFailed is true', () => {
      const mockFailedImageEn = {
        ...mockImage,
        key: '20',
        isLocal: true,
        isUploading: true,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const mockFailedImageTr = {
        ...mockImage,
        key: '21',
        isLocal: true,
        isUploading: true,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const initialImages = {
        tr: [
          ...mockValidSubmittableList,
          mockFailedImageTr,
        ],
        en: [
          mockFailedImageEn,
        ],
      };

      const failedImages = [
        { key: mockFailedImageEn.key },
        { key: mockFailedImageTr.key },
      ];

      const progressedImages = progressUploadingImagesToFailed(initialImages, failedImages);

      expect(progressedImages).toEqual({
        tr: [
          ...mockValidSubmittableList,
          {
            ...mockFailedImageTr,
            isUploading: false,
            isFailed: true,
          },
        ],
        en: [{
          ...mockFailedImageEn,
          isUploading: false,
          isFailed: true,
        }],
      });
    });

    it('should return undefined if no errored images found', () => {
      const mockFailedImageEn = {
        ...mockImage,
        key: '20',
        isLocal: true,
        isUploading: true,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const mockFailedImageTr = {
        ...mockImage,
        key: '21',
        isLocal: true,
        isUploading: true,
        isFailed: false,
        extension: 'jpeg',
        isMain: false,
        isSelected: false,
      } as const;

      const initialImages = {
        tr: [
          ...mockValidSubmittableList,
          mockFailedImageTr,
        ],
        en: [
          mockFailedImageEn,
        ],
      };

      const failedImages = [
        { key: '999' },
      ];

      const progressedImages = progressUploadingImagesToFailed(initialImages, failedImages);
      expect(progressedImages).toEqual(undefined);
    });

    describe('utility progressUploadedImagesToRemote', () => {
      it('should return the image list with uploaded images have property isLocal as false', () => {
        const mockUploadingImageEn = {
          ...mockImage,
          key: '20',
          isLocal: true,
          isUploading: true,
          isFailed: false,
          extension: 'jpeg',
          isMain: false,
          isSelected: false,
        } as const;

        const mockUploadingImageTr = {
          ...mockImage,
          key: '21',
          isLocal: true,
          isUploading: true,
          isFailed: false,
          extension: 'jpeg',
          isMain: false,
          isSelected: false,
        } as const;

        const initialImages = {
          tr: [
            ...mockValidSubmittableList,
            mockUploadingImageTr,
          ],
          en: [
            mockUploadingImageEn,
          ],
        };

        const uploadedImages = [
          { key: mockUploadingImageEn.key, cdnUrl: 'en' },
          { key: mockUploadingImageTr.key, cdnUrl: 'tr' },
        ];

        const progressedImages = progressUploadedImagesToRemote(initialImages, uploadedImages);

        expect(progressedImages).toEqual({
          tr: [
            ...mockValidSubmittableList,
            {
              key: mockUploadingImageTr.key,
              imageUrl: 'tr',
              isLocal: false,
              isMain: mockUploadingImageTr.isMain,
              isSelected: mockUploadingImageTr.isSelected,
            },
          ],
          en: [{
            key: mockUploadingImageEn.key,
            imageUrl: 'en',
            isLocal: false,
            isMain: mockUploadingImageEn.isMain,
            isSelected: mockUploadingImageEn.isSelected,
          }],
        });
      });

      it('should return undefined if image list have no uploaded images', () => {
        const mockUploadingImageEn = {
          ...mockImage,
          key: '20',
          isLocal: true,
          isUploading: true,
          isFailed: false,
          extension: 'jpeg',
          isMain: false,
          isSelected: false,
        } as const;

        const mockUploadingImageTr = {
          ...mockImage,
          key: '21',
          isLocal: true,
          isUploading: true,
          isFailed: false,
          extension: 'jpeg',
          isMain: false,
          isSelected: false,
        } as const;

        const initialImages = {
          tr: [
            ...mockValidSubmittableList,
            mockUploadingImageTr,
          ],
          en: [
            mockUploadingImageEn,
          ],
        };

        const uploadedImages = [
          { key: '99', cdnUrl: 'a' },
        ];

        const progressedImages = progressUploadedImagesToRemote(initialImages, uploadedImages);
        expect(progressedImages).toEqual(undefined);
      });
    });
  });

  describe('utility getImagesPayload', () => {
    it('should return the pre request payload data', () => {
      const mockAllImages = {
        tr: mockValidSubmittableList,
        en: [
          {
            ...mockImage,
            key: '0',
            imageUrl: 'mainImageEn',
            isMain: true,
            isSelected: false,
          },
          {
            ...mockImage,
            key: '1',
            imageUrl: 'image',
            isMain: false,
            isSelected: false,
          },
        ],
      } as const;

      const savedImages = [
        ...mockValidSubmittableList,
        {
          ...mockImage,
          key: '99',
        },
      ] as const;

      const { mainImagesPayload, imagesPayload } = getImagesPayload({
        savedImages,
        savedCountryLanguage: 'tr',
        countryLanguages: ['tr', 'en'],
        allImages: mockAllImages,
        overrideOtherLanguages: false,
      });

      expect(mainImagesPayload).toEqual({ tr: mockValidSubmittableList[1].imageUrl });

      expect(imagesPayload).toEqual({ tr: savedImages.map(image => image.imageUrl) });
    });

    it('should override other languages correctly if overrideOtherLanguages is set', () => {
      const mockAllImages = {
        tr: mockValidSubmittableList,
        en: [
          {
            ...mockImage,
            key: '0',
            imageUrl: 'mainImageEn',
            isMain: true,
            isSelected: false,
          },
          {
            ...mockImage,
            key: '1',
            imageUrl: 'image',
            isMain: false,
            isSelected: false,
          },
        ],
      } as const;

      const savedImages = [
        ...mockValidSubmittableList,
        {
          ...mockImage,
          key: '99',
        },
      ] as const;

      const { mainImagesPayload, imagesPayload } = getImagesPayload({
        savedImages,
        savedCountryLanguage: 'tr',
        countryLanguages: ['tr', 'en'],
        allImages: mockAllImages,
        overrideOtherLanguages: true,
      });

      expect(mainImagesPayload).toEqual({
        tr: mockValidSubmittableList[1].imageUrl,
        en: mockValidSubmittableList[1].imageUrl,
      });

      expect(imagesPayload).toEqual({
        tr: savedImages.map(image => image.imageUrl),
        en: savedImages.map(image => image.imageUrl),
      });
    });
  });
});
