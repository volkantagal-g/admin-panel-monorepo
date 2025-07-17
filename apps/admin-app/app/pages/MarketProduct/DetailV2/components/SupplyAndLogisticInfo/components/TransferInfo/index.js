import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { Space, Checkbox, EditSaveCancelButtons, NumberInput, Select, Button } from '@shared/components/GUI';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
  getTransferGroupsSelector, getProductTransferGroupsByProductSelector, updateTransferGroupsOfProductSelector, getMarketProductByIdSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import {
  getInitialValues, validationSchema,
  getOnlyModifiedValuesBeforeSubmit, getSelectOptionsWithoutTransferGroups, getTransferGroupOptions,
  getTransferTypeOptions, getPlanningSegmentOptions,
  getSelectFilterOption,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { usePrevious } from '@shared/hooks';
import { MARKET_PRODUCT_TYPE, MARKET_PRODUCT_WEIGHT_SUB_TYPE } from '@shared/shared/constants';
import { FORM_IDS_SUPPLY } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/constants';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import useStyles from './styles';

export const TransferInfo = memo(function TransferInfo() {
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();

  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.TRANSFER_INFO.containerId });

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [transferGroupSearch, setTransferGroupSearch] = useState('');

  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const transferGroupsData = useSelector(getTransferGroupsSelector.getData);
  const productTransferGroups = useSelector(getProductTransferGroupsByProductSelector.getData);
  const isUpdateTranferGroupsPending = useSelector(updateTransferGroupsOfProductSelector.getIsPending);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);
  const prevIsUpdateTransferGroupsPending = usePrevious(isUpdateTranferGroupsPending);
  const transferGroupsOptions = useMemo(
    () => getTransferGroupOptions(transferGroupsData),
    [transferGroupsData],
  );

  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo, productTransferGroups),
    [supplyLogisticInfo, productTransferGroups],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { isCreated, hasTransferGroup, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, hasTransferGroup }));
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );
  const isPrepackaged = useMemo(
    () => marketProduct?.subType === MARKET_PRODUCT_WEIGHT_SUB_TYPE.PRE_PACKAGED &&
      marketProduct?.type === MARKET_PRODUCT_TYPE.WEIGHT,
    [marketProduct],
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setTransferGroupSearch('');
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  useEffect(() => {
    if ((prevIsUpdatePending && !isUpdatePending) || (prevIsUpdateTransferGroupsPending && !isUpdateTranferGroupsPending)) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateFailure, isUpdatePending,
    isUpdateTranferGroupsPending, prevIsUpdatePending, prevIsUpdateTransferGroupsPending, setValues, values]);

  const handleInputForm = (field, value) => {
    setFieldValue(field, value);
  };

  useEffect(() => {
    return () => {
      setTransferGroupSearch('');
    };
  }, []);

  return (
    <Space
      title={t('TRANSFER_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={FORM_IDS_SUPPLY.TRANSFER_FORM} onFinish={handleSubmit}>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="limit"
              name="transferLimitType"
              label={t('TRANSFER_INFO.TRANSFER_LIMIT_TYPE')}
              value={values.transferLimitType}
              optionsData={getSelectOptionsWithoutTransferGroups('transferLimit')}
              onChange={value => handleInputForm('transferLimitType', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="shipment"
              name={['mainStoreSpecs', 'shipmentType']}
              label={t('TRANSFER_INFO.SHIPMENT_TYPE')}
              value={values?.mainStoreSpecs?.shipmentType}
              optionsData={getSelectOptionsWithoutTransferGroups('shipment')}
              onChange={value => handleInputForm('mainStoreSpecs.shipmentType', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              data-testid="coli-count"
              name={['mainStoreSpecs', 'transferColiCount']}
              label={t('TRANSFER_INFO.TRANSFER_BOX_COUNT')}
              value={values?.mainStoreSpecs?.transferColiCount}
              onChange={value => handleInputForm('mainStoreSpecs.transferColiCount', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={21}>
            <Select
              filterOption={(inputValue, option) => {
                return getSelectFilterOption(inputValue, option, true);
              }}
              placement="topLeft"
              showSearch
              errors={errors}
              name="transferGroups"
              label={t('TRANSFER_INFO.TRANSFER_GROUPS')}
              value={values?.transferGroups}
              optionsData={transferGroupsOptions}
              onChange={value => handleInputForm('transferGroups', value)}
              disabled={isUpdateTranferGroupsPending || !isFormEditable}
              mode="multiple"
              allowClear
              maxTagCount={1000}
              onSearch={inputValue => {
                setTransferGroupSearch(inputValue);
              }}
              onClear={() => {
                setTransferGroupSearch('');
              }}
            />
          </Col>
          <Col xs={24} md={3}>
            <Button
              className={classes.transferInfoSearchBtn}
              disabled={isUpdateTranferGroupsPending || !isFormEditable}
              onClick={() => {
                const filteredResult = transferGroupsOptions
                  .filter(transferGroup => getSelectFilterOption(transferGroupSearch, transferGroup, true))
                  .map(item => item.value);
                const result = [...new Set([...values?.transferGroups || [], ...filteredResult])];
                handleInputForm('transferGroups', result);
                setTransferGroupSearch('');
              }}
            >
              {transferGroupSearch ? t('SELECT_RESULTS') : t('SELECT_ALL')}
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="transferType"
              name="transferType"
              label={t('TRANSFER_INFO.TRANSFER_TYPE')}
              value={values?.transferType}
              optionsData={getTransferTypeOptions('transferType')}
              onChange={value => handleInputForm('transferType', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="planningSegment"
              name="planningSegment"
              label={t('TRANSFER_INFO.PLANNING_SEGMENT')}
              value={values?.planningSegment}
              optionsData={getPlanningSegmentOptions('planningSegment')}
              onChange={value => handleInputForm('planningSegment', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={classes.row}>
          <Col xs={24} md={8}>
            <NumberInput
              name="transferToleranceMinLimit"
              onChange={value => handleInputForm('transferToleranceMinLimit', value)}
              value={values?.transferToleranceMinLimit}
              disabled={isPending || !isFormEditable || !isPrepackaged}
              label={t('TRANSFER_INFO.MIN_TRANSFER_TOLERANCE_LIMIT')}
              min={0}
              max={100}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              name="transferToleranceMaxLimit"
              onChange={value => handleInputForm('transferToleranceMaxLimit', value)}
              value={values?.transferToleranceMaxLimit}
              disabled={isPending || !isFormEditable || !isPrepackaged}
              label={t('TRANSFER_INFO.MAX_TRANSFER_TOLERANCE_LIMIT')}
              min={0}
              max={100}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={8} lg={4}>
            <Checkbox
              data-testid="frozen-location"
              name="isInFrozenLocation"
              onChange={event => handleInputForm('isInFrozenLocation', event.target.checked)}
              checked={values.isInFrozenLocation}
              disabled={isPending || !isFormEditable}
            >{t('TRANSFER_INFO.IS_IN_FROZEN_LOCATION')}
            </Checkbox>
          </Col>
          <Col xs={8} lg={4}>
            <Checkbox
              name="isAllowedForSelfPurchaseOrder"
              onChange={event => handleInputForm('isAllowedForSelfPurchaseOrder', event.target.checked)}
              checked={values.isAllowedForSelfPurchaseOrder}
              disabled={isPending || !isFormEditable}
            >{t('TRANSFER_INFO.IS_ALLOWED_FOR_SELF_PURCHASED_ORDER')}
            </Checkbox>
          </Col>
          <Col xs={8} lg={4}>
            <Checkbox
              name="isAllowedForSelfTransfer"
              onChange={event => handleInputForm('isAllowedForSelfTransfer', event.target.checked)}
              checked={values.isAllowedForSelfTransfer}
              disabled={isPending || !isFormEditable}
            >{t('TRANSFER_INFO.IS_ALLOWED_FOR_SELF_TRANSFER')}
            </Checkbox>
          </Col>
          <Col xs={8} lg={4}>
            <Checkbox
              name="isPickedToZero"
              onChange={event => handleInputForm('isPickedToZero', event.target.checked)}
              checked={values.isPickedToZero}
              disabled={isPending || !isFormEditable}
            >{t('TRANSFER_INFO.IS_PICKED_TO_ZERO')}
            </Checkbox>
          </Col>
        </Row>
        <EditSaveCancelButtons
          loading={isPending}
          disabled={!canBeSubmittable}
          form={FORM_IDS_SUPPLY.TRANSFER_FORM}
          isFormEditable={isFormEditable}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
});
