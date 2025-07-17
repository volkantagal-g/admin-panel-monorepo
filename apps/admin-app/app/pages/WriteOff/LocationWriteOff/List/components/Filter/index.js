import { useState } from 'react';
import { Row, Col, Collapse, Space, Typography, DatePicker, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectLocationWarehouses from '../LocationWarehouses';
import SelectReasons from '../Reasons';
import SelectLocations from '../Locations';
import SelectStatuses from '../Statuses';
import useStyles from './styles';
import { getLocalDateFormat } from '@shared/utils/localization';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Panel } = Collapse;

function Filter({ filters, handleSubmit, isPending }) {
  const [selectedWarehouses, setSelectedWarehouses] = useState(filters.warehouses);
  const [creationDates, setCreationDates] = useState(filters.creationDates);
  const [confirmationDates, setConfirmationDates] = useState(filters.confirmationDates);
  const [selectedStatuses, setSelectedStatuses] = useState(filters.statuses);
  const [selectedLocations, setSelectedLocations] = useState(filters.locations);
  const [selectedReasons, setSelectedReasons] = useState(filters.reasons);

  const { t } = useTranslation();

  const classes = useStyles();

  const submitButtonClick = () => {
    handleSubmit({
      createdAt: creationDates?.[0] && creationDates?.[1] ? { startDate: creationDates[0], endDate: creationDates[1] } : undefined,
      approvedAt:
        confirmationDates?.[0] && confirmationDates?.[1] ? { startDate: confirmationDates[0], endDate: confirmationDates[1] } : undefined,
      locations: selectedLocations,
      statuses: selectedStatuses,
      reasons: selectedReasons,
      warehouses: selectedWarehouses,
    });
  };

  const handleWarehouseChange = warehouses => {
    setSelectedWarehouses(warehouses);
    setSelectedLocations(undefined);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Text>{t('global:CREATION_DATE')}</Text>
              <RangePicker value={creationDates} onChange={setCreationDates} format={getLocalDateFormat()} disabled={isPending} />
              <Text>{t('global:CONFIRMATION_DATE')}</Text>
              <RangePicker value={confirmationDates} onChange={setConfirmationDates} format={getLocalDateFormat()} disabled={isPending} />
              <Text>{t('global:WAREHOUSE')}</Text>
              <SelectLocationWarehouses
                value={selectedWarehouses}
                onChange={handleWarehouseChange}
                disabled={isPending}
                mode="multiple"
              />
              <Text>{t('global:LOCATION')}</Text>
              <SelectLocations
                warehouses={selectedWarehouses}
                value={selectedLocations}
                mode="multiple"
                showArrow={false}
                onChange={setSelectedLocations}
                isDisabled={isPending}
              />
              <Text>{t('global:STATUS')}</Text>
              <SelectStatuses
                value={selectedStatuses}
                mode="multiple"
                onChange={setSelectedStatuses}
                showArrow={false}
                isDisabled={isPending}
              />
              <Text>{t('global:REASON')}</Text>
              <SelectReasons
                value={selectedReasons}
                mode="multiple"
                showArrow={false}
                onChange={setSelectedReasons}
                isDisabled={isPending}
              />
              <div className={classes.buttonContainer}>
                <Button type="primary" onClick={submitButtonClick}>
                  {t('global:BRING')}
                </Button>
              </div>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
