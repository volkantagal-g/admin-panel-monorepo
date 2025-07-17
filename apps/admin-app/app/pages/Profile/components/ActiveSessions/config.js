import moment from 'moment';
import { Typography } from 'antd';

import { getLocalDateTimeFormat } from '@shared/utils/localization';

const { Text } = Typography;
const NOW_TOLERANCE_SECONDS = 30;

const formatDuration = ({ parsedDate, prefix, t }) => {
  const durationSeconds = moment.duration(moment().diff(parsedDate)).asSeconds();
  if (durationSeconds <= NOW_TOLERANCE_SECONDS) return t(`${prefix}.NOW`);
  return parsedDate.fromNow();
};

const LOGIN_TYPE = {
  GOOGLE_AUTH: 'Google Login',
  MAGIC_LINK: 'Magic Link',
};

export const getColumns = ({ t, prefix }) => [
  {
    title: t(`${prefix}.LAST_SEEN`),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: (a, b) => moment(a.updatedAt).diff(moment(b.updatedAt)),
    defaultSortOrder: 'descend',
    render: date => {
      const parsedDate = moment(date);
      const formattedDate = parsedDate.format(getLocalDateTimeFormat());
      return (
        <Text
          title={formattedDate}
        >{formatDuration({ parsedDate, prefix, t })}
        </Text>
      );
    },
  },
  {
    title: t(`${prefix}.LOGGED_ON`),
    dataIndex: 'createdAt',
    sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    key: 'createdAt',
    render: (date, record) => {
      return `${moment(date).format(getLocalDateTimeFormat())} (${LOGIN_TYPE[record.issuer]})`;
    },
  },
  {
    title: t(`${prefix}.BROWSER`),
    dataIndex: 'browserAndOs',
    key: 'browserAndOs',
  },
];
