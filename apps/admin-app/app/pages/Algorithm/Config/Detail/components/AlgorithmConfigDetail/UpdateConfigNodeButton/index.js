import { Button, Col, Form, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { EditOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { Creators } from '../../../redux/actions';
import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import { InputWrapper } from '@shared/components/UI/Form';
import { updateConfigNodeValidationSchema } from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/UpdateConfigNodeButton/constants';

const UpdateConfigNodeButton = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const namespace = useSelector(configDetailSelector.getNamespace);
  const configData = useSelector(configDetailSelector.getData);
  const configNodeUpdating = useSelector(configDetailSelector.configNodeUpdating);

  const formik = useFormik({
    validationSchema: updateConfigNodeValidationSchema,
    validateOnMount: true,
    onSubmit: values => {
      dispatch(Creators.updateConfigNodeRequest({
        key: configData?.key,
        namespace,
        updateBody: values,
      }));
    },
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setValues,
  } = formik;

  useEffect(() => {
    if (configData) {
      const currentValues = {
        key: configData?.key,
        alias: configData?.alias,
        type: configData?.type,
      };
      setValues(currentValues);
      form.setFieldsValue(currentValues);
    }
  }, [form, configData, setValues]);

  const footerButtons = (
    <Button
      onClick={handleSubmit}
      loading={configNodeUpdating}
      icon={<EditOutlined />}
      type="info"
    >
      {t('SAVE')}
    </Button>
  );

  return (
    <>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
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
                value={values?.key}
                isTouched={get(touched, 'key')}
                hasError={get(errors, 'key')}
                handleChange={handleChange}
                disabled={configNodeUpdating}
              />
              <InputWrapper
                inputKey="alias"
                label={t('algorithmConfigPage:ALIAS')}
                value={values?.alias}
                isTouched={get(touched, 'alias')}
                hasError={get(errors, 'alias')}
                handleChange={handleChange}
                disabled={configNodeUpdating}
              />
              <InputWrapper
                inputKey="type"
                label={t('algorithmConfigPage:TYPE')}
                value={values?.type}
                isTouched={get(touched, 'type')}
                hasError={get(errors, 'type')}
                handleChange={handleChange}
                disabled={configNodeUpdating}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button
        type="info"
        icon={<EditOutlined />}
        style={{ marginRight: 4 }}
        loading={configNodeUpdating}
        onClick={() => setModalVisible(true)}
      />
    </>
  );
};

export default UpdateConfigNodeButton;
