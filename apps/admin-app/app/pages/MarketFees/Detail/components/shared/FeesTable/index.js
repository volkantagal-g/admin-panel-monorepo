import { useEffect, useState } from 'react';
import { Row, Col, Button, Typography, Space, Form } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Card } from '@shared/components/GUI/Card';
import { getTableColumns } from './components/config';
import { EditableCell } from './components/EditableCell';
import { Table } from '@shared/components/GUI';
import { feeArrayValidation } from '../formHelpers';

const { Title } = Typography;

function FeesTable({
  value: initialFees,
  setFieldValue,
  disabled,
  title,
  feeType,
  orderFeeType,
  errors,
}) {
  const { t } = useTranslation('feeDetailsPage');

  const [editingRowId, setEditingRowId] = useState(null);
  const [fees, setFees] = useState(initialFees);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEmpty(initialFees)) {
      setFees(
        initialFees.map((fee, index) => ({
          ...fee,
          key: `${feeType}-${index}`,
        })),
      );
    }
  }, [initialFees, feeType]);

  const isOnlyRow = fees && fees.length !== 1;

  const addRow = () => {
    let newFees;
    if (!fees || !fees.length) {
      const fee = { min: 0, fee: undefined, key: `${feeType}-0` };
      newFees = [fee];
    }
    else {
      newFees = [...fees];
      const key = `${feeType}-${fees.length}`;
      newFees.push({
        min: undefined,
        fee: 0,
        key,
      });
    }
    setFees(newFees);
    setFieldValue([orderFeeType, feeType], newFees);
  };

  const updateRow = key => {
    let row = {};
    const [, rowIndex] = key.split('-');

    const subSchema = feeArrayValidation({ t, required: true });

    try {
      subSchema.validateSync(initialFees, { abortEarly: false });
      row = initialFees[rowIndex];
    }
    catch (err) {
      const rowErrors = err.inner.filter(e => {
        const errorPath = e.path || (e.params && e.params.path);
        return errorPath && errorPath.includes(`[${rowIndex}]`);
      });
      if (rowErrors.length > 0) return;
      row = initialFees[rowIndex];
    }

    const newData = [...fees];
    const index = newData.findIndex(item => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
    }
    else {
      newData.push(row);
    }
    setFees(newData);
    setEditingRowId(null);
    setFieldValue([orderFeeType, feeType], newData);
  };

  const removeRow = rowId => {
    let newFees = fees.filter(row => row.key !== rowId);
    if (newFees.length === 0) {
      newFees = undefined;
    }
    setFees(newFees);
    setFieldValue([orderFeeType, feeType], newFees);
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
        disabled: record.key?.[record.key.length - 1] === '0' && col.dataIndex === 'min' && record.min === 0,
        fees,
        editRow,
        editingRowId,
        errors,
        feeType,
        orderFeeType,
        setFieldValue,
      }),
    };
  });

  const isDisabled = fees?.length >= 5;

  return (
    <Card
      title={<Title level={5}>{title}</Title>}
      extra={
        !disabled && (
          <Space align="center">
            <Button onClick={addRow} disabled={isDisabled}>
              Add Fee
            </Button>
          </Space>
        )
      }
    >
      <div>
        <Row>
          <Col span={24}>
            <Form form={form} component={false}>
              <Table
                className="w-100"
                size="small"
                scroll={{ y: 200 }}
                data={fees}
                columns={mergedColumns}
                components={{ body: { cell: EditableCell } }}
              />
            </Form>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default FeesTable;
