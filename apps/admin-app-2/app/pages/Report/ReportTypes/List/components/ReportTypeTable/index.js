import { Input, Select, Tag, Row, Col } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';

import { getReportTypes, getAllReportTags } from '../../redux/selectors';
import { getColumns } from './config';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { DEFAULT_PAGE_SIZE, TAG_VALUE_SEPARATOR } from '../../constants';
import { getCustomTagValue, getReportTagIdFromCustomValue } from '../../../utils';
import { TEST_ID_FOR_REPORT_TYPE } from '@app/pages/Report/constants';

const { Option } = Select;

export default function ReportTypeTable({ canAccessDetail }) {
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchStr, setSearchStr] = useState('');
  const [reportTag, setReportTag] = useState();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: DEFAULT_PAGE_SIZE });

  const reportTags = useSelector(getAllReportTags.getData);
  const areReportTagsPending = useSelector(getAllReportTags.getIsPending);
  const reportTagOptions = useMemo(
    () => reportTags.map(rt => {
      const customValue = getCustomTagValue(rt);
      return (
        <Option
          label={rt.name[getLangKey()]}
          value={customValue}
          style={{ backgroundColor: rt.backgroundColor, color: rt.textColor }}
          key={rt._id}
        >
          {rt.name[getLangKey()]}
        </Option>
      );
    }),
    [reportTags],
  );

  const { reportTypes, totalCount } = useSelector(getReportTypes.getData);
  const reportTypesPending = useSelector(getReportTypes.getIsPending);

  const columns = useMemo(() => getColumns(t, canAccessDetail, pagination, classes), [t, canAccessDetail, pagination, classes]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    const offset = (currentPage - 1) * rowsPerPage;
    const reportTagId = reportTag ? getReportTagIdFromCustomValue(reportTag) : null;
    setPagination({ currentPage, rowsPerPage });
    dispatch(Creators.getReportTypesRequest({ data: { limit: rowsPerPage, offset, filter: { searchStr, reportTag: reportTagId } } }));
  };
  const handleReportTagChange = useCallback(v => {
    const { rowsPerPage } = pagination;
    const offset = 0;
    const reportTagId = v ? getReportTagIdFromCustomValue(v) : null;
    dispatch(Creators.getReportTypesRequest({ data: { limit: rowsPerPage, offset, filter: { searchStr, reportTag: reportTagId } } }));
    setReportTag(v);
    setPagination(prevState => ({ ...prevState, currentPage: 1 }));
  }, [dispatch, pagination, searchStr]);
  const handleAfterSearch = useCallback(str => {
    const { rowsPerPage } = pagination;
    const offset = 0;
    const reportTagId = reportTag ? getReportTagIdFromCustomValue(reportTag) : null;
    dispatch(Creators.getReportTypesRequest({ data: { limit: rowsPerPage, offset, filter: { searchStr: str, reportTag: reportTagId } } }));
    setPagination(prevState => ({ ...prevState, currentPage: 1 }));
  }, [dispatch, pagination, reportTag]);
  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleAfterSearch, delay: DEFAULT_DEBOUNCE_MS });
  return (
    <>
      <Row>
        <Col md={12} xs={24}>
          <Input
            value={searchStr}
            onChange={e => {
              setSearchStr(e.target.value);
              debouncedHandleSearch(e.target.value);
            }}
            id="searchStr"
            placeholder={t('global:SEARCH')}
          />
        </Col>
        <Col md={12} xs={24}>
          <Select
            className={classes.fullWidth}
            mode="single"
            value={reportTag}
            tagRender={tagRender}
            onChange={handleReportTagChange}
            filterOption={getSelectFilterOption}
            disabled={areReportTagsPending}
            optionFilterProp="label"
            placeholder={t('reportsPage:REPORT_TAG')}
            data-testid={TEST_ID_FOR_REPORT_TYPE.reportTagSelect}
            showSearch
            allowClear
          >
            {reportTagOptions}
          </Select>
        </Col>
      </Row>
      <hr />
      <AntTableV2
        data={reportTypes}
        columns={columns}
        loading={reportTypesPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        className={classes.antTable}
        total={totalCount}
        data-testid={TEST_ID_FOR_REPORT_TYPE.reportTypeTable}
      />
    </>
  );
}

function tagRender(props) {
  const { label, value, onClose } = props;
  // we have to do this to pass colors with value, custom fields are not passed with props so we generate value from colors
  // there is no documentation about tagRender for more control
  // https://ant.design/components/select/#API you can look at tagRender prop
  const [, backgroundColor, color, canClose] = value.split(TAG_VALUE_SEPARATOR);
  const closable = canClose === 'true';

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3, backgroundColor, color }}>
      {label}
    </Tag>
  );
}
