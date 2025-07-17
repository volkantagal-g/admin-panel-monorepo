import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import DurationItem from './components/DurationItem';
import { durationsSelector } from '../../../redux/selectors';

const Durations = () => {
  const durations = useSelector(durationsSelector.getData);
  const isPending = useSelector(durationsSelector.getIsPending);

  const classes = useStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  return (
    <div className={classes.container}>
      {durations?.length
        ? durations.map(({ title, value, tooltip }) => <DurationItem tooltip={tooltip} key={title} title={t(title)} value={value} loading={isPending} />)
        : null}
    </div>
  );
};

export default memo(Durations);
