import { Modal, Form, DatePicker, Descriptions, Select } from 'antd';
import type { ModalProps } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { convertConstantValueTranslationsToSelectOptions, isMobile } from '@shared/utils/common';
import ActionButtons from '../ActionButtons';
import useStyles from '../../styles';
import { EMPLOYEE_CHANGE_LOG_REASONS } from '../../../constants';
import { reasonRequiredFields, fieldNameToTranslationKey } from './constant';

interface FieldChange {
  fieldName: string;
  effectiveDate: moment.Moment;
}

type EffectiveDateModalPropsTypes = {
  isVisible: boolean;
  changedFields: string[];
  onSave: (changes: FieldChange[]) => void;
  onCancel: () => void;
  destroyOnClose: ModalProps['destroyOnClose'];
}

const EffectiveDateModal = ({
  isVisible,
  changedFields,
  onSave,
  onCancel,
  destroyOnClose,
}: EffectiveDateModalPropsTypes) => {
  const { t } = useTranslation(['global', 'employeePage']);
  const [form] = Form.useForm();
  const classes = useStyles();

  const handleSaveClick = async () => {
    await form.validateFields().catch(() => {});
    let hasError = false;
    const fieldErrors = form.getFieldsError();
    fieldErrors.forEach(fieldError => {
      if (fieldError.errors.length > 0) {
        hasError = true;
      }
    });
    if (!hasError) {
      const formValues = form.getFieldsValue();
      form.resetFields();
      onSave(formValues);
    }
  };

  const handleCancelClick = () => {
    form.resetFields();
    onCancel();
  };

  const positionChangeReasons = convertConstantValueTranslationsToSelectOptions({
    constants: EMPLOYEE_CHANGE_LOG_REASONS,
    translationBaseKey: 'employeePage:EMPLOYEE_CHANGE_LOG_REASONS',
  });

  return (
    <Modal
      destroyOnClose={destroyOnClose}
      visible={isVisible}
      title={t('employeePage:EMPLOYEE_CHANGE_LOG_EFFECTIVE_DATE_MODAL_TITLE')}
      onCancel={onCancel}
      {...(!isMobile() && { width: 820 })}
      footer={[
        <ActionButtons
          isFormEditable
          isPending={false}
          onCancel={handleCancelClick}
          onSave={handleSaveClick}
          onEdit={() => {}}
        />,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={{}}>
        <Descriptions column={1} bordered className={classes.effectiveDateModalDescription}>
          {
            changedFields.map((field: string) => (
              // @ts-ignore
              <Descriptions.Item label={t(fieldNameToTranslationKey[field])} key={field}>
                <>
                  <Form.Item
                    key={`${field}.effectiveDate`}
                    name={`${field}.effectiveDate`}
                    label={t('employeePage:EFFECTIVE_DATE')}
                    rules={[{
                      required: true,
                      message: t('error:REQUIRED'),
                    }]}
                  >
                    <DatePicker allowClear={false} className="w-100" />
                  </Form.Item>
                  {
                    reasonRequiredFields.includes(field) && (
                      <Form.Item
                        key={`${field}.reason`}
                        name={`${field}.reason`}
                        label={t('global:REASON')}
                        rules={[{
                          required: true,
                          message: t('error:REQUIRED'),
                        }]}
                      >
                        <Select options={positionChangeReasons} allowClear={false} />
                      </Form.Item>
                    )
                  }
                </>
              </Descriptions.Item>
            ))
          }
        </Descriptions>
      </Form>
    </Modal>
  );
};

export default EffectiveDateModal;
