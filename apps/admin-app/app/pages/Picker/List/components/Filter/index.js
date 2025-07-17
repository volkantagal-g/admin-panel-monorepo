import { useState } from 'react';
import { Row, Col, Collapse, Space, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const { Panel } = Collapse;

function Filter({ filters, handleSubmit, isPending }) {
  const [pickerFilterText, setpickerFilterText] = useState(
    filters.pickerFilterTexts,
  );
  const { t } = useTranslation('pickerListPage');

  const classes = useStyles();

  const submitButtonClick = () => {
    handleSubmit({ pickerFilterText });
  };

  const handleEnterPress = e => {
    if (e.key === 'Enter') {
      handleSubmit({ pickerFilterText });
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Input
                value={pickerFilterText}
                onChange={e => setpickerFilterText(e.target.value)}
                disabled={isPending}
                placeholder={t('FILTER_PLACEHOLDER')}
                onKeyDown={handleEnterPress}
              />
              <div className={classes.buttonContainer}>
                <Button type="primary" onClick={submitButtonClick}>
                  {t('global:BRING')}
                </Button>
              </div>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export default Filter;
