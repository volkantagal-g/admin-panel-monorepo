import {
  Row,
  Col,
  Form,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'react-jss';

import useStyles from './styles';

import { Button, Select, Space, TextInput } from '@shared/components/GUI';

import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDomainTypeOptions } from '@shared/utils/formHelper';

const { Option } = Select;

const productStatusFilterOptions =
  Object.entries(MARKET_PRODUCT_STATUS).map(([key, value]) => {
    return (
      <Option key={key} value={value}>
        {marketProductStatuses?.[value]?.[getLangKey()]}
      </Option>
    );
  });

const domainTypeFilterOptions = getDomainTypeOptions();

const Filters = ({ setFormValues }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { t } = useTranslation('marketProductFamilyPage');
  const [form] = Form.useForm();

  const handleFilter = () => {
    const formValues = form.getFieldsValue();
    setFormValues({ ...formValues });
  };

  const handleFormValues = (target, value) => {
    form.setFieldsValue({ [target]: value });
    handleFilter();
  };

  const handleClean = () => {
    setFormValues({});
    form.resetFields();
  };

  return (
    <Space>
      <Form
        layout="vertical"
        form={form}
      >
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.row}>
          <Col xs={24} sm={12} lg={12}>
            <Select
              name="productIds"
              label={t('SEARCH_BY_PRODUCT_IDS')}
              allowClear
              mode="tags"
              onChange={value => handleFormValues('productIds', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <TextInput
              name="productName"
              label={t('SEARCH_BY_PRODUCT_NAME')}
              allowClear
              mode="tags"
              onChange={e => handleFormValues('productName', e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.row}>
          <Col xs={24} sm={12} lg={12}>
            <Select
              label={t('SEARCH_BY_PRODUCT_STATUS')}
              name="status"
              mode="multiple"
              onChange={value => handleFormValues('status', value)}
              showArrow={false}
              className="w-100"
              showSearch
            >
              {productStatusFilterOptions}
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Select
              label={t('SEARCH_BY_PRODUCT_SERVICE_TARGET')}
              name="domainTypes"
              mode="multiple"
              showArrow={false}
              className="w-100"
              showSearch
              optionsData={domainTypeFilterOptions}
              onChange={value => handleFormValues('domainTypes', value)}
            />
          </Col>
        </Row>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button color="default" onClick={handleClean}>{t('CLEAN_FORM')}</Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Filters;
