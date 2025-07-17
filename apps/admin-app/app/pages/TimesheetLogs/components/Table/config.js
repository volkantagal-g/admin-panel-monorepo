import { Button } from 'antd';
import moment from 'moment';

export const getTableColumns = ({ t, warehouses, onHandleDetails }) => {
  return [
    {
      title: t('TABLE.HEADER.ACTION'),
      dataIndex: 'operation',
      key: 'operation',
    },
    {
      title: t('TABLE.HEADER.WHEN'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => moment(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: t('TABLE.HEADER.WHAT'),
      render: rowData => {
        const date = rowData?.data?.date ? moment(rowData.data.date).format('DD MMM, YYYY') : '?';
        const warehouseId = rowData?.data?.warehouseId || rowData?.data?.newData?.warehouseId;
        const warehouse = warehouses[warehouseId] || '?';

        return `${date} / ${warehouse}`;
      },
    },
    {
      title: t('TABLE.HEADER.EMPLOYEE_TYPE'),
      render: rowData => (rowData?.data?.employeeType ? t(`EMPLOYEE_TYPE.${rowData.data.employeeType}`) : '?'),
    },
    {
      title: t('TABLE.HEADER.USERNAME'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: createdBy => createdBy?.name || '?',
    },
    {
      title: t('TABLE.HEADER.DETAILS'),
      render: rowData => {
        if (rowData.operation !== 'bulk-update-timesheets') {
          return null;
        }

        return (
          <Button name="details" onClick={() => onHandleDetails(rowData)} size="small">
            {t('TABLE.HEADER.DETAILS')}
          </Button>
        );
      },
    },
  ];
};
