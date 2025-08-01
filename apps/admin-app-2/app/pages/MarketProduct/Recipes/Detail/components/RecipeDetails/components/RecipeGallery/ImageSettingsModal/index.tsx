import React, { useState, useMemo, useCallback, FC } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { arrayMove } from '@dnd-kit/sortable';

import { Button, Modal, Radio } from '@shared/components/GUI';
import ImageUploader from '@shared/components/GUI/ImageUploader';
import { getFileExtension } from '@shared/utils/common';
import { ImageList } from '../ImageList';
import { Gallery } from '../Gallery';
import { areImagesRemote, imagesHaveOnlyOneMainImage } from '../utils';
import { EditingStageValidImage, MultiLanguageGalleryImages, RemoteImage, SupportedImageFormat, ValidImageRatio } from '../types';

export type ImageSettingsModalProps = {
  currentImages: MultiLanguageGalleryImages;
  onChange: (images: EditingStageValidImage[]) => void;
  countryLanguage: string;
  onSave: (
    newImages: RemoteImage[],
    overrideOtherLanguages: boolean,
  ) => void;
  onCancel: () => void;
  updateIsPending?: boolean;
  singleImage?: boolean;
  validImageRatios: readonly ValidImageRatio[];
  supportedFileTypes: readonly SupportedImageFormat[];
  maxImageSizeInMB: number;
};

