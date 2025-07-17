import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Switch } from 'antd';

import {
  getVehicleConstraintSelector,
  changeVehicleConstraintActivenessSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { VEHICLE_CONSTRAINT_STATUSES } from '@shared/shared/constants';

const Header = ({ title }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: vehicleConstraintId } = useParams();
  const classes = useStyles();

  const isPendingChangeVehicleConstraint = useSelector(changeVehicleConstraintActivenessSelector.getIsPending);
  const isPendingGetConstraint = useSelector(getVehicleConstraintSelector.getIsPending);
  const constraintData = useSelector(getVehicleConstraintSelector.getData);

  const handleConstraintActivenessChange = newActivenessStatus => {
    dispatch(Creators.changeVehicleConstraintActivenessRequest({ id: vehicleConstraintId, newActivenessStatus }));
  };

  const pageTitle = useMemo(() => {
    if (constraintData.name) return `${constraintData.name} - ${title}`;
    return title;
  }, [title, constraintData.name]);

  return (
    <div className={classes.headerContainer}>
      <PageHeader className={classes.headerTitle} title={pageTitle} />
      <Switch
        className={classes.switch}
        checkedChildren={t('global:ACTIVE')}
        unCheckedChildren={t('global:INACTIVE')}
        disabled={isPendingChangeVehicleConstraint || isPendingGetConstraint}
        checked={constraintData.status === VEHICLE_CONSTRAINT_STATUSES.ACTIVE}
        onChange={handleConstraintActivenessChange}
      />
    </div>
  );
};

export default Header;
