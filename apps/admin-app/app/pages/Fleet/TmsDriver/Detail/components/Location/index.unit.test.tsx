import React from 'react';

import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DriverLocation from '.';

describe('<DriverLocation />', () => {
  const props = {
    location: {
      type: 'Point',
      coordinates: [
        39.848080495428164,
        32.83206492662429,
      ],
      acc: 5,
      time: '2022-09-02T15:08:06.974Z',
    },
    isPending: false,
  };

  const setup = async (node: React.ReactElement) => {
    return renderComponent({
      ui: node,
      rtlOptions: {},
    });
  };

  it('should render correctly', async () => {
    await setup(<DriverLocation {...props} />);

    const card = screen.getByTestId('driver-location-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Courier Location')).toBeInTheDocument();
  });
});
