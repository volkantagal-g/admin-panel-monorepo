import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { DEFAULT_DATE_FORMAT, DEFAULT_TIMEOUT_IN_MS } from '@shared/components/UI/LiveClock/constants';

const LiveClock = props => {
  const {
    format,
    timeout,
  } = props;

  const [date, setDate] = useState();
  const [timeZone, setTimeZone] = useState();

  const refreshClock = () => {
    const currentDate = moment().tz(timeZone).format(format);
    setDate(currentDate);
  };

  useEffect(() => {
    const primaryTimeZone = (getSelectedCountryTimeZones()?.[0])?.timezone;
    // List of supported timezones : https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
    const supportedTimeZone = !moment.tz?.zone(primaryTimeZone) ? null : primaryTimeZone;
    setTimeZone(supportedTimeZone);
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timeZone) {
      const timerId = setInterval(refreshClock, timeout);
      return () => clearInterval(timerId);
    }
  }, [date, timeZone]);

  return (
    <span>
      {date}
    </span>
  );
};

LiveClock.propTypes = {
  format: PropTypes.string,
  timeout: PropTypes.number,
};

LiveClock.defaultProps = {
  format: DEFAULT_DATE_FORMAT,
  timeout: DEFAULT_TIMEOUT_IN_MS,
};

export default memo(LiveClock);
