import { useEffect, useMemo, useState } from 'react';
import { readString } from 'react-papaparse';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import {
  COURIER_SERVICE_DOMAIN_TYPES,
  COURIER_TYPE_FOR_COURIER_PLAN,
} from '@shared/shared/constants';

import useStyles from '../../styles';
import {
  arrayToIdMap,
  courierCSVToRequestObj,
  courierSlotCapacityCSVToRequestObj,
  storeAssistantCSVToRequestObj,
} from './utils';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import {
  courierPlanTypeSelector,
  publishSelector,
  storeAssistantSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { COURIER_PLAN_TYPE_KEYS, EMPLOYEE_TYPE } from '../../constants';

// to access with value, like courierTypes[value]
const courierTypes = _.invert(COURIER_TYPE_FOR_COURIER_PLAN);
const courierDomainTypes = _.invert(COURIER_SERVICE_DOMAIN_TYPES);

const papaparseConfig = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};

export default function PlanImporter({ employeeType }) {
  const { t } = useTranslation('courierPlanPublication');
  const dispatch = useDispatch();
  const classes = useStyles();
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const warehousesPending = useSelector(
    getFilteredWarehousesSelector.getIsPending,
  );
  const publishIsPending = useSelector(publishSelector.publishIsPending);
  const storeAssistantIsPending = useSelector(
    storeAssistantSelector.isPublishPending,
  );
  const isPending =
    employeeType === EMPLOYEE_TYPE.COURIER
      ? publishIsPending
      : storeAssistantIsPending;

  const warehouseIds = useMemo(() => {
    return arrayToIdMap(warehouses);
  }, [warehouses]);

  const courierPlanType = useSelector(courierPlanTypeSelector.getData);

  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(
      CommonCreators.getFilteredWarehousesRequest({ fields: '_id city country' }),
    );
  }, [dispatch]);

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setData(null);
  };

  const handleOnFileLoad = (csv, fileTemp) => {
    const checks = {
      warehouseIds,
      courierTypes,
      domainTypes: courierDomainTypes,
    };
    let result;

    if (employeeType === EMPLOYEE_TYPE.COURIER) {
      if (courierPlanType === COURIER_PLAN_TYPE_KEYS.SLOT_CAPACITY) {
        result = courierSlotCapacityCSVToRequestObj(csv, checks, t);
      }
      else result = courierCSVToRequestObj(csv, checks, t);
    }
    else {
      result = storeAssistantCSVToRequestObj(csv, checks, t);
    }

    if (result.error) {
      dispatch(
        ToastCreators.error({
          message: result.msg,
          toastOptions: { autoClose: 5000 },
        }),
      );
      handleRemoveFile();
      setData(null);
      return;
    }

    let confirmed = true;

    if (result.showConfirmationModal) {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: (
          <>
            <p>{t('DATE_PAST_CONFIRM')}</p>
            <p>{t('DATE_PAST_EARLIEST')}</p>
            <p>
              <b>{t('LINE_DAY_DIFF')}</b>
            </p>
            <p>
              <b>{result.confirmationText}</b>
            </p>
          </>
        ),
        onOk: () => {
          setFile(fileTemp);
          setData(result);
          dispatch(ToastCreators.success({ message: t('READY_TO_IMPORT') }));
        },
        onCancel: () => {
          confirmed = false;
          handleRemoveFile();
          setData(null);
        },
      });
    }
    if (result.showConfirmationModal || !confirmed) {
      return;
    }

    setFile(fileTemp);
    setData(result);
    dispatch(ToastCreators.success({ message: t('READY_TO_IMPORT') }));
  };

  const handleFileChange = e => {
    const fileTemp = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const parsed = readString(reader.result, papaparseConfig);
      if (parsed.errors.length > 0) {
        handleOnError(parsed.errors[0].message);
      }
      else {
        handleOnFileLoad(parsed.data, fileTemp);
      }
    };

    reader.onerror = handleOnError;
    reader.readAsText(fileTemp);
  };

  const publishPlan = () => {
    if (employeeType === EMPLOYEE_TYPE.COURIER) {
      dispatch(Creators.publishCourierPlanRequest(data));
    }
    else {
      const { timezone } = warehouseIds[data.pickerPlan[0].warehouseId];
      dispatch(Creators.publishStoreAssistantPlanRequest({ file, timezone }));
    }
    // remove local data after request
    handleRemoveFile();
  };

  useEffect(() => {
    handleRemoveFile();
  }, [employeeType]);

  return (
    <div>
      <div key="1" className={classes.wrapper}>
        <Button type="dashed" size="large" className={classes.selectFileButton}>
          <label htmlFor="csvInput" className={classes.selectFileLabel}>
            {t('global:SELECT_FILE')}
          </label>
        </Button>
        <input
          type="file"
          name="csvInput"
          id="csvInput"
          className={classes.fileInput}
          onChange={handleFileChange}
          value=""
          accept="text/csv, .csv"
          data-testid="fileInput"
          disabled={warehousesPending}
        />
        <input
          type="text"
          readOnly
          value={file ? file.name : ''}
          className={classes.fileName}
        />
        <Button danger onClick={handleRemoveFile}>
          {t('global:REMOVE')}
        </Button>
      </div>

      <div key="2" className={classes.importWrapper}>
        <Button
          type="primary"
          onClick={publishPlan}
          disabled={!data || isPending}
        >
          {t('global:UPLOAD')}
        </Button>
      </div>
    </div>
  );
}
