import { useMemo, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { uniqueId } from 'lodash';

import { useColorSchemes } from '@app/pages/GIS/LocationIntelligence/utils/hooks';
import EditableColorPalette from '../EditColorPalette';
import useStyles from './styles';

const ColorPalettePicker = ({ selectedPaletteType, numberOfClasses, setIsPaletteSelected, currentPalette, setCurrentPalette }) => {
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
  const colorScales = useColorSchemes();
  const classes = useStyles();

  const pickablePalettes = useMemo(() => {
    return Object.keys(colorScales[selectedPaletteType]).map(key => {
      return colorScales[selectedPaletteType][key]?.[numberOfClasses];
    });
  }, [colorScales, numberOfClasses, selectedPaletteType]);

  const handlePaletteChange = ({ palette, index }) => {
    setIsPaletteSelected(true);
    setCurrentPalette(palette);
    setCurrentPaletteIndex(index);
  };

  const handlePaletteUpdate = ({ color, index }) => {
    const newArr = [...currentPalette];
    newArr[index] = color;
    setCurrentPalette(newArr);
  };

  return (
    <Col span={24}>
      <Card>
        <Row gutter={[16, 24]}>
          {pickablePalettes &&
            pickablePalettes.map((palette, index) => (
              <Col
                key={uniqueId()}
                span={6}
              >
                <div
                  className={currentPaletteIndex === index ? classes.colorPalette : ''}
                  onClick={() => handlePaletteChange({ palette, index })}
                  role="button"
                  data-testid={`color-palette-${index}`}
                  onKeyDown={undefined}
                  tabIndex={index}
                >
                  <div>
                    {palette && (palette.map(color => (
                      <div
                        key={uniqueId()}
                        className={classes.colorPaletteInner}
                        style={{ backgroundColor: color }}
                      />
                    )))}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Card>
      <Card>
        {currentPalette && (currentPalette.map((color, index) => {
          return (
            <Row gutter={[16, 24]} key={`${color}`}>
              <EditableColorPalette
                selectedColor={color}
                colorIndex={index}
                updateSelectedColor={handlePaletteUpdate}
              />
            </Row>
          );
        }))}
      </Card>
    </Col>
  );
};

export default ColorPalettePicker;
