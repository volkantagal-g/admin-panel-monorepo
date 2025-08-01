import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({

  paginationContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px',
    backgroundColor: colors.backgroundWhite,
    borderTop: `1px solid ${colors.borderGray}`,
    transition: transitions.default,
  },
});
