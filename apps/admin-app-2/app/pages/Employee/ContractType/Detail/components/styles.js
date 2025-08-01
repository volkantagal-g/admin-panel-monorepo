import { createUseStyles } from 'react-jss';

import { TYPE_COLORS } from '@shared/components/Card/constants';

export default createUseStyles({
  spin: {
    minHeight: 400,
    borderRadius: 8,
    height: '100%',
  },
  card: {
    padding: 0,
    margin: 10,
    background: props => TYPE_COLORS[props?.type]?.background ?? '#FFFFFF',
    color: props => TYPE_COLORS[props?.type]?.text ?? '',
    border: props => (props?.type ? '' : '1px solid rgba(26, 57, 96, 0.1)'),
    borderRadius: 8,

    ':is(&) > :is(span, div, p)': { color: props => TYPE_COLORS[props?.type]?.text ?? '' },
  },
});
