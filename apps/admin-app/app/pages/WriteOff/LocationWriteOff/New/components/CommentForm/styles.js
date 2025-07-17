import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    commentForm: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    warning: { color: theme.color.error, fontSize: '12px' },
    form: { flex: 1 },
  };
});
