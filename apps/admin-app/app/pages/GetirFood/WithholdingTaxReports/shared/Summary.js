import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider, Select } from 'antd';
import { FileAddFilled } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import useStyles from './styles';
import { decodeQueryParams, getFilterTypeOptions } from './utils';
import {
  COMMERCIAL_COMPANY_TYPES,
  COMMERCIAL_TYPE_MAPPING,
  FILE_TYPE,
  VerticalType,
  WITHHOLDING_TAX_REPORT_FILTER_TYPE,
} from './constants';
import { currencyFormat } from '@shared/utils/localization';
import { SummarySkeleton, SummaryEmpty } from './SummaryStates';
import { Button } from '@shared/components/GUI';
import useVerticalConfig from './useVerticalConfig';

const Summary = ({ vertical }) => {
  const config = useVerticalConfig(vertical);
  const { t } = useTranslation(config.translationKey);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const params = useMemo(() => decodeQueryParams(searchParams), [searchParams]);

  const [selectedFilterType, setSelectedFilterType] = useState(WITHHOLDING_TAX_REPORT_FILTER_TYPE.ALL);

  const summaryData = useSelector(config.selectors.withholdingTaxReportsSummary.getData);
  const isPending = useSelector(config.selectors.withholdingTaxReportsSummary.getIsPending);
  const isExportSummaryExcelPending = useSelector(config.selectors.excelPending.getExportSummaryExcelPending);
  const isExportSectionPending = useSelector(config.selectors.excelPending.getExportSectionPending);

  const ORDERED_COMMERCIAL_TYPES = [
    COMMERCIAL_COMPANY_TYPES.SIMPLE_PROCEDURE,
    COMMERCIAL_COMPANY_TYPES.INDIVIDUAL,
    COMMERCIAL_COMPANY_TYPES.CORPORATE,
  ];

  const handleCreateReportForAll = () => {
    dispatch(config.Creators.exportWithholdingTaxReportsSummaryExcelRequest({ period: params?.period }));
  };

  const handleExportByFilterType = fileType => {
    dispatch(config.Creators.exportWithholdingTaxReportsByFilterTypeRequest({
      fileType,
      filterType: selectedFilterType,
      period: params?.period,
    }));
  };

  const handleExcelExport = () => {
    handleExportByFilterType(FILE_TYPE.EXCEL);
  };

  const handleXMLExport = () => {
    handleExportByFilterType(FILE_TYPE.XML);
  };

  const filterOptions = getFilterTypeOptions(t, config.translationKey);

  useEffect(() => {
    if (params?.period) {
      dispatch(config.Creators.getWithholdingTaxReportsSummaryRequest({ period: params.period }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params?.period]);

  if (isPending) return <SummarySkeleton vertical={vertical} />;

  if (!summaryData) return <SummaryEmpty vertical={vertical} />;

  return (
    <AntCard title={t('SUMMARY.TITLE')} className={classes.card}>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <span className={classes.categoryTitle}>{t('SUMMARY.TOTAL_COMPANY_COUNT')}</span>
        </Col>
        <Col span={12}>
          <span className={classes.categoryLabel}>
            {summaryData?.totalPartnerCount ?? 0}
          </span>
        </Col>

        <Col span={24}>
          <Button
            color="primary"
            icon={<FileAddFilled />}
            size="small"
            onClick={handleCreateReportForAll}
            loading={isExportSummaryExcelPending}
          >
            {t('SUMMARY.CREATE_REPORT_FOR_ALL')}
          </Button>
        </Col>
      </Row>

      {ORDERED_COMMERCIAL_TYPES.map(type => {
        const typeConfig = COMMERCIAL_TYPE_MAPPING[type];
        const data = summaryData?.withholdingTaxSummaryByCommercialType?.find(item => item.commercialCompanyType === type);

        if (!data || !typeConfig) return null;

        return (
          <Row key={type} gutter={[12, 8]}>
            <Col span={24}>
              <Divider />
              <span className={classes.categoryTitle}>{t(typeConfig.titleKey)}</span>
            </Col>
            {typeConfig?.fields.map(field => (
              <React.Fragment key={field?.labelKey}>
                <Col span={14}>
                  <span className={classes.categoryLabel}>{t(field?.labelKey)}</span>
                </Col>
                <Col span={10}>
                  <span className={classes.categoryValue}>
                    {field.isCurrency
                      ? currencyFormat().format(data[field?.valueKey] ?? 0)
                      : data[field?.valueKey] ?? 0 }
                  </span>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        );
      })}

      {vertical === VerticalType.Food && (
        <>
          <Divider />

          <div className={classes.exportSection}>
            <span className={classes.categoryTitle}>
              {t('SUMMARY.EXPORT_SECTION_TITLE')}
            </span>
            <span className={classes.summaryDescription}>
              {t('SUMMARY.EXPORT_SECTION_DESCRIPTION')}
            </span>

            <div>
              <Select
                className={classes.exportFilterSelect}
                value={selectedFilterType}
                onChange={setSelectedFilterType}
                options={filterOptions}
                disabled={isExportSectionPending}
              />
            </div>

            <div className={classes.exportButtonGroup}>
              <Button
                color="default"
                size="small"
                onClick={handleExcelExport}
                loading={isExportSectionPending}
              >
                {t('SUMMARY.EXCEL_EXPORT')}
              </Button>

              <Button
                color="primary"
                size="small"
                onClick={handleXMLExport}
                loading={isExportSectionPending}
              >
                {t('SUMMARY.XML_EXPORT')}
              </Button>
            </div>
          </div>
        </>
      )}
    </AntCard>
  );
};

export default Summary;
