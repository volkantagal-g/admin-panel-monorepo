import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DownloadOutlined } from '@ant-design/icons';

import { Button, Row, Col } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { FilterForm } from './components';
import { ROUTE } from '@app/routes.ts';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import { ASSET_TYPE_IDS } from '@app/pages/Employee/AssetManagement/constants';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import VehicleTable from './components/VehicleTable';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT.LIST;

const AssetManagementListPage = () => {
  const { t } = useTranslation(['assetManagement']);
  const dispatch = useDispatch();
  const moduleClasses = useModuleStyles();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getAssetFilterComponentsRequest({ assetId: ASSET_TYPE_IDS.VEHICLE }));
  }, [dispatch]);

  return (
    <div className={moduleClasses.pageContainer}>
      <Row className={moduleClasses.pageHeader} justify="space-between">
        <Col>
          <h4>{t('assetManagement:COMPANY_CARS')}</h4>
        </Col>
        <Col className={moduleClasses.actionButtonContainer}>
          <RedirectButtonV2
            size="middle"
            type="primary"
            to={ROUTE.ASSET_MANAGEMENT_NEW.path}
            text={t('assetManagement:CREATE_A_NEW_VEHICLE')}
            permKey={permKey.PAGE_ASSET_MANAGEMENT_NEW}
          />
          <RedirectButtonV2
            size="middle"
            type="primary"
            to={ROUTE.ASSET_MANAGEMENT_LOGS.path}
            text={t('assetManagement:ASSETS_LOG')}
            permKey={permKey.PAGE_ASSET_MANAGEMENT_LOGS}
          />
          <Button
            icon={<DownloadOutlined />}
            className={moduleClasses.flexButton}
            onClick={() => dispatch(Creators.filterAndExportAsExcelRequest())}
          >
            {t('assetManagement:EXPORT_EXCEL')}
          </Button>
        </Col>
      </Row>
      <FilterForm />
      <VehicleTable />
    </div>
  );
};

export default AssetManagementListPage;
