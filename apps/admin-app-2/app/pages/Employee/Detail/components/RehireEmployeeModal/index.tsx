import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  DatePicker,
  Row,
  Button,
  Popconfirm,
  Modal,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { rehireEmployeeSelector } from '../../redux/selectors';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import { Creators } from '../../redux/actions';

const RehireEmployeeModal = ({
  open,
  onChangeVisibility,
}: { open: boolean, onChangeVisibility: Function }) => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isPending = useSelector(rehireEmployeeSelector.getIsPending);

  const handleSaveClick = () => {
    form.submit();
  };

  const handleCancelClick = () => {
    onChangeVisibility(false);
  };

  const handleSubmit = (values: any) => {
    dispatch(Creators.rehireEmployeeRequest({
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
      title={t('employeePage:REHIRE_EMPLOYEE')}
      footer={[
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
        </Popconfirm>,
        <Popconfirm
          onConfirm={handleSaveClick}
          okText={t('button:YES')}
          cancelText={t('button:CANCEL')}
          title={t('employeePage:COMMON_CONFIRM_TEXT')}
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
        </Popconfirm>,
      ]}
    >
      <Form
        form={form}
        name="employeeRehireForm"
        layout="vertical"
        initialValues={{ workStartDate: undefined }}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              hasFeedback
              required
              rules={rules}
              name={['workStartDate']}
              label={t('employeePage:WORK_START_DATE')}
            >
              <DatePicker
                placeholder={t('employeePage:WORK_START_DATE')}
                allowClear={false}
                className={`${classes.inputContainer} w-100`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RehireEmployeeModal;
