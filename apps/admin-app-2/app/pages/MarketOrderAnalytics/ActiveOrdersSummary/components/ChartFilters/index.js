import { Tag } from 'antd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@shared/i18n';

import { Creators } from '../../redux/actions';
import { getChartFilters } from '../../redux/selectors';

import { getChartFilterTag } from './config';

import useStyles from './styles';

export default function ChartFilters() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chartFilters = useSelector(getChartFilters);

  const tags = useMemo(() => {
    const onClose = key => {
      dispatch(Creators.resetChartFilter({ chartFilterName: key }));
      dispatch(Creators.getActiveOrdersExecutiveStatsRequest());
    };
    return getTagsFromChartFilters(chartFilters, onClose);
  }, [chartFilters, dispatch]);

  if (!tags.length) return null;

  return (
    <div className={classes.chartFilters}>
      {t('activeOrdersForExecutiveDashboardPage:CHART_FILTERS')}: {tags}
    </div>
  );
}

function getTagsFromChartFilters(chartFilters, onClose) {
  // check which chart filter is active, add it as removable tag
  return Object.entries(chartFilters)
    .filter(val => val[1])
    .map(([key, val]) => (
      <Tag closable key={key} onClose={() => onClose(key)}>
        {getChartFilterTag(t, key, val)}
      </Tag>
    ));
}
