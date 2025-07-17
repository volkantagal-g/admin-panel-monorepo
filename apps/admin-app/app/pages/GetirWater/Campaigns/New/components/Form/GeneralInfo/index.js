import { useState } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, Upload, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EyeOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import PreviewHTMLContentModal from '@shared/components/PreviewHTMLContentModal';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';

import { createPromoContentHTML } from '../../../../utils/createPromoContentHTML';
import { promoTypeList } from '../../../../utils/promoTypes';
import { targetList, distributionTypes, distributionRates } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import { validationSchema } from '../formHelper';
import useStyles from './styles';

const MAX_PROMO_CODE_COUNT = 20;

const GeneralInfo = ({ form: generalInfoForm }) => {
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();

  const [promoCodeLength, setPromoCodeLength] = useState(MAX_PROMO_CODE_COUNT);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promoHTMLTr, setPromoHTMLTr] = useState('');
  const [promoHTMLEn, setPromoHTMLEn] = useState('');
  const [distributionType, setDistributionType] = useState('');

  const [previewModalContent, setPreviewModalContent] = useState('');
  const distTypeVal = generalInfoForm.getFieldValue('distributionTypes');

  const targetListOptions = convertConstantValuesToSelectOptions(targetList);
  const promoTypes = convertConstantValuesToSelectOptions(promoTypeList);
  const distributionTypesOptions = convertConstantValuesToSelectOptions(distributionTypes, false);

  const promoCodeSuffix = <span>{promoCodeLength}</span>;

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const { defaultImageProps } = useImageProps(Creators);

  const imageProps = { ...defaultImageProps, className: classes.imageUploader };

  const handlePromoCodeChange = e => {
    setPromoCodeLength(MAX_PROMO_CODE_COUNT - e.target.value.length);
  };

  const openPreviewHTML = content => {
    const contentHTML = createPromoContentHTML(content, '');
    setPreviewModalContent(contentHTML);
    setIsModalVisible(true);
  };

  const handlePromoContentHTMLTr = value => {
    setPromoHTMLTr(value);
  };

  const handlePromoContentHTMLEn = value => {
    setPromoHTMLEn(value);
  };

  const handleModalVisible = value => {
    setIsModalVisible(value);
  };

  const createLabel = (label, previewContent) => {
    return (
      <div className={classes.labelWrapper}>
        <div>{t(label)}</div>
        <Button className={classes.iconWrapper} onClick={() => openPreviewHTML(previewContent)}>
          <EyeOutlined />
          {t('PREVIEW')}
        </Button>
      </div>
    );
  };
  const distributionTypeValidator = fieldName => {
    if (distTypeVal === distributionTypes.HYBRID.value) {
      return [
        { required: true },
        {
          validator: () => {
            const distributionTypeRatesValues = generalInfoForm.getFieldsValue(['vendorPercentage', 'firmPercentage', 'getirWaterPercentage']);

            const total = Object.values(distributionTypeRatesValues).reduce((acc, curr) => acc + parseFloat(curr), 0);

            const errors = generalInfoForm.getFieldsError(['vendorPercentage', 'firmPercentage', 'getirWaterPercentage']);

            if (errors) {
              errors.forEach(error => {
                if (error.name[0] !== fieldName) {
                  if (error.errors && error.errors.length > 0) {
                    generalInfoForm.validateFields([error.name[0]]);
                  }
                }
              });
            }

            if (total !== distributionRates.MAX_VALUE) {
              return Promise.reject(new Error(t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.TOTAL_VALUE_MUST_BE_ONE')));
            }

            return Promise.resolve();
          },
        },
      ];
    }
    return [{ required: false }];
  };
  return (
    <AntCard bordered={false} title={t('FORM.GENERAL_INFO.HEAD_TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="target" label={t('FORM.GENERAL_INFO.PROMO_TARGET.TITLE')} rules={validationSchema.target}>
            <Select options={targetListOptions} disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="promoType" label={t('FORM.GENERAL_INFO.PROMO_TYPE.TITLE')} rules={validationSchema.promoType}>
            <Select options={promoTypes} placeholder={t('FORM.GENERAL_INFO.PROMO_TYPE.PLACEHOLDER')} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="code" label={t('FORM.GENERAL_INFO.PROMO_CODE.TITLE')} rules={validationSchema.code}>
            <Input className="w-100" maxLength={20} addonAfter={promoCodeSuffix} onChange={handlePromoCodeChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="maxOrderCount" label={t('FORM.GENERAL_INFO.MAX_ORDER_COUNT.TITLE')} rules={validationSchema.maxOrderCount}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="campaignPriority" label={t('FORM.GENERAL_INFO.PRIORITY.TITLE')} rules={validationSchema.campaignPriority}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="color" label={t('FORM.GENERAL_INFO.COLOR.TITLE')} rules={validationSchema.color}>
            <input id="color" name="color" type="color" className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item name="distributionTypes" required label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.TITLE')} rules={validationSchema.distributionTypes}>
            <Select
              placeholder={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.PLACEHOLDER')}
              onChange={val => setDistributionType(val)}
              options={distributionTypesOptions}
            />
          </Form.Item>
        </Col>
        {
          distributionType === distributionTypes.HYBRID.value && (
            <>
              <Col span={8}>
                <Form.Item
                  initialValue={distributionRates.MIN_VALUE}
                  name="getirWaterPercentage"
                  label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.GETIRWATER_RATE')}
                  rules={distributionTypeValidator('getirWaterPercentage')}
                >
                  <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  initialValue={distributionRates.MIN_VALUE}
                  name="firmPercentage"
                  label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.FIRM_RATE')}
                  rules={distributionTypeValidator('firmPercentage')}
                >
                  <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  initialValue={distributionRates.MIN_VALUE}
                  name="vendorPercentage"
                  label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.VENDOR_RATE')}
                  rules={distributionTypeValidator('vendorPercentage')}
                >
                  <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} />
                </Form.Item>
              </Col>
            </>
          )
        }

      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="titleTr" label={t('FORM.GENERAL_INFO.TITLE.TITLE')} rules={validationSchema.titleTr}>
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="titleEn" label={t('FORM.GENERAL_INFO.TITLE.TITLE')} rules={validationSchema.titleEn}>
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="descriptionTr" label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE')} rules={validationSchema.descriptionTr}>
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="descriptionEn" label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE')} rules={validationSchema.descriptionEn}>
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="accessibilityLabelTr"
            label={t('FORM.GENERAL_INFO.ACCESS_LABEL.TITLE')}
            rules={validationSchema.accessibilityLabelTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="accessibilityLabelEn"
            label={t('FORM.GENERAL_INFO.ACCESS_LABEL.TITLE')}
            rules={validationSchema.accessibilityLabelEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="promoPageTitleTr"
            label={t('FORM.GENERAL_INFO.PROMO_PAGE_TITLE.TITLE_TR')}
            rules={validationSchema.promoPageTitleTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="promoPageTitleEn"
            label={t('FORM.GENERAL_INFO.PROMO_PAGE_TITLE.TITLE_EN')}
            rules={validationSchema.promoPageTitleEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="promoContentUrlTr"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_URL.TITLE_TR')}
            rules={validationSchema.promoContentUrlTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="promoContentUrlEn"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_URL.TITLE_EN')}
            rules={validationSchema.promoContentUrlEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="promoContentSectionTitleTr"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_SECTION_TITLE.TITLE_TR')}
            rules={validationSchema.promoContentSectionTitleTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="promoContentSectionTitleEn"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_SECTION_TITLE.TITLE_EN')}
            rules={validationSchema.promoContentSectionTitleEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="pictureUrlTR"
            valuePropName="fileList"
            label={t('FORM.GENERAL_INFO.PICTURE.TITLE_TR')}
            getValueFromEvent={normFile}
            rules={validationSchema.pictureUrlTR}
          >
            <Upload {...imageProps} listType="picture">
              <Button type="primary" className="w-100">
                {t('FORM.GENERAL_INFO.PICTURE.CHANGE_TR')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="pictureUrlEN"
            valuePropName="fileList"
            label={t('FORM.GENERAL_INFO.PICTURE.TITLE_EN')}
            getValueFromEvent={normFile}
            rules={validationSchema.pictureUrlEN}
          >
            <Upload {...imageProps} listType="picture">
              <Button type="primary" className="w-100">
                {t('FORM.GENERAL_INFO.PICTURE.CHANGE_EN')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="thumbnailUrlTR"
            valuePropName="fileList"
            label={t('FORM.GENERAL_INFO.THUMBNAIL.TITLE_TR')}
            getValueFromEvent={normFile}
            rules={validationSchema.thumbnailUrlTR}
          >
            <Upload {...imageProps} listType="picture">
              <Button type="primary" className="w-100">
                {t('FORM.GENERAL_INFO.THUMBNAIL.CHANGE_TR')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="thumbnailUrlEN"
            valuePropName="fileList"
            label={t('FORM.GENERAL_INFO.THUMBNAIL.TITLE_EN')}
            getValueFromEvent={normFile}
            rules={validationSchema.thumbnailUrlEN}
          >
            <Upload {...imageProps} listType="picture">
              <Button type="primary" className="w-100">
                {t('FORM.GENERAL_INFO.THUMBNAIL.CHANGE_EN')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            initialValue=""
            name="promoContentHTMLTr"
            label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_TR', promoHTMLTr)}
            rules={validationSchema.promoContentHTMLTr}
            className={classes.formItemWrapper}
          >
            <ReactQuill theme="snow" onChange={handlePromoContentHTMLTr} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue=""
            name="promoContentHTMLEn"
            label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_EN', promoHTMLEn)}
            rules={validationSchema.promoContentHTMLEn}
            className={classes.formItemWrapper}
          >
            <ReactQuill theme="snow" onChange={handlePromoContentHTMLEn} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item name="affectedSegments" label={t('FORM.GENERAL_INFO.AFFECTED_SEGMENTS.TITLE')}>
            <Select mode="tags" options={[]} />
          </Form.Item>
        </Col>
      </Row>
      <PreviewHTMLContentModal
        isModalVisible={isModalVisible}
        content={previewModalContent}
        getModalVisible={handleModalVisible}
        modalTitle={t('PREVIEW')}
      />
    </AntCard>
  );
};

export default GeneralInfo;
