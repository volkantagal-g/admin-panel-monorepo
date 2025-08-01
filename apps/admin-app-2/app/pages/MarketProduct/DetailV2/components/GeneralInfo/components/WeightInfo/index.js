import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { get } from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getWeightOptions, isThereEnoughWeightLimitToIncrease } from '@app/pages/MarketProduct/utils';
import { getSelectFilterOption } from '@shared/utils/common';
import { MARKET_PRODUCT_WEIGHT_SUB_TYPE } from '@shared/shared/constants';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { EditSaveCancelButtons, Space, Select, Modal, NumberInput, Switch, InfoIcon } from '@shared/components/GUI';
import { canSubmit } from '@shared/utils/formHelper';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

const WeightInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [modal, confirmationModalContext] = Modal.useModal();
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const theme = useTheme();
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.WEIGHT_INFO.containerId });

  const isSubTypePrePackaged = marketProduct?.subType === MARKET_PRODUCT_WEIGHT_SUB_TYPE.PRE_PACKAGED;

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const paramsForValidate = {
    t,
    upperLimit: marketProduct?.upperLimit,
    domainUpperLimits: marketProduct?.domainUpperLimits,
  };

  const handleCancelClick = resetForm => {
    setIsFormEditable(false);
    resetForm({ values: initialValues });
  };

  const showWarningModal = (body, resetForm) => {
    const modalConfig = {
      title: t('WEIGHT_INFO.MODAL_TITLE_SUM_OF_STARTING_AND_INCREASE_DECREASE_WEIGHT'),
      content: (
        <>
          {t('WEIGHT_INFO.MODAL_MESSAGE_SUM_OF_STARTING_AND_INCREASE_DECREASE_WEIGHT')}
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: t('button:SAVE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body,
        }));
      },
      onCancel: () => {
        handleCancelClick(resetForm);
      },
      centered: true,
      width: 600,
    };
    modal.confirm(modalConfig);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: values => {
      try {
        const schema = validationSchema(values, paramsForValidate);
        schema.validateSync(values, { abortEarly: false, context: { showUnitCountText: values.showUnitCountText } });
        return {};
      }
      catch (error) {
        if (error.name === 'ValidationError' && error.inner && error.inner.length > 0) {
          const errors = {};
          error.inner.forEach(err => {
            if (err.path && !errors[err.path]) {
              errors[err.path] = err.message;
            }
          });
          return errors;
        }
        return { [error.path || '_error']: error.message };
      }
    },
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      if (isThereEnoughWeightLimitToIncrease(marketProduct?.type, values.weightInfo, marketProduct?.upperLimit)) {
        return showWarningModal(body, formik.resetForm);
      }
      return dispatch(Creators.updateMarketProductRequest({
        id: get(marketProduct, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, values, errors, isValid, setFieldValue, setValues, setErrors, resetForm } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }) && isValid,
    [initialValues, values, isValid],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

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

  useEffect(() => {
    if (!isFormEditable) {
      setErrors({});
    }
  }, [isFormEditable, setErrors]);

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleInitialWeightChange = value => {
    if (isSubTypePrePackaged) {
      setValues({
        ...values,
        weightInfo: {
          ...values.weightInfo,
          amountOfWeightIncrement: value,
          minimumWeight: value,
          initialWeight: value,
        },
      });
    }
    else {
      setFieldValue('weightInfo.initialWeight', value);
    }
  };

  const isPending = isUpdatePending || isGetPending;
  return (
    <Space
      title={t('WEIGHT_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
          <Col id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO_INITIAL_WEIGHT} span={12}>
            <Select
              name="weightInfo.initialWeight"
              labelWithTooltip={{
                label: t('WEIGHT_INFO.STARTING_WEIGHT'),
                tooltipTitle: t('WEIGHT_INFO.TOOLTIP.STARTING_WEIGHT'),
              }}
              value={values?.weightInfo?.initialWeight}
              optionsData={getWeightOptions()}
              onChange={handleInitialWeightChange}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO_AMOUNT_OF_WEIGHT_INCREMENT} span={12}>
            <Select
              name="weightInfo.amountOfWeightIncrement"
              labelWithTooltip={{
                label: t('WEIGHT_INFO.INCREASING_DECREASING_WEIGHT'),
                tooltipTitle: t('WEIGHT_INFO.TOOLTIP.INCREASING_DECREASING_WEIGHT'),
              }}
              value={values?.weightInfo?.amountOfWeightIncrement}
              optionsData={getWeightOptions()}
              onChange={value => setFieldValue('weightInfo.amountOfWeightIncrement', value)}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO_MINIMUM_WEIGHT} span={12}>
            <Select
              name="weightInfo.minimumWeight"
              labelWithTooltip={{
                label: t('WEIGHT_INFO.MINIMUM_WEIGHT'),
                tooltipTitle: t('WEIGHT_INFO.TOOLTIP.MINIMUM_WEIGHT'),
              }}
              value={values?.weightInfo?.minimumWeight}
              optionsData={getWeightOptions()}
              onChange={value => setFieldValue('weightInfo.minimumWeight', value)}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
        <Divider />
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} align="middle" className="mb-4">
          <Col span={8}>
            {t('SHOW_UNIT_COUNT_TEXT')}
            <InfoIcon title={t('SHOW_UNIT_COUNT_TEXT_INFO_MESSAGE')} />
          </Col>
          <Col span={4} align="left">
            <Switch
              name="showUnitCountText"
              checked={values?.showUnitCountText}
              onChange={value => {
                setFieldValue('showUnitCountText', value);
              }}
              disabled={isPending || !isFormEditable}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              data-testid="showUnitCountText"
            />
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
          <Col id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO_APPROXIMATE_PIECE_DEVIATION} span={12}>
            <NumberInput
              name="weightInfo.approximatePieceDeviation"
              label={t('WEIGHT_INFO.APPROXIMATE_PIECE_DEVIATION')}
              value={values?.weightInfo?.approximatePieceDeviation}
              onChange={value => {
                setFieldValue('weightInfo.approximatePieceDeviation', value);
              }}
              disabled={!values?.showUnitCountText || isUpdatePending || !isFormEditable}
              errors={errors}
              precision={0}
            />
          </Col>
          <Col id={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO_AVERAGE_PIECE_GRAM} span={12}>
            <NumberInput
              name="weightInfo.averagePieceGram"
              label={t('WEIGHT_INFO.AVERAGE_PIECE_GRAM')}
              value={values?.weightInfo?.averagePieceGram}
              onChange={value => {
                setFieldValue('weightInfo.averagePieceGram', value);
              }}
              disabled={!values?.showUnitCountText || isUpdatePending || !isFormEditable}
              errors={errors}
              precision={0}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.WEIGHT_INFO}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={() => handleCancelClick(resetForm)}
          onEditClick={handleEditClick}
        />
      </Form>
      {confirmationModalContext}
    </Space>
  );
};

export default WeightInfo;
