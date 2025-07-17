import { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button, Typography, Space, Form, Card } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getTableColumns } from '../config';
import { EditableCell } from '../EditableCell';
import AntTableV2 from '@shared/components/UI/AntTableV2';

function FeesTable({ value: initialFees, setFieldValue, disabled, domainType, title, feeType, orderFeeType }) {
  const [editingRowId, setEditingRowId] = useState(null);
  const [fees, setFees] = useState([]);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const calculateFees = useCallback(() => {
    if (isEmpty(initialFees)) {
      setFees([]);
      return;
    }
    const newFees = initialFees.map((fee, index) => ({ ...fee, key: `${orderFeeType}-${feeType}-${index + 1}` }));
    setFees(newFees);
  }, [feeType, initialFees, orderFeeType]);

  const isOnlyRow = fees && fees.length !== 1;

  useEffect(() => {
    calculateFees();
  }, [calculateFees]);

  const addRow = () => {
    if (!fees || !fees.length) {
      const fee = { min: 0, fee: undefined, key: `${orderFeeType}-${feeType}-1` };
      setFees([fee]);
      setFieldValue([domainType, orderFeeType, feeType], [fee]);
    }
    else {
      const newFees = [...fees];
      const key = `${orderFeeType}-${feeType}-${fees.length}`;

      newFees.push({ key });
      setFees(newFees);
      setFieldValue([domainType, orderFeeType, feeType], newFees);
    }
  };

  const updateRow = async key => {
    const row = await form.validateFields();

    const newData = [...fees];
    const index = newData.findIndex(item => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setFees(newData);
      setEditingRowId(null);
    }
    else {
      newData.push(row);
      setFees(newData);
      setEditingRowId(null);
    }
    setFieldValue([domainType, orderFeeType, feeType], newData);
  };

  const removeRow = rowId => {
    const newFees = fees.filter(row => row.key !== rowId);
    setFees(newFees);
    setFieldValue([domainType, orderFeeType, feeType], newFees);
  };

  const editRow = record => {
    form.setFieldsValue({ min: undefined, fee: undefined, ...record });
    setEditingRowId(record.key);
  };

  const mergedColumns = getTableColumns({
    editingRowId,
    editRow,
    removeRow,
    updateRow,
    disabled,
    isOnlyRow,
  }).map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record.key === editingRowId,
        fees,
      }),
    };
  });

  return (
    <Card
      title={<Typography>{title}</Typography>}
      extra={
        !disabled && (
          <Space align="center">
            <Button onClick={addRow}>{t('warehousePage:ADD_FEE')}</Button>
          </Space>
        )
      }
    >
      <div>
        <Row>
          <Col span={24}>
            <Form form={form} component={false}>
              <AntTableV2 data={fees} columns={mergedColumns} components={{ body: { cell: EditableCell } }} />
            </Form>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default FeesTable;
