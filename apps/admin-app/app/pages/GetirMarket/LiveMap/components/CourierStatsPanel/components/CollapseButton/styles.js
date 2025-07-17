import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collapseButtonWrapper: {
    position: 'absolute',
    top: 'calc(50% - 15px);',
    zIndex: 100,
    right: '282px',
    marginRight: 0,
    transition: 'all 0.4s cubic-bezier(0.65, 0.05, 0.36, 1)',
  },
  collapseButton: {
    width: '36px',
    background: '#f5f5f5',
    height: 30,
    textAlign: 'center',
    marginBottom: 0,
    borderRadius: '40px !important',
    fontSize: 30,
    fontWeight: '700 !important',
    padding: '0 15px 0 0',
  },
  collapsed: {},
});
