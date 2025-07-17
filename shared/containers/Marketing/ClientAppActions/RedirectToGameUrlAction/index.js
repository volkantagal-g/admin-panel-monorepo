import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const RedirectToGameUrlAction = ({ parrentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');

  return (
    <Form.Item
      name={[...parrentFieldName, 'url']}
      label={t('REDIRECT_GAME_URL_TYPE')}
      className="d-inline"
      rules={[{ required: true, message: t('error:REQUIRED') },
        {
          message: t('GAME_URL_CHECK'),
          validator: (_, value) => {
            // Resolve if url includes playable string
            if (!value?.includes('playable')) {
              return Promise.reject(new Error());
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Input
        type="url"
        disabled={disabled}
        placeholder={t('REDIRECT_GAME_URL_TYPE')}
      />
    </Form.Item>

  );
};

export default RedirectToGameUrlAction;
