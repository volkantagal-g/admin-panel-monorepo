import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    height: 'auto',
    transition: transitions.default,
  },
  formWrapper: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: '12px',
    padding: '24px',
    transition: transitions.default,
    '&:hover': { boxShadow: `0 4px 12px ${colors.boxShadowLight}` },
  },
  errorResult: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: '12px',
    padding: '16px',
    transition: transitions.default,
    '&:hover': { boxShadow: `0 4px 12px ${colors.boxShadowLight}` },
  },
});
