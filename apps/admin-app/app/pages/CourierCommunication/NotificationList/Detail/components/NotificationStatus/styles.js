import { createUseStyles } from 'react-jss';

import theme from '@shared/jssTheme';

export default createUseStyles({
  container: {
    marginBottom: 10,
    marginLeft: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: { padding: '1px 5px' },
  100: { backgroundColor: '#FFF1B0', color: '#007B48' },
  200: { backgroundColor: 'rgba(1, 204, 120, 0.2)', color: '#007B48' },
  300: { backgroundColor: 'rgb(36, 183, 230)', color: theme.color.white },
});
