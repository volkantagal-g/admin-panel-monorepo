import { Row, Col, Space, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTE } from '@app/routes';

import createAnnouncementBody from '@app/pages/GetirWater/Announcements/utils/createAnnouncementBody';

import GeneralInfo from './GeneralInfo';
import Filter from './Filter';
import DateInformation from './DateInformation';
import ValidTimes from './ValidTimes';
import PicturePreview from './PicturePreview';
import BannerDetails from './BannerDetails';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { defaultValues } from './formHelper';
import ButtonAction from './ButtonAction';

const AnnouncementNewForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const classes = useStyles();

  const [form] = Form.useForm();

  const onFinish = values => {
    const data = createAnnouncementBody(values, null, false);
    dispatch(Creators.createAnnouncementRequest({ data }));
  };

  return (
    <Form id="announcement-new" onFinish={onFinish} layout="vertical" form={form} initialValues={defaultValues}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <GeneralInfo />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Filter />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <DateInformation />
        </Col>
        <Col span={8}>
          <ValidTimes />
        </Col>
        <Col span={10}>
          <PicturePreview />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <ButtonAction form={form} />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <BannerDetails form={form} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} className={classes.colWrapper}>
          <Space size="small">
            <Link to={ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST.path}>
              <Button>{t('CANCEL')}</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              {t('SAVE')}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default AnnouncementNewForm;
