import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import { get } from 'lodash';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';

import { Creators } from '../../redux/actions';
import { serviceSchema, getInitialValues } from './formHelper';

type NewServiceModalProps = {
  setVisible: (b: boolean) => void;
};

const NewServiceModal = ({ setVisible }: NewServiceModalProps) => {
  const { t } = useTranslation(['internalAuthentication', 'global']); const dispatch = useDispatch();

  const { id } = useParams();
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validate(() => serviceSchema),
    validateOnChange: false,
    onSubmit: values => {
      const body = { teamId: id, ...values };
      dispatch(Creators.createTeamServiceRequest({ service: body, onSuccess: () => setVisible(false) }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

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

  return (
    <Modal
      title={t('CREATE_NEW_REPOSITORY')}
      visible
      onCancel={() => {
        setVisible(false);
        setValues(getInitialValues());
      }}
      onOk={() => handleSubmit()}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'name')}
              validateStatus={get(errors, 'name') ? 'error' : 'success'}
              name={['name']}
              label={t('global:NAME_1')}
            >
              <Input
                data-testid="create-repository-name-input"
                placeholder="market-config-service"
                value={values.name}
                onChange={handleName}
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
                data-testid="create-repository-description-input"
                value={values.description}
                onChange={handleDescription}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewServiceModal;
