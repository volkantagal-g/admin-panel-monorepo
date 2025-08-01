import { memo } from 'react';
import { Row, Col } from 'antd';

import useStyles from './styles';

export const Column = memo(function Column({ children, title }) {
  const classes = useStyles();
  return (
    <Row gutter={[0, 16]}>
      <Col span={24} className={classes.title}>{title}</Col>
      <div className={classes.columChild}>
        {children}
      </div>
    </Row>
  );
});
