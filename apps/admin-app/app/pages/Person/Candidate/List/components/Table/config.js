import { get } from 'lodash';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import { personCandidateWorkerTypes } from '@shared/shared/constantValues';
import { PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { createMap } from '@shared/utils/common';
import { renderTableButtons } from '../../utils';
import { CANDIDATE_FORM_STATUSES } from '../../constants';
import useStyles from './styles';

export const _getTableColumns = ({ franchises, handleAssignClick, handleLogHistoryClick, isPending, t, warehousesMap }) => {
  const classes = useStyles();

  const { Can } = usePermission();

  const franchisesMap = createMap(franchises);

  return [
    {
      title: t('global:FRANCHISE'),
      dataIndex: 'franchise',
      key: 'franchise',
      width: '120px',
      render: franchise => get(franchisesMap, [franchise, 'name'], '-'),
    },
    {
      title: t('global:WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: '120px',
      render: warehouseId => warehousesMap?.[warehouseId]?.name,
    },
    {
      title: t('COLUMNS.PERSON_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '120px',
      render: (_name, _row) => (
        <>
          {get(_row, 'name', '-')} {get(_row, 'lastName', '-')}
        </>
      ),
    },
    {
      title: t('COLUMNS.EMPLOYEE_TYPE'),
      dataIndex: 'workerType',
      key: 'workerType',
      width: '120px',
      render: workerType => get(personCandidateWorkerTypes, [workerType, getLangKey()], '-'),
    },
    {
      title: t('COLUMNS.REQUEST_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '150px',
      render: createdAt => moment(createdAt).format(getLocalDateTimeFormat()),
    },
    {
      title: t('COLUMNS.REQUEST_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '180px',
      render: (status, _row) => {
        const dateAndTime = moment(get(_row, ['updatedAt'])).format(getLocalDateTimeFormat());

        return (
          <>
            <span>{get(CANDIDATE_FORM_STATUSES, [status, getLangKey()], '-')}</span>
            {PERSON_CANDIDATE_FORM_STATUSES.APPROVED === status && <span className={classes.dateAndTime}>({dateAndTime})</span>}
          </>
        );
      },
    },
    {
      title: t('COLUMNS.ASSIGNEE'),
      dataIndex: 'assignee',
      key: 'assignee',
      width: '120px',
      render: assignee => get(assignee, 'fullName', '-'),
    },
    {
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: '270px',
      render: (_id, _row) => {
        const urlPath = '/person/candidate/detail/';
        const status = get(_row, 'status');
        const rejectDescription = get(_row, 'description', '');
        const view = renderTableButtons({
          t,
          classes,
          candidate: _row,
          status,
          rejectDescription,
          urlPath,
          handleLogHistoryClick,
          handleAssignClick,
          isPending,
        });
        return (
          <Can permKey={permKey.PAGE_PERSON_CANDIDATE_DETAIL}>
            { view }
          </Can>
        );
      },
    },
  ];
};
