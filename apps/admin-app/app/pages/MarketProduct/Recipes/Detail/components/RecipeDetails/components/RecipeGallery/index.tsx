import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useCallback, useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import {
  updateRecipeSelector,
  getRecipeByIdSelector,
  createRecipeImageUrlSelector,
} from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';

import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { Space } from '@shared/components/GUI';

import {
  getImagesPayload,
  getInitialRecipeImages,
  getInitialThumbnailImages,
  progressUploadingImagesToFailed,
  progressImagesInQueueToUploading,
  progressUploadedImagesToRemote,
} from './utils';

import MultiLanguageGallery from './MultiLanguageGallery';
import { RECIPE_IMAGE_VALID_RATIOS, RECIPE_THUMBNAIL_VALID_RATIOS, SUPPORTED_IMAGE_FORMATS } from './constants';
import { RemoteImage } from './types';

const RecipeGallery = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');

  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const picUrlErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    (value: { field: string; }) => value?.field?.startsWith('recipe.picURL'),
  ) || [];

  const thumbnailUrlErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    (value: { field: string; }) => value?.field?.startsWith('recipe.thumbnailUrl'),
  ) || [];

  const galleryErrors = [...picUrlErrors, ...thumbnailUrlErrors];

  const { _id: recipeId, picURL, thumbnailUrl } = useSelector(getRecipeByIdSelector.getData);
  const { languageSortOrder: countryLanguages } = useSelector(getSelectedCountryV2);
  const isUpdateRecipePending = useSelector(updateRecipeSelector.getIsPending);
  const isUpdateRecipeFailed = useSelector(updateRecipeSelector.getError);
  const uploadedImages = useSelector(createRecipeImageUrlSelector.getUploadedImages);
  const erroredImages = useSelector(createRecipeImageUrlSelector.getErroredImages);
  const [currentRecipeImages, setCurrentRecipeImages] = useState(() => getInitialRecipeImages(picURL, countryLanguages));
  const [currentThumbnailImages, setCurrentThumbnailImages] = useState(() => getInitialThumbnailImages(thumbnailUrl, countryLanguages));

  const handleCancel = useCallback(() => {
    setCurrentRecipeImages(getInitialRecipeImages(picURL, countryLanguages));
    setCurrentThumbnailImages(getInitialThumbnailImages(thumbnailUrl, countryLanguages));
  }, [thumbnailUrl, picURL, countryLanguages]);

  useEffect(() => {
    handleCancel();
  }, [handleCancel]);

  useEffect(() => {
    const {
      foundQueuedImages: queuedProductImages,
      progressedImages: progressedProductImages,
    } = progressImagesInQueueToUploading(currentRecipeImages);

    const {
      foundQueuedImages: queuedWideImages,
      progressedImages: progressedWideImages,
    } = progressImagesInQueueToUploading(currentThumbnailImages);

    if (queuedProductImages.length) {
      setCurrentRecipeImages(progressedProductImages);
    }

    if (queuedWideImages.length) {
      setCurrentThumbnailImages(progressedWideImages);
    }

    [...queuedProductImages, ...queuedWideImages].forEach(
      ({ key, imageUrl, extension }) => dispatch(
        Creators.createRecipeImageUrlRequest({
          key,
          extension,
          loadedImage: imageUrl,
        }),
      ),
    );
  }, [dispatch, currentRecipeImages, currentThumbnailImages]);

  useEffect(() => {
    const progressedProductImages = progressUploadedImagesToRemote(currentRecipeImages, uploadedImages);
    const progressedWideImages = progressUploadedImagesToRemote(currentThumbnailImages, uploadedImages);

    if (progressedProductImages) {
      setCurrentRecipeImages(progressedProductImages);
    }

    if (progressedWideImages) {
      setCurrentThumbnailImages(progressedWideImages);
    }
  }, [currentThumbnailImages, currentRecipeImages, uploadedImages]);

  useEffect(() => {
    const progressedProductImages = progressUploadingImagesToFailed(currentRecipeImages, erroredImages);
    const progressedWideImages = progressUploadingImagesToFailed(currentThumbnailImages, erroredImages);

    if (progressedProductImages) {
      setCurrentRecipeImages(progressedProductImages);
    }

    if (progressedWideImages) {
      setCurrentThumbnailImages(progressedWideImages);
    }
  }, [currentRecipeImages, currentThumbnailImages, erroredImages]);

  const handleImageSave = (
    savedImages: RemoteImage[],
    savedCountryLanguage: string,
    overrideOtherLanguages: boolean,
  ) => {
    const { mainImagesPayload } = getImagesPayload({
      savedImages,
      savedCountryLanguage,
      countryLanguages,
      allImages: currentRecipeImages,
      overrideOtherLanguages,
    });

    dispatch(Creators.updateRecipeRequest(
      {
        id: recipeId,
        body: { picURL: mainImagesPayload },
      },
    ));
  };

  const handleThumbnailImageSave = (
    savedImages: RemoteImage[],
    savedCountryLanguage: string,
    overrideOtherLanguages: boolean,
  ) => {
    const { mainImagesPayload } = getImagesPayload({
      savedImages,
      savedCountryLanguage,
      allImages: currentThumbnailImages,
      countryLanguages,
      overrideOtherLanguages,
    });

    dispatch(Creators.updateRecipeRequest(
      {
        id: recipeId,
        body: { thumbnailUrl: mainImagesPayload },
      },
    ));
  };

  return (
    // @ts-ignore
    <Space title={t('DETAILS.GALLERY.TITLE')} errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: galleryErrors }}>
      <Row gutter={8} align="middle">
        <Col flex={1}>
          <MultiLanguageGallery
            label={t('DETAILS.GALLERY.MAIN_PAGE_IMAGE')}
            currentImages={currentThumbnailImages}
            updateIsPending={isUpdateRecipePending}
            updateIsFailed={isUpdateRecipeFailed}
            singleImage
            validImageRatios={RECIPE_THUMBNAIL_VALID_RATIOS}
            supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
            maxImageSizeInMB={14}
            onSave={handleThumbnailImageSave}
            onChange={setCurrentThumbnailImages}
            onCancel={handleCancel}
            imageWidth="auto"
            imageHeight={150}
          />
          <MultiLanguageGallery
            label={t('DETAILS.GALLERY.RECIPE_DETAIL_IMAGE')}
            currentImages={currentRecipeImages}
            updateIsPending={isUpdateRecipePending}
            updateIsFailed={isUpdateRecipeFailed}
            validImageRatios={RECIPE_IMAGE_VALID_RATIOS}
            supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
            singleImage
            maxImageSizeInMB={14}
            onSave={handleImageSave}
            onChange={setCurrentRecipeImages}
            onCancel={handleCancel}
            imageHeight={150}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default RecipeGallery;
