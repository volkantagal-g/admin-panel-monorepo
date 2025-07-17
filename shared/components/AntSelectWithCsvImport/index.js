import { Button, Form, Select, Upload, Col, Alert } from 'antd';
import { memo, useEffect, useState } from 'react';
import { readString } from 'react-papaparse';
import { uniq } from 'lodash';
import { ExpandAltOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';

import { getSelectFilterOption, isObjectIdValid } from '@shared/utils/common';
import { t } from '@shared/i18n';

import useStyles from './styles';

const AntSelectWithCsvUpload = ({
  name, rule, disabled, label, options, form,
  btnLabel, onSearch, loading, labelInValue, onChange, afterCsvImport, hideImport,
  notFoundContent,
  pairValueOptions = true,
  selectWrapperProps = { md: 12, xs: 24 },
  importWrapperProps = { md: 5, xs: 24 },
  maxTagCount = 4,
  maxTagTextLength = 24,
  placeholder,
  tokenSeparators = [','],
  mode = 'multiple',
  parentRef,
  inline = false,
  checkIsValidObjectId = true,
}) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagCount, setTagCount] = useState(maxTagCount);
  const [invalidData, setInvalidData] = useState([]);
  const [mismatchedData, setMismatchedData] = useState([]);

  const getCsvDataAsArray = (file, cb) => {
    const reader = new FileReader();
    reader.onload = e => {
      const { data } = readString(e.target.result, { delimiter: ',', skipEmptyLines: true });
      const csvContentArr = uniq([].concat(...data));
      cb(csvContentArr);
    };
    reader.readAsText(file);
  };

  const filterLabelValuePairFromIdArray = (filters, filteredIds) => {
    if (labelInValue) {
      return filters.filter(option => (filteredIds.includes(option.value) ? option : null));
    }
    return filteredIds.filter(id => filters.find(filter => id === filter.value));
  };

  const removeAlertMessages = () => {
    setInvalidData([]);
    setMismatchedData([]);
  };

  const checkInvalidData = (list, csvData) => {
    removeAlertMessages();
    const _invalidData = list.filter(listOptions => !csvData.includes(listOptions));
    if (_invalidData.length > 0) {
      setInvalidData(_invalidData);
    }
    return _invalidData;
  };

  const checkMismatchedData = (list, csvData, failedData) => {
    const totalFailedData = list.filter(listOptions => !csvData.includes(listOptions));
    const _mismatchedData = totalFailedData.filter(failedOptions => !failedData.includes(failedOptions));
    if (_mismatchedData.length > 0) {
      setMismatchedData(_mismatchedData);
    }
  };

  useEffect(() => {
    if (parentRef) {
      const ref = parentRef;
      ref.current = removeAlertMessages;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {invalidData.length > 0 && (
        <Col md={24} xs={24}>
          <Alert
            className="mb-2"
            message={t('error:NOT_VALID_IDS_FOR_CSV_IMPORT')}
            description={invalidData.toString()}
            type="warning"
            closable
          />
        </Col>
      )}

      {mismatchedData.length > 0 && (
        <Col md={24} xs={24}>
          <Alert
            className="mb-2"
            message={t('error:NOT_PAIR_IDS_FOR_CSV_IMPORT')}
            description={mismatchedData.toString()}
            type="warning"
            closable
          />
        </Col>
      )}

      <Col {...selectWrapperProps}>
        <Form.Item
          name={name}
          label={label}
          rules={rule}
          className={inline ? 'd-inline' : null}
          preserve={false}
        >
          <Select
            aria-label={label}
            tokenSeparators={tokenSeparators}
            suffixIcon={loading ? <LoadingOutlined spin />
              : (
                <ExpandAltOutlined
                  onClick={() => {
                    if (isExpanded) {
                      setIsExpanded(false);
                      setTagCount(maxTagCount);
                    }
                    else {
                      setTagCount(null);
                      setIsExpanded(true);
                    }
                  }}
                />
              )}
            showArrow
            placeholder={placeholder}
            notFoundContent={notFoundContent}
            disabled={disabled}
            onSearch={onSearch}
            onChange={value => {
              removeAlertMessages();
              if (onChange) {
                onChange(value);
              }
            }}
            maxTagCount={tagCount}
            maxTagTextLength={maxTagTextLength}
            loading={loading}
            mode={mode}
            labelInValue={labelInValue}
            options={options}
            filterOption={getSelectFilterOption}
            showSearch
          />
        </Form.Item>
      </Col>

      {!hideImport && (
        <Col {...importWrapperProps} className={classes.csvUploadWrapper}>
          <Upload
            className="w-100"
            accept=".csv"
            disabled={disabled}
            showUploadList={false}
            beforeUpload={file => {
              getCsvDataAsArray(file, list => {
                let csvData = [];
                if (checkIsValidObjectId) {
                  csvData = list.filter(value => isObjectIdValid(value));
                }
                else {
                  csvData = list;
                }

                const _invalidData = checkInvalidData(list, csvData);

                if (pairValueOptions) {
                  csvData = filterLabelValuePairFromIdArray(options, list);
                  checkMismatchedData(list, csvData, _invalidData);
                }

                if (afterCsvImport) {
                  afterCsvImport(csvData);
                }

                form.setFields([{ name, value: csvData }]);
              });
              return false;
            }}
          >
            <Button aria-label="import-csv" disabled={disabled} icon={<UploadOutlined />} className="w-100">
              {btnLabel}
            </Button>
          </Upload>
        </Col>
      )}
    </>
  );
};

export default memo(AntSelectWithCsvUpload);
