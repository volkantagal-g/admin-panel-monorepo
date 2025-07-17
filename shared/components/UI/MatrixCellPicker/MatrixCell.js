import { useState, useEffect } from 'react';
import { Button, Col } from 'antd';

const MatrixCell = ({
  isMousePressed,
  col,
  active,
  row,
  setMatrixData,
  wrapperProps = { md: 3, xs: 3 },
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <Col {...wrapperProps}>
      <Button
        className={`w-100 h-100 ${isActive ? 'bg-info' : 'bg-white'}`}
        onMouseDown={() => {
          setIsActive(!isActive);
          setMatrixData(row, col, isActive);
        }}
        onMouseEnter={() => {
          if (isMousePressed) {
            setIsActive(!isActive);
            setMatrixData(row, col, isActive);
          }
        }}
      >&nbsp;
      </Button>
    </Col>
  );
};

export default MatrixCell;
