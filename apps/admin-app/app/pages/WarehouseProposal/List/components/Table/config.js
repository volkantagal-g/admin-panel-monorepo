import { Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { t, getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { getLocalDateTimeFormat, numberFormat } from '@shared/utils/localization';
import { currencyFormat } from '@app/pages/FranchiseEarnings/List/utils';
import { warehouseProposalStatuses } from '@shared/shared/constantValues';

export const tableColumns = [
  {
    title: t('warehouseProposalPage:PROPOSAL_NAME'),
    dataIndex: 'proposalName',
    key: 'proposalName',
    width: 150,
    render: proposalName => {
      return proposalName;
    },
  },
  {
    title: t('warehouseProposalPage:PROPOSAL_DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: createdAt => {
      return (
        moment(createdAt).format(`${getLocalDateTimeFormat()}`)
      );
    },
  },
  {
    title: t('global:CITY'),
    dataIndex: 'property',
    key: 'property.city',
    width: 200,
    render: (property = {}) => {
      return property?.city?.name;
    },
  },
  {
    title: t('global:DISTRICT'),
    dataIndex: 'property',
    key: 'property.district',
    width: 200,
    render: (property = {}) => {
      return property?.district?.name;
    },
  },
  {
    title: t('warehouseProposalPage:TOTAL_NET_SQUARE_METER'),
    dataIndex: 'property',
    key: 'property.netTotalSize',
    width: 200,
    sorter: () => null,
    render: (property = {}) => {
      return numberFormat().format(property?.netTotalSize || 0);
    },
  },
  {
    title: t('global:RENT'),
    dataIndex: 'property',
    key: 'property.rent',
    width: 200,
    sorter: () => null,
    render: (property = {}) => {
      return currencyFormat().format(property?.rent || 0);
    },
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: status => {
      return warehouseProposalStatuses[status][getLangKey()];
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    key: 'detailButton',
    render: record => {
      const path = ROUTE.WAREHOUSE_PROPOSAL_DETAIL.path.replace(':id', record._id);
      return (
        <Button type="default" size="small">
          <Link to={path}>
            {t('global:DETAIL')}
          </Link>
        </Button>
      );
    },
  },
];
