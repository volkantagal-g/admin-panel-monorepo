import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Select, Input, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import { useFormik } from 'formik';

import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { createMarketProductMasterCategorySelector } from '../../redux/selectors';
import { getMarketProductMasterCategoriesSelector } from '@shared/redux/selectors/common';
import {
  validationSchema,
  getInitialValues,
} from './formHelper';
import {
  getMasterCategoryLevelOptions,
  getMasterCategoryOptions,
  getCategoryRoleOptions,
} from '@app/pages/MarketProduct/utils';
import AntCard from '@shared/components/UI/AntCard';

import { Creators } from '../../redux/actions';
import { getSelectFilterOption } from '@shared/utils/common';
import { PRODUCT_MASTER_CATEGORY_LEVEL } from '@shared/shared/constants';
import { validate } from '@shared/yup';

const MarketProductMasterCategoryNewForm = () => {
  const dispatch = useDispatch();
  const isCreatePending = useSelector(createMarketProductMasterCategorySelector.getIsPending);
  const isGetMasterCategoriesPending = useSelector(getMarketProductMasterCategoriesSelector.getIsPending);
  const marketProductMasterCategories = useSelector(getMarketProductMasterCategoriesSelector.getData);
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const [form] = Form.useForm();
  const theme = useTheme();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createMarketProductMasterCategoryRequest({ body: values }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="master-category-new" type="primary" htmlType="submit" loading={isCreatePending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  const handleLevelChange = value => {
    setValues({ ...values, level: value, parent: undefined, categoryRole: undefined });
    let parentMasterCategoryLevel;
    if (Number(value) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS;
    }
    else if (Number(value) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY;
    }
    else if (Number(value) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY;
    }
    else {
      return;
    }
    dispatch(CommonCreators.getMarketProductMasterCategoriesRequest({ level: parentMasterCategoryLevel }));
  };

  const handleCategoryRoleChange = value => {
    if (Number(values.level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
      setValues({ ...values, categoryRole: value });
    }
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('GENERAL_INFO')}>
      <Form
        form={form}
        id="master-category-new"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={_.get(errors, 'name.tr')}
              validateStatus={_.get(errors, 'name.tr') ? 'error' : 'success'}
              name={['name', 'tr']}
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name.tr}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.tr', value);
                }}
                disabled={isCreatePending}
                addonAfter="TR"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_.get(errors, 'name.en')}
              validateStatus={_.get(errors, 'name.en') ? 'error' : 'success'}
              name={['name', 'en']}
            >
              <Input
                value={values.name.en}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.en', value);
                }}
                disabled={isCreatePending}
                addonAfter="EN"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'description')}
              validateStatus={
                _.get(errors, 'description') ? 'error' : 'success'
              }
              name="description"
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description', value);
                }}
                disabled={isCreatePending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'level')}
              validateStatus={_.get(errors, 'level') ? 'error' : 'success'}
              name="level"
              label={t('LEVEL')}
            >
              <Select
                allowClear
                value={values.level}
                onChange={value => handleLevelChange(value)}
                disabled={isCreatePending}
                autoComplete="off"
                options={getMasterCategoryLevelOptions()}
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'parent')}
              validateStatus={_.get(errors, 'parent') ? 'error' : 'success'}
              name="parent"
              label={t('PARENT_CATEGORY')}
            >
              <Select
                allowClear
                value={values.parent}
                onChange={value => {
                  setFieldValue('parent', value);
                }}
                disabled={
                  isGetMasterCategoriesPending ||
                  isCreatePending ||
                  !values.level ||
                  Number(values.level) ===
                    PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY
                }
                autoComplete="off"
                options={getMasterCategoryOptions(
                  marketProductMasterCategories,
                )}
                showSearch
                filterOption={getSelectFilterOption}
                loading={isGetMasterCategoriesPending}
              />
            </Form.Item>
          </Col>
        </Row>
        {Number(values.level) ===
          PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS && (
          <Row gutter={[theme.spacing(3)]}>
            <Col span={24}>
              <Form.Item
                help={_.get(errors, 'pickingOrder')}
                validateStatus={
                  _.get(errors, 'pickingOrder') ? 'error' : 'success'
                }
                name={['pickingOrder']}
                label={t('PICKING_ORDER')}
              >
                <InputNumber
                  className="w-100"
                  value={values.pickingOrder}
                  onChange={value => {
                    setFieldValue(
                      'pickingOrder',
                      _.isNumber(value) ? value : null,
                    );
                  }}
                  disabled={isGetMasterCategoriesPending}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {Number(values.level) ===
          PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY && (
          <Row>
            <Col span={24}>
              <Form.Item
                help={_.get(errors, 'categoryRole')}
                validateStatus={
                  _.get(errors, 'categoryRole') ? 'error' : 'success'
                }
                name="categoryRole"
                label={t('CATEGORY_ROLE')}
              >
                <Select
                  allowClear
                  value={values.categoryRole}
                  onChange={value => handleCategoryRoleChange(value)}
                  disabled={isCreatePending}
                  autoComplete="off"
                  options={getCategoryRoleOptions()}
                  showSearch
                  filterOption={getSelectFilterOption}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </AntCard>
  );
};

export default MarketProductMasterCategoryNewForm;
