import { Button, Col, Form, Row, Select } from 'antd';
import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

import useStyles from './styles';

export default function ReportRequest({ reportTypes, isPending }) {
  const [selected, setSelected] = useState();
  const { t } = useTranslation('reportsPage');
  const navigate = useNavigate();
  const reportTypeOptions = useMemo(() => reportTypes.map(rt => ({ value: rt._id, label: rt.name[getLangKey()] })), [reportTypes]);

  const classes = useStyles();
  return (
    <Form>
      <Row gutter={[4, 4]}>
        <Col sm={8} xs={24}>
          <Form.Item label={t('REPORT_TYPE')} name="reportTypeSelect">
            <Select
              className={classes.fullWidth}
              options={reportTypeOptions}
              optionFilterProp="label"
              value={selected}
              onChange={handleChange}
              showSearch
              disabled={isPending}
              loading={isPending}
            />
          </Form.Item>
        </Col>
        <Col sm={4} xs={24}>
          <Button type="primary" disabled={!selected} onClick={handleClick}>
            {t('global:CREATE')}
          </Button>
        </Col>
      </Row>
    </Form>
  );

  function handleChange(arg) {
    setSelected(arg);
  }
  function handleClick() {
    const path = ROUTE.REPORTS_NEW.path.replace(':reportTypeId', selected);
    navigate(path);
  }
}
