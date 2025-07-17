import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { ABV_ENABLED_COUNTRY_CODES, PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_TEXT_EDITOR } from '@app/pages/MarketProduct/constants';
import { Space, EditSaveCancelButtons, MultiLanguageTextEditor, Tag, Select, Button, NumberInput } from '@shared/components/GUI';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
  getMarketProductTagsSelector,
  createMarketProductTagSelector,
  deleteMarketProductTagSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import DescriptionTagsModal from './DescriptionTagsModal';
import add from '@shared/assets/GUI/Icons/Solid/Add.svg';
import { getSelectFilterOption } from '@shared/utils/common';
import { PRECISON_VALUES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const DetailsInfo = () => {
  const dispatch = useDispatch();
  const countryCode = get(useSelector(getSelectedCountryV2), 'code.alpha2');
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const positions = useSelector(getMarketProductByIdSelector.getData);
  const deletedTagId = useSelector(deleteMarketProductTagSelector.getTagId);
  const tags = useSelector(getMarketProductTagsSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const isAddNewTagPending = useSelector(createMarketProductTagSelector.getIsPending);
  const isABVEnabled = ABV_ENABLED_COUNTRY_CODES.includes(countryCode);
  const [isDescriptionTagsModalVisible, setIsDescriptionTagsModalVisible] = useState(false);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(marketProduct, tags),
    [marketProduct, tags],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.updateMarketProductRequest({
        id: get(marketProduct, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => dispatch(Creators.getMarketProductTagsRequest()), [dispatch]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, tags, form]);

  useEffectOnRequestFinished(
    updateMarketProductSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  // When a tag is deleted, we remove it from product as well
  useEffectOnRequestFinished(
    deleteMarketProductTagSelector,
    () => {
      setFieldValue('tags', values.tags.filter(tag => deletedTagId !== tag.value));

      // ISSUE: When we remove a tag from product in redux, it resets the form so
      // it can potentially lose progress.
      if (marketProduct.tags.includes(deletedTagId)) {
        const marketProductDataWithoutDeletedTag = {
          ...marketProduct,
          tags: marketProduct.tags.filter(id => deletedTagId !== id),
        };

        dispatch(Creators.getMarketProductByIdSuccess({
          data: {
            marketProduct: marketProductDataWithoutDeletedTag,
            positions,
          },
        }));
      }
    },
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleModalOkClick = selectedTags => {
    setFieldValue('tags', selectedTags);
    setIsDescriptionTagsModalVisible(false);
  };

  const handleModalCancelClick = () => {
    setIsDescriptionTagsModalVisible(false);
  };

  const handleAddTagButtonClick = () => !isUpdatePending
    && isFormEditable
    && setIsDescriptionTagsModalVisible(true);

  const tagRender = props => {
    const { label, value, closable } = props;
    const isClosable = closable && isFormEditable;

    return (
      <Tag
        closable={isClosable}
        color="inactive"
        onClose={() => {
          const newValues = {
            ...values,
            tags: values.tags.filter(tag => tag.value !== value),
          };

          setValues(newValues);
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Space title={t('DETAILS_INFO.TITLE')}>
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.DETAILS_INFO}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} md={12} lg={8}>
            <Select
              labelInValue
              mode="multiple"
              name="tags"
              label={t('DETAILS_INFO.DESCRIPTION_TAGS')}
              value={values.tags}
              errors={errors}
              autoComplete="off"
              tagRender={tagRender}
              dropdownStyle={{ display: 'none' }}
              disabled
              filterOption={getSelectFilterOption}
            />
          </Col>
          {isFormEditable && (
            <Col xs={24} md={12} lg={8}>
              <Button
                size="small"
                onClick={handleAddTagButtonClick}
                loading={isAddNewTagPending}
                icon={<img src={add} alt="add-icon" />}
              >
                {t('DETAILS_INFO.ADD_NEW_TAG')}
              </Button>
            </Col>
          )}
        </Row>
        <MultiLanguageTextEditor
          originalValue={get(initialValues, 'description', {})}
          label={t('DETAILS_INFO.DESCRIPTION')}
          fieldPath={['description']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
          toolbarItems={PRODUCT_DETAIL_TEXT_EDITOR.TOOLBAR_ITEMS}
          formats={PRODUCT_DETAIL_TEXT_EDITOR.FORMATS}
        />
        {isABVEnabled && (
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} md={12} lg={8}>
              <NumberInput
                name="alcoholByVolume"
                label="ABV% (Alcohol)"
                errors={errors}
                value={values?.alcoholByVolume}
                onChange={newValue => {
                  setFieldValue('alcoholByVolume', newValue);
                }}
                precision={PRECISON_VALUES.ONE_DIGIT}
                min={0}
                max={99.9}
                disabled={isUpdatePending || !isFormEditable}
              />
            </Col>
          </Row>
        )}
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.DETAILS_INFO}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
      {isDescriptionTagsModalVisible && (
        <DescriptionTagsModal
          onCancel={handleModalCancelClick}
          formTags={values.tags}
          onOk={handleModalOkClick}
        />
      )}
    </Space>
  );
};

export default DetailsInfo;
