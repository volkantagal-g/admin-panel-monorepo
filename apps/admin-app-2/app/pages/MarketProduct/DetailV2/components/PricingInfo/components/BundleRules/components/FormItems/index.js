import { memo, useMemo } from 'react';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import Title from 'antd/lib/typography/Title';

import { useSelector } from 'react-redux';

import { Image, PercentageInput, Select, TextInput } from '@shared/components/GUI';

import { getStruckPriceSupporterOptions } from '@app/pages/MarketProduct/commonFormHelper';
import { STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import LinkOrText from '@shared/components/UI/LinkOrText';

import useStyles from './styles';
import { ValueRateInput } from '../ValueRateInput';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { extractSupplierAndManufacturer, getSupplierAndManufacturerOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { getMarketProductAllPriceSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getSuppliersSelector } from '@shared/redux/selectors/common';

import { DISCOUNT_TYPE } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';

export const FormItems = memo(function FormItems({ data, formValues, setFieldValue, isFormEditable, errors, nameAndPictures }) {
  const { t } = useTranslation('marketProductPageV2');
  const id = data?.id;
  const classes = useStyles();

  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const allPrices = useSelector(getMarketProductAllPriceSelector.getData);
  const productsSuppliersIds = useMemo(() => allPrices?.supplierBuyingFinancials?.map(({ supplierId }) => supplierId), [allPrices?.supplierBuyingFinancials]);
  const { supplier } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );
  const productsSuppliers = useMemo(() => supplier.filter(({ _id }) => productsSuppliersIds?.includes(_id)), [productsSuppliersIds, supplier]);

  const relatedProduct = useMemo(() => nameAndPictures?.find(({ _id }) => _id === data?.productId), [data?.productId, nameAndPictures]);

  const isPercantageDisabled = Number(formValues?.providerType) === STRUCK_PRICE_SUPPORTER_TYPE.FREE ||
    Number(formValues?.providerType) === STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED;

  const handleChange = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };

  const supportRateDisabled = !(formValues?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString() ||
    formValues?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString());

  const supplierOptionCandidate = useMemo(() => {
    if (formValues?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString()) return productsSuppliers;
    if (formValues?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString()) return supplier;
    return [];
  }, [formValues?.providerType, productsSuppliers, supplier]);
  const supplierOptions = useMemo(() => getSupplierAndManufacturerOptions(supplierOptionCandidate), [supplierOptionCandidate]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col xs={24} lg={5}>
        <Row className="flex-nowrap">
          <Image
            src={relatedProduct?.picURL?.[getLangKey()]}
            className={classes.image}
          />
          <Title level={5} className={classes.productName}>
            <LinkOrText
              permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL}
              to={ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', relatedProduct?._id)}
              text={relatedProduct?.fullName?.[getLangKey()]}
              target="_blank"
            />
          </Title>
        </Row>
      </Col>
      <Col xs={12} lg={2}>
        <TextInput
          disabled
          label={t('PRICE')}
          value={formValues?.price}
          name={[id, 'price']}
          onChange={({ target: { value } }) => handleChange([id, 'price'], value)}
        />
      </Col>
      <Col xs={12} lg={2}>
        <TextInput
          disabled
          label={t('COUNT')}
          name={[id, 'count']}
          value={formValues?.count}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={4}>
        <ValueRateInput
          disabled={!isFormEditable}
          label={t('DISCOUNT')}
          name={[id, 'ruleset']}
          value={formValues?.ruleset?.value}
          type={formValues?.ruleset?.type || DISCOUNT_TYPE.PERCENTAGE}
          handleChange={value => handleChange([id, 'ruleset'], value)}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={3}>
        <Select
          label={t('SUPPORT_TYPE')}
          name={[id, 'providerType']}
          optionsData={getStruckPriceSupporterOptions()}
          onChange={value => handleChange([id, 'providerType'], value)}
          value={formValues?.providerType}
          disabled={!isFormEditable}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={4}>
        <Select
          dataTestId="supplier"
          name={[id, 'supplierId']}
          label={t('SUPPLIER')}
          showSearch
          filterOption={getSelectFilterOption}
          optionsData={supplierOptions}
          onChange={value => handleChange([id, 'supplierId'], value)}
          loading={isSupplierPending}
          disabled={!isFormEditable || supportRateDisabled}
          allowClear
          errors={errors}
          value={formValues?.supplierId}
        />
      </Col>
      <Col xs={12} lg={4}>
        <PercentageInput
          name={[id, 'supportRate']}
          label={t('SUPPORT_RATE')}
          disabled={isPercantageDisabled || !isFormEditable}
          value={formValues?.supportRate}
          onChange={value => handleChange([id, 'supportRate'], value)}
          errors={errors}
        />
      </Col>
    </Row>
  );
});
