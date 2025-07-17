import React from 'react';
import { Button, Checkbox, DatePicker, Input, Select, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { t } from '@shared/i18n';

import './css.css';

export const AVAILABLE_INPUT_TYPE = {
  text: {
    name: 'text',
    component: Input,
  },
  textArea: {
    name: 'text',
    component: Input.TextArea,
  },
  number: {
    name: 'number',
    component: Input,
  },
  date: {
    name: 'date',
    component: DatePicker,
  },
  dateRange: {
    name: 'dateRange',
    component: DatePicker.RangePicker,
  },
  select: {
    name: 'select',
    component: Select,
    csvComponent: CsvImporter,
  },
  checkbox: {
    name: 'checkbox',
    component: Checkbox,
  },
  csvArrayOfObjects: {
    name: 'csvArrayOfObjects',
    component: ({ loaded, onDelete, disabled, ...props }) => (
      <div className="dynamic-form-csv-icons">
        <CsvImporter key="csvImport" disabled={disabled} {...props} />
        {loaded && (
          <React.Fragment key="icons">
            <span>
              <Tooltip title={t('global:LOADED')}>
                <CheckOutlined />
              </Tooltip>
            </span>
            <Tooltip title={t('global:REMOVE')}>
              <Button danger onClick={onDelete} size="small" disabled={disabled}>
                <CloseOutlined />
              </Button>
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    ),
  },
  s3Upload: {
    name: 's3Upload',
    component: ({ loaded, loadedFile, ...props }) => {
      return (
        <>
          <CsvImporter {...props} />
          {loaded && (
            <span>
              <Tooltip title={t('global:LOADED')}>
                <CheckOutlined /> { loadedFile }
              </Tooltip>
            </span>
          )}
        </>
      );
    },
  },
};
