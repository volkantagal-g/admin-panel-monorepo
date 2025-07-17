import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('dtsFeedbackSetting');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.DTS.SETTING.FEEDBACK_SOURCE.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_DTS_FEEDBACK_SOURCE_SETTING_NEW}>
        <Col>
          <Link to="/dts/setting/feedbacksource/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_DTS_FEEDBACK_SETTING')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
