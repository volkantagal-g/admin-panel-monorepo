import { Button, Col, Row, Tooltip } from 'antd';

import { SET_DIRECTIONS } from '../../../constants';

const SetLine = ({ text, t, classes, handleStepChange, record }) => {
  return (
    <Row className={classes.setLine} sm={12}>
      <Col sm={4} className={classes.setNumber}>
        {text}
      </Col>
      <Col sm={8} className={classes.replaceButtons}>
        <Tooltip title={t('REPLACE_WITH_TOP')} color="#5d3ebc">
          <Button
            type="text"
            onClick={() => handleStepChange(SET_DIRECTIONS.TOP, record, text)}
            className={`${classes.yellowGetirColor} ${classes.replaceButtonItems}`}
          >
            {t('TOP')}
          </Button>
        </Tooltip>
        <Tooltip title={t('REPLACE_WITH_BOTTOM')} color="#5d3ebc">
          <Button
            type="text"
            onClick={() => handleStepChange(SET_DIRECTIONS.BOTTOM, record, text)}
            className={`${classes.yellowGetirColor} ${classes.replaceButtonItems}`}
          >
            {t('BOTTOM')}
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};
export default SetLine;
