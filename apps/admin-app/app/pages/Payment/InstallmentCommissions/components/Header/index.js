import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { cardInstallmentCountsSelector, updateCardInstallmentCountsSelector } from '../../redux/selectors';

import ConfirmationModal from '../ConfirmationModal';

import NewCommissionModal from '../NewCommissionModal';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { t } = useTranslation('global');
  const updateCardInstallCountsIsPending = useSelector(updateCardInstallmentCountsSelector.getIsPending);
  const cardInstallCountsIsPending = useSelector(cardInstallmentCountsSelector.getIsPending);
  const { Can } = usePermission();
  const isLoading = cardInstallCountsIsPending || updateCardInstallCountsIsPending;
  return (
    <Row justify="space-between">
      <Col>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.INSTALLMENTS')} />
      </Col>
      <Can permKey={permKey.PAGE_INSTALLMENT_COMMISSIONS_COMPONENT_EDIT}>
        <Col>
          <NewCommissionModal isLoading={isLoading} />
          <ConfirmationModal isLoading={isLoading} />
        </Col>
      </Can>

    </Row>
  );
};

export default Header;
