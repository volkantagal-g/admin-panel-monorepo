import moment from 'moment';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { DetailButton } from '@shared/components/UI/List';
import permKey from '@shared/shared/permKey.json';
import { CREATE_DATE_TEXT_OPTIONS } from '@app/pages/FranchiseBillManagement/List/constants';

export const tableColumns = (t, Can) => [
  {
    title: t('CREATE_DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '100px',
    render: createdAt => new Date(createdAt).toLocaleString('tr-TR', CREATE_DATE_TEXT_OPTIONS) || '-',
  },
  {
    title: t('FRANCHISE'),
    dataIndex: 'franchise',
    key: 'franchise',
    width: '120px',
    render: franchise => franchise || '-',
  },
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouse',
    key: 'warehouse',
    width: '120px',
    render: warehouse => warehouse || '-',
  },
  {
    title: t('LAST_READ_DATE'),
    dataIndex: 'billDetails',
    key: 'lastReadDate',
    width: '120px',
    render: ({ lastReadDate }) => moment(lastReadDate).format(getLocalDateTimeFormat()),
  },
  {
    title: t('DAY_DIFF'),
    dataIndex: 'billDetails',
    key: 'day',
    width: '120px',
    render: ({ day }) => day || '-',
  },
  {
    title: t('NUMBER_OF_DAYS'),
    dataIndex: 'billDetails',
    key: 'numberOfDays',
    width: '60px',
    render: ({ numberOfDays }) => numberOfDays || '-',
  },
  {
    title: t('TOTAL_CONSUMPTION'),
    dataIndex: 'billDetails',
    key: 'totalConsumption',
    width: '120px',
    render: ({ totalConsumption }) => totalConsumption || '-',
  },
  {
    title: t('TOTAL_AMOUNT'),
    dataIndex: 'billDetails',
    key: 'totalAmount',
    width: '120px',
    render: ({ amountPaid }) => amountPaid || '-',
  },
  {
    dataIndex: '_id',
    key: '_id',
    align: 'right',
    width: '120px',
    render: _id => {
      const urlPath = '/franchiseBillManagement/detail/';

      return (
        <Can permKey={permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_DETAIL}>
          {
            DetailButton({
              _id,
              urlPath,
            })
          }
        </Can>
      );
    },
  },
];
