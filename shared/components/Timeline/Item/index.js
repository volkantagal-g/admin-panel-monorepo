import React from 'react';
import PropTypes from 'prop-types';

import Label from '@shared/components/Timeline/Label';
import Event from '@shared/components/Timeline/Event';

import useStyles from '@shared/components/Timeline/Item/styles';
import { ICONS, STATUS, TYPE } from '@shared/components/Timeline/constants';

const Item = ({ children, label, dot, status, hideLabels, color, type, hideDot }) => {
  const classes = useStyles({ color, type, status, hideDot });

  return (
    <li className={classes.item}>
      {!hideLabels && <Label>{label}</Label>}
      <div className={classes.line}>
        <div className={classes.dotContainer}>
          {dot || <div className={classes.dotWrapper}>{React.cloneElement(ICONS[status] ?? ICONS[STATUS.DONE], { className: classes.dot })}</div>}
        </div>
      </div>
      <Event>{children}</Event>
    </li>
  );
};

Item.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dot: PropTypes.node,
  status: PropTypes.oneOf([STATUS.DONE, STATUS.WAITING]),
  hideLabels: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.oneOf([TYPE.DANGER, TYPE.PRIMARY]),
  hideDot: PropTypes.bool,
};

Item.defaultProps = {
  status: STATUS.DONE,
  type: TYPE.PRIMARY,
  color: '',
  hideLabels: false,
  dot: null,
  label: null,
  hideDot: false,
};

export default Item;
