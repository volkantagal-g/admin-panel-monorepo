import moment from 'moment';
import { isEmpty, isUndefined } from 'lodash';
import { Popover, Button, Popconfirm } from 'antd';

import { getLimitAndOffset } from '@shared/utils/common';
import { PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';
import { DetailButton } from '@shared/components/UI/List';

export const getPersonCandidateListRequestParams = (filters, includePaginationParams = true) => {
  const params = {};
  const {
    selectedFranchise,
    selectedWarehouse,
    selectedRequestTimeRange,
    selectedStatus,
    selectedWorkerType,
    selectedAssignees,
    filteredUniqueIdentifier,
    currentPage,
    rowsPerPage,
  } = filters;

  if (selectedFranchise) {
    params.franchise = selectedFranchise;
  }

  if (selectedWarehouse) {
    params.warehouse = selectedWarehouse;
  }

  if (selectedStatus) {
    params.status = selectedStatus;
  }

  if (selectedWorkerType) {
    params.workerType = selectedWorkerType;
  }

  if (!isEmpty(selectedRequestTimeRange)) {
    const [startDate, endDate] = selectedRequestTimeRange;
    params.startDate = moment(startDate).startOf('day');
    params.endDate = moment(endDate).endOf('day');
  }
  if (selectedAssignees?.length) {
    params.assignees = selectedAssignees;
  }

  if (filteredUniqueIdentifier) {
    params.uniqueIdentifier = filteredUniqueIdentifier;
  }

  if (includePaginationParams) {
    const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });
    params.limit = limit;
    params.offset = offset;
  }

  return params;
};

export const mapActionHistoryLogs = ({ logs, candidate }) => {
  if (!logs || !candidate) return [];
  const firstStatusLog = logs.find(log => !isUndefined(log.info?.oldStatus));
  const firstAssigneeLog = logs.find(log => !isUndefined(log.info?.newAssignee));
  let status = firstStatusLog?.info?.oldStatus || candidate.status;
  let responsiblePerson = firstAssigneeLog?.info?.newAssignee || candidate.assignee;
  return logs.map(log => {
    if (log.info?.newStatus) {
      status = log.info.newStatus;
    }
    if (log.info?.newAssignee) {
      responsiblePerson = log.info.newAssignee;
    }
    return {
      type: log.type,
      status,
      responsiblePerson,
      performer: log.owner,
      date: log.createdAt,
    };
  });
};

const renderTableActionHistoryLogButton = ({ t, classes, handleLogHistoryClick, candidate }) => (
  <Button size="small" className={classes.button} onClick={() => handleLogHistoryClick({ candidate })}>
    {t('ACTION_HISTORY_BUTTON')}
  </Button>
);

const renderTableDetailButton = ({ t, status, classes, rejectDescription, _id, urlPath }) => {
  if (status === PERSON_CANDIDATE_FORM_STATUSES.CANDIDATE_CANCELED_THE_PROCESS) {
    return (
      <Button size="small" disabled className={classes.button}>
        {t('global:DETAIL')}
      </Button>
    );
  }
  if (status === PERSON_CANDIDATE_FORM_STATUSES.REJECTED) {
    return (
      <Popover content={rejectDescription} title={t('PERSON_FORM.REJECT_REASON')} trigger="click">
        <Button className={classes.button} size="small">
          {t('global:DETAIL')}
        </Button>
      </Popover>
    );
  }
  return DetailButton({
    _id,
    urlPath,
  });
};

const renderTableBeResponsibleButton = ({ t, classes, handleAssignClick, _id, isPending }) => (
  <Popconfirm
    onConfirm={() => handleAssignClick({ candidateId: _id })}
    okText={t('button:YES')}
    cancelText={t('button:CANCEL')}
    title={t('BE_RESPONSIBLE.CONFIRM')}
    disabled={isPending}
  >
    <Button className={classes.button} size="small" disabled={isPending} type="warning">
      {t('BE_RESPONSIBLE.BUTTON')}
    </Button>
  </Popconfirm>
);

export const renderTableButtons = ({
  t,
  classes,
  candidate,
  status,
  rejectDescription,
  urlPath,
  handleLogHistoryClick,
  handleAssignClick,
  isPending,
}) => {
  const hideResponsibleButton = [PERSON_CANDIDATE_FORM_STATUSES.APPROVED, PERSON_CANDIDATE_FORM_STATUSES.REJECTED].includes(status);
  return (
    <>
      {!hideResponsibleButton && renderTableBeResponsibleButton({ t, classes, handleAssignClick, _id: candidate._id, isPending })}
      {renderTableDetailButton({ t, status, classes, rejectDescription, _id: candidate._id, urlPath })}
      {renderTableActionHistoryLogButton({ t, classes, handleLogHistoryClick, candidate })}
    </>
  );
};
