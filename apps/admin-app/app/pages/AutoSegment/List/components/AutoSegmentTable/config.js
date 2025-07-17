import moment from 'moment';
import { Button, Space } from 'antd';

import { getLangKey } from '@shared/i18n';
import { autoSegmentIntervalTypes, autoSegmentStatuses, autoSegmentTypes } from '@app/pages/AutoSegment/constantValues';
import { AUTO_SEGMENT_STATUS } from '@app/pages/AutoSegment/constants';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = ({ t, handleActivationOnClick, handleEditAutoSegmentOnClick, handleOnGetCountClick }) => [
  {
    title: t('SEGMENT'),
    dataIndex: 'segment',
    align: 'right',
    width: '6%',
  },
  {
    title: t('SEGMENT_NAME'),
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: t('DESCRIPTION'),
    dataIndex: 'description',
    width: '15%',
    render: description => <span>{description[getLangKey()]}</span>,
  },
  {
    title: t('SEGMENT_TYPE'),
    dataIndex: 'type',
    render: type => <span>{autoSegmentTypes[type][getLangKey()]}</span>,
  },
  {
    title: t('VERSION'),
    dataIndex: 'version',
    align: 'right',
    width: '5%',
  },
  {
    title: t('CLIENT_COUNT'),
    dataIndex: 'count',
    align: 'right',
    width: '6%',
    render: (count, { _id: autoSegmentId, segment }) => (
      count >= 0
        ? <span>{count}</span>
        : (
          <Button
            size="small"
            onClick={() => handleOnGetCountClick({ autoSegmentId, segment })}
          >
            {t('GET_CLIENT_COUNT')}
          </Button>
        )
    ),
  },
  {
    title: t('LAST_CALCULATION_DATE'),
    dataIndex: 'lastCalculationDate',
    render: lastCalculationDate => <span>{moment(lastCalculationDate).format(getLocalDateTimeFormat())}</span>,
  },
  {
    title: t('CREATED_AT'),
    dataIndex: 'createdAt',
    render: createdAt => <span>{moment(createdAt).format(getLocalDateTimeFormat())}</span>,
  },
  {
    title: t('INTERVAL'),
    key: 'interval',
    width: '6%',
    render: ({ interval, intervalType }) => <span>{interval} {autoSegmentIntervalTypes[intervalType][getLangKey()]}</span>,
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    width: '6%',
    render: status => <span>{autoSegmentStatuses[status][getLangKey()]}</span>,
  },
  {
    title: t('ACTIONS'),
    key: 'actions',
    render: autoSegment => {
      const { status, _id: id } = autoSegment;
      const isActive = status === AUTO_SEGMENT_STATUS.ACTIVE;
      return (
        <Space size={8}>
          <Button
            size="small"
            onClick={() => handleEditAutoSegmentOnClick(autoSegment)}
          >
            {t('EDIT')}
          </Button>
          <Button
            size="small"
            type={!isActive ? 'success' : 'primary'}
            danger={isActive}
            onClick={() => handleActivationOnClick({ isActive, id })}
          >
            { isActive ? t('DEACTIVATE') : t('ACTIVATE') }
          </Button>
        </Space>
      );
    },
  },
];
