import { get } from 'lodash';

import useStyles from './styles';

export const _getRowClassName = (record, index) => {
  const classes = useStyles();
  const hasBeforeApplication = get(record, 'hasBeforeApplication', false);
  if (hasBeforeApplication) {
    return classes.hasBeforeApplication;
  }
  return null;
};
