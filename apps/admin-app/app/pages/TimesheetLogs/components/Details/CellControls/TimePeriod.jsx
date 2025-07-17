import moment from 'moment';
import { Fragment, memo } from 'react';
import { isEqual } from 'lodash';
import classNames from 'classnames';

import { TIME_FORMAT } from '@shared/shared/constants';
import { sortTimespan } from '../utils';
import useStyles from './styles';

function TimePeriod({ period = [], children, compareData, compareKey, keepLocalTime = false }) {
  const timeSpan = sortTimespan(period);
  const classes = useStyles();

  return (
    <div className={classNames(classes.wrapperCommon, classes.wrapperReadOnlyStyle)}>
      <div className={classes.fullwidth}>{children}</div>
      {timeSpan.map((time, idx) => {
        const isDifferent = compareData && compareData[compareKey][idx] ? !isEqual(compareData[compareKey][idx], time) : false;
        const className = isDifferent ? classes.borderRed : undefined;

        return (
          <Fragment key={time._id || idx.toString()}>
            <span className={className}>{time.start ? moment(time.start).utc(keepLocalTime).format(TIME_FORMAT['24hours']) : '-'}</span>
            <span className={className}>{time.end ? moment(time.end).utc(keepLocalTime).format(TIME_FORMAT['24hours']) : '-'}</span>
            <span />
          </Fragment>
        );
      })}
    </div>
  );
}

export default memo(TimePeriod);
