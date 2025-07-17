import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    title: { fontSize: '16px' },
    subTitle: { color: theme.color.secondaryText },
    tableHeaderControl: { margin: 'auto 0' },
    iconButton: theme.iconButton.type1,
  };
});
