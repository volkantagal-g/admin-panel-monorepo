import { DownloadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Collapse, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { useFormik } from 'formik';
import { ChangeEventHandler, memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { pick } from 'lodash';

import PromoProductSelect from '@shared/containers/Marketing/Select/PromoProductSelect';
import { usePrevious } from '@shared/hooks';
import {
  getBenefitProductsSelector,
  getMarketProductsByIdsSelector,
  updateBenefitTypeSelector,
} from '@app/pages/Promo/Detail/redux/selectors';
import { marketProductSelector } from '@shared/containers/Marketing/Select/PromoProductSelect/redux/selectors';

import { ERROR_TIMEOUT_MS, getBenefitType } from '@app/pages/Promo/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { downloadDataAsCSV, getSelectFilterOption } from '@shared/utils/common';
import { canSubmit } from '@shared/utils/formHelper';
import { Creators } from '../../redux/actions';
import { ExampleCSV } from '../ExampleCSVModal';
import {
  BenefitTypeFormType,
  discountPriceNumberInputParser,
  findDuplicateProductId,
  getBenefitCSVData,
  getDiscountAmountText,
  getDiscountTypesOptions,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  showMultiUsage,
  validateValues,
} from './formHelper';

import ProductSelectTable from '../ConditionProductsForm/ProductSelectTable';
import BenefitTypeSAP from '../BenefitTypeSAP';
import { Hint } from '@app/pages/Promo/Detail/components/Hint';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { BenefitItem, BenefitProduct, BenefitType, MarketProduct, PromoMechanic } from '@app/pages/Promo/types';
import { CardFooter } from '@app/pages/Promo/Detail/components/BenefitTypeForm/config';
import { ImportProducts } from '@app/pages/Promo/Detail/components/BenefitTypeForm/ImportProducts';
import { ImportResult } from '@app/pages/Promo/Detail/components/BenefitTypeForm/ImportResult';

const { Panel } = Collapse;

const productCsvExample = (promoMechanic: PromoMechanic) => [{
  item: 'id',
  saleLimit: 'number',
  ...([PromoMechanic.STAR_DEALS, PromoMechanic.BASKET_CHANGE_PRICE].includes(promoMechanic) && { discountedPrice: 'number' }),
  supplierSupport: 'number',
  thirdPartySupport: 'number',
  supplierSupportReferenceId: 'id',
  thirdPartyReferenceId: 'id',
}];

const columns = (isDiscountAmountAvailable: boolean) => [
  {
    item: 'item',
    alreadySold: 'alreadySold',
    saleLimit: 'saleLimit',
    ...(isDiscountAmountAvailable && { discountedPrice: 'discountedPrice' }),
    supplierSupport: 'supplierSupport',
    thirdPartySupport: 'thirdPartySupport',
    supplierSupportReferenceId: 'supplierSupportReferenceId',
    thirdPartyReferenceId: 'thirdPartyReferenceId',
  },
];

type SinglePromoCSVProps = {
  setImportedProducts: (value: (((prevState: BenefitProduct[]) => BenefitProduct[]) | BenefitProduct[])) => void,
  isUpdatePending: boolean,
  isFormEditable: boolean
  onDownloadCSV: () => void
  exampleCsv: Record<string, string | boolean | number>[]
}

function SinglePromoCSV({ setImportedProducts, isUpdatePending, isFormEditable, onDownloadCSV, exampleCsv }: SinglePromoCSVProps) {
  const { t } = useTranslation('promoPage');

  return (
    <Row gutter={[12, 12]}>
      <Col
        span={12}
        className="d-flex mt-2"
      >
        <ImportProducts
          setImportedProducts={setImportedProducts}
          isUpdatePending={isUpdatePending}
          isFormEditable={isFormEditable}
        />
        <ExampleCSV exampleCsv={exampleCsv} />
        <Button
          icon={<DownloadOutlined />}
          className="ml-1"
          onClick={onDownloadCSV}
          loading={isUpdatePending}
          disabled={!isFormEditable}
          id="benefit-type_download-csv"
        >
          {t('CONDITION_PRODUCTS.DOWNLOAD_CSV')}
        </Button>
      </Col>
    </Row>
  );
}

const BenefitTypeForm = () => {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isMasterPromo = useSelector(PromoDetailSlice.selectors.isMaster);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);
  const isDiscountAmountAvailable = useSelector(PromoDetailSlice.selectors.isDiscountAmountAvailable);
  const isUpdatePending = useSelector(updateBenefitTypeSelector.getIsPending);
  const benefitProducts: BenefitItem[] = useSelector(getBenefitProductsSelector.getData);
  const initialBenefitProducts = useRef<BenefitProduct[]>(benefitProducts);
  const marketProductsMap: Record<MongoIDType, MarketProduct> = useSelector(marketProductSelector.getMarketProductsMap);
  const updateError = useSelector(updateBenefitTypeSelector.getError);
  const marketProductsByIds: MarketProduct[] = useSelector(getMarketProductsByIdsSelector.getData);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [importCount, setImportCount] = useState(0);
  const [failedImportCount, setFailedImportCount] = useState(0);
  const [importedProducts, setImportedProducts] = useState<BenefitProduct[]>([]);
  const [discountAmountText, setDiscountAmountText] = useState(
    getDiscountAmountText(getBenefitType(promo)),
  );
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useMemo(() => getInitialValues(promo), [promo]);

  const formik = useFormik<BenefitTypeFormType>({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      try {
        const body = getOnlyModifiedValuesBeforeSubmit({
          values,
          benefitProducts,
        });

        validateValues({ values, promo, t, body, isListingPromo });

        dispatch(
          Creators.updateBenefitTypeRequest({ body }),
        );
      }
      catch (error) {
        dispatch(
          ToastCreators.error({
            error,
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }),
        );
      }
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, handleChange } =
    formik;
  const [selectedBenefitType, setSelectedBenefitType] = useState(Number(values.benefitType));

  // Diffs both the conditionalProducts in the Table, and the formik values to see if there are any changes
  const canBeSubmittable = useMemo(() => {
    const productIdsOrConditionsModified = canSubmit({ initialValues, values });

    if (productIdsOrConditionsModified) {
      return true;
    }

    const keysToCheckDiff = ['discountedPrice', 'saleLimit', 'supplierSupport', 'supplierSupportReferenceId', 'thirdPartySupport', 'thirdPartyReferenceId'];

    return canSubmit({
      initialValues: promo.items,
      values: benefitProducts.map(product => pick(product, keysToCheckDiff)),
    });
  }, [initialValues, values, promo?.items, benefitProducts]);

  function getBenefitProductValueFromState<K extends keyof BenefitItem>(fieldName: K, productId: MongoIDType): BenefitItem[K] | null {
    return benefitProducts.find(
      product => product.id === productId,
    )?.[fieldName] ?? null;
  }

  function getBenefitProductValueFromDb<K extends keyof BenefitItem>(fieldName: K, productId: MongoIDType): BenefitItem[K] | null {
    return promo.items.find(
      product => product.id === productId,
    )?.[fieldName] ?? null;
  }

  function tryValueFromStateFallbackDb<K extends keyof BenefitItem>(fieldName: K, productId: MongoIDType): BenefitItem[K] | null {
    const value = getBenefitProductValueFromState(fieldName, productId);
    if (value !== null) {
      return value;
    }
    return getBenefitProductValueFromDb(fieldName, productId);
  }

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
    const productIds: MongoIDType[] = values.items;
    if (
      productIds?.length &&
      marketProductsMap &&
      Object.values(marketProductsMap)?.length
    ) {
      const productsData = productIds.map(productId => {
        const productData = marketProductsMap[productId];
        return {
          id: productId,
          fullName: productData?.fullName,
          picURL: productData?.picURL,
          type: productData?.type,
          isBundle: productData?.isBundle,
          saleLimit: tryValueFromStateFallbackDb('saleLimit', productId),
          ...(isDiscountAmountAvailable && { discountedPrice: tryValueFromStateFallbackDb('discountedPrice', productId) }),
          supplierSupport: tryValueFromStateFallbackDb(
            'supplierSupport',
            productId,
          ),
          thirdPartySupport: tryValueFromStateFallbackDb(
            'thirdPartySupport',
            productId,
          ),
          alreadySold: tryValueFromStateFallbackDb('alreadySold', productId),
          supplierSupportReferenceId: tryValueFromStateFallbackDb(
            'supplierSupportReferenceId',
            productId,
          ),
          thirdPartyReferenceId: tryValueFromStateFallbackDb(
            'thirdPartyReferenceId',
            productId,
          ),
        };
      });
      dispatch(Creators.getBenefitProductsRequest({ data: productsData }));
      initialBenefitProducts.current = productsData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketProductsMap, dispatch, isDiscountAmountAvailable]);

  const handleBenefitProductsChange = (productIds: MongoIDType[], productsMap: Record<string, MarketProduct>) => {
    if (productIds?.length) {
      const duplicateProductId = findDuplicateProductId(productIds);
      if (duplicateProductId) {
        return dispatch(
          ToastCreators.error({ message: t('BENEFIT_TYPE.ERRORS.DUPLICATE_PRODUCT_ID', { productId: duplicateProductId }) }),
        );
      }
      const productsData = productIds.map(productId => {
        const productData = productsMap[productId];
        return {
          id: productId,
          fullName: productData?.fullName,
          picURL: productData?.picURL,
          type: productData?.type,
          isBundle: productData?.isBundle,
          saleLimit: getBenefitProductValueFromState('saleLimit', productId),
          ...(isDiscountAmountAvailable && { discountedPrice: getBenefitProductValueFromState('discountedPrice', productId) }),
          supplierSupport: getBenefitProductValueFromState(
            'supplierSupport',
            productId,
          ),
          thirdPartySupport: getBenefitProductValueFromState(
            'thirdPartySupport',
            productId,
          ),
          alreadySold: getBenefitProductValueFromState(
            'alreadySold',
            productId,
          ),
          supplierSupportReferenceId: getBenefitProductValueFromState(
            'supplierSupportReferenceId',
            productId,
          ),
          thirdPartyReferenceId: getBenefitProductValueFromState(
            'thirdPartyReferenceId',
            productId,
          ),
        };
      });
      setFieldValue('items', productIds);
      return dispatch(
        Creators.getBenefitProductsRequest({ data: productsData }),
      );
    }
    setFieldValue('items', []);
    return dispatch(Creators.getBenefitProductsRequest({ data: [] }));
  };

  const resetValues = () => {
    setValues(initialValues);
    setIsFormEditable(false);
    setImportCount(0);
    setFailedImportCount(0);
  };

  const handleCancelClick = () => {
    resetValues();
    dispatch(
      Creators.getBenefitProductsRequest({ data: initialBenefitProducts.current }),
    );
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleDeliveryFeeChange: ChangeEventHandler<HTMLInputElement> = e => {
    setFieldValue('doNotCharge', e.target.checked);
    setFieldValue('amount', null);
  };

  const handleBenefitChange = (option: string) => {
    const benefitType = Number(option);
    setSelectedBenefitType(benefitType);
    setFieldValue('benefitType', option);
    setDiscountAmountText(getDiscountAmountText(benefitType));
  };

  useEffect(() => {
    if (marketProductsByIds.length) {
      const marketProductsIds = marketProductsByIds.map(pro => pro._id);
      const finalImportedProducts = importedProducts.filter(product => marketProductsIds.includes(product.id));

      if (importedProducts.length > marketProductsIds.length) {
        setFailedImportCount(importedProducts.length - marketProductsIds.length);
      }

      setImportCount(finalImportedProducts.length);
      dispatch(Creators.getBenefitProductsRequest({ data: finalImportedProducts }));
      setFieldValue('items', marketProductsIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, marketProductsByIds, setFieldValue]);

  return (
    <Form
      id="benefit-type"
      layout="vertical"
    >
      {isMasterPromo && <BenefitTypeSAP />}
      {!isMasterPromo && (
        <SinglePromoCSV
          setImportedProducts={setImportedProducts}
          isUpdatePending={isUpdatePending}
          isFormEditable={isFormEditable}
          onDownloadCSV={() => downloadDataAsCSV({
            data: getBenefitCSVData(promo?.items, isDiscountAmountAvailable),
            columns: columns(isDiscountAmountAvailable),
          })}
          exampleCsv={productCsvExample(promo?.promoMechanic)}
        />
      )}
      <ImportResult importCount={importCount} failedImportCount={failedImportCount} />
      {!isMasterPromo && (
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={24} className="mt-2">
            <PromoProductSelect
              value={values.items}
              selectedProducts={values.items}
              disabled={isUpdatePending || !isFormEditable}
              onChange={handleBenefitProductsChange}
              mode="multiple"
            />
          </Col>
          {!!benefitProducts.length && (
            <Col xs={24} lg={24} className="mt-2">
              <ProductSelectTable
                isFormEditable={isFormEditable}
                selectedProducts={benefitProducts}
                tableType="benefit"
                showDiscountedPrice={isDiscountAmountAvailable}
              />
            </Col>
          )}
        </Row>
      )}
      {!isDiscountAmountAvailable && (
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={24} className="mt-2">
            <Form.Item
              label={t('BENEFIT_TYPE.DISCOUNT_TYPE')}
              className="d-inline"
            >
              <Select
                allowClear
                value={values.benefitType}
                options={getDiscountTypesOptions(promo?.promoMechanic)}
                onChange={handleBenefitChange}
                disabled={isUpdatePending || !isFormEditable}
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(selectedBenefitType === BenefitType.Percent && !isDiscountAmountAvailable) && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item
              label={`${t('BENEFIT_TYPE.DISCOUNT_AMOUNT')} (0-1)`}
            >
              <Input
                value={values.discountAmount}
                disabled={isUpdatePending || !isFormEditable}
                name="discountAmount"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            <Form.Item
              label={`${t('BENEFIT_TYPE.DISCOUNT_RATIO')} (${
                values.discountRatio
              })`}
            >
              <Input
                value={values.discountRatio}
                disabled
                name="discountRatio"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}
                onChange={value => setFieldValue('maxItemCount', value)}
                size="large"
                min={0}
                className="w-100"
                value={values?.maxItemCount}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {selectedBenefitType === BenefitType.Amount && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item
              label={`${t(
                'BENEFIT_TYPE.DISCOUNT_AMOUNT',
              )} ${discountAmountText}`}
            >
              <Input
                value={values.discountAmount}
                disabled={isUpdatePending || !isFormEditable}
                name="discountAmount"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}
                onChange={value => setFieldValue('maxItemCount', value)}
                size="large"
                min={0}
                className="w-100"
                value={values?.maxItemCount}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {selectedBenefitType === BenefitType.DiscountedAmount && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.DISCOUNTED_PRICE')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('BENEFIT_TYPE.DISCOUNTED_PRICE')}
                onChange={value => setFieldValue('changePrice', value)}
                size="large"
                min={0}
                className="w-100"
                value={values.changePrice}
                parser={(val?: string) => Number(discountPriceNumberInputParser(val))}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}
                onChange={value => setFieldValue('maxItemCount', value)}
                size="large"
                min={0}
                className="w-100"
                value={values?.maxItemCount}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {isDiscountAmountAvailable && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}>
              <InputNumber
                disabled={isUpdatePending || !isFormEditable}
                placeholder={t('BENEFIT_TYPE.MAX_ITEM_COUNT')}
                onChange={value => setFieldValue('maxItemCount', value)}
                size="large"
                min={0}
                className="w-100"
                value={values?.maxItemCount}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {(!isListingPromo && !isDiscountAmountAvailable) && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.DO_NOT_CHARGE_DELIVERY')}>
              <input
                type="checkbox"
                disabled={
                  isUpdatePending ||
                  !isFormEditable ||
                  isListingPromo
                }
                checked={values.doNotCharge}
                onChange={handleDeliveryFeeChange}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="mt-2">
            <Form.Item label={t('BENEFIT_TYPE.DELIVERY_FEE_AMOUNT')}>
              <Input
                value={values.amount ?? ''}
                disabled={
                  isUpdatePending || !isFormEditable || values.doNotCharge
                }
                name="amount"
                onChange={handleChange}
                placeholder={t('BENEFIT_TYPE.DELIVERY_FEE_HINT')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {showMultiUsage(promo.promoMechanic) && (
        <Row gutter={[12, 12]}>
          <Col span={12} className="mt-2">
            <Form.Item label={(
              <Space align="center">
                {t('BENEFIT_TYPE.DONT_ALLOW_MULTI_USAGE')}
                <Hint translationKey="promoPage:HINT.MULTIPLE_TIME_USAGE" placement="topLeft" />
              </Space>
            )}
            >
              <Checkbox
                disabled={promo.promoMechanic === PromoMechanic.STAR_DEALS || isUpdatePending || !isFormEditable}
                checked={values.doNotAllowMultiUsage}
                onChange={e => setFieldValue('doNotAllowMultiUsage', e.target.checked)}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <CardFooter
        isFormEditable={isFormEditable}
        handleCancelClick={handleCancelClick}
        canBeSubmittable={canBeSubmittable}
        handleEditClick={handleEditClick}
        handleSubmit={handleSubmit}
      />
    </Form>
  );
};

const BenefitTypeSection = memo(function BenefitTypeSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Collapse className="mb-2">
      <Panel header={t('BENEFIT_TYPE.HEADER_TITLE')} key={1}>
        <BenefitTypeForm />
      </Panel>
    </Collapse>
  );
});

export default BenefitTypeSection;
