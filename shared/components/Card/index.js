import PropTypes from 'prop-types';

import useStyles from '@shared/components/Card/styles';
import { TYPE } from '@shared/components/Card/constants';

const Card = ({ children, classNames, type, ...props }) => {
  const classes = useStyles({ type });

  return (
    <div className={`${classes.card} ${classNames ?? ''}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, classNames, ...props }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.footer} ${classNames ?? ''}`} {...props}>
      {children}
    </div>
  );
};

Card.Footer = Footer;

Card.propTypes = {
  classNames: PropTypes.string,
  type: PropTypes.oneOf([TYPE.PRIMARY, TYPE.DANGER, TYPE.MUTED, TYPE.DEFAULT]),
};

Card.defaultProps = { classNames: '', type: TYPE.DEFAULT };

export default Card;
