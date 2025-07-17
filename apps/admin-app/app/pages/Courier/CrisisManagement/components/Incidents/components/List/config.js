import { Button, Popconfirm } from 'antd';
import moment from 'moment';

import { crisisMgmtTopicMap } from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = ({ t, Can, onEdit, onDelete, onLogs, classes }) => [
  {
    title: t('CRISIS_MGMT.CARD_NO'),
    dataIndex: 'cardNumber',
    width: 80,
  },
  {
    title: t('global:DATE'),
    dataIndex: 'incidentDate',
    width: 150,
    render: incidentDate => moment(incidentDate).format(getLocalDateTimeFormat()),
  },
  {
    title: t('CRISIS_MGMT.RECORDED_PERSON'),
    dataIndex: ['createdBy', 'name'],
    width: 200,
  },
  {
    title: t('CRISIS_MGMT.TOPIC'),
    dataIndex: 'topic',
    width: 250,
    render: topicCode => crisisMgmtTopicMap[topicCode],
  },
  {
    title: t('CRISIS_MGMT.NOTES'),
    dataIndex: 'note',
    width: 250,
  },
  {
    title: t('ACTION'),
    dataIndex: '_id',
    width: 180,
    fixed: 'right',
    align: 'right',
    render: (id, row) => {
      return (
        <div
          className={classes.actions}
          data-testid={`crisis-${row._id}-actions`}
        >
          <Button
            size="small"
            type="default"
            variant="contained"
            onClick={() => onLogs(row)}
            data-testid={`crisis-${row._id}-logs`}
          >
            {t('CRISIS_MGMT.LOGS')}
          </Button>

          <Can key="updateCourierCrisis" permKey={permKey.PAGE_COURIER_DETAIL_CRISIS_MGMT_CREATE}>
            <Button
              size="small"
              type="default"
              variant="contained"
              onClick={() => onEdit(row)}
              data-testid={`crisis-${row._id}-update`}
            >
              {t('EDIT')}
            </Button>
          </Can>

          <Can key="deleteCourierCrisis" permKey={permKey.PAGE_COURIER_DETAIL_CRISIS_MGMT_DELETE}>
            <Popconfirm
              okText={t('YES')}
              cancelText={t('NO')}
              onConfirm={() => onDelete(row)}
              title={t('CRISIS_MGMT.DELETE_CONFIFM')}
            >
              <Button
                id={id}
                size="small"
                type="default"
                variant="contained"
                data-testid={`crisis-${row._id}-delete`}
              >
                {t('DELETE')}
              </Button>
            </Popconfirm>

          </Can>
        </div>

      );
    },
  },
];
