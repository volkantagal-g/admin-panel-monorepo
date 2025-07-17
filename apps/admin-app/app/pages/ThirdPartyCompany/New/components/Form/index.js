import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';
import { createThirdPartyCompanySelector } from '../../redux/selectors';
import {
  getInitialValues,
  validationSchema,
} from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { HTTP_VERBS } from '../../../constants';
import useStyles from '../../../styles';

const ThirdPartyCompanyNewForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isCreateThirdPartyCompanyPending = useSelector(createThirdPartyCompanySelector.getIsPending);
  const isPending = isCreateThirdPartyCompanyPending;
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const [form] = Form.useForm();

  const verbOptions = Object.values(HTTP_VERBS).map(v => ({ value: v, label: v }));
  const [selectedVerb, setSelectedVerb] = useState(HTTP_VERBS.GET);
  const [route, setRoute] = useState('');

  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createThirdPartyCompanyRequest({ body: values }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleDescription = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue('description', value);
    },
    [setFieldValue],
  );

  const handleName = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue('name', value);
    },
    [setFieldValue],
  );

  const thirdPartyCompanyNewFormFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="thirdPartyCompany-new" type="primary" htmlType="submit" loading={isPending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  return (
    <AntCard footer={thirdPartyCompanyNewFormFooter} bordered={false} title={t('PAGE.NEW.INFO_TITLE')}>
      <Form form={form} id="thirdPartyCompany-new" onFinish={handleSubmit} layout="vertical">
        <Row align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'name')}
              validateStatus={get(errors, 'name') ? 'error' : 'success'}
              name={['name']}
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name}
                onChange={handleName}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'description')}
              validateStatus={get(errors, 'description') ? 'error' : 'success'}
              name={['description']}
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={handleDescription}
                disabled={isPending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'allowedRoutes')}
              validateStatus={get(errors, 'allowedRoutes') ? 'error' : 'success'}
              name={['allowedRoutes']}
              label={t('PAGE.NEW.ALLOWED_ROUTES')}
            >
              <Select
                mode="multiple"
                value={values.allowedRoutes}
                disabled={isPending}
                onChange={value => setFieldValue('allowedRoutes', value)}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={24} className={classes.routeOptionColumn}>
            <Select
              className={classes.httpVerbSelect}
              value={selectedVerb}
              options={verbOptions}
              disabled={isPending}
              onChange={setSelectedVerb}
            />
            <Input
              className="mr-2 ml-2"
              value={route}
              onChange={event => setRoute(event.target.value)}
            />
            <Button
              size="middle"
              disabled={route.length === 0}
              onClick={() => {
                const routeToAdd = selectedVerb + route;
                if (values.allowedRoutes.indexOf(routeToAdd) === -1) setFieldValue('allowedRoutes', [...values.allowedRoutes, routeToAdd]);
                setRoute('');
              }}
            >{t('ADD_ROUTE')}
            </Button>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default ThirdPartyCompanyNewForm;
