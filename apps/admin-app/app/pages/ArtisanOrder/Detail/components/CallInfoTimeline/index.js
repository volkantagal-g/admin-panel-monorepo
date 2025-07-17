/* eslint-disable react/no-danger */
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Spin, Timeline } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

import { useEffect } from 'react';

import useStyles from './styles';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { callInfoMessagesSelector, callInfoSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

export default function CallInfoTimeline({ orderId, callPin }) {
  const { t, i18n: { language } } = useTranslation('artisanOrderPage');
  const styles = useStyles();
  const dispatch = useDispatch();
  const callInfo = useSelector(callInfoSelector);
  const callInfoMessages = useSelector(callInfoMessagesSelector);

  const onRefreshCallInfo = () => {
    dispatch(Creators.getCallInfoRequest({ orderId, callPin }));
  };

  useEffect(() => {
    if (!orderId || !callPin) return;

    onRefreshCallInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, callPin]);

  return (
    <Spin spinning={callInfoMessages?.isPending}>
      <div className={styles.container} data-testid="call-info-timeline">
        <h2 className={styles.title}>
          {t('CALL_INFO.TITLE')} <Button type="text" icon={<ReloadOutlined />} loading={callInfo?.isPending} onClick={onRefreshCallInfo} />
        </h2>

        {callInfo?.data?.length > 0 && (
        <Timeline className={styles.timeline}>
          {callInfo?.data?.map(call => (
            <Timeline.Item key={call.callDetailId}>
              <div className={styles.callStatus} title={moment(`${call.callDate}Z`).format(getLocalDateTimeFormat())}>
                <span>{t('CALL_INFO.STATUS')}</span>
                <span>{t(`CALL_INFO.CALL_REASON_${call.callReason}`)}</span>

                {['CANCEL', 'NOANSWER'].includes(call.callReason) && (
                  <>
                    <span>{t('CALL_INFO.RINGING_TIME')}</span>
                    <span>{t('CALL_INFO.FORMAT_TIME', { time: call.ringingTime })}</span>
                  </>
                )}

                {call.speakingTime > 0 && call.callReason === 'ANSWER' && (
                  <>
                    <span>{t('CALL_INFO.SPEAKING_TIME')}</span>
                    <span>{t('CALL_INFO.FORMAT_TIME', { time: call.speakingTime })}</span>
                  </>
                )}
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
        )}

        {callInfo?.data?.length === 0 && (
        <Alert
          message={t('CALL_INFO.NO_CONVERSATION')}
          description={(
            <div
              className={styles.alertDescription}
              dangerouslySetInnerHTML={{ __html: callInfoMessages?.data?.value?.banner[language] }}
            />
          )}
          type="info"
          showIcon
        />
        )}

        <div
          className={styles.rules}
          dangerouslySetInnerHTML={{ __html: callInfoMessages?.data?.value?.rules[language] }}
        />
      </div>
    </Spin>
  );
}
