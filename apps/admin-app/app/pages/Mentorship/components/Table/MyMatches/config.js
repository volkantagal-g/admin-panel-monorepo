import { InfoCircleOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { RedirectButton, Tag } from '@shared/components/GUI';
import { MENTORSHIP_STATUSES, MENTORSHIP_STATUSES_TAG_COLORS } from '@app/pages/Mentorship/constants';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import { getFullName, getJobFamilyAndBusinessTitle, getWorkEmail, isMentor } from '@app/pages/Mentorship/utils';

export const tableColumns = ({ t, userData, filters }) => {
  const columns = [
    {
      title: t('YOUR_ROLE'),
      key: 'yourRole',
      width: 100,
      render: record => {
        return isMentor({ userData, record }) ? t('MENTOR') : t('MENTEE');
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'mentorshipStatus',
      key: 'mentorshipStatus',
      width: 150,
      render: mentorshipStatus => (
        mentorshipStatus ? (
          <Tag color={MENTORSHIP_STATUSES_TAG_COLORS[mentorshipStatus]}>
            {t(`MENTORSHIP_STATUSES.${mentorshipStatus}`)}
          </Tag>
        ) : null
      ),
      filters: convertConstantValueTranslationsToSelectOptions({
        constants: MENTORSHIP_STATUSES,
        translationBaseKey: 'mentorshipPage:MENTORSHIP_STATUSES',
        labelKey: 'text',
      }),
      filteredValue: filters?.mentorshipStatus || null,
    },
    {
      title: t('FULL_NAME'),
      key: 'fullName',
      width: 200,
      render: record => getFullName({ userData, record }),
    },
    {
      title: `${t('JOB_FAMILY')} / ${t('BUSINESS_TITLE')}`,
      key: 'jobFamilyAndBusinessTitle',
      width: 200,
      render: record => getJobFamilyAndBusinessTitle({ userData, record }),
    },
    {
      title: t('MATCHED_TOPIC'),
      key: 'topic',
      width: 200,
      render: ({ course }) => course?.topic?.name,
    },
    {
      title: t('LANGUAGES_AVAILABLE'),
      dataIndex: 'course',
      key: 'course',
      width: 150,
      render: course => course?.languages?.map(language => t(`LANGUAGE_KEY_TYPES.${language}`)).join(', '),
    },
    {
      title: t('EMAIL'),
      key: 'email',
      width: 150,
      render: record => getWorkEmail({ userData, record }),
    },
    {
      title: t('ACTION'),
      width: 100,
      render: record => {
        return (
          record?.mentorshipStatus ? (
            <RedirectButton
              size="small"
              color="secondary"
              icon={<InfoCircleOutlined />}
              to={ROUTE.MENTORSHIP_PROGRESS.path.replace(':id', record?._id)}
              text={t('SEE_MATCH_DETAILS')}
              permKey={permKey.PAGE_MENTORSHIP_PROGRESS}
            />
          ) : null
        );
      },
    },
  ];

  return columns;
};
