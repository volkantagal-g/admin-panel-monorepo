import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Alert, Col, Row, Tooltip } from 'antd';

import { getMarketProductCategoryByIdSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import MultiLanguageImageUploader from '@shared/components/UI/MultiLanguage/ImageUploader';
import { getFileExtension } from '@shared/utils/common';
import CollapsePanel from '@app/pages/ClientTargeting/components/common/CollapsePanel';
import { imageUploaderPropsObj } from '@app/pages/MarketProduct/Category/Detail/components/ImageInfo/constants';
import PLACEHOLDER_IMAGE_1_1 from '@shared/assets/images/placeholder/1_1.jpg';
import PLACEHOLDER_IMAGE_3_2 from '@shared/assets/images/placeholder/3_2.jpg';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

const ImageInfo = () => {
  const dispatch = useDispatch();
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const { t } = useTranslation('marketProductCategoryPage');
  const { id: marketProductCategoryId } = useParams();

  const handleUpload = domainType => (loadedImage, file, imagePath, isAppliedToOtherLanguages) => {
    const body = { picURL: marketProductCategory?.picURLs?.filter(elem => elem.domainType === domainType)[0]?.picURL || '', domainType };
    dispatch(
      Creators.updateMarketProductCategoryImageUrlRequest({
        id: marketProductCategoryId,
        loadedImage,
        extension: getFileExtension(file?.name),
        body,
        imagePath,
        isAppliedToOtherLanguages,
      }),
    );
  };

  return (
    <>
      {imageUploaderPropsObj.map((
        {
          panelTitle,
          alertTextForSquare,
          alertTextForWide,
          typeForSquare,
          typeForWide,
          domainType,
          validImageRatiosForSquare,
          validImageRatiosForWide,
        },
      ) => {
        const { squarePicURL, widePicURL } = marketProductCategory?.picURLs?.filter(elem => elem.domainType === domainType)[0] || '';
        const isDomainSelected = marketProductCategory?.domainTypes?.includes(domainType);

        return (
          <CollapsePanel header={t(panelTitle)} isParent key={domainType}>
            <Row gutter={24}>
              <Col xs={24} lg={9}>
                <Row>
                  {isDomainSelected && (
                    <Alert className="w-100" type={typeForSquare} message={t(alertTextForSquare)} showIcon />
                  )}
                  <MultiLanguageImageUploader
                    key={`square_${domainType}`}
                    onImageUpload={handleUpload(domainType)}
                    imagePath={['squarePicURL']}
                    data={{
                      squarePicURL,
                      _id: marketProductCategory._id,
                    }}
                    validImageRatios={validImageRatiosForSquare}
                    fallbackImage={PLACEHOLDER_IMAGE_1_1}
                  />
                </Row>
              </Col>
              <Col xs={24} lg={15}>
                <Row>
                  {isDomainSelected && (
                    <Alert className="w-100" type={typeForWide} message={t(alertTextForWide)} showIcon />
                  )}
                  <Tooltip
                    title={domainType === GETIR_DOMAIN_TYPES.GETIR10 && !squarePicURL ? t('IMAGE_INFO.G10_CONDITION') : ''}
                  >
                    <span>
                      <MultiLanguageImageUploader
                        key={`wide_${domainType}`}
                        onImageUpload={handleUpload(domainType)}
                        imagePath={['widePicURL']}
                        data={{
                          widePicURL,
                          _id: marketProductCategory._id,
                        }}
                        validImageRatios={validImageRatiosForWide}
                        fallbackImage={PLACEHOLDER_IMAGE_3_2}
                        disabled={domainType === GETIR_DOMAIN_TYPES.GETIR10 && !squarePicURL}
                      />
                    </span>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
          </CollapsePanel>
        );
      })}
    </>
  );
};

export default ImageInfo;
