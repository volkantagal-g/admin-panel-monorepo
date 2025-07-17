import { Button, Tooltip } from 'antd';
import { memo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import classNames from 'classnames';

import useStyles from './styles';

function Breaks({ spans = [], children, compareData, compareKey }) {
  const { t } = useTranslation('timesheetLogs');
  const classes = useStyles();

  return (
    <div className={classes.wrapperCommon}>
      <div className={classes.fullwidth}>{children}</div>
      {spans.map((time, idx) => {
        const isDifferent = compareData && compareData[compareKey][idx] ? !isEqual(compareData[compareKey][idx], time) : false;
        const className = isDifferent ? classes.borderRed : undefined;

        return (
          <div
            key={time._id}
            className={classNames(
              classes.readOnlyBreakInfo,
              className,
            )}
          >
            <span>{time.duration || '-'}</span>
            <div>
              <Tooltip title={t(`TIMESHEET_LOGS_MODAL.BREAK_TYPE.${time.type}`)}>
                <Button type="link" size="small" htmlType="button" className={classes.iconButton} icon={<InfoCircleOutlined />} />
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Breaks);
