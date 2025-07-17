import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    root: {
      height: '100%',
      '&>div.ant-card-head': { backgroundColor: '#fafafa' },
    },

  };
});