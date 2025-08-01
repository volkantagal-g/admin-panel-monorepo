import { useState } from 'react';
import { Row, Col, Typography, Collapse, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { InputWrapper } from '@shared/components/UI/Form';
import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ filters, isPending, handleSubmit }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketFranchiseUserRolePage');

  const [roleName, setRoleName] = useState(filters.roleName);

  const handleSubmitClick = () => {
    handleSubmit({ roleName });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t("FILTER")} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col sm={24}>
                  <Text>{t('ROLE_NAME')}</Text>
                  <InputWrapper
                    value={roleName}
                    handleChange={e => setRoleName(e.target.value)}
                    disabled={isPending}
                  />
                </Col>
              </Row>
              <Row className={classes.submitButtonContainer}>
                <Button
                  type="primary"
                  onClick={handleSubmitClick}
                  disabled={isPending}>
                  {t('global:BRING')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
