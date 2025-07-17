import { Form, DatePicker, Typography, Button, Input, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { formValidationRules } from '@app/pages/Fleet/TMS/Detail/components/DetailForm/helpers';
import useStyles from '@app/pages/Fleet/TMS/New/components/VehicleDocuments/styles';

const VehicleDocuments = () => {
  const { t } = useTranslation('tmsPage');
  const classes = useStyles();

  return (
    <Form.List name="vehicleDocuments">
      {(fields, { add, remove }) => {
        return (
          <>
            <div className={`w-100 p-2 ${classes.documentHeaderContainer}`}>
              <Typography.Text className={`${classes.documentHeaderTitle}`}>{t('tmsPage:VEHICLE_DOCUMENTS')}</Typography.Text>
              <Button size="small" onClick={() => add()}>{t('tmsPage:ADD_DOCUMENT')}</Button>
            </div>
            {fields.map((field, idx) => {
              return (
                <Col xs={12} lg={8} key={field.key}>
                  <AntCard
                    className="w-100"
                    title={(
                      <div className={`${classes.cardHeader} w-100`}>
                        <Button htmlType="button" danger onClick={() => remove(idx)} size="sm">{t('DELETE')}</Button>
                      </div>
                    )}
                  >
                    <Form.Item
                      className="mt-2"
                      required
                      label={t('tmsPage:DOCUMENT_TYPE')}
                      name={[idx, 'type']}
                      rules={formValidationRules.required}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="mt-2"
                      required
                      label={t('tmsPage:DOCUMENT_NUMBER')}
                      name={[idx, 'number']}
                      rules={formValidationRules.required}
                    >
                      <Input value={field.number} type="number" />
                    </Form.Item>
                    <Form.Item
                      className="mt-2"
                      required
                      label={t('tmsPage:START_DATE')}
                      name={[idx, 'startDate']}
                      rules={formValidationRules.required}
                    >
                      <DatePicker
                        showTime
                        value={field.startDate}
                        className="w-100"
                      />
                    </Form.Item>
                    <Form.Item
                      className="mt-2"
                      required
                      label={t('tmsPage:END_DATE')}
                      name={[idx, 'endDate']}
                      rules={formValidationRules.required}
                    >
                      <DatePicker
                        showTime
                        value={field.endDate}
                        className="w-100"
                      />
                    </Form.Item>
                  </AntCard>
                </Col>
              );
            })}
          </>
        );
      }}
    </Form.List>
  );
};

export default VehicleDocuments;
