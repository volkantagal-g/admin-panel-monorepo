import { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, ImageProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Image } from '@shared/components/GUI/Image';
import { Button } from '@shared/components/GUI/Button';
import chevronRight from '@shared/assets/GUI/Icons/Solid/ChevronRight.svg';
import chevronLeft from '@shared/assets/GUI/Icons/Solid/ChevronLeft.svg';

import useStyles from './styles';
import { getCoverImageAltText, getGalleryInitialIndex } from './utils';

import { EditingStageValidImage } from '../../types';

export type GalleryProps = {
  countryLanguage: string;
  images: readonly EditingStageValidImage[];
  onEditClick?: () => void;
  imageWidth?: ImageProps['width'];
  imageHeight?: ImageProps['height'];
  wideImage?: boolean;
  mainImageOnCover?: boolean;
};

export const Gallery: FC<GalleryProps> = function Gallery({
  countryLanguage,
  images,
  onEditClick,
  imageWidth,
  imageHeight,
  mainImageOnCover = false,
  wideImage,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(() => getGalleryInitialIndex(images, mainImageOnCover));

  const currentImage = images?.[currentImageIndex];
  const isCurrentImageMain = currentImage?.isMain;
  const isCurrentImageFailed = currentImage?.isLocal && currentImage.isFailed;
  const hasMultipleImages = images.length > 1;
  const canScrollLeft = currentImageIndex > 0;
  const canScrollRight = currentImageIndex + 1 < images?.length;

  useEffect(() => {
    setCurrentImageIndex(getGalleryInitialIndex(images, mainImageOnCover));
  }, [images, mainImageOnCover]);

  const handleLeftArrowClick = () => {
    if (canScrollLeft) {
      setCurrentImageIndex(current => current - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (canScrollRight) {
      setCurrentImageIndex(current => current + 1);
    }
  };

  const imageAltText = getCoverImageAltText({
    t,
    countryLanguage,
    isMain: isCurrentImageMain,
    isWideImage: wideImage,
  });

  return (
    <div data-testid={`gallery-${countryLanguage}`} className={classes.galleryContainer}>
      <Row gutter={12} justify="end" className="mb-3">
        <Col flex="auto" className={classes.countryLanguageText}>
          {countryLanguage.toUpperCase()}
        </Col>
        <Col flex="auto" className={classes.indicators}>
          {hasMultipleImages && (
            <>
              <span>
                {`${currentImageIndex + 1} / ${(images.length || 1)}`}
              </span>
              {isCurrentImageMain && (
                <span>
                  ({t('GALLERY.GALLERY_CARD.MAIN_IMAGE')})
                </span>
              )}
            </>
          )}
          {isCurrentImageFailed && (
            <span className={classes.failIndicator}>
              ({t('GALLERY.GALLERY_CARD.FAILED_IMAGE')})
            </span>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Image
          alt={imageAltText}
          src={images?.[currentImageIndex]?.imageUrl}
          width={imageWidth}
          height={imageHeight}
        />
      </Row>
      <div>
        <Row className="mt-2" align="middle">
          <Col span={6} />
          <Col span={12} className={classes.textAlignCenter}>
            {hasMultipleImages && (
              <Row gutter={[12, 0]} align="top" justify="center">
                <Col>
                  <Button
                    noBackground
                    aria-label={t('global:PREV')}
                    color="default"
                    size="small"
                    icon={<img src={chevronLeft} alt="" />}
                    disabled={!canScrollLeft}
                    onClick={handleLeftArrowClick}
                  />
                </Col>
                <Col>
                  <Button
                    noBackground
                    aria-label={t('global:NEXT')}
                    color="default"
                    size="small"
                    icon={<img src={chevronRight} alt="" />}
                    disabled={!canScrollRight}
                    onClick={handleRightArrowClick}
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col span={6} className={classes.textAlignRight}>
            {onEditClick && (
              <Button
                aria-label={t('global:EDIT')}
                size="small"
                color="secondary"
                icon={<EditOutlined />}
                onClick={onEditClick}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

Gallery.defaultProps = {
  onEditClick: undefined,
  imageWidth: undefined,
  imageHeight: undefined,
  mainImageOnCover: false,
  wideImage: false,
};

export default Gallery;
