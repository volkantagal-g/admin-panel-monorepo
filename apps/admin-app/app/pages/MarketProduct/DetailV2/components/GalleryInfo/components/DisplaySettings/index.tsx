import { useState, useCallback, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Space } from '@shared/components/GUI';
import {
  createMarketProductImageUrlSelector,
  getMarketProductByIdSelector, updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import {
  getImagesPayload,
  getInitialProductImages,
  getInitialWideImages,
  progressUploadingImagesToFailed,
  progressImagesInQueueToUploading,
  progressUploadedImagesToRemote,
} from '../../utils';
import { RemoteImage } from '../../types';
import { PRODUCT_IMAGE_VALID_RATIOS, SUPPORTED_IMAGE_FORMATS, WIDE_IMAGE_VALID_RATIOS } from '../../constants';
import MultiLanguageGallery from '../MultiLanguageGallery';

const DisplaySettings: FC = function DisplaySettings() {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const { _id: marketProductId, picURL, picURLs, widePicURL } = useSelector(getMarketProductByIdSelector.getData);
  const { languageSortOrder: countryLanguages } = useSelector(getSelectedCountryV2);
  const isUpdateProductPending = useSelector(updateMarketProductSelector.getIsPending);
  const isUpdateProductFailed = useSelector(updateMarketProductSelector.getError);
  const uploadedImages = useSelector(createMarketProductImageUrlSelector.getUploadedImages);
  const erroredImages = useSelector(createMarketProductImageUrlSelector.getErroredImages);
  const [currentProductImages, setCurrentProductImages] = useState(() => getInitialProductImages(picURLs, picURL, countryLanguages));
  const [currentWideImages, setCurrentWideImages] = useState(() => getInitialWideImages(widePicURL, countryLanguages));

  const handleCancel = useCallback(() => {
    setCurrentProductImages(getInitialProductImages(picURLs, picURL, countryLanguages));
    setCurrentWideImages(getInitialWideImages(widePicURL, countryLanguages));
  }, [widePicURL, picURLs, picURL, countryLanguages]);

  useEffect(() => {
    handleCancel();
  }, [handleCancel]);

  useEffect(() => {
    const {
      foundQueuedImages: queuedProductImages,
      progressedImages: progressedProductImages,
    } = progressImagesInQueueToUploading(currentProductImages);

    const {
      foundQueuedImages: queuedWideImages,
      progressedImages: progressedWideImages,
    } = progressImagesInQueueToUploading(currentWideImages);

    if (queuedProductImages.length) {
      setCurrentProductImages(progressedProductImages);
    }

    if (queuedWideImages.length) {
      setCurrentWideImages(progressedWideImages);
    }

    [...queuedProductImages, ...queuedWideImages].forEach(
      ({ key, imageUrl, extension }) => dispatch(
        Creators.createMarketProductImageUrlRequest({
          key,
          extension,
          loadedImage: imageUrl,
        }),
      ),
    );
  }, [dispatch, currentProductImages, currentWideImages]);

  useEffect(() => {
    const progressedProductImages = progressUploadedImagesToRemote(currentProductImages, uploadedImages);
    const progressedWideImages = progressUploadedImagesToRemote(currentWideImages, uploadedImages);

    if (progressedProductImages) {
      setCurrentProductImages(progressedProductImages);
    }

    if (progressedWideImages) {
      setCurrentWideImages(progressedWideImages);
    }
  }, [currentWideImages, currentProductImages, uploadedImages]);

  useEffect(() => {
    const progressedProductImages = progressUploadingImagesToFailed(currentProductImages, erroredImages);
    const progressedWideImages = progressUploadingImagesToFailed(currentWideImages, erroredImages);

    if (progressedProductImages) {
      setCurrentProductImages(progressedProductImages);
    }

    if (progressedWideImages) {
      setCurrentWideImages(progressedWideImages);
    }
  }, [currentProductImages, currentWideImages, erroredImages]);

  const handleImageSave = (
    savedImages: RemoteImage[],
    savedCountryLanguage: string,
    overrideOtherLanguages: boolean,
  ) => {
    const {
      mainImagesPayload,
      imagesPayload,
    } = getImagesPayload({
      savedImages,
      savedCountryLanguage,
      countryLanguages,
      allImages: currentProductImages,
      overrideOtherLanguages,
    });

    dispatch(Creators.updateMarketProductRequest(
      {
        id: marketProductId,
        body: {
          picURL: mainImagesPayload,
          picURLs: imagesPayload,
        },
      },
    ));
  };

  const handleWideImageSave = (
    savedImages: RemoteImage[],
    savedCountryLanguage: string,
    overrideOtherLanguages: boolean,
  ) => {
    const { mainImagesPayload } = getImagesPayload({
      savedImages,
      savedCountryLanguage,
      allImages: currentWideImages,
      countryLanguages,
      overrideOtherLanguages,
    });

    dispatch(Creators.updateMarketProductRequest(
      {
        id: marketProductId,
        body: { widePicURL: mainImagesPayload },
      },
    ));
  };

  return (
    <Space title={t('GALLERY.DISPLAY_SETTINGS.TITLE')}>
      <MultiLanguageGallery
        label={t('GALLERY.DISPLAY_SETTINGS.PRODUCT_IMAGE')}
        currentImages={currentProductImages}
        updateIsPending={isUpdateProductPending}
        updateIsFailed={isUpdateProductFailed}
        validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
        supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
        maxImageSizeInMB={4}
        onSave={handleImageSave}
        onChange={setCurrentProductImages}
        onCancel={handleCancel}
        imageHeight={150}
      />
      <MultiLanguageGallery
        label={t('GALLERY.DISPLAY_SETTINGS.WIDE_IMAGE')}
        currentImages={currentWideImages}
        updateIsPending={isUpdateProductPending}
        updateIsFailed={isUpdateProductFailed}
        singleImage
        wideImage
        validImageRatios={WIDE_IMAGE_VALID_RATIOS}
        supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
        maxImageSizeInMB={4}
        onSave={handleWideImageSave}
        onChange={setCurrentWideImages}
        onCancel={handleCancel}
        imageWidth="auto"
        imageHeight={150}
      />
    </Space>
  );
};

export default DisplaySettings;
