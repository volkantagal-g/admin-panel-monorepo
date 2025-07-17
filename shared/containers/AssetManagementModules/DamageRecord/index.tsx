import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Skeleton,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { vehicleDamageSelector } from '@shared/containers/AssetManagementModules/DamageRecord/redux/selectors';
import VehicleDamageForm from './Form';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { IVehicleDamageRecord } from '@shared/containers/AssetManagementModules/types';
import useStyles from '../styles';
import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.DAMAGE_RECORD;
const VehicleDamageRecord = () => {
  const { t } = useTranslation(['assetManagement']);
  const { id: assetId } = useParams();
  const dispatch = useDispatch();
  const commonClasses = useStyles();
  const vehicleDamageRecord = useSelector(vehicleDamageSelector.getData);
  const isVehicleDamagePending = useSelector(vehicleDamageSelector.getIsPending);
  const isFirstLoadDone = useSelector(vehicleDamageSelector.getIsFirstLoadDone);

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
      dispatch(Creators.filterVehicleDamageRequest({ assetId }));
    }
  }, [dispatch, assetId]);

  if (!isFirstLoadDone && (isVehicleDamagePending)) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <Card className={commonClasses.cardContainer} title={t('assetManagement:DAMAGE_RECORD_INFORMATION')}>
      {
        vehicleDamageRecord?.length > 0 && (vehicleDamageRecord).map((vehicleRecord: IVehicleDamageRecord) => (
          <VehicleDamageForm
            mode={FORM_MODES.EDIT}
            vehicleRecord={vehicleRecord}
            key={vehicleRecord._id}
            isVehicleDamagePending={isVehicleDamagePending}
          />
        ))
      }
      <VehicleDamageForm mode={FORM_MODES.ADD} />
    </Card>
  );
};

export default VehicleDamageRecord;
