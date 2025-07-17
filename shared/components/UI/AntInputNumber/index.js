import { InputNumber, Row, Col } from 'antd';

import useStyles from './styles';

const AntInputNumber = props => {
  const {
    addonAfter,
    ...antInputNumberProps
  } = props;
  const classes = useStyles();
  return (
    <>
      <Row className={classes.container}>
        <Col className="responsiveCol">
          <InputNumber {...antInputNumberProps} />
        </Col>
        {addonAfter && (
          <Col>
            <div className={classes.addon}>
              {addonAfter}
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AntInputNumber;
