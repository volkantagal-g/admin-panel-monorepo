import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Button, DatePicker, Form } from 'antd';

import moment from 'moment';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Tabs } from '@shared/components/GUI';

import AntCard from '@shared/components/UI/AntCard';
import Summary from './Summary';
import SelectRestaurant from '@shared/containers/Select/Restaurant';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import useStyles from './styles';
import AntTable from '@shared/components/UI/AntTableV2';
import SelectLocalsMerchant from '@shared/containers/Select/LocalsMerchant';

import { decodeQueryParams, getTabItems, getIsDateDisabled } from './utils';
import useVerticalConfig from './useVerticalConfig';
import { VerticalType } from './constants';

const WithholdingTaxReports = ({ vertical }) => {
  const config = useVerticalConfig(vertical);

  const { t } = useTranslation(config.translationKey);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => decodeQueryParams(searchParams), [searchParams]);

  const data = useSelector(config.selectors.withholdingTaxReports.getData);
  const isPending = useSelector(config.selectors.withholdingTaxReports.getIsPending);
  const isExportTableExcelPending = useSelector(config.selectors.excelPending.getExportTableExcelPending);

  useInjectReducer({ key: config.reduxKey, reducer: config.reducer });
  useInjectSaga({ key: config.reduxKey, saga: config.saga });
  useInitAndDestroyPage({ dispatch, Creators: config.Creators });

  usePageViewAnalytics({
    name: config.route.name,
    squad: config.route.squad,
  });

  const fetchWithholdingTaxReports = useCallback(requestParams => {
    dispatch(config.Creators.getWithholdingTaxReportsRequest({
      companyType: config.companyTypeMap[requestParams.tab],
      period: requestParams.period,
      page: requestParams.page,
      size: requestParams.size,
      partnerId: requestParams.partnerId,
    }));
  }, [dispatch, config.Creators, config.companyTypeMap]);

  const updateParamsAndFetch = newValues => {
    const cleanParams = removeEmptyFieldsFromParams(newValues);
    setSearchParams(cleanParams);
    fetchWithholdingTaxReports(cleanParams);
  };

  useEffect(() => {
    fetchWithholdingTaxReports(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = useCallback(tabKey => {
    updateParamsAndFetch({ ...params, tab: tabKey, page: 1, partnerId: null, partnerName: null });
    form.setFieldsValue({ partnerId: null });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleFormSubmit = useCallback(formValues => {
    const newParams = {
      ...params,
      page: 1,
      period: formValues.period?.format('YYYY-MM'),
      partnerId: formValues?.partnerId?.value,
      partnerName: formValues?.partnerId?.label,
    };
    updateParamsAndFetch(newParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onPaginationChange = useCallback(pagination => {
    updateParamsAndFetch({ ...params, page: pagination?.currentPage, size: pagination?.rowsPerPage });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const tabItems = getTabItems(t);

  const initialValues = useMemo(() => ({
    period: params?.period ? moment(params.period) : moment(),
    partnerId: params?.partnerId && params?.partnerName
      ? { value: params.partnerId, label: params.partnerName }
      : null,
  }), [params?.period, params?.partnerId, params?.partnerName]);

  const onExcelClick = useCallback(partnerId => {
    dispatch(config.Creators.exportWithholdingTaxReportsExcelRequest({ partnerId, period: params?.period }));
  }, [dispatch, config.Creators, params?.period]);

  const onChangeLocalsPartnerId = useCallback((value, name) => {
    if (!value) {
      form.setFieldsValue({ partnerId: null });
      return;
    }

    form.setFieldsValue({
      partnerId: {
        value,
        label: name,
      },
    });
  }, [form]);

  const dataSource = data?.partnerTotalWithholdingTaxes;
  const total = data?.totalCount;

  const columns = config.tableColumns({
    t,
    onExcelClick,
    isExportTableExcelPending,
    tableActionReportButtonClassName: classes.tableActionReportButton,
  });

  return (
    <Row gutter={12} className="p-3">
      <Col xs={{ span: 24, order: 1 }} sm={{ span: 6, order: 2 }} md={{ span: 6, order: 2 }}>
        <Summary vertical={vertical} />
      </Col>
      <Col xs={{ span: 24, order: 2 }} sm={{ span: 18, order: 1 }} md={{ span: 18, order: 1 }}>
        <AntCard>
          <Tabs
            activeKey={params.tab}
            onChange={handleTabChange}
            items={tabItems}
          />

          <Form
            form={form}
            layout="horizontal"
            initialValues={initialValues}
            onFinish={handleFormSubmit}
          >
            <Row gutter={8}>
              <Col>
                <Form.Item
                  name="period"
                  className={classes.formItem}
                >
                  <DatePicker
                    picker="month"
                    format="MMMM YYYY"
                    allowClear={false}
                    className="w-100"
                    disabledDate={getIsDateDisabled}
                    loading={isPending}
                    disabled={isPending}
                  />
                </Form.Item>
              </Col>
              <Col>
                {vertical === VerticalType.Food ? (
                  <Form.Item
                    name="partnerId"
                    className={classes.formItem}
                  >
                    <SelectRestaurant
                      labelInValue
                      includeDeletedRestaurants
                      placeholder={t('SEARCH_PARTNER')}
                      className="w-100"
                      loading={isPending}
                      disabled={isPending}
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="partnerId"
                    className={classes.formItem}
                  >
                    <SelectLocalsMerchant
                      onChange={onChangeLocalsPartnerId}
                      placeholder={t('SEARCH_PARTNER')}
                      className="w-100"
                      loading={isPending}
                      disabled={isPending}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col>
                <Button
                  size="medium"
                  variant="contained"
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  disabled={isPending}
                  className={classes.filterButton}
                >
                  {t('global:FILTER')}
                </Button>
              </Col>
            </Row>
          </Form>

          <AntTable
            columns={columns}
            data={dataSource}
            loading={isPending}
            total={total}
            pagination={{
              currentPage: params?.page,
              rowsPerPage: params?.size,
            }}
            onPaginationChange={onPaginationChange}
            scroll={{ x: 1000, y: 600 }}
          />
        </AntCard>
      </Col>
    </Row>
  );
};

export default WithholdingTaxReports;
