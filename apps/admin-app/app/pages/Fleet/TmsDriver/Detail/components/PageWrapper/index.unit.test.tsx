import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import { when } from 'jest-when';

import PageWrapper from '.';
import { tmsDriverSelector } from '@app/pages/Fleet/TmsDriver/Detail/redux/selectors';

const mockData = {
  name: 'name',
  gsm: '+905555555555',
  personalGsm: '+905555555556',
  username: 'tms_driver',
  isLoggedIn: true,
  status: 300,
  createdAt: new Date().toISOString(),
  isActivated: true,
  location: {
    type: 'Point',
    coordinates: [
      39.848080495428164,
      32.83206492662429,
    ],
    acc: 5,
    time: '2022-09-02T15:08:06.974Z',
  },
  statusLastChangedAt: new Date().toISOString(),
};

jest.mock('react-redux', () => {
  return { ...jest.requireActual('react-redux'), useSelector: jest.fn() };
});

jest.mock('@app/pages/Fleet/TmsDriver/Detail/components/Header', () => {
  return jest.fn(() => <div data-testid="header" />);
});

jest.mock('@app/pages/Fleet/TmsDriver/Detail/components/Location', () => {
  return jest.fn(() => <div data-testid="location" />);
});

jest.mock('@app/pages/Fleet/TmsDriver/Detail/components/GeneralInformation', () => {
  return jest.fn(() => <div data-testid="general-information" />);
});

describe('<PageWrapper />', () => {
  let useSelector: typeof import('react-redux').useSelector;
  let Header: typeof import('@app/pages/Fleet/TmsDriver/Detail/components/Header');
  let DriverLocation: typeof import('@app/pages/Fleet/TmsDriver/Detail/components/Location');
  let GeneralInformation: typeof import('@app/pages/Fleet/TmsDriver/Detail/components/GeneralInformation');

  beforeAll(async () => {
    useSelector = (await import('react-redux')).useSelector;
    Header = await import('@app/pages/Fleet/TmsDriver/Detail/components/Header');
    DriverLocation = await import('@app/pages/Fleet/TmsDriver/Detail/components/Location');
    GeneralInformation = await import('@app/pages/Fleet/TmsDriver/Detail/components/GeneralInformation');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render child components when isPending is true and driver is undefined', async () => {
    when(useSelector).calledWith(tmsDriverSelector.getIsPending).mockReturnValue(true);
    when(useSelector).calledWith(tmsDriverSelector.getData).mockReturnValue(undefined);
    const { container } = render(<PageWrapper />);
    expect(container).toBeInTheDocument();

    expect(Header).not.toBeCalled();
    expect(DriverLocation).not.toBeCalled();
    expect(GeneralInformation).not.toBeCalled();
  });

  it('should render child components with right props when isPending is false and driver is defined', async () => {
    when(useSelector).calledWith(tmsDriverSelector.getIsPending).mockReturnValue(false);
    when(useSelector).calledWith(tmsDriverSelector.getData).mockReturnValue(mockData);
    const { container, getByTestId } = render(<PageWrapper />);
    expect(container).toBeInTheDocument();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toBeInTheDocument();
    expect(screen.getByTestId('general-information')).toBeInTheDocument();

    expect(Header).toHaveBeenCalledWith(expect.objectContaining({
      name: mockData.name,
      statusLastChangedAt: mockData.statusLastChangedAt,
    }), {});
    expect(DriverLocation).toHaveBeenCalledWith(
      expect.objectContaining({ location: mockData.location, isPending: false }),
      {},
    );
    expect(GeneralInformation).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockData.name,
        gsm: mockData.gsm,
        personalGsm: mockData.personalGsm,
        username: mockData.username,
        createdAt: mockData.createdAt,
        status: mockData.status,
        isLoggedIn: mockData.isLoggedIn,
        isActivated: mockData.isActivated,
      }),
      {},
    );
  });
});
