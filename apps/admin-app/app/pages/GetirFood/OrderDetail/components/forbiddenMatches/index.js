import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'antd';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { validate } from '@shared/yup';
import {
  getInitialValues,
  validationSchema,
} from './formHelper';
import { Creators } from '../../redux/actions';
import { orderDetailSelector, createForbiddenMatchSelector } from '../../redux/selectors';
import { usePrevious } from '@shared/hooks';

const ForbiddenMatchForm = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isForbiddenMatchPending = useSelector(createForbiddenMatchSelector.getIsPending);
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const prevIsUpdatePending = usePrevious(isForbiddenMatchPending);
  const theme = useTheme();
  const [form] = Form.useForm();

  const { handleSubmit, values, errors, setFieldValue, resetForm } = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: async submitValues => {
      const client = get(orderDetail, 'client._id', '');
      const description = submitValues.forbiddenMatch;
      const person = get(orderDetail, 'courier.person', '');
      await dispatch(Creators.createForbiddenMatchRequest({ client, description, person }));
      setFieldValue('forbiddenMatch', '');
      form.resetFields();
      resetForm();
      setIsFormEditable(false);
    },
  });

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isForbiddenMatchPending) {
      setIsFormEditable(false);
    }
  }, [isForbiddenMatchPending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    setFieldValue('forbiddenMatch', '');
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
                form="forbidden-match-form"
                type="primary"
                htmlType="submit"
                loading={isForbiddenMatchPending}
                disabled={!get(values, 'forbiddenMatch').trim()}
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
    <AntCard footer={cardFooter} bordered={false} title={t('FORBIDDEN_MATCH')}>
      <Form
        form={form}
        id="forbidden-match-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={isFormEditable && get(errors, 'forbiddenMatch')}
              validateStatus={get(errors, 'forbiddenMatch') && isFormEditable ? 'error' : 'success'}
              name={['forbiddenMatch']}
            >
              <AntTextArea
                value={values.forbiddenMatch}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('forbiddenMatch', value);
                }}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default ForbiddenMatchForm;
