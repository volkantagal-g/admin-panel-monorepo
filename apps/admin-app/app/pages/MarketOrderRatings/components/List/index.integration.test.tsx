import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { getRatingTagsSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import RatingsOptions from '.';
import { mockedRatingOptions } from '@shared/api/marketOrderRatings/index.mock.data';

describe('Ratings Option Component', () => {
  beforeAll(() => {
    const spyRatingOptions = jest.spyOn(getRatingTagsSelector, 'getData');
    const spyIsPending = jest.spyOn(getRatingTagsSelector, 'getIsPending');
    spyRatingOptions.mockReturnValue(mockedRatingOptions);
    spyIsPending.mockReturnValue(false);
  });

  it('should render RatingsOptions without error', async () => {
    await renderComponent({ ui: <RatingsOptions /> });
    const ratingsForm = screen.getByTestId('rating-options-form');
    expect(ratingsForm).toBeInTheDocument();
  });
});
