import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import useStyles from './styles';
import { Button } from '@shared/components/GUI';
import { ROUTE } from '@app/routes';

const getTitle = ({ t, userFullName, isSearchPage, isMentorDetailPage, isProfilePage }) => {
  const title = t('PAGE_TITLE');
  if (isSearchPage) {
    return `${title} - ${t('SEARCH')}`;
  }
  if (isMentorDetailPage) {
    return `${title} - ${t('USER_MENTORSHIP_PROFILE', { fullName: userFullName })}`;
  }

  if (isProfilePage) {
    return `${title} - ${t('MY_MENTORSHIP_PROFILE')}`;
  }

  return title;
};

const Header = ({ userFullName, isSearchPage, isMentorDetailPage, isProfilePage }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const title = getTitle({ t, userFullName, isSearchPage, isMentorDetailPage, isProfilePage });

  return (
    <Row className="p-0 my-3" align="middle" justify="space-between">
      <Col>
        <PageTitleHeader title={title} />
        <h1 className={classes.title}>{title}</h1>
      </Col>
      <Col>
        <Button
          size="small"
          icon={isSearchPage ? <UserOutlined /> : <SearchOutlined />}
          onClick={() => {
            if (isSearchPage) {
              navigate(ROUTE.MENTORSHIP_PROFILE.path);
            }
            else {
              navigate(ROUTE.MENTORSHIP_SEARCH.path);
            }
          }}
        >{isSearchPage ? t('MY_MENTORSHIP_PROFILE') : t('SEARCH_MENTOR_PROGRAM')}
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
