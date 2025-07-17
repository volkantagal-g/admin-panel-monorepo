import { Input, Row, Col } from 'antd';

import useStyles from './styles';

const { TextArea } = Input;

const AntTextArea = props => {
  const {
    addonAfter,
    ...antTextAreaProps
  } = props;
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Col className="responsiveCol">
        <TextArea {...antTextAreaProps} />
      </Col>
      {addonAfter && (
      <Col>
        <div className={classes.addon}>
          {addonAfter}
        </div>
      </Col>
      )}
    </Row>
  );
};

export default AntTextArea;
