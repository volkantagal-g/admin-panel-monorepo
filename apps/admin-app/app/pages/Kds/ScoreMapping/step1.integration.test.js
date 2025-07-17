import '@test/publicUtils/configureWithoutCleanup';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
  expectToHavePageHeaderText,
} from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getScoreMappingMockOptions } from '@shared/api/kds/scoreMapping/index.mock.handler';

const initialUrl = '/kds/scoreMapping';

describe('In Score Mapping Page:', () => {
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getScoreMappingMockOptions);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_KDS_SCORE_MAPPING,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Store Audit', 'Score Mapping']);
      await waitForLoading();
    });
    it('should have correct page content', async () => {
      expectToHavePageHeaderText('Score Mapping');
      expect(screen.getByText('Score Mapping Table')).toBeInTheDocument();
      expect(screen.getByText('G10 Warehouses')).toBeInTheDocument();
      expect(screen.getByText('GetirMore Warehouses')).toBeInTheDocument();
      expect(screen.getByText('Water Warehouses')).toBeInTheDocument();
      expect(screen.getByText('Store Conversion Warehouses')).toBeInTheDocument();
      expect(screen.getByText('Main Warehouses')).toBeInTheDocument();
    });

    it('tab should be selected and first dropdown open', async () => {
      const [multipleChoiceTab] = screen.getAllByRole('tab', { selected: true });
      expect(multipleChoiceTab).toHaveTextContent('Mapping for multiple choice questions');

      const g10WarehousesButton = screen.getByRole('button', { expanded: true });
      expect(g10WarehousesButton).toHaveTextContent('G10 Warehouses');
    });
  });

  describe('For page features', () => {
    it('should clicked tab expand', () => {
      const getirMoreText = screen.getByText('GetirMore Warehouses');
      userEvent.click(getirMoreText);

      const [, gMoreButton] = screen.getAllByRole('button', { expanded: true });
      expect(gMoreButton).toHaveTextContent('GetirMore Warehouses');
    });

    it('should cancel button work', async () => {
      const [answerOptionsTrInput] = screen.getAllByTestId('undefined-tr');

      expect(answerOptionsTrInput).toBeDisabled();

      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      expect(answerOptionsTrInput).toBeEnabled();

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      expect(answerOptionsTrInput).toBeDisabled();
    });

    it('should new line added', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      const [plusButton] = screen.getAllByRole('button', { name: /plus/i });
      userEvent.click(plusButton);

      const [answerOptions1TrInput, answerOptionsNewTrInput] = screen.getAllByTestId('undefined-tr');
      const [answerOptions1EngInput, answerOptionsNewEngInput] = screen.getAllByTestId('undefined-en');

      fireEvent.change(answerOptionsNewTrInput, { target: { value: 'test answer tr' } });
      await waitFor(() => {
        expect(answerOptionsNewTrInput).toHaveValue('test answer tr');
      });

      fireEvent.change(answerOptionsNewEngInput, { target: { value: 'test answer eng' } });
      await waitFor(() => {
        expect(answerOptionsNewEngInput).toHaveValue('test answer eng');
      });

      const [,, minInput, maxInput] = screen.getAllByRole('spinbutton');

      fireEvent.change(minInput, { target: { value: '1' } });
      await waitFor(() => {
        expect(minInput).toHaveValue('1');
      });

      fireEvent.change(maxInput, { target: { value: '2' } });
      await waitFor(() => {
        expect(maxInput).toHaveValue('2');
      });

      expect(answerOptions1TrInput).toHaveValue('g10 test tr');
      expect(answerOptions1EngInput).toHaveValue('g10 test en');

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_KDS_SCORE_MAPPING]);
      });

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitForLoading();

      expect(screen.getByText('Score Mapping Table')).toBeInTheDocument();
    });
  });
});
