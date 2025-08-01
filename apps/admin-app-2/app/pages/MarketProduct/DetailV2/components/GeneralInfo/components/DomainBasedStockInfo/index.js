import { useState, useMemo } from 'react';
import { Col, Form, Row, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getMarketProductByIdSelector, updateMarketProductSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { EditSaveCancelButtons, NumberInput, Space } from '@shared/components/GUI';
import { validationSchema, getInitialValues, getModifiedValues } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';
import { validate } from '@shared/yup';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';
import { getWeightUnitTextOfProduct } from '@app/pages/MarketProduct/utils';

const DomainBasedStockInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [isFormEditable, setIsFormEditable] = useState(false);
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [form] = Form.useForm();
  const isProductWeight = marketProduct?.type === MARKET_PRODUCT_TYPE.WEIGHT;
  const weightUnitText = getWeightUnitTextOfProduct(marketProduct);

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const paramsForValidate = {
    t,
    initialWeight: marketProduct?.weightInfo?.initialWeight,
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, paramsForValidate),
    initialValues,
    onSubmit: values => {
      const body = getModifiedValues(values);
      return dispatch(Creators.updateMarketProductRequest({
        id: marketProduct?._id,
        body,
      }));
    },
  });
  const {
    handleSubmit,
    values,
    errors,
    setFieldValue,
    setValues,
  } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({
      initialValues,
      values,
    }),
    [initialValues, values],
  );

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleInputForm = (field, value) => {
    setFieldValue(field, value);
  };

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

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
    formik.resetForm();
    form.resetFields();
  };

  return (
    <Space title={t('DOMAIN_BASED_STOCK_INFO.TITLE')}>
      <Form form={form} id={PRODUCT_DETAIL_COMPONENT_ID.DOMAIN_BASED_STOCK_INFO} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Tooltip
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placement="topLeft"
              title={isProductWeight && t('PLEASE_SPECIFY_VALUES_FOR_PRODUCT_WEIGHT_UNIT', { weightUnitText })}
            >
              <Row>
                <Col span={24}>
                  <NumberInput
                    data-testid="getir10Limit"
                    errors={errors}
                    name="getir10Limit"
                    label={t('DOMAIN_BASED_STOCK_INFO.GETIR_10')}
                    value={values.getir10Limit}
                    onChange={value => handleInputForm('getir10Limit', value)}
                    disabled={isUpdatePending || !isFormEditable}
                    min={0}
                  />
                </Col>
              </Row>
            </Tooltip>
          </Col>
          <Col xs={24} md={8}>
            <Tooltip
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placement="topLeft"
              title={isProductWeight && t('PLEASE_SPECIFY_VALUES_FOR_PRODUCT_WEIGHT_UNIT', { weightUnitText })}
            >
              <Row>
                <Col span={24}>
                  <NumberInput
                    data-testid="getir30Limit"
                    errors={errors}
                    name="getir30Limit"
                    label={t('DOMAIN_BASED_STOCK_INFO.GETIR_30')}
                    value={values.getir30Limit}
                    onChange={value => handleInputForm('getir30Limit', value)}
                    disabled={isUpdatePending || !isFormEditable}
                    min={0}
                  />
                </Col>
              </Row>
            </Tooltip>
          </Col>
          <Col xs={24} md={8}>
            <Tooltip
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placement="topLeft"
              title={isProductWeight && t('PLEASE_SPECIFY_VALUES_FOR_PRODUCT_WEIGHT_UNIT', { weightUnitText })}
            >
              <Row>
                <Col span={24}>
                  <NumberInput
                    data-testid="getirVoyagerLimit"
                    errors={errors}
                    name="getirVoyagerLimit"
                    label={t('DOMAIN_BASED_STOCK_INFO.GETIR_VOYAGER')}
                    value={values.getirVoyagerLimit}
                    onChange={value => handleInputForm('getirVoyagerLimit', value)}
                    disabled={isUpdatePending || !isFormEditable}
                    min={0}
                  />
                </Col>
              </Row>
            </Tooltip>
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.DOMAIN_BASED_STOCK_INFO}
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default DomainBasedStockInfo;
