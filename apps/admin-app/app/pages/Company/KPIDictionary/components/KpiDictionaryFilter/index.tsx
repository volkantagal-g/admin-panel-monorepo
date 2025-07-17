import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  Modal,
  Spin,
  List,
  Typography,
} from 'antd';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { filterOptionsSelector, kpiDictionarySelector, kpiAcronymDictionarySelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useParentStyle from '../../styles';

const CompanyKpiDictionary = () => {
  const { t } = useTranslation(['companyKPIDictionaryPage', 'global']);
  const langKey = getLangKey();
  const parentClasses = useParentStyle();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const selectOptionsData = useSelector(filterOptionsSelector.getFormattedSelectOptionsData);
  const filterOptionsIsPending = useSelector(filterOptionsSelector.getIsPending);
  const kpiDictionaryIsPending = useSelector(kpiDictionarySelector.getIsPending);
  const kpiAcronymDictionaryIsPending = useSelector(kpiAcronymDictionarySelector.getIsPending);
  const kpiAcronymDictionaryData = useSelector(kpiAcronymDictionarySelector.getData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    dispatch(Creators.updateFilters({
      resetPagination: true,
      filters: { ...(values || undefined) },
    }));
    dispatch(Creators.getKPIDictionaryRequest({}));
  };

  const handleResetForm = () => {
    form.resetFields();
    dispatch(Creators.resetFilters({}));
  };

  return (
    <Card title={t('global:FILTER')} className={[parentClasses.cardContainer, parentClasses.filterCardContainer].join(' ')}>
      <Form
        form={form}
        name="employeeFilter"
        id="employeeFilter"
        onFinish={handleFormSubmit}
        layout="vertical"
        initialValues={{}}
        className={parentClasses.filterFormContainer}
      >
        <Row gutter={[16, 0]}>
          <Col sm={12} xs={24}>
            <Form.Item name={['search']} label={t('global:SEARCH')}>
              <Input placeholder={t('global:SEARCH')} className={parentClasses.inputContainer} disabled={kpiDictionaryIsPending} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['acronyms']} label={t('global:ACRONYM')}>
              <Select
                options={selectOptionsData.acronyms}
                placeholder={t('global:ACRONYM')}
                className={parentClasses.inputContainer}
                loading={filterOptionsIsPending}
                disabled={kpiDictionaryIsPending}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['domains']} label={t('global:DOMAIN')}>
              <Select
                options={selectOptionsData.domains}
                placeholder={t('global:DOMAIN')}
                className={parentClasses.inputContainer}
                mode="multiple"
                loading={filterOptionsIsPending}
                disabled={kpiDictionaryIsPending}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['categories']} label={t('global:CATEGORY')}>
              <Select
                options={selectOptionsData.categories}
                placeholder={t('global:CATEGORY')}
                className={parentClasses.inputContainer}
                mode="multiple"
                loading={filterOptionsIsPending}
                disabled={kpiDictionaryIsPending}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <Button
                className={parentClasses.modalButtonLeft}
                onClick={handleOpenModal}
                loading={kpiAcronymDictionaryIsPending}
                disabled={kpiAcronymDictionaryIsPending}
                type="default"
              >
                <InfoCircleOutlined className={parentClasses.modalButtonIcon} />
                {t('companyKPIDictionaryPage:KPI_ACRONYM_DICTIONARY')}
              </Button>
            </div>
            <Button onClick={handleResetForm} disabled={kpiDictionaryIsPending || filterOptionsIsPending}>
              {t('global:RESET')}
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              type="primary"
              htmlType="submit"
              loading={kpiDictionaryIsPending}
              disabled={filterOptionsIsPending}
            >
              {t('global:FILTER')}
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        title={t('companyKPIDictionaryPage:KPI_ACRONYM_DICTIONARY')}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={500}
      >
        {kpiAcronymDictionaryIsPending ? (
          <div className={parentClasses.modalSpin}>
            <Spin />
          </div>
        ) : (
          <List
            dataSource={kpiAcronymDictionaryData}
            renderItem={item => (
              <List.Item className={parentClasses.modalListItem}>
                <Typography.Text className={parentClasses.modalAcronym} strong>
                  {item.acronym?.[langKey]}
                </Typography.Text>
                <div className={parentClasses.modalDivider} />
                <Typography.Text className={parentClasses.modalFullName}>
                  {item.fullName?.[langKey]}
                </Typography.Text>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </Card>
  );
};

export default CompanyKpiDictionary;
