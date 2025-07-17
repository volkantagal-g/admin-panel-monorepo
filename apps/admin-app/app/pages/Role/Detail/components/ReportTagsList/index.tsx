import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns, getExpandedRowColumns } from './config';
import { Creators } from '../../redux/actions';
import { reportTagsSelector, reportTagReportTypesMapSelector } from '../../redux/selectors';
import TableEmpty from '@shared/shared/components/TableEmpty';

const ReportTagsList = () => {
  const { t } = useTranslation('rolePage');
  const { id: roleId } = useParams();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const canAccessReportTagDetail = canAccess(permKey.PAGE_REPORT_TAGS_DETAIL);
  const canAccessReportTypeDetail = canAccess(permKey.PAGE_REPORT_TYPES_DETAIL);
  const isReportTagsPending = useSelector(reportTagsSelector.getIsPending);
  const isReportTagsRequested = useSelector(reportTagsSelector.getIsRequested);
  const reportTags = useSelector(reportTagsSelector.getData);
  const reportTagReportTypesMap = useSelector(reportTagReportTypesMapSelector.getData);
  const tableColumns = useMemo(() => {
    return getTableColumns(t, canAccessReportTagDetail);
  }, [t, canAccessReportTagDetail]);

  const handleBringReportTagsClick = () => {
    dispatch(Creators.getReportTagsByRolesRequest({ data: { roleIds: [roleId] } }));
  };

  const getTableHeaderActionButtons = () => {
    return (
      <Button loading={isReportTagsPending} type="primary" onClick={handleBringReportTagsClick}>
        {t('BRING_REPORT_TAGS')}
      </Button>
    );
  };

  const handleExpand = (isExpanded: boolean, rowData: ReportType) => {
    const { _id } = rowData;
    const { reportTypes } = reportTagReportTypesMap[_id] || {};
    if (isExpanded && !reportTypes) {
      dispatch(Creators.getReportTypesRequest({ data: { filter: { reportTag: _id } } }));
    }
  };

  const expandedRowRender = (rowData: ReportType) => {
    const columns = getExpandedRowColumns(t, canAccessReportTypeDetail);
    const { _id } = rowData;
    const { reportTypes = [], isPending } = reportTagReportTypesMap[_id] || {};
    return <AntTableV2 columns={columns} data={reportTypes} loading={isPending} />;
  };

  const locale = {
    emptyText: (
      <TableEmpty caption={t('CLICK_TO_LOAD_THE_REPORT_TAGS')}>
        {getTableHeaderActionButtons()}
      </TableEmpty>
    ),
  };

  return (
    <AntCard bordered={false} title={t('REPORT_TAGS')} extra={getTableHeaderActionButtons()}>
      <AntTableV2
        bordered
        locale={isReportTagsRequested ? null : locale}
        columns={tableColumns}
        data={reportTags}
        loading={isReportTagsPending}
        onExpand={handleExpand}
        expandedRowRender={expandedRowRender}
      />
    </AntCard>
  );
};

export default ReportTagsList;
