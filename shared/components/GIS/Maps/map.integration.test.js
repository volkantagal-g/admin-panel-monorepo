import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import Maps from '@shared/components/GIS/Maps/map';
import renderComponent from '@test/publicUtils/renderComponent';

describe('In GIS Map Component', () => {
  afterAll(cleanup);
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Maps />) });
    expect(screen.getByText('Leaflet')).toBeInTheDocument();
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
