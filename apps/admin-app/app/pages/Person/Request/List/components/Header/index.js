import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('personRequestPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.PERSON_REQUEST.LIST')}
        />
      </Col>
      {/* <Col>
        <Radio.Group value={selectedPersonRequestStatus} buttonStyle="solid" onChange={handlePersonRequestStatusChange}>
          <Radio.Button value={PERSONEL_REQUEST_STATUS.INFORMATION_EDIT_REQUESTS}>{t('INFORMATION_EDIT_REQUESTS')}</Radio.Button>
          <Radio.Button disabled value={PERSONEL_REQUEST_STATUS.NEW_PERSON_APPLICATIONS}>{t('NEW_PERSON_APPLICATIONS')}</Radio.Button>
        </Radio.Group>
      </Col> */}
    </Row>
  );
};

export default Header;
