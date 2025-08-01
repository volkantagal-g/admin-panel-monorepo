import { Tooltip } from 'antd';

import useStyles from './styles';

export default function StatCard({ title, value, tooltip }) {
  const classes = useStyles();
  return (
    <div className={classes.statCard}>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <h2>{title}</h2>
        </Tooltip>
      ) : (
        <h2>{title}</h2>
      )}
      <p>{value}</p>
    </div>
  );
}
