import { PageHeader, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation(['paymentMerchantPage', 'global']);

  return (
    <Row justify="space-between" align="center">
      <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.MERCHANT.LIST')} />
      <Button type="primary">
        <Link to="/payment/merchants/new"> {t('paymentMerchantPage:NEW_MERCHANT')} </Link>
      </Button>
    </Row>
  );
};

export default Header;
