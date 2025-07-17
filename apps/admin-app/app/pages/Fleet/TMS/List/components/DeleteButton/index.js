import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/Fleet/TMS/List/redux/action';

function DeleteButton(props) {
  const { id } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [vehicleId, setVehicleId] = useState(null);

  useEffect(() => {
    if (vehicleId) {
      dispatch(Creators.deleteVehicle({ id: vehicleId }));
    }
  }, [dispatch, vehicleId]);

  return (
    <Space>
      <Button
        {...props}
        size="small"
        variant="contained"
        type="default"
        onClick={() => {
          setVehicleId(id);
        }}
      >
        {t('global:DELETE')}
      </Button>
    </Space>
  );
}

export default DeleteButton;
