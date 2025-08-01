import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Popconfirm, Row, Table } from 'antd';
import { uniqBy } from 'lodash';

import {
  exclusionFiltersSelection,
  importedDataSelector,
  uploadCapacityDataSelector,
} from '../../redux/selectors';
import { getTableColumns } from './config';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../redux/actions';
import {
  getDateColumnsFromImportData,
  isImportedCapacityDataValid,
  manipulateCapacityDataBeforeSubmit,
} from '../../utils';
import { MAX_ALLOWED_CAPACITY_ROW_COUNT } from '../../constants';

function ImportedDataTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['officeAttendanceTracking']);

  const data = useSelector(importedDataSelector.getImportedData);
  const exclusionFilters = useSelector(exclusionFiltersSelection.getFilters);
  const uploadCapacityDataIsPending = useSelector(uploadCapacityDataSelector.getIsPending);

  return (
    <div>
      <Table
        columns={getTableColumns({ data })}
        dataSource={data}
        total={data.length}
        pagination={{ defaultPageSize: 100, size: 'small' }}
        scroll={{ y: 480 }}
        size="small"
      />
      <Row gutter={8} justify="end">
        <Col>
          <Popconfirm
            title={t('officeAttendanceTracking:CONFIRMATION.ARE_YOU_SURE')}
            onConfirm={handleApplyButtonOnClick}
            disabled={!isImportedCapacityDataValid({ data }) || uploadCapacityDataIsPending}
          >
            <Button
              disabled={!isImportedCapacityDataValid({ data }) || uploadCapacityDataIsPending}
              type="primary"
            >
              {t('button:APPLY')}
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Button onClick={handleCancelButtonOnClick}>
            {t('button:CANCEL')}
          </Button>
        </Col>
      </Row>
    </div>
  );

  function handleApplyButtonOnClick() {
    const dateColumns = getDateColumnsFromImportData(data[0]);
    const employeeCount = data.length;
    if (dateColumns.length * employeeCount > MAX_ALLOWED_CAPACITY_ROW_COUNT) {
      const maxAllowedDayCount = Math.floor(MAX_ALLOWED_CAPACITY_ROW_COUNT / employeeCount);
      dispatch(ToastCreators.error({
        message: t('officeAttendanceTracking:MAX_LIMIT_VALIDATION', { employeeCount, maxAllowedDayCount }),
        toastOptions: { autoClose: 3000 },
      }));
    }
    else {
      const { reqData, invalidEmails } = manipulateCapacityDataBeforeSubmit({ data, exclusionFilters });
      if (invalidEmails.length) {
        const formattedInvalidEmails = uniqBy(invalidEmails, 'email')
          .map(invalidData => `${invalidData.rowId}`).join(', ');
        dispatch(ToastCreators.error({
          message: t('officeAttendanceTracking:MALFORMED_EMAIL_ADDRESSES', { formattedInvalidEmails }),
          toastOptions: { autoClose: 6000 },
        }));
      }
      else {
        dispatch(Creators.uploadCapacityDataRequest({ reqData }));
      }
    }
  }

  function handleCancelButtonOnClick() {
    dispatch(Creators.resetImportedData());
  }
}

export default ImportedDataTable;
