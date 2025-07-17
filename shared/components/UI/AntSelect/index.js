import { Select, Row, Col } from 'antd';

import useStyles from './styles';

const AntSelect = props => {
  const { addonAfter, ...antSelectProps } = props;
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Col className="responsiveCol">
        <Select {...antSelectProps} />
      </Col>
      {addonAfter && (
      <Col>
        <div className={classes.addon}>{addonAfter}</div>
      </Col>
      )}
    </Row>
  );
};

export default AntSelect;
