import { useState } from 'react';
import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import UsersExportModal from './UsersExportModal';
import { getUsersForExcelTableSelector } from '../../redux/selectors';
import useStyles from './styles';

const Header = () => {
  const { t } = useTranslation('userPage');
  const { Can } = usePermission();
  const classes = useStyles({});
  const isUserExportPending = useSelector(getUsersForExcelTableSelector.getIsPending);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 user-title"
          title={t('global:PAGE_TITLE.USER.LIST')}
        />
      </Col>
      <Col>
        <Can permKey={permKey.PAGE_USER_NEW}>
          <Link to={ROUTE.USER_NEW.path}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
            >
              {t('NEW_USER')}
            </Button>
          </Link>
        </Can>
        <Can permKey={permKey.PAGE_USER_LIST_EXPORT_USERS}>
          <Button
            className={classes.export}
            icon={<ExportOutlined />}
            onClick={showModal}
            loading={isUserExportPending}
          >
            {t('EXPORT_USER')}
          </Button>
        </Can>
      </Col>

      <UsersExportModal
        t={t}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </Row>
  );
};

export default Header;
