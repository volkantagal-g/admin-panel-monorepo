import React from 'react';
import { Form } from 'antd';

import { getLangKey } from '@shared/i18n.ts';
import { DynamicAssetInput } from '@app/pages/Employee/AssetManagement/components';
import { IDynamicAssetFormItemProps } from '@app/pages/Employee/AssetManagement/types';

const DynamicAssetFormItem: React.FC<IDynamicAssetFormItemProps> = ({
  form,
  rules,
  itemConfig,
  disabled,
  externalFormStates,
  mode,
}: IDynamicAssetFormItemProps) => {
  return (
    <Form.Item
      key={`${itemConfig?.fieldName}-antd-form-item`}
      name={itemConfig?.fieldName}
      label={itemConfig?.label?.[getLangKey()]}
      required={itemConfig?.required}
      rules={rules}
      dependencies={itemConfig?.dependencies}
      tooltip={itemConfig?.tooltip?.[getLangKey()]}
    >
      <DynamicAssetInput
        mode={mode}
        key={itemConfig?.fieldName}
        form={form}
        itemConfig={itemConfig}
        disabled={disabled}
        externalFormStates={externalFormStates}
      />
    </Form.Item>
  );
};

export default DynamicAssetFormItem;
