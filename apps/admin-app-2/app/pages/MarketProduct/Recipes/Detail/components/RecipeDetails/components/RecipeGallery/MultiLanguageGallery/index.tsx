import { useState, useMemo, FC, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

import { ImageSettingsModal, ImageSettingsModalProps } from '../ImageSettingsModal';
import { Gallery, GalleryProps } from '../Gallery';
import {
  EditingStageValidImage,
  MultiLanguageGalleryImages, RemoteImage,
  SupportedImageFormat,
  ValidImageRatio,
} from '../types';

import useStyles from './styles';

export type MultiLanguageGalleryProps = {
  label: ReactNode;
  currentImages: MultiLanguageGalleryImages;
  updateIsPending?: boolean,
  updateIsFailed?: boolean,
  singleImage?: boolean;
  wideImage?: boolean;
  validImageRatios: readonly ValidImageRatio[];
  supportedFileTypes: readonly SupportedImageFormat[];
  maxImageSizeInMB: number;
  imageWidth?: GalleryProps['imageWidth'];
  imageHeight?: GalleryProps['imageWidth'];
  onSave: (images: RemoteImage[], countryLanguage: string, overrideOtherLanguages: boolean) => void;
  onChange: Dispatch<SetStateAction<MultiLanguageGalleryImages>>;
  onCancel: () => void;
};

const MultiLanguageGallery: FC<MultiLanguageGalleryProps> = props => {
  const {
    label,
    currentImages,
    updateIsPending,
    updateIsFailed,
    singleImage,
    wideImage,
    validImageRatios,
    supportedFileTypes,
    maxImageSizeInMB,
    imageWidth,
    imageHeight,
    onSave,
    onChange,
    onCancel,
  } = props;

  const classes = useStyles();
  const { languageSortOrder: countryLanguages } = useSelector(getSelectedCountryV2);
  const [imageSettingsModalCountryLanguage, setImageSettingsModalCountryLanguage] = useState<string>(countryLanguages[0]);
  const [isImageSettingsModalVisible, setIsImageSettingsModalVisible] = useState(false);

  useEffect(() => {
    if (!updateIsPending && !updateIsFailed) {
      setIsImageSettingsModalVisible(false);
    }
  }, [updateIsPending, updateIsFailed]);

  const handleSave: ImageSettingsModalProps['onSave'] = (currentImageList, overrideOtherLanguages) => {
    onSave(currentImageList, imageSettingsModalCountryLanguage, overrideOtherLanguages);
  };

  const handleModalCancel = () => {
    setIsImageSettingsModalVisible(false);
    onCancel();
  };

  const handleChange = (images: EditingStageValidImage[]) => {
    onChange({
      ...currentImages,
      [imageSettingsModalCountryLanguage]: images,
    });
  };

  const galleries = useMemo(() => countryLanguages.map(countryLanguage => {
    return (
      <Col key={countryLanguage} flex={1}>
        <Gallery
          countryLanguage={countryLanguage}
          images={currentImages?.[countryLanguage]}
          onEditClick={() => {
            setImageSettingsModalCountryLanguage(countryLanguage);
            setIsImageSettingsModalVisible(true);
          }}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          wideImage={wideImage}
          mainImageOnCover
        />
      </Col>
    );
  }), [wideImage, countryLanguages, currentImages, imageWidth, imageHeight]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{label}</div>
      <Row gutter={16} align="middle">
        {galleries}
      </Row>
      {isImageSettingsModalVisible && (
        <ImageSettingsModal
          countryLanguage={imageSettingsModalCountryLanguage}
          currentImages={currentImages}
          onSave={handleSave}
          onCancel={handleModalCancel}
          onChange={handleChange}
          updateIsPending={updateIsPending}
          singleImage={singleImage}
          validImageRatios={validImageRatios}
          supportedFileTypes={supportedFileTypes}
          maxImageSizeInMB={maxImageSizeInMB}
        />
      )}
    </div>
  );
};

MultiLanguageGallery.defaultProps = {
  wideImage: false,
  singleImage: false,
  updateIsPending: false,
  updateIsFailed: false,
  imageWidth: undefined,
  imageHeight: undefined,
};

export default MultiLanguageGallery;
