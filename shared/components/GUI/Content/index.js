import useStyles from './styles';

export function Content({ children }) {
  const classes = useStyles();
  return (<div className={classes.content}>{children}</div>);
}
