import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import { createBadgeSelector } from '../../redux/selectors';
import {
  defaultValues,
  validationSchema,
  getModifiedValues,
} from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import { getDomainTypeOptions } from '@shared/utils/formHelper';
import { getBadgePositionOptions } from '../../../utils';

const BadgeNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createBadgeSelector.getIsPending);
  const { t } = useTranslation('marketProductBadgePage');
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = getModifiedValues(values);
      dispatch(Creators.createBadgeRequest({ body }));
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="badge-new" type="primary" htmlType="submit" loading={isPending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('BADGE_INFO')}>
      <Form form={form} id="badge-new" onFinish={handleSubmit} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'name')}
              validateStatus={_.get(errors, 'name') ? 'error' : 'success'}
              name="name"
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'description')}
              validateStatus={_.get(errors, 'description') ? 'error' : 'success'}
              name="description"
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={handleChange}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'position')}
              validateStatus={_.get(errors, 'position') ? 'error' : 'success'}
              name="position"
              label={t('POSITION')}
            >
              <Select
                allowClear
                value={values.position}
                onChange={position => setFieldValue('position', position)}
                options={getBadgePositionOptions()}
                disabled={isPending}
                autoComplete="off"
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'domainTypes')}
              validateStatus={_.get(errors, 'domainTypes') ? 'error' : 'success'}
              name="domainTypes"
              label={t('global:DOMAIN_TYPES')}
            >
              <Select
                mode="multiple"
                allowClear
                value={values.domainTypes}
                onChange={domainTypes => {
                  setFieldValue('domainTypes', domainTypes);
                }}
                options={getDomainTypeOptions()}
                disabled={isPending}
                autoComplete="off"
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default BadgeNewForm;
