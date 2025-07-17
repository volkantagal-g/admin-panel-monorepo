import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    customPaginationWrapper: { color: theme.color.title },
    extraOption: { margin: 'auto 0' },
  };
});
