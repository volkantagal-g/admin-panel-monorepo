import { useState, useEffect } from 'react';
import { PageHeader, Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import { warehouseProposalsSelector } from '@app/pages/WarehouseProposal/Detail/redux/selectors';
import { warehouseProposalStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import ActionButtons from '../ActionButtons';

const Header = ({ handleClickEdit, onEdit }: { handleClickEdit: () => void, onEdit: boolean }) => {
  const { t } = useTranslation();
  const { status } = useSelector(warehouseProposalsSelector.getProposalCommonData);
  const [title, setTitle] = useState<string>(t('global:PAGE_TITLE.WAREHOUSE_PROPOSAL.DETAIL'));

  useEffect(() => {
    if (status) {
      const statusText = get(warehouseProposalStatuses, [status, getLangKey()], '');
      setTitle(`${t('global:PAGE_TITLE.WAREHOUSE_PROPOSAL.DETAIL')} (${statusText})`);
    }
  }, [status, t]);

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={title}
        />
      </Col>
      <Col>
        <Button
          onClick={handleClickEdit}
          className="mr-2"
          type="primary"
        >
          {t(`global:${onEdit ? 'CANCEL' : 'EDIT'}`)}
        </Button>
        <ActionButtons />
      </Col>
    </Row>
  );
};

export default Header;
