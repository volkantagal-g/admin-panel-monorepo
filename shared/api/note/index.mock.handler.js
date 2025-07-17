import * as MOCKS from './index.mock.data';

const getNotesUrl = '/note/getNotes';

const getNotesMockOptions = {
  url: getNotesUrl,
  successData: MOCKS.mockedNotes,
};

export default [getNotesMockOptions];
