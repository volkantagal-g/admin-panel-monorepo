import {
  mockGetS3SignedUploadPublicUrlData,
  getTopicsForSelectComponentMockData,
  requestMentorshipRequestMockData,
  declineMentorshipRequestMockData,
  createMentorshipCourseMockData,
  createNewMentorshipRequestMockData,
  mentorshipTodoMockData,
  mentorshipSessionNoteMockData,
} from './index.mock.data';

const getS3SignedUploadPublicUrlMockOptions = {
  url: '/employee/getS3SignedUploadPublicUrl',
  method: 'post',
  successData: mockGetS3SignedUploadPublicUrlData,
};

const getTopicsForSelectComponentMockOptions = {
  url: '/mentorship/getTopicsForSelectComponent',
  method: 'post',
  successData: getTopicsForSelectComponentMockData,
};

const createMentorshipCourseMockOptions = {
  url: '/mentorship/topic/create',
  method: 'post',
  successData: createMentorshipCourseMockData,
};

const filterMentorshipCoursesMockOptions = {
  url: '/mentorship/course/filter',
  method: 'post',
  successData: [createMentorshipCourseMockData],
};

const filterMentorshipRequestsMockOptions = {
  url: '/mentorship/request/filter',
  method: 'post',
  successData: [createNewMentorshipRequestMockData],
};

const requestMentorshipRequestMockOptions = {
  url: '/mentorship/request/course/:id',
  method: 'post',
  successData: requestMentorshipRequestMockData,
};

const declineMentorshipRequestMockOptions = {
  url: '/mentorship/request/decline',
  method: 'post',
  successData: declineMentorshipRequestMockData,
};

const filterMentorshipTodosMockOptions = {
  url: '/mentorship/todo/filter',
  method: 'post',
  successData: [mentorshipTodoMockData],
};

const filterMentorshipSessionNotesMockOptions = {
  url: '/mentorship/sessionNote/filter',
  method: 'post',
  successData: [mentorshipSessionNoteMockData],
};

export default [
  getS3SignedUploadPublicUrlMockOptions,
  getTopicsForSelectComponentMockOptions,
  createMentorshipCourseMockOptions,
  filterMentorshipCoursesMockOptions,
  filterMentorshipRequestsMockOptions,
  requestMentorshipRequestMockOptions,
  declineMentorshipRequestMockOptions,
  filterMentorshipTodosMockOptions,
  filterMentorshipSessionNotesMockOptions,
];
