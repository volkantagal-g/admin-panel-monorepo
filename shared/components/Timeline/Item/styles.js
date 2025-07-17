import { createUseStyles } from 'react-jss';

import { TIMELINE_GAP, TYPE, TYPE_COLORS } from '@shared/components/Timeline/constants';

export default createUseStyles({
  item: {
    display: 'flex',
    gap: '1rem',

    '&:first-child > $line:before': { borderTopLeftRadius: '50rem', borderTopRightRadius: '50rem' },

    '&:last-child > $line:before': { height: 'auto' },

    '&:last-child $dotContainer': {
      background: props => TYPE_COLORS[props?.type]?.line ?? props?.color ?? TYPE_COLORS[TYPE.PRIMARY].line,
      borderBottomLeftRadius: '50rem',
      borderBottomRightRadius: '50rem',
    },
  },

  dotContainer: props => ({
    position: 'relative',
    flexShrink: 0,
    ...(props?.hideDot && { visibility: 'hidden' }),
  }),
  dotWrapper: {
    display: 'grid',
    borderRadius: '50%',
    padding: '8px',
    backgroundColor: props => TYPE_COLORS[props?.type]?.dot ?? TYPE_COLORS[TYPE.PRIMARY].dot,
  },
  dot: {
    color: 'white',
    transformOrigin: 'center',
  },

  line: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      height: `calc(100% + ${TIMELINE_GAP})`,
      width: '100%',
      background: props => TYPE_COLORS[props?.type]?.line ?? props?.color ?? TYPE_COLORS[TYPE.PRIMARY].line,
    },
  },
});
