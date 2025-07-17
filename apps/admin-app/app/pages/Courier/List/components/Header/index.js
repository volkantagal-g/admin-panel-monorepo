import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';

import RedirectButton from '@shared/components/UI/RedirectButton';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation();
  const { Can } = usePermission();

  return (
    <Row gutter={[8, 4]}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.COURIER.LIST')}
        />
      </Col>
      <Can permKey={permKey?.PAGE_COURIER_LOYALTY_LIST}>
        <Col>
          <RedirectButton title={t('PAGE_TITLE.COURIER_LOYALTY.LIST')} to={ROUTE?.COURIER_LOYALTY_LIST?.path} />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
