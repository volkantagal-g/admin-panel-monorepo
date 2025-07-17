import axios from '@shared/axios/common';

export const getUploadPictureURL = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/employee/getS3SignedUploadPublicUrl',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorshipUserOfCurrentUser = async ({ cancelSource }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: '/mentorship/getMentorshipUserOfCurrentUser',
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorshipUser = async ({ cancelSource, id, employeeId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/user/profile',
    data: { id, employeeId },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const createMentorshipUser = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/user',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updateMentorshipUser = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'PATCH',
    url: '/mentorship/user',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorshipMentorDetail = async ({ cancelSource, mentorId: id }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: `/mentorship/mentor/${id}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getTopicsForSelectComponent = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/getTopicsForSelectComponent',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorsForSelectComponent = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/getMentorsForSelectComponent',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const createMentorshipCourse = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/course',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updateMentorshipCourse = async ({ cancelSource, id, ...data }) => {
  const { data: responseData } = await axios({
    method: 'PATCH',
    url: `/mentorship/course/${id}`,
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const deleteMentorshipCourse = async ({ cancelSource, id }) => {
  const { data: responseData } = await axios({
    method: 'DELETE',
    url: `/mentorship/course/${id}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const filterMentorshipCourses = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/course/filter',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const searchMentorshipCourses = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/course/search',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorshipCourseDetail = async ({ cancelSource, courseId }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: `/mentorship/course/${courseId}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const filterMentorshipRequests = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/request/filter',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const getMentorshipRequestDetail = async ({ cancelSource, id }) => {
  const { data: responseData } = await axios({
    method: 'GET',
    url: `/mentorship/request/${id}`,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updateMentorshipRequestDetail = async ({ cancelSource, id, outlines }) => {
  const { data: responseData } = await axios({
    method: 'PATCH',
    url: `/mentorship/request/${id}`,
    data: { outlines },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const requestMentorshipRequest = async ({ cancelSource, courseId, requestReason }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/mentorship/request/course/${courseId}`,
    data: { requestReason },
    cancelToken: cancelSource.token,
  });

  return responseData;
};

export const acceptMentorshipRequest = async ({ cancelSource, courseId }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/mentorship/request/course/${courseId}/accept`,
    cancelToken: cancelSource.token,
  });

  return responseData;
};

export const declineMentorshipRequest = async ({ cancelSource, courseId, declineReason }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/mentorship/request/course/${courseId}/decline`,
    data: { declineReason },
    cancelToken: cancelSource.token,
  });

  return responseData;
};

export const withdrawMentorshipRequest = async ({ cancelSource, courseId, withdrawReason }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/mentorship/request/course/${courseId}/withdraw`,
    data: { withdrawReason },
    cancelToken: cancelSource.token,
  });

  return responseData;
};

export const finishMentorship = async ({ cancelSource, courseId, finishedReason, finishedDetails }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/mentorship/request/course/${courseId}/finish`,
    data: { finishedReason, finishedDetails },
    cancelToken: cancelSource.token,
  });

  return responseData;
};

export const addNewMentorshipTodo = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/todo',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updateMentorshipTodo = async ({
  cancelSource,
  _id,
  todo,
  completedDate,
  createdBy,
  deadline,
  mentorshipRequest,
}) => {
  const { data: responseData } = await axios({
    method: 'PATCH',
    url: `/mentorship/todo/${_id}`,
    data: { todo, completedDate, createdBy, deadline, mentorshipRequest },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const filterMentorshipTodos = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/todo/filter',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const addNewMentorshipSessionNote = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/sessionNote',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const updateMentorshipSessionNote = async ({
  cancelSource,
  _id,
  createdBy,
  mentorshipRequest,
  note,
}) => {
  const { data: responseData } = await axios({
    method: 'PATCH',
    url: `/mentorship/sessionNote/${_id}`,
    data: {
      createdBy,
      mentorshipRequest,
      note,
    },
    cancelToken: cancelSource.token,
  });
  return responseData;
};

export const filterMentorshipSessionNotes = async ({ cancelSource, ...data }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/mentorship/sessionNote/filter',
    data,
    cancelToken: cancelSource.token,
  });
  return responseData;
};
