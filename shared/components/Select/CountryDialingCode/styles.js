import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  root: {
    width: '100%',
    '&>div>div>div.ant-select': { width: '60px !important' },
  },
}));
