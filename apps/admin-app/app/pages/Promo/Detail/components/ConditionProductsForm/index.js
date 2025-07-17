import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Form, InputNumber, Row } from 'antd';
import { useFormik } from 'formik';
import { isNil } from 'lodash';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import CsvImporter from '@shared/components/UI/CsvImporter';
import PromoProductSelect from '@shared/containers/Marketing/Select/PromoProductSelect';
import { marketProductSelector } from '@shared/containers/Marketing/Select/PromoProductSelect/redux/selectors';
import { usePermission, usePrevious } from '@shared/hooks';
import {
  getConditionalProductsSelector,
  updateConditionProductsSelector,
} from '@app/pages/Promo/Detail/redux/selectors';
import { ERROR_TIMEOUT_MS } from '@app/pages/Promo/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import permKey from '@shared/shared/permKey.json';
import { downloadDataAsCSV } from '@shared/utils/common';
import { canSubmit } from '@shared/utils/formHelper';
import { Creators } from '../../redux/actions';
import { ExampleCSV } from '../ExampleCSVModal';
import ProductSelectTable from './ProductSelectTable';
import {
  ConditionProductValidationScheme,
  getConditionalCSVData,
  getOnlyModifiedValuesBeforeSubmit,
  validateValues,
} from './formHelper';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const productCsvExample = {
  item: 'id',
  // saleLimit: 'number',
  supplierSupport: 'number',
  thirdPartySupport: 'number',
  supplierSupportReferenceId: 'id',
  thirdPartyReferenceId: 'id',
};

const columns = [
  {
    itemColumn: 'item',
    // saleLimiColumn: 'saleLimit',
    supplierSupportColumn: 'supplierSupport',
    thirdPartySupportColumn: 'thirdPartySupport',
    supplierSupportReferenceId: 'supplierSupportReferenceId',
    thirdPartyReferenceId: 'thirdPartyReferenceId',
  },
];

