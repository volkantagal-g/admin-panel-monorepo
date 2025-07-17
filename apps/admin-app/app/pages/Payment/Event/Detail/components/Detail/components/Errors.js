import { Button, Collapse, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import JsonModal from '@shared/components/UI/JsonModal';
import useStyles from '../styles';

const { Panel } = Collapse;
const { Text } = Typography;
const Errors = ({ errors }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation('paymentEventPage');

  const handleCancel = () => {
    setIsDetailOpen(false);
  };
  const showModal = () => {
    setIsDetailOpen(true);
  };
  return (
    <Collapse defaultActiveKey={['5']}>
      <Panel header={t('ERRORS')} key="5">
        <div className={classes.itemRow}>
          <Text type="secondary">{t('CODE')} </Text>
          <Text> {errors?.code} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('MESSAGE')} </Text>
          <Text className={classes.overflowText}> {errors?.message} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('DETAIL')} </Text>
          {
            errors && (
              <>
                <Button className={classes.jsonButton} type="primary" size="small" onClick={showModal}>
                  {t('SHOW_DETAIL')}
                </Button>
                <JsonModal
                  title={t('ERRORS')}
                  data={errors}
                  visible={isDetailOpen}
                  handleCancel={handleCancel}
                />
              </>
            )
          }

        </div>
      </Panel>
    </Collapse>
  );
};

export default Errors;
