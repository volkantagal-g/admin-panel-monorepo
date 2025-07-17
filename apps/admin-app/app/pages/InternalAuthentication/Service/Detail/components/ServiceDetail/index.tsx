import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Tooltip, Typography } from 'antd';
import { get } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';

import AntCard from '@shared/components/UI/AntCard';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { DbInternalService } from '@app/pages/InternalAuthentication/types';
import { validate } from '@shared/yup';

import { Creators } from '../../redux/actions';
import { serviceByIdSelector, updateServiceSelector } from '../../redux/selectors';
import { getInitialValues, serviceSchema } from './formHelper';

const { Text } = Typography;

const ServiceDetail = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']); const dispatch = useDispatch();

  const { teamId, serviceId } = useParams();
  const [form] = Form.useForm();
  const theme = useTheme();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const isUpdating = useSelector(updateServiceSelector.getIsPending);
  const service = useSelector(serviceByIdSelector.getData);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: getInitialValues(service),
    validate: validate(() => serviceSchema),
    onSubmit: values => {
      setIsFormEditable(false);
      const body = { teamId, serviceId, ...values };
      dispatch(Creators.updateServiceRequest({ service: body }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancelClick = () => {
    setValues(getInitialValues(service));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

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

  const cardExtra = (
    <Tooltip title={t('GENERAL_INFO_LAST_UPDATE')}>
      <Space>
        <EditOutlined />
        <Text>{moment(service?.updatedAt).format(getLocalDateTimeFormat())}</Text>
      </Space>
    </Tooltip>
  );

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
                form="serviceDetail-edit"
                type="primary"
                htmlType="submit"
                loading={isUpdating}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button
              size="small"
              onClick={handleEditClick}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard
      title={t('REPOSITORY_INFO')}
      extra={cardExtra}
      footer={cardFooter}
    >
      <Form
        form={form}
        id="serviceDetail-edit"
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
                value={values.name}
                onChange={handleName}
                disabled={isUpdating || !isFormEditable}
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
                disabled={isUpdating || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default ServiceDetail;
