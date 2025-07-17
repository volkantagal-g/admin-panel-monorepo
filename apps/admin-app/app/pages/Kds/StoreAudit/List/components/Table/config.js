import moment from 'moment';
import { Tag } from 'antd';

import { t, getLangKey } from '@shared/i18n';
import { AuditStatusColorsMap, StoreAuditStatuses } from '@app/pages/Kds/constant';
import { DetailButton } from '@shared/components/UI/List';

export const getTableColumns = () => {
  return [
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '150px',
      render: status => <Tag color={AuditStatusColorsMap[status]}>{StoreAuditStatuses[status]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: '100px',
      render: warehouse => warehouse?.name,
    },
    {
      title: t('FRANCHISE'),
      dataIndex: 'franchise',
      key: 'franchise',
      width: '100px',
      render: franchise => franchise?.name,
    },
    {
      title: t('storeAuditPage:LIST.AUDIT_FORM_TYPE'),
      dataIndex: 'auditFormType',
      key: 'auditFormType',
      width: '150px',
      render: (id, row) => {
        return row?.auditFormType?.map(auditForm => (
          <Tag key={auditForm._id}>
            {auditForm?.name[getLangKey()]}
          </Tag>
        ));
      },
    },
    {
      title: t('storeAuditPage:LIST.AUDITOR'),
      dataIndex: 'auditor',
      key: 'auditor',
      width: '100px',
      render: auditor => auditor?.name,
    },
    {
      title: t('storeAuditPage:LIST.AUDIT_DATE'),
      dataIndex: 'auditDate',
      key: 'auditDate',
      width: '100px',
      render: auditDate => moment(auditDate).format('DD MMMM YYYY'),
    },
    {
      title: t('storeAuditPage:LIST.COMPLETION_DATE'),
      dataIndex: 'completionDate',
      key: 'completionDate',
      width: '100px',
      render: completionDate => (completionDate ? moment(completionDate).format('DD MMMM YYYY') : '-'),
    },
    {
      title: t('storeAuditPage:LIST.SENT_TO_FRANCHISE_DATE'),
      dataIndex: 'sentToFranchiseDate',
      key: 'sentToFranchiseDate',
      width: '100px',
      render: sentToFranchiseDate => (sentToFranchiseDate ? moment(sentToFranchiseDate).format('DD MMMM YYYY') : '-'),
    },
    {
      title: t('storeAuditPage:ROUND_NUMBER'),
      dataIndex: 'round',
      key: 'round',
      width: '50px',
      render: round => round ?? '-',
    },
    {
      title: t('ACTION'),
      align: 'right',
      key: 'id',
      width: '100px',
      render: row => {
        const urlPath = '/kds/storeAudit/detail/';
        return DetailButton({ _id: row.id, urlPath });
      },
    },
  ];
};
