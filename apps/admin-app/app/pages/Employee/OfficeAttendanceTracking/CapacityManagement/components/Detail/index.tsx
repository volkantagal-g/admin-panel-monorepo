import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { Alert } from 'antd';

import { useState } from 'react';

import moment from 'moment';

import { Creators } from '../../redux/actions';
import {
  importedDataSelector,
  invalidEmailsSelector,
  publicHolidaysSelector,
} from '../../redux/selectors';

import CsvImporter from '@shared/components/UI/CsvImporter';
import ImportedDataTable from '../Table';

import useStyles from './styles';
import {
  getFormattedImportData,
  isImportedCapacityDateColumnsValid,
  getPublicHolidaysInImportedCapacityDates,
  getDateColumnsFromImportData,
  isWeekend,
} from '../../utils';

function CapacityDetail() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'officeAttendanceTracking']);
  const classes = useStyles();

  const publicHolidays = useSelector(publicHolidaysSelector.getData);
  const importedData = useSelector(importedDataSelector.getImportedData);
  const invalidEmails = useSelector(invalidEmailsSelector.getInvalidEmails);

  const [isDateFormatAlertOpen, setDateFormatAlertOpen] = useState<boolean>(false);

  return renderDetail();

  function renderDetail() {
    const isImportedDataExists = importedData && !isEmpty(importedData);
    const isInvalidEmailsExists = !isEmpty(invalidEmails);

    const importDataSection = (
      <div className={classes.importSection}>
        <CsvImporter
          key="capacity-import"
          onOkayClick={handleConfirmSubmit}
        />
        <div>{t('global:UPLOAD_CSV')}</div>
      </div>
    );

    const invalidEmailsAlertSection = isInvalidEmailsExists && (
      <Alert
        message={t('officeAttendanceTracking:INVALID_EMAILS_MESSAGE')}
        description={(
          <ul className={classes.invalidEmailContainer}>
            {invalidEmails.map((email: string) => <li key={email}>{email}</li>)}
          </ul>
        )}
        closable
        showIcon
        type="error"
        className="mb-2"
        onClose={() => dispatch(Creators.resetInvalidEmails())}
      />
    );

    const invalidDateColumnsSection = (
      <div>
        {isDateFormatAlertOpen && (
          <Alert
            showIcon
            type="error"
            className="mb-2"
            message={t('officeAttendanceTracking:INVALID_DATE_COLUMN')}
          />
        )}
        <ImportedDataTable />
      </div>
    );

    const holidayExclusionWarningSection = (
      <Alert
        message={t('officeAttendanceTracking:CAPACITY_PLAN_EXCLUSION_WARNING')}
        description=""
        closable
        showIcon
        type="warning"
        className="mb-2"
        onClose={() => dispatch(Creators.resetInvalidEmails())}
      />
    );

    return (
      <div className="w-100">
        {isExclusionCaseExist() && holidayExclusionWarningSection}
        {isInvalidEmailsExists && invalidEmailsAlertSection}
        {!isImportedDataExists ? importDataSection : invalidDateColumnsSection}
      </div>
    );
  }

  function handleConfirmSubmit({ data }: { data: any[] }) {
    const formattedImportData = getFormattedImportData({ data });
    setDateFormatAlertOpen(!isImportedCapacityDateColumnsValid({ data }));
    dispatch(Creators.setImportedData({ data: formattedImportData }));
  }

  function isExclusionCaseExist() {
    const dates = importedData?.length > 0 ? getDateColumnsFromImportData(importedData[0]) : [];

    const isPublicHolidayExistInGivenDates = getPublicHolidaysInImportedCapacityDates({ dates, publicHolidays: publicHolidays || [] })?.length > 0;
    const isWeekendExistInGivenDates = dates.some((date: string) => isWeekend(date));
    const isPastDataExistInGivenDates = dates.some((date: string) => moment(date).isBefore(moment().startOf('day')));

    return isPublicHolidayExistInGivenDates || isWeekendExistInGivenDates || isPastDataExistInGivenDates;
  }
}

export default CapacityDetail;
