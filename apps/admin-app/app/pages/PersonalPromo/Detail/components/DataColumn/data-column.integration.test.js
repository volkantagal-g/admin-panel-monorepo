import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import DataColumn from '.';

const mockDocument = {
  name: 'Test',
  amount: 12,
  description: {
    en: 'Some description in EN',
    tr: 'TR bazı açıklamalar',
  },
  status: 2,
};

describe('[PersonalPromo Detail] DataColumn Component', () => {
  it('should render basic column', async () => {
    await renderComponent({
      ui: (
        <DataColumn
          data={{
            label: 'Username',
            attribute: 'name',
          }}
          document={mockDocument}
        />
      ),
    });

    const label = screen.queryByText('Username');
    const value = screen.queryByText('Test');

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('should render column with custom format', async () => {
    await renderComponent({
      ui: (
        <DataColumn
          data={{
            label: 'Total Amount',
            attribute: 'amount',
            render: amount => (
              <>^^{amount}^^</>
            ),
          }}
          document={mockDocument}
        />
      ),
    });

    const label = screen.queryByText('Total Amount');
    const value = screen.queryByText('^^12^^');

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('should render column with translation', async () => {
    await renderComponent({
      ui: (
        <DataColumn
          data={{
            label: 'Cool description',
            attribute: 'description',
            hasTranslation: true,
          }}
          document={mockDocument}
        />
      ),
    });

    const label = screen.queryByText('Cool description');
    const value = screen.queryByText('Some description in EN');

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('should render column with actions', async () => {
    const changeStatusActionHandlerMock = jest.fn();
    await renderComponent({
      ui: (
        <DataColumn
          data={{
            label: 'STATUS',
            attribute: 'status',
            actions: [{
              show: true,
              label: 'Change Status',
              handler: changeStatusActionHandlerMock,
            }, {
              show: false,
              label: 'Hidden action',
              handler: jest.fn(),
            }],
          }}
          document={mockDocument}
        />
      ),
    });

    const changeStatusActionButton = screen.queryByRole('button', { name: 'Change Status' });

    expect(changeStatusActionButton).toBeInTheDocument();
    userEvent.click(changeStatusActionButton);
    expect(changeStatusActionHandlerMock).toHaveBeenCalled();

    const hiddenAction = screen.queryByText('Hidden action');
    expect(hiddenAction).not.toBeInTheDocument();
  });
});
