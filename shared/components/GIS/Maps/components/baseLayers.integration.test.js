import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';

import BaseLayers from '@shared/components/GIS/Maps/components/baseLayers';
import renderComponent from '@test/publicUtils/renderComponent';
import '../utils/leaflet/LeafletZoominfo';

describe('In Base Layers Component', () => {
  afterAll(cleanup);
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <MapContainer>
          <BaseLayers />
        </MapContainer>
      ),
    });
  });
  it('should Google Street Layer render successfully', () => {
    expect(screen.getByText('Google Street')).toBeInTheDocument();
  });
  it('should Google Traffic Layer render successfully', () => {
    expect(screen.getByText('Google Traffic')).toBeInTheDocument();
  });
  it('should Google Hybrid Layer render successfully', () => {
    expect(screen.getByText('Google Hybrid')).toBeInTheDocument();
  });
  it('should OpenStreetMap Layer render successfully', () => {
    expect(screen.getByText('Open Street Map')).toBeInTheDocument();
  });
  it('should Esri Satellite Layer render successfully', () => {
    expect(screen.getByText('ESRI Satellite')).toBeInTheDocument();
  });
});
