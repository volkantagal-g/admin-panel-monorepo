import { useMemo } from 'react';
import { Button, Table, Col, Row } from 'antd';
import _ from 'lodash';

import { tableColumns } from './config';
import { DEFAULT_MINS_RANGE } from './constants';
import useStyles from './styles';

function WeekMinPicker(props) {
  const {
    availableTimes,
    isDisabled,
    handleMouseUp = () => { },
    handleMouseDown = () => { },
    handleMouseOver = () => { },
    shouldRender,
    mins = DEFAULT_MINS_RANGE,
    headerSelectable = false,
    onSelectDay,
  } = props;

  const classes = useStyles();

  const tempArray = useMemo(() => {
    return Array.from({ length: (24 * 60) / mins }).map((x, k) => {
      return k;
    });
  }, [mins]);

  const handleMouseDownEvent = timeIndex => {
    return () => {
      handleMouseDown(timeIndex);
    };
  };

  const handleMouseOverEvent = timeIndex => {
    return () => {
      handleMouseOver(timeIndex);
    };
  };

  const renderCell = timeIndex => {
    const timeStatus = availableTimes[timeIndex];

    const buttonType = timeStatus ? 'primary' : 'default';
    const buttonClass = isDisabled && timeStatus ? classes.disabledButton : '';
    return (
      <Button
        disabled={isDisabled}
        className={[buttonClass, classes.transitionZero]}
        block
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDownEvent(timeIndex)}
        onMouseOver={handleMouseOverEvent(timeIndex)}
        type={buttonType}
      >
        {' '}
      </Button>
    );
  };

  return (
    <Row>
      <Col span={24}>
        <Table
          className={classes.tableWrapper}
          columns={tableColumns({ renderCell, shouldRender, mins, headerSelectable, onSelectDay, disabled: isDisabled })}
          dataSource={tempArray}
          pagination={false}
          rowKey={timeIndex => _.toString(timeIndex)}
        />
      </Col>
    </Row>
  );
}

export default WeekMinPicker;
