import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('dtsRulePage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.DTS.RULE.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_DTS_RULE_NEW}>
        <Col>
          <Link to="/dts/rule/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_DTS_RULE')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