const ConditionProductsForm = () => {
  const [importCount, setImportCount] = useState(0);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const conditionItems = useSelector(PromoDetailSlice.selectors.conditionItems);
  const initialValues = useSelector(PromoDetailSlice.selectors.conditionProductsFormInitialValues);
  const promoMechanic = useSelector(PromoDetailSlice.selectors.promoMechanic);
  const isUpdatePending = useSelector(updateConditionProductsSelector.getIsPending);
  const updateError = useSelector(updateConditionProductsSelector.getError);
  const marketProductsMap = useSelector(marketProductSelector.getMarketProductsMap);
  const isMarketProductsPending = useSelector(marketProductSelector.getIsPending);
  const conditionalProducts = useSelector(getConditionalProductsSelector.getData);
  const initialConditionalProducts = useRef(conditionalProducts);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);
  const promo = useSelector(PromoDetailSlice.selectors.promo);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      try {
        const body = getOnlyModifiedValuesBeforeSubmit({ values, conditionalProducts });
        validateValues({ values, promoMechanic, t, body, isListingPromo, promo });
        return dispatch(
          Creators.updateConditionProductsRequest({ body }),
        );
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
      }
    },
  });

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  // Diffs both the conditionalProduts in the Table, and the formik values to see if there are any changes
  const canBeSubmittable = useMemo(() => {
    return (
      canSubmit({ initialValues, values }) ||
      canSubmit({
        initialValues: initialConditionalProducts.current,
        values: conditionalProducts,
      })
    );
  }, [initialValues, values, conditionalProducts, initialConditionalProducts]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, setIsFormEditable, setValues, updateError, isUpdatePending, initialValues]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
    setImportCount(0);
    dispatch(
      Creators.getConditionalProductsRequest({ data: initialConditionalProducts.current }),
    );
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const getConditionalProductValueFromState = (fieldName, productId) => {
    const getConditionalProduct = conditionalProducts.find(product => product.id === productId);
    return getConditionalProduct?.[fieldName] || null;
  };

  const getConditionProductValueFromDb = (fieldName, productId) => {
    const getConditionalProduct = conditionItems?.find(product => product.id === productId);
    return getConditionalProduct?.[fieldName] || null;
  };

  const tryValueFromStateFallbackDb = (fieldName, productId) => {
    const value = getConditionalProductValueFromState(fieldName, productId);
    if (value !== null) {
      return value;
    }
    return getConditionProductValueFromDb(fieldName, productId);
  };

  const handleConditionalProductsChange = (productIds, productsMap) => {
    if (productIds?.length) {
      const productsData = productIds.map(productId => {
        const productData = productsMap[productId];
        return {
          id: productId,
          fullName: productData?.fullName,
          picURL: productData?.picURL,
          // saleLimit: getConditionalProductValueFromState(
          //   'saleLimit',
          //   productId,
          // ),
          supplierSupport: getConditionalProductValueFromState(
            'supplierSupport',
            productId,
          ),
          thirdPartySupport: getConditionalProductValueFromState(
            'thirdPartySupport',
            productId,
          ),
          alreadySold: getConditionalProductValueFromState(
            'alreadySold',
            productId,
          ),
          supplierSupportReferenceId: getConditionalProductValueFromState(
            'supplierSupportReferenceId',
            productId,
          ),
          thirdPartyReferenceId: getConditionalProductValueFromState(
            'thirdPartyReferenceId',
            productId,
          ),
        };
      });
      setFieldValue('items', productIds);
      return dispatch(Creators.getConditionalProductsRequest({ data: productsData }));
    }
    setFieldValue('items', []);
    return dispatch(Creators.getConditionalProductsRequest({ data: [] }));
  };

  useEffect(() => {
    const productIds = values.items;
    if (productIds?.length && marketProductsMap && Object.values(marketProductsMap)?.length) {
      const productsData = productIds.map(productId => {
        const productData = marketProductsMap[productId];
        return {
          id: productId,
          fullName: productData?.fullName,
          picURL: productData?.picURL,
          // saleLimit: tryValueFromStateFallbackDb('saleLimit', productId),
          supplierSupport: tryValueFromStateFallbackDb(
            'supplierSupport',
            productId,
          ),
          thirdPartySupport: tryValueFromStateFallbackDb(
            'thirdPartySupport',
            productId,
          ),
          alreadySold: tryValueFromStateFallbackDb(
            'alreadySold',
            productId,
          ),
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
      dispatch(Creators.getConditionalProductsRequest({ data: productsData }));
      initialConditionalProducts.current = productsData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketProductsMap, dispatch]);

  const handleProductsImport = ({ data: rawProducts }) => {
    const products = rawProducts.filter(item => !Object.values(item).every(value => isNil((value))));
    if (!products.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }

    try {
      ConditionProductValidationScheme(t).validateSync(products, { abortEarly: false });
    }
    catch (error) {
      const message = error?.errors?.at(0) ?? t('ERR_INVALID_CSV_FILE');
      return dispatch(ToastCreators.error({ message, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
    }

    const productIds = [];
    const productsData = [];
    products.forEach(product => {
      const productId = product?.item;
      const productData = marketProductsMap?.[productId];

      productIds.push(productId);
      productsData.push({
        id: product.item,
        fullName: productData?.fullName,
        picURL: productData?.picURL,
        // saleLimit: product.saleLimit || null,
        supplierSupportReferenceId:
          product.supplierSupportReferenceId ? product.supplierSupportReferenceId.toString() : null,
        thirdPartyReferenceId: product.thirdPartyReferenceId ? product.thirdPartyReferenceId.toString() : null,
        alreadySold: tryValueFromStateFallbackDb('alreadySold', productId) || 0,
        supplierSupport: product.supplierSupport || null,
        thirdPartySupport: product.thirdPartySupport || null,
      });
    });
    setFieldValue('items', productIds);
    dispatch(Creators.getConditionalProductsRequest({ data: productsData }));
    return setImportCount(productIds.length);
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
            <Button size="small" onClick={handleEditClick} disabled={isMarketProductsPending}>
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
      <Row gutter={[theme.spacing(3)]} align="middle">
        <Col>
          <CsvImporter
            onOkayClick={handleProductsImport}
            hasNestedHeaderKeys
            importButtonText={t('CONDITION_PRODUCTS.UPLOAD_CSV')}
            isButton
            disabled={isUpdatePending || !isFormEditable}
          />
        </Col>
        <Col>
          <ExampleCSV exampleCsv={[productCsvExample]} />
        </Col>
        <Col>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => downloadDataAsCSV({
              data: getConditionalCSVData(conditionItems),
              columns,
            })}
            disabled={isUpdatePending || !isFormEditable}
          >
            {t('CONDITION_PRODUCTS.DOWNLOAD_CSV')}
          </Button>
        </Col>
      </Row>
      {importCount ? (
        <Row className="alert alert-success mt-2 mb-0" role="alert">
          <b>
            {t('CONDITION_PRODUCTS.SUCCESS_N_PRODUCTS_IMPORT', { importCount })}
          </b>
        </Row>
      ) : null}
      <Row gutter={[theme.spacing(3)]}>
        <Col xs={24} lg={24} className="mt-2">
          <PromoProductSelect
            value={values.items}
            selectedProducts={values.items}
            disabled={isUpdatePending || !isFormEditable}
            onChange={handleConditionalProductsChange}
            mode="multiple"
          />
        </Col>
      </Row>
      {!!conditionalProducts.length && (
        <Row gutter={[theme.spacing(3)]}>
          <Col xs={24} lg={24} className="mt-2">
            <ProductSelectTable
              isFormEditable={isFormEditable}
              selectedProducts={conditionalProducts}
              tableType="conditional"
            />
          </Col>
        </Row>
      )}
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('CONDITION_PRODUCTS.MIN_ITEM_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              placeholder={t('CONDITION_PRODUCTS.MIN_ITEM_COUNT')}
              onChange={value => setFieldValue('minItemCount', value)}
              size="large"
              min={0}
              max={isListingPromo ? 5 : undefined}
              className="w-100"
              value={values?.minItemCount}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('CONDITION_PRODUCTS.MIN_TOTAL_AMOUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              placeholder={t('CONDITION_PRODUCTS.MIN_TOTAL_AMOUNT')}
              onChange={value => setFieldValue('minItemTotalAmount', value)}
              size="large"
              min={0}
              className="w-100"
              value={values?.minItemTotalAmount}
            />
          </Form.Item>
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const ConditionProductsSection = memo(function ConditionProductsSection() {
  const { t } = useTranslation('promoPage');

  const isConditionProductsEnabled = useSelector(PromoDetailSlice.selectors.conditionProductsEnabled);

  if (!isConditionProductsEnabled) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Panel header={t('CONDITION_PRODUCTS.HEADER_TITLE')} key={1}>
          <ConditionProductsForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default ConditionProductsSection;
