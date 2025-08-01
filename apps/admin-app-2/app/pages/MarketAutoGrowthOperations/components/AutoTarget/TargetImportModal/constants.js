import * as Yup from 'yup';
import { ValidationError } from 'yup';

export const CSVCols = {
  Date: 'date',
  OrderTarget: 'orderTarget',
  CPTarget: 'cpTarget',
  Segment: 'segment',
  ErrorMessage: 'errorMessage',
};

const TARGET_IMPORT_CSV_SCHEMA = warehouseTypes => Yup.object({
  [CSVCols.Segment]: Yup.string().required().oneOf([...warehouseTypes, '*']),
  [CSVCols.Date]: Yup.date().required(),
  [CSVCols.OrderTarget]: Yup.number().required(),
  [CSVCols.CPTarget]: Yup.number().required(),
});

const areTargetOfRowsAreTheSame = (row1, row2) => {
  return row1[CSVCols.Segment] === row2[CSVCols.Segment] && row1[CSVCols.Date] === row2[CSVCols.Date];
};

class CustomValidationError extends Error {
  constructor(message, value) {
    super(message);
    this.value = value;
  }
}

function mapErrorValueToRow(value, errorMessage) {
  return {
    [CSVCols.Date]: value?.date ?? '',
    [CSVCols.OrderTarget]: value?.orderTarget ?? '',
    [CSVCols.CPTarget]: value?.cpTarget ?? '',
    [CSVCols.Segment]: value?.segment ?? '',
    [CSVCols.ErrorMessage]: errorMessage,
  };
}

export const separateValidAndInvalidRows = (data, warehouseTypes, t) => {
  const validRows = [];
  const invalidRows = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    try {
      TARGET_IMPORT_CSV_SCHEMA(warehouseTypes).validateSync(row);
      if (new Date(row.date).setUTCHours(0, 0, 0) < new Date().setUTCHours(0, 0, 0, 0)) {
        throw new CustomValidationError(
          t('TARGET_ERROR_MESSAGES.INVALID_DATE_CANNOT_BE_OLDER_THAN_TODAY', { columnName: CSVCols.Date }),
          row,
        );
      }
      else if (validRows.some(existing => areTargetOfRowsAreTheSame(existing, row))) {
        throw new CustomValidationError(t('TARGET_ERROR_MESSAGES.DUPLICATE_ROW', {
          segmentColumnName: CSVCols.Segment,
          dateColumnName: CSVCols.Date,
        }), row);
      }
      validRows.push(row);
    }
    catch (error) {
      let errorMessage = '';
      if (error instanceof ValidationError) {
        switch (error?.path) {
          case CSVCols.Segment:
            errorMessage = t('TARGET_ERROR_MESSAGES.INVALID_SEGMENT', { columnName: CSVCols.Segment });
            break;
          case CSVCols.Date:
            errorMessage = t('TARGET_ERROR_MESSAGES.INVALID_DATE', { columnName: CSVCols.Date });
            break;
          case CSVCols.OrderTarget:
            errorMessage = t('TARGET_ERROR_MESSAGES.INVALID_ORDER_TARGET', { columnName: CSVCols.OrderTarget });
            break;
          case CSVCols.CPTarget:
            errorMessage = t('TARGET_ERROR_MESSAGES.INVALID_CP_TARGET', { columnName: CSVCols.CPTarget });
            break;
          default:
            errorMessage = t('TARGET_ERROR_MESSAGES.INVALID_ROW');
        }
      }
      else {
        errorMessage = error?.message ?? t('TARGET_ERROR_MESSAGES.INVALID_ROW');
      }

      const invalidRow = mapErrorValueToRow(error?.value, t(errorMessage));
      invalidRows.push(invalidRow);
    }
  }

  return [validRows, invalidRows];
};
