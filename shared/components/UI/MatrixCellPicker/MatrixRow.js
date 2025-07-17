import { Col, Row, Typography } from 'antd';

import MatrixCell from '@shared/components/UI/MatrixCellPicker/MatrixCell';

const MatrixRow = ({ rowLabel, rowIndex, colLabels, matrixData, setMatrixData, isMousePressed, disabled, matrixDataColOrientedObj }) => {
  return (
    <Row>
      {rowLabel && (
        <Col md={3} xs={3}>
          <Typography className="text-center w-100 mb-0">{rowLabel}</Typography>
        </Col>
      )}

      {colLabels.map((colLabel, colIndex) => {
        let isActive = false;
        if (matrixDataColOrientedObj?.[colIndex]) {
          isActive = matrixDataColOrientedObj?.[colIndex]?.includes(rowIndex);
        }

        return (
          <MatrixCell
            active={isActive}
            key={colLabel}
            isActive={matrixData}
            isMousePressed={isMousePressed}
            setMatrixData={setMatrixData}
            activeCells={matrixData}
            row={{ label: rowLabel, index: rowIndex }}
            col={{ label: colLabel, index: colIndex }}
            disabled={disabled}
          />
        );
      })}
    </Row>
  );
};

export default MatrixRow;
