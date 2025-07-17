import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import PageComponent from '.';

const initialUrl = '/countrySelection';

describe('In Component New Page:', () => {
  beforeAll(() => {
    jest.spyOn(countriesSelector, 'getData').mockReturnValue(mockedCountries);
  });

  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_COUNTRY_SELECTION,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    expect(screen.getByText('Select Country')).toBeInTheDocument();
  });
  it('should display operational countries', async () => {
    const countries = mockedCountries.filter(country => country.operational);
    countries.forEach(country => {
      expect(screen.getByText(country.name.en)).toBeInTheDocument();
    });
  });
  it('should display non operational countries', async () => {
    const seeOldCountriesLink = screen.getByText(/See old countries/);
    userEvent.click(seeOldCountriesLink);
    const countries = mockedCountries.filter(country => !country.operational && country.wasOperational);
    countries.forEach(country => {
      expect(screen.getByText(country.name.en)).toBeInTheDocument();
    });
  });
});
