import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Switch, Typography } from 'antd';

const { Title } = Typography;

const Header = ({ setIsNewAutoSegmentModalVisible, onAllStatusesSwitchChange }) => {
  const { t } = useTranslation(['autoSegmentListPage']);

  return (
    <Row align="middle">
      <Col><Title level={3}>{t('AUTO_SEGMENT')}</Title></Col>
      <Col flex="auto" /> {/* this col creates a space in between and pushes them to the sides */}
      <Col>
        <Switch
          checkedChildren={t('autoSegmentListPage:SWITCH_IS_ALL_STATUSES_CHECKED')}
          unCheckedChildren={t('autoSegmentListPage:SWITCH_IS_ALL_STATUSES_UNCHECKED')}
          defaultChecked={false}
          onChange={onAllStatusesSwitchChange}
        />
        &nbsp;
        <Button
          size="small"
          onClick={setIsNewAutoSegmentModalVisible}
        >
          {t('autoSegmentListPage:NEW_AUTO_SEGMENT')}
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
