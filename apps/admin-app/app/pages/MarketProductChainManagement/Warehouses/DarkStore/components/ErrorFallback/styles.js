import { createUseStyles } from 'react-jss';

import { colors } from '@app/pages/MarketProductChainManagement/styleVariables';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
    height: '100vh',
  },
  error: {
    margin: '1rem 0',
    padding: '1rem',
    backgroundColor: colors.errorBackground,
    borderRadius: '4px',
    color: colors.errorRed,
    fontSize: '14px',
    maxWidth: '100%',
    overflow: 'auto',
  },
};

export default createUseStyles(styles);
