import { Collapse, Tag } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import useStyles from '../styles';
import { STATUS_TAG_COLOR_MAP, CUSTOM_DATE_FORMAT } from '@app/pages/Payment/constants';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { amountCurrencyFormat, calculatePrecisedAmount, dateStringWithTimeZone, getTypeTagColor } from '../../../../../utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const { Panel } = Collapse;

const StatusHistory = ({ statusHistory, currency }) => {
  const { t } = useTranslation(['global', 'paymentEventPage']);
  const classes = useStyles();
  const columns = [
    {
      title: t('global:TYPE'),
      key: 'type',
      render: ({ type }) => {
        return (
          <Tag
            className={classes.statusTag}
            color={getTypeTagColor(type)}
          > {type}
          </Tag>
        );
      },
      align: 'center',
    },
    {
      title: t('global:STATUS'),
      key: 'status',
      render: ({ status }) => {
        return (
          <Tag
            className={classes.statusTag}
            color={
              STATUS_TAG_COLOR_MAP[status]
            }
          > {status}
          </Tag>
        );
      },
      align: 'center',
    },
    {
      title: t('global:AMOUNT'),
      key: 'amount',
      render: data => {
        const precisedAmount = calculatePrecisedAmount(get(data, 'amount', 0));
        return amountCurrencyFormat(precisedAmount, currency);
      },
      align: 'center',
    },
    {
      title: t('paymentEventPage:BALANCE'),
      key: 'balance',
      render: data => {
        const precisedBalance = calculatePrecisedAmount(get(data, 'balance', 0));
        return amountCurrencyFormat(precisedBalance, currency);
      },
      align: 'center',
    },
    {
      title: t('global:CREATED_AT'),
      key: 'createdAt',
      width: 200,
      render: ({ createdAt }) => {
        return dateStringWithTimeZone(formatUTCDate(createdAt, CUSTOM_DATE_FORMAT), 'UTC');
      },
      align: 'center',
    },
    {
      title: t('global:UPDATED_AT'),
      key: 'date',
      width: 200,
      render: ({ date }) => {
        return dateStringWithTimeZone(formatUTCDate(date, CUSTOM_DATE_FORMAT), 'UTC');
      },
      align: 'center',
    },
    {
      title: t('global:CREATED_BY'),
      key: 'createdBy',
      align: 'center',
      width: 250,
      render: data => {
        const userEmail = data?.user?.email || data?.source || '';
        return userEmail;
      },
    },
    {
      title: t('global:DESCRIPTION'),
      key: 'description',
      render: ({ description }) => {
        return <div className={classes.overflowList}> {description} </div>;
      },
    },
  ];
  return (
    <Collapse defaultActiveKey={['3']}>
      <Panel header={t('paymentEventPage:STATUS_HISTORY')} key="3">
        <AntTableV2
          data={statusHistory}
          columns={columns}
        />
      </Panel>
    </Collapse>
  );
};

StatusHistory.propTypes = {
  statusHistory: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string,
    date: PropTypes.string,
  })).isRequired,
};
PropTypes.defaultProps = { statusHistory: [{ status: '', date: '' }] };

export default StatusHistory;
