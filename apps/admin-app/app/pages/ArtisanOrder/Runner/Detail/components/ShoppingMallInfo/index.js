import { Col, Row, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useStylesShared from '../../styles';

function ShoppingMallInfo({ runner, onSubmit }) {
  const sharedClasses = useStylesShared();
  const { t } = useTranslation('runnerDetailPage');
  const { Text } = Typography;
  const [enableEdit] = useState(false);
  const { shoppingMallId, companyId } = runner || {};

  const { values, handleChange } = useFormik({
    initialValues: {
      shoppingMallId,
      companyId: 1,
      recipientId: 'c2b21881-5546-4f3b-9e54-69036ce6e3f2',
      employmentStatus: '',
    },
    enableReinitialize: true,
    onSubmit,
  });

  const selectBoxes = useMemo(
    () => [
      {
        label: t('MALL_SHORT'),
        key: 'shoppingMallId',
        options: [
          {
            name: 'Hilltown',
            value: shoppingMallId,
          },
        ],
        defaultValue: 'Hilltown',
      },
      {
        label: t('RECEIVING'),
        key: 'companyId',
        options: [
          {
            name: 'Mall Logistics',
            value: companyId,
          },
        ],
        defaultValue: 'Mall Logistics',
      },
      {
        label: t('EMPLOYER_SERVICE_RECIPIENT'),
        key: 'recipientId',
        options: [
          {
            name: 'Mall Logistics',
            value: 'c2b21881-5546-4f3b-9e54-69036ce6e3f2',
          },
        ],
        defaultValue: 'c2b21881-5546-4f3b-9e54-69036ce6e3f2',
      },
    ],
    [t, companyId, shoppingMallId],
  );

  return (
    <div className={sharedClasses.sectionContainer}>
      <Row justify="space-between">
        <Col>
          <Text className={sharedClasses.sectionTitle}>{t('MALL_INFO')}</Text>
        </Col>
      </Row>
      <div>
        {selectBoxes.map((selectbox, i) => (
          <div className={i !== 0 && 'mt-2'} key={selectbox.label}>
            <label htmlFor={selectbox.key} className={sharedClasses.label}>
              {selectbox.label}
            </label>
            <Select
              disabled={!enableEdit}
              name={selectbox.key}
              value={selectBoxes.defaultValue || values[selectbox.key]}
              onChange={handleChange}
              className="w-100"
            >
              {selectbox.options.map(({ name, value }) => (
                <Select.Option key={value} value={value}>
                  <Text className={sharedClasses.inputText}>{name}</Text>
                </Select.Option>
              ))}
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingMallInfo;
