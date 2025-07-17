import { Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import { Button, RedirectButton } from '@shared/components/GUI';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { MENTORSHIP_REQUEST_STATUSES, MENTORSHIP_REQUEST_STATUSES_TAG_COLORS, MENTORSHIP_REQUEST_STATUS_ICONS } from '@app/pages/Mentorship/constants';
import history from '@shared/utils/history';

const renderRequestMentorshipButton = ({ t, userNotExists, handleRequestMentorshipBtnClick, request }) => (
  <Button
    size="small"
    color="secondary"
    icon={<LoginOutlined />}
    onClick={() => {
      if (userNotExists) {
        history.push(ROUTE.MENTORSHIP_PROFILE.path);
      }
      else {
        handleRequestMentorshipBtnClick({ request });
      }
    }}
  >{t('REQUEST_MENTORSHIP')}
  </Button>
);

const renderRequestStatusButton = ({ t, status, userNotExists, handleRequestMentorshipBtnClick, request }) => {
  if (status === MENTORSHIP_REQUEST_STATUSES.ACCEPTED) {
    return (
      <RedirectButton
        size="small"
        color="secondary"
        icon={MENTORSHIP_REQUEST_STATUS_ICONS[status]}
        to={ROUTE.MENTORSHIP_PROGRESS.path.replace(':id', request?._id)}
        text={t('SEE_MATCH_DETAILS')}
        permKey={permKey.PAGE_MENTORSHIP_MENTOR_DETAIL}
      />
    );
  }

  if (status === MENTORSHIP_REQUEST_STATUSES.PENDING
  ) {
    return (
      <RedirectButton
        size="small"
        color={MENTORSHIP_REQUEST_STATUSES_TAG_COLORS[status]}
        icon={MENTORSHIP_REQUEST_STATUS_ICONS[status]}
        to={`${ROUTE.MENTORSHIP_PROFILE.path}?scrollToTab=requests&requestStatusFilter=${status}`}
        text={t(`MENTORSHIP_REQUEST_STATUSES.${status}`)}
        permKey={permKey.PAGE_MENTORSHIP_PROFILE}
      />
    );
  }

  return renderRequestMentorshipButton({ t, userNotExists, handleRequestMentorshipBtnClick, request });
};

export const tableColumns = ({
  t,
  requests,
  userNotExists,
  showRequestMentorshipButton,
  handleRequestMentorshipBtnClick,
}) => {
  const columns = [
    {
      title: t('TOPIC'),
      dataIndex: 'topic',
      key: 'topic',
      width: 100,
      render: topic => topic?.name,
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
      title: t('LANGUAGES_AVAILABLE'),
      dataIndex: 'languages',
      key: 'languages',
      width: 150,
      render: languages => languages?.map(language => t(`mentorshipPage:LANGUAGE_KEY_TYPES.${language}`)).join(', '),
    },
  ];

  columns.push({
    title: t('ACTION'),
    width: 100,
    render: record => {
      const request = requests?.[record._id];
      if (request) {
        const status = request.requestStatus;
        return renderRequestStatusButton({ t, status, userNotExists, handleRequestMentorshipBtnClick, request: record });
      }
      return showRequestMentorshipButton ? renderRequestMentorshipButton({ t, userNotExists, handleRequestMentorshipBtnClick, request: record }) : null;
    },
  });

  return columns;
};
