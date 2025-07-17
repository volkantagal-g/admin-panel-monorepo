import { Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { ddsObjectionStatuses } from '@shared/shared/constantValues';
import { DDS_OBJECTION_STATUSES } from '@shared/shared/constants';

const StatusCard = ({ status }) => {
  if (status === DDS_OBJECTION_STATUSES.WAITING) {
    return <Tag color="yellow">{ddsObjectionStatuses[DDS_OBJECTION_STATUSES.WAITING][getLangKey()]}</Tag>;
  } if (status === DDS_OBJECTION_STATUSES.ACCEPTED) {
    return <Tag color="green">{ddsObjectionStatuses[DDS_OBJECTION_STATUSES.ACCEPTED][getLangKey()]}</Tag>;
  } if (status === DDS_OBJECTION_STATUSES.DENIED) {
    return <Tag color="red">{ddsObjectionStatuses[DDS_OBJECTION_STATUSES.DENIED][getLangKey()]}</Tag>;
  }
  return null;
};

export default StatusCard;
