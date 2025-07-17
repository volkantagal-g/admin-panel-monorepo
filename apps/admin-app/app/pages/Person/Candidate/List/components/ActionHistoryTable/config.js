import moment from 'moment';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { personCandidateActionHistoryTypes } from '@shared/shared/constantValues';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { CANDIDATE_FORM_STATUSES } from '../../constants';

export const _getTableColumns = t => {
  return [
    {
      title: t('COLUMNS.HISTORY_TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: '120px',
      render: historyType => get(personCandidateActionHistoryTypes, [historyType, getLangKey()], '-'),
    },
    {
      title: t('COLUMNS.HISTORY_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: status => get(CANDIDATE_FORM_STATUSES, [status, getLangKey()], '-'),
    },
    {
      title: t('COLUMNS.ASSIGNEE'),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      width: '120px',
      render: responsiblePerson => get(responsiblePerson, 'fullName', '-'),
    },
    {
      title: t('COLUMNS.HISTORY_PERFORMER'),
      dataIndex: 'performer',
      key: 'performer',
      width: '120px',
      render: performer => get(performer, 'fullName', '-'),
    },
    {
      title: t('COLUMNS.HISTORY_DATE'),
      dataIndex: 'date',
      key: 'date',
      width: '150px',
      render: date => (
        moment(date).format(getLocalDateTimeFormat())
      ),
    },
  ];
};
