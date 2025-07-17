import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  DatePicker,
  Row,
  Button,
  Popconfirm,
  Modal,
  Input,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import moment from 'moment';

import { getLangKey } from '@shared/i18n.ts';
import { ASSIGNMENT_PERIOD_TYPES, LOCAL_DATE_TIME_FORMAT, LOCAL_DATE_FORMAT } from '@app/pages/Employee/AssetManagement/constants';
import SelectEmployee from '@shared/containers/Select/Employee';
import SelectAssignmentPeriodType from '../../../components/Select/AssignmentPeriodType';
import { validationSchema } from './validationSchema';
import { assetSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { TextArea } = Input;

interface AssignAssetModalProps {
  open: boolean;
  onClose: (shouldReload: boolean) => void;
  shouldAskTimePickerForAssignmentStartDate: false,
  shouldAskAssignmentPeriodType: false,
}

const AssignAssetModal = ({
  open,
  onClose,
  shouldAskTimePickerForAssignmentStartDate = false,
  shouldAskAssignmentPeriodType = false,
}: AssignAssetModalProps) => {
  const { t } = useTranslation(['assetManagement', 'global', 'error', 'button']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const asset = useSelector(assetSelector.getData);
  const isPending = useSelector(assetSelector.getIsPending);
  const [assignmentPeriodType, setAssignmentPeriodType] = useState<number>();
  const langKey = getLangKey();

  const handleSaveClick = () => {
    form.submit();
  };

  const handleCancelClick = () => {
    setAssignmentPeriodType(undefined);
    onClose(false);
  };

  const handleSubmit = (values: any) => {
    dispatch(Creators.assignAssetRequest({
      assetId: asset?._id,
      employeeId: values.employeeId,
      assignmentStartDate: values.assignmentStartDate,
      assignmentEndDate: values.assignmentEndDate,
      assignmentPeriodType: values.assignmentPeriodType,
      note: values.note,
      onSuccess: () => {
        onClose(true);
      },
    }));
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t, shouldAskAssignmentPeriodType);
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  return (
    <Modal
      closable
      destroyOnClose
      onCancel={handleCancelClick}
      visible={open}
      title={t('assetManagement:ASSET_ASSIGN_FORM')}
      footer={[
        <Popconfirm
          key="cancel"
          onConfirm={handleCancelClick}
          okText={t('button:YES')}
          cancelText={t('button:CANCEL')}
          title={t('assetManagement:COMMON_CANCEL_CONFIRM_TEXT')}
        >
          <Button
            danger
            disabled={isPending}
            type="primary"
            size="middle"
            htmlType="button"
          >
            {t('button:CANCEL')}
          </Button>
        </Popconfirm>,
        <Popconfirm
          key="save"
          onConfirm={handleSaveClick}
          okText={t('button:YES')}
          cancelText={t('button:CANCEL')}
          title={t('assetManagement:ASSIGN_ASSET_CONFIRMATION')}
        >
          <Button
            loading={isPending}
            type="primary"
            size="middle"
            htmlType="submit"
          >
            {t('assetManagement:ASSIGN_ASSET')}
          </Button>
        </Popconfirm>,
      ]}
    >
      <Form
        form={form}
        name="unassignAssetForm"
        layout="vertical"
        preserve={false}
        initialValues={{
          employeeId: undefined,
          assignmentStartDate: shouldAskTimePickerForAssignmentStartDate ? moment().minute(0).second(0) : moment().startOf('day'),
          assignmentPeriodType: undefined,
          assignmentEndDate: shouldAskAssignmentPeriodType ? moment().minute(0).second(0) : null,
          note: undefined,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              required
              name="employeeId"
              label={t('global:GETIRIAN')}
              rules={rules}
            >
              <SelectEmployee placeholder={t('assetManagement:SELECT_EMPLOYEE')} allowClear={false} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              required
              name="assignmentStartDate"
              label={t('assetManagement:ASSIGNMENT_START_DATE')}
              rules={rules}
            >
              <DatePicker
                showTime={shouldAskTimePickerForAssignmentStartDate}
                format={shouldAskTimePickerForAssignmentStartDate ? LOCAL_DATE_TIME_FORMAT[langKey?.toUpperCase()] : LOCAL_DATE_FORMAT[langKey?.toUpperCase()]}
                minuteStep={15}
                showNow={false}
                allowClear={false}
                className="w-100"
                placeholder={t('assetManagement:ASSIGNMENT_START_DATE')}
              />
            </Form.Item>
          </Col>

          {shouldAskAssignmentPeriodType && (
            <Col span={24}>
              <Form.Item
                required
                name="assignmentPeriodType"
                label={t('assetManagement:ASSIGNMENT_PERIOD_TYPE_TEXT')}
                rules={rules}
              >
                <SelectAssignmentPeriodType
                  onChange={value => {
                    setAssignmentPeriodType(value);
                  }}
                  allowClear
                  placeholder={t('assetManagement:ASSIGNMENT_PERIOD_TYPE_TEXT')}
                />
              </Form.Item>
            </Col>
          )}

          {(shouldAskAssignmentPeriodType && assignmentPeriodType === ASSIGNMENT_PERIOD_TYPES.DEFINITE_TERM) && (
            <Col span={24}>
              <Form.Item
                required
                name="assignmentEndDate"
                label={t('assetManagement:ASSIGNMENT_END_DATE')}
                rules={rules}
              >
                <DatePicker
                  showTime
                  format={LOCAL_DATE_TIME_FORMAT[langKey?.toUpperCase()]}
                  minuteStep={15}
                  showNow={false}
                  allowClear={false}
                  className="w-100"
                  placeholder={t('assetManagement:ASSIGNMENT_END_DATE')}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item
              name="note"
              label={t('assetManagement:ASSIGN_NOTE')}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AssignAssetModal;
