import { useState } from 'react';
import { Row, Col, Collapse, Space, Typography, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import AntSelect from '@shared/components/UI/AntSelect';
import { ANT_SPACING_24, DEFAULT_ACTIVE_KEY, DEFAULT_COL_SPACING, DEFAULT_IS_SEARCHABLE, DEFAULT_ROW_SPACING } from '../../constants';
import { convertedActivenessOptions } from '../../utils';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const classes = useStyles();
  const { t } = useTranslation('personPage');

  const [name, setName] = useState(filters.name);
  const [isActivated, setIsActivated] = useState(filters.isActivated);
  const [uniqueIdentifier, setUniqueIdentifier] = useState(filters.uniqueIdentifier);
  const [isSearchable, setIsSearchable] = useState(DEFAULT_IS_SEARCHABLE);

  const handleBlur = () => {
    setIsSearchable(!name || name.length > 2);
  };

  const handlePersontStatus = values => {
    setIsActivated(values);
  };

  const handlePersonName = values => {
    setName(values.target.value);
  };

  const handleUniqueIdentifier = values => {
    setUniqueIdentifier(values.target.value);
  };

  const submitButtonClick = () => {
    handleSubmit({ name, isActivated, uniqueIdentifier });
  };

  return (
    <Row gutter={DEFAULT_ROW_SPACING}>
      <Col span={ANT_SPACING_24}>
        <Collapse defaultActiveKey={[DEFAULT_ACTIVE_KEY]}>
          <Panel key={DEFAULT_ACTIVE_KEY} header={t('FILTER')}>
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={DEFAULT_ROW_SPACING}>
                <Col {...DEFAULT_COL_SPACING}>
                  <Text>{t('NAME')}</Text>
                  <Input
                    value={name}
                    onChange={handlePersonName}
                    disabled={isPending}
                    className={!isSearchable && classes.error}
                    onBlur={handleBlur}
                    placeholder={t('PLACEHOLDER.NAME')}
                  />
                  {!isSearchable && <Text type="danger">{t('PLACEHOLDER.NAME')}</Text>}
                </Col>
                <Col {...DEFAULT_COL_SPACING}>
                  <Text>{t('IDENTIFICATION_NUMBER')}</Text>
                  <Input
                    value={uniqueIdentifier}
                    onChange={handleUniqueIdentifier}
                    disabled={isPending}
                    placeholder={t('PLACEHOLDER.UNIQUE_IDENTIFIER')}
                  />
                </Col>
                <Col {...DEFAULT_COL_SPACING}>
                  <Text>{t('ACTIVENESS')}</Text>
                  <AntSelect
                    value={isActivated}
                    onChange={handlePersontStatus}
                    options={convertedActivenessOptions}
                    placeholder={t('ACTIVENESS')}
                    allowClear
                    disabled={isPending}
                    className={classes.filterItem}
                  />
                </Col>
              </Row>
            </Space>
            <div className={classes.buttonContainer}>
              <Button type="primary" disabled={isPending || !isSearchable} onClick={submitButtonClick}>
                {t('BRING')}
              </Button>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
