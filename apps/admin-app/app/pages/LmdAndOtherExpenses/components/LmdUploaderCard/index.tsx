import { Alert, Button, Col, Form, Row, Select } from 'antd';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { DownloadOutlined } from '@ant-design/icons';

import {
  areCSVHeadersValid,
  getCSVHeadersFromUploadedData,
  getCSVUploadWarningMessages,
  getExpenseCSVTemplate,
  getExpenseTypeSelectOptions,
  getIsDataBelongsToOnlyOneMonthAndYear,
  getIsRecurringDataExist,
  getValidatedAndReformattedLmdCostCSVData,
  getValidatedAndReformattedLogisticCostCSVData,
  getValidatedAndReformattedOtherCostCSVData,
} from '../../utils';
import { EXPENSE_TYPE } from '../../constants';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators } from '../../Upload/redux/actions';
import useStyles from './style';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { fileUploadSelector } from '../../Upload/redux/selector';
import { exportExcel } from '@shared/utils/common';
import { TEST_ID } from '@app/pages/LmdAndOtherExpenses/Upload/constants';

function LmdUploaderCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['lmdAndOtherExpensesUploadPage']);
  const [selectedExpenseType, setSelectedExpenseType] = useState(EXPENSE_TYPE.LMD_COST);

  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);

  const errors = useSelector(fileUploadSelector.getErrors);
  const isExpenseFileUploadPending = useSelector(fileUploadSelector.getIsPending);

  const csvUploadWarningMessages = getCSVUploadWarningMessages(t);

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest());
  }, [dispatch]);

  return (
    <div className={classes.card}>
      <Row gutter={[12, 4]} align="bottom">
        <Col flex={1}>
          <Row wrap>
            <Col span={24}>
              <label className={classes.block} htmlFor={TEST_ID.EXPENSE_TYPE_SELECT}>
                {t('lmdAndOtherExpensesUploadPage:EXPENSE_TYPE_LABEL')}
              </label>

              <Select
                className="w-100"
                id={TEST_ID.EXPENSE_TYPE_SELECT}
                data-testid={TEST_ID.EXPENSE_TYPE_SELECT}
                value={selectedExpenseType}
                options={getExpenseTypeSelectOptions(t)}
                onChange={onExpenseTypeChangeHandler}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Button
              icon={<DownloadOutlined />}
              className="mr-1"
              type="primary"
              onClick={onDownloadTemplateHandler}
            >
              {t('lmdAndOtherExpensesUploadPage:DOWNLOAD_TEMPLATE')}
            </Button>
            <CsvImporter
              loading={isWarehousesPending || isExpenseFileUploadPending}
              isButton
              buttonType="primary"
              importButtonText={t('global:UPLOAD')}
              warningText={(
                <>
                  <p className="mb-2">{t('lmdAndOtherExpensesUploadPage:FILE_TO_BE_UPLOADED_DESCRIPTION')}</p>
                  <ul>
                    {csvUploadWarningMessages?.map(warningMessage => <li key={warningMessage}>{warningMessage}</li>)}
                  </ul>
                </>
              )}
              onOkayClick={onCSVDataUploadHandler}
            />
          </Row>
        </Col>
      </Row>

      {errors.length > 0 && (
        <Alert
          message={t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES.INVALID_UPLOAD')}
          closable
          showIcon
          type="error"
          className="mb-2 mt-2"
          description={(
            <ul className={classes.errorContainer}>
              {errors.map((error: string) => <li key={error}>{error}</li>)}
            </ul>
          )}
          onClose={() => dispatch(Creators.resetUpload())}
        />
      )}
    </div>
  );

  function onExpenseTypeChangeHandler(value: EXPENSE_TYPE) {
    setSelectedExpenseType(value);
    dispatch(Creators.resetUpload());
  }

  // eslint-disable-next-line consistent-return
  function onCSVDataUploadHandler(uploadedData: any) {
    const uploadedHeaders = getCSVHeadersFromUploadedData({ sampleData: uploadedData?.data?.[0] });
    const areHeadersValid = areCSVHeadersValid({
      headers: uploadedHeaders,
      expenseType: selectedExpenseType,
      duplicateColumnsExistAndOverwritten: uploadedData?.duplicateColumnsExistAndOverwritten,
    });
    const isDataBelongsToOnlyOneMonthAndYear = getIsDataBelongsToOnlyOneMonthAndYear({ data: uploadedData?.data });
    const isRecurringDataExists = getIsRecurringDataExist({
      data: uploadedData?.data,
      warehouseCheck: selectedExpenseType !== EXPENSE_TYPE.OTHER_COST,
    });

    const fileErrors = [];

    if (!areHeadersValid) {
      fileErrors.push(t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES:INVALID_HEADERS'));
    }

    if (!isDataBelongsToOnlyOneMonthAndYear) {
      fileErrors.push(t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES.UNIQUE_MONTH_YEAR'));
    }

    if (isRecurringDataExists) {
      const recurringDataErrorMessage = selectedExpenseType === EXPENSE_TYPE.OTHER_COST
        ? t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES.UNIQUE_MONTH_YEAR_DOMAIN')
        : t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES.UNIQUE_MONTH_YEAR_DOMAIN_WAREHOUSE');

      fileErrors.push(recurringDataErrorMessage);
    }

    if (fileErrors.length > 0) {
      return dispatch(Creators.setErrors({ errors: fileErrors }));
    }

    const warehouseIds = warehouses.map(w => w._id);
    let dataWithValidationResults = [];
    let isValidInTotal = false;

    if (selectedExpenseType === EXPENSE_TYPE.LMD_COST) {
      dataWithValidationResults = getValidatedAndReformattedLmdCostCSVData({
        data: uploadedData?.data,
        warehouseIds,
      });
      isValidInTotal = dataWithValidationResults.reduce((acc: any, curr: any) => acc && curr?.isValid, true);

      if (isValidInTotal) {
        dispatch(
          Creators.uploadLastMileDeliveryCostRequest({ data: dataWithValidationResults.map((dWithValidationResults: any) => dWithValidationResults.data) }),
        );
      }
    }
    else if (selectedExpenseType === EXPENSE_TYPE.LOGISTIC_COST) {
      dataWithValidationResults = getValidatedAndReformattedLogisticCostCSVData({
        data: uploadedData?.data,
        warehouseIds: warehouses.map(w => w._id),
      });
      isValidInTotal = dataWithValidationResults.reduce((acc: any, curr: any) => acc && curr?.isValid, true);

      if (isValidInTotal) {
        dispatch(
          Creators.uploadLogisticCostRequest({ data: dataWithValidationResults.map((dWithValidationResults: any) => dWithValidationResults.data) }),
        );
      }
    }
    else if (selectedExpenseType === EXPENSE_TYPE.OTHER_COST) {
      dataWithValidationResults = getValidatedAndReformattedOtherCostCSVData({
        data: uploadedData?.data,
        warehouseIds: warehouses.map(w => w._id),
      });
      isValidInTotal = dataWithValidationResults.reduce((acc: any, curr: any) => acc && curr?.isValid, true);

      if (isValidInTotal) {
        dispatch(
          Creators.uploadOtherCostRequest({ data: dataWithValidationResults.map((dWithValidationResults: any) => dWithValidationResults.data) }),
        );
      }
    }

    if (!isValidInTotal) {
      const invalidLineNumbers = dataWithValidationResults
        .filter((dWithValidationResult: { isValid: boolean, errors: [], data: any, index: number }) => !dWithValidationResult.isValid)
        .map((dWithValidationResult: { isValid: boolean, errors: [], data: any, index: number }) => dWithValidationResult.index + 1);

      dispatch(Creators.setErrors({
        errors: [
          t('lmdAndOtherExpensesUploadPage:ERROR_MESSAGES:INVALID_DATA', { invalidLineNumbers: invalidLineNumbers?.join(',') }),
        ],
      }));
    }
  }

  function onDownloadTemplateHandler() {
    const templateCSV = getExpenseCSVTemplate(selectedExpenseType);
    exportExcel(templateCSV.data, `${selectedExpenseType}.csv`, templateCSV.columns);
  }
}

export default LmdUploaderCard;
