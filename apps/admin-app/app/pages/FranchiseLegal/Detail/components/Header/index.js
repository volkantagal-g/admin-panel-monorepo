import { PageHeader, Col, Row, Button, Tag } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import { Creators } from '../../redux/actions';

import useStyles from './styles';

const regex = /\.pdf$/i;

const Header = ({ isPending, agreementDetails, agreementId }) => {
  const { t } = useTranslation('franchiseLegalPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const color = agreementDetails?.isEnable ? 'success' : 'error';
  const text = agreementDetails?.isEnable ? t('global:ACTIVE') : t('global:INACTIVE');
  const agreementName = agreementDetails?.fileName?.replace(regex, '') || '';

  const handleRemindFranchises = () => {
    dispatch(Creators.notifyFranchisesRequest({ id: agreementId }));
  };
  return (
    <Row gutter={[0, 8]}>
      {agreementDetails?.fileName && (
        <>
          <Col flex={1}>
            <Row gutter={[0, 8]}>
              <PageHeader
                className="p-0 page-title"
                title={agreementName}
              />
              <Tag color={color} className={classes.tag}>
                {text}
              </Tag>
            </Row>
          </Col>
          <Col>
            <Button type="primary" icon={<HistoryOutlined />} onClick={handleRemindFranchises} loading={isPending}>
              {t('DETAIL.REMIND')}
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Header;
