import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    removed: { margin: 0 },
    warning: { color: theme.color.error, fontSize: '12px' },
    productForm: { display: 'flex', justifyContent: 'space-between' },
  };
});
