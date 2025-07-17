import { get } from 'lodash';

export const isMentor = ({ userData, record }) => userData?._id === record?.mentor?._id;

export const getMenteeOrMentor = ({ userData, record }) => (isMentor({ userData, record }) ? 'mentee' : 'mentor');

export const getFullName = ({ userData, record }) => {
  const propName = getMenteeOrMentor({ userData, record });
  return get(record, [propName, 'employeeId', 'fullName']);
};

export const getJobFamilyAndBusinessTitle = ({ userData, record }) => {
  const propName = getMenteeOrMentor({ userData, record });
  return `${get(record, [propName, 'employeeId', 'jobFamilyName'])} / ${get(record, [propName, 'employeeId', 'businessTitle'])}`;
};

export const getLanguages = ({ userData, record, t }) => {
  const propName = getMenteeOrMentor({ userData, record });
  const languages = get(record, [propName, 'languages']);
  return languages?.map(language => t(`mentorshipPage:LANGUAGE_KEY_TYPES.${language}`)).join(', ');
};

export const getWorkEmail = ({ userData, record }) => {
  const propName = getMenteeOrMentor({ userData, record });
  const workEmail = get(record, [propName, 'employeeId', 'workEmail']);
  return <a href={`mailto:${workEmail}`}>{workEmail}</a>;
};
