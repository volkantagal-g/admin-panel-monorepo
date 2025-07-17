import { memo, useMemo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Form, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { EditSaveCancelButtons, Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';
import { getMarketProductFamilyListSelector } from '@app/pages/MarketProduct/Family/redux/selectors';
import { getFamilyOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { getMarketProductAllPriceSelector, assignFamilyToProductSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import permKey from '@shared/shared/permKey.json';

export const Family = memo(function Family() {
  const dispatch = useDispatch();
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const isUpdatePending = useSelector(assignFamilyToProductSelector.getIsPending);
  const isUpdateFailure = useSelector(assignFamilyToProductSelector.getError);
  const { t } = useTranslation('marketProductPageV2');
  const families = useSelector(getMarketProductFamilyListSelector.getData);
  const isFamiliesPending = useSelector(getMarketProductFamilyListSelector.getIsPending);

  const { Can } = usePermission();

  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice),
    [marketProductAllPrice],
  );

  const familyOptions = useMemo(() => getFamilyOptions(families), [families]);
  const [form] = Form.useForm();
  const formId = 'family';
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { id } = useParams();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { familyId } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.assignFamilyToProductRequest({
        familyId: familyId || null,
        productId: id,
      }));
    },
  });
  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;

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
  const handleSelectFamily = value => {
    setFieldValue('familyId', value);
  };

  return (
    <Form form={form} id={formId} onFinish={handleSubmit}>
      <Row>
        <Col xs={24} lg={8}>
          <Select
            dataTestId="family"
            name="familyId"
            label={t('FAMILY')}
            errors={errors}
            showSearch
            disabled={isUpdatePending || !isFormEditable}
            filterOption={getSelectFilterOption}
            optionsData={familyOptions}
            loading={isFamiliesPending}
            allowClear
            value={values.familyId}
            onChange={handleSelectFamily}
          />
        </Col>
      </Row>
      <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
        <EditSaveCancelButtons
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
