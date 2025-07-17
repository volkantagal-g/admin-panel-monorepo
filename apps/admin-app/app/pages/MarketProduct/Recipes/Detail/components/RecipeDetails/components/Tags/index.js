import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form } from 'antd';

import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';

import { get } from 'lodash';

import { useEffectOnRequestFinished } from '@shared/hooks';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';

import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { getRecipeByIdSelector, updateRecipeSelector } from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import { Space, EditSaveCancelButtons, Button } from '@shared/components/GUI';
import { RECIPES_COMPONENT_IDS } from '@app/pages/MarketProduct/Recipes/constants';

import TagsList from './TagsList';

import { validate } from '@shared/yup';
import { canSubmit } from '@shared/utils/formHelper';
import { constructTagsArray, restructureTagsForSubmit } from './utils';

const Tags = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');

  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const tagsErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.tags'),
  ) || [];

  const [isFormEditable, setIsFormEditable] = useState(false);
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

      return dispatch(
        Creators.updateRecipeRequest({
          id: get(recipe, '_id'),
          body,
        }),
      );
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const tagsTr = initialValues?.tags?.tr || [];
  const tagsEn = initialValues?.tags?.en || [];

  const [tagsArray, setTagsArray] = useState(constructTagsArray({ tagsTr, tagsEn }));

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
    setTagsArray(constructTagsArray({ tagsTr, tagsEn }));
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const addTag = () => {
    const newTagsArray = [...tagsArray];
    newTagsArray.push({ trText: '', enText: '', type: 'freeText', key: `tag-${tagsArray.length}-freeText` });

    setTagsArray(newTagsArray);
    setFieldValue('tags', restructureTagsForSubmit(newTagsArray));
  };

  return (
    <Space
      title={t('DETAILS.TAGS.TITLE')}
      extra={isFormEditable ?
        <Button disabled={isUpdatePending} onClick={addTag}>{t('DETAILS.TAGS.ADD_TAG')}</Button> : undefined}
      errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: tagsErrors }}
    >
      <Row key="row-1">
        <Col span={24}>
          <Form form={form} id={RECIPES_COMPONENT_IDS.TAGS} onFinish={handleSubmit} layout="vertical">
            <TagsList values={values} setFieldValue={setFieldValue} tagsArray={tagsArray} setTagsArray={setTagsArray} isFormEditable={isFormEditable} />
          </Form>
        </Col>
      </Row>
      <EditSaveCancelButtons
        disabled={!canBeSubmittable || Object.keys(errors).length > 0}
        form={RECIPES_COMPONENT_IDS.TAGS}
        htmlType="submit"
        isFormEditable={isFormEditable}
        loading={isUpdatePending}
        onCancelClick={handleCancelClick}
        onEditClick={handleEditClick}
      />
    </Space>
  );
};

export default Tags;
