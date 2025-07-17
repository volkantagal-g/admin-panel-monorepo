import { memo, useMemo, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Col, Divider, Form, Row } from 'antd';

import { toString } from 'lodash';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { PackagingRows } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/PackagingInfo/PackagingRows';

import { Checkbox, EditSaveCancelButtons, Select, Space } from '@shared/components/GUI';

import { PRODUCT_PACKAGING_TYPE, PRODUCT_STOCK_UNIT_TYPE } from '@shared/shared/constants';

import { productPackagingTypes, productStockUnitTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import {
  PACKAGING_TYPE,
  PRODUCT_DETAIL_COMPONENT_ID,
  PRODUCT_DETAIL_CONTAINER,
} from '@app/pages/MarketProduct/constants';

import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import {
  createSupplyLogisticInfoSelector,
  getIsImperialUsedSelector, getMarketProductAllPriceSelector,
  getSupplyLogisticInfoSelector, updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  Columns,
  PRODUCT_PACKAGING_ROWS,
} from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/PackagingInfo/config';
import { getInitialValues, validationSchema, getUnitType, getModifiedValues, calculateImperialUnits, hasUniqBarcodes } from './formHelper';
import { usePrevious, usePermission } from '@shared/hooks';
import useStyles from './styles';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import permKey from '@shared/shared/permKey.json';

export const PackagingInfo = memo(function PackagingInfot() {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const { id } = useParams();
  const classes = useStyles();
  const packagingTypes = Object.values(PRODUCT_PACKAGING_TYPE);
  const stockUnitType = Object.values(PRODUCT_STOCK_UNIT_TYPE);

  const { Can } = usePermission();

  const [unitType, setUnitType] = useState(PACKAGING_TYPE.UNIT);
  const [isFormEditable, setIsFormEditable] = useState(false);

  const isImperialUnitUsed = useSelector(getIsImperialUsedSelector.getData);
  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);
  const prevIsImperialUnitUsed = usePrevious(isImperialUnitUsed);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.PACKAGING_INFO.containerId });

  const [form] = Form.useForm();
  const formId = 'packagingInfo';
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo, marketProductAllPrice.barcodes),
    [marketProductAllPrice.barcodes, supplyLogisticInfo],
  );
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const { isCreated, ...body } = getModifiedValues({ values, initialValues });
      const isUniq = hasUniqBarcodes(body, t);
      if (isUniq) {
        delete body?.packagingInfo['1']?.volume;
        delete body?.packagingInfo['2']?.volume;
        delete body?.packagingInfo['3']?.volume;
        delete body?.packagingInfo['4']?.volume;
        return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrors }));
      }
      return dispatch(isUniq);
    },
  });
  const { handleSubmit, values, setFieldValue, setValues } = formik;

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
  }, [form, initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setFieldValue, setValues, values]);

  useEffect(() => {
    if (prevIsImperialUnitUsed === false && isImperialUnitUsed) {
      const imperialUnits = calculateImperialUnits(values);
      setFieldValue('imperialUnits', imperialUnits);
    }
    if (isImperialUnitUsed) {
      setUnitType(PACKAGING_TYPE.IMPERIAL);
    }
  }, [isImperialUnitUsed, prevIsImperialUnitUsed, setFieldValue, values]);

  const handleSelectPackagingType = value => {
    setUnitType(value);
    if (value === PACKAGING_TYPE.IMPERIAL) {
      dispatch(Creators.setIsImperialUnitUsed({ isImperialUnitUsed: true }));
    }
    else {
      dispatch(Creators.setIsImperialUnitUsed({ isImperialUnitUsed: false }));
    }
  };

  const handleChangePickingType = packagingType => {
    const newPickingType = {
      [PRODUCT_PACKAGING_TYPE.UNIT]: false,
      [PRODUCT_PACKAGING_TYPE.SUB_PACK]: false,
      [PRODUCT_PACKAGING_TYPE.BOX]: false,
      [PRODUCT_PACKAGING_TYPE.PALLET]: false,
      [packagingType]: true,
    };
    setFieldValue('pickingType', newPickingType);
  };

  return (
    <Space
      title={t('PACKAGING_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        form={form}
        id={formId}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={6} className={classes.packagingColumn}>
            <Select
              dataTestId="unit-type"
              label={t('PACKAGING_INFO.UNIT')}
              value={unitType}
              optionsData={getUnitType(t)}
              onChange={handleSelectPackagingType}
            />
          </Col>
        </Row>
        <Columns />
        {
          PRODUCT_PACKAGING_ROWS(t, isImperialUnitUsed).map(row => (
            <>
              <PackagingRows
                dataTestId={row.fieldKey}
                formik={formik}
                title={row.title}
                colId={row.colId}
                fieldKey={row.fieldKey}
                isImperialUnitUsed={row.isImperialUnitUsed}
                dimension={row.dimension}
                imperialTitle={row.imperialTitle}
                disabled={row.isDisabled || isPending || !isFormEditable}
              />
              <Divider className="mt-2 mb-2" />
            </>

          ))
        }
        <PackagingRows
          formik={formik}
          colId={PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_UNIT_BARCODES}
          isImperialUnitUsed={isImperialUnitUsed}
          disabled={isPending || !isFormEditable}
          isBarcodesRow
        />
        <Divider className="mt-2 mb-2" />
        <Row
          gutter={[2, 2]}
          id={PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_PICKING_TYPE}
          className={classes.packagingRow}

        >
          <Col span={4}>
            {t('PACKAGING_INFO.PICKING_TYPE')}
          </Col>
          {packagingTypes.map((packagingType, index) => (
            <Col span={5} key={toString(index)}>
              <Checkbox
                centerForm="mb-0"
                name={['pickingType', packagingType]}
                checked={values?.pickingType?.[packagingType]}
                onChange={() => handleChangePickingType(packagingType)}
                disabled={isPending || !isFormEditable}
              >
                {productPackagingTypes?.[packagingType]?.[getLangKey()]}
              </Checkbox>
            </Col>
          ))}
        </Row>
        <Divider className="mt-2 mb-2" />
        <Row
          gutter={[2, 2]}
          id={PRODUCT_DETAIL_COMPONENT_ID.PACKAGING_INFO_STOCK_TYPE}
          className={classes.packagingRow}
        >
          <Col span={4}>
            {t('PACKAGING_INFO.STOCK_UNIT_INFO')}
          </Col>
          {stockUnitType.map((stockMeasureUnitType, index) => (
            <Col span={5} key={toString(index)}>
              <Checkbox
                centerForm="mb-0"
                name={['stockUnitOfMeasurement', stockMeasureUnitType]}
                checked={values?.stockUnitOfMeasurement?.[stockMeasureUnitType]}
                disabled
              >
                {productStockUnitTypes?.[stockMeasureUnitType]?.[getLangKey()]}
              </Checkbox>
            </Col>
          ))}
        </Row>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <EditSaveCancelButtons
            form={formId}
            isFormEditable={isFormEditable}
            loading={isPending}
            onCancelClick={handleCancelClick}
            onEditClick={handleEditClick}
          />
        </Can>
      </Form>
    </Space>
  );
});
