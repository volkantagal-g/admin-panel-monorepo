import { useState, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';

import { Image } from '@shared/components/GUI/Image';
import { Button } from '@shared/components/GUI/Button';
import useStyles from '@shared/components/GUI/Gallery/styles';
import chevronRight from '@shared/assets/GUI/Icons/Solid/ChevronRight.svg';
import chevronLeft from '@shared/assets/GUI/Icons/Solid/ChevronLeft.svg';
import { usePrevious } from '@shared/hooks';

export const Gallery = memo(function Gallery({
  countryLanguage,
  imageList,
  onEditClick,
  hasOnlyOneImage,
  imageWidth,
  imageHeight,
}) {
  const { t } = useTranslation('multiLanguageComponents');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const classes = useStyles();
  const prevImageList = usePrevious(imageList);

  useEffect(() => {
    if (prevImageList?.length !== imageList) {
      setCurrentImageIndex(0);
    }
  }, [imageList, prevImageList?.length]);

  const handleLeftArrowClick = () => {
    if (currentImageIndex < 1) {
      return null;
    }
    return setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleRightArrowClick = () => {
    if (currentImageIndex + 1 >= imageList?.length) {
      return null;
    }
    return setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <div className={classes.galleryContainer}>
      <Row gutter={[12]} justify="end" className="mb-3">
        <Col span={12} className={classes.countryLanguageText}>
          {countryLanguage?.toUpperCase()}
        </Col>
        <Col span={12} className={classes.textAlignRight}>
          {!hasOnlyOneImage && (
            <span>
              {currentImageIndex === 0 ? t('ML_MULTI_IMAGE_UPLOADER.MAIN_IMAGE') : `${currentImageIndex} / ${(imageList?.length || 1) - 1}` }
            </span>
          )}
        </Col>
      </Row>
      <Row span={24} justify="center">
        <Image
          src={imageList[currentImageIndex]?.imageUrl}
          width={imageWidth}
          height={imageHeight}
        />
      </Row>
      <div>
        <Row className="mt-2" align="middle">
          <Col span={6} />
          <Col span={12} className={classes.textAlignCenter}>
            {!hasOnlyOneImage && (
              <Row gutter={[12, 0]} align="middle" justify="center">
                <Col>
                  <Button
                    noBackground
                    color="default"
                    size="small"
                    icon={(<img src={chevronLeft} alt="chevron-left-icon" />)}
                    disabled={currentImageIndex < 1}
                    onClick={handleLeftArrowClick}
                  />
                </Col>
                <Col>
                  <Button
                    noBackground
                    color="default"
                    size="small"
                    icon={(<img src={chevronRight} alt="chevron-right-icon" />)}
                    disabled={imageList.length <= currentImageIndex + 1}
                    onClick={handleRightArrowClick}
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col span={6} className={classes.textAlignRight}>
            {onEditClick && (
              <Button
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
});

Gallery.propTypes = {
  countryLanguage: PropTypes.string,
  imageList: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  onEditClick: PropTypes.func,
  hasOnlyOneImage: PropTypes.bool,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};

Gallery.defaultProps = {
  countryLanguage: '',
  imageList: [],
  onEditClick: undefined,
  hasOnlyOneImage: false,
  imageWidth: undefined,
  imageHeight: undefined,
};

export default Gallery;
