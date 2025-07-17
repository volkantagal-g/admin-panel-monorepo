import useStyles from './styles';

type BATHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

function BATHeader({ title, children }: BATHeaderProps) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      {title}
      {children && (
        <div>
          {children}
        </div>
      )}
    </header>
  );
}

BATHeader.defaultProps = { children: undefined };

export default BATHeader;
