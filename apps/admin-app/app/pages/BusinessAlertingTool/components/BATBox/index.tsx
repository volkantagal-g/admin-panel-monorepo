/* eslint-disable react/require-default-props */
import React from 'react';

import useStyles from './styles';

type BATBoxProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  action?: React.ReactNode;
};

function BATBox({ children, title, action }: BATBoxProps) {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      {title && (
        <div className={classes.boxHeader}>
          <span>{title}</span>
          {action && action}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default BATBox;
