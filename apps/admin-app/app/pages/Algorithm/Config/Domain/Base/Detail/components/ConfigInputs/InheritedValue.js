import { Alert, Button, Col, Divider, Empty, Input, Popover, Row, Steps } from 'antd';
import { get } from 'lodash';
import { EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import { getNestedParents } from '@app/pages/Algorithm/Config/utils';
import useStyles from '../../styles';

const { Step } = Steps;

const InheritedValue = ({ inputParams }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();
  const configValueData = useSelector(algorithmDomainConfigDetailSelector.getValueData);
  const configDetailData = useSelector(algorithmDomainConfigDetailSelector.getData);

  const parentList = useMemo(() => {
    return getNestedParents(configDetailData).reverse();
  }, [configDetailData]);

  const parentSummary = useMemo(() => {
    const parentConfigList = parentList.filter(parent => {
      return Object.keys(parent?.value)
        .includes(inputParams?.field);
    });
    const customConfigList = configDetailData?.customConfigs.filter(config => {
      return Object.keys(config?.value)
        .includes(inputParams?.field);
    });
    return (
      <div>
        {parentConfigList.length > 0 && (
          <>
            <Divider plain className={classes.parentPopoverDivider}>{t('PARENTS')}</Divider>
            <Steps direction="vertical" size="small" current={parentConfigList.length}>
              {parentConfigList.map(config => {
                return (
                  <Step
                    title={`${config.alias} (${config.type})`}
                    description={`Value: ${get(config?.value, inputParams?.field)}`}
                  />
                );
              })}
            </Steps>
          </>
        )}
        {customConfigList.length > 0 && (
          <>
            <Divider plain className={classes.parentPopoverDivider}>{t('CUSTOM_CONFIGS')}</Divider>
            <Steps direction="vertical" size="small" current={customConfigList.length}>
              {customConfigList.map(config => {
                return (
                  <Step
                    title={config.alias}
                    description={`Value: ${get(config?.value, inputParams?.field)}`}
                  />
                );
              })}
            </Steps>
            <Alert className={classes.parentPopoverAlert} message={t('algorithmConfigPage:CUSTOM_CONFIG_INFO')} type="info" />
          </>
        )}
        {(parentConfigList.length === 0 && customConfigList.length === 0) && <Empty />}
      </div>
    );
  }, [t, parentList, configDetailData, classes, inputParams]);

  return (
    <Row gutter={3}>
      <Col span={22}>
        <Input
          value={get(configValueData, inputParams?.field)}
          disabled
        />
      </Col>
      <Col span={2}>
        <Popover content={parentSummary} title={t('algorithmConfigPage:PARENT_SUMMARY')}>
          <Button type="default" icon={<EyeOutlined />} />
        </Popover>
      </Col>
    </Row>
  );
};

export default InheritedValue;
