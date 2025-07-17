import { Tabs, Modal, Button, Row, Col, Alert, Space, Table, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { generateColumns } from './config';
import { Creators } from '../../redux/actions';
import { returnDetailSelector } from '../../redux/selectors';
import useStyles from './styles';
import { currency } from '@shared/utils/common';

const { TabPane } = Tabs;
const { Text } = Typography;

const RETURN_REQUEST_RESPOND_TYPE = {
  ACCEPT: 'adminRespondApprove',
  REJECT: 'adminRespondReject',
};

function ReturnDetailModal(props) {
  const {
    returnId,
    isModalVisible,
    setModalVisibility,
    modalWidth = 999,
  } = props;
  const [confirmMessageType, setconfirmMessageType] = useState('ACCEPT');
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);
  const [isConfirmBusy, setIsConfirmBusy] = useState(false);
  const [currentTab, setCurrentTab] = useState(RETURN_REQUEST_RESPOND_TYPE.REJECT);
  const dispatch = useDispatch();
  const { t } = useTranslation('localsReturnsPage');
  const classes = useStyles();
  const CONFIRM_MESSAGE_BUTTON_CSS = {
    ACCEPT: `${classes.returnBtn} ${classes.returnBtn}-approve`,
    REJECT: `${classes.returnBtn} ${classes.returnBtn}-reject`,
  };
  const getReturnDetail = useSelector(returnDetailSelector.getReturnDetail);
  const approvedProducts = getReturnDetail?.filter(x => !x.rejectReasonId);
  const rejectedProducts = getReturnDetail?.filter(x => !!x.rejectReasonId);

  const getReturnDetailPending = useSelector(
    returnDetailSelector.getReturnDetailPending,
  );

  const totalAmount = useMemo(() => {
    let products;

    if (currentTab === RETURN_REQUEST_RESPOND_TYPE.ACCEPT) products = approvedProducts;
    else products = rejectedProducts;

    const total = products?.reduce((price, product) => (product?.price ?? 0) + price, 0);
    return (total || 0)?.toFixed(2).replace('.', ',');
  }, [approvedProducts, rejectedProducts, currentTab]);

  const handleCancel = () => {
    setModalVisibility(false);
    setCurrentTab(RETURN_REQUEST_RESPOND_TYPE.REJECT);
  };

  const successCallback = () => {
    setConfirmModalVisibility(false);
    setIsConfirmBusy(false);
    handleCancel();
    dispatch(Creators.resetFilter());
    dispatch(Creators.getReturnRequest());
  };

  useEffect(() => {
    dispatch(Creators.getReturnDetailRequest({ returnId }));
  }, [dispatch, returnId]);

  const handleConfirmOk = () => {
    setIsConfirmBusy(true);
    dispatch(
      Creators.postReturnRespondRequest({
        returnId,
        respondType: RETURN_REQUEST_RESPOND_TYPE[confirmMessageType],
        successCallback,
        failCallback: () => {
          setIsConfirmBusy(false);
          setConfirmModalVisibility(false);
        },
      }),
    );
  };

  const handleConfirmCancel = () => {
    setConfirmModalVisibility(false);
  };
  const handleOk = type => {
    setconfirmMessageType(type);
    setConfirmModalVisibility(true);
  };

  const renderTableFooter = () => {
    return (
      <div
        className={classes.tableFooter}
        style={{ display: getReturnDetailPending ? 'none' : 'flex' }}
      >
        <span className={classes.mr24}>{t('MODAL.TOTAL_RETURN_AMOUNT')}</span>
        <span className={`${classes.tableText} ${classes.returnPrice} `}>
          {`${currency()}${totalAmount}`}
        </span>
      </div>
    );
  };

  return (
    <Modal
      title={t('MODAL.TITLE')}
      visible={isModalVisible}
      onCancel={handleCancel}
      zIndex={2999990}
      width={modalWidth}
      footer={[
        <Button
          className={`${classes.returnBtn} ${classes.returnBtn}-reject`}
          disabled={getReturnDetailPending}
          key="ok"
          onClick={() => handleOk('REJECT')}
        >
          {t('global:REJECT')}
        </Button>,
        <Button
          className={`${classes.returnBtn} ${classes.returnBtn}-approve`}
          disabled={getReturnDetailPending}
          key="ok"
          onClick={() => handleOk('ACCEPT')}
        >
          {t('global:ACCEPT')}
        </Button>,
      ]}
    >
      <Row>
        <Col>
          <Alert message={t('MODAL.DESC')} type="info" showIcon />
        </Col>
        <Col className={classes.mt32}>
          <Text className={`${classes.tableText} ${classes.tableTitle}`}>
            {t('MODAL.TABLE_TITLE')}
          </Text>
        </Col>
        <Col span={24}>
          <Tabs className={classes.tabs} onChange={setCurrentTab} activeKey={currentTab} centered>
            <TabPane tab={t('MODAL.APPROVED_PRODUCTS')} key={RETURN_REQUEST_RESPOND_TYPE.ACCEPT}>
              <Space direction="vertical">
                <Table
                  dataSource={approvedProducts}
                  columns={generateColumns({
                    classNames: {
                      nameWrapper: classes.nameWrapper,
                      productImg: classes.productImg,
                      productQuantity: classes.productQuantity,
                      productName: `${classes.tableText} ${classes.productName} `,
                      productPrice: `${classes.tableText} ${classes.productPrice} `,
                      returnPrice: `${classes.tableText} ${classes.returnPrice} `,
                      returnText: `${classes.tableText} ${classes.returnText} `,
                    },
                  })}
                  loading={getReturnDetailPending}
                  tableLayout="fixed"
                  pagination={false}
                  size="small"
                  className={classes.returnTableWrapper}
                  footer={() => renderTableFooter()}
                  rowClassName={classes.tableWrapper}
                />
              </Space>
            </TabPane>
            <TabPane tab={t('MODAL.REJECTED_PRODUCTS')} key={RETURN_REQUEST_RESPOND_TYPE.REJECT}>
              <Space direction="vertical">
                <Table
                  dataSource={rejectedProducts}
                  columns={generateColumns({
                    isShopReturnReasonVisible: true,
                    classNames: {
                      nameWrapper: classes.nameWrapper,
                      productImg: classes.productImg,
                      productQuantity: classes.productQuantity,
                      productName: `${classes.tableText} ${classes.productName} `,
                      productPrice: `${classes.tableText} ${classes.productPrice} `,
                      returnPrice: `${classes.tableText} ${classes.returnPrice} `,
                      returnText: `${classes.tableText} ${classes.returnText} `,
                    },
                  })}
                  loading={getReturnDetailPending}
                  tableLayout="fixed"
                  pagination={false}
                  size="small"
                  className={classes.returnTableWrapper}
                  footer={() => renderTableFooter()}
                  rowClassName={classes.tableWrapper}
                />
              </Space>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <Modal
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        width={modalWidth / 2}
        visible={isConfirmModalVisible}
        title={t('MODAL.WARNING')}
        zIndex={2999990}
        footer={[
          <Button
            className={`${classes.returnBtn} ${classes.returnBtn}-cancel`}
            key="ok"
            onClick={handleConfirmCancel}
          >
            {t('global:CANCEL')}
          </Button>,
          <Button
            className={CONFIRM_MESSAGE_BUTTON_CSS[confirmMessageType]}
            key="ok"
            loading={isConfirmBusy}
            onClick={handleConfirmOk}
          >
            {t(`global:${confirmMessageType}`)}
          </Button>,
        ]}
      >
        <Trans t={t}>{t(`MODAL.${confirmMessageType}_CONFIRM_TEXT`)}</Trans>
      </Modal>
    </Modal>
  );
}

export default ReturnDetailModal;
