import { useState, useEffect } from 'react';
import { Col, Row, Typography } from 'antd';

import { isEqual } from 'lodash';

import MatrixRow from '@shared/components/UI/MatrixCellPicker/MatrixRow';
import useStyles from '@shared/components/UI/MatrixCellPicker/styles';
import { convertTwoDimensionalArrToObj } from '@shared/components/UI/MatrixCellPicker/utils';

const MatrixCellPicker = ({
  activeCells = [],
  rowLabels = [''],
  colLabels = [''],
  handleMatrixChange,
  disabled = false,
}) => {
  // It's not most efficient solution for drag selection , hold event mechanism can improve
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [matrixData, setMatrixData] = useState(activeCells);
  const classes = useStyles();

  useEffect(() => {
    handleMatrixChange(matrixData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrixData]);

  useEffect(() => {
    if (activeCells?.length) {
      setMatrixData(activeCells);
    }
  }, [activeCells]);

  const setMatrixDataHandler = (row, col, isActive) => {
    let filteredMatrixData = [];
    if (!isActive) {
      filteredMatrixData = [...matrixData, [row.index, col.index]];
      setMatrixData(filteredMatrixData);
      handleMatrixChange(filteredMatrixData);
    }
    else {
      filteredMatrixData = matrixData.filter(item => !isEqual(item, [row.index, col.index]));
      setMatrixData(filteredMatrixData);
      handleMatrixChange(filteredMatrixData);
    }
  };

  return (
    <Row
      gutter={24}
      onMouseDown={() => setIsMousePressed(true)}
      onMouseUp={() => setIsMousePressed(false)}
      onMouseLeave={() => setIsMousePressed(false)}
    >
      {/* Inactivated Overlay */}
      <div className={disabled && classes.inactiveOverlay} />
      <Col lg={24}>
        <Row wrap>
          {rowLabels?.length > 1 && (
            <Col md={3} xs={3} />
          )}
          {colLabels?.map(dayName => {
            return (
              <Col md={3} xs={3} className="flex-fill" key={dayName}>
                <Typography className="text-center w-100">{dayName}</Typography>
              </Col>
            );
          })}
        </Row>
        {rowLabels?.map((rowLabel, rowIndex) => {
          return (
            <MatrixRow
              matrixDataColOrientedObj={convertTwoDimensionalArrToObj(matrixData)}
              key={rowLabel}
              rowLabel={rowLabel}
              rowIndex={rowIndex}
              colLabels={colLabels}
              isMousePressed={isMousePressed}
              handleMatrixChange={handleMatrixChange}
              setMatrixData={setMatrixDataHandler}
              matrixData={matrixData}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default MatrixCellPicker;
