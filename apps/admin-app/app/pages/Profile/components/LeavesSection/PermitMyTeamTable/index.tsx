import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { exportExcel } from '@shared/utils/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { getPermitInfoOfManagersTeamSelector } from '../../../redux/selectors';
import { LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';

const PermitMyTeamTable: React.FC = () => {
  const { t } = useTranslation(['employeePage']);
  const columns = getTableColumns(t);
  const permitInfoOfEmployeesTeam = useSelector(getPermitInfoOfManagersTeamSelector.getData);
  const isPending = useSelector(getPermitInfoOfManagersTeamSelector.getIsPending);

  const handleExportClick = () => {
    const excelColumns = columns.map(({ title, dataIndex }) => ({ title, key: dataIndex }));
    exportExcel(
      permitInfoOfEmployeesTeam,
      `${t('employeePage:EXCEL_FILE_NAME.MY_TEAM_LEAVES')}_${moment().format(LOCAL_DATE_TIME_FORMAT[getLangKey().toUpperCase()])}`,
      excelColumns,
    );
  };

  return (
    <AntTableV2
      size="small"
      columns={columns}
      data={permitInfoOfEmployeesTeam}
      loading={isPending}
      scroll={{ y: 500 }}
      onExport={handleExportClick}
    />
  );
};

export default PermitMyTeamTable;
