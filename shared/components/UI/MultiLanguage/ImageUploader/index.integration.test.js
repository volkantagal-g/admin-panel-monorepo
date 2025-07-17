import { screen, cleanup } from '@testing-library/react';

import * as countrySelectionModule from '@shared/redux/selectors/countrySelection';
import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';

import MultiLanguageImageUploader from './index';

describe('<MultiLanguageImageUploader /> Component - Integration Tests', () => {
  afterAll(cleanup);

  it('should render component without error', async () => {
    await renderComponent({ ui: (<MultiLanguageImageUploader />) });
    await screen.findByText('(TR)');
    await screen.findByText('(EN)');
  });

  it('should render correct "cardTitle" successfully', async () => {
    await renderComponent({ ui: (<MultiLanguageImageUploader cardTitle="Test Title" />) });
    await screen.findByText('Test Title (EN)');
    await screen.findByText('Test Title (TR)');
  });

  it('should render correct "cardTitle" for 3 country languages successfully', async () => {
    jest.spyOn(countrySelectionModule, 'getSelectedCountryLanguages').mockReturnValue(['en', 'fr', 'tr']);
    await renderComponent({ ui: (<MultiLanguageImageUploader cardTitle="Test Title" />) });
    await screen.findByText('Test Title (EN)');
    await screen.findByText('Test Title (TR)');
    await screen.findByText('Test Title (FR)');
  });

  it('should render correct "Change Image" button for 3 country languages successfully', async () => {
    const countryLanguages = ['en', 'fr', 'tr'];
    jest.spyOn(countrySelectionModule, 'getSelectedCountryLanguages').mockReturnValue(countryLanguages);
    await renderComponent({ ui: (<MultiLanguageImageUploader />) });
    const buttons = await screen.findAllByRole('button', { name: 'Change Image' });
    expect(buttons).toHaveLength(countryLanguages.length);
  });
});
