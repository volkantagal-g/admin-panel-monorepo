import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/action';
import { vehicleListSelector } from '../../redux/selector';
import { bulkUploadWarningColumns } from './config';
import useStyles from './styles';
import { t } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const WarningModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isCsvWarningModalVisible = useSelector(vehicleListSelector.isCsvWarningModalVisible);
  const data = useSelector(vehicleListSelector.getFailedUploadCsvVehicleLogs);

  return (
    <Modal
      visible={isCsvWarningModalVisible}
      title={t('marketVehicle:UPLOAD_CSV_WARNING_MODAL.TITLE')}
      className={classes.container}
      width="70vw"
      footer={false}
      onCancel={() => dispatch(Creators.updateCsvWarningModalVisibility({ showCsvWarningModal: !isCsvWarningModalVisible }))}
    >
      <AntTableV2
        data={data || []}
        columns={bulkUploadWarningColumns({ t })}
        loading={false}
      />
    </Modal>
  );
};

export default WarningModal;
