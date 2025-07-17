import { useCallback, useState } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { getWarehousesSelector } from '@shared/redux/selectors/common';
import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import ProductsTable from '../ProductsTable';
import { SelectWrapper } from '@shared/components/UI/Form';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import SummaryTable from '../SummaryTable';
import { createCustomerSatisfactionRequestSelector } from '../../redux/selectors';

const { useForm } = Form;

function CustomerSatisfactionRequestCreate() {
  const dispatch = useDispatch();
  const { t } = useTranslation('customerSatisfactionPage');

  const [search, setSearch] = useState();

  const [form] = useForm();

  const warehouses = useSelector(getWarehousesSelector.getData) || [];

  const productsList = useSelector(
    createCustomerSatisfactionRequestSelector.getProductsData,
  );
  const createCustomerSatisfactionRequestIsPending = useSelector(
    createCustomerSatisfactionRequestSelector.getIsPending,
  );
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: submitValues => {
      dispatch(
        Creators.createCustomerSatisfactionRequestRequest({
          requestBody: {
            ...submitValues,
            products: submitValues.products.map(product => ({
              productId: product.productId,
              count: product.quantity,
            })),
          },
        }),
      );
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue } = formik;

  const [productsObject, setProductsObject] = useState({});
  const handleSelectChange = useCallback(fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  }, [setFieldValue]);

  const onWarehouseChange = useCallback(
    warehouse => {
      handleSelectChange('warehouseId')(warehouse);
      handleSelectChange('products')([]);
      setProductsObject({});
      setSearch();
      dispatch(Creators.resetCreateRequest());
    },
    [dispatch, handleSelectChange],
  );
  const onProductChange = useCallback(
    changedProduct => {
      const newProducts = { ...productsObject };
      if (!changedProduct.quantity) {
        delete newProducts[changedProduct.productId];
      }
      else {
        newProducts[changedProduct.productId] = changedProduct.quantity;
      }
      setProductsObject(newProducts);
    },
    [productsObject],
  );
  const addProduct = productId => {
    const isInArray = values.products.find(
      product => productId === product.productId,
    );

    if (isInArray) {
      setFieldValue(
        'products',
        values.products.map(product => {
          if (product.productId === productId) {
            return {
              ...product,
              quantity: product.quantity + productsObject[productId],
            };
          }
          return product;
        }),
      );
    }
    else {
      const productInfo = productsList.find(
        product => product._id === productId,
      );
      setFieldValue('products', [
        ...values.products,
        {
          productId,
          quantity: productsObject[productId],
          fullName: productInfo?.fullName,
          picURL: productInfo?.picURL,
        },
      ]);
    }
  };
  const onDelete = productId => {
    const newProductsObject = { ...productsObject };
    delete newProductsObject[productId];
    setProductsObject(newProductsObject);

    setFieldValue(
      'products',
      values.products.filter(product => product.productId !== productId),
    );
  };
  return (
    <Row gutter={[20]}>
      <Col span={12}>
        <Card size="small" title={t('GENERAL_INFO')}>
          <Form
            id="customer-satisfaction-request"
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Row gutter={[16]} align="top">
              <Col span={12}>
                <SelectWrapper
                  selectKey="warehouseId"
                  label={t('customerSatisfactionPage:WAREHOUSE')}
                  placeholder={t('customerSatisfactionPage:SELECT_WAREHOUSE')}
                  value={values.warehouseId}
                  hasError={get(errors, 'warehouseId')}
                  isTouched={get(touched, 'warehouseId')}
                  optionsData={warehouses}
                  optionLabelProp="name"
                  optionValueProp="_id"
                  onChangeCallback={onWarehouseChange}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[16]} align="top">
              <Col span={12}>
                <Form.Item label={t('global:SEARCH')}>
                  <Input
                    value={search}
                    allowClear
                    onChange={e => setSearch(e.target.value)}
                    placeholder={t('customerSatisfactionPage:SEARCH_PRODUCT')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16]} align="top">
              <Col span={24}>
                <ProductsTable
                  warehouseId={values.warehouseId}
                  products={productsObject}
                  onChange={onProductChange}
                  addProduct={addProduct}
                  search={search}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          size="small"
          title={t('customerSatisfactionPage:SELECTED_PRODUCTS')}
        >
          <SummaryTable onDelete={onDelete} products={values.products} />
          <Footer
            isLoading={createCustomerSatisfactionRequestIsPending}
            disabled={!values.products.length}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default CustomerSatisfactionRequestCreate;
