import { createUseStyles } from 'react-jss';

import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

export default createUseStyles({
  orderStatsContainer: {
    position: 'absolute',
    bottom: props => (props?.isDeviceMobile ? '0.1rem' : '-0.1rem'),
    zIndex: SIDEBAR_Z_INDEX - 2,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '2px 2px 10px rgb(0 0 0 / 10%)',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    '@media (max-width: 768px)': { maxWidth: '90%', position: 'fixed', left: 0 },
  },
  collapsed: {
    width: 300,
    left: '-296px',
  },
  collapseButton: {
    width: 36,
    height: 30,
    padding: '0 0 0 15px',
    background: '#f5f5f5',
    textAlign: 'center',
    fontWeight: '700 !important',
    borderRadius: '40px !important',
    marginBottom: 0,
    right: -17,
    position: 'absolute',
    lineHeight: '28px',
    zIndex: 2,
  },
  collapsedButton: {
    width: '30px',
    borderRadius: '8px !important',
    justifyContent: 'center !important',
    padding: '0',
    bottom: '4rem',
    left: '0',
  },
});
