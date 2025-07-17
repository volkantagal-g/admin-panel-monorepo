import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  DatePicker,
  Row,
  Checkbox,
  Button,
  Popconfirm,
  Modal,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
import { useTranslation } from 'react-i18next';

import { employeeSelector, terminateEmployeeSelector } from '../../redux/selectors';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import { Creators } from '../../redux/actions';

const TerminateEmployeeModal = ({
  open,
  onChangeVisibility,
}: { open: boolean, onChangeVisibility: Function }) => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [selectedWorkEndDate, setSelectedWorkEndDate] = useState<Moment | undefined | null>();
  const isPending = useSelector(terminateEmployeeSelector.getIsPending);
  const companyFormData = useSelector(employeeSelector.getCompanyInfoFormData);

  const handleSaveClick = () => {
    form.submit();
  };

  const handleCancelClick = () => {
    onChangeVisibility(false);
  };

  const handleSubmit = (values: any) => {
    dispatch(Creators.terminateEmployeeRequest({
      values,
      onSuccess: () => {
        onChangeVisibility(false);
      },
    }));
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  return (
    <Modal
      closable
      onCancel={() => handleCancelClick()}
      visible={open}
      title={t('employeePage:TERMINATE_EMPLOYEE')}
      footer={[
        <Row justify={companyFormData?.workEndDate ? 'space-between' : 'end'}>
          <Col>
            <Popconfirm
              onConfirm={handleCancelClick}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('global:COMMON_CONFIRM_TEXT')}
            >
              <Button
                danger
                className={classes.cancelActionButton}
                disabled={isPending}
                type="primary"
                size="middle"
                key="cancel"
                htmlType="button"
              >
                {t('CANCEL')}
              </Button>
            </Popconfirm>
            <Popconfirm
              onConfirm={handleSaveClick}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('employeePage:CONFIRM_TERMINATE_EMPLOYEE')}
            >
              <Button
                loading={isPending}
                type="primary"
                size="middle"
                key="save"
                htmlType="submit"
              >
                {t('SAVE')}
              </Button>
            </Popconfirm>
          </Col>
        </Row>,
      ]}
    >
      <Form
        form={form}
        name="employeeTerminationForm"
        layout="vertical"
        initialValues={{
          workEndDate: undefined,
          reason: undefined,
          shouldImmediatelyTerminate: false,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              hasFeedback
              required
              rules={rules}
              name={['workEndDate']}
              label={t('employeePage:WORK_END_DATE')}
            >
              <DatePicker
                placeholder={t('employeePage:WORK_END_DATE')}
                allowClear={false}
                className={`${classes.inputContainer} w-100`}
                onChange={(date: Moment | null) => {
                  setSelectedWorkEndDate(date);
                  form.setFieldsValue({ workEndDate: date });
                }}
              />
            </Form.Item>
          </Col>
          {
            (selectedWorkEndDate && moment().isSame(selectedWorkEndDate, 'day')) && (
              <Col span={24}>
                <Form.Item
                  hasFeedback
                  required
                  rules={rules}
                  dependencies={['workEndDate']}
                  name={['shouldImmediatelyTerminate']}
                  label={t('employeePage:SHOULD_IMMEDIATELY_TERMINATE_PROCESS')}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            )
          }
        </Row>
      </Form>
    </Modal>
  );
};

export default TerminateEmployeeModal;
