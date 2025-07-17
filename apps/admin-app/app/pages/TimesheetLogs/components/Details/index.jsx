import { Button, Modal } from 'antd';

import Table from './Table';

const TimesheetDetails = ({ isModalVisible, setIsModalVisible, selectedTimesheetLog, t }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      centered
      destroyOnClose
      key="timesheet-log-details"
      title="Details"
      visible={isModalVisible}
      onCancel={handleCancel}
      width="75vw"
      footer={[
        <Button key="insightDetailModalClose" onClick={handleCancel}>
          {t('TIMESHEET_LOGS_MODAL.CANCEL')}
        </Button>,
      ]}
    >
      <Table
        details={selectedTimesheetLog}
      />
    </Modal>
  );
};

export default TimesheetDetails;
