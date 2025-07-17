import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const ThirdPartyCompanyNewHeader = () => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.THIRD_PARTY_COMPANY.NEW')} />
      <Row gutter={8}>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.THIRD_PARTY_COMPANY.NEW')}
          />
        </Col>
      </Row>
    </>
  );
};

export default ThirdPartyCompanyNewHeader;
