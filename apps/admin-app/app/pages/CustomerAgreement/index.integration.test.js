import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { documentTypeSelector } from '@app/pages/CustomerAgreement/redux/selectors';
import PageComponent from '.';

const initialUrl = '/customerAgreement';

describe('Customer Agreement Page:', () => {
  beforeAll(() => {
    jest.spyOn(documentTypeSelector, 'getSelected').mockReturnValue(100);
  });

  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_CUSTOMER_AGREEMENT,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
  it('should render page header', async () => {
    expectToHavePageHeaderText('Customer Agreement');
  });

  it('should render core elements', async () => {
    expect(screen.getByText('Latest Agreements')).toBeInTheDocument();
  });

  it('won\'t show add agreement button without permissions', async () => {
    expect(screen.queryByRole('button', { name: 'Add Agreement' })).not.toBeInTheDocument();
  });
  it('shows add agreement button without permissions', async () => {
    const { addUserPermissions } = renderResult;
    addUserPermissions([permKey.PAGE_CUSTOMER_AGREEMENT_ADD_AGREEMENT]);

    expect(screen.getByText('Add Agreement')).toBeInTheDocument();
  });
  it('shows add agreement modal', async () => {
    const addAgreementButton = screen.getByText('Add Agreement');
    userEvent.click(addAgreementButton);
    expect(screen.getAllByText('Add Agreement')).toHaveLength(2); // "Add Agreement" modal header

    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Agreement File')).toBeInTheDocument();
  });
});
