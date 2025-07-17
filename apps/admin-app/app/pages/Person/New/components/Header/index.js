import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { HEADER_COL_FLEX_VALUE } from '../../constants';

const Header = () => {
  const { t } = useTranslation('personPage');

  return (
    <Row>
      <Col flex={HEADER_COL_FLEX_VALUE}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.PERSON.NEW')}
        />
      </Col>
    </Row>
  );
};

export default Header;
