import React from 'react';

import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInformation from '.';

describe('<GeneralInformation />', () => {
  const props = {
    name: 'name',
    gsm: '+905555555555',
    personalGsm: '+905555555556',
    username: 'tms_driver',
    isLoggedIn: true,
    status: 300,
    createdAt: new Date().toISOString(),
    isActivated: true,
  };

  const setup = async (node: React.ReactElement) => {
    return renderComponent({
      ui: node,
      rtlOptions: {},
    });
  };

  it('should render correctly', async () => {
    await setup(<GeneralInformation {...props} />);

    const card = screen.getByTestId('general-information-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('General Information')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Gsm')).toBeInTheDocument();
    expect(screen.getByText('Personal Gsm')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Created At:')).toBeInTheDocument();
    expect(screen.getByText('Activeness:')).toBeInTheDocument();
    expect(screen.getByText('Logged in?:')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
  });

  it('should render correctly when not active and not logged in', async () => {
    const newProps = {
      ...props,
      isActivated: false,
      isLoggedIn: false,
    };

    await setup(<GeneralInformation {...newProps} />);

    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});
