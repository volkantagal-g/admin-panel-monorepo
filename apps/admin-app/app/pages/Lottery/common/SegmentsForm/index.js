import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, Input, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { getInitialValues, manipulateValuesBeforeSubmit } from './formHelper';
import Card from '@shared/components/UI/AntCard';

import { getSubmitButtons } from '@app/pages/Lottery/util';

const SegmentsForm = props => {
  const {
    isDetail = false,
    submitHandler,
    lotteryId,
    lotterySegments,
    isCreateLotterySegmentsPending,
    isCreateLotterySegmentsError,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation('lotteryPage');
  const formTitle = t('SEGMENTS');

  const isDisabled = isDetail && !isEditing;

  let submitButtonText;
  if (isDetail) submitButtonText = isEditing ? t('global:UPDATE') : t('global:EDIT');
  else submitButtonText = t('global:CREATE');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(lotterySegments),
  });

  const { handleChange, values } = formik;

  const handleSubmit = values => {
    const body = manipulateValuesBeforeSubmit(values, lotteryId);
    submitHandler(body);
  };

  useEffect(() => {
    if (values?.lotterySegments?.length) {
      form.setFieldsValue({ lotterySegments: values.lotterySegments });
    }
  }, [values?.lotterySegments, form]);

  useEffect(() => {
    setIsEditing(isCreateLotterySegmentsPending);
  }, [isCreateLotterySegmentsPending]);

  useEffect(() => {
    if (isCreateLotterySegmentsError) {
      setIsEditing(true);
    }
  }, [isCreateLotterySegmentsError]);

  return (
    <Card title={formTitle}>
      <Form onFinish={handleSubmit} layout="vertical" initialValues={values} form={form}>
        <Row>
          <Col span={24}>
            <Form.Item label={t('SEGMENT_PAIRS')}>
              <Form.List name="lotterySegments" initialValue={values.lotterySegments}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(field => (
                      <Space key={field.key} align="baseline">
                        <Form.Item {...field} label={t('SHADOW_SEGMENT')} name={[field.name, 'shadowSegment']} rules={[{ required: true }]}>
                          <Input onChange={handleChange} disabled={isDisabled} autoComplete="off" />
                        </Form.Item>
                        <Form.Item {...field} label={t('TARGET_SEGMENT')} name={[field.name, 'targetSegment']} rules={[{ required: true }]}>
                          <Input onChange={handleChange} disabled={isDisabled} autoComplete="off" />
                        </Form.Item>
                        <Form.Item {...field} label={t('PRIORITY')} name={[field.name, 'priority']} rules={[{ required: true }]}>
                          <Input onChange={handleChange} disabled={isDisabled} autoComplete="off" />
                        </Form.Item>
                        <Form.Item {...field} label={t('TITLE')} name={[field.name, 'title']} rules={[{ required: true }]}>
                          <Input onChange={handleChange} disabled={isDisabled} autoComplete="off" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                    <Form.Item wrapperCol={{ span: 12 }}>
                      <Button disabled={isDisabled} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        {t('ADD_SEGMENT')}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Form.Item>
            {getSubmitButtons(
              isDetail,
              isEditing,
              setIsEditing,
              submitButtonText,
              t('CANCEL'),
              isCreateLotterySegmentsPending,
              isCreateLotterySegmentsError,
            )}
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

SegmentsForm.propTypes = {
  isDetail: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

export default SegmentsForm;
