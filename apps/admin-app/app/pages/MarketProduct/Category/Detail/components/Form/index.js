import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { get } from 'lodash';

import { getMarketProductCategoryByIdSelector, updateMarketProductCategorySelector } from '../../redux/selectors';
import { getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { getCountryRestrictedDomainTypeOptions, getSubstituteCategoryOptions } from '@app/pages/MarketProduct/utils';
import useStyles from './styles';
import { formatDate } from '@shared/utils/dateHelper';

const MarketProductCategoryDetailForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductCategorySelector.getIsPending);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);
  const parentCategories = useMemo(
    () => categories.filter(category => !category?.isSubCategory),
    [categories],
  );
  const isGetParentCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductCategoryPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useMemo(
    () => getInitialValues(marketProductCategory),
    [marketProductCategory],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.updateMarketProductCategoryRequest({
        id: get(marketProductCategory, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="category-detail"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('GENERAL_INFO')}>
      <Form
        form={form}
        id="category-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'domainTypes')}
              validateStatus={get(errors, 'domainTypes') ? 'error' : 'success'}
              name="domainTypes"
              label={t('CATEGORY_TARGETS')}
            >
              <Select
                labelInValue
                mode="multiple"
                allowClear
                value={values.domainTypes}
                options={getCountryRestrictedDomainTypeOptions(marketProductCategory.countryCode)}
                onChange={domainTypes => {
                  setFieldValue('domainTypes', domainTypes);
                }}
                disabled={isUpdatePending || !isFormEditable}
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
          disabled={isUpdatePending || !isFormEditable}
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
                disabled={isUpdatePending || !isFormEditable}
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
                    setFieldValue('substituteFor', value || null);
                  }}
                  autoComplete="off"
                  showSearch
                  allowClear
                  filterOption={getSelectFilterOption}
                  loading={isGetParentCategoriesPending}
                  disabled={isUpdatePending || !isFormEditable}
                >
                  {getSubstituteCategoryOptions({ parentCategories, classes, t })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={5}>
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
                }}
                disabled
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={values.isSubCategory ? 'bg-success' : 'bg-danger'}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              help={get(errors, 'isPublic')}
              validateStatus={get(errors, 'isPublic') ? 'error' : 'success'}
              name="isPublic"
              label={t('SHOW_LOCATION_FREE')}
            >
              <Switch
                checked={values.isPublic}
                onChange={value => {
                  setFieldValue('isPublic', value);
                }}
                disabled={isUpdatePending || !isFormEditable}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={values.isPublic ? 'bg-success' : 'bg-danger'}
              />
            </Form.Item>
          </Col>
          {!values.isSubCategory && (
          <Col span={5}>
            <Form.Item
              help={get(errors, 'showUnitPrice')}
              validateStatus={get(errors, 'showUnitPrice') ? 'error' : 'success'}
              name="showUnitPrice"
              label={t('SHOW_UNIT_PRICE')}
            >
              <Switch
                checked={values.showUnitPrice}
                onChange={value => {
                  setFieldValue('showUnitPrice', value);
                }}
                disabled={isUpdatePending || !isFormEditable}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={values.showUnitPrice ? 'bg-success' : 'bg-danger'}
              />
            </Form.Item>
          </Col>
          )}
          <Col span={5}>
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
                disabled={isUpdatePending || !isFormEditable || values.isSubCategory}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={(values.isCategoryOfTheWeek && !values.isSubCategory) ? 'bg-success' : 'bg-danger'}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              help={get(errors, 'isListable')}
              validateStatus={get(errors, 'isListable') ? 'error' : 'success'}
              name="isListable"
              label={t('LISTABLE')}
            >
              <Switch
                checked={values.isListable}
                onChange={value => {
                  setFieldValue('isListable', value);
                }}
                disabled={isUpdatePending || !isFormEditable}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={(values.isListable) ? 'bg-success' : 'bg-danger'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>{`${t('CREATED_AT')}: ${formatDate(marketProductCategory.createdAt)}`}</Row>
      </Form>
    </AntCard>
  );
};

export default MarketProductCategoryDetailForm;
