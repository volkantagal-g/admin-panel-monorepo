import { Popconfirm, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Button } from '@shared/components/GUI';

export const tableColumns = ({
  t,
  handleUpdateMentorshipCourseBtnClick,
  handleDeleteMentorshipCourseBtnClick,
}) => [
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
  {
    title: t('ACTION'),
    width: 100,
    render: record => {
      return (
        <>
          <Button
            size="small"
            color="secondary"
            icon={<EditOutlined />}
            className="mr-2"
            onClick={() => handleUpdateMentorshipCourseBtnClick({ course: record })}
          />
          <Popconfirm
            placement="topRight"
            title={t('CONFIRM_DELETE_MENTORSHIP_COURSE')}
            okText={t('YES')}
            cancelText={t('NO')}
            onConfirm={() => handleDeleteMentorshipCourseBtnClick({ course: record })}
          >
            <Button
              size="small"
              color="danger"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </>
      );
    },
  },
];
