import { getLangKey } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { convertStringFromCamelCaseToUpperCase } from '../../utils';

export const tableColumns = (t, renderActionButtons) => [
  {
    title: t('ANNOUNCEMENT_TYPE'),
    key: 'announcementType',
    dataIndex: 'announcementType',
    render: announcementType => (announcementType ? t(`${convertStringFromCamelCaseToUpperCase(announcementType)}`) : '-'),
    width: 150,
  },
  {
    title: t('TITLE'),
    dataIndex: 'title',
    key: 'title',
    render: title => title?.[getLangKey()] || title?.native,
    width: 150,
  },
  {
    title: t('CREATED_BY'),
    key: 'createdBy',
    dataIndex: 'createdBy',
    render: createdBy => (createdBy ? <CopyToClipboard message={createdBy} /> : '-'),
    width: 200,
  },
  {
    title: t('START_DATE'),
    key: 'startDate',
    render: ({ startDate, createdAt }) => (startDate ? formatDate(startDate) : formatDate(createdAt)),
    width: 100,
  },
  {
    title: t('ACTIVE'),
    key: 'isActive',
    dataIndex: 'active',
    render: isActive => (isActive ? t('YES') : t('NO')),
    width: 60,
  },
  {
    title: <b>{t('ACTION')}</b>,
    dataIndex: '_id',
    key: 'detail',
    align: 'center',
    width: 150,
    render: (id, record) => renderActionButtons(id, record),
  },
];
