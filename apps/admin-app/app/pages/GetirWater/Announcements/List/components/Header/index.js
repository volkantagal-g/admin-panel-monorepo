import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('getirWaterAnnouncementsPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.WATER.ANNOUNCEMENTS.LIST')} />
      </Col>
      <Col>
        <Can permKey={permKey.PAGE_GETIR_WATER_ANNOUNCEMENT_NEW}>
          <Button type="primary" icon={<PlusOutlined />} href={ROUTE.GETIR_WATER_ANNOUNCEMENT_NEW.path}>
            {t('NEW')}
          </Button>
        </Can>
      </Col>
    </Row>
  );
};

export default Header;
