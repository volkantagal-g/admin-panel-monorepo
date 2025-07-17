import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { Creators } from '../../redux/actions';

export default function AssignOrReturnConfirmation({ isConfirmed, isAssignmentConfirmation, assignmentId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetPage', 'global']);
  const [className, setClassName] = useState(() => (isConfirmed ? 'bg-success' : 'bg-danger'));

  const handleChangeConfirmation = checked => {
    setClassName(checked ? 'bg-success' : 'bg-danger');
    if (isAssignmentConfirmation) {
      dispatch(Creators.assignmentConfirmedByEmployeeRequest({ assignmentId, isConfirmed: checked }));
    }
    else {
      dispatch(Creators.returnConfirmedByEmployeeRequest({ assignmentId, isConfirmed: checked }));
    }
  };
  return (
    <Switch
      checkedChildren={t('SWITCH.YES')}
      unCheckedChildren={t('SWITCH.NO')}
      defaultChecked={isConfirmed}
      className={className}
      onClick={handleChangeConfirmation}
    />
  );
}
