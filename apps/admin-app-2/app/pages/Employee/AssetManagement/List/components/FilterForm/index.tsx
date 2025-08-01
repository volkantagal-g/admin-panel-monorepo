import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Form, Row, Skeleton, Space } from 'antd';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  assetFilterComponents,
  filteredAssetsDataSelector,
  filtersSelector,
} from '@app/pages/Employee/AssetManagement/List/redux/selectors';
import { rowIndexSorter } from '@app/pages/Employee/AssetManagement/utils';
import { getLangKey } from '@shared/i18n.ts';
import { DynamicAssetFormItem } from '@app/pages/Employee/AssetManagement/components';
import { Creators } from '@app/pages/Employee/AssetManagement/List/redux/actions';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import { FILTER_DISABLED_TABS } from '@app/pages/Employee/AssetManagement/constants';

const FilterForm = () => {
  const { t } = useTranslation(['global', 'assetManagement']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const filterMetadata = useSelector(assetFilterComponents.getData);
  const isFilterComponentsPending = useSelector(assetFilterComponents.isPending);
  const isFilteredAssetsPending = useSelector(filteredAssetsDataSelector.isPending);
  const filters = useSelector(filtersSelector.getData);
  const pagination = useSelector(filtersSelector.getPagination);
  const moduleClasses = useModuleStyles();

  const [vehicleBrand, setVehicleBrand] = useState<number>();
  const [vehicleModel, setVehicleModel] = useState<number>();

  const externalFormStates = {
    vehicleBrand: {
      value: vehicleBrand,
      setValue: setVehicleBrand,
    },
    vehicleModel: {
      value: vehicleModel,
      setValue: setVehicleModel,
    },
  };

  const handleSubmit = (formValues: FilterData) => {
    dispatch(Creators.updateFilters({
      filters: {
        ...formValues,
        pagination: {
          currentPage: 1,
          rowsPerPage: pagination.rowsPerPage,
        },
      },
    }));
  };

  const resetFormData = () => {
    form.resetFields();
    setVehicleBrand(undefined);
    setVehicleModel(undefined);
    dispatch(Creators.updateFilters({ filters: {}, resetSelectedFilters: true }));
  };

  // reset form data when tab changes
  useEffect(() => {
    form.resetFields();
    setVehicleBrand(undefined);
    setVehicleModel(undefined);
  }, [filters?.activeTabKey, form]);

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

  const isFilterDisabled = FILTER_DISABLED_TABS?.includes(filters?.activeTabKey);

  return (
    <Form
      id="assetFilterForm"
      form={form}
      layout="vertical"
      scrollToFirstError
      onFinish={handleSubmit}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          form.submit();
        }
      }}
    >
      <Space direction="vertical" className="w-100">
        {filterMetadata?.sort(rowIndexSorter).map((mData: AssetFilterTypeMetaData) => (
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
                        // rules={rules}
                        externalFormStates={externalFormStates}
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
              loading={isFilteredAssetsPending}
              disabled={isFilterDisabled}
            >
              {t('global:RESET')}
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              className={moduleClasses.buttonContainer}
              loading={isFilteredAssetsPending}
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

export default FilterForm;
