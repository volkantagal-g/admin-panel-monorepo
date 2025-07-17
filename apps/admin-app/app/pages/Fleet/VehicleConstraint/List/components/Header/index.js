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
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.FLEET.VEHICLE_CONSTRAINT.LIST')} />
      </Col>
      <Can permKey={permKey?.PAGE_VEHICLE_CONSTRAINT_NEW}>
        <Col>
          <RedirectButton title={t('PAGE_TITLE.FLEET.VEHICLE_CONSTRAINT.NEW')} to={ROUTE?.VEHICLE_CONSTRAINT_NEW?.path} />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
