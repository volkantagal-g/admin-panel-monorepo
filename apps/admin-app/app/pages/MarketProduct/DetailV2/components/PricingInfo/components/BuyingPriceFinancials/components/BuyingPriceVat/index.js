import { memo, useMemo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Form } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { EditSaveCancelButtons, Select } from '@shared/components/GUI';
import { getVatOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { FORM_IDS } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import permKey from '@shared/shared/permKey.json';

export const BuyingPriceVat = memo(function BuyingPriceVat({ activationErrorsForSellingPrice }) {
  const dispatch = useDispatch();
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductPricingSelector.getIsPending);
  const isUpdateFailure = useSelector(updateMarketProductPricingSelector.getError);
  const { t } = useTranslation('marketProductPageV2');
  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice),
    [marketProductAllPrice],
  );

  const { Can } = usePermission();

  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { id } = useParams();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.updateMarketProductPricingRequest({
        id,
        body,
        errors: activationErrorsForSellingPrice,
      }));
    },
  });
  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
      if (isUpdateFailure) {
        setValues(initialValues);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };
  const handleSelectVAT = value => {
    setFieldValue('wholesaleVat', value);
  };

  return (
    <Form form={form} id={FORM_IDS.BUYING_PRICE_VAT} onFinish={handleSubmit}>
      <Col xs={24} md={8}>
        <Select
          name="wholesaleVat"
          label={t('BUYING')}
          errors={errors}
          onChange={handleSelectVAT}
          value={values?.wholesaleVat}
          optionsData={getVatOptions()}
          disabled={isUpdatePending || !isFormEditable}
        />
      </Col>
      <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={FORM_IDS.BUYING_PRICE_VAT}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Can>
    </Form>
  );
});
