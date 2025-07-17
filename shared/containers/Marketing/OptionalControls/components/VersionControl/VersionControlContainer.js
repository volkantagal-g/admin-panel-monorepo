import { useRef } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import VersionControlComponent from './index';
import { OPTIONAL_CONTROL, VERSION_CONTROL_FIELD_NAMES } from '../../constants';

const VersionControl = ({ form, parentFieldName, disabled }) => {
  const controlFieldName = VERSION_CONTROL_FIELD_NAMES.FIELD_NAME;
  const shouldValidateRef = useRef(false);
  const { t } = useTranslation('marketing');

  const fieldName = parentFieldName
    ? [...[parentFieldName], controlFieldName]
    : [controlFieldName];

  const validateAtLeastOneVersion = () => {
    const isChecked = form
      .getFieldValue([parentFieldName, 'type'])
      ?.includes(OPTIONAL_CONTROL.VERSION_CONTROL);
    if (!isChecked) return Promise.resolve();

    const iosMin = form.getFieldValue([...fieldName, 'iosVersion', 'min']);
    const iosMax = form.getFieldValue([...fieldName, 'iosVersion', 'max']);
    const androidMin = form.getFieldValue([
      ...fieldName,
      'androidVersion',
      'min',
    ]);
    const androidMax = form.getFieldValue([
      ...fieldName,
      'androidVersion',
      'max',
    ]);

    const allFields = [iosMin, iosMax, androidMin, androidMax];

    const hasAtLeastOne = allFields.some(
      val => typeof val === 'string' && val.trim() !== '',
    );

    if (!hasAtLeastOne) {
      const message = t('VERSION_FIELD_CONTROL');
      return Promise.reject(new Error(message));
    }

    return Promise.resolve();
  };

  return (
    <div>
      <Form.Item
        name={[...fieldName]}
        rules={[{ validator: validateAtLeastOneVersion }]}
      >
        <VersionControlComponent
          form={form}
          parentFieldName={fieldName}
          disabled={disabled}
          onAnyVersionChange={() => {
            if (!shouldValidateRef.current) {
              shouldValidateRef.current = true;
            }
            form.validateFields([fieldName]);
          }}
        />
      </Form.Item>
    </div>
  );
};

export default VersionControl;
