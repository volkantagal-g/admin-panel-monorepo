import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isFinite } from 'lodash';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import { Space, EditSaveCancelButtons, NumberInput } from '@shared/components/GUI';
import { PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';
import { getProductType, getWeightUnitTextOfProduct } from '@app/pages/MarketProduct/utils';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';
import { useEffectOnRequestFinished } from '@shared/hooks';

const SaleRestriction = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const productType = getProductType(marketProduct);
  const weightUnitText = getWeightUnitTextOfProduct(marketProduct);
  const isProductWeight = marketProduct?.type === MARKET_PRODUCT_TYPE.WEIGHT;

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const formik = useFormik({
    validate: validate(validationSchema, { t, initialWeight: marketProduct?.weightInfo?.initialWeight }),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.updateMarketProductRequest({
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
    setValues(getInitialValues(marketProduct));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <Space title={t('SALE_RESTRICTION.TITLE')}>
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.SALE_RESTRICTION}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Tooltip
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placement="topLeft"
          title={isProductWeight && t('PLEASE_SPECIFY_VALUES_FOR_PRODUCT_WEIGHT_UNIT', { weightUnitText })}
        >
          <Row>
            <Col span={24}>
              <NumberInput
                name={['upperLimit']}
                label={t(`SALE_RESTRICTION.PRODUCT_TYPE_BASED.${productType}.MAX_ORDER_COUNT`, { weightUnitText })}
                value={values.upperLimit}
                onChange={value => {
                  setFieldValue('upperLimit', isFinite(value) ? value : null);
                }}
                disabled={isUpdatePending || !isFormEditable}
                errors={errors}
              />
            </Col>
          </Row>
        </Tooltip>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.SALE_RESTRICTION}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default SaleRestriction;
