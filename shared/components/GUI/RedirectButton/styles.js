import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    '& .anticon': { marginRight: 8 },
  },
  link: {
    color: 'inherit',
    '&:hover': { color: 'inherit' },
  },
});
