import { createUseStyles } from 'react-jss';

import { TYPE, TYPE_COLORS } from '@shared/components/Card/constants';

export default createUseStyles({
  card: {
    padding: '12px',
    background: props => TYPE_COLORS[props?.type]?.background ?? '#FFFFFF',
    color: props => TYPE_COLORS[props?.type]?.text ?? '',
    border: props => (props?.type && props?.type !== TYPE.DEFAULT ? '' : '1px solid rgba(26, 57, 96, 0.1)'),
    borderRadius: '8px',

    ':is(&) > :is(span, div, p)': { color: props => TYPE_COLORS[props?.type]?.text ?? '' },
  },

  footer: {
    position: 'relative',
    marginTop: '48px',

    '&::before': {
      content: "''",
      position: 'absolute',
      top: '-24px',
      width: '100%',
      height: '1px',
      background: 'rgba(26, 57, 96, 0.1)',
    },
  },
});
