import { Checkbox, Form, InputNumber } from 'antd';
import { useContext, useEffect } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { EditableContext } from './TransactionsTable';
import { CurrencyType, EventType } from '.';

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof EventType;
  record: EventType;
  handleSave: (record: EventType) => void;
  inputType: string;
  currency?: CurrencyType;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  currency,
  ...restProps
}) => {
  const form = useContext(EditableContext)!;
  // set initial values
  useEffect(() => {
    if (form && record && dataIndex) {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  }, [form, record, dataIndex]);

  const handleAmountChange = async (value: number) => {
    try {
      const values = await form.validateFields();
      form.setFieldsValue({ amount: value });
      handleSave({ ...record, ...values });
    }
    catch (errInfo) {
      throw new Error();
    }
  };

  const fullRefund = async (e: CheckboxChangeEvent) => {
    try {
      if (e.target.checked) {
        await form.setFieldsValue({ amount: record.balance });
      }
      await form.setFieldsValue({ fullRefund: e.target.checked });
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    }
    catch (errInfo) {
      throw new Error();
    }
  };

  let childNode = children;

  if (editable) {
    if (inputType === 'checkbox') {
      childNode = (
        <Form.Item
          name={dataIndex}
          valuePropName="checked"
          className="m-0"
        >
          <Checkbox onChange={(e: CheckboxChangeEvent) => fullRefund(e)} />
        </Form.Item>

      );
    }
    else {
      childNode = (
        <Form.Item
          name={dataIndex}
          className="m-0"
          rules={[
            {
              type: 'number',
              min: 0,
              max: record.balance,
              message: 'Amount have to be between 0 and Balance Amount',
            },
          ]}
        >
          <InputNumber
            prefix={currency?.symbol}
            max={record.balance}
            min={0}
            disabled={record.fullRefund}
            onChange={handleAmountChange}
          />
        </Form.Item>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
