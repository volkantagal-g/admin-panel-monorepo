import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Col,
  Row,
  DatePicker,
  Select,
  Button,
  Typography,
  Collapse,
  Space,
  Input,
} from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { personCandidateListSelector } from '@app/pages/Person/Candidate/List/redux/selector';
import { getLocalDateFormat } from '@shared/utils/localization';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectWorkerType from '@shared/components/Select/PersonCandidateWorkerType';
import { t } from '@shared/i18n';
import useStyles from './styles';
import SelectUser from '@shared/containers/Select/User';
import { CANDIDATE_FORM_STATUSES } from '../../constants';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = ({ filters, handleSubmit }) => {
  const classes = useStyles();
  const isPending = useSelector(personCandidateListSelector.getIsPending);

  const {
    selectedFranchise,
    selectedWarehouse,
    selectedStatus,
    selectedWorkerType,
    selectedRequestTimeRange,
    selectedAssignees,
    filteredUniqueIdentifier,
  } = filters;

  const [users, setUsers] = useState(undefined);
  const [franchise, setFranchise] = useState(selectedFranchise);
  const [warehouse, setWarehouse] = useState(selectedWarehouse);
  const [timeRange, setTimeRange] = useState(selectedRequestTimeRange);
  const [workerType, setWorkerType] = useState(selectedWorkerType);
  const [status, setStatus] = useState(selectedStatus);
  const [assignees, setAssignees] = useState(selectedAssignees);
  const [uniqueIdentifier, setUniqueIdentifier] = useState(
    filteredUniqueIdentifier,
  );
  const requestStatusSelectOptions = convertConstantValuesToSelectOptions(
    CANDIDATE_FORM_STATUSES,
  );

  const handleSelectedFranchise = fr => {
    setFranchise(fr);
  };

  const handleSelectedWarehouse = wr => {
    setWarehouse(wr);
  };

  const handleSelectedRequestTimeRange = tr => {
    setTimeRange(tr);
  };

  const handleSelectedWorkerType = wt => {
    setWorkerType(wt);
  };

  const handleSelectedStatus = st => {
    setStatus(st && [st]);
  };

  const handleSelectedAssignees = stat => {
    const assigneeIds = stat.map(assignee => assignee.value);
    setAssignees(assigneeIds);
    setUsers(stat);
  };

  const handleFilteredUniqueIdentifier = uniqueId => {
    setUniqueIdentifier(uniqueId);
  };

  const submitButtonClick = () => {
    handleSubmit({
      selectedFranchise: franchise,
      selectedWarehouse: warehouse,
      selectedWorkerType: workerType,
      selectedRequestTimeRange: timeRange,
      selectedStatus: status,
      selectedAssignees: assignees,
      filteredUniqueIdentifier: uniqueIdentifier,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    className={classes.inputWrapper}
                    value={timeRange}
                    onChange={handleSelectedRequestTimeRange}
                    format={getLocalDateFormat()}
                    allowClear
                    disabled={isPending}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('personCandidatePage:FRANCHISE')}</Text>
                  <SelectFranchise
                    allowClear
                    disabled={isPending}
                    value={franchise}
                    onChange={handleSelectedFranchise}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('personCandidatePage:WORKER_TYPE')}</Text>
                  <SelectWorkerType
                    allowClear
                    disabled={isPending}
                    value={workerType}
                    placeholder={t('global:FILTER')}
                    onChange={handleSelectedWorkerType}
                    className={classes.inputWrapper}
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <SelectWarehouse
                    franchiseIds={franchise?.length && [franchise]}
                    isDisabled={isPending}
                    value={warehouse}
                    onChange={handleSelectedWarehouse}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('personCandidatePage:COLUMNS.ASSIGNEE')}</Text>
                  <SelectUser
                    value={users}
                    mode="multiple"
                    onChange={newSelectedUsers => {
                      handleSelectedAssignees(newSelectedUsers);
                    }}
                    labelInValue
                  />
                </Col>
                <Col span={12}>
                  <Text>{t('global:IDENTIFICATION_NUMBER')}</Text>
                  <Input
                    placeholder={t('global:FILTER')}
                    onChange={e => handleFilteredUniqueIdentifier(e.target.value)}
                    value={uniqueIdentifier}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>{t('global:STATUS')}</Text>
                  <Select
                    disabled={isPending}
                    showArrow
                    allowClear
                    value={status}
                    options={requestStatusSelectOptions}
                    placeholder={t('global:FILTER')}
                    onChange={handleSelectedStatus}
                    className={classes.inputWrapper}
                  />
                </Col>
              </Row>
              <Row className={classes.submitButtonContainer}>
                <Button type="primary" onClick={submitButtonClick}>
                  {t('global:BRING')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
