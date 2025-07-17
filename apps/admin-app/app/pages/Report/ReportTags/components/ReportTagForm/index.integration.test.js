// TESTING_PRACTICE_EXAMPLE COMPONENT_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import ReportTagForm from '.';
import { INITIAL_FORM_VALUES } from './formUtils';
import { REPORT_TAG_FORM_MODE } from '../../constants';

const INPUT_TEST_CASES = [
  {
    label: 'Name (TR)',
    expected: 'Örnek İsim',
  },
  {
    label: 'Name (EN)',
    expected: 'Example Name',
  },
  {
    label: 'Description (TR)',
    expected: 'Örnek Açıklama',
  },
  {
    label: 'Description (EN)',
    expected: 'Example Description',
  },
  { label: 'Background Color' },
  { label: 'Text Color' },
  { label: 'Example' },
];

const onCreateFunction = jest.fn();

describe('ReportTagForm in CREATE mode:', () => {
  describe('when no inputs changed', () => {
    it('should render without an error', async () => {
      await renderComponent({
        ui: (
          <ReportTagForm
            initialValues={INITIAL_FORM_VALUES}
            mode={REPORT_TAG_FORM_MODE.NEW}
            canAccessFormActions
            onFormActionClick={onCreateFunction}
          />
        ),
      });
      await screen.findByText(INPUT_TEST_CASES[0].label);
    });

    it('should have disabled submit button', async () => {
      const submitButton = await screen.findByRole('button', { name: 'Create' });
      expect(submitButton).toBeDisabled();
    });
  });
  describe('labels:', () => {
    it.each(INPUT_TEST_CASES)('label ($label) should exist', ({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
  describe('inputs with labels:', () => {
    it.each(INPUT_TEST_CASES)('input ($label) should be editable', ({ label, expected }) => {
      // test cases only for text inputs which have expected field
      if (expected) {
        const input = screen.getByLabelText(label);
        fireEvent.change(input, { target: { value: expected } });
        expect(input.value).toBe(expected);
      }
    });
  });
  describe('clicking submit before filling required inputs:', () => {
    it('should show validation errors', async () => {
      const label1 = INPUT_TEST_CASES[0].label;
      const input1 = screen.getByLabelText(label1);
      fireEvent.change(input1, { target: { value: '' } });
      const label2 = INPUT_TEST_CASES[1].label;
      const input2 = screen.getByLabelText(label2);
      fireEvent.change(input2, { target: { value: '' } });
      const label3 = INPUT_TEST_CASES[2].label;

      const input3 = screen.getByLabelText(label3);
      fireEvent.change(input3, { target: { value: '' } });

      const submitButton = screen.getByRole('button', { name: 'Create' });
      expect(submitButton).toHaveAttribute('type', 'submit');

      userEvent.click(submitButton);
      const alertBox = await screen.findAllByRole('alert');
      expect(alertBox).toHaveLength(3);
      expect(alertBox[0]).toHaveTextContent(/Cannot be empty/);
    });
    it('should not call the submit function', () => {
      expect(onCreateFunction).toBeCalledTimes(0);
    });
  });
  describe('clicking submit after filling required inputs:', () => {
    it('should call the submit function once', async () => {
      const label1 = INPUT_TEST_CASES[0].label;
      const input1 = screen.getByLabelText(label1);
      fireEvent.change(input1, { target: { value: 'test1' } });
      const label2 = INPUT_TEST_CASES[1].label;
      const input2 = screen.getByLabelText(label2);
      fireEvent.change(input2, { target: { value: 'test2' } });
      const label3 = INPUT_TEST_CASES[2].label;
      const input3 = screen.getByLabelText(label3);
      fireEvent.change(input3, { target: { value: 'test3' } });

      const submitButton = screen.getByRole('button', { name: 'Create' });
      userEvent.click(submitButton);
      await waitFor(() => expect(onCreateFunction).toHaveBeenCalledTimes(1));
    });
  });
});
