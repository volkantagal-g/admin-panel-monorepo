import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { Button, Col, Collapse, Form, Row } from 'antd';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import MarketProductCategory from '@shared/containers/Select/MarketProductCategory';
import MarketProductSubCategory from '@shared/containers/Select/MarketProductSubCategory';
import PromoProductSelect from '@shared/containers/Marketing/Select/PromoProductSelect';
import { updateExcludedProductsSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { ExampleCSV } from '../ExampleCSVModal';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const ExcludedProductsForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const isUpdatePending = useSelector(updateExcludedProductsSelector.getIsPending);
  const updateError = useSelector(updateExcludedProductsSelector.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useSelector(PromoDetailSlice.selectors.excludedProductsFormInitialValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ values });
      return dispatch(
        Creators.updateExcludedProductsRequest({ body }),
      );
    },
  });

  const { handleSubmit, values, setValues, setFieldValue } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

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
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleProductsImport = ({ data: products }) => {
    if (!products.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }
    const { item } = products[0];
    if (item === undefined) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }
    const productIds = products.map(product => product?.item);
    return setFieldValue('exItems', productIds);
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
    <Form layout="vertical">
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('EXCLUDED_PRODUCTS.PRODUCT_CATEGORIES')}
            className="d-inline"
          >
            <MarketProductCategory
              mode="multiple"
              disabled={isUpdatePending || !isFormEditable}
              value={values?.excludedProductCategories}
              isFormEditable
              requestParams={{ parent: true }}
              onChange={productCategories => {
                setFieldValue('excludedProductCategories', productCategories);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12} className="mt-2">
          <Form.Item
            label={t('EXCLUDED_PRODUCTS.PRODUCT_SUB_CATEGORIES')}
          >
            <MarketProductSubCategory
              mode="multiple"
              disabled={isUpdatePending || !isFormEditable}
              value={values?.excludedProductSubCategories}
              onChange={productSubCategories => {
                setFieldValue('excludedProductSubCategories', productSubCategories);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
        <Col span={24}>
          <Form.Item
            className="mb-0"
            label={t('EXCLUDED_PRODUCTS.PROMO_PRODUCTS')}
          >
            <PromoProductSelect
              value={values?.exItems}
              selectedProducts={values?.exItems}
              disabled={isUpdatePending || !isFormEditable}
              onChange={productIds => {
                setFieldValue('exItems', productIds);
              }}
              mode="multiple"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
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
              <ExampleCSV exampleCsv={[{ item: 'id' }]} />
            </Col>
          </Row>
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const ExcludedProductsSection = memo(function ExcludedProductsSection() {
  const { t } = useTranslation('promoPage');

  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent || isMaster) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Panel header={t('EXCLUDED_PRODUCTS.HEADER_TITLE')} key={1}>
          <ExcludedProductsForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default ExcludedProductsSection;
