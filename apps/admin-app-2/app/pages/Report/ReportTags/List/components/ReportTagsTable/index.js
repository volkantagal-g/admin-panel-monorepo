import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Input } from 'antd';

import { getLangKey } from '@shared/i18n';

import useStyles from './styles';
import { getColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';

export default function ReportTagsTable({ reportTags, isPending, canAccessDetail }) {
  const { t } = useTranslation('reportsPage');
  const [searchStr, setSearchStr] = useState('');
  const classes = useStyles();
  const columns = getColumns(t, canAccessDetail);
  const filtered = filterReportTags(reportTags, searchStr);

  return (
    <>
      <Input value={searchStr} onChange={e => setSearchStr(e.target.value)} id="searchStr" placeholder={t('global:FILTER')} />
      <hr />
      <AntTableV2 data={filtered} columns={columns} loading={isPending} className={classes.antTable} />
    </>
  );
}
function filterReportTags(reportTags, searchStr) {
  return reportTags.filter(rt => {
    const nameL = rt.name[getLangKey()].toLocaleLowerCase();
    const searchL = searchStr.toLocaleLowerCase();
    return nameL.includes(searchL);
  });
}
