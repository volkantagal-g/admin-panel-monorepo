import { useEffect, useState } from 'react';
import { Button } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router';

import AntTable from '@shared/components/UI/AntTable';
import { getLangKey } from '@shared/i18n';
import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { getGiveawayEventsSelector, getDrawDiscountCodeSuccess, deliverGiveawayEventRequest } from '../../redux/selectors';
import { GIVEAWAY_PRODUCT_TYPES } from '@shared/shared/constants';
import useQuery from '@shared/shared/hooks/useQuery';
import { getLimitAndOffset } from '@app/pages/GiveawayEvent/List/components/GiveawayEventsTable/utils';

const GiveawayEventsTable = ({ queryText }) => {
  const { t } = useTranslation('giveawayPage');
  const query = useQuery();
  const countryCode  = query.get('countryCode');
  const gsm  = query.get('gsm');
  const {  eventId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [{ currentPage, rowsPerPage }, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [selectedRecordId, setSelectedRecordId] = useState('');

  const data = useSelector(getGiveawayEventsSelector.getData) || [];
  const isPending = useSelector(getGiveawayEventsSelector.getIsPending);
  const isDrawPending = useSelector(getDrawDiscountCodeSuccess.getIsPending);
  const isDeliverPending = useSelector(deliverGiveawayEventRequest.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const onRedeemProduct = (product, code = null) => {
    const { event, gsm, countryCode, _id: id } = product;
    setSelectedRecordId(id);
    dispatch(
      Creators.deliverGiveawayEventRequest({
        countryCode: code || countryCode,
        gsm,
        eventId: event._id,
        id,
      }),
    );
  };

  const onGetDiscountCodeProduct = product => {
    const { discountCode, _id: id } = product;
    setSelectedRecordId(id);
    dispatch(Creators.getDrawDiscountCodeRequest({ discountCodeId: discountCode, id }));
  };

  useEffect(() => {
    dispatch(
      Creators.getGiveawayEventsRequest({
        ...getLimitAndOffset({ current: currentPage, pageSize: rowsPerPage }),
        queryText,
        eventId,
        gsm,
      }),
    );
  }, [currentPage, rowsPerPage, eventId, queryText]);

  useEffect(() => {
    if (queryText && countryCode && !isEmpty(data)) {
      const product = data.find(record => record.gsm === queryText);
      if(!isEmpty(product) ) {
        setSelectedRecordId(product._id);
      }
    }
  }, [data, queryText]);

  const tableColumns = [
    {
      title: t('giveawayPage:COLUMN.DEVICE_STATUS'),
      dataIndex: 'hasDeviceId',
      key: 'hasDeviceId',
      width: 100,
      render: hasDeviceId => <>{hasDeviceId ? 'True' : 'False'}</>,
    },
    {
      title: t('giveawayPage:COLUMN.FRAUD_STATUS'),
      dataIndex: 'isViolated',
      key: 'isViolated',
      width: 150,
      render: isViolated => <>{isViolated ? t('giveawayPage:FRAUD') : t('giveawayPage:NOT_FRAUD')}</>,
    },
    {
      title: t('giveawayPage:COLUMN.GIVEAWAY_PRODUCT'),
      key: 'giveawayProduct',
      width: 200,
      render: ({ giveawayProduct, code }) => (
        <>{giveawayProduct?.type === GIVEAWAY_PRODUCT_TYPES.NORMAL ? giveawayProduct.name[getLangKey()] : code || ''}</>
      ),
    },
    {
      title: t('giveawayPage:COLUMN.PRODUCT_STATUS'),
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      width: 200,
      render: isDelivered => <>{isDelivered ? t('giveawayPage:REDEEMED') : t('giveawayPage:NOT_REDEEMED')}</>,
    },
    {
      title: t('global:ACTION'),
      align: 'center',
      width: 250,
      render: record => {
        const { isDelivered, hasDeviceId, isViolated, giveawayProduct } = record;
        if (isViolated || !hasDeviceId) return <CloseOutlined className={classes.closeButton} />;
        if (isDelivered) return <Button>{t('giveawayPage:REDEEMED_PRODUCT')}</Button>;
        const isNormalProduct = giveawayProduct?.type === GIVEAWAY_PRODUCT_TYPES.NORMAL;
        return (
          <Button
            loading={record._id === selectedRecordId && (isDeliverPending || isDrawPending)}
            type="primary"
            disabled={record.code}
            onClick={() => (isNormalProduct ? onRedeemProduct(record) : onGetDiscountCodeProduct(record))}
            className={classes.redeemButton}
          >
            {isNormalProduct ? t('giveawayPage:REDEEM') : t('giveawayPage:GET_DISCOUNT_CODE')}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <AntTable
        title={t('giveawayPage:TITLE')}
        data={data}
        columns={tableColumns}
        loading={isPending}
        pagination={{ currentPage, rowsPerPage }}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default GiveawayEventsTable;
