import { createUseStyles } from 'react-jss';

export default createUseStyles({
  feeBulkUploadButton: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: '0',
    textDecoration: 'none',
    '&:hover': {
      width: 'auto',
      textDecoration: 'none',
    },
    '& > a': {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'inherit',
        textDecoration: 'none',
      },
    },
  },
});
