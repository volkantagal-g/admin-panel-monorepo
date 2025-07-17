import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Modal } from 'antd';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { get as lget, toString as ltoString } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import ImageUploader from '@shared/components/UI/ImageUploader';
import Image from '@shared/components/UI/Image';
import useStyles from './styles';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

const MultiLanguageMultiImageUploader = props => {
  const {
    onChangeMainImageUpload,
    onAddImageUpload,
    onRemoveImageOk,
    mainImagePath = ['picURL'],
    otherImagesPath = ['picURLs'],
    data = {},
  } = props;
  const countryLanguages = getSelectedCountryLanguages();

  const { t } = useTranslation('multiLanguageComponents');
  const initialShowImageIndexes = Array(countryLanguages.length).fill().map(() => 0);
  const [shownImageIndexes, setShownImageIndexes] = useState(initialShowImageIndexes);
  const classes = useStyles();
  const [modalRemove, modalRemoveContext] = Modal.useModal();

  const handleRemoveImage = (setIndexesFunc, countryIndex, imageUrlsPath, imageIndex) => {
    const config = {
      content: (
        <>
          {t('ML_MULTI_IMAGE_UPLOADER.REMOVE_IMAGE_MESSAGE')}
        </>
      ),
      icon: null,
      onOk: () => {
        onRemoveImageOk(imageUrlsPath, imageIndex);
        const newImageIndexes = [...shownImageIndexes];
        newImageIndexes[countryIndex] = 0;
        setIndexesFunc(newImageIndexes);
      },
      centered: true,
      okText: t('button:YES'),
      cancelText: t('button:NO'),
    };
    modalRemove.confirm(config);
  };

  const handleLeftArrowClick = (setIndexesFunc, countryIndex, imageIndex) => {
    if (imageIndex < 1) {
      return null;
    }
    const newImageIndexes = [...shownImageIndexes];
    newImageIndexes[countryIndex] = imageIndex - 1;
    return setIndexesFunc(newImageIndexes);
  };

  const handleRightArrowClick = (setIndexesFunc, countryIndex, imageIndex, listLength) => {
    if (imageIndex + 1 >= listLength) {
      return null;
    }
    const newImageIndexes = [...shownImageIndexes];
    newImageIndexes[countryIndex] = imageIndex + 1;
    return setIndexesFunc(newImageIndexes);
  };

  return (
    <>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const mainImagePathByCountry = [...mainImagePath, countryLanguage];
        const otherImagesPathByCountry = [...otherImagesPath, countryLanguage];
        const countryLanguageUpperCase = countryLanguage.toUpperCase();
        const shownImageIndex = shownImageIndexes[countryIndex];
        const mainImageUrl = lget(data, mainImagePathByCountry, '');
        const otherImageUrls = lget(data, otherImagesPathByCountry, []);
        const imageUrlList = [
          mainImageUrl,
          ...otherImageUrls,
        ];
        const imageAlt = `image-${lget(data, '_id')}-${countryLanguage}`;

        const cardFooter = (
          <div className="w-100 mt-2 mb-2">
            <div className="mb-2">
              <ImageUploader
                onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                  onChangeMainImageUpload(loadedImage, file, mainImagePathByCountry, isAppliedToOtherLanguanges);
                }}
                validImageRatios={['1:1']}
                modalTitle={t('ML_MULTI_IMAGE_UPLOADER.CHANGE_MAIN_IMAGE')}
                buttonText={t('ML_MULTI_IMAGE_UPLOADER.CHANGE_MAIN_IMAGE')}
              />
            </div>
            <ImageUploader
              onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
                onAddImageUpload(loadedImage, file, otherImagesPathByCountry, isAppliedToOtherLanguanges);
              }}
              validImageRatios={['1:1']}
              modalTitle={t('ML_MULTI_IMAGE_UPLOADER.ADD_IMAGE')}
              buttonText={t('ML_MULTI_IMAGE_UPLOADER.ADD_IMAGE')}
            />
          </div>
        );

        return (
          <AntCard
            title={`${t('ML_MULTI_IMAGE_UPLOADER.TITLE')} (${countryLanguageUpperCase})`}
            footer={cardFooter}
            bordered={false}
            key={ltoString(countryIndex)}
          >
            <div className={classes.wrapper}>
              <Image
                src={imageUrlList[shownImageIndex]}
                alt={imageAlt}
              />
            </div>
            {otherImageUrls.length > 0 && (
              <div>
                <div key="Item-1" className="text-center mt-2 font-weight-bold">
                  {shownImageIndex === 0 ? t('ML_MULTI_IMAGE_UPLOADER.MAIN_IMAGE') : `${shownImageIndex} / ${otherImageUrls.length}` }
                </div>
                <Row key="Item-2" className="mt-2">
                  <Col flex={1}>
                    <Button
                      className="mr-2"
                      type="default"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      disabled={shownImageIndex < 1}
                      onClick={() => {
                        handleLeftArrowClick(setShownImageIndexes, countryIndex, shownImageIndex);
                      }}
                    />
                    <Button
                      type="default"
                      shape="circle"
                      icon={<ArrowRightOutlined />}
                      disabled={imageUrlList.length <= shownImageIndex + 1}
                      onClick={() => {
                        handleRightArrowClick(setShownImageIndexes, countryIndex, shownImageIndex, imageUrlList.length);
                      }}
                    />
                  </Col>
                  <Col>
                    {shownImageIndex > 0 && (
                      <Button
                        shape="circle"
                        danger
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          handleRemoveImage(setShownImageIndexes, countryIndex, otherImagesPathByCountry, shownImageIndex - 1);
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </AntCard>
        );
      })}
      {modalRemoveContext}
    </>
  );
};

MultiLanguageMultiImageUploader.propTypes = {
  onChangeMainImageUpload: PropTypes.func,
  onAddImageUpload: PropTypes.func,
  onRemoveImageOk: PropTypes.func,
  mainImagePath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  otherImagesPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  data: PropTypes.shape({}),
};

MultiLanguageMultiImageUploader.defaultProps = {
  onChangeMainImageUpload: () => {},
  onAddImageUpload: () => {},
  onRemoveImageOk: () => {},
  mainImagePath: [],
  otherImagesPath: [],
  data: {},
};

export default MultiLanguageMultiImageUploader;
