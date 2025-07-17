import useStyles from '@shared/components/Timeline/Label/styles';

const Label = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.label}>{children}</div>;
};

export default Label;
