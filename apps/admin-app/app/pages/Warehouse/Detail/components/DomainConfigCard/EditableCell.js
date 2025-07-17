import { InputNumber, Form } from 'antd';
import { useTranslation } from 'react-i18next';

export const EditableCell = ({ editing, dataIndex, record, children, fees, ...restProps }) => {
  const { t } = useTranslation();

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              validator: async (_, value) => {
                if (!value && value !== 0) {
                  return Promise.reject(t('error:REQUIRED'));
                }
                if (value < 0) {
                  return Promise.reject(t('error:MIN_ZERO'));
                }
                if (dataIndex === 'min') {
                  const some = fees.some(fee => {
                    return fee.min === value && fee.key !== record.key;
                  });
                  return some ? Promise.reject(t('error:DIFFERENT_VALUE')) : true;
                }
                return true;
              },
            },
          ]}
        >
          <InputNumber disabled={record.min === 0 && dataIndex === 'min'} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
