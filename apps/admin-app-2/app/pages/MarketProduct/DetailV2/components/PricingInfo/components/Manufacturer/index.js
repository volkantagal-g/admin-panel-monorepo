import { memo, useMemo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Form, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { EditSaveCancelButtons, Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { extractSupplierAndManufacturer, getSupplierAndManufacturerOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import permKey from '@shared/shared/permKey.json';

export const Manufacturer = memo(function Manufacturer({ activationErrorsForManufacturer }) {
  const dispatch = useDispatch();
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductPricingSelector.getIsPending);
  const isUpdateFailure = useSelector(updateMarketProductPricingSelector.getError);
  const { t } = useTranslation('marketProductPageV2');
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);

  const { Can } = usePermission();

  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice),
    [marketProductAllPrice],
  );
  const { manufacturer } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );

  const manufacturerOptions = useMemo(() => getSupplierAndManufacturerOptions(manufacturer), [manufacturer]);
  const [form] = Form.useForm();
  const formId = 'manufacturer';
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { id } = useParams();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.updateMarketProductPricingRequest({
        id,
        body,
        errors: activationErrorsForManufacturer,
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
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
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
  const handleSelectManufacturer = value => {
    setFieldValue('manufacturerId', value);
  };

  return (
    <Form form={form} id={formId} onFinish={handleSubmit}>
      <Row>
        <Col xs={24} lg={8}>
          <Select
            dataTestId="manufacturer"
            name="manufacturerId"
            label={t('MANUFACTURER')}
            errors={errors}
            showSearch
            disabled={isUpdatePending || !isFormEditable}
            filterOption={getSelectFilterOption}
            optionsData={manufacturerOptions}
            loading={isSupplierPending}
            allowClear
            value={values.manufacturerId}
            onChange={handleSelectManufacturer}
          />
        </Col>
      </Row>
      <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={formId}
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
