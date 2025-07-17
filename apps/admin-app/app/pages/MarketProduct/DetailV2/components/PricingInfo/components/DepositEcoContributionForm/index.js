import { memo, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { validate } from '@shared/yup';
import { NumberInput, EditSaveCancelButtons } from '@shared/components/GUI';
import { getInitialValues, validationSchema, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious } from '@shared/hooks';
import { canSubmit } from '@shared/utils/formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { NUMBER_INPUT_STEPS, PRECISON_VALUES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';

export const DepositEcoContributionForm = memo(function DepositEcoContributionForm() {
  const dispatch = useDispatch();
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductPricingSelector.getIsPending);
  const isUpdateFailure = useSelector(updateMarketProductPricingSelector.getError);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const formId = 'depositAndEco';
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { id } = useParams();
  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice),
    [marketProductAllPrice],
  );
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({
        initialValues,
        values,
      });
      return dispatch(Creators.updateMarketProductPricingRequest({
        id,
        body,
      }));
    },
  });
  const { errors, setFieldValue, handleSubmit, values, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );
  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

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
  }, [prevIsUpdatePending, isUpdatePending, form, values, setValues, initialValues, isUpdateFailure]);

  return (
    <Form form={form} id={formId} onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <NumberInput
            data-testid="deposit"
            errors={errors}
            name="depositPrice"
            label={t('DEPOSIT_ECO_CONTRIBUTION.DEPOSIT')}
            disabled={isUpdatePending || !isFormEditable}
            onChange={value => setFieldValue('depositPrice', value)}
            value={values?.depositPrice}
            precision={PRECISON_VALUES.THREE_DIGIT}
            step={NUMBER_INPUT_STEPS.THREE_STEP}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <NumberInput
            data-testid="ecoContribution"
            errors={errors}
            name="ecoContributionPrice"
            label={t('DEPOSIT_ECO_CONTRIBUTION.ECO_CONTRIBUTION_FEE')}
            disabled={isUpdatePending || !isFormEditable}
            onChange={value => setFieldValue('ecoContributionPrice', value)}
            value={values?.ecoContributionPrice}
            precision={PRECISON_VALUES.THREE_DIGIT}
            step={NUMBER_INPUT_STEPS.THREE_STEP}
          />
        </Col>
      </Row>
      <EditSaveCancelButtons
        disabled={!canBeSubmittable}
        form={formId}
        htmlType="submit"
        isFormEditable={isFormEditable}
        loading={isUpdatePending}
        onCancelClick={handleCancelClick}
        onEditClick={handleEditClick}
      />
    </Form>
  );
});
