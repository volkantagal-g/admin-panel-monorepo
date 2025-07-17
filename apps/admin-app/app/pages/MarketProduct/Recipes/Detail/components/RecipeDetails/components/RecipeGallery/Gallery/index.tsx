import { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, ImageProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Image } from '@shared/components/GUI/Image';
import { Button } from '@shared/components/GUI/Button';

import useStyles from './styles';
import { getCoverImageAltText, getGalleryInitialIndex } from './utils';

import { EditingStageValidImage } from '../types';

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

  useEffect(() => {
    setCurrentImageIndex(getGalleryInitialIndex(images, mainImageOnCover));
  }, [images, mainImageOnCover]);

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
          {isCurrentImageFailed && (
            <span className={classes.failIndicator}>
              ({t('GALLERY.GALLERY_CARD.FAILED_IMAGE')})
            </span>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Image
          // @ts-ignore
          alt={imageAltText}
          src={images?.[currentImageIndex]?.imageUrl}
          width={imageWidth}
          height={imageHeight}
        />
      </Row>
      <div>
        <Row className="mt-2" align="middle">
          <Col span={6} />
          <Col span={12} />
          <Col span={6} className={classes.textAlignRight}>
            {onEditClick && (
              <Button
                aria-label={t('global:EDIT')}
                // @ts-ignore
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
