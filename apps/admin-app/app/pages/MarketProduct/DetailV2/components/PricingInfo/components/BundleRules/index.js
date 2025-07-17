import { memo, useEffect, useMemo, useState } from 'react';

import { Typography, Empty, Form, Row, Col } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  getMarketProductAllPriceSelector,
  updateBundleSubProductPricesSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getBundlePricings,
  getIds, filterBundleSubProducts, calculateFreshPrice,
} from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { FormItems } from './components/FormItems';
import { EditSaveCancelButtons, InfoIcon } from '@shared/components/GUI';
import { validate } from '@shared/yup';
import { FORM_IDS } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { BaseBundlePrice } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/components/BaseBundlePrice';
import { usePrevious } from '@shared/hooks';
import { BundleStruckPrice } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/components/BundleStruckPrice';
import { getMarketProductsSelector, getSuppliersSelector } from '@shared/redux/selectors/common';
import { canSubmit } from '@shared/utils/formHelper';

import useStyles from './styles';

const { Title } = Typography;

export const BundleRules = memo(function BundleRules() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: productId } = useParams();
  const { t } = useTranslation('marketProductPageV2');

  const [isFormEditable, setIsFormEditable] = useState(false);
  const suppliers = useSelector(getSuppliersSelector.getData);
  const { subProductPrices } = useSelector(getMarketProductAllPriceSelector.getData);
  const products = useSelector(getMarketProductsSelector.getData);
  const isUpdateBundlePricingPending = useSelector(updateBundleSubProductPricesSelector.getIsPending);
  const updateError = useSelector(updateBundleSubProductPricesSelector.getError);
  const { defaultValue, list } = useMemo(() => filterBundleSubProducts(subProductPrices), [subProductPrices]);
  const [filteredSubProducts, setFilteredSubProducts] = useState(list);
  const [selectedDomainType, setSelectedDomainType] = useState(defaultValue);
  const prevIsUpdatePending = usePrevious(isUpdateBundlePricingPending);
  const classes = useStyles();

  const initialValues = useMemo(
    () => getInitialValues({ filteredSubProducts }),
    [filteredSubProducts],
  );

  const productIdsOfBundlePricing = useMemo(() => getIds(filteredSubProducts), [filteredSubProducts]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, { productIdsOfBundlePricing }),
    initialValues,
    onSubmit: values => {
      const subProductPricesList = getBundlePricings(Object.values(values), suppliers);
      const body = { subProductPrices: subProductPricesList, productId, domainType: selectedDomainType };
      dispatch(Creators.updateBundleSubProductPricesRequest({ body }));
    },
  });
  const { handleSubmit, setFieldValue, setValues, values, errors, setErrors } = formik;

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
    setErrors({});
  };
  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleDomainChange = value => {
    setSelectedDomainType(Number(value));
    setFilteredSubProducts(subProductPrices?.filter(({ domainType }) => Number(domainType) === Number(value)));
  };

  const handleBasePriceChange = basePrice => {
    const id = Object.keys(values);
    if (id?.length) {
      const calculatedValue = calculateFreshPrice(basePrice, values?.[id[0]]?.count);
      id.push('price');
      setFieldValue(id, calculatedValue);
    }
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdateBundlePricingPending) {
      setIsFormEditable(false);
      if (updateError) {
        setValues(initialValues);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateBundlePricingPending, prevIsUpdatePending, setValues, updateError, values]);

  useEffect(() => {
    if (selectedDomainType !== defaultValue) {
      const { list: filteredData } = filterBundleSubProducts(subProductPrices, selectedDomainType);
      setFilteredSubProducts(filteredData);
    }
    else if (list?.length) {
      setFilteredSubProducts(list);
    }
  }, [list, selectedDomainType, subProductPrices, defaultValue]);

  const canBeSubmittable = useMemo(
    () => {
      let isSubProductPricesListValid = true;
      Object.values(initialValues).forEach(item => {
        if (!item?.ruleset?.originalPrice) {
          isSubProductPricesListValid = false;
        }
      });
      return isSubProductPricesListValid && canSubmit({ initialValues, values });
    },
    [initialValues, values],
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={4}>{t('BUNDLING_RULES')}</Title>
      </Col>
      <Col span={24}>
        <BaseBundlePrice
          defaultValue={selectedDomainType}
          onDomainChange={handleDomainChange}
          isFormEditable={isFormEditable}
          onBaseBundlePriceChange={handleBasePriceChange}
        />
      </Col>
      <Col span={24} className={classes.row}>
        <Title level={5}>{t('PRODUCTS')} {' '}
          {!canBeSubmittable && isFormEditable ? (
            <span>
              <InfoIcon title={t('CHECK_SUB_PRODUCTS_DOMAIN_PRICE')} />
            </span>
          ) : null}
        </Title>
      </Col>
      {filteredSubProducts?.length ? (
        <>
          <Col span={24}>
            <Form
              form={form}
              onFinish={handleSubmit}
              id={FORM_IDS.BUNDLE_RULES}
              initialValues={initialValues}
            >
              <Row gutter={[16, 16]} align="middle">
                {filteredSubProducts?.map(data => (
                  <Col span={24} key={data?.id}>
                    <FormItems
                      setFieldValue={setFieldValue}
                      key={data?.id}
                      data={data}
                      formValues={values[data?.id]}
                      isFormEditable={isFormEditable}
                      errors={errors}
                      nameAndPictures={products}
                    />
                  </Col>
                ))}
              </Row>
              <EditSaveCancelButtons
                disabled={!canBeSubmittable}
                form={FORM_IDS.BUNDLE_RULES}
                isFormEditable={isFormEditable}
                onCancelClick={handleCancelClick}
                onEditClick={handleEditClick}
                loading={isUpdateBundlePricingPending}
              />
            </Form>
          </Col>
          <Col span={24}>
            <BundleStruckPrice selectedDomainType={selectedDomainType} />
          </Col>
        </>
      ) : (
        <Col span={24}>
          <Empty />
        </Col>
      )}
    </Row>
  );
});
