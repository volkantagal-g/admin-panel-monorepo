import { Input, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  value,
  ...restProps
}) => {
  const styles = useStyles();
  const { t } = useTranslation('marketFranchisePage');
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          className={styles.formItem}
          name="name"
          rules={[
            {
              min: 2,
              required: true,
              message: t('REQUIRED'),
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
