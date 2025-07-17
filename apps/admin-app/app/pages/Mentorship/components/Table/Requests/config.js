import { Col, Row } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { Button, Tag } from '@shared/components/GUI';
import { MENTORSHIP_REQUEST_STATUSES, MENTORSHIP_REQUEST_STATUSES_TAG_COLORS } from '@app/pages/Mentorship/constants';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import { isMentor, getFullName, getJobFamilyAndBusinessTitle, getLanguages, getWorkEmail } from '@app/pages/Mentorship/utils';

export const tableColumns = ({
  t,
  userData,
  requestStatusFilter,
  handleAcceptMentorshipBtnClick,
  handleWithdrawMentorshipBtnClick,
  handleDeclineMentorshipBtnClick,
}) => {
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
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      width: 150,
      render: requestStatus => (
        <Tag color={requestStatus && MENTORSHIP_REQUEST_STATUSES_TAG_COLORS[requestStatus]}>
          {t(`MENTORSHIP_REQUEST_STATUSES.${requestStatus}`)}
        </Tag>
      ),
      filters: convertConstantValueTranslationsToSelectOptions({
        constants: MENTORSHIP_REQUEST_STATUSES,
        translationBaseKey: 'mentorshipPage:MENTORSHIP_REQUEST_STATUSES',
        labelKey: 'text',
      }),
      filteredValue: requestStatusFilter || null,
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
      title: t('LANGUAGES_SPOKEN'),
      key: 'course',
      width: 150,
      render: record => getLanguages({ userData, record, t }),
    },
    {
      title: t('EMAIL'),
      key: 'email',
      width: 150,
      render: record => getWorkEmail({ userData, record }),
    },
    {
      title: t('REQUEST'),
      dataIndex: 'requestReason',
      key: 'requestReason',
      width: 150,
      render: requestReason => requestReason,
    },
    {
      title: t('RESPONSE'),
      width: 100,
      render: record => {
        return (
          <>
            {record.requestStatus === MENTORSHIP_REQUEST_STATUSES.PENDING && !isMentor({ userData, record }) && (
            <Button
              size="small"
              color="danger"
              icon={<CloseCircleOutlined />}
              onClick={() => handleWithdrawMentorshipBtnClick({ request: record })}
            >{t('WITHDRAW')}
            </Button>
            )}
            {isMentor({ userData, record }) && record.requestStatus === MENTORSHIP_REQUEST_STATUSES.PENDING && (
            <Row gutter={[4, 4]} wrap={false}>
              <Col>
                <Button
                  size="small"
                  color="active"
                  className="mr-2"
                  onClick={() => {
                    handleAcceptMentorshipBtnClick({ request: record });
                  }}
                >{t('ACCEPT')}
                </Button>
              </Col>
              <Col>
                <Button
                  size="small"
                  color="danger"
                  onClick={() => handleDeclineMentorshipBtnClick({ request: record })}
                >{t('DECLINE')}
                </Button>
              </Col>
            </Row>
            )}
            {record.requestStatus === MENTORSHIP_REQUEST_STATUSES.WITHDRAWN && <span>{record.withdrawReason}</span>}
            {record.requestStatus === MENTORSHIP_REQUEST_STATUSES.DECLINED && <span>{record.declineReason}</span>}
          </>
        );
      },
    },
  ];

  return columns;
};
