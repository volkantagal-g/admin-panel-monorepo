import { Col, Row, Tag } from 'antd';

import useStyles from './styles';

function Header({ title = '', badge = '' }) {
  const classes = useStyles();

  return (
    <Row justify="space-between">
      <Col>
        <Row>
          <Col>
            <h1 className={classes.pageTitle}>{title}</h1>
          </Col>
          <Col>
            <Tag className={`${classes.badge} ml-2`}>{badge}</Tag>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
