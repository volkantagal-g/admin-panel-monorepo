import { useTranslation } from 'react-i18next';

import { Row, Card, Col, Radio, Input, Divider, notification, Form, Typography } from 'antd';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import _ from 'lodash';
import { useEffect } from 'react';

import { detailCourierGamificationTaskByIdSelector } from '../../Detail/redux/selectors';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import {
  TASK_COVERAGE_CHOOSING_COURIER_TYPES,
  WAREHOUSE_REQUEST_FIELDS_STRING,
  PERSON_UPLOAD_CSV_COLUMN_TITLE,
  PERSON_IDS_EXAMPLE_DATA,
} from '../../constant';
import useStyles from './styles';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AntCard from '@shared/components/UI/AntCard';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { collectPersonIds } from '../../Create/formHelper';
import { Creators as CreateCreators } from '../../Create/redux/actions';
import { createCourierGamificationTaskSelector } from '../../Create/redux/selectors';
import SelectCities from '../SelectCities';
import SelectWarehouses from '../SelectWarehouses';
import SelectDomains from '../SelectDomains';

const { Text } = Typography;

const TaskCoverage = (
  {
    values,
    touched,
    errors,
    handleChangeForm,
    isDisabledWarehouseSelectionOnCoverage,
    setIsDisabledWarehouseSelectionOnCoverage,
    onDetail = false,
    isDisable,
    radioGroupValue,
    setRadioGroupValue,
  },
) => {
  const classes = useStyles();
  const data = useSelector(createCourierGamificationTaskSelector.getData);
  const detailData = useSelector(detailCourierGamificationTaskByIdSelector.getData);
  const { t } = useTranslation('courierGamificationPage');
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest({ countryId: selectedCountry._id }));
  }, [dispatch, selectedCountry._id]);

  useEffect(() => {
    const getFilteredWarehouses = ({ citiesForWarehouse, domainTypesForWarehouse }) => {
      dispatch(
        CommonCreators.getFilteredWarehousesRequest({
          cities: citiesForWarehouse?.length ? citiesForWarehouse : undefined,
          domainTypes: domainTypesForWarehouse?.length ? domainTypesForWarehouse : undefined,
          fields: WAREHOUSE_REQUEST_FIELDS_STRING,
        }),
      );
    };

    if (values?.taskCoverage?.cityIds?.length > 0) {
      getFilteredWarehouses({ citiesForWarehouse: values?.taskCoverage?.cityIds, domainTypesForWarehouse: values?.taskCoverage?.domainTypes });
    }
  }, [dispatch, values?.taskCoverage?.cityIds, values?.taskCoverage?.domainTypes]);

  const handleImport = csvData => {
    if (!csvData?.data[0][1] || csvData?.data[0][0] !== PERSON_UPLOAD_CSV_COLUMN_TITLE) {
      const tmpPersonIds = collectPersonIds(csvData?.data);
      handleChangeForm(PERSON_UPLOAD_CSV_COLUMN_TITLE, tmpPersonIds);
      notification.success({ message: t('CREATE.CSV_FORMAT_TRUE') });
    }
    else {
      notification.error({ message: t('CREATE.CSV_FORMAT_NOT_TRUE') });
    }
  };

  useEffect(() => {
    if (values?.taskCoverage?.warehouseIds?.length > 0) {
      dispatch(CreateCreators.getPersonIdsListRequest({ warehouseIds: values?.taskCoverage?.warehouseIds }));
    }
  }, [dispatch, values?.taskCoverage?.warehouseIds]);

  const getUploadValueText = ({
    values: formValues,
    t: translate,
    onDetail: isOnDetail,
    radioGroupValue: selectedRadioValue,
    detailData: details,
    data: dataList,
  }) => {
    if (formValues?.personIds?.length > 0) {
      return `${formValues.personIds.length} ${translate('CREATE.UPLOAD_VALUE_TEXT')}`;
    }

    if (isOnDetail && selectedRadioValue === TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD) {
      const count = details?.courierCount > 0 ? details.courierCount : dataList?.personIdsList?.length;
      return `${count} ${translate('CREATE.UPLOAD_VALUE_TEXT')}`;
    }

    return null;
  };

  const handleRadioGroupChanges = val => {
    setIsDisabledWarehouseSelectionOnCoverage(val === TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD);
    setRadioGroupValue(val);

    if (isDisabledWarehouseSelectionOnCoverage || TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD === val) {
      handleChangeForm('taskCoverage.warehouseIds', []);
      handleChangeForm('taskCoverage.cityIds', []);
    }

    if (val === TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD) {
      handleChangeForm('personIds', []);
    }

    if (TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD === val) {
      dispatch(CreateCreators.cleanPersonIds());
    }
  };

  return (
    <Card size="small" title={t('CREATE.TASK_COVERAGE')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={24}>
          <Col span={12}>
            <SelectDomains
              label={t('CREATE.DOMAIN_TYPES')}
              selectKey="taskCoverage.domainTypes"
              fieldName="taskCoverage.domainTypes"
              errors={errors}
              disabled={isDisable}
              value={values?.taskCoverage?.domainTypes}
              onChangeCallback={val => handleChangeForm('taskCoverage.domainTypes', val)}
            />
          </Col>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Radio.Group
            className="w-100"
            onChange={e => {
              handleRadioGroupChanges(e?.target?.value);
            }}
            value={radioGroupValue}
            disabled={isDisable || onDetail}
          >
            <AntCard
              bordered={false}
              title={(
                <Row>
                  <Radio value={TASK_COVERAGE_CHOOSING_COURIER_TYPES.WAREHOUSE_CHOOSE}>
                    {t('CREATE.WAREHOUSE_CHOOSE')}
                  </Radio>
                </Row>
              )}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <SelectCities
                    selectKey="taskCoverage.cityIds"
                    fieldName="taskCoverage.cityIds"
                    errors={errors}
                    touched={touched}
                    disabled={(isDisabledWarehouseSelectionOnCoverage || isDisable || onDetail)}
                    value={values?.taskCoverage?.cityIds}
                    onChangeCallback={val => handleChangeForm('taskCoverage.cityIds', val)}
                  />
                </Col>
                <Col span={12}>
                  <SelectWarehouses
                    selectKey="taskCoverage.warehouseIds"
                    fieldName="taskCoverage.warehouseIds"
                    errors={errors}
                    touched={touched}
                    disabled={(isDisabledWarehouseSelectionOnCoverage || values?.taskCoverage?.cityIds?.length === 0) || isDisable || onDetail}
                    value={values?.taskCoverage?.warehouseIds}
                    onChangeCallback={val => handleChangeForm('taskCoverage.warehouseIds', val)}
                  />
                </Col>
              </Row>
              <Row justify="space-between" align="middle">
                <Text>
                  {t('CREATE.CHOOSEN_WAREHOUSE_TEXT_1')}
                  <Text strong className={classes.courierCountText}>
                    {(isDisabledWarehouseSelectionOnCoverage || onDetail) ? (detailData?.courierCount || 0) : (data?.personIdsList?.length || 0)}
                  </Text>
                  {t('CREATE.CHOOSEN_WAREHOUSE_TEXT_2')}
                </Text>
              </Row>
            </AntCard>
            <Divider />
            <AntCard
              bordered={false}
              title={(
                <Row>
                  <Radio value={TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD}>
                    {t('CREATE.PERSON_BULK_UPLOAD')}
                  </Radio>
                </Row>
              )}
            >
              <Row justify="flex-start" align="middle">
                <Col span={11}>
                  <Form.Item
                    required
                    label={t('CREATE.UPLOAD_PLACEHOLDER')}
                    help={_.get(touched, 'personIds') && _.get(errors, 'personIds')}
                    validateStatus={_.get(touched, 'personIds') && _.get(errors, 'personIds') ? 'error' : 'success'}
                  >
                    <Input
                      disabled={(!isDisabledWarehouseSelectionOnCoverage) || isDisable || onDetail}
                      value={getUploadValueText({ values, t, onDetail, radioGroupValue, detailData, data })}
                      placeholder={t('CREATE.UPLOAD_PLACEHOLDER')}
                    />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <CsvImporter
                    disabled={(!isDisabledWarehouseSelectionOnCoverage) || isDisable || onDetail}
                    withoutHeader
                    hasNestedHeaderKeys
                    onOkayClick={handleImport}
                    modalProps={{ width: '70%' }}
                    exampleCsv={PERSON_IDS_EXAMPLE_DATA}
                  />
                </Col>
              </Row>
            </AntCard>
          </Radio.Group>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskCoverage;
