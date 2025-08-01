import { Row, Col, Collapse, Typography, Form, Input, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { filtersSelector, getPagination } from '../../redux/selectors';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = () => {
  const { t } = useTranslation(['paymentMerchantPage', 'global']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector.getFilters);
  const pagination = useSelector(getPagination);

  const onValuesChange = (changedVal, values) => {
    dispatch(Creators.setFilters({ filters: { ...values, changedVal } }));
    dispatch(Creators.setPagination({ currentPage: 1, rowsPerPage: pagination.rowsPerPage }));
  };

  return (
    <Row className="mb-4">
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
              onValuesChange={(changedVal, values) => onValuesChange(changedVal, values)}
              initialValues={filters}
            >
              <Row gutter={[8, 8]}>
                <Col md={6} xs={24}>
                  <Text>ID</Text>
                  <Form.Item name="id" className="m-0">
                    <Input
                      className="w-100"
                      placeholder="ID"
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>Key</Text>
                  <Form.Item name="key" className="m-0">
                    <Input
                      className="w-100"
                      placeholder="Key"
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('paymentMerchantPage:TABLE.COLUMNS.MERCHANT_NAME')}</Text>
                  <Form.Item name="merchantName" className="m-0">
                    <Input
                      className="w-100"
                      placeholder={t('paymentMerchantPage:TABLE.COLUMNS.MERCHANT_NAME')}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('global:CREATED_AT')}</Text>
                  <Form.Item name="createdAt" className="m-0">
                    <RangePicker
                      className="w-100"
                      format={DEFAULT_DATE_FORMAT}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('global:UPDATED_AT')}</Text>
                  <Form.Item name="updatedAt" className="m-0">
                    <RangePicker
                      className="w-100"
                      format={DEFAULT_DATE_FORMAT}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
