import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PLACEHOLDER_IMAGE from '@shared/assets/images/placeholder/2_1.jpg';
import ImageUploader from '@shared/components/UI/ImageUploader';
import { Creators } from '@app/pages/Banner/Detail/redux/actions';
import { COMPONENT_TYPE, FILE_UPLOAD_STATE_KEY } from '@app/pages/Banner/constants';
import { fileUploadSelector } from '@app/pages/Banner/Detail/redux/selectors';
import { rules } from '@shared/utils/marketing/formUtils';
import { imageCarousel, supportedFileTypes } from '@app/pages/Banner/constantValues';

const ImageCarousel = ({ form, phoneLanguages, contentFieldNamePrefix, componentType, lang, isFormEditable }) => {
  return (
    <Row gutter={24} className="mt-2">
      {Object.keys(imageCarousel).map(key => {
        if (imageCarousel[key].eligableComponentTypes.includes(componentType)) {
          return (
            <CarouselItem
              key={imageCarousel[key]?.name}
              form={form}
              carouselItem={imageCarousel[key]}
              contentFieldNamePrefix={contentFieldNamePrefix}
              phoneLanguages={phoneLanguages}
              lang={lang}
              isFormEditable={isFormEditable}
              componentType={componentType}
            />
          );
        }
        return null;
      })}
    </Row>
  );
};

const CarouselItem = ({ form, contentFieldNamePrefix, phoneLanguages, componentType, lang, carouselItem, isFormEditable }) => {
  const dispatch = useDispatch();
  const isImageLoading = useSelector(fileUploadSelector.isBannerContentImagePending);

  return (
    <Col lg={componentType === COMPONENT_TYPE.MINI ? 24 : 12} key={carouselItem.cdnUrlFieldName}>
      <Form.Item
        rules={rules.onlyRequired}
        name={[contentFieldNamePrefix, lang, carouselItem.name]}
        preserve={false}
        key={carouselItem.name}
        className="my-0 d-none"
      >
        <input type="text" />
      </Form.Item>
      <Form.Item
        name={[contentFieldNamePrefix, lang, carouselItem.cdnUrlFieldName]}
        rules={rules.onlyRequired}
        preserve={false}
        key={carouselItem.cdnUrlFieldName}
        className="my-0"
      >
        <>
          <p><b>{carouselItem.label} ({lang.toUpperCase()})</b></p>
          <a href={form.getFieldValue([contentFieldNamePrefix, lang, carouselItem.cdnUrlFieldName])} target="_blank" rel="noreferrer">
            <img
              aria-hidden
              src={form.getFieldValue([contentFieldNamePrefix, lang, carouselItem.cdnUrlFieldName]) || PLACEHOLDER_IMAGE}
              className="w-100"
              alt={`Placeholder Image ${lang}`}
            />
          </a>
          <ImageUploader
            supportedFileTypes={supportedFileTypes}
            isAppliedToOtherLanguangesProp={false}
            disabled={isImageLoading || !isFormEditable}
            onOkayClick={(loadedImage, file, isAppliedToOtherLanguanges) => {
              const setImageField = ({ phoneLang, cdnUrl, imageName }) => {
                form.setFields([{ name: [contentFieldNamePrefix, phoneLang, carouselItem.cdnUrlFieldName], value: cdnUrl }]);
                form.setFields([{ name: [contentFieldNamePrefix, phoneLang, carouselItem.name], value: imageName }]);
              };

              const onUploadSuccess = ({ cdnUrl, imageName }) => {
                if (isAppliedToOtherLanguanges) {
                  phoneLanguages.forEach(phoneLanguage => {
                    setImageField({ phoneLang: phoneLanguage, cdnUrl, imageName });
                  });
                }
                else {
                  setImageField({ phoneLang: lang, cdnUrl, imageName });
                }
              };

              dispatch(Creators.uploadFilesToS3Request({
                content: {
                  loadedImage,
                  file,
                  isAppliedToOtherLanguanges,
                  fileLang: lang,
                  form,
                  fieldName: carouselItem.name,
                },
                fileStateKey: FILE_UPLOAD_STATE_KEY.BANNER_CONTENT_IMAGE,
                onUploadSuccess,
              }));
            }}
          />
        </>
      </Form.Item>
    </Col>
  );
};

export default ImageCarousel;
