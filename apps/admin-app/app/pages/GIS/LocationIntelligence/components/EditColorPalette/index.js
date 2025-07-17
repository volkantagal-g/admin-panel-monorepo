import { Col, Input } from 'antd';
import { useState } from 'react';
import SketchPicker from 'react-color';

import useStyles from './styles';

const EditableColorPalette = ({ selectedColor, updateSelectedColor, colorIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pickerColor, setPickerColor] = useState(selectedColor);
  const classes = useStyles({ pickerColor });

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    updateSelectedColor({ color: pickerColor, index: colorIndex });
    setIsVisible(false);
  };

  const handleChange = color => setPickerColor(color.hex);

  return (
    <>
      <Col
        span={12}
      >
        <div
          className={classes.coverageDiv}
          onClick={handleClick}
          role="button"
          onKeyDown={undefined}
          tabIndex={colorIndex}
        >
          <div className={classes.color} />
        </div>
        {isVisible ? (
          <div
            className={classes.sketchWrapper}
          >
            <div
              onClick={handleClose}
              onKeyDown={undefined}
              role="button"
              tabIndex={colorIndex}
              className={classes.sketchWrapperInner}
              aria-label="sketchPicker"
            />
            <SketchPicker
              color={pickerColor}
              onChange={handleChange}
              disableAlpha
            />
          </div>
        ) : null}
      </Col>
      <Col span={12}>
        <Input value={pickerColor.toUpperCase()} disabled />
      </Col>
    </>
  );
};

export default EditableColorPalette;
