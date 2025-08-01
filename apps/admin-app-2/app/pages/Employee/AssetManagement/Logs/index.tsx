import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

import { ASSET_TYPE_IDS } from '@app/pages/Employee/AssetManagement/constants';

import LogFilterForm from '@app/pages/Employee/AssetManagement/Logs/components/LogFilterForm';
import LogTable from '@app/pages/Employee/AssetManagement/Logs/components/LogTable';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT.LOGS;

const AssetManagementLogsPage = () => {
  const { t } = useTranslation(['assetManagement']);
  const dispatch = useDispatch();
  const moduleClasses = useModuleStyles();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getAssetLogComponentsRequest({ assetId: ASSET_TYPE_IDS.VEHICLE }));
  }, [dispatch]);

  return (
    <div className={moduleClasses.pageContainer}>
      <Row className={moduleClasses.pageHeader} justify="space-between">
        <Col>
          <h4>{t('assetManagement:COMPANY_CARS')}</h4>
        </Col>
        {/* <Col className={moduleClasses.actionButtonContainer}> */}
        {/*  <Button */}
        {/*    icon={<DownloadOutlined />} */}
        {/*    className={moduleClasses.flexButton} */}
        {/*  > */}
        {/*    {t('assetManagement:EXPORT_EXCEL')} */}
        {/*  </Button> */}
        {/* </Col> */}
      </Row>
      <LogFilterForm />
      <LogTable />
    </div>
  );
};

export default AssetManagementLogsPage;
