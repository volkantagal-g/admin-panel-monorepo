import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { exportFranchiseUsersSelector } from '../../redux/selectors';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const FranchiseUserListPageHeader = () => {
  const { t } = useTranslation('marketFranchiseUserPage');
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const isPendingExportFranchiseUsers = useSelector(exportFranchiseUsersSelector.getIsPending);

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.MARKET_FRANCHISE_USER.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_MARKET_FRANCHISE_USER_EXPORT}>
        <Col>
          <Button
            type="secondary"
            icon={<ExportOutlined />}
            onClick={() => dispatch(Creators.exportFranchiseUsersRequest())}
            disabled={isPendingExportFranchiseUsers}
            data-testid="EXPORT_FRANCHISE_USERS_BUTTON"
          >
            {t('EXPORT_MARKET_FRANCHISE_USERS')}
          </Button>
        </Col>
      </Can>
      <Col>
        <Link to="/marketFranchise/user/new">
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_MARKET_FRANCHISE_USER')}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default FranchiseUserListPageHeader;
