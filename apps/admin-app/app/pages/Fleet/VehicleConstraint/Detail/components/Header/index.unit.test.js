import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import { createStore } from 'redux';

import userEvent from '@testing-library/user-event';

import Header from '.';
import { Creators } from '@app/pages/Fleet/VehicleConstraint/Detail/redux/actions';

const createTestStore = name => createStore(() => ({
  VEHICLE_CONSTRAINT_DETAIL: {
    getVehicleConstraint: {
      isPending: false,
      data: {
        name,
        status: 100,
      },
    },
  },
}));

describe('<Header />', () => {
  let store;

  it('should render correctly', async () => {
    store = createTestStore('Name');
    render(
      <Provider store={store}>
        <Header title="TITLE" />
      </Provider>,
    );

    const actionCreator = jest.spyOn(Creators, 'changeVehicleConstraintActivenessRequest');

    const switchElement = screen.getByRole('switch');
    userEvent.click(switchElement);

    expect(actionCreator).toBeCalledTimes(1);
  });

  it('should render with empty name', async () => {
    store = createTestStore();

    render(
      <Provider store={store}>
        <Header title="TITLE" />
      </Provider>,
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
});
