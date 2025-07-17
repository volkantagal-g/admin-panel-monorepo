import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import { createTransferGroupSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import Spinner from '@shared/components/Spinner';
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';

const TransferGroupNewForm = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createTransferGroupSelector.getIsPending);
  const { t } = useTranslation('transferGroupPage');
  const theme = useTheme();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createTransferGroupRequest(values));
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  if (isPending) {
    return <Spinner />;
  }

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button size="small" form="transfer-group-new" type="primary" htmlType="submit">
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('TRANSFER_GROUP')}>
      <Form id="transfer-group-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={_.get(touched, 'name.tr') && _.get(errors, 'name.tr')}
              validateStatus={_.get(touched, 'name.tr') && _.get(errors, 'name.tr') ? 'error' : 'success'}
              name="name.tr"
              label={t('global:NAME')}
            >
              <Input
                value={values.name.tr}
                onChange={handleChange}
                addonAfter="TR"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_.get(touched, 'name.en') && _.get(errors, 'name.en')}
              validateStatus={_.get(touched, 'name.en') && _.get(errors, 'name.en') ? 'error' : 'success'}
              name="name.en"
              label=""
            >
              <Input
                value={values.name.en}
                onChange={handleChange}
                addonAfter="EN"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default TransferGroupNewForm;
