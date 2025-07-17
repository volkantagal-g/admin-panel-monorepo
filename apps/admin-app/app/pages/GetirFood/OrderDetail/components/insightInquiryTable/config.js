import moment from 'moment';
import { get } from 'lodash';
import { Button, Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { foodRefundSourceMap } from '@shared/shared/constantValues';
import { FOOD_INSIGHT_REFUND_STATUS_STYLE } from '@shared/shared/constants';
import { getInsightRefundStatus } from '@app/pages/GetirFood/OrderDetail/util';

const { Text } = Typography;

export const generateColumns = ({ onDetailClick, isRefundPending, isRefunded, classes, t }) => {
  const result = [
    {
      title: t('ORDER_FEEDBACKS.DATE'),
      dataIndex: 'createdAt',
      key: 'date',
      width: 100,
      render: date => moment(date).format(getLocalDateTimeFormat()),
    },
    {
      title: t('ORDER_FEEDBACKS.SOURCE'),
      key: 'source',
      width: 100,
      render: data => {
        const refundSource = get(data, ['refund', 'source'], '');
        return get(foodRefundSourceMap, [refundSource, getLangKey()], '');
      },
    },
    {
      title: `${t('ORDER_FEEDBACKS.MAIN_REASON')} - ${t('ORDER_FEEDBACKS.SUB_REASON')}`,
      key: 'reason',
      width: 100,
      render: data => {
        return (
          <div>
            <strong>{get(data, ['mainReason', 'name', getLangKey()], '')}</strong>
            <p>{get(data, ['subReason', 'name', getLangKey()], '')}</p>
          </div>
        );
      },
    },
    {
      title: t('ORDER_FEEDBACKS.REFUND'),
      key: 'refund',
      width: 100,
      render: data => {
        const { insightStatus, insightStatusString } = getInsightRefundStatus({ selectedInsight: data, isRefundPending, isRefunded });
        return (
          <div className={
            get(classes, FOOD_INSIGHT_REFUND_STATUS_STYLE[insightStatus], '')
          }
          >{insightStatusString}
          </div>
        );
      },
    },
    {
      title: t('ORDER_FEEDBACKS.STATUS'),
      key: 'detail',
      width: 80,
      render: record => {
        const orderId = get(record, '_id', '');
        return (
          <Button
            key={orderId}
            type="default"
            size="small"
            variant="contained"
            target="_blank"
            onClick={() => onDetailClick({ record })}
          >
            <Text>{t('global:DETAIL')}</Text>
          </Button>
        );
      },
    },
  ];

  return result;
};
