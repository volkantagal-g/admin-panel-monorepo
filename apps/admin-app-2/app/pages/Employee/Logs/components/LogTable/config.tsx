import moment from 'moment';

import { t, getLangKey } from '@shared/i18n';
import { LOCAL_DATE_FORMAT, LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';
import { EMPLOYEE_CHANGE_LOG_CHANGE_MODELS } from '../../../constants';

import { getFormattedValue } from '../../utils';

export function getTableColumns() {
  const langKey = getLangKey();

  return [
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.TIMESTAMP'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 145,
      render: (createdAt: moment.Moment | undefined) => moment(createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-',
    },
    {
      title: t('employeePage:EFFECTIVE_DATE'),
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
      width: 100,
      render: (effectiveDate: moment.Moment | undefined) => moment(effectiveDate).format(LOCAL_DATE_FORMAT[langKey.toUpperCase()]) || '-',
    },
    {
      title: t('global:REASON'),
      dataIndex: 'reason',
      key: 'reason',
      width: 110,
      render: (reason: string) => (reason ? t(`employeePage:EMPLOYEE_CHANGE_LOG_REASONS.${reason}`) : '-'),
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_EMPLOYEE_ID'),
      dataIndex: ['employee', '_id'],
      width: 165,
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_EMPLOYEE'),
      dataIndex: ['employee', 'fullName'],
      width: 145,
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.ACTION_BY_ID'),
      dataIndex: ['actionBy', 'id'],
      width: 165,
      render: (actionById: string) => actionById || '-',
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.ACTION_BY'),
      dataIndex: ['actionBy', 'name'],
      width: 135,
      render: (actionByName: string) => actionByName || '-',
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.EFFECTED_FIELD'),
      dataIndex: 'fieldPath',
      key: 'fieldPath',
      width: 140,
      render: (fieldPath: string, { changeModel = EMPLOYEE_CHANGE_LOG_CHANGE_MODELS.EMPLOYEE } = {}) => {
        const updatedFieldPath = fieldPath.includes('.') ? fieldPath.replace('.', '_') : fieldPath;
        return t(`employeeLogsPage:FIELD_PATHS.${changeModel}.${updatedFieldPath}`);
      },
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.OLD_VALUE'),
      dataIndex: 'oldValue',
      key: 'oldValue',
      width: 140,
      render: (oldValue: string, {
        fieldPath,
        changeModel = EMPLOYEE_CHANGE_LOG_CHANGE_MODELS.EMPLOYEE,
      }: { fieldPath: string, changeModel: string }) => {
        return getFormattedValue(oldValue, { fieldPath, changeModel });
      },
    },
    {
      title: t('employeeLogsPage:LOGS_TABLE.COLUMNS.NEW_VALUE'),
      dataIndex: 'newValue',
      key: 'newValue',
      width: 140,
      render: (newValue: string, {
        fieldPath,
        changeModel = EMPLOYEE_CHANGE_LOG_CHANGE_MODELS.EMPLOYEE,
      }: { fieldPath: string, changeModel: string }) => {
        return getFormattedValue(newValue, { fieldPath, changeModel });
      },
    },
  ];
}
