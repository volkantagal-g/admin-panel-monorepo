import { Tag } from 'antd';

import { courierStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getStatusColorForList, calculateTimeSpent } from '@app/pages/CourierStatus/List/utils';
import { ALL_BUSY_OPTIONS, ALL_DOMAIN_OPTIONS } from '@app/pages/CourierStatus/List/constants';
import GetLabelByValueDomain from '@app/pages/CourierStatus/List/Component/dataTable/labelByDomain';
import GetLabelByValue from '@app/pages/CourierStatus/List/Component/dataTable/labelByValue';

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('courierStatusAndBusy:COURIER_ID'),
      dataIndex: '_id',
      width: '200px',
    },
    {
      title: t('courierStatusAndBusy:COURIER_NAME'),
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: t('courierStatusAndBusy:WAREHOUSE'),
      dataIndex: 'warehouse',
      width: '200px',
    },
    {
      title: t('courierStatusAndBusy:Time_SPENT_ON_LAST_STATUS_HRS'),
      dataIndex: 'lastOrderAt',
      width: '200px',
      render: lastOrderAt => <div>{calculateTimeSpent(t, lastOrderAt)}</div>,
    },
    {
      title: t('courierStatusAndBusy:DOMAIN'),
      dataIndex: 'domainTypes',
      width: '200px',
      render: domainTypes => <GetLabelByValueDomain optionsFunc={ALL_DOMAIN_OPTIONS} value={domainTypes} />,
    },
    {
      title: t('courierStatusAndBusy:STATUS'),
      dataIndex: 'status',
      width: '200px',
      render: status => <Tag color={getStatusColorForList(status)}>{courierStatuses[status]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('courierStatusAndBusy:BUSY_REASON'),
      dataIndex: 'lastBusyOption',
      width: '200px',
      render: lastBusyOption => <GetLabelByValue optionsFunc={ALL_BUSY_OPTIONS} value={lastBusyOption} />,
    },
  ];
};
