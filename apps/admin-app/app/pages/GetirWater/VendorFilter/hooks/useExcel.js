import moment from 'moment';
import { useSelector } from 'react-redux';
import { isEmpty, noop } from 'lodash';
import { useEffect, useRef } from 'react';

import { excelSelector } from '../redux/selectors';
import { exportExcel } from '@shared/utils/common';
import { Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import { DownloadStatus } from '../utils/constants';

const defaultUseExcelOptions = {
  dispatch: noop,
  columns: [],
  otherFilters: {},
  statusList: [],
};

export default function useExcel(options = defaultUseExcelOptions) {
  const { dispatch, columns, otherFilters, statusList } = options;
  const excelData = useSelector(excelSelector).map(({ status, ...rest }) => ({
    ...rest,
    status: statusList.find(({ id }) => id === status)?.status,
  }));
  const downloadStatusRef = useRef(DownloadStatus.IDLE);

  useEffect(() => {
    if (!isEmpty(excelData) && downloadStatusRef.current === DownloadStatus.PENDING) {
      exportExcel(excelData, `Vendor_Filter_${moment().format('DD-MM-YYYY_hh:mm')}.xls`, columns.map(({ title, dataIndex }) => ({
        title,
        key: dataIndex,
      })).slice(0, -1));
      downloadStatusRef.current = DownloadStatus.IDLE;
    }
  }, [columns, excelData]);

  const exportExcelFile = () => {
    dispatch(Creators.getExcelRequest({ data: otherFilters }));
    downloadStatusRef.current = DownloadStatus.PENDING;
  };

  return exportExcelFile;
}
