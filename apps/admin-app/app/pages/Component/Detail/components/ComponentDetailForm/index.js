import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Row, Col, Button, Select, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { Link } from 'react-router-dom';

import { LinkOutlined } from '@ant-design/icons';

import { getComponentByIdSelector, updateComponentSelector } from '../../redux/selectors';
import { validationSchema, getInitialValues, manipulateValuesAfterSubmit } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import SelectPage from '@shared/containers/Select/Page';
import { getCountryOptions } from '@shared/utils/formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '../../../../../routes';

const ComponentDetailForm = () => {
  const dispatch = useDispatch();
  const component = useSelector(getComponentByIdSelector.getData) || {};
  const isUpdatePending = useSelector(updateComponentSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData || []);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation(['componentPage', 'global']);
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const theme = useTheme();
  const hasPermissionToEditComponentInfo = canAccess(permKey.PAGE_COMPONENT_DETAIL_EDIT_COMPONENT_INFO);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(component, countries),
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit(values);
      dispatch(Creators.updateComponentRequest({
        id: component._id,
        updateData: body,
      }));

      setIsFormEditable(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancelClick = () => {
    setValues(getInitialValues(component));
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
                form="component-detail"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
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
    <AntCard footer={hasPermissionToEditComponentInfo && cardFooter} bordered={false} title={t('COMPONENT_INFO')}>
      <Form
        form={form}
        id="component-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'name.tr')}
              validateStatus={_.get(errors, 'name.tr') ? 'error' : 'success'}
              name={['name', 'tr']}
              label={t('NAME_1')}
            >
              <Input
                value={values.name.tr}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.tr', value);
                }}
                addonAfter="TR"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
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
                addonAfter="EN"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'description.tr')}
              validateStatus={_.get(errors, 'description.tr') ? 'error' : 'success'}
              name={['description', 'tr']}
              label={t('DESCRIPTION')}
            >
              <Input
                value={values.description.tr}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description.tr', value);
                }}
                addonAfter="TR"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'description.en')}
              validateStatus={_.get(errors, 'description.en') ? 'error' : 'success'}
              name={['description', 'en']}
            >
              <Input
                value={values.description.en}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description.en', value);
                }}
                addonAfter="EN"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'permKey')}
              validateStatus={_.get(errors, 'permKey') ? 'error' : 'success'}
              name={['permKey']}
              label={t('PERMISSION_KEY')}
            >
              <Input
                value={values.permKey}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('permKey', value);
                }}
                disabled
                title={isFormEditable ? t('PERMISSION_KEY_DISABLED_TOOLTIP') : ''}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'page')}
              validateStatus={_.get(errors, 'page') ? 'error' : 'success'}
              name="page"
              label={(
                <>
                  {t('PAGE')}
                  {
                    !isFormEditable && (
                    <Link to={ROUTE.PAGE_DETAIL.path.replace(':id', component?.page?._id)} style={{ marginLeft: '10px' }}>
                      <LinkOutlined />
                    </Link>
                    )
                  }
                </>
              )}

            >
              <SelectPage
                value={values.page}
                onChange={page => {
                  setFieldValue('page', page);
                }}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Divider />
          <Col sm={4} xs={6}>
            <Form.Item
              help={_.get(errors, 'hasGlobalAccess')}
              validateStatus={_.get(errors, 'hasGlobalAccess') ? 'error' : 'success'}
              name="hasGlobalAccess"
              label={t('GLOBAL_ACCESS')}
            >
              <Checkbox
                autoComplete="off"
                disabled={!isFormEditable}
                checked={values.hasGlobalAccess}
                onChange={event => {
                  const isChecked = _.get(event, 'target.checked', false);
                  setFieldValue('hasGlobalAccess', isChecked);
                  if (isChecked) {
                    setFieldValue('countries', []);
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={20} xs={18}>
            <Form.Item
              help={_.get(errors, 'countries')}
              validateStatus={_.get(errors, 'countries') ? 'error' : 'success'}
              name="countries"
              label={t('COUNTRIES')}
            >
              <Select
                labelInValue
                mode="multiple"
                showSearch
                value={values.countries}
                options={getCountryOptions(countries, { showOldCountries: true })}
                onChange={_countries => {
                  setFieldValue('countries', _countries);
                }}
                filterOption={getSelectFilterOption}
                autoComplete="off"
                disabled={isUpdatePending || !isFormEditable || values.hasGlobalAccess}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default ComponentDetailForm;
