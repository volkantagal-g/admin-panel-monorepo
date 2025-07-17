import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const dtsRuleId = '634425eeb00208a86a82a3a0';
const initialUrl = `/dts/rule/detail/${dtsRuleId}`;

describe('In Dts Detail Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_RULE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Disciplinary Tracking System Rule Detail')).toBeInTheDocument();
      expect(screen.getByText('DTS Rule Detail')).toBeInTheDocument();
      expect(screen.getByText('Rule Number')).toBeInTheDocument();
      expect(screen.getByText('Rule Description')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Auto Close Option')).toBeInTheDocument();
      expect(screen.getByText('Auto Close Message')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Rule Detail')).toBeInTheDocument();
      expect(screen.getByText('Rejection Point')).toBeInTheDocument();
      expect(screen.getByText('Warning Point')).toBeInTheDocument();
      expect(screen.getByText('Acceptance Point')).toBeInTheDocument();
      expect(screen.getByText('Default Note')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should cancel button work', async () => {
      const ruleDescriptionTrInput = screen.getByTestId('title-tr');

      expect(ruleDescriptionTrInput).toBeDisabled();

      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      expect(ruleDescriptionTrInput).toBeEnabled();

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      expect(ruleDescriptionTrInput).toBeDisabled();
    });

    it('should be able to save everyfield', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const ruleNumber = screen.getByRole('spinbutton');

      fireEvent.change(ruleNumber, { target: { value: '2312312' } });
      await waitFor(() => {
        expect(ruleNumber).toHaveValue('2312312');
      });

      const ruleDescriptionTrInput = screen.getByTestId('title-tr');
      const ruleDescriptionEngInput = screen.getByTestId('title-en');
      const ruleDetailTrInput = screen.getByTestId('description-tr');
      const ruleDetailEngInput = screen.getByTestId('description-en');

      fireEvent.change(ruleDescriptionTrInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(ruleDescriptionTrInput).toHaveValue('test title tr');
      });

      fireEvent.change(ruleDescriptionEngInput, { target: { value: 'test title eng' } });
      await waitFor(() => {
        expect(ruleDescriptionEngInput).toHaveValue('test title eng');
      });

      fireEvent.change(ruleDetailTrInput, { target: { value: 'rule detail tr' } });
      await waitFor(() => {
        expect(ruleDetailTrInput).toHaveValue('rule detail tr');
      });

      fireEvent.change(ruleDetailEngInput, { target: { value: 'rule detail eng' } });
      await waitFor(() => {
        expect(ruleDetailEngInput).toHaveValue('rule detail eng');
      });

      const [
        category,
        priority,
        autoCloseOption,
        status,
      ] = screen.getAllByRole('combobox');

      userEvent.click(category);
      const selectedCategoryItem = screen.getByText('category 1');
      userEvent.click(selectedCategoryItem);
      await waitForItemToBeSelected('category 1');

      userEvent.click(priority);
      const selectedPriorityItem = screen.getByText('title ddd');
      userEvent.click(selectedPriorityItem);
      await waitForItemToBeSelected('title ddd');

      userEvent.click(autoCloseOption);
      const selectedAutoCloseItem = screen.getByText('Warning');
      userEvent.click(selectedAutoCloseItem);
      await waitForItemToBeSelected('title ddd');

      userEvent.click(status);
      const selectedStatusItem = screen.getByText('Active');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Active');

      const acceptancePoint = screen.getByDisplayValue('17');
      expect(acceptancePoint).toBeInTheDocument();

      const warningPoint = screen.getByDisplayValue('12');
      expect(warningPoint).toBeInTheDocument();

      const rejectionPoint = screen.getByDisplayValue('1');
      expect(rejectionPoint).toBeInTheDocument();

      const autoClosingMessage = screen.getByPlaceholderText('Auto Close Message');

      fireEvent.change(autoClosingMessage, { target: { value: 'auto close message' } });
      await waitFor(() => {
        expect(autoClosingMessage).toHaveValue('auto close message');
      });

      const defaultNote = screen.getByPlaceholderText('Default Note');

      fireEvent.change(defaultNote, { target: { value: 'default note' } });
      await waitFor(() => {
        expect(defaultNote).toHaveValue('default note');
      });

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('DTS Rule Detail')).toBeInTheDocument();
      });
    });
  });
});
