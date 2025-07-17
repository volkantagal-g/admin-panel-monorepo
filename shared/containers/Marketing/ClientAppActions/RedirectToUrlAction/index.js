import { Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

const RedirectToUrlAction = ({ parrentFieldName, disabled, form }) => {
  const { t } = useTranslation('marketing');

  const [hasTokenCheck, setHasTokenCheck] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [hasTokenCheck, form]);

  const onCheckboxChange = e => {
    setHasTokenCheck(e.target.checked);
    form.validateFields([[...parrentFieldName, 'url']]);
  };

  return (
    <>
      <Form.Item
        name={[...parrentFieldName, 'url']}
        label={t('REDIRECT_URL_TYPE')}
        className="d-inline"
        rules={[{ required: true, message: t('error:REQUIRED') },
          {
            message: t('TOKEN_KEY_MISSING'),
            validator: (_, value) => {
              // Resolve if url includes token= string
              if (hasTokenCheck) {
                if (!value?.includes('token=')) {
                  return Promise.reject(new Error());
                }
              }
              return Promise.resolve();
            },
          }]}
      >
        <Input disabled={disabled} placeholder={`${t('REDIRECT_URL_TYPE')}`} />
      </Form.Item>

      <div className="mt-4">
        <Form.Item
          valuePropName="checked"
          labelCol={24}
          name={[...parrentFieldName, 'replaceToken']}
          label={t('REPLACE_TOKEN')}
          labelAlign="left"
        >
          <Checkbox disabled={disabled} placeholder={`${t('REPLACE_TOKEN')}`} onChange={onCheckboxChange} />
        </Form.Item>
      </div>
    </>

  );
};

export default RedirectToUrlAction;
