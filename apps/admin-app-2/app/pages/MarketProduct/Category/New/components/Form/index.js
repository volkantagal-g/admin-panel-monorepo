import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select, Switch } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';
import { getMarketProductCategoriesSelector, createMarketProductCategorySelector } from '../../redux/selectors';
import {
  defaultValues,
  validationSchema,
  getParentCategoryOptions,
  getModifiedValues,
} from './formHelper';
import { getCountryRestrictedDomainTypeOptions, getSubstituteCategoryOptions } from '@app/pages/MarketProduct/utils';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import useStyles from './styles';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const MarketProductCategoryNewForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isCreatePending = useSelector(createMarketProductCategorySelector.getIsPending);
  const parentCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const isGetParentCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const { t } = useTranslation('marketProductCategoryPage');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createMarketProductCategoryRequest({ body: getModifiedValues(values) }));
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, isCreatePending]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="category-new" type="primary" htmlType="submit" loading={isCreatePending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('GENERAL_INFO')}>
      <Form form={form} id="category-new" onFinish={handleSubmit} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'domainTypes')}
              validateStatus={get(errors, 'domainTypes') ? 'error' : 'success'}
              name="domainTypes"
              label={t('CATEGORY_TARGETS')}
            >
              <Select
                mode="multiple"
                allowClear
                value={values.domainTypes}
                onChange={domainTypes => {
                  setFieldValue('domainTypes', domainTypes);
                }}
                options={getCountryRestrictedDomainTypeOptions(countryCode)}
                disabled={isCreatePending}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <MultiLanguageInput
          label={t('global:NAME_1')}
          fieldPath={['name']}
          formik={formik}
          disabled={isCreatePending}
        />
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'description')}
              validateStatus={get(errors, 'description') ? 'error' : 'success'}
              name="description"
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={handleChange}
                disabled={isCreatePending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        {!values.isSubCategory && (
          <Row>
            <Col span={24}>
              <Form.Item
                help={get(errors, 'substituteFor')}
                validateStatus={get(errors, 'substituteFor') ? 'error' : 'success'}
                name="substituteFor"
                label={t('SUBSTITUTE_CATEGORY')}
              >
                <Select
                  value={values.substituteFor}
                  onChange={value => {
                    setFieldValue('substituteFor', value);
                  }}
                  autoComplete="off"
                  showSearch
                  allowClear
                  filterOption={getSelectFilterOption}
                  loading={isGetParentCategoriesPending}
                  disabled={isCreatePending}
                >
                  {getSubstituteCategoryOptions({ parentCategories, classes, t })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'isSubCategory')}
              validateStatus={get(errors, 'isSubCategory') ? 'error' : 'success'}
              name="isSubCategory"
              label={t('SUB_CATEGORY')}
            >
              <Switch
                checked={values.isSubCategory}
                onChange={value => {
                  setFieldValue('isSubCategory', value);
                  if (value) {
                    setFieldValue('substituteFor', null);
                  }
                }}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={values.isSubCategory ? 'bg-success' : 'bg-danger'}
                disabled={isCreatePending}
              />
            </Form.Item>
          </Col>
        </Row>
        {values.isSubCategory && (
          <Row>
            <Col span={24}>
              <Form.Item
                help={get(errors, 'parent')}
                validateStatus={get(errors, 'parent') ? 'error' : 'success'}
                name="parent"
                label={t('PARENT_CATEGORY')}
              >
                <Select
                  allowClear
                  value={values.parent}
                  onChange={value => {
                    setFieldValue('parent', value);
                  }}
                  disabled={isCreatePending}
                  autoComplete="off"
                  options={getParentCategoryOptions(parentCategories)}
                  showSearch
                  filterOption={getSelectFilterOption}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'isCategoryOfTheWeek')}
              validateStatus={get(errors, 'isCategoryOfTheWeek') ? 'error' : 'success'}
              name="isCategoryOfTheWeek"
              label={t('CATEGORY_OF_THE_WEEK')}
              dependencies={['isSubCategory']}
            >
              <Switch
                checked={values.isCategoryOfTheWeek && !values.isSubCategory}
                onChange={value => {
                  setFieldValue('isCategoryOfTheWeek', value);
                }}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={(values.isCategoryOfTheWeek && !values.isSubCategory) ? 'bg-success' : 'bg-danger'}
                disabled={values.isSubCategory || isCreatePending}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default MarketProductCategoryNewForm;
