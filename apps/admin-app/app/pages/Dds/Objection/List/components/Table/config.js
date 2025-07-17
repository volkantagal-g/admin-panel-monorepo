import { get } from 'lodash';
import moment from 'moment';

import { usePermission } from '@shared/hooks';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { DetailButton } from '@shared/components/UI/List';
import { t, getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { ddsObjectionStatuses } from '@shared/shared/constantValues';
import { DDS_OBJECTION_STATUSES } from '@shared/shared/constants';

export const _getTableColumns = () => {
  const { Can } = usePermission();

  return [
    {
      title: t('global:WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: '120px',
      render: warehouse => {
        return get(warehouse, 'name', '-');
      },
    },
    {
      title: t('global:FRANCHISE'),
      dataIndex: 'franchise',
      key: 'franchise',
      width: '120px',
      render: franchise => {
        return get(franchise, 'name', '-');
      },
    },
    {
      title: t('global:CRITERIA'),
      dataIndex: 'criteria',
      key: 'criteria',
      width: '120px',
      render: criteria => {
        return get(criteria, ['name', getLangKey()], '-');
      },
    },
    {
      title: t('global:REQUEST_DATE'),
      dataIndex: 'recordDate',
      key: 'recordDate',
      width: '120px',
      render: recordDate => (
        moment(recordDate).format(getLocalDateTimeFormat())
      ),
    },
    {
      title: t('global:STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: status => (
        get(ddsObjectionStatuses, [status, getLangKey()], '-')
      ),
    },
    {
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: '120px',
      render: (_id, _row) => {
        const urlPath = `/dds/objection/detail/`;
        const status = get(_row, 'status');

        if (status === DDS_OBJECTION_STATUSES.WAITING) {
          return (
            <Can permKey={permKey.PAGE_DDS_OBJECTION_DETAIL}>
              {
                DetailButton({
                  _id,
                  urlPath,
                })
              }
            </Can>
          );
        }
        return null;
      },
    },
  ];
};
