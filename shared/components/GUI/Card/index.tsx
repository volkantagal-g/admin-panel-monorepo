import { ReactNode, memo } from 'react';
import { Card as AntCard } from 'antd';
import classNames from 'classnames';

import useStyles from './styles';

export const Card = memo(({
  title,
  children,
  className,
  size = 'default',
  ...restProps
}: {
  title: string | undefined;
  className: string | undefined;
  children: ReactNode;
  size: 'default' | 'small'
}) => {
  const classes = useStyles();
  return (
    <AntCard
      title={
        <p className={classes.title}>{title}</p>
      }
      {...restProps}
      className={classNames(classes.card, className)}
    >
      {children}
    </AntCard>
  );
});
