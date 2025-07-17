import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Input, Row } from 'antd';

import Card from '@shared/components/UI/AntCard';

import { Maps, DraggableMarker } from '@shared/components/GIS/Maps';

const PickerMap = ({ coordinates, address }) => {
  const [defaultMapState, setDefaultMapState] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (coordinates && coordinates.length) {
      setDefaultMapState({
        center: [coordinates[1], coordinates[0]],
        zoom: 11,
      });
    }
  }, [coordinates]);

  return (
    <Card title={t('global:ADDRESS')}>
      <Row gutter={8}>
        {defaultMapState && (
        <Maps
          center={defaultMapState.center}
          flyOnCenterChange
          currentZoom={defaultMapState.zoom}
          style={{ width: '100%', height: '400px' }}
        >
          <DraggableMarker
            center={defaultMapState.center}
          />
        </Maps>
        )}
        <Input.TextArea value={address} disabled />
      </Row>
    </Card>
  );
};

export default PickerMap;
