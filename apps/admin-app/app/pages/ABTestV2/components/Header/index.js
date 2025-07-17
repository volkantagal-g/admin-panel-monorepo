import { InfoCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Header = ({ title, showInfo = false, contentStartPlacement, showButton = false, buttonContent, showLink = false, linkTo }) => {
  const { t } = useTranslation('abTestingV2Page');
  const classes = useStyles();

  return (
    <>
      <Row className={showLink ? null : classes.wrapper}>
        <Col flex={contentStartPlacement ? null : 1}>
          <span className={classes.title}>{title}</span>
        </Col>
        <Col
          className={
            contentStartPlacement ? classes.contentStartPlacement : null
          }
        >
          {showInfo && (
            <Tooltip title={t('INFO_EXCLUDE_CLIENTS')} placement="rightBottom">
              <InfoCircleOutlined className={classes.infoIcon} />
            </Tooltip>
          )}
          {showButton && (buttonContent || null)}
        </Col>
      </Row>
      {showLink && (
        <Row className={classes.wrapper}>
          <Link to={linkTo} className={classes.link}>
            <LeftCircleOutlined style={{ marginRight: 5 }} />
            {t('GO_BACK')}
          </Link>
        </Row>
      )}
    </>
  );
};

export default Header;
