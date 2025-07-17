import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const ThirdPartyCompanyListHeader = () => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const { Can } = usePermission();
  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.THIRD_PARTY_COMPANY.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_THIRD_PARTY_COMPANY_NEW}>
        <Col>
          <Link to={ROUTE.THIRD_PARTY_COMPANY_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('BUTTONS.NEW_THIRD_PARTY_COMPANY')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default ThirdPartyCompanyListHeader;
