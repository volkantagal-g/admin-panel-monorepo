import { Button, Card, Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import {
  VehicleCoverageForm,
  VehicleInspectionForm,
  VehicleInsuranceForm,
} from '@shared/containers/AssetManagementModules/ComplianceRecord/components';
import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';
import { vehicleInspectionSelector, vehicleInsuranceSelector, vehicleCoverageSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import useStyles from '../styles';
import reducer from './redux/reducer';
import saga from './redux/saga';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.COMPLIANCE_RECORD;

const ComplianceRecordModule = () => {
  const { id: assetId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetManagement']);
  const commonClasses = useStyles();
  const vehicleInspections = useSelector(vehicleInspectionSelector.getData);
  const vehicleInsurances = useSelector(vehicleInsuranceSelector.getData);
  const vehicleCoverages = useSelector(vehicleCoverageSelector.getData);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (assetId) {
      dispatch(Creators.filterVehicleInspectionRequest({ asset: assetId }));
      dispatch(Creators.filterVehicleInsuranceRequest({ asset: assetId }));
      dispatch(Creators.filterVehicleCoverageRequest({ asset: assetId }));
    }
  }, [dispatch, assetId]);

  return (
    <Space className="w-100" direction="vertical">
      <Card className={commonClasses.cardContainer} title={t('assetManagement:INSPECTION_INFORMATION')}>
        {vehicleInspections?.map((vehicleInspection: any) => (
          <VehicleInspectionForm
            key={vehicleInspection.id}
            mode={FORM_MODES.EDIT}
            vehicleInspection={vehicleInspection}
          />
        ))}

        { vehicleInspections?.length > 0 && <Divider />}

        <VehicleInspectionForm mode={FORM_MODES.ADD} />
      </Card>

      <Card className={commonClasses.cardContainer} title={t('assetManagement:INSURANCE_INFORMATION')}>
        {vehicleInsurances?.map((vehicleInsurance: any) => (
          <VehicleInsuranceForm
            key={vehicleInsurance.id}
            mode={FORM_MODES.EDIT}
            vehicleInsurance={vehicleInsurance}
          />
        ))}

        { vehicleInsurances?.length > 0 && <Divider />}

        <VehicleInsuranceForm mode={FORM_MODES.ADD} />
      </Card>

      <Card className={commonClasses.cardContainer} title={t('assetManagement:COVERAGE_INFORMATION')}>
        {vehicleCoverages?.map((vehicleCoverage: any) => (
          <VehicleCoverageForm
            mode={FORM_MODES.EDIT}
            key={vehicleCoverage.id}
            vehicleCoverage={vehicleCoverage}
          />
        ))}

        { vehicleCoverages?.length > 0 && <Divider />}

        <VehicleCoverageForm mode={FORM_MODES.ADD} />
      </Card>
    </Space>
  );
};

export default ComplianceRecordModule;
