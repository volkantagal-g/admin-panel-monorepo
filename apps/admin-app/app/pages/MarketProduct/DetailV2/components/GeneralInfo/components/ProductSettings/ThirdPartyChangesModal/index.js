import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Tag, Select, Typography, Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get } from 'lodash';

import { getInitialValues, getDescriptionTagOptions, getModifiedValues } from './formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import {
  getMarketProductByIdSelector,
  getMarketProductFeedDataSelector,
  getMarketProductTagsSelector, updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { syncHeightOfFormItems } from './utils';
import { FIELD_ID, FORM_ID } from './constants';
import useStyles from './styles';
import MLAdditionalPropertyTabs from './MLAdditionalPropertyTabs';
import { usePrevious } from '@shared/hooks';
import { Button, Modal, MultiLanguageTextEditor, Checkbox, TextInput, MultiLanguageImage } from '@shared/components/GUI';

const { Title } = Typography;

const ThirdPartyChangesModal = props => {
  const { onCancel } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: marketProductId } = useParams();
  const { t } = useTranslation('marketProductPageV2');
  const [formForCurrentData] = Form.useForm();
  const [formForThirdPartyData] = Form.useForm();
  const theme = useTheme();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const marketProductFeedData = useSelector(getMarketProductFeedDataSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const tags = useSelector(getMarketProductTagsSelector.getData);
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const [checkboxes, setCheckboxes] = useState({
    description: true,
    tags: true,
    ingredients: true,
    usage: true,
    additionalInfos: true,
    picURL: true,
    widePicURL: true,
    additionalPropertyTables: true,
    hfssInfo: true,
  });

  const handleCancel = useCallback(() => {
    formForCurrentData.resetFields();
    formForThirdPartyData.resetFields();
    onCancel();
  }, [formForCurrentData, formForThirdPartyData, onCancel]);

  const initialValuesForCurrentData = useMemo(
    () => getInitialValues(marketProduct, tags, marketProduct),
    [marketProduct, tags],
  );

  const initialValuesForThirdPartyData = useMemo(
    () => getInitialValues(marketProductFeedData, tags, marketProduct),
    [marketProductFeedData, tags, marketProduct],
  );

  const formikForCurrentData = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesForCurrentData,
  });

  const formikForThirdPartyData = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesForThirdPartyData,
  });

  const tagRender = tagProps => {
    const { label, onClose } = tagProps;

    return (
      <Tag onClose={onClose}>
        {label}
      </Tag>
    );
  };

  useEffect(() => {
    formForCurrentData.setFieldsValue(formikForCurrentData.values);
  }, [formForCurrentData, formikForCurrentData.values, tags]);

  useEffect(() => {
    formForThirdPartyData.setFieldsValue(formikForThirdPartyData.values);
  }, [formForThirdPartyData, formikForThirdPartyData.values, tags]);

  useEffect(() => {
    syncHeightOfFormItems();
  });

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      handleCancel();
    }

    formForThirdPartyData.setFieldsValue(formikForThirdPartyData.values);
  }, [formForThirdPartyData, formikForThirdPartyData.values, handleCancel, isUpdatePending, prevIsUpdatePending]);

  const updateProduct = () => {
    const body = getModifiedValues(formikForThirdPartyData.values, checkboxes, marketProduct);
    dispatch(Creators.updateMarketProductRequest({
      id: marketProductId,
      body,
    }));
  };

  const handleCheckboxChange = (event, path) => {
    const value = get(event, 'target.checked', false);
    setCheckboxes({
      ...checkboxes,
      [path]: value,
    });
  };

  const areSomeCheckboxesSelected = Object.values(checkboxes).some(val => val);

  return (
    <Modal
      visible
      width={1200}
      style={{ top: 100 }}
      centered
      title={t('REVIEW_CHANGES')}
      onCancel={handleCancel}
      footer={[
        <Button key="back" color="secondary" onClick={handleCancel}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="review-changes-info"
          htmlType="submit"
          onClick={() => updateProduct()}
          disabled={!areSomeCheckboxesSelected}
          loading={isUpdatePending}
        >
          {t('FILL_THIRD_PARTY_INFO')}
        </Button>,
      ]}
    >
      <Row gutter={[theme.spacing(3)]} align="middle" justify="center">
        <Col className="d-flex align-items justify-content-center" span={11}>
          <Title level={4}>{t('CURRENT_PRODUCT_DATA')}</Title>
        </Col>
        <Col className="d-flex align-items justify-content-center" span={2}>
          <ArrowRightOutlined className="font-size-20" />
        </Col>
        <Col className="d-flex align-items justify-content-center" span={11}>
          <Title level={4}>{t('THIRD_PARTY_PRODUCT_DATA')}</Title>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[theme.spacing(3)]}>
        <Col span={11}>
          <Form
            form={formForCurrentData}
            id={FORM_ID.CURRENT_PRODUCT_DATA}
            onFinish={formikForCurrentData.handleSubmit}
            layout="vertical"
          >
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.DESCRIPTION}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'description')}
                    checked={checkboxes.description}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForCurrentData, 'description', {})}
                    label={t('DETAILS_INFO.DESCRIPTION')}
                    fieldPath={['description']}
                    formik={formikForCurrentData}
                    disabled
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.TAGS}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'tags')}
                    checked={checkboxes.tags}
                  />
                </Col>
                <Col span={20}>
                  <Form.Item
                    name="tags"
                    label={t('DETAILS_INFO.DESCRIPTION_TAGS')}
                  >
                    <Select
                      labelInValue
                      mode="multiple"
                      value={formikForCurrentData.values.tags}
                      options={getDescriptionTagOptions(tags)}
                      disabled
                      autoComplete="off"
                      tagRender={tagRender}
                      showSearch
                      filterOption={getSelectFilterOption}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.INGREDIENTS}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'ingredients')}
                    checked={checkboxes.ingredients}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForCurrentData, 'ingredients', {})}
                    label={t('INGREDIENTS_INFO.INGREDIENTS')}
                    fieldPath={['ingredients']}
                    formik={formikForCurrentData}
                    disabled
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.USAGE}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'usage')}
                    checked={checkboxes.usage}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForCurrentData, 'details.usage', {})}
                    label={t('USAGE_INFO.USAGE')}
                    fieldPath={['details', 'usage']}
                    formik={formikForCurrentData}
                    disabled
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.ADDITIONAL_INFOS}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'additionalInfos')}
                    checked={checkboxes.additionalInfos}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForCurrentData, 'details.additionalInfos', {})}
                    label={t('ADDITIONAL_INFO.ADDITIONAL')}
                    fieldPath={['details', 'additionalInfos']}
                    formik={formikForCurrentData}
                    disabled
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.PIC_URL}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'picURL')}
                    checked={checkboxes.picURL}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageImage
                    fieldPath={['picURL']}
                    formik={formikForCurrentData}
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.WIDE_PIC_URL}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'widePicURL')}
                    checked={checkboxes.widePicURL}
                  />
                </Col>
                <Col span={20}>
                  <MultiLanguageImage
                    label={t('WIDE_IMAGE_INFO.TITLE')}
                    fieldPath={['widePicURL']}
                    formik={formikForCurrentData}
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.ADDITIONAL_PROPERTY_TABLES}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'additionalPropertyTables')}
                    checked={checkboxes.additionalPropertyTables}
                  />
                </Col>
                <Col span={20}>
                  <MLAdditionalPropertyTabs
                    tables={formikForCurrentData.values.additionalPropertyTables}
                  />
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.HFSS_INDICATOR}`}>
              <Row>
                <Col span={2}>
                  <Checkbox
                    onChange={event => handleCheckboxChange(event, 'hfssInfo')}
                    checked={checkboxes.hfssInfo}
                  />
                </Col>
                <Col span={20}>
                  <Form.Item
                    name={['hfssInfo', 'hfssIndicator']}
                    label={t('HFSS_INFO.HFSS_INDICATOR')}
                  >
                    <TextInput
                      value={formikForCurrentData.values.hfssInfo.hfssIndicator}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.HFSS_FOOD_OR_DRINK}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssFoodOrDrink']}
                    label={t('HFSS_INFO.HFSS_FOOD_OR_DRINK')}
                  >
                    <TextInput
                      value={formikForCurrentData.values.hfssInfo.hfssFoodOrDrink}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.HFSS_FOOD_CATEGORY}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssFoodCategory']}
                    label={t('HFSS_INFO.HFSS_FOOD_CATEGORY')}
                  >
                    <TextInput
                      value={formikForCurrentData.values.hfssInfo.hfssFoodCategory}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.CURRENT_PRODUCT_DATA}-${FIELD_ID.HFSS_NUTRIENT_PROFILE_SCORE}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssNutrientProfileScore']}
                    label={t('HFSS_INFO.NUTRIENT_PROFILE_SCORE')}
                  >
                    <TextInput
                      value={formikForCurrentData.values.hfssInfo.hfssNutrientProfileScore}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
        <Col span={2} className={classes.arrowColumn}>
          <ArrowRightOutlined className="font-size-20" />
          <ArrowRightOutlined className="font-size-20" />
          <ArrowRightOutlined className="font-size-20" />
          <ArrowRightOutlined className="font-size-20" />
          <ArrowRightOutlined className="font-size-20" />
          <ArrowRightOutlined className="font-size-20" />
        </Col>
        <Col span={11}>
          <Form
            form={formForThirdPartyData}
            id={FORM_ID.THIRD_PARTY_PRODUCT_DATA}
            onFinish={formikForThirdPartyData.handleSubmit}
            layout="vertical"
          >
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.DESCRIPTION}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForThirdPartyData, 'description', {})}
                    label={t('DETAILS_INFO.DESCRIPTION')}
                    fieldPath={['description']}
                    formik={formikForThirdPartyData}
                    disabled
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.TAGS}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <Form.Item
                    name="tags"
                    label={t('DETAILS_INFO.DESCRIPTION_TAGS')}
                  >
                    <Select
                      labelInValue
                      mode="multiple"
                      value={formikForThirdPartyData.values.tags}
                      options={getDescriptionTagOptions(tags)}
                      disabled
                      autoComplete="off"
                      tagRender={tagRender}
                      showSearch
                      filterOption={getSelectFilterOption}
                    />
                  </Form.Item>
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.INGREDIENTS}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForThirdPartyData, 'ingredients', {})}
                    label={t('INGREDIENTS_INFO.INGREDIENTS')}
                    fieldPath={['ingredients']}
                    formik={formikForThirdPartyData}
                    disabled
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.USAGE}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForThirdPartyData, 'details.usage', {})}
                    label={t('USAGE_INFO.USAGE')}
                    fieldPath={['details', 'usage']}
                    formik={formikForThirdPartyData}
                    disabled
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.ADDITIONAL_INFOS}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageTextEditor
                    autoGrid
                    originalValue={get(initialValuesForThirdPartyData, 'details.additionalInfos', {})}
                    label={t('ADDITIONAL_INFO.ADDITIONAL')}
                    fieldPath={['details', 'additionalInfos']}
                    formik={formikForThirdPartyData}
                    disabled
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.PIC_URL}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageImage
                    fieldPath={['picURL']}
                    formik={formikForThirdPartyData}
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.WIDE_PIC_URL}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MultiLanguageImage
                    label={t('WIDE_IMAGE_INFO.TITLE')}
                    fieldPath={['widePicURL']}
                    formik={formikForThirdPartyData}
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.ADDITIONAL_PROPERTY_TABLES}`}>
              <Row>
                <Col offset={2} />
                <Col span={20}>
                  <MLAdditionalPropertyTabs
                    tables={formikForThirdPartyData.values.additionalPropertyTables}
                  />
                </Col>
                <Col offset={2} />
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.HFSS_INDICATOR}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssIndicator']}
                    label={t('HFSS_INFO.HFSS_INDICATOR')}
                  >
                    <TextInput
                      value={formikForThirdPartyData.values.hfssInfo.hfssIndicator}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.HFSS_FOOD_OR_DRINK}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssFoodOrDrink']}
                    label={t('HFSS_INFO.HFSS_FOOD_OR_DRINK')}
                  >
                    <TextInput
                      value={formikForThirdPartyData.values.hfssInfo.hfssFoodOrDrink}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.HFSS_FOOD_CATEGORY}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssFoodCategory']}
                    label={t('HFSS_INFO.HFSS_FOOD_CATEGORY')}
                  >
                    <TextInput
                      value={formikForThirdPartyData.values.hfssInfo.hfssFoodCategory}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div id={`${FORM_ID.THIRD_PARTY_PRODUCT_DATA}-${FIELD_ID.HFSS_NUTRIENT_PROFILE_SCORE}`}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name={['hfssInfo', 'hfssNutrientProfileScore']}
                    label={t('HFSS_INFO.NUTRIENT_PROFILE_SCORE')}
                  >
                    <TextInput
                      value={formikForThirdPartyData.values.hfssInfo.hfssNutrientProfileScore}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default ThirdPartyChangesModal;
