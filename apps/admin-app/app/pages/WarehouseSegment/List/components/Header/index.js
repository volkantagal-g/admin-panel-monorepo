import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';

import RedirectButton from '@shared/components/UI/RedirectButton';
import { SEGMENT_PAGES } from '@app/pages/WarehouseSegment/constants';

const Header = () => {
  const { t } = useTranslation('warehouseSegmentPage');
  return (
    <>
      <Row gutter={[8,4]}>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.WAREHOUSE_SEGMENT.LIST')}
          />
        </Col>
        {
          SEGMENT_PAGES(t).map(({ title, to }) =>
            <Col key={title}>
              <RedirectButton title={title} to={to} />
            </Col>
          )
        }
      </Row></>
  );
};

export default Header;