export const ImageSettingsModal: FC<ImageSettingsModalProps> = function ImageSettingsModal(props) {
  const {
    currentImages,
    countryLanguage,
    onSave,
    onChange,
    onCancel,
    updateIsPending,
    singleImage,
    validImageRatios,
    supportedFileTypes,
    maxImageSizeInMB,
  } = props;

  const { t } = useTranslation('marketProductPageV2');
  const [overrideOtherLanguages, setOverrideOtherLanguages] = useState(true);
  const currentLanguageImages = currentImages[countryLanguage];

  const selectedImages = useMemo(
    () => _.filter(currentLanguageImages, _.matchesProperty('isSelected', true)),
    [currentLanguageImages],
  );

  const remainingImagesAfterRemoval = useMemo(
    () => _.reject(currentLanguageImages, _.matchesProperty('isSelected', true)),
    [currentLanguageImages],
  );

  const isImageListValidForSubmit = useMemo(
    () => areImagesRemote(currentLanguageImages) && imagesHaveOnlyOneMainImage(currentLanguageImages),
    [currentLanguageImages],
  );

  const saveButtonProps = useMemo(
    () => (
      { disabled: Boolean(!isImageListValidForSubmit || updateIsPending || !currentLanguageImages.length) }),
    [currentLanguageImages, isImageListValidForSubmit, updateIsPending],
  );

  const handleOverrideOtherLanguagesToggle = () => {
    setOverrideOtherLanguages(current => !current);
  };

  const handleRemoveSelected = () => {
    if (remainingImagesAfterRemoval.length > 0) {
      onChange(remainingImagesAfterRemoval);
    }
  };

  const handleSave = () => {
    if (areImagesRemote(currentLanguageImages)) {
      onSave(currentLanguageImages, overrideOtherLanguages);
    }
  };

  const handleImageAdd = (loadedImageBase64: string, file: UploadFile) => {
    const newImage = {
      key: _.uniqueId(),
      isMain: false,
      isLocal: true,
      isUploading: false,
      isFailed: false,
      imageUrl: loadedImageBase64,
      extension: getFileExtension(file?.name),
      isSelected: false,
    } as const;

    if (singleImage) {
      return onChange([{
        ...newImage,
        isMain: true,
      }]);
    }

    return onChange([
      ...currentLanguageImages,
      newImage,
    ]);
  };

  const handleMainImageChange = useCallback(key => {
    onChange(
      currentLanguageImages.map(image => {
        if (image.key === key) {
          return {
            ...image,
            isMain: true,
            isSelected: false,
          };
        }

        return {
          ...image,
          isMain: false,
        };
      }),
    );
  }, [currentLanguageImages, onChange]);

  const handleSelectionChange = useCallback(selectedImageKeys => {
    onChange(currentLanguageImages.map(image => {
      if (selectedImageKeys.includes(image.key)) {
        return {
          ...image,
          isMain: false,
          isSelected: true,
        };
      }

      return {
        ...image,
        isSelected: false,
      };
    }));
  }, [currentLanguageImages, onChange]);

  const handleRetry = useCallback((key: string) => {
    onChange(currentLanguageImages.map(image => {
      if (image.key === key) {
        return {
          ...image,
          key: _.uniqueId(),
          isUploading: false,
          isFailed: false,
        };
      }

      return image;
    }));
  }, [currentLanguageImages, onChange]);

  const handleSingleImageRemove = useCallback((key: string) => {
    onChange(_.reject(currentLanguageImages, { key }));
  }, [currentLanguageImages, onChange]);

  const handleImageMove = (from: number, to: number) => {
    onChange(arrayMove([...currentLanguageImages], from, to));
  };

  return (
    // @ts-ignore
    <Modal
      title={`${t('GALLERY.IMAGE_SETTINGS_MODAL.TITLE')} ${countryLanguage.toUpperCase()}`}
      width={750}
      visible
      okText={t('button:SAVE')}
      onOk={handleSave}
      okButtonProps={saveButtonProps}
      cancelText={t('button:CLOSE')}
      onCancel={onCancel}
      data-testid={`modal-${countryLanguage}`}
      centered
    >
      <Row gutter={12}>
        <Col span={singleImage ? 12 : 7}>
          <Gallery
            countryLanguage={countryLanguage}
            images={currentLanguageImages}
            imageHeight={100}
          />
          <Row className="mt-2">
            {/* @ts-ignore */}
            <Radio checked={overrideOtherLanguages} onClick={handleOverrideOtherLanguagesToggle}>
              {t('GALLERY.IMAGE_SETTINGS_MODAL.COPY_TO_OTHER_LANGUAGES')}
            </Radio>
          </Row>
        </Col>
        <Col span={singleImage ? 12 : 17}>
          {singleImage && (
            <Row className="mt-2">
              <ImageUploader
                buttonProps={{
                  noBackground: true,
                  color: 'default',
                  size: 'small',
                  icon: <EditOutlined />,
                }}
                onOkayClick={handleImageAdd}
                // @ts-ignore
                validImageRatios={validImageRatios}
                // @ts-ignore
                supportedFileTypes={supportedFileTypes}
                maxImageSizeInMB={maxImageSizeInMB}
              />
            </Row>
          )}
          {!singleImage && (
            <>
              <ImageList
                currentImages={currentLanguageImages}
                onRetry={handleRetry}
                onRemove={handleSingleImageRemove}
                onMainImageChange={handleMainImageChange}
                onSelectionChange={handleSelectionChange}
                onImageMove={handleImageMove}
              />
              <Row className="mt-2" justify="end" align="middle">
                <ImageUploader
                  buttonProps={{
                    noBackground: true,
                    color: 'default',
                    size: 'small',
                    icon: <PlusOutlined />,
                  }}
                  onOkayClick={handleImageAdd}
                  modalTitle={t('GALLERY.IMAGE_SETTINGS_MODAL.ADD_IMAGE')}
                  buttonText={t('GALLERY.IMAGE_SETTINGS_MODAL.ADD_IMAGE')}
                  // @ts-ignore
                  validImageRatios={validImageRatios}
                  // @ts-ignore
                  supportedFileTypes={supportedFileTypes}
                  maxImageSizeInMB={maxImageSizeInMB}
                />
                {/* @ts-ignore */}
                <Button
                  color="danger"
                  onClick={handleRemoveSelected}
                  disabled={selectedImages.length === 0 || remainingImagesAfterRemoval.length === 0}
                >
                  {t('GALLERY.IMAGE_SETTINGS_MODAL.DELETE_SELECTED')}
                </Button>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

ImageSettingsModal.defaultProps = {
  singleImage: false,
  updateIsPending: false,
};

export default ImageSettingsModal;
