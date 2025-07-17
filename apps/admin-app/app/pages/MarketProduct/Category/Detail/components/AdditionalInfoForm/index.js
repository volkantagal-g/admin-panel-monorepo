import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import { useFormik } from 'formik';

import { getMarketProductCategoryByIdSelector, updateMarketProductCategoryAdditionalInfoSelector } from '../../redux/selectors';
import {
  getInitialValues,
  getCategoryTypeOptions,
  getSubCategoryTypeOptions,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { getSelectFilterOption } from '@shared/utils/common';

const AddtionalInfoDetailForm = () => {
  const dispatch = useDispatch();
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductCategoryAdditionalInfoSelector.getIsPending);
  const updateError = useSelector(updateMarketProductCategoryAdditionalInfoSelector.getError);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductCategoryPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const { canAccess } = usePermission();
  const { isSubCategory } = marketProductCategory;

  const initialValues = useMemo(
    () => (getInitialValues(marketProductCategory)),
    [marketProductCategory],
  );

  const hasAccessToEditAdditionalInfoForm = canAccess(permKey.PAGE_MARKET_PRODUCT_CATEGORY_DETAIL_EDIT_ADDITIONAL_INFO);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({
        initialValues,
        values,
      });
      dispatch(
        Creators.updateMarketProductCategoryAdditionalInfoRequest({
          id: _.get(marketProductCategory, '_id'),
          body,
        }),
      );
    },
  });

  const {
    handleSubmit,
    values,
    errors,
    setFieldValue,
    setValues,
  } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({
    initialValues,
    values,
  }), [initialValues, values]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [isUpdatePending]);

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="category-detail-additional-info-form"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick} disabled={!hasAccessToEditAdditionalInfoForm}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('ADDITIONAL_INFO.TITLE')}>
      <Form form={form} id="category-detail-additional-info-form" onFinish={handleSubmit} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'type')}
              validateStatus={_.get(errors, 'type') ? 'error' : 'success'}
              name="type"
              label={t('CATEGORY_TYPE')}
            >
              <Select
                labelInValue
                value={values.type}
                options={isSubCategory ? getSubCategoryTypeOptions() : getCategoryTypeOptions()}
                onChange={type => {
                  setFieldValue('type', type);
                }}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default AddtionalInfoDetailForm;
