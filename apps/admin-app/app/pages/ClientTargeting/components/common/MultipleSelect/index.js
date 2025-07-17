import { Space, Select, Typography, Row, Col, Button, Checkbox, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { useState } from 'react';

import { getLangKey } from '@shared/i18n';
import CsvImporter from '@shared/components/UI/CsvImporter';

import useStyles from './styles';
import { Creators } from '../../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  CSV_IMPORT_BUTTON_COL,
  MULTIPLE_SELECT_COL,
  MULTIPLE_SELECT_WITH_CSV_IMPORT_COL,
  MULTIPLE_SELECT_WITH_SELECT_ALL_COL,
  SELECT_ALL_BUTTON_COL,
  MULTIPLE_SELECT_WITH_SELECT_ALL_AND_CSV_IMPORT_COL,
} from '@app/pages/ClientTargeting/constants';
import { isValidObjectId } from '@shared/utils/common';

const { Text } = Typography;

export const exampleCsv = { id: 'Object Id' };

const isCitySelect = clientListKey => clientListKey === 'cities';

const MultipleSelect = ({
  label,
  description,
  activeKey,
  clientListKey,
  value,
  selectable = [],
  placeholder,
  filterableData,
  mode = 'multiple',
  tagValue = 'name',
  tagKey = '_id',
  disabled = false,
  onSearch,
  onBlur,
  showCSVImporter = false,
  showSelectAllButton = false,
  allowClear = false,
  altSelectable = [],
  isLoading = false,
  maxTagCount = 5,
  isSelectAllCountriesCheckboxDisabled = false,
  isSelectAllCountriesVisible = true,
  onClear,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const [ignoreCountry, setIgnoreCountry] = useState(false);

  const tagOptions = selectable.map(tag => {
    const tagName = typeof tag[tagValue] === 'object' ? tag[tagValue][getLangKey()] : tag[tagValue];
    return { value: tag[tagKey], label: tagName };
  });

  const handleSelectChange = select => {
    dispatch(Creators.setInput({ activeKey, clientListKey, value: select, filterableData }));
  };

  const handleIgnoreCountry = e => {
    const select = e.target.checked;
    setIgnoreCountry(select);
    dispatch(Creators.setInput({ activeKey, clientListKey: 'ignoreCountry', value: select, filterableData: { cityDisabled: select } }));
  };

  const handleCsvImport = ({ data }) => {
    const message = t('ERR_CHECK_CSV_FORMAT');
    let isErrorExist = false;

    if (!data || !data.length) {
      return dispatch(ToastCreators.error({ message }));
    }

    const dataSet = new Set();
    data.forEach(eachData => {
      if (Object.keys(eachData).length !== 1 || !eachData.id) {
        isErrorExist = true;
      }
      else {
        dataSet.add(eachData.id);
      }
    });

    if (isErrorExist) {
      return dispatch(ToastCreators.error({ message }));
    }

    if (isEmpty(selectable) && isEmpty(altSelectable)) {
      return dispatch(Creators.setInput({ activeKey, clientListKey, value: [...dataSet], filterableData }));
    }

    const csvValue = [];

    if (clientListKey === 'warehouses') {
      altSelectable.forEach(eachSelectable => {
        if (dataSet.has(eachSelectable[tagKey])) {
          dataSet.delete(eachSelectable[tagKey]);
          csvValue.push(eachSelectable[tagKey]);
        }
      });

      dispatch(ToastCreators.success({ message: t('CSV_UPLOAD_SUCCESS') }));
      return dispatch(
        Creators.setInput({
          activeKey,
          clientListKey,
          value: csvValue,
          filterableData: {
            cityDisabled: true,
            selectableWarehouses: altSelectable,
            warehouseTypeDisabled: true,
          },
        }),
      );
    }

    if (clientListKey === 'products') {
      dataSet.forEach(eachValue => {
        if (isValidObjectId(eachValue)) {
          csvValue.push(eachValue);
        }
      });

      dispatch(ToastCreators.success({ message: t('CSV_UPLOAD_SUCCESS') }));
      return dispatch(
        Creators.setInput({
          activeKey,
          clientListKey,
          value: csvValue,
          filterableData: {
            productCategoriesDisabled: true,
            selectableProducts: altSelectable,
            productSubCategoriesDisabled: true,
          },
        }),
      );
    }

    selectable.forEach(eachSelectable => {
      if (dataSet.has(eachSelectable[tagKey])) {
        dataSet.delete(eachSelectable[tagKey]);
        csvValue.push(eachSelectable[tagKey]);
      }
    });

    return dispatch(Creators.setInput({ activeKey, clientListKey, value: csvValue, filterableData }));
  };

  const handleSelectAll = () => {
    const allValues = selectable.map(eachSelectable => {
      return eachSelectable[tagKey];
    });

    return dispatch(Creators.setInput({ activeKey, clientListKey, value: allValues, filterableData }));
  };

  const showSelectAll = showSelectAllButton && !isEmpty(selectable);
  const getSelectCol = () => {
    if (showCSVImporter && showSelectAll) {
      return MULTIPLE_SELECT_WITH_SELECT_ALL_AND_CSV_IMPORT_COL;
    }
    if (showCSVImporter) {
      return MULTIPLE_SELECT_WITH_CSV_IMPORT_COL;
    }
    if (showSelectAll) {
      return MULTIPLE_SELECT_WITH_SELECT_ALL_COL;
    }
    return MULTIPLE_SELECT_COL;
  };

  const isSelectAllButtonDisabled = (selectable && selectable.length) === (value && value.length);

  return (
    <Space direction="vertical" className={classes.container}>
      {isCitySelect(clientListKey) && isSelectAllCountriesVisible && (
        <Row>
          <Col>
            <Checkbox checked={ignoreCountry} disabled={isSelectAllCountriesCheckboxDisabled} onChange={handleIgnoreCountry}>
              {isSelectAllCountriesCheckboxDisabled ? (
                <Tooltip placement="bottomRight" title={t('SELECT_ALL_COUNTRIES_DISABLED_TOOLTIP')}>
                  {t('SELECT_ALL_COUNTRIES')}
                </Tooltip>
              ) : (
                t('SELECT_ALL_COUNTRIES')
              )}
            </Checkbox>
          </Col>
        </Row>
      )}
      <Text>{label}</Text>
      <Row className={classes.fullWidth} justify="space-between" align="middle">
        <Col span={getSelectCol()}>
          <Select
            disabled={disabled}
            className={classes.fullWidth}
            value={value}
            mode={mode}
            onChange={handleSelectChange}
            showArrow={false}
            placeholder={placeholder}
            onSearch={onSearch}
            maxTagCount={maxTagCount}
            allowClear={allowClear}
            onClear={onClear}
            options={tagOptions}
            optionFilterProp="label"
            loading={isLoading}
            onBlur={onBlur}
          />
        </Col>
        {showCSVImporter && (
          <Col span={CSV_IMPORT_BUTTON_COL}>
            <CsvImporter onOkayClick={handleCsvImport} exampleCsv={exampleCsv} disabled={disabled} />
          </Col>
        )}
        {showSelectAll && (
          <Col span={SELECT_ALL_BUTTON_COL}>
            <Row justify="end">
              <Button size="small" onClick={handleSelectAll} disabled={isSelectAllButtonDisabled}>
                {t('button:SELECT_ALL')}
              </Button>
            </Row>
          </Col>
        )}
      </Row>
      {description && <small>{description}</small>}
    </Space>
  );
};

export default MultipleSelect;
