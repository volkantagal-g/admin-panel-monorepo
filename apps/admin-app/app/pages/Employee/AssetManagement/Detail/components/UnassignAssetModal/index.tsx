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
import moment, { Moment } from 'moment';
import { range as _range } from 'lodash';

import { getLangKey } from '@shared/i18n.ts';
import SelectAssignableStatus from '../../../components/Select/AssignableStatus';
import SelectAssignableReasonStatus from '../../../components/Select/AssignableReasonStatus';
import { ASSIGNABLE_STATUS, LOCAL_DATE_TIME_FORMAT } from '@app/pages/Employee/AssetManagement/constants';
import { validationSchema } from './validationSchema';
import { assetSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { TextArea } = Input;

interface UnassignAssetModalProps {
  open: boolean;
  onClose: (shouldReload: boolean) => void;
}

const UnassignAssetModal = ({ open, onClose }: UnassignAssetModalProps) => {
  const { t } = useTranslation(['assetManagement', 'global', 'error', 'button']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const asset = useSelector(assetSelector.getData);
  const [assignableStatus, setAssignableStatus] = useState<number | undefined>();
  const langKey = getLangKey();

  const handleSaveClick = () => {
    form.submit();
  };

  const handleCancelClick = () => {
    setAssignableStatus(undefined);
    onClose(false);
  };

  const handleSubmit = (values: any) => {
    dispatch(Creators.unassignAssetRequest({
      assetId: asset?._id,
      assignmentReturnDate: values.assignmentReturnDate,
      assignableStatus: values.assignableStatus,
      assignableStatusReason: values.assignableStatusReason,
      note: values.note,
      onSuccess: () => {
        setAssignableStatus(undefined);
        onClose(true);
      },
    }));
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const getDisabledTime = (current: Moment | null): { disabledHours: () => number[], disabledMinutes: () => number[] } => {
    const now = moment();
    if (!current || current.isSame(now, 'day')) {
      return {
        disabledHours: () => _range(now.hour() + 1, 24),
        disabledMinutes: () => _range(now.minute() + 1, 60),
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
    };
  };

  const yupSchemaObj = validationSchema(t);
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  return (
    <Modal
      closable
      destroyOnClose
      onCancel={handleCancelClick}
      visible={open}
      title={t('assetManagement:ASSET_UNASSIGN_FORM')}
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
          title={t('assetManagement:UNASSIGN_ASSET_CONFIRMATION')}
        >
          <Button
            type="primary"
            size="middle"
            htmlType="submit"
          >
            {t('assetManagement:UNASSIGN_ASSET')}
          </Button>
        </Popconfirm>,
      ]}
    >
      <Form
        form={form}
        name="assignAssetForm"
        layout="vertical"
        preserve={false}
        initialValues={{
          assignmentReturnDate: undefined,
          assignableStatus: undefined,
          assignableStatusReason: undefined,
          note: undefined,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              required
              name="assignmentReturnDate"
              label={t('assetManagement:ASSIGNMENT_RETURN_DATE')}
              rules={rules}
            >
              <DatePicker
                disabledDate={current => current.isAfter(moment())}
                disabledTime={getDisabledTime}
                allowClear={false}
                style={{ width: '100%' }}
                placeholder={t('assetManagement:ASSIGNMENT_RETURN_DATE')}
                format={LOCAL_DATE_TIME_FORMAT[langKey?.toUpperCase()]}
                showTime
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              required
              name="assignableStatus"
              label={t('assetManagement:ASSIGNABLE_STATUS')}
              rules={rules}
            >
              <SelectAssignableStatus
                allowClear={false}
                onChange={value => {
                  setAssignableStatus(value);
                }}
                placeholder={t('assetManagement:ASSIGNABLE_STATUS')}
              />
            </Form.Item>
          </Col>

          {
            assignableStatus === ASSIGNABLE_STATUS.NON_ASSIGNABLE && (
              <Col span={24}>
                <Form.Item
                  required
                  name="assignableStatusReason"
                  label={t('global:REASON')}
                  rules={rules}
                >
                  <SelectAssignableReasonStatus
                    allowClear={false}
                    assignableStatus={assignableStatus}
                    placeholder={t('assetManagement:REASON')}
                  />
                </Form.Item>
              </Col>
            )
          }

          <Col span={24}>
            <Form.Item
              name="note"
              label={t('assetManagement:UNASSIGN_NOTE')}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UnassignAssetModal;
