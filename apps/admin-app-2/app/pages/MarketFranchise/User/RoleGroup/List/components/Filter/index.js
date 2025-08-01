import { useState } from 'react';
import { Row, Col, Typography, Collapse, Space, Button, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { InputWrapper } from '@shared/components/UI/Form';
import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ filters, isPending, handleSubmit }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');

  const [name, setName] = useState(filters.name);
  const [isActive, setIsActive] = useState(filters.isActive);

  const handleSubmitClick = () => {
    handleSubmit({ name, isActive });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[16, 16]}>
                <Col sm={12}>
                  <Text>{t('ROLE_GROUP_NAME')}</Text>
                  <InputWrapper value={name} handleChange={e => setName(e.target.value)} disabled={isPending} />
                </Col>
                <Col sm={12}>
                  <Text>{t('global:ACTIVENESS')}</Text>
                  <Col className={classes.switchWrapper}>
                    <Switch
                      checked={isActive}
                      onChange={() => setIsActive(!isActive)}
                      checkedChildren={t('global:ACTIVE')}
                      unCheckedChildren={t('global:INACTIVE')}
                      disabled={isPending}
                      className={isActive ? 'bg-success' : 'bg-danger'}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className={classes.submitButtonContainer}>
                <Button type="primary" onClick={handleSubmitClick} disabled={isPending}>
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

Filter.propTypes = {
  filters: PropTypes.shape({}),
  isPending: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

Filter.defaultProps = {
  filters: {},
  isPending: false,
  handleSubmit: () => {},
};

export default Filter;
