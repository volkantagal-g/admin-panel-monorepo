import { createUseStyles } from 'react-jss';

export default createUseStyles({
  imageHolder: {
    minHeight: '40px',
    position: 'relative',
    '& img': { width: '85px', position: 'absolute', top: '0px' },
    '& .foreground-image': { zIndex: '3' },
    '& .background-image': { zIndex: '1' },
    '& .main-image': { zIndex: '2' },
  },
  popover: { width: '0', height: '0px', '& img': { width: '290px', position: 'absolute' } },
});
