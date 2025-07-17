/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useStyles from './styles';

type HourCardProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean | undefined;
}

function HourCard({ children, onClick, className, disabled }: HourCardProps) {
  const classes = useStyles();

  return (
    <div className={disabled ? classes.cursorNotAllowed : ''}>
      <div
        className={`${classes.hourCard} ${disabled ? classes.disabled : ''} ${className || ''}`}
        onClick={onClick}
      >
        <span>{children}</span>
      </div>
    </div>
  );
}

HourCard.defaultProps = { className: '', disabled: false };

export default HourCard;
