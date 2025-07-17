import moment from 'moment-timezone';

const getActivityDiff = alert => {
  const now = moment();
  const activityDiff = now.diff(alert.createdAt);
  return activityDiff;
};

export const mapResults = results => {
  return results.map(result => {
    const alertExtraProps = {};
    const alertLastActivityDiff = getActivityDiff(result);
    alertExtraProps.lastActivityDiff = alertLastActivityDiff;
    alertExtraProps.lastActivityDiffStr = parseInt(moment.duration(alertLastActivityDiff).asMinutes(), 10);
    return { ...result, alertExtraProps };
  });
};
