import { FC, useEffect, useMemo } from 'react';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import useStyles from './styles';
import { getInitialValues, getPromoMechanicOptions, getValuesBeforeSearch } from './formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import { IFilters, PaginationType } from '../../interfaces';
import AntSelect from '@shared/components/UI/AntSelect';

type FiltersProps = {
  onSearch: (filters: IFilters) => void;
  isSearchPending: boolean;
  pagination: PaginationType;
}

const Filters: FC<FiltersProps> = ({
  onSearch,
  isSearchPending,
  pagination,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('promoBadgesPage');
  const [form] = Form.useForm();

  const initialValues = useMemo(() => getInitialValues(), []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const body: IFilters = getValuesBeforeSearch(values);
      onSearch(body);
    },
  });

  const { handleSubmit, setFieldValue, values, errors } = formik;

  useEffect(() => {
    const body: IFilters = getValuesBeforeSearch(values);
    onSearch(body);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <Row gutter={[8, 8]} className="mb-2">
      <Col span={24}>
        <Card key="1">
          <Space direction="vertical" className={classes.filterWrapper}>
            <Form
              form={form}
              id="classification-form"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Row gutter={[8, 8]} justify="space-between" align="bottom">
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label={t('LIST.BADGE_NAME')}
                    help={get(errors, 'name')}
                    validateStatus={get(errors, 'name') ? 'error' : 'success'}
                  >
                    <Input
                      placeholder={t('LIST.BADGE_NAME')}
                      onChange={e => {
                        setFieldValue('name', e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label={t('LIST.PROMO_MECHANIC')}>
                    <AntSelect
                      value={values.promoMechanic}
                      options={getPromoMechanicOptions()}
                      placeholder={t('LIST.PROMO_MECHANIC')}
                      onChange={(promoMechanic: number) => {
                        setFieldValue('promoMechanic', promoMechanic);
                      }}
                      autoComplete="off"
                      showSearch
                      filterOption={getSelectFilterOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item>
                    <Button
                      size="middle"
                      type="primary"
                      htmlType="submit"
                      disabled={isSearchPending}
                    >
                      {t('global:BRING')}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Filters;
