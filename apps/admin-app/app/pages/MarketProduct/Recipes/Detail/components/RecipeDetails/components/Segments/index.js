import { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import {
  validationSchema,
  getInitialValues,
} from './formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import { Space, EditSaveCancelButtons, Select } from '@shared/components/GUI';
import { useEffectOnRequestFinished, usePrevious } from '@shared/hooks';
import { getRecipeByIdSelector, segmentsSelector, updateRecipeSelector } from '../../../../redux/selectors';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { RECIPES_COMPONENT_IDS } from '@app/pages/MarketProduct/Recipes/constants';

export const getSegmentsOptions = (segmentsOptions = [], selectedSegments = [], t) => {
  if (!segmentsOptions?.length) return [{ value: 0, label: t('DETAILS.SEGMENTS.ALL_USERS') }];

  const segments = segmentsOptions?.map(item => ({
    value: item?.segment,
    label: `${item?.segment}-${item?.description}`,
  }));

  return [{ value: 0, label: t('DETAILS.SEGMENTS.ALL_USERS') }, ...new Map([
    ...selectedSegments.filter(item => item !== 0).map(val => [val, { value: val, label: val }]),
    ...segments.map(opt => [opt.value, opt]),
  ]).values()];
};

const Segments = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');

  const recipe = useSelector(getRecipeByIdSelector.getData);
  const segments = useSelector(segmentsSelector.getData);
  const isUpdatePending = useSelector(segmentsSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const segmentsErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.segments'),
  ) || [];

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [queryText, setQueryText] = useState('');
  const prevQueryText = usePrevious(queryText);

  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(recipe?.segments),
    [recipe],
  );

  const formik = useFormik({
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = { segments: values.segments };

      return dispatch(Creators.updateRecipeRequest({
        id: get(recipe, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, values, setFieldValue, setValues } = formik;

  const handleSearchCallback = useCallback(searchValue => {
    dispatch(Creators.getSegmentsRequest({ filters: { search: searchValue, limit: 20, offset: 0 } }));
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearchCallback, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(
    () => {
      const hasQueryTextChanged = prevQueryText !== queryText;
      if (hasQueryTextChanged && queryText?.length) {
        debouncedHandleSearch(queryText);
      }
    },
    [debouncedHandleSearch, prevQueryText, queryText],
  );

  const handleChange = segmentIds => {
    setFieldValue('segments', segmentIds);
  };

  useEffectOnRequestFinished(
    getRecipeByIdSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setValues(getInitialValues(recipe?.segments));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <Space title={t('DETAILS.SEGMENTS.TITLE')} errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: segmentsErrors }}>
      <Form
        form={form}
        id={RECIPES_COMPONENT_IDS.SEGMENTS}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Select
          value={values.segments}
          onChange={handleChange}
          optionsData={getSegmentsOptions(segments, values.segments, t)}
          onSearch={searchValue => setQueryText(searchValue)}
          filterOption={false}
          showSearch
          loading={isUpdatePending}
          disabled={!isFormEditable}
          mode="multiple"
        />
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={RECIPES_COMPONENT_IDS.SEGMENTS}
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

export default Segments;
