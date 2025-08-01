import { useState, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import { EditSaveCancelButtons, Space } from '@shared/components/GUI';
import { validationSchema, getInitialValues, getModifiedValues } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '../../../../redux/actions';
import { validate } from '@shared/yup';
import ProductList from './ProductList';
import { getRecipeByIdSelector, updateRecipeSelector, tableMarketProductsSelector } from '../../../../redux/selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { mergeSelectedProductData } from './utils';
import { RECIPES_COMPONENT_IDS } from '@app/pages/MarketProduct/Recipes/constants';

import { pagination } from './constants';

const Products = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const recipe = useSelector(getRecipeByIdSelector.getData);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(recipe?.products?.length ? recipe.products.map(item => item.productId) : []);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const tableMarketProducts = useSelector(tableMarketProductsSelector.getData);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const recipeProductsErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.products'),
  ) || [];

  const productsErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('products'),
  ) || [];

  const allProductsErrors = [...recipeProductsErrors, ...productsErrors];

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(recipe?.products),
    onSubmit: values => {
      const body = getModifiedValues(values.products);

      return dispatch(
        Creators.updateRecipeRequest({
          id: get(recipe, '_id'),
          body,
        }),
      );
    },
  });
  const {
    handleSubmit,
    values,
    setFieldValue,
    setValues,
  } = formik;

  useEffect(() => {
    if (!selectedProducts?.length) return;

    dispatch(Creators.getTableMarketProductsRequest({
      filters: {
        fields: ['name', 'fullName', 'picURL'],
        ids: selectedProducts,
        ...getLimitAndOffset(pagination),
      },
    }));
  }, [selectedProducts, dispatch]);

  useEffect(() => {
    if (!tableMarketProducts?.length) {
      return;
    }

    const mergedSelectedProductData = mergeSelectedProductData({
      prevState: values.products,
      recipeProducts: recipe.products,
      marketProducts: tableMarketProducts,
      selectedProducts,
    });

    setFieldValue('products', mergedSelectedProductData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableMarketProducts, recipe, setFieldValue]);

  const canBeSubmittable = useMemo(
    () => canSubmit({
      initialValues: getInitialValues(recipe?.products),
      values,
    }),
    [values, recipe],
  );

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  useEffectOnRequestFinished(
    updateRecipeSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(getInitialValues(recipe?.products));
      setIsFormEditable(false);
    },
  );

  const handleCancelClick = () => {
    setSelectedProducts(recipe?.products?.length ? recipe.products.map(item => item.productId) : []);
    setValues(getInitialValues(recipe?.products));
    setIsFormEditable(false);
    formik.resetForm();
    form.resetFields();
  };

  return (
    <Space title={t('DETAILS.PRODUCTS.TITLE')} errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: allProductsErrors }}>
      <Form key={JSON.stringify(recipe?.products)} form={form} id={RECIPES_COMPONENT_IDS.PRODUCTS} onFinish={handleSubmit}>
        <ProductList
          isFormEditable={isFormEditable}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setFieldValue={setFieldValue}
          values={values}
        />
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={RECIPES_COMPONENT_IDS.PRODUCTS}
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default Products;
