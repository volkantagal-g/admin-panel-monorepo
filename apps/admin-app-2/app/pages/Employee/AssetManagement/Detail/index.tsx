import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from './redux/actions';
import { assetSelector } from './redux/selectors';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { AssetDetailForm, Header } from '@app/pages/Employee/AssetManagement/Detail/components';
import { ASSET_STATUSES } from '../constants';

import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import {
  ComplianceRecordModule,
  DamageRecordModule,
  EquipmentInformationModule,
  TrafficPenaltyModule,
  AssignedGetiriansModule,
} from '@shared/containers/AssetManagementModules';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT.DETAIL;

const AssetManagementDetailPage = () => {
  const moduleClasses = useModuleStyles();
  const dispatch = useDispatch();
  const { id: assetId } = useParams();
  const { t } = useTranslation(['assetManagement', 'global']);
  const asset = useSelector(assetSelector.getData);
  const isFirstLoadDone = useSelector(assetSelector.getIsFirstLoadDone);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className={moduleClasses.pageContainer}>
      <Header />
      <Tabs>
        <Tabs.TabPane key="vehicleAndGeneralInformation" tab={t('assetManagement:VEHICLE_AND_GENERAL_INFORMATION')}>
          <AssetDetailForm />
        </Tabs.TabPane>

        <Tabs.TabPane key="equipmentInformation" tab={t('assetManagement:EQUIPMENT_INFORMATION')}>
          <EquipmentInformationModule />
        </Tabs.TabPane>

        <Tabs.TabPane key="inspectionAndInsuranceInformation" tab={t('assetManagement:INSPECTION_AND_INSURANCE_INFORMATION')}>
          <ComplianceRecordModule />
        </Tabs.TabPane>

        <Tabs.TabPane key="damageRecordInformation" tab={t('assetManagement:DAMAGE_RECORD_INFORMATION')}>
          <DamageRecordModule />
        </Tabs.TabPane>

        <Tabs.TabPane key="trafficPenaltyInformation" tab={t('assetManagement:TRAFFIC_PENALTY_INFORMATION')}>
          <TrafficPenaltyModule />
        </Tabs.TabPane>

        {
          isFirstLoadDone && (
            <Tabs.TabPane key="assignes" tab={t('assetManagement:ASSIGNED_GETIRIANS_INFORMATION')}>
              <AssignedGetiriansModule
                asset={assetId}
                shouldShowAssignmentPeriodType={asset?.fieldValues.vehicleIsCommonCar}
                shouldShowTimePickerForAssignmentStartDate
              />
            </Tabs.TabPane>
          )
        }
      </Tabs>
    </div>
  );
};

export default AssetManagementDetailPage;
