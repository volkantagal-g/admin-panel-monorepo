import { Tag } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { DetailButton } from '@shared/components/UI/List';
import { personInformationChangeStatuses } from '@shared/shared/constantValues';
import { PERSON_INFORMATION_CHANGE_STATUSES } from '@shared/shared/constants';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';

const renderStatusColumn = (status, row, classes) => {

  let dateAndTime;
  if (status === PERSON_INFORMATION_CHANGE_STATUSES.ACCEPTED) {
    dateAndTime = get(row, ['approveDetail', 'createdAt'])
      && moment(get(row, ['approveDetail', 'createdAt'])).format(getLocalDateTimeFormat());
  }
  else if (status === PERSON_INFORMATION_CHANGE_STATUSES.REJECTED) {
    dateAndTime = get(row, ['ignoreDetail', 'createdAt'])
      && moment(get(row, ['ignoreDetail', 'createdAt'])).format(getLocalDateTimeFormat());
  }
  return (
    <>
      <span className={classes[`status_${status}`]}>{get(personInformationChangeStatuses, [status, getLangKey()], '-')}</span>
      {dateAndTime && (
        <span className={classes.dateAndTime}>
          (
          {dateAndTime}
          )
        </span>
      )}
    </>
  );
};

const renderChangeDetailColumn = ({ changeDetail, t }) => {
  const changeDetailKeys = [];

  Object.keys(changeDetail || {}).forEach(key => {
    if (typeof changeDetail[key] === 'object') {
      Object.keys(changeDetail[key]).forEach(deepKey => {
        changeDetailKeys.push(`${key}_${deepKey}`);
      });
    }
    else {
      changeDetailKeys.push(key);
    }
  });

  return (
    changeDetailKeys.map(key => {
      return (
        <Tag key={key}>{t(`personRequestPage:CHANGING_FIELD.${key.toUpperCase()}`)}</Tag>
      );
    })
  );
};

export const _tableColumns = ({ t }) => {
  const classes = useStyles();

  return [
    {
      title: t('personRequestPage:COLUMNS.FRANCHISE'),
      dataIndex: 'franchise',
      key: 'franchise',
      width: '150px',
      render: franchise => {
        return get(franchise, 'name', '-');
      },
    },
    {
      title: t('personRequestPage:COLUMNS.PERSON_NAME'),
      dataIndex: 'person',
      key: 'person',
      width: '120px',
      render: person => {
        return get(person, 'name', '-');
      },
    },
    {
      title: t('personRequestPage:COLUMNS.CHANGING_FIELD'),
      dataIndex: 'changeDetail',
      key: 'changeDetail',
      width: '120px',
      render: changeDetail => {
        return renderChangeDetailColumn({ changeDetail, t });
      },
    },
    {
      title: t('personRequestPage:COLUMNS.REQUEST_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '150px',
      render: createdAt => {
        return (
          moment(createdAt).format(`${getLocalDateTimeFormat()}`)
        );
      },
    },
    {
      title: t('personRequestPage:COLUMNS.REQUEST_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: (status, row) => {
        return renderStatusColumn(status, row, classes);
      },
    },
    {
      title: '',
      align: 'right',
      render: record => {
        const _id = get(record, '_id', '');
        const urlPath = '/person/request/detail/';
        return DetailButton({
          _id,
          urlPath,
        });
      },
    },
  ];
};
