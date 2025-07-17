import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';

import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import RedirectButton from '@shared/components/UI/RedirectButton';

const Header = () => {
  const { t } = useTranslation();
  const { Can } = usePermission();

  return (
    <Row gutter={[8, 4]}>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.COURIER_COMMUNICATION.SEGMENT_LIST')} />
      </Col>
      <Can permKey={permKey?.PAGE_COURIER_NOTIFICATION_CREATE_SEGMENT}>
        <Col>
          <RedirectButton title={t('PAGE_TITLE.COURIER_COMMUNICATION.CREATE_SEGMENT')} to={ROUTE?.COURIER_NOTIFICATION_CREATE_SEGMENT?.path} />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
