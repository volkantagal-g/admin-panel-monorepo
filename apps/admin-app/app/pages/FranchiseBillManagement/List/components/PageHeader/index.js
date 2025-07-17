import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { exportFranchiseBillListSelector } from '../../redux/selector';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const FranchiseBillListPageHeader = ({ exportFranchiseBillManagementListRequest }) => {
  const { t } = useTranslation('franchiseBillManagementPage');
  const { Can } = usePermission();

  const isPendingExportFranchiseBillList = useSelector(exportFranchiseBillListSelector.getIsPending);

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.FRANCHISE_BILL_MANAGEMENT.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_FRANCHISE_BILL_MANAGEMENT_LIST_EXCEL_EXPORT}>
        <Col>
          <Button
            type="secondary"
            icon={<ExportOutlined />}
            onClick={exportFranchiseBillManagementListRequest}
            disabled={isPendingExportFranchiseBillList}
            data-testid="EXPORT_FRANCHISE_BILL_LIST_BUTTON"
          >
            {t('EXPORT_ADDED_BILLS')}
          </Button>
        </Col>
      </Can>
    </Row>
  );
};

export default FranchiseBillListPageHeader;
