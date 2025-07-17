import { createUseStyles } from 'react-jss';

import { TIMELINE_GAP } from '@shared/components/Timeline/constants';

export default createUseStyles({
  timeline: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: TIMELINE_GAP,
    display: 'flex',
    flexDirection: 'column',
  },
});
