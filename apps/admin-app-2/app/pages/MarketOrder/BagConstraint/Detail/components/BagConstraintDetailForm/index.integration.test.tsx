import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import BagConstraintDetail from '.';
import {
  masterCategoriesSelector,
  bagConstraintSelector,
} from '../../../redux/selectors';
import {
  mockedBagConstraints,
  mockedMasterCategories,
} from '@shared/api/bag/index.mock.data';

describe('BagConstraintDetail Component', () => {
  let isModalVisible = false;
  beforeAll(() => {
    const spyIsPending = jest.spyOn(
      bagConstraintSelector,
      'getUpdateIsPending',
    );
    const spyIsBagConstraint = jest.spyOn(bagConstraintSelector, 'getData');
    const spyMasterCategories = jest.spyOn(masterCategoriesSelector, 'getData');
    spyIsPending.mockReturnValue(false);
    spyIsBagConstraint.mockReturnValue(mockedBagConstraints[0]);
    spyMasterCategories.mockReturnValue(mockedMasterCategories);
    isModalVisible = true;
  });
  afterAll(() => {
    isModalVisible = true;
  });

  it('should render BagConstraintDetail Component with no error', async () => {
    await renderComponent({ ui: <BagConstraintDetail onCloseModal={jest.fn} isModalVisible={isModalVisible} />, rtlOptions: {} });
    const component = screen.getByTestId('edit-constraint');
    expect(component).toBeInTheDocument();
  });
});
