import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select, Switch } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _get from 'lodash/get';

import { Creators } from '../../redux/actions';
import { createSupplierSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { firmTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';

const { TextArea } = Input;
const { Option } = Select;

const SupplierNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createSupplierSelector.getIsPending);
  const { t } = useTranslation('supplierPage');
  const [form] = Form.useForm();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createSupplierRequest({ body: values }));
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, isPending, form]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="supplier-new" type="primary" htmlType="submit" loading={isPending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  const options = Object.entries(firmTypes).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('SUPPLIER_INFO')}>
      <Form
        form={form}
        id="supplier-new"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'name')}
              validateStatus={_get(errors, 'name') ? 'error' : 'success'}
              name="name"
              label={t('global:NAME')}
            >
              <Input
                value={values.name}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'title')}
              validateStatus={_get(errors, 'title') ? 'error' : 'success'}
              name="title"
              label={t('global:TITLE1')}
            >
              <Input
                value={values.title}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'phone')}
              validateStatus={_get(errors, 'phone') ? 'error' : 'success'}
              name="phone"
              label={t('global:PHONE')}
            >
              <Input
                value={values.phone}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'fax')}
              validateStatus={_get(errors, 'fax') ? 'error' : 'success'}
              name="fax"
              label={t('global:FAX')}
            >
              <Input
                value={values.title}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={8}>
            <Form.Item
              help={_get(errors, 'zipCode')}
              validateStatus={_get(errors, 'zipCode') ? 'error' : 'success'}
              name="zipCode"
              label={t('global:ZIP_CODE')}
            >
              <Input
                value={values.zipCode}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              help={_get(errors, 'city')}
              validateStatus={_get(errors, 'city') ? 'error' : 'success'}
              name={['city']}
              label={t('global:CITY')}
            >
              <Input
                value={values.city}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              help={_get(errors, 'district')}
              validateStatus={_get(errors, 'district') ? 'error' : 'success'}
              name={['district']}
              label={t('global:DISTRICT')}
            >
              <Input
                value={values.district}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={24}>
            <Form.Item
              help={_get(errors, 'address')}
              validateStatus={_get(errors, 'address') ? 'error' : 'success'}
              name="address"
              label={t('global:ADDRESS')}
            >
              <TextArea
                value={values.address}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'vn')}
              validateStatus={_get(errors, 'vn') ? 'error' : 'success'}
              name="vn"
              label={t('global:TAX_NUMBER')}
            >
              <Input
                value={values.vn}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'vd')}
              validateStatus={_get(errors, 'vd') ? 'error' : 'success'}
              name="vd"
              label={t('global:TAX_OFFICE')}
            >
              <Input
                value={values.vd}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={24}>
            <Form.Item
              help={_get(errors, 'types')}
              validateStatus={_get(errors, 'types') ? 'error' : 'success'}
              name="types"
              label={t('global:TYPE3')}
            >
              <Select
                mode="multiple"
                allowClear
                value={values.types}
                onChange={value => {
                  setFieldValue('types', value);
                }}
                disabled={isPending}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {options}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'isFactory')}
              validateStatus={_get(errors, 'isFactory') ? 'error' : 'success'}
              name="isFactory"
              label={t('SUPPLIER_FACTORY')}
            >
              <Switch
                checked={values.isFactory}
                onChange={value => {
                  setFieldValue('isFactory', value);
                }}
                checkedChildren={t('SWITCH.YES')}
                unCheckedChildren={t('SWITCH.NO')}
                className={values.isFactory ? 'bg-success' : 'bg-danger'}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default SupplierNewForm;
