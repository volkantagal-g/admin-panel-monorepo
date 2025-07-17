import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { orderDetailSelector } from '../../../../redux/selectors';
import TimelineProgressBar from '.';

describe('Timeline Progress Bar Component', () => {
  let orderDetail = {};
  beforeAll(() => {
    orderDetail = jest.spyOn(orderDetailSelector, 'getData');
  });

  it('should render Timeline Progress Bar Component without error', async () => {
    await renderComponent({ ui: <TimelineProgressBar orderDetail={orderDetail} titleLabel="Timeline Bar" /> });
    const component = screen.getByTestId('timeline-progress-bar');
    expect(component).toBeInTheDocument();
  });
});
