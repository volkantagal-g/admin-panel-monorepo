import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/dts/rule/new';

describe('In Dts Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_RULE_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New Disciplinary Tracking System Rule')).toBeInTheDocument();
      expect(screen.getByText('New DTS Rule')).toBeInTheDocument();
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
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);
      const requiredErrorMessages = await screen.findAllByText('Required.');
      const statusInvalidError = await screen.findAllByText('Invalid.');

      expect(statusInvalidError).toHaveLength(4);
      expect(requiredErrorMessages).toHaveLength(4);
    });

    it('should be able to save everyfield', async () => {
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

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_RULE_LIST]);
      });
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitForLoading();
      await waitFor(() => {
        expect(screen.queryByText('New DTS Rule')).not.toBeInTheDocument();
      });
    });
  });
});
