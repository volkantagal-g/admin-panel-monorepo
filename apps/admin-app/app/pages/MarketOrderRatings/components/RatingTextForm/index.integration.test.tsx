import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import RatingTextForm from '../..';

describe('RatingTextForm', () => {
  const props = { option: {}, domainType: '1', priority: 1 };

  it('should render RatingTextForm without error', async () => {
    await renderComponent({ ui: <RatingTextForm {...props} /> });
    const placeholderForms = screen.getAllByTestId('tag-placeholder-input');
    expect(placeholderForms[0]).toBeInTheDocument();
  });
});
