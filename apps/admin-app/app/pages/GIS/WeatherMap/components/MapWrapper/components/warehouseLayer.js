import { IconLayer } from '@deck.gl/layers';

import { useTranslation } from 'react-i18next';

import DeckGLOverlay from '@shared/containers/GIS/Maps/components/deckGL';

import { getWarehouseMarkerIcon } from '@shared/components/GIS/Maps/utils/helper';

const WarehouseLayer = ({ warehouses = [] }) => {
  const { t } = useTranslation();
  const getTooltip = ({ object }) => {
    if (object) {
      return {
        html: `
          <table>
            <tr style="border: 1px solid #eee;">
              <td style="padding-left: 10px;"><strong>${t('global:NAME')}:</td>
              <td style="padding-left: 10px; padding-right: 5px">${object.name}</td>
            </tr>
          </table>
          `,
        style: {
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          color: '#000',
          pointerEvents: 'none',
          position: 'absoulte',
          zIndex: 1,
        },
      };
    }
    return null;
  };

  const layer = new IconLayer({
    id: 'warehouse-layer',
    data: warehouses,
    getIcon: warehouse => ({
      url: getWarehouseMarkerIcon(warehouse),
      width: 64,
      height: 64,
      mask: false,
    }),
    getSize: () => 2,
    pickable: true,
    sizeScale: 10,
    getPosition: warehouse => warehouse.location.coordinates,
    autoHighlight: true,
    highlightColor: [255, 255, 0, 128],
  });

  return (
    <DeckGLOverlay
      layers={[layer]}
      getTooltip={getTooltip}
    />

  );
};

export default WarehouseLayer;
