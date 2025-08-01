import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect, useMemo, useState } from 'react';

import { Col, Form } from 'antd';

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

const Preparation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const classes = useStyles();

  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const preparationErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.preparation'),
  ) || [];

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const initialValues = useMemo(() => getInitialValues(recipe?.preparation), [recipe]);

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
    setValues(initialValues);
    setIsFormEditable(true);
  };

  return (

    <Space title={t('DETAILS.PREPARATION.TITLE')} errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: preparationErrors }}>
      <Form form={form} id={RECIPES_COMPONENT_IDS.PREPARATION} onFinish={handleSubmit} layout="vertical">
        <Col className={`${classes.label} mb-2`}>
          {t('DETAILS.PREPARATION.TR')}
        </Col>
        <Col className="mb-3">
          <TextArea
            value={values.preparationTr}
            onChange={event => {
              setFieldValue('preparationTr', event.target.value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            name="preparationTr"
            errors={errors}
            rows={4}
          />
        </Col>
        <Col className={`${classes.label} mb-2`}>
          {t('DETAILS.PREPARATION.EN')}
        </Col>
        <Col className="mb-3">
          <TextArea
            value={values.preparationEn}
            onChange={event => {
              setFieldValue('preparationEn', event.target.value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            name="preparationEn"
            errors={errors}
            rows={4}
          />
        </Col>
      </Form>
      <EditSaveCancelButtons
        disabled={!canBeSubmittable || Object.keys(errors).length > 0}
        form={RECIPES_COMPONENT_IDS.PREPARATION}
        htmlType="submit"
        isFormEditable={isFormEditable}
        loading={isUpdatePending}
        onCancelClick={handleCancelClick}
        onEditClick={handleEditClick}
      />
    </Space>
  );
};

export default Preparation;
