import { useEffect, useState } from 'react';

import { Col, Tooltip } from 'antd';

import { MARKET_ORDER_STATUS } from '@shared/shared/constants';
import { initProgressBars } from '../../utils';
import useStyles from './styles';

function TimelineProgressBar({ orderDetail, titleLabel }) {
  const classes = useStyles();
  const [progressBarData, setProgressBarData] = useState({});
  useEffect(() => {
    if (
      orderDetail?.status >= MARKET_ORDER_STATUS.WAITING_FOR_PICKER &&
          orderDetail?.status < MARKET_ORDER_STATUS.DELIVERED
    ) {
      const interval = setInterval(() => {
        const progressBarsValues = initProgressBars(orderDetail);
        setProgressBarData(progressBarsValues);
      }, 1000);
      return () => clearInterval(interval);
    }
    return setProgressBarData(initProgressBars(orderDetail));
  }, [orderDetail]);

  const { progressInfos, totalTimeText } = progressBarData;
  return (
    <Col span={24} data-testid="timeline-progress-bar">
      <h4 className={classes.customProgressHeader}>
        {titleLabel}: <strong>{totalTimeText}</strong>
      </h4>
      <div className={classes.customProgress}>
        {
          progressInfos?.bars?.map(bar => {
            return (
              <div key={bar.id} className={`${classes.customBar} ${classes[bar?.barColor]}`} style={{ width: bar.barPercent }}>
                <Tooltip title={bar?.tooltip} placement="bottom">
                  {bar?.text}
                </Tooltip>
              </div>
            );
          })
        }
      </div>
    </Col>
  );
}

export default TimelineProgressBar;
