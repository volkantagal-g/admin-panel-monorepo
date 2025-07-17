import { useState } from 'react';
import { Row, Col, Typography, Collapse, DatePicker, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import { SelectConfigType } from '@app/pages/FranchiseDynamicConfig/components';
import ConfigInputField from '../ConfigInputField';
import useStyles from './styles';
import { mandatoryDateFields } from '@app/pages/FranchiseDynamicConfig/constants';
import { getLangKey } from '@shared/i18n';
import FieldType from '@app/pages/FranchiseConfigType/components/Form/components/FieldType';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ filters, handleSubmit, isPending, tableColumns }) => {
  const { t } = useTranslation('franchiseDynamicConfig');
  const classes = useStyles();

  const [date, setDate] = useState(filters.date);
  const [configType, setConfigType] = useState(filters.configType);
  const [dynamicConfigTypeFilters, setDynamicConfigTypeFilters] = useState({});

  const selectedConfigType = tableColumns?.find(item => item.name === configType);

  const handleSubmitClick = () => {
    handleSubmit({
      date,
      configType,
      ...dynamicConfigTypeFilters,
    });
  };

  if (configType !== filters.configType && isEmpty(configType)) {
    setConfigType(filters.configType);
  }

  const getIsDisabledDate = current => {
    return current && current.valueOf() > Date.now();
  };

  const handleConfigInputField = (name, value) => {
    const a = { ...dynamicConfigTypeFilters, [name]: value };
    setDynamicConfigTypeFilters(a);
  };

  /**
   * Gets the appropriate input fields based on the field type
   * @returns {JSX.Element}
   */
  const getInputFields = () => {
    return (
      <Row gutter={[8, 8]} className="mt-2">
        {selectedConfigType?.fields.map((field, index) => {
          const inputField = (
            <>
              <Text>{field.name}</Text>
              <ConfigInputField
                key={field.id}
                field={field}
                index={index}
                isPending={isPending}
                onChange={handleConfigInputField}
              />
              <div className="mt-1">
                <FieldType type={field.type} />
                <Text type="secondary">{get(field.label, getLangKey())}</Text>
              </div>
            </>
          );

          return !Object.values(mandatoryDateFields).includes(field.name) && field.isSelectable && !field.isHiddenFromListing && (
            <Col sm={12} xs={24} key={field.id}>
              {inputField}
            </Col>
          );
        })}
      </Row>
    );
  };

  const handleSelectConfigType = value => {
    setDynamicConfigTypeFilters({});
    setConfigType(value);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Row gutter={[8, 8]}>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('LIST.CONFIG_TYPE')}</Text>
                <SelectConfigType value={configType} onChange={handleSelectConfigType} disabled={isPending} />
              </Col>
              <Col xs={12} sm={24} md={12}>
                <Text>{t('global:DATE')}</Text>
                <DatePicker
                  disabledDate={getIsDisabledDate}
                  format={getLocalDateFormat()}
                  className={classes.datePicker}
                  value={moment(date)}
                  disabled={isPending}
                  onChange={value => setDate(moment(value).format('YYYY-MM-DD'))}
                />
              </Col>
            </Row>
            {selectedConfigType && getInputFields()}
            <Row className="mt-4" justify="end">
              <Button
                type="primary"
                onClick={handleSubmitClick}
                disabled={isPending || isEmpty(configType)}
              >
                {t('BRING')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
