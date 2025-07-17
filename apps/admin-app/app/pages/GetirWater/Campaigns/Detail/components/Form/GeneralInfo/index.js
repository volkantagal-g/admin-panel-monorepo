import { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, Upload, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EyeOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';
import PreviewHTMLContentModal from '@shared/components/PreviewHTMLContentModal';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';
import { checkContentValues } from '@app/pages/GetirWater/utils/checkContentValues';

import { createPromoContentHTML } from '../../../../utils/createPromoContentHTML';
import { promoTypeList } from '../../../../utils/promoTypes';
import { targetList, distributionTypes, distributionRates } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import { validationSchema } from '../formHelper';
import useStyles from './styles';
import createCampaignBody from '@app/pages/GetirWater/Campaigns/utils/createCampaignBody';

const bodyPattern = /<main.*?>([\s\S]*)<\/main>/;
const MAX_PROMO_CODE_COUNT = 20;

const GeneralInfo = ({ values, availableTimes, setPromoType }) => {
  const { id } = useParams();
  const [generalInfoForm] = Form.useForm();
  const dispatch = useDispatch();

  const distTypeVal = generalInfoForm.getFieldValue('distributionTypes');

  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();
  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.GENERAL_INFO.HEAD_TITLE', 'edit-general-info');

  const [promoCodeLength, setPromoCodeLength] = useState(MAX_PROMO_CODE_COUNT);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promoHTMLTr, setPromoHTMLTr] = useState(checkContentValues(values, 'promoContentHTMLTr'));
  const [promoHTMLEn, setPromoHTMLEn] = useState(checkContentValues(values, 'promoContentHTMLEn'));
  const [previewModalContent, setPreviewModalContent] = useState('');
  const [distributionType, setDistributionType] = useState('');

  const targetListOptions = convertConstantValuesToSelectOptions(targetList);
  const promoTypes = convertConstantValuesToSelectOptions(promoTypeList);
  const distributionTypesOptions = convertConstantValuesToSelectOptions(distributionTypes, false);

  const promoCodeSuffix = <span>{promoCodeLength}</span>;

  useEffect(() => {
    if (Object.keys(values).length && values.promoCode) {
      setPromoCodeLength(MAX_PROMO_CODE_COUNT - values.promoCode.length);
    }
  }, [values]);

  useEffect(() => {
    const costDistribution = _.get(values, 'costDistribution', {});
    const isHybrid = Object.keys(costDistribution).filter(key => costDistribution[key] !== 0).length > 1;
    const distributionTypeValue = isHybrid ? distributionTypes.HYBRID.value : Object.keys(costDistribution)
      .filter(key => costDistribution[key] === distributionRates.MAX_VALUE)[0];
    generalInfoForm.setFieldsValue({
      ...values,
      distributionTypes: distributionTypeValue,
      target: _.get(values, 'promoTarget', undefined),
      code: _.get(values, 'promoCode', undefined),
      campaignPriority: _.get(values, 'priority', undefined),
      promoUrlTr: _.get(values, 'promoURLTr', ''),
      promoUrlEn: _.get(values, 'promoURLEn', ''),
      promoContentHTMLTr: _.isNull(bodyPattern.exec(values.promoContentHTMLTr))
        ? _.get(values, 'promoContentHTMLEn', '')
        : bodyPattern.exec(values.promoContentHTMLTr)[1],
      promoContentHTMLEn: _.isNull(bodyPattern.exec(values.promoContentHTMLEn))
        ? _.get(values, 'promoContentHTMLEn', '')
        : bodyPattern.exec(values.promoContentHTMLEn)[1],
      promoContentUrlTr: _.get(values, 'promoContentURLTr', undefined),
      promoContentUrlEn: _.get(values, 'promoContentURLEn', undefined),
      promoType: _.get(values, 'promoType', undefined),
      pictureUrlTR: [
        {
          uid: '-1',
          url: values.picURLTr,
        },
      ],
      pictureUrlEN: [
        {
          uid: '-1',
          url: values.picURLEn,
        },
      ],
      thumbnailUrlTR: [
        {
          uid: '-1',
          url: values.thumbnailURLTr,
        },
      ],
      thumbnailUrlEN: [
        {
          uid: '-1',
          url: values.thumbnailURLEn,
        },
      ],
    });
    if (isHybrid) {
      generalInfoForm.setFieldsValue({
        getirWaterPercentage: costDistribution.GETIR_WATER,
        firmPercentage: costDistribution.FIRM,
        vendorPercentage: costDistribution.VENDOR,
      });
      setDistributionType(distributionTypes.HYBRID.value);
    }
  }, [values, generalInfoForm]);

  const onFinishGeneralInfo = formValues => {
    const resultData = createCampaignBody(formValues, availableTimes, 'generalInfo');
    dispatch(
      Creators.updateCampaignRequest({
        data: { generalInfoSection: resultData },
        campaignId: id,
      }),
    );
  };

  const handleValuesChange = changedValues => {
    if (_.get(changedValues, 'promoType')) {
      setPromoType(generalInfoForm.getFieldValue('promoType'));
    }
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const { defaultImageProps } = useImageProps(Creators);

  const imageProps = { ...defaultImageProps, className: classes.imageUploader };

  const openPreviewHTML = content => {
    const contentHTML = createPromoContentHTML(content, '');
    setPreviewModalContent(contentHTML);
    setIsModalVisible(true);
  };

  const handlePromoContentHTMLTr = htmlBodyString => {
    setPromoHTMLTr(htmlBodyString);
  };

  const handlePromoContentHTMLEn = htmlBodyString => {
    setPromoHTMLEn(htmlBodyString);
  };

  const handleModalVisible = value => {
    setIsModalVisible(value);
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

            if (total !== 1) {
              return Promise.reject(new Error(t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.TOTAL_VALUE_MUST_BE_ONE')));
            }

            return Promise.resolve();
          },
        },
      ];
    }
    return [{ required: false }];
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

  return (
    <Form
      id="edit-general-info"
      onFinish={onFinishGeneralInfo}
      layout="vertical"
      form={generalInfoForm}
      onValuesChange={handleValuesChange}
    >
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item name="target" label={t('FORM.GENERAL_INFO.PROMO_TARGET.TITLE')} rules={validationSchema.target}>
              <Select options={targetListOptions} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="promoType" label={t('FORM.GENERAL_INFO.PROMO_TYPE.TITLE')} rules={validationSchema.promoType}>
              <Select options={promoTypes} disabled placeholder={t('FORM.GENERAL_INFO.PROMO_TYPE.PLACEHOLDER')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="code" label={t('FORM.GENERAL_INFO.PROMO_CODE.TITLE')} rules={validationSchema.code}>
              <Input disabled className="w-100" maxLength={20} addonAfter={promoCodeSuffix} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item name="maxOrderCount" label={t('FORM.GENERAL_INFO.MAX_ORDER_COUNT.TITLE')} rules={validationSchema.maxOrderCount}>
              <InputNumber className="w-100" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="campaignPriority" label={t('FORM.GENERAL_INFO.PRIORITY.TITLE')} rules={validationSchema.campaignPriority}>
              <InputNumber className="w-100" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="color" label={t('FORM.GENERAL_INFO.COLOR.TITLE')} rules={validationSchema.color}>
              <input name="color" type="color" className="w-100" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item name="distributionTypes" label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.TITLE')} rules={validationSchema.distributionTypes}>
              <Select
                disabled={!isEditable}
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
                    <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} disabled={!isEditable} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    initialValue={distributionRates.MIN_VALUE}
                    name="firmPercentage"
                    label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.FIRM_RATE')}
                    rules={distributionTypeValidator('firmPercentage')}

                  >
                    <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} disabled={!isEditable} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    initialValue={distributionRates.MIN_VALUE}
                    name="vendorPercentage"
                    label={t('FORM.GENERAL_INFO.DISTRIBUTION_TYPE.VENDOR_RATE')}
                    rules={distributionTypeValidator('vendorPercentage')}
                  >
                    <Input type="number" max={distributionRates.MAX_VALUE} min={distributionRates.MIN_VALUE} step={0.00001} disabled={!isEditable} />
                  </Form.Item>
                </Col>
              </>
            )
          }

        </Row>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item name="titleTr" label={t('FORM.GENERAL_INFO.TITLE.TITLE')} rules={validationSchema.titleTr}>
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="titleEn" label={t('FORM.GENERAL_INFO.TITLE.TITLE')} rules={validationSchema.titleEn}>
              <Input suffix="EN" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item name="descriptionTr" label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE')} rules={validationSchema.descriptionTr}>
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="descriptionEn" label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE')} rules={validationSchema.descriptionEn}>
              <Input suffix="EN" disabled={!isEditable} />
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
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accessibilityLabelEn"
              label={t('FORM.GENERAL_INFO.ACCESS_LABEL.TITLE')}
              rules={validationSchema.accessibilityLabelEn}
            >
              <Input suffix="EN" disabled={!isEditable} />
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
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="promoPageTitleEn"
              label={t('FORM.GENERAL_INFO.PROMO_PAGE_TITLE.TITLE_EN')}
              rules={validationSchema.promoPageTitleEn}
            >
              <Input suffix="EN" disabled={!isEditable} />
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
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="promoContentUrlEn"
              label={t('FORM.GENERAL_INFO.PROMO_CONTENT_URL.TITLE_EN')}
              rules={validationSchema.promoContentUrlEn}
            >
              <Input suffix="EN" disabled={!isEditable} />
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
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="promoContentSectionTitleEn"
              label={t('FORM.GENERAL_INFO.PROMO_CONTENT_SECTION_TITLE.TITLE_EN')}
              rules={validationSchema.promoContentSectionTitleEn}
            >
              <Input suffix="EN" disabled={!isEditable} />
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
              <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                <Button type="primary" className="w-100" disabled={!isEditable}>
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
              <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                <Button type="primary" className="w-100" disabled={!isEditable}>
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
              <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                <Button type="primary" className="w-100" disabled={!isEditable}>
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
              <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                <Button type="primary" className="w-100" disabled={!isEditable}>
                  {t('FORM.GENERAL_INFO.THUMBNAIL.CHANGE_EN')}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              className={classes.formItemWrapper}
              initialValue=""
              name="promoContentHTMLTr"
              label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_TR', promoHTMLTr)}
              rules={validationSchema.promoContentHTMLTr}
            >
              <ReactQuill theme="snow" readOnly={!isEditable} onChange={handlePromoContentHTMLTr} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className={classes.formItemWrapper}
              initialValue=""
              name="promoContentHTMLEn"
              label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_EN', promoHTMLEn)}
              rules={validationSchema.promoContentHTMLEn}
            >
              <ReactQuill theme="snow" readOnly={!isEditable} onChange={handlePromoContentHTMLEn} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Form.Item name="affectedSegments" label={t('FORM.GENERAL_INFO.AFFECTED_SEGMENTS.TITLE')}>
              <Select mode="tags" options={[]} disabled={!isEditable} />
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
    </Form>
  );
};

export default GeneralInfo;
