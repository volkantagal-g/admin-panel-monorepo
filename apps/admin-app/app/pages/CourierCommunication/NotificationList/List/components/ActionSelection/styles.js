import { createUseStyles } from 'react-jss';

import jssTheme from '@shared/jssTheme';

export default createUseStyles({
  actionButton: {
    color: `${jssTheme.color.primary} !important`,
    borderRadius: '8px',
    fontWeight: '700',
    background: '#193B670D',
    width: 66,
    height: 36,
    padding: '8px 12px',
    fontSize: 14,
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
