import { getLangKey, t } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { DetailButton } from '@shared/components/UI/List';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { locationWriteOffStatuses } from '@shared/shared/constantValues';

export const tableColumns = () => [
  {
    title: t('writeOffPage:REQUEST_ID'),
    key: 'requestId',
    dataIndex: '_id',
    render: id => <CopyToClipboard message={id} />,
    width: 200,
  },
  {
    title: t('global:CREATION_DATE'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: creationDate => formatDate(creationDate),
    width: 150,
  },
  {
    title: t('global:WAREHOUSE'),
    key: 'warehouseName',
    dataIndex: 'warehouseName',
    render: warehouse => <CopyToClipboard message={warehouse} />,
    width: 200,
  },
  {
    title: t('global:LOCATION'),
    key: 'warehouseLocationName',
    dataIndex: 'warehouseLocationName',
    render: location => <CopyToClipboard message={location} />,
    width: 200,
  },
  {
    title: t('writeOffPage:CREATED_BY'),
    key: 'createdByName',
    dataIndex: 'createdByName',
    render: createdBy => (createdBy ? <CopyToClipboard message={createdBy} /> : '-'),
    width: 200,
  },
  {
    title: t('global:STATUS'),
    key: 'status',
    dataIndex: 'status',
    render: status => locationWriteOffStatuses[status][getLangKey()],
    width: 100,
  },
  {
    title: t('writeOffPage:APPROVED_BY'),
    key: 'approvedByName',
    dataIndex: 'approvedByName',
    render: approvedByName => (approvedByName ? <CopyToClipboard message={approvedByName} /> : '-'),
    width: 200,
  },
  {
    title: t('global:APPROVED_DATE'),
    key: 'approvedAt',
    dataIndex: 'approvedAt',
    render: approvalDate => (approvalDate ? formatDate(approvalDate) : '-'),
    width: 150,
  },
  {
    title: '',
    key: '_id',
    width: '10%',
    render: obj => {
      return DetailButton({
        _id: obj._id,
        urlPath: '/writeOff/location/detail/',
      });
    },
  },
];
