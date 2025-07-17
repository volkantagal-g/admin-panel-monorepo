import { Typography } from 'antd';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { Image, RedirectButton } from '@shared/components/GUI';

export const tableColumns = ({ t }) => {
  const columns = [
    {
      title: t('MENTOR'),
      key: 'mentor',
      width: 100,
      render: ({ mentor }) => {
        const imageProps = {
          src: mentor?.picURL,
          width: 50,
          height: 50,
        };

        return <Image className="border rounded-lg overflow-hidden w-100 h-100" {...imageProps} preview={false} />;
      },
    },
    {
      title: t('FULL_NAME'),
      key: 'fullName',
      width: 200,
      render: ({ mentor }) => mentor?.employeeId?.fullName,
    },
    {
      title: `${t('employeePage:JOB_FAMILY')} / ${t('employeePage:BUSINESS_TITLE')}`,
      key: 'jobFamilyAndBusinessTitle',
      width: 200,
      render: ({ mentor }) => {
        return `${mentor?.employeeId?.jobFamilyName} / ${mentor?.employeeId?.businessTitle}`;
      },
    },
    {
      title: t('TOPIC'),
      dataIndex: 'topic',
      key: 'topic',
      width: 200,
      render: topic => topic?.name,
    },
    {
      title: t('LANGUAGES_AVAILABLE'),
      dataIndex: 'languages',
      key: 'languages',
      width: 150,
      render: languages => languages?.map(language => t(`mentorshipPage:LANGUAGE_KEY_TYPES.${language}`)).join(', '),
    },
    {
      title: t('EMAIL'),
      key: 'email',
      width: 150,
      render: ({ mentor }) => mentor?.employeeId?.workEmail,
    },
    {
      title: t('YEARS_OF_EXPERIENCE'),
      dataIndex: 'yearsOfExperience',
      key: 'yearsOfExperience',
      width: 150,
      render: yearsOfExperience => (yearsOfExperience ? `${yearsOfExperience} yrs` : '-'),
    },
    {
      title: t('DETAILS_OF_EXPERIENCE'),
      dataIndex: 'detailsOfExperience',
      key: 'detailsOfExperience',
      width: 150,
      render: detailsOfExperience => <Typography.Text title={detailsOfExperience} style={{ maxWidth: 150 }} ellipsis>{detailsOfExperience}</Typography.Text>,
    },
    {
      title: t('PROFILE'),
      width: 100,
      key: 'seeProfileDetails',
      render: record => {
        return (
          <RedirectButton
            size="small"
            color="secondary"
            to={ROUTE.MENTORSHIP_MENTOR_DETAIL.path.replace(':id', record?.mentor?._id)}
            text={t('SEE_PROFILE_DETAILS')}
            permKey={permKey.PAGE_MENTORSHIP_MENTOR_DETAIL}
          />
        );
      },
    },
    {
      title: t('MATCH'),
      width: 100,
      key: 'seeMentorshipDetails',
      render: record => {
        return (
          <RedirectButton
            size="small"
            color="active"
            to={ROUTE.MENTORSHIP_COURSE_DETAIL.path.replace(':id', record?._id)}
            text={t('SEE_MENTORSHIP_DETAILS')}
            permKey={permKey.PAGE_MENTORSHIP_COURSE_DETAIL}
          />
        );
      },
    },
  ];

  return columns;
};
