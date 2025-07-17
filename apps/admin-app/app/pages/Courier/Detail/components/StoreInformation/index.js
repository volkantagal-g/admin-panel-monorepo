import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Select, Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, cloneDeep, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AntCard from '@shared/components/UI/AntCard';
import { SelectWrapper } from '@shared/components/UI/Form';
import {
  getWarehousesSelector,
  getMarketFranchisesSelector,
} from '@shared/redux/selectors/common';
import { validate } from '@shared/yup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import Footer from '../StoreInformationFooter';
import { Creators } from '../../redux/actions';
import {
  releaseCourierSelector,
  setWarehouseToCourierSelector,
} from '../../redux/selectors';
import {
  getStoreInformationDetails,
  convertedWorkStatusOptions,
  getWorkStatusByEmployer,
} from '../../utils';
import { validationSchema } from './formHelper';

const { Option } = Select;
const { Text } = Typography;

const StoreInformation = ({
  data,
  isPending: isPendingGetCourierDetail,
  permKey,
}) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();

  const [storeInformationDetails, setStoreInformationDetails] = useState({});
  const [selectedWarehouse, setSelectedWarehouse] = useState({});

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isCourierReleased, setIsCourierReleased] = useState(!data.warehouse);

  const validationFn = useMemo(() => validate(() => validationSchema()), []);

  const allWarehouses = useSelector(getWarehousesSelector.getData);
  const allFranchises = useSelector(getMarketFranchisesSelector.getData);
  const isPendingGetAllWarehouses = useSelector(
    getWarehousesSelector.getIsPending,
  );
  const isPendingGetAllFranchises = useSelector(
    getMarketFranchisesSelector.getIsPending,
  );
  const isPendingSetWarehouseToCourier = useSelector(
    setWarehouseToCourierSelector.getIsPending,
  );
  const isPendingReleaseCourier = useSelector(
    releaseCourierSelector.getIsPending,
  );
  const isSuccessReleaseCourier = useSelector(
    releaseCourierSelector.getIsSuccess,
  );
  const isSuccessSetWarehouseToCourier = useSelector(
    setWarehouseToCourierSelector.getIsSuccess,
  );

  const isPending =
    isPendingGetCourierDetail ||
    isPendingGetAllWarehouses ||
    isPendingReleaseCourier ||
    isPendingGetAllFranchises ||
    isPendingSetWarehouseToCourier;

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      const [currentMarketEmployer] = allFranchises.filter(
        franchiseItem => franchiseItem._id === formValues.currentMarketEmployer.franchise,
      );
      currentMarketEmployer.workType = formValues.person.marketEmployers.filter(
        marketEmployer => marketEmployer.franchise ===
          formValues.currentMarketEmployer.franchise,
      )[0].workType;

      const params = {
        courierId: formValues._id,
        warehouseId: selectedWarehouse._id,
        warehouseFranchiseId: selectedWarehouse.franchise,
        currentMarketEmployer: {
          franchise: currentMarketEmployer._id,
          workType: currentMarketEmployer.workType,
          franchiseType: currentMarketEmployer.franchiseType,
        },
        workStatus: formValues.workStatus,
      };

      if (formValues.isLoggedIn) {
        dispatch(
          ToastCreators.error({ message: 'ERR_COURIER_MUST_BE_LOGGED_OUT' }),
        );
      }
      else if (formValues.fleetVehicle) {
        dispatch(ToastCreators.error({ message: 'ERR_COURIER_FLEET_VEHICLE' }));
      }
      else dispatch(Creators.setWarehouseToCourierRequest(params));
    },
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setValues,
    resetForm,
    handleSubmit,
  } = formik;

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
      form.setFields([{ name: fieldName, value }]);
      if (fieldName === 'warehouse') {
        const selectedWarehouseInner = allWarehouses.filter(
          warehouse => warehouse._id === value,
        )[0];
        const storeInformationDetailsInner = getStoreInformationDetails(
          allFranchises,
          allWarehouses,
          selectedWarehouseInner,
          values,
        );
        setSelectedWarehouse(selectedWarehouseInner);
        setStoreInformationDetails(storeInformationDetailsInner);
        setFieldValue(
          'currentMarketEmployer.franchise',
          storeInformationDetailsInner.currentMarketEmployer,
        );
        form.setFields([
          {
            name: 'currentMarketEmployer.franchise',
            value: storeInformationDetailsInner.currentMarketEmployer,
          },
        ]);
        setFieldValue('workStatus', storeInformationDetailsInner.workStatus);
        form.setFields([
          {
            name: 'workStatus',
            value: storeInformationDetailsInner.workStatus,
          },
        ]);
      }
      if (fieldName === 'currentMarketEmployer.franchise') {
        const workStatus = getWorkStatusByEmployer(value, selectedWarehouse);
        setFieldValue('workStatus', workStatus);
        form.setFields([{ name: 'workStatus', value: workStatus }]);
      }
    };
  };

  useEffect(() => {
    if (values.currentMarketEmployer) {
      form.setFieldsValue({
        ...values,
        ...Object.keys(values.currentMarketEmployer).reduce((p, c) => {
          // eslint-disable-next-line no-param-reassign
          p[`currentMarketEmployer.${c}`] = values.currentMarketEmployer[c];
          return p;
        }, {}),
      });
    }
  }, [values, form]);

  useEffect(() => {
    if (isSuccessReleaseCourier) {
      setIsCourierReleased(true);
      form.setFields([{ name: 'warehouse', value: undefined }]);
      form.setFields([
        { name: 'currentMarketEmployer.franchise', value: undefined },
      ]);
      form.setFields([{ name: 'currentMarketEmployer', value: undefined }]);
      form.setFields([{ name: 'workStatus', value: undefined }]);
    }
  }, [isSuccessReleaseCourier, form]);

  useEffect(() => {
    if (isSuccessSetWarehouseToCourier) {
      setIsCourierReleased(false);
      setIsFormEditable(false);
    }
  }, [isSuccessSetWarehouseToCourier]);

  const handleFooterReleaseClick = () => {
    if (values.isLoggedIn) {
      dispatch(
        ToastCreators.error({ message: t('ERR_COURIER_MUST_BE_LOGGED_OUT') }),
      );
    }
    else if (values.fleetVehicle) {
      dispatch(
        ToastCreators.error({ message: t('ERR_COURIER_FLEET_VEHICLE') }),
      );
    }
    else {
      dispatch(
        Creators.releaseCourierRequest({
          courierId: values._id,
          warehouseId: values.warehouse,
        }),
      );
    }
  };

  const handleFooterEditClick = () => {
    if (
      values.person?.marketEmployers?.length === 0 ||
      !values.person?.marketEmployers
    ) {
      dispatch(
        ToastCreators.error({ message: t('ERR_FRANCHISE_INFORMATION_MISSING') }),
      );
    }
    else setIsFormEditable(true);
  };

  const handleFooterCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            isPending={isPending}
            isFormEditable={isFormEditable}
            isShowReleaseButton={!isCourierReleased}
            permKey={permKey}
            handleSubmit={handleSubmit}
            handleReleaseClick={handleFooterReleaseClick}
            handleEditClick={handleFooterEditClick}
            handleCancelClick={handleFooterCancelClick}
          />
        )}
        bordered={false}
        title={t('STORE_INFORMATION')}
        extra={
          values.warehouse && (
            <Link to={`/warehouse/detail/${values.warehouse}`}>
              <Button key="storeInformationDetailButton" size="small">
                {t('DETAIL')}
              </Button>
            </Link>
          )
        }
      >
        <Row gutter={[4, 4]}>
          <Col lg={24} xs={24}>
            <Text>{t('WAREHOUSE')}</Text>
            <SelectWrapper
              selectKey="warehouse"
              value={values.warehouse}
              hasError={get(errors, 'warehouse')}
              isTouched={get(touched, 'warehouse')}
              onChangeCallback={handleFieldChange('warehouse')}
              disabled={isPending || !isFormEditable}
              renderCustomItems={() => allWarehouses.map(item => (
                <Option key={item._id} value={item._id} label={item.name}>
                  <div>{item.name}</div>
                </Option>
              ))}
            />
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('EMPLOYER')}</Text>
            <SelectWrapper
              selectKey="currentMarketEmployer.franchise"
              value={values.currentMarketEmployer?.franchise}
              hasError={get(errors, 'currentMarketEmployer.franchise')}
              isTouched={get(touched, 'currentMarketEmployer.franchise')}
              onChangeCallback={handleFieldChange(
                'currentMarketEmployer.franchise',
              )}
              disabled={
                isPending ||
                !isFormEditable ||
                isEmpty(storeInformationDetails) ||
                !storeInformationDetails.isCurrentEmployerEditable
              }
              renderCustomItems={() => values.person?.marketEmployers?.map(employer => {
                const [employerAllInfo] = allFranchises.filter(
                  franchise => franchise?._id === employer?.franchise,
                );
                return (
                  <Option
                    key={employerAllInfo?._id}
                    value={employerAllInfo?._id}
                    label={employerAllInfo?.name}
                  >
                    <div>{employerAllInfo?.name}</div>
                  </Option>
                );
              })}
            />
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('WORK_STATUS')}</Text>
            <SelectWrapper
              selectKey="workStatus"
              value={values.workStatus}
              hasError={get(errors, 'workStatus')}
              isTouched={get(touched, 'workStatus')}
              onChangeCallback={handleFieldChange('workStatus')}
              disabled={
                isPending ||
                !isFormEditable ||
                isEmpty(storeInformationDetails) ||
                !storeInformationDetails.isWorkStatusEditable
              }
              optionLabelProp="label"
              optionValueProp="value"
              optionsData={convertedWorkStatusOptions}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

StoreInformation.defaultProps = {
  data: {},
  isPending: false,
  permKey: '',
};

StoreInformation.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
  permKey: PropTypes.string,
};

export default StoreInformation;
