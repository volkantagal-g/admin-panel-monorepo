import { Link } from 'react-router-dom';

import { usePermission } from '@shared/hooks';
import { Button } from '../Button';
import useStyles from './styles';

export const RedirectButton = ({ to, text, target, permKey, className, ...otherButtonProps }) => {
  const { canAccess } = usePermission();
  const classes = useStyles();

  if (
    !permKey ||
    (permKey && canAccess(permKey))
  ) {
    return (
      <Button
        className={`${classes.root} ${className}`}
        {...otherButtonProps}
      >
        <Link className={classes.link} to={to} target={target}>{text}</Link>
      </Button>
    );
  }

  return null;
};
