import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { STATUS, TYPE } from '@shared/components/Timeline/constants';
import { flattenChildren } from '@shared/utils/flattenChildren';

import useStyles from '@shared/components/Timeline/styles';
import Item from '@shared/components/Timeline/Item';

const Timeline = ({ children, hideLabels, status, type, color }) => {
  const classes = useStyles();

  const flattenedChildren = useMemo(() => flattenChildren(children), [children]);
  const childrenProps = { hideLabels, type, color };

  return (
    <ul className={classes.timeline}>
      {React.Children.map(flattenedChildren, (child, i) => {
        return React.cloneElement(child, {
          ...childrenProps,
          ...(i === flattenedChildren.length - 1 && { hideDot: false, status }),
        });
      })}
    </ul>
  );
};

Timeline.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  hideLabels: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.oneOf([TYPE.DANGER, TYPE.PRIMARY]),
  status: PropTypes.oneOf([STATUS.DONE, STATUS.WAITING]),
};

Timeline.defaultProps = {
  hideLabels: false,
  color: '',
  type: TYPE.PRIMARY,
  status: STATUS.DONE,
};

Timeline.Item = Item;

export default Timeline;
