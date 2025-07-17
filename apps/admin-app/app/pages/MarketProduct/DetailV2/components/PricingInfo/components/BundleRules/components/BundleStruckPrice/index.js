import { memo, useMemo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Form, Row } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { Checkbox, EditSaveCancelButtons } from '@shared/components/GUI';
import { validate } from '@shared/yup';
import { getInitialValues, validationSchema } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import {
  deleteBundleStruckPriceSelector,
  getSellingPriceListSelector, updateBundleSubProductStruckPriceSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { FORM_IDS } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';

export const BundleStruckPrice = memo(function BundleStruckPrice({ selectedDomainType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const { id } = useParams();

  const { data } = useSelector(getSellingPriceListSelector.getData);

  const struckPriceData = useMemo(() => data
    ?.find(({ isDiscounted, domainType }) => !isDiscounted && (Number(domainType) === Number(selectedDomainType))), [data, selectedDomainType]);

  const financials = useMemo(() => data
    ?.find(({ isDiscounted, domainType }) => isDiscounted && (Number(domainType) === Number(selectedDomainType)))?.financials, [data, selectedDomainType]);

  const isUpdatePending = useSelector(updateBundleSubProductStruckPriceSelector.getIsPending);
  const isUpdateFailure = useSelector(updateBundleSubProductStruckPriceSelector.getError);
  const isDeletePending = useSelector(deleteBundleStruckPriceSelector.getIsPending);
  const isDeleteFailure = useSelector(deleteBundleStruckPriceSelector.getError);

  const isPending = isUpdatePending || isDeletePending;
  const isFailure = isUpdateFailure || isDeleteFailure;

  const prevIsUpdatePending = usePrevious(isPending);

  const initialValues = useMemo(
    () => getInitialValues({ ...struckPriceData, financials }),
    [financials, struckPriceData],
  );

  const [isFormEditable, setIsFormEditable] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: ({ isStruckPriceEnabled, specialOffers }) => {
      if (!isStruckPriceEnabled) {
        return dispatch(Creators.deleteBundleStruckPriceRequest({
          body: {
            productId: id,
            domainType: selectedDomainType,
          },
        }));
      }

      return dispatch(Creators.updateBundleSubProductStruckPriceRequest({
        body: {
          productId: id,
          domainType: selectedDomainType,
          struckPriceFinancials: { isShownUnderSpecialOffers: specialOffers },
        },
      }));
    },
  });

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    if (prevIsUpdatePending && !isPending) {
      setIsFormEditable(false);
      if (isFailure) {
        setValues(initialValues);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isFailure, isPending, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleChange = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };

  const isStruckPriceEnabled = values?.isStruckPriceEnabled;

  return (
    <Form form={form} id={FORM_IDS.BUNDLE_STRUCK_PRICE} onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col>
          <Checkbox
            name="isStruckPriceEnabled"
            onChange={({ target: { checked } }) => handleChange('isStruckPriceEnabled', checked)}
            checked={values?.isStruckPriceEnabled}
            disabled={!isFormEditable}
          >
            {t('STRUCK_PRICE')}
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            name="specialOffers"
            checked={values?.specialOffers}
            disabled={!isFormEditable || !isStruckPriceEnabled}
            onChange={({ target: { checked } }) => {
              handleChange('specialOffers', checked);
            }}
          >{t('SPECIAL_OFFERS')}
          </Checkbox>
        </Col>
      </Row>
      <EditSaveCancelButtons
        disabled={!canBeSubmittable}
        form={FORM_IDS.BUNDLE_STRUCK_PRICE}
        htmlType="submit"
        isFormEditable={isFormEditable}
        loading={isPending}
        onCancelClick={handleCancelClick}
        onEditClick={handleEditClick}
      />
    </Form>
  );
});
