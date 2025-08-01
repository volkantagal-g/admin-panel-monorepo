import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { Button, Col, Collapse, Form, InputNumber, Row, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getSelectFilterOption, isCurrentCountryTurkey } from '@shared/utils/common';

import { updateFinancialConditionSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getFinancedByOptions,
  getFoodBasketValueBehaviorTypeOptions,
  getOnlyModifiedValuesBeforeSubmit,
  getPaymentMethodsOptions,
  validateValues,
} from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { PROMO_FINANCED_BY, PROMO_MECHANICS } from '@app/pages/Promo/constantValues';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getSupplierOptions } from '@app/pages/Promo/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const FinancialConditionForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const selectedCountry = getSelectedCountry();
  const initialValues = useSelector(PromoDetailSlice.selectors.financialConditionFormInitialValues);
  const promoMechanic = useSelector(PromoDetailSlice.selectors.promoMechanic);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const isUpdatePending = useSelector(
    updateFinancialConditionSelector.getIsPending,
  );
  const updateError = useSelector(updateFinancialConditionSelector.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      try {
        validateValues({ values, t });
        const body = getOnlyModifiedValuesBeforeSubmit({ values });
        return dispatch(
          Creators.updateFinancialConditionRequest({ body }),
        );
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const isNotFinancedByGetir = +values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER || +values.promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY;

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [
    prevIsUpdatePending,
    setIsFormEditable,
    setValues,
    updateError,
    isUpdatePending,
    initialValues,
  ]);

  useEffect(() => {
    dispatch(CommonCreators.getSuppliersRequest());
  }, [dispatch]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleFinancedByChange = promoFinancedBy => {
    setFieldValue('promoFinancedBy', promoFinancedBy);
    if (+promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER) {
      setFieldValue('thirdPartySupportRate', 0);
    }
    else if (+promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY) {
      // setFieldValue('supplier', null);
      setFieldValue('thirdPartySupportRate', 1);
      setFieldValue('supplierSupportRate', 0);
      setFieldValue('isFreeProduct', false);
    }
    else if (+promoFinancedBy === PROMO_FINANCED_BY.GETIR) {
      // setFieldValue('supplier', null);
      setFieldValue('thirdPartySupportRate', 0);
      setFieldValue('supplierSupportRate', 0);
      setFieldValue('isFreeProduct', false);
    }
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                type="primary"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
                onClick={() => handleSubmit()}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Form
      layout="vertical"
    >
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('FINANCIAL_CONDITION.PAYMENT_METHODS')}
            className="d-inline"
          >
            <Select
              labelInValue
              allowClear
              value={values.paymentMethods}
              options={getPaymentMethodsOptions(selectedCountry)}
              onChange={paymentMethods => {
                setFieldValue('paymentMethods', paymentMethods);
              }}
              disabled={isUpdatePending || !isFormEditable}
              autoComplete="off"
              showSearch
              mode="multiple"
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        {!isListingPromo &&
          promoMechanic !==
          PROMO_MECHANICS.BASKET_BASED_CHANGE_PRICE &&
          promoMechanic !== PROMO_MECHANICS.STAR_DEALS && (
            <Col span={12} className="mt-2">
              <Form.Item
                label={t('FINANCIAL_CONDITION.DO_NOT_APPLY_BASKET_SIZE')}
              >
                <input
                  type="checkbox"
                  disabled={
                    isUpdatePending ||
                    !isFormEditable ||
                    isListingPromo
                  }
                  checked={values.doNotApplyMinimumBasketSize}
                  onChange={e => setFieldValue(
                    'doNotApplyMinimumBasketSize',
                    e.target.checked,
                  )}
                />
              </Form.Item>
            </Col>
        )}
      </Row>

      <Row gutter={[theme.spacing(3)]}>
        {!isListingPromo && (
          <Col span={12} className="mt-2">
            <Form.Item label={t('FINANCIAL_CONDITION.MIN_BASKET_SIZE')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('FINANCIAL_CONDITION.MIN_BASKET_SIZE')}
                onChange={value => setFieldValue('minOrderTotalPrice', value ?? 0)}
                size="large"
                min={0}
                className="w-100"
                value={values?.minOrderTotalPrice}
              />
            </Form.Item>
          </Col>
        )}
        <Col span={12} className="mt-2">
          <Form.Item label={t('FINANCIAL_CONDITION.MAX_BASKET_SIZE')}>
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              placeholder={t('FINANCIAL_CONDITION.MAX_BASKET_SIZE')}
              onChange={value => setFieldValue('maxOrderTotalPrice', value ?? 0)}
              size="large"
              min={0}
              className="w-100"
              value={values?.maxOrderTotalPrice}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[theme.spacing(3)]}>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('FINANCIAL_CONDITION.PROMO_MIN_BASKET_CHOICE')}
          >
            <Select
              labelInValue
              allowClear
              value={values.foodBasketValueBehaviorType}
              options={getFoodBasketValueBehaviorTypeOptions()}
              onChange={foodBasketValueBehaviorType => {
                setFieldValue(
                  'foodBasketValueBehaviorType',
                  foodBasketValueBehaviorType?.value,
                );
              }}
              disabled={isUpdatePending || !isFormEditable}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mt-2">
          <Form.Item label={t('FINANCIAL_CONDITION.VALID_CARD_BINS')}>
            <Select
              labelInValue
              allowClear
              value={values.cardBins}
              options={[]}
              onChange={cardBins => {
                setFieldValue('cardBins', cardBins);
              }}
              disabled={isUpdatePending || !isFormEditable}
              autoComplete="off"
              mode="tags"
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('FINANCIAL_CONDITION.FINANCED_BY')}
            className="d-inline"
          >
            <Select
              allowClear
              value={values.promoFinancedBy}
              options={getFinancedByOptions()}
              onChange={handleFinancedByChange}
              disabled={isUpdatePending || !isFormEditable}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
      </Row>
      {isNotFinancedByGetir && (
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12} className="mt-2">
            <Form.Item
              label={t('FINANCIAL_CONDITION.SUPPLIER')}
              className="d-inline"
            >
              <Select
                allowClear
                value={values.supplier}
                options={getSupplierOptions(suppliers, isCurrentCountryTurkey())}
                onChange={supplier => setFieldValue('supplier', supplier)}
                disabled={isUpdatePending || !isFormEditable}
                suffixIcon={isSupplierPending && <LoadingOutlined spin />}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            {
              values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER.toString() && (
                <Form.Item
                  label={t('FINANCIAL_CONDITION.SUPPLIER_SUPPORT_RATE')}
                >
                  <InputNumber
                    disabled={isUpdatePending || !isFormEditable}
                    placeholder={t('FINANCIAL_CONDITION.SUPPLIER_SUPPORT_RATE')}
                    onChange={value => setFieldValue('supplierSupportRate', value)}
                    size="large"
                    min={0}
                    className="w-100"
                    value={values?.supplierSupportRate}
                  />
                </Form.Item>
              )
            }
            {
              values.promoFinancedBy === PROMO_FINANCED_BY.THIRD_PARTY.toString() && (
                <Form.Item
                  label={t('FINANCIAL_CONDITION.THIRD_PARTY_SUPPORT_RATE')}
                >
                  <InputNumber
                    disabled={isUpdatePending || !isFormEditable}
                    placeholder={t('FINANCIAL_CONDITION.THIRD_PARTY_SUPPORT_RATE')}
                    onChange={value => setFieldValue('thirdPartySupportRate', value)}
                    size="large"
                    min={0}
                    className="w-100"
                    value={values?.thirdPartySupportRate}
                  />
                </Form.Item>
              )
            }
          </Col>
          {
            values.promoFinancedBy === PROMO_FINANCED_BY.SUPPLIER.toString() && (
              <Col span={12} className="mt-2">
                <Form.Item label={t('FINANCIAL_CONDITION.IS_FREE_PRODUCT')}>
                  <input
                    type="checkbox"
                    disabled={isUpdatePending || !isFormEditable}
                    checked={values.isFreeProduct}
                    onChange={e => setFieldValue('isFreeProduct', e.target.checked)}
                  />
                </Form.Item>
              </Col>
            )
          }
        </Row>
      )}
      {canEdit && cardFooter}
    </Form>
  );
};

const FinancialConditionSection = memo(function FinancialConditionSection() {
  const { t } = useTranslation('promoPage');

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent) {
    return null;
  }

  return (
    <Collapse className="mb-2">
      <Panel header={t('FINANCIAL_CONDITION.HEADER_TITLE')} key={1}>
        <FinancialConditionForm />
      </Panel>
    </Collapse>
  );
});

export default FinancialConditionSection;
