import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';

const storeAuditId = '63342e487086141a315782ab';
const initialUrl = `/kds/storeAudit/detail/${storeAuditId}`;
describe('In Store Audit (In Progress Status) Detail Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_STORE_AUDIT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Store Audit Detail')).toBeInTheDocument();
      expect(screen.getByText('Gaziemir')).toBeInTheDocument();
      expect(screen.getByText('Expand All')).toBeInTheDocument();
      expect(screen.getByText('01March Question Group_ShortAudit +Long Audit (0/3)')).toBeInTheDocument();
      expect(screen.getByText('01March Question Group_LongAudit (0/2)')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('Inactivate')).toBeInTheDocument();
      expect(screen.queryByText('Set as In Progress')).not.toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should expand button work', async () => {
      const expandAllButton = screen.getByText('Expand All');
      userEvent.click(expandAllButton);

      expect(screen.getByText('Collapse All')).toBeInTheDocument();
    });
    it('should cancel button disable the form', () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      const option1RadioButton = screen.getByLabelText('Option1');
      expect(option1RadioButton).toBeDisabled();
    });
    it('should fill the form', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const [
        question1TextArea,
        question2TextArea,
        question3TextArea,
        question4TextArea,
        question5TextArea,
      ] = screen.getAllByRole('textbox');

      const [
        ,
        spinInput1,
        spinInput2,
        spinInput3,
      ] = screen.getAllByRole('spinbutton');

      const notApplicableRadioButton = screen.getByLabelText('Not Applicable');
      userEvent.click(notApplicableRadioButton);
      expect(notApplicableRadioButton).toBeChecked();

      userEvent.type(question1TextArea, 'test text area 1');

      const option2RadioButton = screen.getByLabelText('Option2');
      userEvent.click(option2RadioButton);
      expect(option2RadioButton).toBeChecked();

      userEvent.type(question2TextArea, 'test text area 2');

      const [, plusButton1, plusButton2, plusButton3] = screen.getAllByRole('button', { name: /Increase Value/i });
      userEvent.click(plusButton1);

      await waitFor(() => {
        expect(spinInput1).toHaveValue(1);
      });

      userEvent.type(question3TextArea, 'test text area 3');

      userEvent.click(plusButton2);

      await waitFor(() => {
        expect(spinInput2).toHaveValue(1);
      });

      userEvent.type(question4TextArea, 'test text area 4');

      userEvent.click(plusButton3);

      await waitFor(() => {
        expect(spinInput3).toHaveValue(1);
      });

      userEvent.type(question5TextArea, 'test text area 5');
    });

    it('should be saved', async () => {
      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);
      const okButton = screen.getByText('OK');
      userEvent.click(okButton);
      await waitForLoading();
      expect(screen.getByText('Store Audit Detail')).toBeInTheDocument();
    });
  });
});
