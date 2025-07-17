import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('franchiseLegalPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.FRANCHISE_LEGAL.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_FRANCHISE_LEGAL_NEW}>
        <Col>
          <Link to="/franchiseLegal/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('LIST.NEW_FRANCHISE_LEGAL_AGREMENT')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
