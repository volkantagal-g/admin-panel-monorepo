import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import BalloonContent from '@shared/components/GIS/Maps/components/balloonContent';
import renderComponent from '@test/publicUtils/renderComponent';

import { mockedWarehouses } from '@shared/api/warehouse/index.mock.data';

const mockedWH = mockedWarehouses[0];

describe('In Balloon Content Component', () => {
  afterAll(cleanup);
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<BalloonContent warehouse={mockedWH} />) });
    expect(screen.getByText(mockedWH.name)).toBeInTheDocument();
  });
});
