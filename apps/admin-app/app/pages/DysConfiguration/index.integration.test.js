import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, fireEvent, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, expectToHavePageHeaderText } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import { formattedRequestBody } from './utils';
import { formattedMockedDysConfigs, marketValues, mockedDysConfigs } from '@shared/api/dys/index.mock.data';
import PageComponent from '.';

const initialUrl = '/dysConfigs';

describe('In DYS Configs Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DYS_CONFIGS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Field Performance', 'SPS Configurations']);
    });
    it('should have correct page content', () => {
      expectToHavePageHeaderText('Store Performance System Configurations');
      expect(screen.getByLabelText('SES (%)')).toBeInTheDocument();
      expect(screen.getByLabelText('STS (%)')).toBeInTheDocument();
      expect(screen.getByLabelText('DTS (%)')).toBeInTheDocument();
      expect(screen.getByLabelText('QAS (%)')).toBeInTheDocument();
      expect(screen.getByLabelText('GetirMarket')).toBeInTheDocument();
      expect(screen.getByLabelText('GetirWater')).toBeInTheDocument();
      expect(screen.getByLabelText('Store Conversion')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
    it('should inputs disabled initially.', async () => {
      expect(screen.getByLabelText('SES (%)')).toBeDisabled();
      expect(screen.getByLabelText('STS (%)')).toBeDisabled();
      expect(screen.getByLabelText('DTS (%)')).toBeDisabled();
      expect(screen.getByLabelText('QAS (%)')).toBeDisabled();
    });
  });
  describe('For page features', () => {
    it('should all inputs render correctly', async () => {
      const ddsInput = screen.getByLabelText('SES (%)');
      const stsInput = screen.getByLabelText('STS (%)');
      const dtsInput = screen.getByLabelText('DTS (%)');
      const kdsInput = screen.getByLabelText('QAS (%)');

      await waitFor(() => {
        expect(ddsInput).toHaveValue('30');
      });
      await waitFor(() => {
        expect(stsInput).toHaveValue('30');
      });
      await waitFor(() => {
        expect(dtsInput).toHaveValue('20');
      });
      await waitFor(() => {
        expect(kdsInput).toHaveValue('20');
      });
    });
    it('should all inputs change correctly', async () => {
      const ddsInput = screen.getByLabelText('SES (%)');
      const stsInput = screen.getByLabelText('STS (%)');
      const dtsInput = screen.getByLabelText('DTS (%)');
      const kdsInput = screen.getByLabelText('QAS (%)');

      fireEvent.change(ddsInput, { target: { value: '15' } });
      fireEvent.change(stsInput, { target: { value: '25' } });
      fireEvent.change(dtsInput, { target: { value: '20' } });
      fireEvent.change(kdsInput, { target: { value: '40' } });
      await waitFor(() => {
        expect(ddsInput).toHaveValue('15');
      });
      await waitFor(() => {
        expect(stsInput).toHaveValue('25');
      });
      await waitFor(() => {
        expect(dtsInput).toHaveValue('20');
      });
      await waitFor(() => {
        expect(kdsInput).toHaveValue('40');
      });
    });
    it('should not accept string value after focus out', async () => {
      const ddsInput = screen.getByLabelText('SES (%)');

      fireEvent.change(ddsInput, { target: { value: 'test' } });
      fireEvent.focusOut(ddsInput);
      await waitFor(() => {
        expect(ddsInput).not.toHaveValue('test');
      });
    });
    it('should values formatted', async () => {
      expect(formattedRequestBody(marketValues, mockedDysConfigs, 'market')).toStrictEqual(formattedMockedDysConfigs);
    });
    it('should return error when values sum bigger than 100', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });
      expect(saveButton).toBeInTheDocument();

      const ddsInput = screen.getByLabelText('SES (%)');
      fireEvent.change(ddsInput, { target: { value: '60' } });

      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('Only integer values must be entered and the sum of the values must be 100.')).toBeInTheDocument();
      });
    });
    it('should inputs sum must be 100 ', async () => {
      const saveButton = screen.getByText('Save');

      const ddsInput = screen.getByLabelText('SES (%)');
      fireEvent.change(ddsInput, { target: { value: '15' } });

      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(ddsInput).toBeEnabled();
      });
    });

    it('should reset after click cancel ', async () => {
      const ddsInput = screen.getByLabelText('SES (%)');

      const cancelButton = screen.getAllByText('Cancel')[0];
      userEvent.click(cancelButton);

      await waitFor(() => {
        expect(ddsInput).toBeDisabled();
      });
    });
    it('should inputs same ', async () => {
      const editButton = screen.getByText('Edit');
      userEvent.click(editButton);

      let saveButton;
      await waitFor(() => {
        saveButton = screen.getByText('Save');
      });

      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);
      await waitFor(() => {
        const editButtonNew = screen.getByText('Edit');
        expect(editButtonNew).toBeInTheDocument();
      });
    });
    it('should change tabs correctly ', async () => {
      const tab = screen.getByText('GetirWater');
      userEvent.click(tab);

      const ddsInput = screen.getByLabelText('SES (%)');

      await waitFor(() => {
        expect(ddsInput).toHaveValue('90');
      });
    });
  });
});
