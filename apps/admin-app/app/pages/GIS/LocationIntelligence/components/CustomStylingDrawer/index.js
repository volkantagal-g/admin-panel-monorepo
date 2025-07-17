import { Drawer, Col, Row, Card, InputNumber, Select, Button, Typography } from 'antd';

import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { PALETTE_TYPES, CUSTOM_STYLE_SPEC, CLASS_TYPES } from '../../utils/constants';
import ColorPalettePicker from '../ColorPalettePicker';

const { Text } = Typography;

const CustomStylingDrawer = ({
  onVisibilityChange,
  isVisible,
  setSelectedStyle,
  selectedStatType,
  onApply,
}) => {
  const [selectedPaletteType, setSelectedPaletteType] = useState('sequential');
  const [selectedClassificationType, setSelectedClassificationType] = useState('neutral');
  const [classCount, setClassCount] = useState(5);
  const [isPaletteSelected, setIsPaletteSelected] = useState(false);
  const [currentPalette, setCurrentPalette] = useState();
  const { t } = useTranslation('gisLocationIntelligencePage');

  const handleStyleApplication = useCallback(() => {
    const style = CUSTOM_STYLE_SPEC;
    onApply({
      colorRange: currentPalette,
      paletteType: selectedPaletteType,
      classificationType: selectedClassificationType,
      statType: selectedStatType,
    });
    setSelectedStyle(style);
  }, [currentPalette, onApply, selectedClassificationType, selectedPaletteType, selectedStatType, setSelectedStyle]);

  return (
    <Drawer
      title={t('DRAWER.TITLE')}
      placement="right"
      destroyOnClose
      onClose={() => {
        onVisibilityChange(false);
      }}
      visible={isVisible}
    >
      <Card>
        <Row gutter={[8, 16]}>
          <Col span={16}>
            <Text type="warning">{t('DRAWER.SELECT_PALETTE_TYPE')}</Text>
            <Select
              style={{ width: 180 }}
              options={PALETTE_TYPES}
              value={selectedPaletteType}
              onChange={e => setSelectedPaletteType(e)}
            />
          </Col>
          <Col span={8}>
            <Text type="warning">{t('DRAWER.CLASSES')}</Text>
            <InputNumber
              min={3}
              max={selectedPaletteType === 'sequential' ? 9 : 11}
              defaultValue={classCount}
              onChange={e => setClassCount(e)}
            />
          </Col>
          <ColorPalettePicker
            selectedPaletteType={selectedPaletteType}
            numberOfClasses={classCount}
            setIsPaletteSelected={setIsPaletteSelected}
            currentPalette={currentPalette}
            setCurrentPalette={setCurrentPalette}
          />
        </Row>
      </Card>
      { isPaletteSelected && (
        <Card>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <Text type="warning">{t('DRAWER.SELECT_CLASSIFICATION_TYPE')}</Text>
              <Select
                style={{ width: '100%' }}
                options={CLASS_TYPES}
                value={selectedClassificationType}
                onChange={e => setSelectedClassificationType(e)}
              />
            </Col>
            <Col span={24}>
              <Button block type="primary" ghost onClick={handleStyleApplication}>{t('DRAWER.APPLY_STYLE')}</Button>
            </Col>
          </Row>
        </Card>
      )}
    </Drawer>
  );
};

export default CustomStylingDrawer;
