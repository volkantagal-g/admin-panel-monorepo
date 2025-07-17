import { Row, Col, Collapse, Typography, Button, Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import AntSelect from '@shared/components/UI/AntSelect';
import { getPosBankOptions, modifiedDataExistModal } from '../../utils';
import { cardInstallmentCountsSelector, filtersSelector, getPagination } from '../../redux/selectors';
import { alphabeticallySortByParam } from '@shared/utils/common';
import { Creators } from '../../redux/actions';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = () => {
  const { t } = useTranslation(['installmentCommissionPage', 'global']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const filters = useSelector(filtersSelector.getFilters);
  const cardInstallmentCountsModifiedData = useSelector(cardInstallmentCountsSelector.getModifiedInstallments);
  const cardInstallmentCountsIsPending = useSelector(
    cardInstallmentCountsSelector.getIsPending,
  );
  const cardInstallmentCountsPosBankList = useSelector(
    cardInstallmentCountsSelector.getPosBankList,
  );

  const isModifiedDataExist = cardInstallmentCountsModifiedData?.length > 0;
  const posBankOptions = getPosBankOptions(cardInstallmentCountsPosBankList, 'posIca');
  const pagination = useSelector(getPagination);

  const onFinish = () => {
    const values = form.getFieldsValue();
    dispatch(Creators.setFilters({ filters: values }));
    dispatch(Creators.setPagination({ currentPage: 1, rowsPerPage: pagination.rowsPerPage }));
  };

  // needed because after refetch form values have to be reset
  // initialValues prop does not work!
  useEffect(() => {
    form.setFieldsValue({ ...filters });
  }, [filters, form]);

  return (
    <Row>
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Form
              form={form}
              name="filterForm"
            >
              <Row gutter={[8, 8]}>
                <Col md={6} xs={24}>
                  <Text>{t('POS_BANK')}</Text>
                  <Form.Item name="posIca" className="m-0">
                    <AntSelect
                      allowClear
                      className="w-100"
                      optionFilterProp="label"
                      placeholder={t('POS_BANK')}
                      options={alphabeticallySortByParam(
                        posBankOptions,
                      )}
                      showSearch
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={24}>
                  <Text>{t('INSTALLMENT_COUNT')}</Text>
                  <Form.Item name="installmentCount" className="m-0">
                    <InputNumber
                      className="w-100"
                      placeholder={t('INSTALLMENT_COUNT')}
                      min={0}
                      type="number"
                      max={100}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col md={4} xs={24}>
                  <Button
                    loading={cardInstallmentCountsIsPending}
                    type="primary"
                    className="w-100 mt-2"
                    onClick={() => (isModifiedDataExist ? modifiedDataExistModal({ t, onOk: () => onFinish }) : onFinish())}
                  >
                    {t('BRING')}
                  </Button>
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
