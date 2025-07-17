import { get } from 'lodash';
import { InputNumber, Form } from 'antd';

export const EditableCell = ({
  editing,
  dataIndex,
  record,
  children,
  fees,
  disabled,
  errors,
  feeType,
  orderFeeType,
  setFieldValue,
  ...restProps
}) => {
  const [group, rowIndex] = record && record.key ? record.key.split('-') : [];
  const fullPath = `${orderFeeType}.${group}[${rowIndex}].${dataIndex}`;
  const cellError = get(errors, fullPath);

  return (
    <td {...restProps} data-testid="editable-cell">
      {editing ? (
        <Form.Item
          name={dataIndex}
          validateStatus={cellError ? 'error' : ''}
          help={errors ? cellError : undefined}
          validateTrigger={['onChange', 'onBlur']}
        >
          <InputNumber
            onChange={value => {
              setFieldValue(fullPath, value);
            }}
            disabled={disabled}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
