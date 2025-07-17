import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { getAuditFormTypeMock } from '@shared/api/kds/question/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const questionId = '6332e66eed419a1b499816f2';
const initialUrl = `/kds/question/detail/${questionId}`;

describe('In Question Detail Page:', () => {
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getAuditFormTypeMock);
      await renderPage({
        pagePermKey: permKey.PAGE_KDS_QUESTION_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Question Detail')).toBeInTheDocument();
      expect(screen.getByText('Question Group')).toBeInTheDocument();
      expect(screen.getByText('Tooltip')).toBeInTheDocument();
      expect(screen.getByText('Question Type')).toBeInTheDocument();
      expect(screen.getByText('Responsible Domain')).toBeInTheDocument();
      expect(screen.getByText('Ask To Store Conversion Warehouses')).toBeInTheDocument();
      expect(screen.getByText('Audit Form Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Is Photo Forced')).toBeInTheDocument();
      await waitForLoading();
    });
  });
  describe('For page features', () => {
    it('should be able to save everyfield', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      userEvent.click(editButton);
      const [
        questionGroup,
        questionType,
      ] = screen.getAllByRole('combobox');

      userEvent.click(questionGroup);
      const selectedQuestionGroupItem = screen.getByText('testQuestionGroup');
      userEvent.click(selectedQuestionGroupItem);
      await waitForItemToBeSelected('testQuestionGroup');

      const qasQuestionTrInput = screen.getByTestId('name-tr');
      const qasQuestionEngInput = screen.getByTestId('name-en');
      const tooltipTrInput = screen.getByTestId('tooltip-tr');
      const tooltipEngInput = screen.getByTestId('tooltip-en');

      fireEvent.change(qasQuestionTrInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(qasQuestionTrInput).toHaveValue('test title tr');
      });

      fireEvent.change(qasQuestionEngInput, { target: { value: 'test title eng' } });
      await waitFor(() => {
        expect(qasQuestionEngInput).toHaveValue('test title eng');
      });

      fireEvent.change(tooltipTrInput, { target: { value: 'test desc tr' } });
      await waitFor(() => {
        expect(tooltipTrInput).toHaveValue('test desc tr');
      });

      fireEvent.change(tooltipEngInput, { target: { value: 'test desc eng' } });
      await waitFor(() => {
        expect(tooltipEngInput).toHaveValue('test desc eng');
      });

      userEvent.click(questionType);
      const selectedQuestionTypeItem = screen.getByText('Multiple Choice');
      userEvent.click(selectedQuestionTypeItem);
      await waitForItemToBeSelected('Multiple Choice');

      const answerOptionsTrInput = screen.getByTestId('undefined-tr');
      const answerOptionsEngInput = screen.getByTestId('undefined-en');

      fireEvent.change(answerOptionsTrInput, { target: { value: 'test answer tr' } });
      await waitFor(() => {
        expect(answerOptionsTrInput).toHaveValue('test answer tr');
      });

      fireEvent.change(answerOptionsEngInput, { target: { value: 'test answer eng' } });
      await waitFor(() => {
        expect(answerOptionsEngInput).toHaveValue('test answer eng');
      });

      const plusButton = screen.getByRole('button', { name: /plus/i });
      userEvent.click(plusButton);

      const [, answerOptions2TrInput] = screen.getAllByTestId('undefined-tr');
      const [, answerOptions2EngInput] = screen.getAllByTestId('undefined-en');

      fireEvent.change(answerOptions2TrInput, { target: { value: 'test answer2 tr' } });
      await waitFor(() => {
        expect(answerOptions2TrInput).toHaveValue('test answer2 tr');
      });

      fireEvent.change(answerOptions2EngInput, { target: { value: 'test answer2 eng' } });
      await waitFor(() => {
        expect(answerOptions2EngInput).toHaveValue('test answer2 eng');
      });

      const [highlightCheckbox1, highlightCheckbox2] = screen.getAllByLabelText(/Highlight the answer/);

      userEvent.click(highlightCheckbox1);
      await waitFor(() => {
        expect(highlightCheckbox1).toBeChecked();
      });

      userEvent.click(highlightCheckbox2);
      await waitFor(() => {
        expect(highlightCheckbox2).toBeChecked();
      });

      const [
        ,
        ,
        ,
        ,
        auditFormType,
        status,
      ] = screen.getAllByRole('combobox');

      userEvent.click(auditFormType);
      const auditFormTypeItem = screen.getByText('Short Audit');
      userEvent.click(auditFormTypeItem);
      await waitForItemToBeSelected('Short Audit');

      const askForMainWarehouse = screen.getByLabelText(/Ask To Main Warehouse/i);

      userEvent.click(askForMainWarehouse);
      await waitFor(() => {
        expect(askForMainWarehouse).toBeChecked();
      });

      userEvent.click(status);
      const selectedStatusItem = screen.getByText('Inactive');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Inactive');

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('Question Detail')).toBeInTheDocument();
      });
    });
  });
});
