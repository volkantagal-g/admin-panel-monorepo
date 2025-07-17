import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Collapse,
  Input,
  Typography, Button,
} from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import { clientsSelector } from '@app/pages/Client/List/redux/selectors';
import { Creators } from '@app/pages/Client/List/redux/actions';

const Filter = () => {
  const { Text } = Typography;
  const { Panel } = Collapse;

  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [fieldName, setFieldName] = useState('');
  const [fieldGsm, setFieldGsm] = useState('');
  const [fieldEmail, setFieldEmail] = useState('');

  const isClientsPending = useSelector(clientsSelector.getIsPending);

  const handleNameField = name => {
    setFieldName(name.target.value);
  };

  const handleGsmField = gsm => {
    setFieldGsm(gsm.target.value);
  };

  const handleEmailField = email => {
    setFieldEmail(email.target.value);
  };

  const handleSubmit = useCallback(() => {
    dispatch(Creators.searchClientsRequest({
      name: fieldName,
      gsm: fieldGsm,
      email: fieldEmail,
    }));
  }, [dispatch, fieldEmail, fieldGsm, fieldName]);

  return (
    <Row>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} xl={8}>
                <Text>{t('NAME')}</Text>
                <Input
                  value={fieldName}
                  onChange={handleNameField}
                  placeholder={t('NAME')}
                  className={classes.inputField}
                />
              </Col>
              <Col xs={24} sm={24} xl={8}>
                <Text>{t('GSM')}</Text>
                <Input
                  value={fieldGsm}
                  onChange={handleGsmField}
                  placeholder={t('GSM')}
                  className={classes.inputField}
                />
              </Col>
              <Col xs={24} sm={24} xl={8}>
                <Text>{t('EMAIL')}</Text>
                <Input
                  value={fieldEmail}
                  onChange={handleEmailField}
                  placeholder={t('EMAIL')}
                  className={classes.inputField}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={classes.submitContainer}>
                  <Button
                    size="medium"
                    variant="contained"
                    type="primary"
                    disabled={isClientsPending}
                    onClick={handleSubmit}
                  > {t('BRING')}
                  </Button>
                </div>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
