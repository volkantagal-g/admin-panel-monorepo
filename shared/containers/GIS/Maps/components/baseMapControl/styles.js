import { createUseStyles } from 'react-jss';

export default createUseStyles({
  baseControl: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    zIndex: 2,
    borderRadius: 5,
    boxShadow: '0 0 8px 2px rgba(0,0,0,0.15)',
    '&:hover': { width: 'fit-content' },
  },
  customLayersWrapper: { width: '100%', marginBlock: '5px' },
  baseLayersWrapper: { width: '100%' },
});
