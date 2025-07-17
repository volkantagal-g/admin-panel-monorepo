import { Form } from 'antd';
import { useEffect, useMemo } from 'react';

import { Modal } from '@shared/components/GUI';
import { XCommFloatingLabel } from '@app/pages/MarketProductChainManagement/components/XCommFloatingLabel';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import useStyles from './styles';

const DarkStoreConfigurationModal = ({
  isOpen,
  onCancel,
  onSave,
  demographies = [],
  sizes = [],
  demographiesLoading = false,
  sizesLoading = false,
  currentDemography,
  currentSize,
  confirmLoading = false,
}) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const [form] = Form.useForm();

  const demographyOptions = useMemo(() => demographies.map(item => ({
    id: String(item.demography),
    name: item.name,
    value: String(item.demography),
  })), [demographies]);

  const sizeOptions = useMemo(() => sizes.map(item => ({
    id: String(item.size),
    name: item.name,
    value: String(item.size),
  })), [sizes]);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      form.setFieldsValue({
        demography: currentDemography !== null && currentDemography !== undefined ? String(currentDemography) : undefined,
        size: currentSize !== null && currentSize !== undefined ? String(currentSize) : undefined,
      });
    }
  }, [form, isOpen, currentDemography, currentSize]);

  const handleSave = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        demography: values.demography ? Number(values.demography) : undefined,
        size: values.size ? Number(values.size) : undefined,
      };
      onSave?.(formattedValues);
    });
  };

  return (
    <Modal
      title={t('BUTTONS.CONFIGURATION')}
      visible={isOpen}
      onCancel={onCancel}
      onOk={handleSave}
      okText={t('BUTTONS.SAVE')}
      cancelText={t('BUTTONS.CANCEL')}
      width={500}
      centered
      closable={false}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        className={classes.formContainer}
        initialValues={{
          demography: currentDemography !== null ? String(currentDemography) : undefined,
          size: currentSize !== null ? String(currentSize) : undefined,
        }}
      >
        <div className={classes.row}>
          <Form.Item
            name="demography"
          >
            <XCommFloatingLabel.Select
              name="demography"
              label={t('COLUMNS.DEMOGRAPHY')}
              loading={demographiesLoading}
              form={form}
              optionsData={demographyOptions}
              disabled={confirmLoading}
            />
          </Form.Item>
          <Form.Item
            name="size"
          >
            <XCommFloatingLabel.Select
              name="size"
              label={t('COLUMNS.SIZE')}
              loading={sizesLoading}
              form={form}
              optionsData={sizeOptions}
              allowClear
              disabled={confirmLoading}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DarkStoreConfigurationModal;
