import { Button, Col, Form, Modal, Row } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { InputWrapper } from '@shared/components/UI/Form';
import { defaultValues, validationSchema } from './constants';
import { Creators } from '../../redux/actions';
import { algorithmConfigListSelector } from '@app/pages/Algorithm/Config/List/redux/selectors';
import { ROUTE } from '@app/routes';

const { useForm } = Form;

const ConfigCreateModal = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const namespace = useSelector(algorithmConfigListSelector.getNamespace);
  const createdData = useSelector(algorithmConfigListSelector.createdData);
  const isCreating = useSelector(algorithmConfigListSelector.configIsCreating);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: values => {
      dispatch(Creators.createAlgorithmConfigRequest({
        namespace,
        ...values,
        value: JSON.parse(values.value),
      }));
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const configKey = get(createdData, 'key', '');
    if (configKey) {
      const path = ROUTE.ALGORITHM_CONFIG_DETAIL.path.replace(':key', configKey).replace(':namespace', namespace);
      navigate(path);
    }
  }, [createdData, namespace, navigate]);

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  const footerButtons = useMemo(() => {
    return (
      <Button
        onClick={handleSubmit}
        loading={isCreating}
        icon={<PlusOutlined />}
        type="info"
      >
        {t('CREATE')}
      </Button>
    );
  }, [handleSubmit, isCreating, t]);

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      title={t('algorithmConfigPage:CREATE_CONFIG')}
      centered
      maskClosable={false}
      footer={footerButtons}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <InputWrapper
              inputKey="key"
              label={t('algorithmConfigPage:KEY')}
              value={values.key}
              isTouched={get(touched, 'key')}
              hasError={get(errors, 'key')}
              handleChange={handleChange}
            />
            <InputWrapper
              inputKey="alias"
              label={t('algorithmConfigPage:ALIAS')}
              value={values.alias}
              isTouched={get(touched, 'alias')}
              hasError={get(errors, 'alias')}
              handleChange={handleChange}
            />
            <InputWrapper
              inputKey="configType"
              label={t('algorithmConfigPage:TYPE')}
              value={values.configType}
              isTouched={get(touched, 'configType')}
              hasError={get(errors, 'configType')}
              handleChange={handleChange}
            />
            <InputWrapper
              inputKey="value"
              label={t('algorithmConfigPage:VALUE')}
              value={values.value}
              isTouched={get(touched, 'value')}
              hasError={get(errors, 'value')}
              handleChange={handleChange}
              additionalProps={{
                autoSize: {
                  minRows: 3,
                  maxRows: 6,
                },
              }}
              mode="textarea"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ConfigCreateModal;
