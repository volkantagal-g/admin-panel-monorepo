import { render, screen, waitFor, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import userEvent from '@testing-library/user-event';

import { expectSelectDate } from '@test/publicUtils/assertions';

import { Creators } from '../../redux/actions';
import Filter from '.';
import { testDateRange } from '@shared/api/payoutsForDomains/index.mock.data';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('PayoutsForDomains Filter component', () => {
  beforeEach(() => {
    useDispatch.mockReset();
    useSelector.mockReset();
  });
  it('should send correct data via getPayoutReportsRequest', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const mockIsPending = false;
    useSelector.mockReturnValue(mockIsPending);

    render(<Filter />);
    const startTime = testDateRange[0];
    const endTime = testDateRange[1];
    const submitButton = screen.getByRole('button', { name: /bring/i });
    const datePicker = screen.getByTestId('payouts-date-filter');
    await waitFor(() => {
      expect(datePicker).toBeEnabled();
    });
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    const checkoutStartDatePicker = within(datePicker).getByPlaceholderText(/Start date/i);
    const checkoutEndDatePicker = within(datePicker).getByPlaceholderText(/End date/i);

    expectSelectDate(checkoutStartDatePicker, startTime);
    expectSelectDate(checkoutEndDatePicker, endTime);

    userEvent.click(submitButton);
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      Creators.getPayoutReportsRequest({
        filters: {
          startTime: moment(startTime).utc().startOf('day').toDate(),
          endTime: moment(endTime).utc().endOf('day').toDate(),
        },
      }),
    );
  });
});
