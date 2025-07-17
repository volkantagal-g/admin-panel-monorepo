import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { exportVehicle } from './exportFunction';
import useStyles from './styles';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function ExportButton(props) {
  const { t } = useTranslation(['marketVehicle']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleExport = () => {
    dispatch(ToastCreators.success({ message: t('marketVehicle:EXPORT_MESSAGE') }));
    exportVehicle(props?.filters, true);
  };

  return (
    <Space>
      <Button
        {...props}
        size="small"
        variant="contained"
        type="default"
        className={classes.exportButton}
        onClick={handleExport}
        data-testid="exportButton"
      >
        {t('global:EXPORT_EXCEL')}
      </Button>
    </Space>
  );
}

export default ExportButton;
