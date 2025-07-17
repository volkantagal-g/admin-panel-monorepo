import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { getRatingTagsSelector } from '../../../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrders } from '@shared/api/marketOrderAnalytics/index.mock.data';
import RatingTagsComponent from '../..';
import { mockedRatingOptions } from '@shared/api/marketOrderRatings/index.mock.data';

describe('RatingTagsComponent', () => {
  const props = {
    tags: mockedRatingOptions[1].tags,
    onUpdateTag: jest.fn,
    classes: {},
    onDeleteTag: jest.fn,
    t: jest.fn,
    onDrop: jest.fn,
  };
  beforeAll(() => {
    const spyRatingOptions = jest.spyOn(getRatingTagsSelector, 'getData');
    const spyIsPending = jest.spyOn(getRatingTagsSelector, 'getIsPending');
    spyRatingOptions.mockReturnValue(mockedMarketOrders);
    spyIsPending.mockReturnValue(false);
  });

  it('should render RatingTagsComponent without an error', async () => {
    await renderComponent({ ui: <RatingTagsComponent {...props} /> });
    const ratingsTree = screen.getByTestId('rating-options-form');
    expect(ratingsTree).toBeInTheDocument();
  });
});
