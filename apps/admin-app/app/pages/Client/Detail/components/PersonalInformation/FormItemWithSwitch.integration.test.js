import { cleanup, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { FormItemWithSwitch } from './FormItemWithSwitch';
import renderComponent from '@test/publicUtils/renderComponent';

const handleMarketingCommunications = jest.fn();

describe('FormItemWithSwitch', () => {
  afterAll(cleanup);

  it('should render the FormItem with a switch when loading is true', async () => {
    await renderComponent({
      ui: (
        <FormItemWithSwitch
          attributeKey="isEmailAllowed"
          isCommPrefPending={false}
          commPrefData={{ isEmailAllowed: true }}
          name="email"
          loading
          handleMarketingCommunications={handleMarketingCommunications}
        />
      ),
    });
    await screen.findByText('Email Communication');
    await screen.findByText('Opted In');
    await screen.findByRole('switch');
  });

  it('should render a spinning icon when isCommPrefPending is true', async () => {
    await renderComponent({
      ui: (
        <FormItemWithSwitch
          attributeKey="isEmailAllowed"
          isCommPrefPending
          commPrefData={{ isEmailAllowed: true }}
          name="email"
          loading={false}
          handleMarketingCommunications={handleMarketingCommunications}
        />
      ),
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render a disabled switch when hasValidData is false', async () => {
    await renderComponent({
      ui: (
        <FormItemWithSwitch
          attributeKey="isEmailAllowed"
          isCommPrefPending={false}
          commPrefData={{}}
          name="email"
          loading={false}
          handleMarketingCommunications={handleMarketingCommunications}
        />
      ),
    });
    await screen.findByText('Email Communication');
    await screen.findByRole('switch');
    expect(screen.getByTestId('form-item-switch')).toBeDisabled();
  });

  it('should call handleMarketingCommunications with the correct arguments when switch is changed', async () => {
    await renderComponent({
      ui: (
        <FormItemWithSwitch
          attributeKey="isEmailAllowed"
          isCommPrefPending={false}
          commPrefData={{ isEmailAllowed: true }}
          name="email"
          loading={false}
          handleMarketingCommunications={handleMarketingCommunications}
        />
      ),
    });

    const switchButton = screen.getByRole('switch');
    expect(switchButton).toBeInTheDocument();
    expect(screen.getByText('Opted In')).toBeInTheDocument();

    fireEvent.click(switchButton);
    expect(handleMarketingCommunications).toHaveBeenCalledWith('email', false);
  });
});
