import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Form, Row, Skeleton, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import {
  assetLogComponents,
  filteredLogs,
  filtersSelector,
} from '../../redux/selectors';
import { rowIndexSorter } from '@app/pages/Employee/AssetManagement/utils';
import { getLangKey } from '@shared/i18n.ts';
import { DynamicAssetFormItem } from '@app/pages/Employee/AssetManagement/components';
import { Creators } from '../../redux/actions';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';

const LogFilterForm = () => {
  const { t } = useTranslation(['global', 'assetManagement']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const logMetadata = useSelector(assetLogComponents.getData);
  const isFilterComponentsPending = useSelector(assetLogComponents.isPending);
  const isFilteredAssetLogsPending = useSelector(filteredLogs.isPending);
  const pagination = useSelector(filtersSelector.getPagination);

  const moduleClasses = useModuleStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const assetId = searchParams.get('assetId');
  const handleSubmit = (formValues: FilterData) => {
    dispatch(Creators.updateFilters({
      filters: {
        ...formValues,
        uniqueIdentifier: assetId,
        pagination: {
          currentPage: 1,
          rowsPerPage: pagination.rowsPerPage,
        },
      },
    }));
  };

  useEffect(() => {
    if (assetId) {
      dispatch(Creators.updateFilters({
        filters: {
          uniqueIdentifier: assetId,
          pagination: {
            currentPage: 1,
            rowsPerPage: 10,
          },
        },
      }));
    }
    // // if navigated from asset detail page, filter by assetId only when initially opened
    // eslint-disable-next-line
  }, [dispatch]);

  const resetFormData = () => {
    form.resetFields();
    searchParams.delete('assetId');
    setSearchParams(searchParams);
    dispatch(Creators.updateFilters({ resetSelectedFilters: true }));
  };

  const renderLoading = () => {
    return (
      <Space direction="vertical" className="w-100">
        <Card className={moduleClasses.cardContainer}>
          <Skeleton active />
        </Card>

        <Card className={moduleClasses.cardContainer}>
          <Skeleton active />
        </Card>
      </Space>
    );
  };

  if (isFilterComponentsPending) {
    return renderLoading();
  }

  const isFilterDisabled = isFilterComponentsPending;

  return (
    <Form
      id="assetLogFilterForm"
      form={form}
      layout="vertical"
      scrollToFirstError
      onFinish={handleSubmit}
    >
      <Space direction="vertical" className="w-100">
        {logMetadata?.sort(rowIndexSorter).map((mData: AssetFilterTypeMetaData) => (
          <Card
            bordered
            className={moduleClasses.cardContainer}
            title={mData?.groupTitle?.[getLangKey()]}
            key={mData?.groupTitle?.[getLangKey()]}
          >
            {mData.rows?.map((mDataRow: Row) => (
              <Row key={mDataRow.rowIndex} gutter={[12, 0]}>
                {mDataRow.columns?.map((mDataCol: Column) => {
                  return mDataCol?.isUIEnabled && (
                    <Col key={`${mDataCol.fieldName}-col`} {...(mDataCol.spanCoefficient || {})}>
                      <DynamicAssetFormItem
                        key={`${mDataCol.fieldName}-dynamic-asset-form-item`}
                        form={form}
                        itemConfig={mDataCol}
                        disabled={isFilterDisabled}
                      />
                    </Col>
                  );
                })}
              </Row>
            ))}
          </Card>
        ))}

        <Row justify="end">
          <Col
            className={moduleClasses.actionButtonContainer}
          >
            <Button
              type="default"
              className={moduleClasses.buttonContainer}
              onClick={resetFormData}
              loading={isFilteredAssetLogsPending}
              disabled={isFilterDisabled}
            >
              {t('global:RESET')}
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              className={moduleClasses.buttonContainer}
              loading={isFilteredAssetLogsPending}
              disabled={isFilterDisabled}
            >
              {t('global:FILTER')}
            </Button>

          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default LogFilterForm;
