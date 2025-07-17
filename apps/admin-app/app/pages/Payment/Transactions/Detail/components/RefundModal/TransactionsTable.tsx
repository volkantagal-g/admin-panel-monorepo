import { Form, Table } from 'antd';
import React, { useEffect } from 'react';
import type { FormInstance } from 'antd/es/form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import EditableCell from './EditableCell';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { CurrencyType, EventType } from '.';
import PaymentProviderIcon from '@shared/components/UI/PaymentProviderIcon';
import { Creators } from '../../redux/actions';
import { refundTable } from '../../redux/selectors';
import { amountCurrencyFormat } from '@app/pages/Payment/utils';

export const EditableContext = React.createContext<FormInstance<any> | null>(
  null,
);

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface EditableRowProps {
  index: number;
}

type TransactionsTableProps = {
  events: EventType[];
  currency: CurrencyType;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const TransactionsTable = ({ events, currency }: TransactionsTableProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const refundTableData = useSelector(refundTable.getData);
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    inputType?: string;
  })[] = [
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.EVENT_ID'),
      dataIndex: 'eventId',
      align: 'center',
      width: 200,
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
      dataIndex: 'payment',
      align: 'center',
      width: 300,
      render: payment => {
        return (
          <div className="d-flex justify-content-center">
            <PaymentProviderIcon
              paymentProvider={payment?.provider}
              paymentMethod={payment?.method}
            />
          </div>
        );
      },
    },
    {
      title: t('paymentTransactionPage:BALANCE'),
      dataIndex: 'balance',
      align: 'center',
      render: balance => amountCurrencyFormat(balance, currency),
    },
    {
      title: t('paymentTransactionPage:AMOUNT_TO_BE_REFUNDED'),
      dataIndex: 'amount',
      editable: true,
      align: 'center',
    },
    {
      title: t('paymentTransactionPage:FULL_REFUND'),
      dataIndex: 'fullRefund',
      align: 'center',
      inputType: 'checkbox',
      editable: true,
    },
  ];

  useEffect(() => {
    dispatch(Creators.refundTable({ data: events }));
  }, [events, dispatch]);

  const handleSave = (row: EventType) => {
    const newData = [...refundTableData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch(Creators.refundTable({ data: newData }));
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: EventType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        currency,
        handleSave,
      }),
    };
  });

  return (
    <AntTableV2
      components={{ body: { cell: EditableCell, row: EditableRow } }}
      bordered
      dataSource={refundTableData}
      columns={columns as ColumnTypes}
    />
  );
};

export default TransactionsTable;
