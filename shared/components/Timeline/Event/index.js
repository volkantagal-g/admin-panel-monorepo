import useStyles from '@shared/components/Timeline/Event/styles';

const Event = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.event}>{children}</div>;
};

export default Event;
