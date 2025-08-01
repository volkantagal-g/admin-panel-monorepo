import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';

import { Button, Col, Form } from 'antd';

import { useFormik } from 'formik';

import { get } from 'lodash';

import {
  updateRecipeSelector,
  getRecipeByIdSelector,
} from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';

import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { EditSaveCancelButtons, Space, TextArea } from '@shared/components/GUI';
import useStyles from './styles';

import { validate } from '@shared/yup';
import { canSubmit } from '@shared/utils/formHelper';
import { RECIPES_COMPONENT_IDS } from '@app/pages/MarketProduct/Recipes/constants';
import { getInitialValues, getModifiedValues, validationSchema } from './formHelper';

const Ingredients = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const classes = useStyles();

  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const bulletPoint = '\u2022';

  const ingredientsErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.ingredients'),
  ) || [];

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const initialValues = useMemo(() => getInitialValues(recipe?.ingredients), [recipe]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getModifiedValues(values);

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
    errors,
    setFieldValue,
    setValues,
  } = formik;

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

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <Space title={t('DETAILS.INGREDIENTS.TITLE')} errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: ingredientsErrors }}>
      <Form form={form} id={RECIPES_COMPONENT_IDS.INGREDIENTS} onFinish={handleSubmit} layout="vertical">
        <Col className={`${classes.label} mb-2`}>
          <div className="d-flex justify-content-between align-items-center">
            {t('DETAILS.INGREDIENTS.TR')}
            <Button
              onClick={() => {
                setFieldValue('ingredientsTr', `${values.ingredientsTr}${bulletPoint}`);
              }}
              onMouseDown={event => {
                event.preventDefault();
              }}
              disabled={isUpdatePending || !isFormEditable}
            >{bulletPoint}
            </Button>
          </div>
        </Col>
        <Col className="mb-3">
          <TextArea
            value={values.ingredientsTr}
            onChange={event => {
              setFieldValue('ingredientsTr', event.target.value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            name="ingredientsTr"
            errors={errors}
            rows={4}
          />
        </Col>
        <Col className={`${classes.label} mb-2`}>
          <div className="d-flex justify-content-between align-items-center">
            {t('DETAILS.INGREDIENTS.EN')}
            <Button
              onClick={() => {
                setFieldValue('ingredientsEn', `${values.ingredientsEn}${bulletPoint}`);
              }}
              onMouseDown={event => {
                event.preventDefault();
              }}
              disabled={isUpdatePending || !isFormEditable}
            >{bulletPoint}
            </Button>
          </div>
        </Col>
        <Col className="mb-3">
          <TextArea
            value={values.ingredientsEn}
            onChange={event => {
              setFieldValue('ingredientsEn', event.target.value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            name="ingredientsEn"
            errors={errors}
            rows={4}
          />
        </Col>
      </Form>
      <EditSaveCancelButtons
        disabled={!canBeSubmittable || Object.keys(errors).length > 0}
        form={RECIPES_COMPONENT_IDS.INGREDIENTS}
        htmlType="submit"
        isFormEditable={isFormEditable}
        loading={isUpdatePending}
        onCancelClick={handleCancelClick}
        onEditClick={handleEditClick}
      />
    </Space>
  );
};

export default Ingredients;
