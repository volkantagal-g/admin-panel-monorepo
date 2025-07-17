import PropTypes from 'prop-types';
import { get, toString } from 'lodash';
import { Col, Input } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import ImageUploader from '@shared/components/UI/ImageUploader';
import Image from '@shared/components/UI/Image';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { LAYOUT_DIRECTION } from '@shared/shared/constants';
import useStyles from './styles';

const DEFAULT_MAX_IMAGE_SIZE_MB = 4;

const MultiLanguageImageUploader = props => {
  const classes = useStyles();
  const {
    onImageUpload,
    cardTitle = '',
    imagePath = [],
    data = {},
    validImageRatios = [],
    disabled = false,
    layoutDirection = LAYOUT_DIRECTION.VERTICAL,
    filteredLanguages = null,
    maxImageSizeInMB = DEFAULT_MAX_IMAGE_SIZE_MB,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    showImageUrl = false,
    fallbackImage,
    className,
  } = props;

  let languages = getSelectedCountryLanguages();
  if (filteredLanguages) {
    languages = languages.filter(lang => {
      return filteredLanguages[filteredLanguages.findIndex(filteredLang => filteredLang === lang)] === lang;
    });
  }

  return (
    <>
      {languages.map((countryLanguage, countryIndex) => {
        const imagePathByCountry = [...imagePath, countryLanguage];
        const imageUrl = get(data, imagePathByCountry, '');
        const imageAlt = `image-${get(data, '_id')}-${countryLanguage}`;
        const countryLanguageUpperCase = countryLanguage.toUpperCase();
        const title = `${cardTitle} (${countryLanguageUpperCase})`;
        const cardFooter = (
          <div className="w-100">
            <ImageUploader
              onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                onImageUpload(loadedImage, file, imagePathByCountry, isAppliedToOtherLanguanges, countryLanguage);
              }}
              disabled={disabled}
              validImageRatios={validImageRatios}
              maxImageSizeInMB={maxImageSizeInMB}
              maxWidth={maxWidth}
              minWidth={minWidth}
              maxHeight={maxHeight}
              minHeight={minHeight}
            />
          </div>
        );

        return (
          <Col className={className} span={layoutDirection === LAYOUT_DIRECTION.VERTICAL ? '24' : '6'} key={toString(countryIndex)}>
            <AntCard
              footer={cardFooter}
              bordered={false}
              title={title}
            >
              {imageUrl && showImageUrl &&
                <Input className="mb-3" placeholder={imageAlt} value={imageUrl} readOnly disabled={disabled} />}
              <div className={classes.wrapper}>
                <Image
                  fallbackImage={fallbackImage}
                  src={imageUrl}
                  alt={imageAlt}
                />
              </div>
            </AntCard>
          </Col>
        );
      })}
    </>
  );
};

MultiLanguageImageUploader.propTypes = {
  onImageUpload: PropTypes.func,
  cardTitle: PropTypes.string,
  imagePath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  data: PropTypes.shape({}),
  validImageRatios: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  disabled: PropTypes.bool,
  layoutDirection: PropTypes.string,
  filteredLanguages: PropTypes.oneOfType([
    PropTypes.array,
    // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
    PropTypes.object,
  ]),
  maxImageSizeInMB: PropTypes.number,
  maxWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  showImageUrl: PropTypes.bool,
  fallbackImage: PropTypes.string,
  className: PropTypes.string,
};

MultiLanguageImageUploader.defaultProps = {
  onImageUpload: () => {},
  cardTitle: '',
  imagePath: [],
  data: {},
  validImageRatios: [],
  disabled: false,
  layoutDirection: LAYOUT_DIRECTION.VERTICAL,
  filteredLanguages: null,
  maxImageSizeInMB: DEFAULT_MAX_IMAGE_SIZE_MB,
  maxWidth: undefined,
  minWidth: undefined,
  maxHeight: undefined,
  minHeight: undefined,
  showImageUrl: false,
  fallbackImage: undefined,
  className: undefined,
};

export default MultiLanguageImageUploader;
