import React from 'react';

import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from '.';

describe('<Header />', () => {
  const props = {
    name: 'John Doe',
    statusLastChangedAt: new Date().toISOString(),
  };

  const setup = async (node: React.ReactElement) => {
    return renderComponent({
      ui: node,
      rtlOptions: {},
    });
  };

  it('should render correctly', async () => {
    await setup(<Header {...props} />);

    expect(screen.getByText('John Doe - Driver Detail')).toBeInTheDocument();
    expect(screen.getByText(/^Last Status Change/)).toBeInTheDocument();
  });
});
