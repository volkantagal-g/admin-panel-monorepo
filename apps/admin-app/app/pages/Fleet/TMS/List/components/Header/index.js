import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';

import RedirectButton from '@shared/components/UI/RedirectButton';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('tmsPage');

  const { Can } = usePermission();

  return (
    <Row gutter={[8, 4]}>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('TMS_LIST')} />
      </Col>
      <Can permKey={permKey?.PAGE_VEHICLE_NEW}>
        <Col>
          <RedirectButton title={t('CREATE_VEHICLE')} to={ROUTE.TMS_NEW.path} />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
