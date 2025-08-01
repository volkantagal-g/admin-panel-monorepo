import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get, pick } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getBadgeSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

import MultiLanguageImageUploader from '@shared/components/UI/MultiLanguage/ImageUploader';
import { getFileExtension } from '@shared/utils/common';
import { IMAGE_VALIDATION } from '@app/pages/MarketProduct/constants';

const ImageInfo = () => {
  const { t } = useTranslation('marketProductBadgePage');
  const dispatch = useDispatch();
  const badge = useSelector(getBadgeSelector.getData) || {};
  const { id: badgeId } = useParams();
  const countryLanguages = getSelectedCountryLanguages();

  const handleUpload = (loadedImage, file, imagePath, isAppliedToOtherLanguanges) => {
    let body = { picUrl: get(badge, 'picUrl', {}) };
    if (isAppliedToOtherLanguanges) {
      const countryLanguageObj = {};
      countryLanguages.forEach(country => {
        countryLanguageObj[country] = '';
      });
      body = { picUrl: { ...countryLanguageObj, ...get(badge, 'picUrl', {}) } };
    }
    dispatch(Creators.updateBadgeImageUrlRequest({
      id: badgeId,
      loadedImage,
      extension: getFileExtension(file?.name),
      body,
      imagePath,
      isAppliedToOtherLanguanges,
    }));
  };

  return (
    <MultiLanguageImageUploader
      cardTitle={t('IMAGE_INFO.TITLE')}
      onImageUpload={handleUpload}
      imagePath={['picUrl']}
      isSmallImage
      maxHeight={IMAGE_VALIDATION.BADGE.MAX_HEIGHT}
      maxWidth={IMAGE_VALIDATION.BADGE.MAX_WIDTH}
      validImageRatios={IMAGE_VALIDATION.BADGE.VALID_IMAGE_RATIOS}
      data={pick(badge, ['picUrl', '_id'])}
    />
  );
};

export default ImageInfo;
