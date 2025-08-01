import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Select, Input, InputNumber, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import { useFormik } from 'formik';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { updateMarketProductMasterCategorySelector, getMarketProductMasterCategorySelector } from '../../redux/selectors';
import { getMarketProductMasterCategoriesSelector } from '@shared/redux/selectors/common';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
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
import { usePrevious } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { canSubmit } from '@shared/utils/formHelper';

const MarketProductMasterCategoryNewForm = () => {
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const isUpdatePending = useSelector(updateMarketProductMasterCategorySelector.getIsPending);
  const updateError = useSelector(updateMarketProductMasterCategorySelector.getError);
  const marketProductMasterCategories = useSelector(getMarketProductMasterCategoriesSelector.getData);
  const isGetMasterCategoriesPending = useSelector(getMarketProductMasterCategoriesSelector.getIsPending);
  const marketProductMasterCategory = useSelector(getMarketProductMasterCategorySelector.getData);
  const [modal, confirmationModalContext] = Modal.useModal();
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const initialValues = useMemo(() => getInitialValues(marketProductMasterCategory), [marketProductMasterCategory]);

  const showWarningModal = body => {
    const modalConfig = {
      title: t('PARENT_CATEGORY'),
      content: (
        <>
          {t('WARNING_PARENT_CATEGORY_CHANGED')}
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: t('button:SAVE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(
          Creators.updateMarketProductMasterCategoryRequest({
            id: _.get(marketProductMasterCategory, '_id'),
            body,
          }),
        );
      },
      // eslint-disable-next-line no-use-before-define
      onCancel: handleCancelClick,
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ values, initialValues });
      if (body.parent) {
        showWarningModal(body);
      }
      else {
        dispatch(
          Creators.updateMarketProductMasterCategoryRequest({
            id: _.get(marketProductMasterCategory, '_id'),
            body,
          }),
        );
      }
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending, prevIsUpdatePending]);

  const getMasterCategories = useCallback(level => {
    let parentMasterCategoryLevel;
    if (Number(level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS;
    }
    else if (Number(level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY;
    }
    else if (Number(level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
      parentMasterCategoryLevel = PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY;
    }
    else {
      return;
    }
    dispatch(CommonCreators.getMarketProductMasterCategoriesRequest({ level: parentMasterCategoryLevel }));
  }, [dispatch]);

  useEffect(() => {
    if (_.has(marketProductMasterCategory, '_id')) {
      getMasterCategories(marketProductMasterCategory.level);
    }
  }, [marketProductMasterCategory, getMasterCategories]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [isUpdatePending, initialValues, prevIsUpdatePending, setValues, updateError]);

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
                form="master-category-detail"
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
    <>
      <AntCard footer={cardFooter} bordered={false} title={t('GENERAL_INFO')}>
        <Form
          form={form}
          id="master-category-detail"
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
                  disabled={isUpdatePending || !isFormEditable}
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
                  disabled={isUpdatePending || !isFormEditable}
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
                    const value = _.get(event, 'target.value', null);
                    setFieldValue('description', value || null);
                  }}
                  disabled={isUpdatePending || !isFormEditable}
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
                  disabled
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
                    Number(values.level) ===
                      PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY ||
                    isUpdatePending ||
                    !isFormEditable
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
          {marketProductMasterCategory.level ===
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
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          {marketProductMasterCategory.level ===
            PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY && (
            <Row gutter={[theme.spacing(3)]}>
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
                    onChange={value => {
                      setFieldValue('categoryRole', value || null);
                    }}
                    disabled={isUpdatePending || !isFormEditable}
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
      {confirmationModalContext}
    </>
  );
};

export default MarketProductMasterCategoryNewForm;
