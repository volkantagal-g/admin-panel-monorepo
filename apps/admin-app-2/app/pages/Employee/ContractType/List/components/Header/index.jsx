import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('personContractType');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('LIST.PAGE_TITLE')}
        />
      </Col>
      <Can permKey={permKey.PAGE_PERSON_CONTRACT_CREATE}>
        <Col>
          <Link to="/person/contract/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
