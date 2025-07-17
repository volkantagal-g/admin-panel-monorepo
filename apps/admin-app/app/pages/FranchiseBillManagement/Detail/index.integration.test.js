import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText,
} from '@test/publicUtils/assertions';
import { billDetailMock } from '@shared/api/franchiseBillManagement/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import { formatDate } from '@shared/utils/dateHelper';
import { getLocalDateFormat } from '@shared/utils/localization';
import PageComponent from '.';

const exampleBillId = '638ded110ea66309863c364a';
const initialUrl = `/franchiseBillManagement/detail/${exampleBillId}`;

describe('In Franchise Bill Management Detail Page:', () => {
  afterAll(cleanup);
  const { url: billData } = billDetailMock;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Franchise Bill Detail');
    });
  });

  describe('For page features', () => {
    it('should have correct franchise - warehouse indormation card', () => {
      expect(screen.getByText('Franchise - Warehouse Information')).toBeInTheDocument();
      expect(screen.getByText('Franchise')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
    });

    it('should have correct subscription details card', async () => {
      expect(screen.getByText('Subscription Details')).toBeInTheDocument();

      expect(screen.getByText('Provider')).toBeInTheDocument();
      const providerInput = screen.getByPlaceholderText('Provider');
      expect(providerInput).toBeInTheDocument();
      expect(providerInput).toBeDisabled();
      await waitFor(() => {
        expect(providerInput).toHaveValue(billData?.subscriptionDetails?.provider?.name);
      });

      expect(screen.getByText('Subscription Description')).toBeInTheDocument();
      const subscriptionDescriptionInput = screen.getByPlaceholderText('Subscription Description');
      expect(subscriptionDescriptionInput).toBeInTheDocument();
      expect(subscriptionDescriptionInput).toBeDisabled();
      await waitFor(() => {
        expect(subscriptionDescriptionInput).toHaveValue(billData?.subscriptionDetails?.subscriptionDescription?.name);
      });

      expect(screen.getByText('Subscription Model')).toBeInTheDocument();
      const subscriptionModelInput = screen.getByPlaceholderText('Subscription Model');
      expect(subscriptionModelInput).toBeInTheDocument();
      expect(subscriptionModelInput).toBeDisabled();
      await waitFor(() => {
        expect(subscriptionModelInput).toHaveValue(billData?.subscriptionDetails?.subscriptionModel?.name);
      });

      expect(screen.getByText('Contract / ANL Power')).toBeInTheDocument();
      const powerInput = screen.getByPlaceholderText('Contract / ANL Power');
      expect(powerInput).toBeInTheDocument();
      expect(powerInput).toBeDisabled();
      await waitFor(() => {
        expect(powerInput).toHaveValue(billData?.subscriptionDetails?.power);
      });

      expect(screen.getByText('Subscription Start Date')).toBeInTheDocument();
      const startDateInput = screen.getByPlaceholderText('Subscription Start Date');
      expect(startDateInput).toBeInTheDocument();
      expect(startDateInput).toBeDisabled();
      await waitFor(() => {
        expect(startDateInput).toHaveValue(formatDate(billData?.subscriptionDetails?.startDate, getLocalDateFormat()));
      });

      expect(screen.getByText('Subscription End Date')).toBeInTheDocument();
      const endDateInput = screen.getByPlaceholderText('Subscription End Date');
      expect(endDateInput).toBeInTheDocument();
      expect(endDateInput).toBeDisabled();
      await waitFor(() => {
        expect(endDateInput).toHaveValue(formatDate(billData?.subscriptionDetails?.endDate, getLocalDateFormat()));
      });
    });

    it('should have correct bill details card', async () => {
      expect(screen.getByText('Bill Details')).toBeInTheDocument();

      expect(screen.getByText('First Read Date')).toBeInTheDocument();
      const firstReadDateInput = screen.getByPlaceholderText('First Read Date');
      expect(firstReadDateInput).toBeInTheDocument();
      expect(firstReadDateInput).toBeDisabled();
      await waitFor(() => {
        expect(firstReadDateInput).toHaveValue(formatDate(billData?.billDetails?.firstReadDate, getLocalDateFormat()));
      });

      expect(screen.getByText('Last Read Date')).toBeInTheDocument();
      const lastReadDateInput = screen.getByPlaceholderText('Last Read Date');
      expect(lastReadDateInput).toBeInTheDocument();
      expect(lastReadDateInput).toBeDisabled();
      await waitFor(() => {
        expect(lastReadDateInput).toHaveValue(formatDate(billData?.billDetails?.lastReadDate, getLocalDateFormat()));
      });

      expect(screen.getByText('Total Consumption')).toBeInTheDocument();
      const totalConsumptionInput = screen.getByPlaceholderText('Total Consumption');
      expect(totalConsumptionInput).toBeInTheDocument();
      expect(totalConsumptionInput).toBeDisabled();
      await waitFor(() => {
        expect(totalConsumptionInput).toHaveValue(billData?.billDetails?.totalConsumption);
      });

      expect(screen.getByText('Day')).toBeInTheDocument();
      const dayInput = screen.getByPlaceholderText('Day');
      expect(dayInput).toBeInTheDocument();
      expect(dayInput).toBeDisabled();
      await waitFor(() => {
        expect(totalConsumptionInput).toHaveValue(billData?.billDetails?.day);
      });

      expect(screen.getByText('Peak')).toBeInTheDocument();
      const peakInput = screen.getByPlaceholderText('Peak');
      expect(peakInput).toBeInTheDocument();
      expect(peakInput).toBeDisabled();
      await waitFor(() => {
        expect(peakInput).toHaveValue(billData?.billDetails?.peak);
      });

      expect(screen.getByText('Night')).toBeInTheDocument();
      const nightInput = screen.getByPlaceholderText('Night');
      expect(nightInput).toBeInTheDocument();
      expect(nightInput).toBeDisabled();
      await waitFor(() => {
        expect(nightInput).toHaveValue(billData?.billDetails?.night);
      });

      expect(screen.getByText('Agreement Power')).toBeInTheDocument();
      const agreementPowerInput = screen.getByPlaceholderText('Agreement Power');
      expect(agreementPowerInput).toBeInTheDocument();
      expect(agreementPowerInput).toBeDisabled();
      await waitFor(() => {
        expect(agreementPowerInput).toHaveValue(billData?.billDetails?.agreementPower);
      });

      expect(screen.getByText('Demand')).toBeInTheDocument();
      const demandInput = screen.getByPlaceholderText('Demand');
      expect(demandInput).toBeInTheDocument();
      expect(demandInput).toBeDisabled();
      await waitFor(() => {
        expect(demandInput).toHaveValue(billData?.billDetails?.demand);
      });

      expect(screen.getByText('Reactive')).toBeInTheDocument();
      const reactiveInput = screen.getByPlaceholderText('Reactive');
      expect(reactiveInput).toBeInTheDocument();
      expect(reactiveInput).toBeDisabled();
      await waitFor(() => {
        expect(reactiveInput).toHaveValue(billData?.billDetails?.reactive);
      });

      expect(screen.getByText('Number of Days')).toBeInTheDocument();
      const numberOfDaysInput = screen.getByPlaceholderText('Number of Days');
      expect(numberOfDaysInput).toBeInTheDocument();
      expect(numberOfDaysInput).toBeDisabled();
      await waitFor(() => {
        expect(numberOfDaysInput).toHaveValue(billData?.billDetails?.numberOfDays);
      });

      expect(screen.getByText('Tax & Fund')).toBeInTheDocument();
      const taxInput = screen.getByPlaceholderText('Tax & Fund');
      expect(taxInput).toBeInTheDocument();
      expect(taxInput).toBeDisabled();
      await waitFor(() => {
        expect(taxInput).toHaveValue(billData?.billDetails?.taxFund);
      });

      expect(screen.getByText('Energy Cost')).toBeInTheDocument();
      const energyCostInput = screen.getByPlaceholderText('Energy Cost');
      expect(energyCostInput).toBeInTheDocument();
      expect(energyCostInput).toBeDisabled();
      await waitFor(() => {
        expect(energyCostInput).toHaveValue(billData?.billDetails?.energyCost);
      });

      expect(screen.getByText('Penalty Cost')).toBeInTheDocument();
      const penaltyCostInput = screen.getByPlaceholderText('Penalty Cost');
      expect(penaltyCostInput).toBeInTheDocument();
      expect(penaltyCostInput).toBeDisabled();
      await waitFor(() => {
        expect(penaltyCostInput).toHaveValue(billData?.billDetails?.penaltyCost);
      });

      expect(screen.getByText('Total Amount')).toBeInTheDocument();
      const totalAmountInput = screen.getByPlaceholderText('Total Amount');
      expect(totalAmountInput).toBeInTheDocument();
      expect(totalAmountInput).toBeDisabled();
      await waitFor(() => {
        expect(totalAmountInput).toHaveValue(billData?.billDetails?.totalAmount);
      });

      expect(screen.getAllByText('Bill File').length).toBe(2);
    });
  });
});
