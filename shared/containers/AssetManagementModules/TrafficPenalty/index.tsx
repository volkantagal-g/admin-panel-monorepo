import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Skeleton,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { vehicleTrafficPenaltySelector } from './redux/selectors';
import VehicleTrafficPenaltyForm from './Form';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { IVehicleTrafficPenaltyRecord } from '@shared/containers/AssetManagementModules/types';
import useStyles from '../styles';
import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.TRAFFIC_PENALTY;
const TrafficPenaltyModule = () => {
  const { t } = useTranslation(['assetManagement']);
  const { id: assetId } = useParams();
  const dispatch = useDispatch();
  const commonClasses = useStyles();
  const vehicleTrafficPenalty = useSelector(vehicleTrafficPenaltySelector.getData);
  const isTrafficPenaltyPending = useSelector(vehicleTrafficPenaltySelector.getIsPending);
  const isFirstLoadDone = useSelector(vehicleTrafficPenaltySelector.getIsFirstLoadDone);

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
      dispatch(Creators.filterTrafficPenaltyRequest({ assetId }));
    }
  }, [dispatch, assetId]);

  if (!isFirstLoadDone || (isTrafficPenaltyPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <Card className={commonClasses.cardContainer} title={t('assetManagement:TRAFFIC_PENALTY_INFORMATION')}>
      {
        vehicleTrafficPenalty?.length > 0 && (vehicleTrafficPenalty).map((vehicleRecord: IVehicleTrafficPenaltyRecord) => (
          <VehicleTrafficPenaltyForm
            mode={FORM_MODES.EDIT}
            vehicleRecord={vehicleRecord}
            key={vehicleRecord._id}
            isTrafficPenaltyPending={isTrafficPenaltyPending}
          />
        ))
      }
      <VehicleTrafficPenaltyForm mode={FORM_MODES.ADD} />
    </Card>
  );
};

export default TrafficPenaltyModule;
