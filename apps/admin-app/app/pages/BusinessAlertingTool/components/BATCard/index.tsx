/* eslint-disable react/require-default-props */
import useStyles from './styles';

type BATCardProps = {
  children: React.ReactNode;
  headerTitle?: string;
  collapsible?: boolean;
};

type BATCardHeaderProps = {
  title: string;
};

function BATCardHeader({ title }: BATCardHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.cardHeader}>
      <span>{title}</span>
    </div>
  );
}

function BATCard({ children, headerTitle, collapsible = false }: BATCardProps) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      {headerTitle && (
        <BATCardHeader title={headerTitle} />
      )}
      {children}
    </div>
  );
}

export default BATCard;
