import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { copyToClipboard } from '@shared/utils/common';

import OperationsHeader from '../OperationsHeader';
import useStyles from './styles';
import { courierSelector, courierBusyOptionsSelector } from '../../redux/selectors';

const { Title } = Typography;

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation(['courierPage']);

  const courierDetail = useSelector(courierSelector.getData);
  const isCourierDetailPending = useSelector(courierSelector.getIsPending);
  const courierBusyOptions = useSelector(courierBusyOptionsSelector.getData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageTitle = () => {
    const header = t('PAGE_TITLE.COURIER.DETAIL');
    if (courierDetail?.name) return `${courierDetail.name} - ${header}`;
    return `${header}`;
  };

  const courierInfoStringified = useMemo(() => {
    if (courierDetail) {
      return JSON.stringify(courierDetail, null, 2);
    }

    return '';
  }, [courierDetail]);

  const handleJsonClick = () => {
    setIsModalOpen(true);
  };

  const handleCopyClick = () => {
    copyToClipboard(courierInfoStringified);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row justify="space-between" align="middle">
      <Col span={12}>
        <div className={classes.titleContainer}>
          <Title level={3} className="mr-2">{pageTitle()}</Title>
          <Button
            type="primary"
            size="small"
            onClick={handleJsonClick}
            disabled={isCourierDetailPending}
          >
            JSON
          </Button>
          <Modal
            width={800}
            visible={isModalOpen}
            onCancel={handleCancel}
            centered
            destroyOnClose
            title={`${t('PAGE_TITLE.COURIER.DETAIL')} JSON`}
            footer={[
              <Button onClick={handleCancel} htmlType="button">
                {t('courierPage:CLOSE')}
              </Button>,
              <Button type="primary" onClick={handleCopyClick} htmlType="button">
                {t('COPY')}
              </Button>,
            ]}
          >
            <pre className={classes.jsonDetailContainer}>{courierInfoStringified}</pre>
          </Modal>
        </div>
      </Col>
      <Col span={12}>
        <OperationsHeader
          courierDetail={courierDetail}
          courierBusyOptions={courierBusyOptions}
        />
      </Col>
    </Row>
  );
};

export default Header;
