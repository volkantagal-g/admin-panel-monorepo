import '@test/publicUtils/configureWithoutCleanup';
import AddConstraint from '.';
import { masterCategoriesSelector, bagConstraintSelector } from '../../../redux/selectors';
import { mockedMasterCategories } from '@shared/api/bag/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

const pageUrl = '/marketOrder/bagConstraint/new';
describe('AddConstraint Component', () => {
  beforeAll(() => {
    const spyIsPending = jest.spyOn(bagConstraintSelector, 'getCreateIsPending');
    const spyMasterCategories = jest.spyOn(masterCategoriesSelector, 'getData');
    spyIsPending.mockReturnValue(false);
    spyMasterCategories.mockReturnValue(mockedMasterCategories);
  });

  it('should render AddConstraint page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_MARKET_BAG_CONSTRAINT_NEW,
      pageUrl,
      pageComponent: AddConstraint,
    });
    await waitPageToRenderSomething();
  });
});
