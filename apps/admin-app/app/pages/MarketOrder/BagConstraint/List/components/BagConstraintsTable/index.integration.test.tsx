import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import BagConstraintsTable from '.';
import { mockedBagConstraints, mockedMasterCategories } from '@shared/api/bag/index.mock.data';
import { bagConstraintsSelector, masterCategoriesSelector } from '../../../redux/selectors';

describe('Bag Constraints Table Component', () => {
  beforeAll(() => {
    const spyBagConstraints = jest.spyOn(bagConstraintsSelector, 'getData');
    const spyIsPending = jest.spyOn(bagConstraintsSelector, 'getIsPending');
    const spyMasterCategories = jest.spyOn(masterCategoriesSelector, 'getData');
    spyBagConstraints.mockReturnValue(mockedBagConstraints);
    spyIsPending.mockReturnValue(false);
    spyMasterCategories.mockReturnValue(mockedMasterCategories);
  });

  it('should render Bag Constraints Table Component with no error', async () => {
    await renderComponent({ ui: <BagConstraintsTable />, rtlOptions: {} });
    const component = screen.getByTestId('bag-constraints-table');
    expect(component).toBeInTheDocument();
  });
});
