import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, render } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';

import { GeoJsonLayer } from '@shared/components/GIS/Maps';

const mockedGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [
          28.833789825439453,
          41.086208906326085,
        ],
      },
    },
  ],
};

describe('In WMS Layer Content Component', () => {
  afterAll(cleanup);
  it('should component render successfully', async () => {
    const { container } = await render(
      <MapContainer>
        <GeoJsonLayer geoJson={mockedGeoJson} onClick={() => {}} />
      </MapContainer>,
    );
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const layer = container.getElementsByClassName('leaflet-overlay-pane');
    expect(layer.length).toBe(1);
  });
});
