import {
  Row,
  Col,
  Form,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'react-jss';

import { useDispatch } from 'react-redux';

import { Creators } from '@app/pages/MarketProduct/Family/redux/actions';

import useStyles from './styles';

import { Button, Space, TextInput } from '@shared/components/GUI';

const Filters = ({ setFormValues }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const { t } = useTranslation('marketProductFamilyPage');
  const [form] = Form.useForm();

  const handleFilter = () => {
    const formValues = form.getFieldsValue();
    setFormValues({ ...formValues });
    dispatch(Creators.getMarketProductFamilyListRequest({ ...formValues }));
  };

  const handleFormValues = (target, value) => {
    form.setFieldsValue({ [target]: value });
  };

  const handleClean = () => {
    setFormValues({});
    form.resetFields();
    dispatch(Creators.getMarketProductFamilyListRequest());
  };

  return (
    <Space>
      <Form layout="vertical" form={form}>
        <Row
          gutter={[theme.spacing(3), theme.spacing(3)]}
          className={classes.row}
        >
          <Col xs={24} sm={24} lg={24}>
            <TextInput
              name="name"
              data-testid="familyName"
              label={t('SEARCH_BY_FAMILY_NAME')}
              onChange={event => handleFormValues('name', event.target.value)}
            />
          </Col>
        </Row>
        {/* <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.row}>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="familyIds"
              label={t('SEARCH_BY_FAMILY_IDS')}
              allowClear
              mode="tags"
              onChange={value => handleFormValues('familyIds', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="familyNames"
              label={t('SEARCH_BY_FAMILY_NAMES')}
              allowClear
              mode="tags"
              onChange={value => handleFormValues('familyNames', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              label={t('SEARCH_BY_FAMILY_STATUS')}
              name="status"
              defaultValue={FAMILY_STATUS_OPTION.ALL}
              optionsData={getFamilyStatusOptions(t)}
              onChange={value => handleFormValues('status', value)}
            />
          </Col>
        </Row> */}
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button color="default" onClick={handleClean}>
              {t('CLEAN_FORM')}
            </Button>
          </Col>
          <Col>
            <Button onClick={handleFilter}>{t('global:APPLY')}</Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Filters;
