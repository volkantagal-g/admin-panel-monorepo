import { useEffect, useCallback, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { get, sortBy } from 'lodash';

import { validationSchema, getInitialValues, getModifiedValues } from './formHelper';
import { validate } from '@shared/yup';
import { FORM_MODE } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { usePrevious } from '@shared/hooks';
import SelectMarketProduct from '@shared/containers/GUI/Select/MarketProduct';
import { Modal, Button, NumberInput } from '@shared/components/GUI';

const AddOrEditTableModalForm = props => {
  const {
    visible,
    onCancel,
    params,
    bundleProducts,
    onSetBundleProducts,
  } = props;
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const updateError = useSelector(updateMarketProductSelector.getError);
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const { bundleProducts: existingBundleProducts = [] } = marketProduct;
  const isFormAddMode = params.mode === FORM_MODE.ADD;
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const [selectedProduct, setSelectedProduct] = useState();

  const handleCancel = useCallback(formik => {
    formik.resetForm();
    form.resetFields();
    onCancel();
  }, [form, onCancel]);

  const sortBundleProducts = bundleProductsToSort => {
    let sortedBundleProducts = sortBy(bundleProductsToSort, 'sort');

    sortedBundleProducts = sortedBundleProducts.map((product, index) => {
      const newProduct = {
        ...product,
        sort: index + 1,
      };
      return newProduct;
    });
    return sortedBundleProducts;
  };

  const addBundleProduct = (formik, values) => {
    const newBundleProduct = getModifiedValues(values, selectedProduct, params?.currentBundleProduct?.sort);
    let newBundleProducts = [...bundleProducts, newBundleProduct];
    newBundleProducts = sortBundleProducts(newBundleProducts);

    const bundleProductIds = bundleProducts.map(bundleProduct => bundleProduct?.product?._id) || [];
    if (bundleProductIds.includes(newBundleProduct?.product?._id)) {
      return dispatch(ToastCreators.error({ message: t('BUNDLE_INFO.ERROR.PRODUCT_ALREADY_EXIST') }));
    }

    onSetBundleProducts(newBundleProducts);

    return handleCancel(formik);
  };

  const editBundleProduct = (formik, values) => {
    const currentBundleProductId = get(params, 'currentBundleProduct.product._id');
    const newBundleProduct = getModifiedValues(values, params?.currentBundleProduct?.product, params?.currentBundleProduct?.sort);
    let newBundleProducts = bundleProducts.map(bundleProduct => {
      const bundleProductId = get(bundleProduct, 'product._id');
      return bundleProductId === currentBundleProductId ? newBundleProduct : bundleProduct;
    });

    newBundleProducts = sortBundleProducts(newBundleProducts);

    onSetBundleProducts(newBundleProducts);
    return handleCancel(formik);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(params.currentBundleProduct, bundleProducts),
    onSubmit: values => {
      if (isFormAddMode) {
        addBundleProduct(formik, values);
      }
      else {
        editBundleProduct(formik, values);
      }
    },
  });

  const { handleSubmit, values, errors, setFieldValue, dirty, isValid } = formik;

  const isDirtyAndValid = dirty && isValid;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, visible]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        onSetBundleProducts([...existingBundleProducts]);
        handleCancel(formik);
      }
    }
  }, [prevIsUpdatePending, isUpdatePending, existingBundleProducts, handleCancel, onSetBundleProducts, updateError, formik]);

  const modalTitle = isFormAddMode ? t('BUNDLE_INFO.NEW_BUNDLE_PRODUCT') : t('BUNDLE_INFO.EDIT_BUNDLE_PRODUCT');
  const modalButtonText = isFormAddMode ? t('button:ADD') : t('button:APPLY');

  const getCurrentBundleProductName = () => {
    if (!params.currentBundleProduct) return '';
    const { product } = params.currentBundleProduct;
    const currentBundleProductName = get(product, ['fullName'])
      ? get(product, ['fullName', getLangKey()]) :
      get(product, ['name', getLangKey()]);
    return currentBundleProductName;
  };

  return (
    <Modal
      centered
      title={modalTitle}
      visible={visible}
      onCancel={() => handleCancel(formik)}
      footer={[
        <Button data-testid="cancelBtnModal" key="back" onClick={() => handleCancel(formik)}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          disabled={!isDirtyAndValid}
          key="submit"
          type="primary"
          form="add-new-property-table"
          htmlType="submit"
        >
          {modalButtonText}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="add-new-property-table"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row className="mb-4">
          <Col span={24}>
            {isFormAddMode ? (
              <SelectMarketProduct
                value={values.product}
                onChange={(productId, product) => {
                  setSelectedProduct(product);
                  setFieldValue('product', productId);
                }}
                projectFields={['picURL']}
              />
            ) : (
              <span>{getCurrentBundleProductName()}</span>
            )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col span={24}>
            <NumberInput
              label={t('BUNDLE_INFO.COUNT')}
              name={['count']}
              value={values.count}
              onChange={value => {
                setFieldValue('count', value);
              }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <NumberInput
              label={t('BUNDLE_INFO.SORT')}
              name={['sort']}
              value={values.sort}
              onChange={value => {
                setFieldValue('sort', value);
              }}
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditTableModalForm;
