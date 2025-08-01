import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import useQuery from '@shared/shared/hooks/useQuery';

import { TextInput } from '@shared/components/GUI/TextInput';

import {
  defaultValues,
  validationSchema,
} from 'pages/MarketProduct/Recipes/List/components/Header/NewRecipeModal/formHelper';
import { validate } from '@shared/yup';
import { Modal, Select } from '@shared/components/GUI';

import { isNewRecipeModalOpenSelector, createRecipeSelector } from 'pages/MarketProduct/Recipes/List/redux/selectors';
import { Creators } from 'pages/MarketProduct/Recipes/List/redux/actions';

import { domainsFilterOptions } from 'pages/MarketProduct/Recipes/List/components/RecipesFilters';
import { MultiInput } from '@app/pages/MarketProduct/Recipes/components/common/MultiInput';

const NewRecipeModal = () => {
  const dispatch = useDispatch();

  const query = useQuery();
  const country = query.get('country');

  const isPending = useSelector(createRecipeSelector.getIsPending);
  const { t } = useTranslation('recipesPage');
  const [form] = Form.useForm();
  const isModalOpen = useSelector(isNewRecipeModalOpenSelector);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: (values, actions) => {
      dispatch(Creators.createRecipeRequest({
        body: { ...values, countryCode: country?.toUpperCase() },
        onSuccess: () => actions.resetForm(),
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, isPending]);

  const handleCancel = () => {
    dispatch(Creators.closeNewRecipeModal());
    resetForm();
  };

  return (
    <Modal
      visible={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: isPending }}
      title={t('NEW_RECIPE_MODAL.TITLE')}
    >
      <Form form={form} id="product-new" layout="vertical">
        <Row className="mb-3">
          <Col span={24}>
            <TextInput
              value={values.panelName}
              onChange={event => {
                setFieldValue('panelName', event.target.value);
              }}
              disabled={isPending}
              name="panelName"
              label={t('NEW_RECIPE_MODAL.PANEL_NAME')}
              errors={errors}
            />
          </Col>
        </Row>
        <MultiInput
          colProps={{ span: 24, className: 'mb-3', borderRadius: '10px' }}
          label={t('NEW_RECIPE_MODAL.NAME')}
          name="name"
          formik={formik}
          disabled={isPending}
          languages={['en', 'tr']}
          gap="10px"
        />
        <Row className="mb-3">
          <Col span={24}>
            <Select
              mode="multiple"
              value={values.domainTypes}
              onChange={value => {
                setFieldValue('domainTypes', value);
              }}
              disabled={isPending}
              autoComplete="off"
              showSearch
              showArrow
              name="domainTypes"
              label={t('NEW_RECIPE_MODAL.DOMAINS')}
              errors={errors}
            >
              {domainsFilterOptions}
            </Select>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewRecipeModal;
