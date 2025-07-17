/* eslint-disable testing-library/no-node-access */
import moment from 'moment';
import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { crisisIncidentDetails } from '@shared/api/pickerCrisis/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import { waitForItemToBeSelected } from '@test/publicUtils/assertions';
import { crisisMgmtTopicMap } from '@shared/shared/constantValues';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import IncidentDetails from './index';

const dateFormat = 'YYYY-MM-DD';

const currentUser = {
  _id: '587c9924a1a56d0104072d82',
  name: 'john doe',
};

const control = {
  getNote: () => screen.getByTestId('note'),
  getTopic: () => screen.getByTestId('topic'),
  getRecordedPerson: () => screen.getByTestId('name'),
  getIncidentDate: () => screen.getByTestId('incidentDate'),
  uploadedList: () => screen.queryByTestId('fileList-uploaded'),
  getFileUploader: () => screen.getByTestId('fileList-pending'),
};

jest.mock('@shared/i18n', () => ({
  ...jest.requireActual('@shared/i18n'),
  getLangKey: () => 'en',
}));

describe('Picker Crisis Management: Incident Details', () => {
  describe('Blank canvas', () => {
    afterAll(cleanup);
    it('form is NOT visible when there is undefined/null "data" object', async () => {
      await renderComponent({ ui: <IncidentDetails user={currentUser} /> });
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
    });
  });

  describe('New Entry', () => {
    afterAll(cleanup);
    let renderResult;

    it('form is visible when there is empty "data" object', async () => {
      renderResult = await renderComponent({ ui: <IncidentDetails data={{}} user={currentUser} /> });
      expect(screen.getByText('New Card')).toBeInTheDocument();
      expect(control.getRecordedPerson()).toBeInTheDocument();
      expect(control.getIncidentDate()).toBeInTheDocument();
      expect(control.getTopic()).toBeInTheDocument();
      expect(control.uploadedList()).not.toBeInTheDocument();
      expect(control.getFileUploader()).toBeInTheDocument();
    });

    it('form is/can be populated properly', async () => {
      // CONTROL: Recorded person
      expect(control.getRecordedPerson()).toHaveTextContent(currentUser.name);

      // CONTROL: Incident date
      const now = moment();
      const currentDate = now.format(dateFormat);
      const currentDateNext = now.add(1, 'days').format(dateFormat);
      const currentDatePrev = now.subtract(1, 'days').format(dateFormat);
      const dateElement = () => renderResult.baseElement.querySelector(`td[title="${currentDate}"]`);
      const dateElementNext = () => renderResult.baseElement.querySelector(`td[title="${currentDateNext}"]`);
      const dateElementPrev = () => renderResult.baseElement.querySelector(`td[title="${currentDatePrev}"]`);

      // should NOT be able to select the next date
      userEvent.click(control.getIncidentDate());
      userEvent.click(dateElementNext());
      expect(control.getIncidentDate().value).toBe(currentDate); // shows current date only for invalid date selection

      // should be able to select the prev date
      userEvent.click(control.getIncidentDate());
      userEvent.click(dateElementPrev());
      expect(control.getIncidentDate().value).toBe(currentDatePrev);

      // should be able to select the current date
      userEvent.click(control.getIncidentDate());
      userEvent.click(dateElement());
      expect(control.getIncidentDate().value).toBe(currentDate);

      // CONTROL: Topic
      const selection = '104';
      const select = control.getTopic().firstElementChild;
      fireEvent.mouseDown(select);
      await waitFor(() => {
        expect(select).toBeEnabled();
      });
      expect(screen.getByText(selection)).toBeInTheDocument();
      userEvent.click(screen.getByText(selection));
      await waitForItemToBeSelected(selection);

      // CONTROL: File uploader
      userEvent.click(control.getFileUploader());
      const uploader = control.getFileUploader();
      const file = new File(['img-content'], 'img.png', { type: 'image/png' });
      fireEvent.change(uploader, { target: { files: [file] } });
      await waitFor(() => {
        expect(uploader.files[0].name).toBe('img.png');
      });

      // CONTROL: Note
      userEvent.type(control.getNote(), 'new note');
      await waitFor(() => {
        expect(control.getNote().value).toBe('new note');
      });

      // SAVE
      userEvent.click(screen.getByText('Save'));

      await waitFor(() => {
        expect(screen.queryByRole('form')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edit Entry', () => {
    afterAll(cleanup);
    const data = crisisIncidentDetails;
    it('form is visible when there is an existing "data" object', async () => {
      await renderComponent({ ui: <IncidentDetails data={data} user={currentUser} /> });
      expect(screen.getByText('Edit Card')).toBeInTheDocument();
    });

    it('form is/can be populated properly', async () => {
      // CONTROL: Recorded person
      expect(control.getRecordedPerson()).toHaveTextContent(data.createdBy.name);

      // CONTROL: Incident date
      const datePart = data.incidentDate.split('T')[0];
      const expected = moment(datePart).format(dateFormat);
      expect(control.getIncidentDate().value).toBe(expected);

      // CONTROL: Topic
      expect(screen.getByText(crisisMgmtTopicMap[data.topic])).toBeInTheDocument();

      // CONTROL: Note
      expect(control.getNote().value).toBe(data.note);

      // CONTROL: File uploader
      data.files.forEach(f => {
        expect(screen.getByTestId(`file-${f.fileName}`)).toBeInTheDocument();
      });

      const fileToDelete = data.files[0];
      const btnFileDelete = screen.queryByTestId(`file-${fileToDelete.fileName}-delete`);
      userEvent.click(btnFileDelete);
      userEvent.click(screen.getByText('Yes'));

      // await waitFor(() => {
      //   const listItemFile = screen.queryByTestId(`file-${fileToDelete.fileName}`);
      //   expect(listItemFile).not.toBeInTheDocument();
      // });

      // SAVE
      userEvent.click(screen.getByText('Save'));

      mockApiPerTestCase({
        url: `/picker/crises/updateCard/${data._id}`,
        handler: () => {},
      });

      await waitFor(() => {
        expect(screen.queryByRole('form')).not.toBeInTheDocument();
      });
    });
  });
});
