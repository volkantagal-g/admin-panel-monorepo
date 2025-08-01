import { Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { getExportedPermitsExcelDownloadURLSelector } from '../../redux/selectors';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['global']);
  const { canAccess } = usePermission();
  const hasPermissionToDownloadAssetExcel = canAccess(permKey.PAGE_EMPLOYEE_PERMIT_LIST_COMPONENT_EXPORT_AS_EXCEL);
  const isGetExportedPermitsExcelDownloadURLPending = useSelector(getExportedPermitsExcelDownloadURLSelector.getIsPending);

  const handleExportPermitsBtnClicked = () => {
    dispatch(Creators.getExportedPermitsExcelDownloadURLRequest({}));
  };

  return (
    <Row justify="end">
      <Col className={classes.btnWrapper}>
        {hasPermissionToDownloadAssetExcel && (
          <Button
            name={t('global:EXPORT_EXCEL')}
            loading={isGetExportedPermitsExcelDownloadURLPending}
            icon={<DownloadOutlined />}
            onClick={() => handleExportPermitsBtnClicked()}
          >
            {t('global:EXPORT_EXCEL')}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Header;
