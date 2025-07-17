import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select, Checkbox, Divider, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { InfoCircleOutlined } from '@ant-design/icons';

import { useLiveQuery } from 'dexie-react-hooks';

import { Creators } from '../../redux/actions';
import { createComponentSelector } from '../../redux/selectors';
import { defaultValues, validationSchema, manipulateValuesAfterSubmit } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import SelectPage from '@shared/containers/Select/Page';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { getCountryOptions } from '@shared/utils/formHelper';
import { indexedDb } from '@shared/indexedDb';

const ComponentNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createComponentSelector.getIsPending);
  const pages = useLiveQuery(() => indexedDb.pages.toArray(), [], []);

  const [permKeyPrefix, setPermKeyPrefix] = useState(null);

  const pageIdToPageMap = useMemo(() => {
    return pages.reduce((acc, page) => {
      acc[page._id] = page;
      return acc;
    }, {});
  }, [pages]);

  const countries = useSelector(countriesSelector.getData);
  const { t } = useTranslation(['componentPage', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createComponentRequest({ body: manipulateValuesAfterSubmit(values, permKeyPrefix) }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="component-new" type="primary" htmlType="submit" loading={isPending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('COMPONENT_INFO')}>
      <Form form={form} id="component-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
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
                disabled={isPending}
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
                addonAfter="EN"
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
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
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                disabled={isPending}
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
              label={t('PAGE')}
            >
              <SelectPage
                value={values.page}
                onChange={page => {
                  setFieldValue('page', page);
                  const prefix = `${pageIdToPageMap[page].permKey}_COMPONENT_`;
                  setPermKeyPrefix(prefix);
                }}
                disabled={isPending}
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
              label={(
                <>
                  {t('PERMISSION_KEY')}
                  <Tooltip title={t('STARTS_WITH_PAGE_PERM_KEY')}>
                    <InfoCircleOutlined style={{ marginLeft: '4px' }} />
                  </Tooltip>
                </>
              )}
            >
              <Input
                value={values.permKey}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('permKey', value);
                }}
                disabled={isPending || !values.page}
                autoComplete="off"
                addonBefore={permKeyPrefix}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Divider />
          <Col span={2}>
            <Form.Item
              help={_.get(errors, 'hasGlobalAccess')}
              validateStatus={_.get(errors, 'hasGlobalAccess') ? 'error' : 'success'}
              name="hasGlobalAccess"
              label={t('GLOBAL_ACCESS')}
            >
              <Checkbox
                autoComplete="off"
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
          <Col span={22}>
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
                disabled={isPending || values.hasGlobalAccess}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default ComponentNewForm;
