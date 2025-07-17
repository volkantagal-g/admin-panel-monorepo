import { ReactNode, memo } from 'react';
import { Collapse as AntCollapse } from 'antd';

import useStyles from './styles';

const { Panel } = AntCollapse;

export const Collapse = memo(
  ({
    title,
    children,
    className,
    size = 'default',
    key,
    ...restProps
  }: {
    title: string | undefined;
    className: string | undefined;
    children: ReactNode;
    size: 'default' | 'small';
    key: string | undefined;
  }) => {
    const classes = useStyles();
    return (
      <AntCollapse expandIconPosition="right" className={classes.collapse}>
        <Panel
          key={key ?? ''}
          className={classes.panel}
          header={<p className={classes.title}>{title}</p>}
          {...restProps}
        >
          {children}
        </Panel>
      </AntCollapse>
    );
  },
);
