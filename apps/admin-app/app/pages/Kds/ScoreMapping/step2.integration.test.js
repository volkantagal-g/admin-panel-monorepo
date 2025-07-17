import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

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
import { getNumberInputScoreMapping } from '@shared/api/kds/scoreMapping/index.mock.handler';

const initialUrl = '/kds/scoreMapping';

describe('In Score Mapping Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getNumberInputScoreMapping);
      await renderPage({
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

      const numberInputTabText = screen.getByText('Mapping for number input questions');
      userEvent.click(numberInputTabText);

      const [numberInputTab] = screen.getAllByRole('tab', { selected: true });
      expect(numberInputTab).toHaveTextContent('Mapping for number input questions');

      await waitForLoading();
    });
  });

  // TODO: second case 'should cancel button work' fails randomly on pipeline
  describe.skip('For page features', () => {
    it('should clicked tab expand', () => {
      const [getirMoreText] = screen.getAllByText('GetirMore Warehouses');
      userEvent.click(getirMoreText);

      const [gMoreButton] = screen.getAllByRole('button', { expanded: false });
      expect(gMoreButton).toHaveTextContent('GetirMore Warehouses');
    });

    it('should cancel button work', () => {
      const [, numberNameInput] = screen.getAllByDisplayValue('g10 test tr number');

      expect(numberNameInput).toBeDisabled();

      const [, editButton] = screen.getAllByText('Edit');
      userEvent.click(editButton);

      expect(numberNameInput).toBeEnabled();

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      expect(numberNameInput).toBeDisabled();
    });

    it('should new line added and removed', () => {
      const [, editButton] = screen.getAllByText('Edit');
      userEvent.click(editButton);

      const [plusButton] = screen.getAllByRole('button', { name: /plus/i });
      userEvent.click(plusButton);

      const minusButton = screen.getByRole('button', { name: /minus/i });
      userEvent.click(minusButton);

      expect(minusButton).not.toBeInTheDocument();
    });
  });
});
