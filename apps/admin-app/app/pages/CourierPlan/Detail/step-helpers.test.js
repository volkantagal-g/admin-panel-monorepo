import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

let originalLocation;
export const mockReload = jest.fn();

beforeAll(() => {
  originalLocation = window.location;
  delete window.location;
  window.location = { ...originalLocation, reload: mockReload };
});

afterAll(() => {
  window.location = originalLocation;
  cleanup();
});

describe('Common Step functionality helpers', () => it('Reload mock is defined and callable', () => {
  window.location.reload();
  expect(mockReload).toBeCalled();
}));

export const expectExpandedStepToBe = stepName => {
  const tab = screen.getByRole('tab', { expanded: true });
  expect(tab).toHaveTextContent(stepName);
  const panel = screen.getAllByRole('tabpanel').pop();
  return [tab, panel];
};

export const btnBack = tabpanel => within(tabpanel).getByRole('button', { name: 'Back' });
export const btnSave = tabpanel => within(tabpanel).getByRole('button', { name: 'Save' });
export const btnPublish = tabpanel => within(tabpanel).getByRole('button', { name: 'Publish' });
export const btnSaveYes = () => within(screen.getByRole('tooltip')).getByRole('button', { name: 'Yes' });
export const btnContinue = tabpanel => within(tabpanel).getByRole('button', { name: 'Continue' });

export const stepNames = {
  1: 'Step 1: Forecasting',
  2: 'Step 2: TTP / OTP Ideal Plan',
  3: 'Step 3: Shifted Plan',
  4: 'Step 4: Publication',
};
