import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { isNull } from 'lodash';

import useStyles from './styles';

import { Space, EditSaveCancelButtons, Select } from '@shared/components/GUI';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
  getMarketProductAllPriceSelector,
  updateMarketProductPricingSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import {
  getInitialValues, validationSchema,
  getOnlyModifiedValuesBeforeSubmit, getSelectOptionsForSegments,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { usePrevious } from '@shared/hooks';
import { FORM_IDS_SUPPLY } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';

export const Segment2Info = memo(function Segment2Info() {
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const { id } = useParams();

  const classes = useStyles();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const { kviLabel } = useSelector(getMarketProductAllPriceSelector.getData);

  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const kviLabelPending = useSelector(getMarketProductAllPriceSelector.getIsPending);

  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);

  const isUpdateSupplyLogisticInfoPending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateKviLabelPending = useSelector(updateMarketProductPricingSelector.getIsPending);

  const isUpdatePending = isUpdateSupplyLogisticInfoPending || isUpdateKviLabelPending;

  const isUpdateSupplyLogisticInfoFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isUpdateKviLabelFailure = useSelector(updateMarketProductPricingSelector.getError);

  const isUpdateFailure = isUpdateKviLabelFailure || isUpdateSupplyLogisticInfoFailure;

  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending || kviLabelPending;
  const prevIsUpdatePending = usePrevious(isPending);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.SEGMENTS.containerId });

  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo, kviLabel),
    [supplyLogisticInfo, kviLabel],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { isCreated, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      if (body.kviLabel || isNull(body.kviLabel)) {
        dispatch(Creators.updateMarketProductPricingRequest({ id, body: { kviLabel: body.kviLabel } }));
        delete body.kviLabel;
        if (Object.keys(body).length !== 0) {
          dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrors }));
        }
      }
      else {
        dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrors }));
      }
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

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
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
  }, [initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleSelectSegments = (field, value, isMultiple) => {
    if (isMultiple) {
      setFieldValue(field, value);
    }
    else {
      const input = value ? [value] : [];
      setFieldValue(field, input);
    }
  };

  return (
    <Space
      title={t('SEGMENT_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={FORM_IDS_SUPPLY.SEGMENT_2} onFinish={handleSubmit}>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="segment-test"
              name="segments"
              label={t('SEGMENT_INFO.SEGMENT')}
              mode={values?.segments?.length > 1 && 'multiple'}
              allowClear
              value={values.segments}
              optionsData={getSelectOptionsForSegments('segments')}
              onChange={segments => handleSelectSegments('segments', segments, values?.segments?.length > 1)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="segment2-test"
              name="segments2"
              label={t('SEGMENT_INFO.SEGMENT_2')}
              mode={values?.segments2?.length > 1 && 'multiple'}
              allowClear
              value={values.segments2}
              optionsData={getSelectOptionsForSegments('segments2')}
              onChange={segments2 => handleSelectSegments('segments2', segments2, values?.segments2?.length > 1)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="kviLabel-test"
              name="kviLabel"
              label={t('SEGMENT_INFO.KVI_LABEL')}
              allowClear
              value={values.kviLabel}
              optionsData={getSelectOptionsForSegments('kviLabel')}
              onChange={value => setFieldValue('kviLabel', value || null)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={FORM_IDS_SUPPLY.SEGMENT_2}
          isFormEditable={isFormEditable}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
          loading={isPending}
        />
      </Form>
    </Space>
  );
});
