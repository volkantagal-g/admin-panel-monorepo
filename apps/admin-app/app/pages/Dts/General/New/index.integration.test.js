import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSelectDate, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

const initialUrl = '/dts/new';

describe('In Dts Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_DTS_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New Disciplinary Tracking System')).toBeInTheDocument();
      expect(screen.getByText('New Dts')).toBeInTheDocument();
      expect(screen.getByText('Rule Number')).toBeInTheDocument();
      expect(screen.getByText('Rule Description')).toBeInTheDocument();
      expect(screen.getByText('Rule Category')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Employee')).toBeInTheDocument();
      expect(screen.getByText('Feedback Source')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      const statusInvalidError = await screen.findAllByText(/(Invalid\.|Required\.)/);

      expect(statusInvalidError).toHaveLength(6);
    });

    it('should be able to save everyfield', async () => {
      const [
        ruleNumber,
        warehouse,
        employee,
        feedbackSource,
        status,
      ] = screen.getAllByRole('combobox');

      userEvent.click(warehouse);
      const selectedWarehouseItem = await screen.findByText('Gaziemir');
      userEvent.click(selectedWarehouseItem);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(ruleNumber);
      const selectedRuleItem = await screen.findByText('500');
      userEvent.click(selectedRuleItem);
      await waitForItemToBeSelected('500');

      const category = screen.getByDisplayValue('category 1');
      expect(category).toBeInTheDocument();

      const ruleDescription = screen.getByDisplayValue('eyw');
      expect(ruleDescription).toBeInTheDocument();

      const rulePriority = screen.getByDisplayValue('title 1112**');
      expect(rulePriority).toBeInTheDocument();

      userEvent.click(employee);
      fireEvent.change(employee, { target: { value: 'Real Dev' } });

      const employeeName = await screen.findByText('Real Dev');
      userEvent.click(employeeName);
      await waitForItemToBeSelected(/Real Dev/i);

      userEvent.click(feedbackSource);
      const feedbackSourceName = await screen.findByText('angmar 126');
      userEvent.click(feedbackSourceName);
      await waitForItemToBeSelected('angmar 126');

      userEvent.click(status);
      const selectedStatusItem = screen.getByText('Active');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Active');

      const description = screen.getByPlaceholderText('Description');

      fireEvent.change(description, { target: { value: 'test' } });
      await waitFor(() => {
        expect(description).toHaveValue('test');
      });

      const date = screen.getByPlaceholderText('Select date');
      const todayDate = moment().format('DD/MM/YYYY HH:mm');

      expectSelectDate(date, todayDate);

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_DTS_LIST]);
      });
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitForLoading();
      await waitFor(() => {
        expect(screen.queryByText('New Dts')).not.toBeInTheDocument();
      });
    });
  });
});
