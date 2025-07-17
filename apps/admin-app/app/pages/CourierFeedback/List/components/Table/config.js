import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { domainTypes } from '@shared/shared/constantValues';

export const getTableColumns = ({ t, langKey, courierDetails }) => {
  let baseColumns = [
    {
      title: t('COURIER_NAME'),
      render: row => <Link to={ROUTE.COURIER_DETAIL.path.replace(':id', row.courier.id)}>{row.courier.name}</Link>,
    },
    {
      title: t('courierFeedbackPage:FEEDBACK_TYPE'),
      dataIndex: 'feedbackType',
    },
    {
      title: t('DOMAIN_TYPE'),
      dataIndex: 'domainType',
      render: domainType => <span>{domainType && domainTypes[domainType][langKey]}</span>,
    },
    {
      title: t('WAREHOUSE'),
      render: row => <span>{row.warehouse.name}</span>,
    },
  ];

  if (courierDetails) {
    baseColumns = baseColumns.filter(baseColumn => baseColumn.title !== t('COURIER_NAME'));
  }
  return baseColumns;
};

export const getInnerTableColumns = ({ t }) => {
  return [
    {
      title: t('courierFeedbackPage:OPTION'),
      dataIndex: 'option',
    },
    {
      title: t('courierFeedbackPage:COMMENT'),
      dataIndex: 'comment',
    },
  ];
};
