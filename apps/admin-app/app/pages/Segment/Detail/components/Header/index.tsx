import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { RollbackOutlined } from '@ant-design/icons';

import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKeys from '@shared/shared/permKey.json';

const Header = () => {
  const { t } = useTranslation('segment');

  return (
    <Row align="middle" justify="space-between">
      <Col>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.SEGMENT.DETAIL')}
        />
      </Col>
      <Col>
        <RedirectButtonV2
          text={t('global:PAGE_TITLE.SEGMENT.LIST')}
          to="/segment/list"
          permKey={permKeys.PAGE_SEGMENT_LIST}
          iconComponent={<RollbackOutlined />}
        />
      </Col>
    </Row>
  );
};

export default Header;
