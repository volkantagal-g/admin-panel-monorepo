import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, fireEvent, screen } from '@testing-library/react';

import Maps from '@shared/containers/GIS/Maps/map';

import renderComponent from '@test/publicUtils/renderComponent';
import BaseMapControl from './components/baseMapControl';

describe('Map: ', () => {
  afterAll(cleanup);

  describe('Map Definition: ', () => {
    it('renders without crashing', async () => {
      let onLoadTriggered = 0;

      const onLoad = () => {
        onLoadTriggered += 1;
        return onLoadTriggered;
      };

      await renderComponent({
        ui: (<Maps
          onLoad={onLoad()}
        />),
      });
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
      expect(onLoadTriggered).toBe(1);
    });
    describe('BaseMapControl: ', () => {
      it('Hover Effect', async () => {
        await renderComponent({ ui: (<BaseMapControl />) });

        const control = screen.getByTestId('base-map-control');
        expect(control).toBeInTheDocument();

        fireEvent.mouseOver(control);
        expect(screen.getByText('ESRI Satellite')).toBeInTheDocument();
        expect(screen.getByText('Open Street Map')).toBeInTheDocument();
      });
      it('unHover Effect', async () => {
        const control = screen.getByTestId('base-map-control');
        fireEvent.mouseOut(control);
        expect(screen.queryByText('ESRI Satellite')).not.toBeInTheDocument();
        expect(screen.queryByText('Open Street Map')).not.toBeInTheDocument();
      });
    });
  });
});
