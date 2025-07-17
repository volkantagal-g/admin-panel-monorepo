import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSelectDate, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getDtsStatusApologyOptions } from '@shared/api/dts/index.mock.handler';

const dtsId = '63455498b00208a86a82a692';
const initialUrl = `/dts/detail/${dtsId}`;

describe('In Dts Detail Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getDtsStatusApologyOptions);
      mockApiPerTestCase(getWarehouseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('Disciplinary Tracking System Detail')).toBeInTheDocument();
      expect(screen.getByText('Dts Detail')).toBeInTheDocument();
      expect(screen.getByText('Rule Number')).toBeInTheDocument();
      expect(screen.getByText('Rule Description')).toBeInTheDocument();
      expect(screen.getByText('Rule Category')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Activeness')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Employee')).toBeInTheDocument();
      expect(screen.getByText('Reporter')).toBeInTheDocument();
      expect(screen.getByText('Created At')).toBeInTheDocument();
      expect(screen.getByText('Feedback Source')).toBeInTheDocument();
      expect(screen.getByText('Waiting for apology')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should cancel button work', async () => {
      const date = screen.getByPlaceholderText('Select date');

      expect(date).toBeDisabled();

      const editButton = await screen.findByText('Edit');
      userEvent.click(editButton);

      expect(date).toBeEnabled();

      const cancelButton = screen.getByText('Cancel');
      userEvent.click(cancelButton);

      expect(date).toBeDisabled();
    });

    it('should be able to save everyfield', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

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
      const selectedStatusItem = screen.getByText('Inactive');
      userEvent.click(selectedStatusItem);
      await waitForItemToBeSelected('Inactive');

      const description = screen.getByPlaceholderText('Description');

      fireEvent.change(description, { target: { value: 'test' } });
      await waitFor(() => {
        expect(description).toHaveValue('test');
      });

      const date = screen.getByPlaceholderText('Select date');
      const todayDate = moment().format('DD/MM/YYYY HH:mm');

      expectSelectDate(date, todayDate);

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();
      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('Dts Detail')).toBeInTheDocument();
      });
    });
  });
});
