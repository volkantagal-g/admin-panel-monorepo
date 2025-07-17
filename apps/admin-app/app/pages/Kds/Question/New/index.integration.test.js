import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getAuditFormTypeMock } from '@shared/api/kds/question/index.mock.handler';

const initialUrl = '/kds/question/new';

describe('In Question Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getAuditFormTypeMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_KDS_QUESTION_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New Question')).toBeInTheDocument();
      expect(screen.getByText('Create Question')).toBeInTheDocument();
      expect(screen.getByText('Question Group')).toBeInTheDocument();
      expect(screen.getByText('QAS Question')).toBeInTheDocument();
      expect(screen.getByText('Tooltip')).toBeInTheDocument();
      expect(screen.getByText('Question Type')).toBeInTheDocument();
      expect(screen.getByText('Responsible Domain')).toBeInTheDocument();
      expect(screen.getByText('Ask To Store Conversion Warehouses')).toBeInTheDocument();
      expect(screen.getByText('Audit Form Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Is Photo Forced')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Create');
      userEvent.click(submitButton);
      const requiredErrorMessages = await screen.findAllByText('Required.');
      const statusInvalidError = await screen.findByText('Invalid.');

      expect(statusInvalidError).toBeInTheDocument();
      expect(requiredErrorMessages).toHaveLength(6);
    });
    it('should be able to save everyfield', async () => {
      const [
        questionGroup,
        questionType,
        responsibleDomain,
        auditFormType,
        status,
      ] = screen.getAllByRole('combobox');

      userEvent.click(questionGroup);
      const selectedQuestionGroupItem = screen.getByText('berktest2');
      userEvent.click(selectedQuestionGroupItem);
      await waitForItemToBeSelected('berktest2');

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
      const multipleChoiceItem = screen.getByText(/Multiple Choice/);
      userEvent.click(multipleChoiceItem);
      await waitForItemToBeSelected(/Multiple Choice/);

      const notApplicableOptionAvailable = screen.getByLabelText(/Add Not Applicable As Option/);

      userEvent.click(notApplicableOptionAvailable);
      await waitFor(() => {
        expect(notApplicableOptionAvailable).toBeChecked();
      });

      const [answerOptions1TrInput, notApplicableTrInput] = screen.getAllByTestId('undefined-tr');
      const [answerOptions1EngInput, notApplicableEngInput] = screen.getAllByTestId('undefined-en');

      fireEvent.change(answerOptions1TrInput, { target: { value: 'test answer1 tr' } });
      await waitFor(() => {
        expect(answerOptions1TrInput).toHaveValue('test answer1 tr');
      });

      fireEvent.change(answerOptions1EngInput, { target: { value: 'test answer1 eng' } });
      await waitFor(() => {
        expect(answerOptions1EngInput).toHaveValue('test answer1 eng');
      });

      expect(notApplicableTrInput).toBeDisabled();
      expect(notApplicableEngInput).toBeDisabled();

      const [highlightCheckbox1, highlightCheckbox2] = screen.getAllByLabelText(/Highlight the answer/);

      userEvent.click(highlightCheckbox1);
      await waitFor(() => {
        expect(highlightCheckbox1).toBeChecked();
      });

      userEvent.click(highlightCheckbox2);
      await waitFor(() => {
        expect(highlightCheckbox2).toBeChecked();
      });

      userEvent.click(questionType);
      const selectedQuestionTypeItem = screen.getByText('Number Input');
      userEvent.click(selectedQuestionTypeItem);
      await waitForItemToBeSelected('Number Input');

      const numberOption = screen.getByRole('spinbutton');

      fireEvent.change(numberOption, { target: { value: '1' } });
      await waitFor(() => {
        expect(numberOption).toHaveValue('1');
      });

      userEvent.click(responsibleDomain);
      const selectedDomainItem = screen.getByText('Getir10');
      userEvent.click(selectedDomainItem);
      await waitForItemToBeSelected('Getir10');

      const [askForStoreConversion, askForMainWarehouse, isPhotoForced] = screen.getAllByRole('checkbox');

      userEvent.click(askForStoreConversion);
      await waitFor(() => {
        expect(askForStoreConversion).toBeChecked();
      });

      userEvent.click(askForMainWarehouse);
      await waitFor(() => {
        expect(askForMainWarehouse).toBeChecked();
      });

      const [
        ,
        ,
        ,
        scoreMappingG10,
        scoreMappingSC,
        scoreMappingMainWarehouse,
        ,,
      ] = screen.getAllByRole('combobox');

      userEvent.click(scoreMappingG10);
      const selectedScoreMappingG10Item = screen.getByText('High Priority');
      userEvent.click(selectedScoreMappingG10Item);
      await waitForItemToBeSelected('High Priority');

      userEvent.click(scoreMappingSC);
      const selectedScoreMappingSCItem = screen.getByText('BRK G10123');
      userEvent.click(selectedScoreMappingSCItem);
      await waitForItemToBeSelected('BRK G10123');

      userEvent.click(scoreMappingMainWarehouse);
      const selectedScoreMappingMainWarehouseItem = screen.getByText('nemburMAINTESTENG');
      userEvent.click(selectedScoreMappingMainWarehouseItem);
      await waitForItemToBeSelected('nemburMAINTESTENG');

      userEvent.click(auditFormType);
      const auditFormTypeItem = screen.getByText('Short Audit');
      userEvent.click(auditFormTypeItem);
      await waitForItemToBeSelected('Short Audit');

      userEvent.click(status);
      const selectedStatusItem = screen.getByText('Active');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Active');

      userEvent.click(isPhotoForced);
      await waitFor(() => {
        expect(isPhotoForced).toBeChecked();
      });

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_KDS_QUESTION_LIST]);
      });
      const submitButton = screen.getByText('Create');
      userEvent.click(submitButton);

      await waitForLoading();
      await waitFor(() => {
        expect(screen.queryByText('New Question')).not.toBeInTheDocument();
      });
    });
  });
});
