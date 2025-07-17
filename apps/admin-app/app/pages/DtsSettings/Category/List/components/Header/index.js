import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('dtsCategorySetting');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.DTS.SETTING.CATEGORY.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_DTS_CATEGORY_SETTING_NEW}>
        <Col>
          <Link to="/dts/setting/category/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_DTS_CATEGORY_SETTING')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
