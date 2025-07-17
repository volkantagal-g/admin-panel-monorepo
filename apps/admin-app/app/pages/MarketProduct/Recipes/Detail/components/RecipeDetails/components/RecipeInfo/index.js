import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Form, Col } from 'antd';

import {
  getRecipeByIdSelector,
  updateRecipeSelector,
} from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { validate } from '@shared/yup';
import { EditSaveCancelButtons, Select, Space, TextInput } from '@shared/components/GUI';
import { MultiInput } from '@app/pages/MarketProduct/Recipes/components/common/MultiInput';
import { RECIPES_COMPONENT_IDS } from '@app/pages/MarketProduct/Recipes/constants';
import { domainsFilterOptions } from 'pages/MarketProduct/Recipes/List/components/RecipesFilters';

const RecipeInfo = () => {
  const dispatch = useDispatch();
  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const panelNameErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.panelName'),
  ) || [];

  const nameErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.name'),
  ) || [];

  const domainTypesErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.domainTypes'),
  ) || [];

  const recipeInfoErrors = [...panelNameErrors, ...nameErrors, ...domainTypesErrors];

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('recipesPage');
  const [form] = Form.useForm();

  const initialValues = useMemo(() => getInitialValues(recipe), [recipe]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({
        initialValues,
        values,
      });

      if (body?.name && Object.keys(body?.name).length > 0) {
        body.name = {
          tr: values.name?.tr,
          en: values.name?.en,
        };
      }

      return dispatch(
        Creators.updateRecipeRequest({
          id: get(recipe, '_id'),
          body,
        }),
      );
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffectOnRequestFinished(
    updateRecipeSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  return (
    <Space
      title={t('DETAILS.RECIPE_INFO.TITLE')}
      errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: recipeInfoErrors }}
    >
      <Form form={form} id={RECIPES_COMPONENT_IDS.RECIPE_INFO} onFinish={handleSubmit} layout="vertical">
        <Col className="mb-3">
          <TextInput
            value={values.panelName}
            onChange={event => {
              setFieldValue('panelName', event.target.value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            name="panelName"
            label={t('DETAILS.RECIPE_INFO.PANEL_NAME')}
            errors={errors}
          />
        </Col>
        <MultiInput
          colProps={{ span: 24, className: 'mb-3', borderRadius: '10px' }}
          label={t('DETAILS.RECIPE_INFO.NAME')}
          name="name"
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
          languages={['en', 'tr']}
          gap="10px"
        />
        <Col>
          <Select
            mode="multiple"
            value={values.domainTypes}
            onChange={value => {
              setFieldValue('domainTypes', value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            autoComplete="off"
            showSearch
            showArrow
            name="domainTypes"
            label={t('DETAILS.RECIPE_INFO.DOMAINS')}
            errors={errors}
          >
            {domainsFilterOptions}
          </Select>
        </Col>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable || Object.keys(errors).length > 0}
          form={RECIPES_COMPONENT_IDS.RECIPE_INFO}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default RecipeInfo;
