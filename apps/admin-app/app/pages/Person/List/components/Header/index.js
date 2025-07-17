import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { ROUTE } from '@app/routes';
import RedirectButton from '@shared/components/UI/RedirectButton';
import { HEADER_COL_FLEX_VALUE } from '../../constants';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col flex={HEADER_COL_FLEX_VALUE}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.PERSON.LIST')}
        />
      </Col>
      <Col>
        <RedirectButton
          title={t('PAGE_TITLE.PERSON.NEW')}
          to={ROUTE.PERSON_NEW.path}
        />
      </Col>
    </Row>
  );
};

export default Header;
