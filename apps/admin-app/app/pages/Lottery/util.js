import _ from 'lodash';
import { Button, Space } from 'antd';

import { promoDomainTypes } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';

export const getDomainTypeOptions = () => {
  return Object.entries(promoDomainTypes).map(([key, value]) => {
    return {
      value: _.toString(key),
      label: value[getLangKey()],
    };
  });
};

// To-do: Convert this into a hook and also keep its own state, refactor out shared logic
export const getSubmitButtons = (
  isDetail = false,
  isEditing = false,
  setIsEditing = () => {},
  submitButtonText = 'submit',
  cancelButtonText = 'cancel',
  isLoading = false,
  isError = false,
) => (
  (isDetail && !isEditing && !isError) ? (
    <Button type="primary" onClick={() => setIsEditing(true)}>
      {submitButtonText}
    </Button>
  ) : (
    <Space>
      {isDetail && (
      <Button type="secondary" onClick={() => setIsEditing(false)}>
        {cancelButtonText}
      </Button>
      )}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {submitButtonText}
      </Button>
    </Space>
  )
);
